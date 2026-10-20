#!/usr/bin/env node
// Checks the Java code blocks in docs pages against the iDempiere source.
//
// Usage: node scripts/check-java-snippets.js --source <idempiere clone> [--ref <git ref>] [file ...]
// With no files, checks every page under docs/ that has a Java block. The ref
// defaults to upstream/master. The script only reads the source repository
// (git ls-tree); it does not compile anything or change any file.
//
// Errors (exit 1):
//   - an org.adempiere, org.compiere or org.idempiere import that does not
//     exist in the ref, or exists in a different package.
// Warnings:
//   - a full class without a package line or a title with its file path.
//   - a class named after extends or implements that is not imported.
// Classes that the page declares itself, such as MyEventHandler, are skipped.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DOCS_DIR = 'docs';
const INTERNAL = /^org\.(adempiere|compiere|idempiere)\./;
// Types a block may use without an import.
const JAVA_LANG = new Set(['Object', 'String', 'Exception', 'Runnable', 'Comparable', 'Override']);

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const source = opt('--source');
const ref = opt('--ref', 'upstream/master');
const files = args.filter((a, i) => !a.startsWith('--') && !['--source', '--ref'].includes(args[i - 1]));
if (!source) {
  console.error('Usage: node scripts/check-java-snippets.js --source <idempiere clone> [--ref <git ref>] [file ...]');
  process.exit(2);
}

// Maps org.adempiere.base.event.IEventTopics to its file, and IEventTopics to
// every package that has a class of that name.
function indexSource() {
  const list = execFileSync('git', ['-C', source, 'ls-tree', '-r', '--name-only', ref], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  const byName = new Map();
  const bySimple = new Map();
  for (const file of list.split('\n')) {
    const m = file.match(/\/src\/(.+)\.java$/);
    if (!m) continue;
    const fqcn = m[1].replace(/\//g, '.');
    byName.set(fqcn, file);
    const simple = fqcn.slice(fqcn.lastIndexOf('.') + 1);
    bySimple.set(simple, [...(bySimple.get(simple) || []), fqcn]);
  }
  return { byName, bySimple };
}

function listPages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith('_') ? [] : listPages(full);
    return /\.mdx?$/.test(entry.name) && !entry.name.startsWith('_') ? [full] : [];
  });
}

function javaBlocks(text) {
  const blocks = [];
  const re = /^```java([^\n]*)\n([\s\S]*?)^```/gm;
  for (let m; (m = re.exec(text)); ) {
    blocks.push({ header: m[1], code: m[2], line: text.slice(0, m.index).split('\n').length });
  }
  return blocks;
}

const DECLARATION = /^\s*(?:public\s+|abstract\s+|final\s+)*(class|interface)\s+(\w+)(?:\s+extends\s+([\w.<>, ]+?))?(?:\s+implements\s+([\w.<>, ]+?))?\s*\{/m;

// Names of the types in an extends or implements list, without generics.
const typeNames = (list) =>
  (list || '').replace(/<[^>]*>/g, '').split(',').map((s) => s.trim()).filter(Boolean);

function checkPage(file, { byName, bySimple }) {
  const blocks = javaBlocks(fs.readFileSync(file, 'utf8'));
  const declared = new Set(blocks.flatMap((b) => [...b.code.matchAll(new RegExp(DECLARATION.source, 'gm'))].map((m) => m[2])));
  const findings = [];
  const report = (level, line, message) => findings.push({ level, line, message });

  for (const { header, code, line } of blocks) {
    const imports = [...code.matchAll(/^import\s+(?:static\s+)?([\w.]+?)(?:\.\*)?;/gm)].map((m) => m[1]);
    const imported = new Set(imports.map((i) => i.slice(i.lastIndexOf('.') + 1)));

    for (const imp of imports) {
      const simple = imp.slice(imp.lastIndexOf('.') + 1);
      if (!INTERNAL.test(imp) || declared.has(simple)) continue;
      const exists = byName.has(imp) || [...byName.keys()].some((k) => k.startsWith(`${imp}.`));
      if (exists) continue;
      const elsewhere = bySimple.get(simple);
      report('error', line, elsewhere
        ? `import ${imp} not found in ${ref}; the class is ${elsewhere.join(' or ')}`
        : `import ${imp} not found in ${ref}`);
    }

    const decl = code.match(DECLARATION);
    if (!decl) continue;
    if (!/^package\s+[\w.]+;/m.test(code)) report('warning', line, 'full class without a package line');
    if (!/title=/.test(header)) report('warning', line, `full class ${decl[2]} without a title with its file path`);
    for (const name of [...typeNames(decl[3]), ...typeNames(decl[4])]) {
      const simple = name.slice(name.lastIndexOf('.') + 1);
      if (name.includes('.') || imported.has(simple) || declared.has(simple) || JAVA_LANG.has(simple)) continue;
      const found = bySimple.get(simple);
      report('warning', line, found
        ? `${simple} is used but not imported; the class is ${found.join(' or ')}`
        : `${simple} is used but not imported, and not found in ${ref}`);
    }
  }
  return findings;
}

const index = indexSource();
const pages = files.length ? files : listPages(DOCS_DIR);
let errors = 0;
let warnings = 0;
for (const file of pages) {
  for (const { level, line, message } of checkPage(file, index)) {
    if (level === 'error') errors += 1;
    else warnings += 1;
    console.log(`${file}:${line} ${level}: ${message}`);
  }
}
console.log(`Java snippets: ${pages.length} pages checked against ${ref}, ${errors} errors, ${warnings} warnings.`);
process.exit(errors ? 1 : 0);
