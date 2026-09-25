// Reads docs/migration-notes/v*/ pages. Every "## " section of a page is one
// migration note. It links to the section anchor, so the page shows the
// summary and the docs keep the full explanation. Page tags are not used:
// they describe the whole page, not a single note.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {createSlugger} = require('@docusaurus/utils');

const NOTES_DIR = 'docs/migration-notes';
const VERSION_DIR = /^v(\d+(?:\.\d+)*)$/;
const JIRA_KEY = /\bIDEMPIERE-\d+\b/g;

// Who a page is for, by file name. Pages with other names are shown to
// everyone and labelled with their sidebar label.
const PAGE_KINDS = {
  'technical-notes': {label: 'Technical', audience: ['developer', 'admin']},
  'functional-notes': {label: 'Functional', audience: ['consultant']},
  'removed-deprecated-apis': {label: 'Removed APIs', audience: ['developer']},
};

function stripInline(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`+/g, '')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[^\w*])[*_]([^*_\n]+)[*_](?![\w*])/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

// First prose paragraph of a section. Lists, code, tables, admonitions and
// sub-headings are skipped.
function summaryOf(lines) {
  const skip = /^(#|!\[|[-*+] |\d+\. |\||<|:::|```|---)/;
  const para = lines
    .join('\n')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !skip.test(p));
  if (!para) return null;
  const text = stripInline(para);
  return text.length <= 320 ? text : `${text.slice(0, 320).replace(/\s+\S*$/, '')}…`;
}

// Splits a page into its "## " sections. Every heading goes through one
// slugger in document order, the same way Docusaurus assigns heading ids, so
// duplicate headings get the same -1, -2 suffixes as on the site.
function sectionsOf(source) {
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const slugger = createSlugger();
  const sections = [];
  let current = null;
  let inFence = false;

  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const heading = !inFence && line.match(/^(#{1,6})\s+(.*?)\s*(?:\{#([^}]+)\})?\s*$/);
    if (heading) {
      const [, hashes, text, explicitId] = heading;
      const id = explicitId || slugger.slug(stripInline(text));
      if (hashes.length === 2) {
        current = {title: stripInline(text), anchor: id, lines: []};
        sections.push(current);
        continue;
      }
      if (hashes.length === 1) {
        current = null;
        continue;
      }
    }
    if (current) current.lines.push(line);
  }
  return sections;
}

function frontMatterOf(source) {
  const fm = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return (fm && yaml.load(fm[1])) || {};
}

function loadMigrationNotes(siteDir) {
  const root = path.join(siteDir, NOTES_DIR);
  const notes = new Map();
  if (!fs.existsSync(root)) return notes;

  for (const dir of fs.readdirSync(root, {withFileTypes: true})) {
    if (!dir.isDirectory() || !VERSION_DIR.test(dir.name)) continue;
    const version = dir.name.match(VERSION_DIR)[1];
    const files = fs
      .readdirSync(path.join(root, dir.name))
      .filter((f) => /\.mdx?$/.test(f))
      .sort();

    const pages = [];
    for (const file of files) {
      const source = fs.readFileSync(path.join(root, dir.name, file), 'utf8');
      const frontMatter = frontMatterOf(source);
      const name = file.replace(/\.mdx?$/, '');
      const slug = frontMatter.id || name;
      const permalink = `/docs/migration-notes/${dir.name}/${slug}`;
      const kind = PAGE_KINDS[name] || {
        label: frontMatter.sidebar_label || name,
        audience: ['developer', 'consultant', 'admin'],
      };
      const items = sectionsOf(source).map((section) => ({
        id: `${dir.name}/${slug}#${section.anchor}`,
        title: section.title,
        summary: summaryOf(section.lines),
        jira: [...new Set(section.lines.join('\n').match(JIRA_KEY) || [])],
        permalink: `${permalink}#${section.anchor}`,
      }));
      if (items.length === 0) continue;
      pages.push({
        id: `${dir.name}/${slug}`,
        kind: kind.label,
        audience: kind.audience,
        permalink,
        items,
      });
    }
    notes.set(version, pages);
  }
  return notes;
}

module.exports = {loadMigrationNotes, NOTES_DIR};
