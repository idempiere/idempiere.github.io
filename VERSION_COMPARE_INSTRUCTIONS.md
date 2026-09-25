# Version comparison page for docs.idempiere.org

Implementation brief for adding an interactive "compare two versions" page to a fork of the iDempiere documentation site. The page lets a reader pick a start and target version and see every new feature, breaking change and deprecation in between, plus one ordered migration checklist.

Hand this file to Claude Code in the root of the forked repo and say: "Implement this brief. Start with Step 0 and stop to report before Step 2."

---

## Goal

- Route `/upgrade/compare?from=11&to=13` renders the comparison.
- Release changes live as structured YAML data, one file per release, not as prose.
- Everything is static. The data is loaded at build time and filtered client side, so no backend is needed and it deploys to GitHub Pages like the rest of the site.
- The feature is isolated in its own folders so it can be proposed upstream as one clean PR.

## Step 0: inspect the repo before writing anything

The site is believed to live in `idempiere/idempiere.github.io` and run on Docusaurus. Verify this and report:

1. The Docusaurus version (`package.json`, `@docusaurus/core`). The instructions assume v3. If it is v2, adjust the imports and note the differences.
2. Whether the config is `docusaurus.config.js` or `.ts`, and whether the site uses TypeScript.
3. The package manager, from the lockfile (npm, yarn or pnpm). Use the same one.
4. Whether docs versioning (`versioned_docs/`, `versions.json`) is in use. If it is, reuse its version names.
5. Existing custom plugins, `src/components`, and the styling approach (Infima only, or Tailwind).
6. How the site is built and deployed (the GitHub Actions workflow).

Do not change any existing docs content, config or styling beyond what this brief requires.

## Step 1: folder layout

```
release-notes/                   # data, one YAML file per release
  _schema.json                   # JSON Schema for validation
  11.yml
  12.yml
  13.yml
plugins/version-compare/
  index.js                       # Docusaurus plugin: load, validate, expose data
src/components/VersionCompare/
  index.tsx                      # main component (or .jsx if the site is JS)
  ChangeItem.tsx
  MigrationChecklist.tsx
  styles.module.css
src/pages/upgrade/compare.tsx    # the page
scripts/
  scaffold-release-notes.mjs     # optional helper, see Step 7
```

## Step 2: data model

One file per release. Example `release-notes/12.yml`:

```yaml
version: "12"
releaseDate: 2024-12-15
status: lts                     # current | lts | maintenance | eol
requirements:
  java: "17"
  postgresql: "13+"
  zk: "10"
changes:
  - id: idempiere-12-osgi-model-annotation
    type: breaking              # feature | breaking | deprecation | fix | security
    area: OSGi                  # free text, used for the area filter
    audience: [developer]       # developer | admin | user (one or more)
    title: Model classes discovered by annotation
    description: |
      Short Markdown description of what changed and why.
    migration:
      - text: Add the @Model annotation to custom M_ classes.
      - text: Remove manual factory mappings.
        code: |
          // before / after snippet, optional
        lang: java
      - text: Run the migration script.
        sql: |
          -- optional SQL
    refs:
      jira: [IDEMPIERE-0000]
      pr: []
    docs: /docs/some-page       # optional link into the existing docs
```

Rules:

- `id` must be unique across all files, because it keys the checklist state.
- `version` values compare numerically ("9" < "10" < "12.1"). Use a natural sort, never a plain string sort.
- A `breaking` change must have at least one `migration` step. Validation should fail the build otherwise.
- Every entry needs at least one `refs.jira` or `refs.pr`, so each claim can be traced to its source.

Write `release-notes/_schema.json` as a JSON Schema that enforces these rules.

## Step 3: the plugin

`plugins/version-compare/index.js`:

- `loadContent()` reads every `release-notes/*.yml` file (skipping `_schema.json`), parses it with `js-yaml`, and validates it with `ajv` against the schema. On a validation error, fail the build with the file name and the failing path.
- Enforce the cross-file rules the schema can't express: unique `id`s and unique `version`s.
- Render each `description` from Markdown to HTML at build time with `marked` (or the site's existing Markdown library) and store it as `descriptionHtml`.
- Sort releases by natural version order.
- `contentLoaded()` calls `actions.setGlobalData({ releases })`.
- `getPathsToWatch()` returns `release-notes/**/*.yml` so `npm start` hot-reloads the data.

Register the plugin in the config: `plugins: ['./plugins/version-compare']`.

Add dependencies: `js-yaml`, `ajv`, and `marked` only if no Markdown library is already present.

## Step 4: the component

`VersionCompare` reads the data with `usePluginData('version-compare')`.

### Controls

- "From" and "To" dropdowns, defaulting to the oldest and newest versions. The available "from" versions include a baseline one below the first data file, such as `10` if the data starts at `11`.
- Type filter chips: All, Breaking, Features, Deprecated, Fixes, Security.
- Audience toggle: All, Developer, Admin, User.
- Area filter: a dropdown built from the distinct `area` values.
- A "Copy link" button that copies the current URL.

### State in the URL

Sync `from`, `to`, `type`, `audience` and `area` to query params with `useLocation` and `useHistory` from `@docusaurus/router`. Use `replace`, not `push`. Initialize the state from the URL, so a shared link reproduces the exact view.

### Logic

- Selected releases are those with `from < version <= to`.
- If `from >= to`, show an inline error ("Pick a target version newer than the starting one") and render nothing else.
- Summary cards show the number of releases, breaking changes, features, deprecations and migration steps, all computed after the filters are applied.
- Show a requirements delta: if `java`, `postgresql` or `zk` differs between the from-version and the to-version, show it at the top ("Java 11 → 17").

### Rendering

- Changes are grouped by version in ascending order, each group headed by the version and its release date.
- Each change shows a type badge, area badge, title, the rendered description, Jira/PR links (`https://idempiere.atlassian.net/browse/{key}`) and the docs link if there is one.
- Breaking changes show their migration steps inline.
- A separate "Migration checklist" section at the bottom lists all migration steps from all selected breaking changes, in version order then file order. Each step has a checkbox, and code/SQL appears in a code block using the theme's `CodeBlock` component.
- Checkbox state is stored in `localStorage` under the key `vc:{from}-{to}:{changeId}:{stepIndex}`. Wrap all `localStorage` access in `useEffect` and `try/catch`, since it isn't available during SSR.

### Styling

- Use Infima variables (`--ifm-color-*`, `--ifm-font-*`) in `styles.module.css`, so light and dark mode both work with no extra effort.
- Badge colors: breaking uses danger, feature uses success, deprecation uses warning, and fix and security use secondary and info.
- Add a `@media print` block that hides the controls, navbar and footer, and keeps the checklist on its own page. This lets someone print or save the page as a PDF upgrade plan.

### SSR safety

The component must render during `npm run build` without touching `window`. Anything browser-only goes in `useEffect` or uses `useIsBrowser()`.

## Step 5: page and navigation

- `src/pages/upgrade/compare.tsx` wraps the component in `<Layout title="Compare versions">`.
- Add a navbar item or footer link labelled "Compare versions" pointing to `/upgrade/compare`.
- If the docs have an upgrade or migration section, add a short MDX page there linking to the comparison.

## Step 6: seed data

Populate `11.yml`, `12.yml` and `13.yml` from real sources only. Never invent changes.

- The iDempiere wiki pages for each version's new features and release notes.
- Jira: tickets with a fix version per release, starting with those labelled or discussed as breaking.
- The `migration/` folder of the `idempiere/idempiere` repo, which shows which releases changed the schema. Check its exact layout first.

Start with around 5–10 well-sourced entries per release, rather than a long list of weak ones. Where the source is unclear, leave the entry out and list it in a `release-notes/TODO.md` for a human to confirm.

## Step 7: optional scaffolding script

`scripts/scaffold-release-notes.mjs <version>` creates a new `release-notes/<version>.yml` with the header filled in and an empty `changes` list, then prints the Jira search URL for that fix version. Don't call the Jira API or scrape anything here. It's only a starting point for a human.

## Step 8: checks

- `npm run build` passes with no SSR errors.
- An invalid YAML file (a breaking change without migration steps, or a duplicate id) fails the build with a clear message.
- `/upgrade/compare?from=11&to=13&type=breaking` loads directly with those filters applied.
- Changing "from" to be greater than or equal to "to" shows the error, not an empty page.
- Checklist ticks survive a page reload.
- Dark mode and print preview both look correct.
- The layout works at mobile width (below 400px): the controls wrap, and code blocks scroll horizontally instead of the whole page.

## Step 9: deliver

- Make one commit per step (data model, plugin, component, page, seed data), so it's easy to review.
- Write a `release-notes/README.md` explaining how to add a release and the meaning of each field, for future contributors.
- Report back with what was verified in Step 0, any deviations from this brief, and the entries parked in `TODO.md`.

## Later extensions, out of scope for now

- A CloudEmpiere/CLDE overlay: a second data folder, such as `release-notes-clde/`, merged in with a source badge, so one view shows both upstream and fork changes.
- Generating the entries automatically from Jira fix versions in CI.
- Linking each change to the matching page in `versioned_docs/`.
