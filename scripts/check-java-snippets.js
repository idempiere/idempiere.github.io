#!/usr/bin/env node
// Checks the Java code blocks in docs pages against the iDempiere source.
//
// Usage: node scripts/check-java-snippets.js --source <idempiere clone> [--ref <git ref>] [file ...]
//        npm run lint:java -- --source <idempiere clone> [--ref <git ref>] [file ...]
// With no files, checks every page under docs/ that has a Java block. The ref
// defaults to the first of upstream/master, origin/master and master that the
// clone has. The script only reads the source repository (git ls-tree); it
// does not compile anything or change any file.
//
// Errors (exit 1):
//   - an org.adempiere, org.compiere or org.idempiere import that does not
//     exist in the ref, or exists in a different package.
// Warnings:
//   - a full class without a package line or a title with its file path.
//   - a type that the class uses, or names after extends or implements, that
//     is not imported and is not in the class's own package.
// Types that the page declares itself, such as MyEventHandler, are skipped.
// Blocks without a class or interface declaration are fragments: their
// imports are checked, but they need no package, title or imports.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DOCS_DIR = 'docs';
const INTERNAL = /^org\.(adempiere|compiere|idempiere)\./;
// Types a block may use without an import.
const JAVA_LANG = new Set([
  'Object', 'String', 'Integer', 'Long', 'Short', 'Byte', 'Double', 'Float', 'Boolean', 'Character',
  'Number', 'Math', 'System', 'Class', 'Enum', 'Record', 'Void', 'Thread', 'StringBuilder',
  'Throwable', 'Exception', 'RuntimeException', 'Error', 'Iterable', 'Runnable', 'Comparable',
  'AutoCloseable', 'Override', 'Deprecated', 'SuppressWarnings', 'FunctionalInterface', 'SafeVarargs',
]);

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const source = opt('--source');
const files = args.filter((a, i) => !a.startsWith('--') && !['--source', '--ref'].includes(args[i - 1]));
if (!source) {
  console.error('Usage: node scripts/check-java-snippets.js --source <idempiere clone> [--ref <git ref>] [file ...]');
  process.exit(2);
}

const git = (...gitArgs) =>
  execFileSync('git', ['-C', source, ...gitArgs], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });

function pickRef() {
  const wanted = opt('--ref');
  const candidates = wanted ? [wanted] : ['upstream/master', 'origin/master', 'master'];
  const found = candidates.find((r) => {
    try {
      git('rev-parse', '--verify', '--quiet', r);
      return true;
    } catch {
      return false;
    }
  });
  if (!found) {
    console.error(`None of ${candidates.join(', ')} exists in ${source}. Pass --ref <git ref>.`);
    process.exit(2);
  }
  return found;
}
const ref = pickRef();

// Maps org.adempiere.base.event.IEventTopics to its file, and IEventTopics to
// every package that has a class of that name.
function indexSource() {
  const byName = new Map();
  const bySimple = new Map();
  for (const file of git('ls-tree', '-r', '--name-only', ref).split('\n')) {
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

// The extends and implements lists may run over several lines.
const DECLARATION = /^[ \t]*(?:public\s+|abstract\s+|final\s+)*(class|interface)\s+(\w+)(?:\s+extends\s+([\w.<>,\s]+?))?(?:\s+implements\s+([\w.<>,\s]+?))?\s*\{/m;

// Names of the types in an extends or implements list, without generics.
const typeNames = (list) => {
  const names = [];
  let depth = 0;
  let current = '';
  for (const ch of list || '') {
    if (ch === '<') depth += 1;
    else if (ch === '>') depth -= 1;
    else if (ch === ',' && depth === 0) {
      names.push(current.trim());
      current = '';
    } else if (depth === 0) current += ch;
  }
  names.push(current.trim());
  return names.filter(Boolean);
};

// Imports of a block. A static import names a member, so the class is one
// segment shorter, unless it ends in .*.
function readImports(code) {
  return [...code.matchAll(/^import\s+(static\s+)?([\w.]+?)(\.\*)?;/gm)].map((m) => ({
    isStatic: Boolean(m[1]),
    wildcard: Boolean(m[3]),
    name: m[2],
    className: m[1] && !m[3] ? m[2].slice(0, m[2].lastIndexOf('.')) : m[2],
  }));
}

// Type names a class uses: capitalised words outside comments, strings,
// the package line and the import lines. Constants such as MAX_SIZE and
// single-letter type parameters are skipped.
function usedTypes(code) {
  const body = code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/^(package|import)\s[^;]*;/gm, '');
  const names = new Set();
  for (const m of body.matchAll(/\b([A-Z][A-Za-z0-9_]*)\b/g)) {
    if (m[1].length > 1 && m[1] !== m[1].toUpperCase()) names.add(m[1]);
  }
  return names;
}

function checkPage(file, { byName, bySimple }) {
  const blocks = javaBlocks(fs.readFileSync(file, 'utf8'));
  const declared = new Set();
  for (const b of blocks) {
    for (const m of b.code.matchAll(/\b(?:class|interface|enum|record)\s+(\w+)/g)) declared.add(m[1]);
  }
  const findings = [];
  const report = (level, line, message) => findings.push({ level, line, message });

  for (const { header, code, line } of blocks) {
    const imports = readImports(code);
    const imported = new Set(imports.filter((i) => !i.wildcard).map((i) => i.name.slice(i.name.lastIndexOf('.') + 1)));
    const wildcardPackages = imports.filter((i) => i.wildcard).map((i) => i.name);

    for (const { className } of imports) {
      const simple = className.slice(className.lastIndexOf('.') + 1);
      if (!INTERNAL.test(className) || declared.has(simple)) continue;
      const exists = byName.has(className) || [...byName.keys()].some((k) => k.startsWith(`${className}.`));
      if (exists) continue;
      const elsewhere = bySimple.get(simple);
      report('error', line, elsewhere
        ? `import ${className} not found in ${ref}; the class is ${elsewhere.join(' or ')}`
        : `import ${className} not found in ${ref}`);
    }

    const decl = code.match(DECLARATION);
    if (!decl) continue;
    const pkg = (code.match(/^package\s+([\w.]+);/m) || [])[1];
    if (!pkg) report('warning', line, 'full class without a package line');
    if (!/title=/.test(header)) report('warning', line, `full class ${decl[2]} without a title with its file path`);

    const used = new Set([...typeNames(decl[3]), ...typeNames(decl[4])].map((n) => n.slice(n.lastIndexOf('.') + 1)));
    for (const n of usedTypes(code)) used.add(n);
    for (const simple of used) {
      if (imported.has(simple) || declared.has(simple) || JAVA_LANG.has(simple)) continue;
      const found = bySimple.get(simple);
      if (!found) continue;
      const samePackage = pkg && byName.has(`${pkg}.${simple}`);
      const viaWildcard = wildcardPackages.some((w) => byName.has(`${w}.${simple}`));
      if (samePackage || viaWildcard) continue;
      report('warning', line, `${simple} is used but not imported; the class is ${found.slice(0, 3).join(' or ')}`);
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
