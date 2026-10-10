#!/usr/bin/env node
// Checks docs page frontmatter against scripts/frontmatter.schema.json.
//
// Usage: node scripts/check-frontmatter.js [--strict] [file ...]
// With no files, checks every page under docs/. Only reports warnings and
// exits 0, unless --strict is given. In GitHub Actions the warnings show up
// as annotations on the pull request.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');

const DOCS_DIR = 'docs';
const schema = require('./frontmatter.schema.json');
const validate = new Ajv({ allErrors: true }).compile(schema);

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const inGitHub = process.env.GITHUB_ACTIONS === 'true';

// Docusaurus does not publish files or folders that start with _.
function isPage(file) {
  return (
    /\.mdx?$/.test(file) &&
    file.split(path.sep).join('/').startsWith(`${DOCS_DIR}/`) &&
    !file.split(/[\\/]/).some((part) => part.startsWith('_'))
  );
}

function listPages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPages(full);
    return isPage(full) ? [full] : [];
  });
}

function readFrontmatter(file) {
  const m = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const data = yaml.load(m[1]) || {};
  // YAML reads 2026-10-10 as a date and 12 as a number; the schema wants text.
  for (const key of ['last_reviewed', 'applies_to', 'deprecated_in']) {
    if (data[key] instanceof Date) data[key] = data[key].toISOString().slice(0, 10);
    else if (typeof data[key] === 'number') data[key] = String(data[key]);
  }
  return data;
}

function describe(error) {
  if (error.keyword === 'required') return `missing \`${error.params.missingProperty}\``;
  const field = error.instancePath.replace(/^\//, '').split('/')[0];
  return `\`${field}\` ${error.message}`;
}

const files = args.filter((a) => !a.startsWith('--'));
const pages = files.length ? files.filter((f) => fs.existsSync(f) && isPage(f)) : listPages(DOCS_DIR);

let problems = 0;
let pagesWithProblems = 0;
for (const file of pages) {
  let messages;
  try {
    const data = readFrontmatter(file);
    messages = validate(data) ? [] : validate.errors.map(describe);
  } catch (e) {
    messages = [`frontmatter is not valid YAML: ${e.message.split('\n')[0]}`];
  }
  if (!messages.length) continue;
  pagesWithProblems += 1;
  problems += messages.length;
  if (inGitHub) {
    console.log(`::warning file=${file},line=1,title=Frontmatter::${messages.join('; ')}`);
  } else {
    console.log(`${file}\n  - ${messages.join('\n  - ')}`);
  }
}

console.log(
  `\nFrontmatter: ${pages.length} pages checked, ${pagesWithProblems} with problems, ${problems} problems.` +
    ' See https://docs.idempiere.org/docs/documentation-standards#frontmatter',
);
process.exit(strict && problems ? 1 : 0);
