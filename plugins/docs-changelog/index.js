// Builds the data for the /updates page from git history.
//
// This is a changelog of the documentation, not of the software. Each entry
// says which pages were added, updated, moved or removed, and in which part of
// the navigation.
//
// A change can carry a note for readers, in either place:
// - a trailer in the commit message:
//     Change-Note: one sentence for readers
// - changelog-notes.yml, keyed by commit hash, for commits already pushed.
//
// History is read along the first parent, so a merged pull request is one
// entry with all its pages, and the commits inside it are not repeated.
//
// The data is written with createData and only the /updates route loads it.
//
// Commits that only touch release notes become one entry per month.
// The build needs the full git history (actions/checkout fetch-depth: 0).
//
// Nothing here is specific to one site. Page titles, URLs and sections come
// from the docs plugin, folder moves from git, the repository from
// organizationName and projectName, the rest from the options.
//
// Options (all optional):
//   routeBasePath     URL of the page. Default: 'updates'.
//   docsPath          Folder of the docs. Default: 'docs'.
//   releaseNotesPath  Folder of the release notes, for example
//                     'docs/release-notes'. Changes that only touch it are
//                     summarized per month. Default: none.
//   notesFile         Change notes for pushed commits. Default: 'changelog-notes.yml'.
//   repoUrl           Repository for commit links. Default: GitHub URL built
//                     from organizationName and projectName.
//   tickets           {pattern, url} to link issue keys found in commit
//                     subjects, for example {pattern: 'PROJ-\\d+', url: 'https://…/browse/'}.
//   releaseNotesUrl   Where the release notes start. Default: the link of the
//                     sidebar section that holds the release notes.
//   compareUrl        A page that compares software versions, linked next to
//                     the release notes. Default: none.
//   smallChangeLimit  Below this many pages, a change without a note that only
//                     updates pages is collapsed. Default: 5.

const {execFileSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {normalizeUrl} = require('@docusaurus/utils');
const {compareVersions} = require('../version-compare');

const VERBS = {A: 'Added', M: 'Updated', R: 'Moved', D: 'Removed'};

const SEP = '\x1f';
const START = '\x1e';

function readCommits(siteDir, docsPath) {
  // START opens each record, so the --name-status list stays with its commit.
  const format = START + ['%H', '%h', '%P', '%ad', '%an', '%s', '%b'].join(SEP);
  let out;
  try {
    out = execFileSync(
      'git',
      [
        'log',
        '--first-parent',
        '--diff-merges=first-parent',
        '--date=short',
        `--format=${format}`,
        '--name-status',
        '-M',
        '--',
        docsPath,
      ],
      {cwd: siteDir, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024},
    );
  } catch (error) {
    console.warn(`[docs-changelog] git log failed, page will be empty: ${error.message}`);
    return [];
  }
  const isChange = (line) => /^[AMDR]\d*\t/.test(line);
  return out
    .split(START)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [hash, short, parents, date, author, subject, rest = ''] = chunk.split(SEP);
      const lines = rest.split('\n');
      const changes = lines
        .filter(isChange)
        .map((line) => {
          const [status, a, b] = line.split('\t');
          return {status: status[0], file: b || a, from: b ? a : null};
        })
        .filter((c) => /\.mdx?$/.test(c.file));
      const body = lines.filter((line) => !isChange(line)).join('\n');
      return {hash, short, parents: parents.split(' '), date, author, subject, body, changes};
    })
    .filter((commit) => commit.changes.length)
    .map((commit) => {
      // A merge commit's own message is usually the pull request title, so
      // the note is looked up in the commits the merge brought in.
      if (commit.parents.length < 2 || trailer(commit.body, 'Change-Note')) return commit;
      const merged = execFileSync(
        'git',
        ['log', '--format=%B', `${commit.parents[0]}..${commit.parents[1]}`],
        {cwd: siteDir, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024},
      );
      return {...commit, body: `${commit.body}\n${merged}`};
    });
}

function trailer(body, name) {
  const match = body.match(new RegExp(`^${name}:\\s*(.+)$`, 'mi'));
  return match ? match[1].trim() : null;
}


function loadNotes(siteDir, notesFile) {
  const file = path.join(siteDir, notesFile);
  if (!fs.existsSync(file)) return {};
  return yaml.load(fs.readFileSync(file, 'utf8')) || {};
}

// Follows every move in history, so a page changed before a move is found
// where it is today.
function pathResolver(commits) {
  const renames = new Map(
    commits.flatMap((c) => c.changes).filter((c) => c.from).map((c) => [c.from, c.file]),
  );
  return (file) => {
    const seen = new Set();
    while (renames.has(file) && !seen.has(file)) {
      seen.add(file);
      file = renames.get(file);
    }
    return file;
  };
}

// Folder moves, inferred from the page moves in history: each old top
// folder maps to the folder most of its pages moved to.
function folderMoves(commits) {
  const votes = new Map();
  for (const {from, file} of commits.flatMap((c) => c.changes)) {
    if (!from) continue;
    const [a, b] = [from.split('/')[1], file.split('/')[1]];
    if (a === b) continue;
    if (!votes.has(a)) votes.set(a, new Map());
    votes.get(a).set(b, (votes.get(a).get(b) || 0) + 1);
  }
  return new Map(
    [...votes].map(([a, targets]) => [a, [...targets].sort((x, y) => y[1] - x[1])[0][0]]),
  );
}

// Follows folder moves until the folder that exists today.
function currentFolder(moves, folder) {
  const seen = new Set();
  while (moves.has(folder) && !seen.has(folder)) {
    seen.add(folder);
    folder = moves.get(folder);
  }
  return folder;
}

function countByStatus(changes) {
  const counts = {A: 0, M: 0, R: 0, D: 0};
  for (const c of changes) counts[c.status] += 1;
  return counts;
}

function source(commit, settings) {
  const {repoUrl, tickets} = settings;
  // "Merge pull request #12 from …" or a squash merge "Title (#12)".
  const pr =
    commit.subject.match(/^Merge pull request #(\d+)/) || commit.subject.match(/\(#(\d+)\)$/);
  const keys = tickets ? commit.subject.match(new RegExp(tickets.pattern, 'g')) || [] : [];
  return {
    commit: commit.short,
    commitUrl: repoUrl ? `${repoUrl}/commit/${commit.hash}` : null,
    pr: pr && repoUrl ? {id: pr[1], url: `${repoUrl}/pull/${pr[1]}`} : null,
    tickets: [...new Set(keys)].map((id) => ({id, url: tickets.url + id})),
    author: commit.author,
  };
}

// One entry per commit. Sections and titles are filled in later, once the
// sidebars are known.
function changeEntry(commit, extra, settings) {
  const {resolve, isReleaseNote, smallChangeLimit} = settings;
  const changes = commit.changes.filter((c) => !isReleaseNote(c.file));
  const note = (extra && extra.note) || trailer(commit.body, 'Change-Note');
  const counts = countByStatus(changes);
  const structural = counts.A + counts.R + counts.D > 0;
  return {
    id: commit.short,
    date: commit.date,
    kind: note || structural || changes.length >= smallChangeLimit ? 'change' : 'small',
    note: note ? note.replace(/\.$/, '') : null,
    counts,
    pages: changes.map(({status, file}) => ({
      status,
      file: status === 'D' ? file : resolve(file),
    })),
    source: source(commit, settings),
  };
}

function releaseNoteEntries(commits, resolve) {
  const byMonth = new Map();
  for (const commit of commits) {
    const month = commit.date.slice(0, 7);
    if (!byMonth.has(month)) byMonth.set(month, []);
    byMonth.get(month).push(commit);
  }
  return [...byMonth.values()].map((list) => {
    const changes = list.flatMap((c) => c.changes);
    const files = new Set(changes.map((c) => c.file));
    const added = new Set(changes.filter((c) => c.status === 'A').map((c) => c.file));
    const versions = [
      ...new Set([...files].map((f) => f.split('/')[2]).filter((v) => /^v\d/.test(v))),
    ].sort((x, y) => compareVersions(x.slice(1), y.slice(1)));
    const range =
      versions.length > 3 ? `${versions[0]} to ${versions[versions.length - 1]}` : versions.join(', ');
    return {
      id: `release-notes-${list[0].date.slice(0, 7)}`,
      date: list[0].date,
      kind: 'release-notes',
      note: null,
      title:
        `Release notes: ${files.size} page${files.size === 1 ? '' : 's'}` +
        (range ? ` (${range})` : ''),
      counts: {A: added.size, M: files.size - added.size, R: 0, D: 0},
      pages: [],
      sampleFile: resolve([...files][0]),
      source: null,
    };
  });
}

// Doc ids in a sidebar item, including category index pages.
function docIds(item) {
  if (item.type === 'doc' || item.type === 'ref') return [item.id];
  if (item.type !== 'category') return [];
  const own = item.link && item.link.type === 'doc' ? [item.link.id] : [];
  return [...own, ...item.items.flatMap(docIds)];
}

// The filter sections are the navigation roots. A sidebar that is one root
// category (one sidebar per navbar tab) is one section. A sidebar with
// several top-level items has one section per top-level category, and its
// loose pages share one section. Each section keeps its category link.
function navigationRoots(version) {
  const sections = [];
  const sectionOfDoc = new Map();
  const add = (id, label, item, ids) => {
    sections.push({id, label, link: item && item.link, firstDoc: ids[0]});
    for (const docId of ids) if (!sectionOfDoc.has(docId)) sectionOfDoc.set(docId, id);
  };
  for (const [sidebarId, items] of Object.entries(version.sidebars || {})) {
    if (items.length === 1 && items[0].type === 'category') {
      add(sidebarId, items[0].label, items[0], docIds(items[0]));
      continue;
    }
    const loose = [];
    for (const item of items) {
      if (item.type === 'category') {
        add(`${sidebarId}/${item.label}`, item.label, item, docIds(item));
      } else {
        loose.push(...docIds(item));
      }
    }
    if (loose.length) add(`${sidebarId}/pages`, 'Other pages', null, loose);
  }
  return {sections, sectionOfDoc};
}

// URL a section starts at: its category page, else its first page.
function sectionUrl(section, docById) {
  const {link} = section;
  if (link && link.permalink) return link.permalink;
  if (link && link.type === 'doc' && docById.has(link.id)) return docById.get(link.id).permalink;
  return docById.get(section.firstDoc)?.permalink || null;
}

module.exports = function docsChangelogPlugin(context, options = {}) {
  const {siteDir, siteConfig, baseUrl} = context;
  const routeBasePath = options.routeBasePath || 'updates';
  const docsPath = options.docsPath || 'docs';
  const notesFile = options.notesFile || 'changelog-notes.yml';
  const {organizationName, projectName} = siteConfig;
  const repoUrl =
    options.repoUrl ||
    (organizationName && projectName
      ? `https://github.com/${organizationName}/${projectName}`
      : null);
  const releaseFolder = options.releaseNotesPath
    ? path.relative(docsPath, options.releaseNotesPath).split(path.sep)[0]
    : null;
  const topFolder = (file) => file.split('/')[1];
  const shortPath = (file) => file.slice(docsPath.length + 1);

  return {
    name: 'docs-changelog',

    async loadContent() {
      const notes = loadNotes(siteDir, notesFile);
      const noteFor = (commit) =>
        Object.entries(notes).find(([hash]) => commit.hash.startsWith(String(hash)))?.[1];
      const commits = readCommits(siteDir, docsPath);
      const moves = folderMoves(commits);
      const settings = {
        resolve: pathResolver(commits),
        isReleaseNote: (file) =>
          releaseFolder !== null && currentFolder(moves, topFolder(file)) === releaseFolder,
        smallChangeLimit: options.smallChangeLimit || 5,
        repoUrl,
        tickets: options.tickets || null,
      };
      const releaseOnly = commits.filter((c) =>
        c.changes.every((x) => settings.isReleaseNote(x.file)),
      );
      const entries = [
        ...commits
          .filter((c) => !releaseOnly.includes(c))
          .map((c) => changeEntry(c, noteFor(c), settings)),
        ...releaseNoteEntries(releaseOnly, settings.resolve),
      ].sort((a, b) => b.date.localeCompare(a.date));
      return {entries, moves: Object.fromEntries(moves)};
    },

    // Page URLs, titles and sections come from the docs plugin, so they match
    // the navigation readers see on this site.
    async allContentLoaded({allContent, actions}) {
      const {entries, moves} = allContent['docs-changelog'].default;
      const loaded = allContent['docusaurus-plugin-content-docs']?.default?.loadedVersions || [];
      const version = loaded.find((v) => v.versionName === 'current') || loaded[0];
      const docs = version ? version.docs : [];
      const docByFile = new Map(docs.map((d) => [d.source.replace(/^@site\//, ''), d]));
      const docById = new Map(docs.map((d) => [d.id, d]));
      const {sections, sectionOfDoc} = version
        ? navigationRoots(version)
        : {sections: [], sectionOfDoc: new Map()};
      const labelOf = new Map(sections.map((s) => [s.id, s.label]));

      // For pages that no longer exist: the section of the first page found
      // today in the folder their folder became.
      const sectionOfFolder = new Map();
      for (const doc of docs) {
        const folder = topFolder(doc.source.replace(/^@site\//, ''));
        const section = sectionOfDoc.get(doc.id);
        if (section && !sectionOfFolder.has(folder)) sectionOfFolder.set(folder, section);
      }
      const moveMap = new Map(Object.entries(moves));
      const sectionOfFile = (file) => {
        const doc = docByFile.get(file);
        if (doc) return sectionOfDoc.get(doc.id) || null;
        return sectionOfFolder.get(currentFolder(moveMap, topFolder(file))) || null;
      };

      const out = entries.map(({note, sampleFile, ...entry}) => {
        if (entry.kind === 'release-notes') {
          const section = sectionOfFile(sampleFile);
          return {...entry, sections: section ? [section] : []};
        }
        const pages = entry.pages.map(({status, file}) => {
          const doc = status === 'D' ? null : docByFile.get(file);
          return {
            status,
            title: doc ? doc.title : shortPath(file),
            url: doc ? doc.permalink : null,
          };
        });
        const sectionIds = [
          ...new Set(entry.pages.map((p) => sectionOfFile(p.file)).filter(Boolean)),
        ];
        let title = note;
        if (!title) {
          // Built from what happened to the pages, never from the commit subject.
          const main = Object.keys(entry.counts).sort((a, b) => entry.counts[b] - entry.counts[a])[0];
          const n = pages.length;
          const where = sectionIds.length === 1 ? ` in ${labelOf.get(sectionIds[0])}` : '';
          title =
            n === 1 && pages[0].url
              ? `${VERBS[main]} ${pages[0].title}`
              : `${VERBS[main]} ${n} page${n === 1 ? '' : 's'}${where}`;
        }
        return {...entry, title, hasNote: Boolean(note), sections: sectionIds, pages};
      });

      const releaseDoc = releaseFolder && docs.find(
        (d) => topFolder(d.source.replace(/^@site\//, '')) === releaseFolder,
      );
      const releaseSection = releaseDoc && sections.find((s) => s.id === sectionOfDoc.get(releaseDoc.id));
      const used = new Set(out.flatMap((e) => e.sections));
      const data = await actions.createData(
        'changelog.json',
        JSON.stringify({
          entries: out,
          sections: sections.filter((s) => used.has(s.id)).map(({id, label}) => ({id, label})),
          releaseNotesUrl:
            options.releaseNotesUrl ||
            (releaseSection ? sectionUrl(releaseSection, docById) : null),
          compareUrl: options.compareUrl || null,
        }),
      );
      actions.addRoute({
        path: normalizeUrl([baseUrl, routeBasePath]),
        component: '@site/src/components/DocsChangelog/ChangelogPage',
        modules: {changelog: data},
        exact: true,
      });
    },

    getPathsToWatch() {
      return [path.join(siteDir, notesFile)];
    },
  };
};
