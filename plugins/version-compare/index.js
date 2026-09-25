// Builds the data for the /upgrade/compare page from the existing
// docs/new-features/v*/ articles. The version comes from the folder name,
// the category from the article's `tags` front matter and the Jira keys
// from the article header ("Feature Ticket", "Ticket").

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const FEATURES_DIR = 'docs/new-features';
const VERSION_DIR = /^v(\d+(?:\.\d+)*)$/;
const JIRA_KEY = /\bIDEMPIERE-\d+\b/g;

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function parseArticle(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const frontMatter = match ? yaml.load(match[1]) || {} : {};
  const body = match ? source.slice(match[0].length) : source;
  return {frontMatter, body};
}

// The header block is the list of "**Label:** value" lines at the top of an
// article, before the first "## " section or the "**Description:**" label.
function headerOf(body) {
  return body.split(/^(?:## |\*\*Description)/m)[0];
}

// Articles name their ticket on a labelled line: "**Feature Ticket:**" in the
// header of newer articles, "**Technical Info:**" at the end of older ones.
// Keys on those lines are used first. Otherwise any key in the header block
// is used, so tickets that are only mentioned in the article text are not
// attributed to the feature.
const TICKET_LINE =
  /^[ \t]*(?:[-*][ \t]+)?\*\*(?:Technical Info|Feature Ticket|Feature|Ticket|Reference)\b[^\n]*/gim;

function jiraKeys(body) {
  const labelled = (body.match(TICKET_LINE) || []).join('\n');
  const keys = labelled.match(JIRA_KEY) || headerOf(body).match(JIRA_KEY) || [];
  return [...new Set(keys)];
}

// Maps the free-text "**Goal:**" header line to one of the tag values used
// by the other articles. Only used when an article has no tags.
const GOAL_CATEGORIES = [
  [/security/i, 'security'],
  [/architecture/i, 'architecture'],
  [/develop|osgi/i, 'development'],
  [/usability|user experience|\bux\b/i, 'user-experience'],
  [/functional/i, 'functional'],
  [/technical/i, 'technical'],
];

function goalCategory(body) {
  const m = headerOf(body).match(/\*\*Goal:?\*\*:?[ \t]*([^\n]+)/i);
  if (!m) return null;
  const hit = GOAL_CATEGORIES.find(([re]) => re.test(m[1]));
  return hit ? hit[1] : null;
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// First prose paragraph of the article, used when the front matter has no
// usable description. Header lines, headings, lists, images and admonitions
// are skipped.
function firstParagraph(body) {
  const skip = /^(\*\*|#|!\[|[-*+] |\d+\. |\||<|---|_Source|:::|```)/;
  const para = body
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .find((p) => p && !skip.test(p));
  if (!para) return null;
  const text = stripMarkdown(para);
  if (text.length <= 280) return text;
  return `${text.slice(0, 280).replace(/\s+\S*$/, '')}…`;
}

function firstHeading(body) {
  const m = body.match(/^# (.+)$/m);
  return m ? m[1].trim() : null;
}

// Some descriptions were generated from the first bullet of the article and
// hold "**Developer:** ..." instead of a summary. Those are dropped.
function cleanDescription(description) {
  if (typeof description !== 'string') return null;
  const text = description.trim();
  if (!text || text.startsWith('**')) return null;
  return text;
}

function loadVersion(siteDir, dirName) {
  const version = dirName.match(VERSION_DIR)[1];
  const dir = path.join(siteDir, FEATURES_DIR, dirName);
  const changes = fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .sort()
    .map((file) => {
      const {frontMatter, body} = parseArticle(
        fs.readFileSync(path.join(dir, file), 'utf8'),
      );
      const slug = frontMatter.id || file.replace(/\.mdx?$/, '');
      const tags = Array.isArray(frontMatter.tags) ? frontMatter.tags : [];
      return {
        id: `${dirName}/${slug}`,
        title: frontMatter.title || firstHeading(body) || slug,
        description:
          cleanDescription(frontMatter.description) || firstParagraph(body),
        category:
          tags.find((t) => !VERSION_DIR.test(t)) ||
          goalCategory(body) ||
          'uncategorized',
        jira: jiraKeys(body),
        permalink: `/docs/new-features/${dirName}/${slug}`,
      };
    });
  return {version, changes};
}

module.exports = function versionComparePlugin(context) {
  const {siteDir} = context;
  return {
    name: 'version-compare',

    async loadContent() {
      const root = path.join(siteDir, FEATURES_DIR);
      const releases = fs
        .readdirSync(root, {withFileTypes: true})
        .filter((d) => d.isDirectory() && VERSION_DIR.test(d.name))
        .map((d) => loadVersion(siteDir, d.name))
        .sort((a, b) => compareVersions(a.version, b.version));

      const ids = new Set();
      for (const release of releases) {
        for (const change of release.changes) {
          if (ids.has(change.id)) {
            throw new Error(`[version-compare] Duplicate change id "${change.id}"`);
          }
          ids.add(change.id);
        }
      }
      return {releases};
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },

    getPathsToWatch() {
      return [path.join(siteDir, FEATURES_DIR, 'v*/**/*.{md,mdx}')];
    },
  };
};

module.exports.compareVersions = compareVersions;
