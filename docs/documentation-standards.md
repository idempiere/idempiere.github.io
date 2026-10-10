---
sidebar_position: 99
description: How to write and format pages for the iDempiere documentation, including frontmatter, naming, code examples, screenshots and review.
tags: [development]
applies_to: all
last_reviewed: 2026-10-10
owner: norbertbede
---
# Documentation standards

This page lists the rules for writing pages on this site. Follow it when you add or change a page. Reviewers use it to check pull requests.

The rules apply to people and AI agents alike. Agents also follow the extra rules in [AGENTS.md](https://github.com/idempiere/idempiere.github.io/blob/main/AGENTS.md).

## Page structure

- The first `#` heading is the page title. Docusaurus shows it as the page title and in the sidebar.
- All other headings are `##` or deeper. Do not skip levels, for example from `##` to `####`.
- Open the page with one or two sentences that say what the page covers and who it is for.
- After the opening sentences, state which iDempiere versions the page applies to, for example "Applies to iDempiere 9 and later."
- Start from a [page template](#page-templates) when you create a new page.

<!-- TODO: verify: about 445 pages also set `title` in frontmatter, and the New Feature template does too. Decide whether `title` in frontmatter is allowed, and if so, whether it must match the first heading. -->

## Frontmatter

Every page starts with a YAML frontmatter block. The automatic check reports missing or invalid fields as warnings.

```yaml title="docs/basic-development/plugin-development/plugin-callouts.md"
---
sidebar_position: 30
description: Learn how to register a column callout in an iDempiere plug-in.
tags: [development]
applies_to: ">=9"
last_reviewed: 2026-10-10
owner: github-username
---
```

### Required fields

| Field | Format | Purpose |
| --- | --- | --- |
| `description` | One sentence, 50 to 160 characters | Shown in search results, link previews and `llms.txt`. Say what the reader can do with the page. |
| `tags` | List of tag values | Groups pages on tag pages and on the version compare page. See [Tags](#tags). |
| `applies_to` | Version range, see below | The iDempiere versions the page is valid for. |
| `last_reviewed` | Date, `YYYY-MM-DD` | The last time someone checked the page against the current release. |
| `owner` | GitHub username | The person to ask about the page. |

### Optional fields

| Field | Format | Purpose |
| --- | --- | --- |
| `sidebar_position` | Number | Order within the folder. |
| `sidebar_label` | Short text | Sidebar text when the title is too long. |
| `deprecated_in` | Version, for example `"14"` | The release that deprecated the feature or approach. |
| `superseded_by` | Path of the replacement page | Where readers should go instead. |

### Version ranges

Write `applies_to` as a quoted string in one of these forms:

| Value | Meaning |
| --- | --- |
| `all` | Not tied to a version |
| `"12"` | Only iDempiere 12 |
| `">=9"` | iDempiere 9 and later |
| `"9-12"` | iDempiere 9 to 12 |

### Tags

Use tag values that are already in use. New Feature pages use one of these, because the [version compare page](/upgrade/compare) builds its filters from them:

- `functional`
- `user-experience`
- `technical`
- `development`
- `security`
- `architecture`

Ask in the pull request before you add a new tag value.

## Naming iDempiere things

### Entities and records

- Capitalize the name of an iDempiere entity: Business Partner, Sales Order, Product.
- Put a specific record in quotes, followed by the entity: "Azalea Bush" Product, "System" Tenant.
- Write Tenant, not Client, in text for readers. The database still uses `AD_Client_ID`, so keep that name in code and SQL.

### Windows, tabs and fields

- Write window, tab and field names exactly as the user interface shows them: Sales Order window.
- Use `=>` for navigation into a subtab: Sales Order window => Order Line subtab.
- Write "subtab" as one word. A subtab is a tab with Tab Level greater than 0.

### Application Dictionary names

Format technical names as inline code:

| Kind | Example |
| --- | --- |
| Table | `C_Order` |
| Column | `C_Order.DocStatus` |
| Model class | `MOrder` |
| Generated interface | `I_C_Order` |
| Process class | `org.compiere.process.InvoiceGenerate` |

When the reader works in a window, give the user-interface name first and the technical name after it: Document Status (`DocStatus`).

### Document status and action codes

Write the name and give the code in code format the first time it appears: Completed (`CO`). Use the names as iDempiere shows them.

| Document status | Code |
| --- | --- |
| Drafted | `DR` |
| In Progress | `IP` |
| Completed | `CO` |
| Closed | `CL` |
| Voided | `VO` |
| Reversed | `RE` |
| Invalid | `IN` |
| Approved | `AP` |
| Not Approved | `NA` |

| Document action | Code |
| --- | --- |
| Complete | `CO` |
| Prepare | `PR` |
| Approve | `AP` |
| Reject | `RJ` |
| Void | `VO` |
| Close | `CL` |
| Reverse - Correct | `RC` |
| Reverse - Accrual | `RA` |
| Re-activate | `RE` |

<!-- TODO: verify: confirm both lists against the current AD reference lists (_Document Status, _Document Action) before merge. -->

### System Configurator keys

Write a key in code format: `ZK_THEME`. When a page introduces or depends on keys, list them in a table:

| Key | Default | Level | What it does |
| --- | --- | --- | --- |
| `EXAMPLE_KEY` | `N` | System | Example row. Replace it with the real key. |

Never guess a key name or default value. Look it up in the System Configurator window or in the core migration scripts.

## Writing style

### Voice and tone

- Write like a person, not like marketing copy.
- Be direct and factual. Leave out filler.
- Use active voice where possible.
- Prefer short sentences to long compound ones.

### Words to avoid

These words add nothing or sound like generated text. The automatic check flags them.

- seamlessly
- streamline, streamlines, streamlined
- leverage (as a verb)
- robust
- utilize (write "use")
- empower, empowers
- cutting-edge
- game-changer
- comprehensive (as filler)
- dive deep, dive into
- delve
- unlock potential
- out of the box (unless it means a literal software default)
- best-in-class
- revolutionize

### Punctuation

- Do not use em dashes (—). Use a period, a comma or a new sentence.
- Prefer a new sentence to a long aside in brackets.
- Use hyphens only for compound adjectives, such as "multi-tenant setup".

### Lists

- Use numbered lists when the order matters.
- Use bullet lists for three or more items in no particular order.
- Do not nest lists more than one level deep. Give complex sub-points their own section.
- Keep one idea per bullet.

### Headings

- Use sentence case: "Basic installation", not "Basic Installation". Proper nouns keep their capitals.
- Keep headings short, ideally under six words.
- Make headings describe the task or topic: "Register the callout", not "Step 2".
- Do not put emoji in headings. They end up in the link anchor, for example `#-goal`.
- Do not add a heading for every paragraph.

### Admonitions

Use Docusaurus admonitions for content that needs to stand out:

| Type | Use for |
| --- | --- |
| `:::note` | Helpful extra context |
| `:::tip` | A good practice or shortcut |
| `:::info` | Important background |
| `:::warning` | Something the reader should be careful about |
| `:::danger` | An action that can break something or lose data |

- Do not use `:::caution`. It is deprecated in Docusaurus 3. Use `:::warning`.
- Leave an empty line after the opening `:::` line and before the closing `:::`.
- Use admonitions rarely. If every other paragraph is a callout, none of them stand out.

## Code examples

- Give every code block a language, such as `java`, `sql`, `xml`, `bash`, `properties` or `yaml`.
- When the code belongs in a file, add a `title` with the file path, for example `title="src/com/example/callout/MyCallout.java"`.
- Show complete code a reader can copy: include the `package` line and all `import` lines.
- Say which iDempiere version you tested the code on, in a sentence before the block.
- For SQL, say whether it is for PostgreSQL, Oracle or both. Show PostgreSQL first when only one is given.
- Do not leave trailing spaces or runs of blank lines in code.

## Screenshots and diagrams

- Take screenshots in the GardenWorld demo Tenant, with the default theme and the `en_US` language, so pages look alike.
- Crop to the part of the screen that matters.
- Write alt text that says what the screenshot shows. Alt text is required.
- Put images under `static/img/docs/<section>/` and reference them as `/img/docs/<section>/<file>.png`.
- Prefer diagrams written as text over image files, so others can edit them.

<!-- TODO: verify: Mermaid is not enabled on this site yet (@docusaurus/theme-mermaid). Enable it before requiring Mermaid diagrams. -->

## Page templates

Copy a template from [`docs/_templates/`](https://github.com/idempiere/idempiere.github.io/tree/main/docs/_templates) when you create a page. Folders that start with `_` are not published.

| Template | Use it for |
| --- | --- |
| [`how-to.md`](https://github.com/idempiere/idempiere.github.io/blob/main/docs/_templates/how-to.md) | Steps to reach one goal, such as registering a callout |
| [`concept.md`](https://github.com/idempiere/idempiere.github.io/blob/main/docs/_templates/concept.md) | Explaining how something works |
| [`reference.md`](https://github.com/idempiere/idempiere.github.io/blob/main/docs/_templates/reference.md) | Lists of settings, keys or API members |
| [`new-feature.md`](https://github.com/idempiere/idempiere.github.io/blob/main/docs/_templates/new-feature.md) | A New Feature page for one IDEMPIERE ticket |
| [`plugin.md`](https://github.com/idempiere/idempiere.github.io/blob/main/docs/_templates/plugin.md) | A page in Available Plugins |
| [`migration-note.md`](https://github.com/idempiere/idempiere.github.io/blob/main/docs/_templates/migration-note.md) | A breaking change or removed API in a release |

## Automatic checks

Each pull request runs these checks on the pages it changes. For now they only warn and do not block the merge.

- **markdownlint** checks heading levels, list style and trailing spaces. Configuration: `.markdownlint-cli2.jsonc`.
- **Vale** checks the words to avoid, em dashes and sentence-case headings. Rules: `styles/iDempiere/`.
- **Frontmatter check** reports missing or invalid frontmatter fields. Run it locally with `npm run lint:frontmatter`.
- **Link check** runs once a week on external links and reports broken ones.

## Process

:::info Proposal

This section is a proposal for discussion in the community. It is not agreed yet.

:::

### Review

A reviewer checks that a pull request:

1. Follows this page.
2. Has correct facts for the versions in `applies_to`.
3. Builds without errors (`npm run build`).
4. Has screenshots and code that match the text.

### Ownership and review cycle

- Each section of the site has one or more owners who review its pull requests.
- The `owner` field names the person to ask about a page.
- Owners review their pages at least every 12 months and update `last_reviewed`.

### Deprecation

When a feature or approach is deprecated:

1. Set `deprecated_in` and, if there is one, `superseded_by` in the frontmatter.
2. Add a `:::warning` at the top of the page that links to the replacement.
3. Keep the page while supported releases still use the feature.

### Docs or wiki

- New and updated documentation goes on this site.
- The [wiki](https://wiki.idempiere.org) keeps historical material, meeting notes and community pages.
- When a wiki page moves here, link from the wiki page to the new page.

### AI-assisted contributions

- You may use AI tools to draft or edit pages.
- You are responsible for every fact in the pull request. Check names, versions, keys and code against iDempiere before you open it.
- Mark anything you could not check with `<!-- TODO: verify: ... -->` and mention it in the pull request.
