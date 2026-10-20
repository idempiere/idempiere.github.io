#!/usr/bin/env node
// Checks docs page frontmatter against scripts/frontmatter.schema.json.
//
// Usage: node scripts/check-frontmatter.js [--strict | --fail-invalid] [file ...]
// With no files, checks every page under docs/. By default it only reports
// warnings and exits 0.
//   --strict        every problem is an error (used for new pages).
//   --fail-invalid  YAML that does not parse, or a field in the wrong format
//                   (date, version range, type), is an error; a missing field
//                   or a description of the wrong length stays a warning (used
//                   for changed pages).
// In GitHub Actions the problems show up as annotations on the pull request.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');

const DOCS_DIR = 'docs';
const schema = require('./frontmatter.schema.json');
const validate = new Ajv({ allErrors: true }).compile(schema);

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const failInvalid = args.includes('--fail-invalid');
const inGitHub = process.env.GITHUB_ACTIONS === 'true';
// In workflow commands, % and line breaks are special characters.
const escapeCommand = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');

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

// With --strict every problem is an error. With --fail-invalid only a field
// in the wrong format is; missing fields and length are left to the author.
const SOFT = new Set(['required', 'minLength', 'maxLength', 'minItems']);
function isError(error) {
  if (strict) return true;
  return failInvalid && !SOFT.has(error.keyword);
}

function describe(error) {
  if (error.keyword === 'required') return `missing \`${error.params.missingProperty}\``;
  const field = error.instancePath.replace(/^\//, '').split('/')[0];
  return `\`${field}\` ${error.message}`;
}

const files = args.filter((a) => !a.startsWith('--'));
const pages = files.length ? files.filter((f) => fs.existsSync(f) && isPage(f)) : listPages(DOCS_DIR);

let problems = 0;
let errors = 0;
let pagesWithProblems = 0;
for (const file of pages) {
  let found;
  try {
    const data = readFrontmatter(file);
    found = validate(data) ? [] : validate.errors.map((e) => ({ text: describe(e), error: isError(e) }));
  } catch (e) {
    const text = `frontmatter is not valid YAML: ${e.message.split('\n')[0]}`;
    found = [{ text, error: strict || failInvalid }];
  }
  if (!found.length) continue;
  pagesWithProblems += 1;
  problems += found.length;
  errors += found.filter((p) => p.error).length;
  for (const level of ['error', 'warning']) {
    const messages = found.filter((p) => p.error === (level === 'error')).map((p) => p.text);
    if (!messages.length) continue;
    if (inGitHub) {
      console.log(`::${level} file=${file},line=1,title=Frontmatter::${escapeCommand(messages.join('; '))}`);
    } else {
      console.log(`${file} (${level})\n  - ${messages.join('\n  - ')}`);
    }
  }
}

console.log(
  `\nFrontmatter: ${pages.length} pages checked, ${pagesWithProblems} with problems, ${problems} problems, ${errors} errors.` +
    ' See https://docs.idempiere.org/docs/documentation-standards#frontmatter',
);
process.exit(errors ? 1 : 0);
