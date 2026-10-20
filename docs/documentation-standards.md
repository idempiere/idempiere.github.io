# Documentation standards

> How to write and format pages for the iDempiere documentation, including frontmatter, naming, code examples, screenshots and review.

This page lists the rules for writing pages on this site. Follow it when you add or change a page. Reviewers use it to check pull requests.

The rules apply to people and AI agents alike. Agents also follow the extra rules in [AGENTS.md](https://github.com/idempiere/idempiere.github.io/blob/main/AGENTS.md).

## Page structure

- The first `#` heading is the page title. Docusaurus shows it as the page title and in the sidebar.
- All other headings are `##` or deeper. Do not skip levels, for example from `##` to `####`.
- Open the page with one or two sentences that say what the page covers and who it is for.
- After the opening sentences, state which iDempiere versions the page applies to, for example "Applies to iDempiere 9 and later."
- New Feature pages are the exception: their **Version:** line states the version, so they do not need the sentence.
- Do not set `title` in the frontmatter. It would duplicate the first heading.
- Start from a [page template](#page-templates) when you create a new page.

## Folders

- Each folder has a `_category_.json` file with the sidebar label and position.
- When the folder has a generated index page, set `link.slug` to the folder path, for example `"slug": "/new-features/v15"` for `docs/new-features/v15/`. Write dots in the version as dashes (`/new-features/v1-0`). Without `slug`, the index page is published at `/docs/category/<label>`.

## Frontmatter

Every page starts with a YAML frontmatter block. The automatic check reports missing or invalid fields. See [What blocks a merge](#what-blocks-a-merge).

```yaml title="docs/basic-development/plugin-development/plugin-callouts.md"
---
sidebar_position: 30
description: Learn how to register a column callout in an iDempiere plug-in.
tags: [development]
applies_to: ">=9"
last_reviewed: 2026-10-10
---
```

### Required fields

| Field | Format | Purpose |
| --- | --- | --- |
| `description` | One sentence, 50 to 160 characters | Shown in search results, link previews and `llms.txt`. Say what the reader can do with the page. |
| `tags` | List of tag values | Groups pages on tag pages and on the version compare page. See [Tags](#tags). |
| `applies_to` | Version range, see below | The iDempiere versions the page is valid for. |
| `last_reviewed` | Date, `YYYY-MM-DD` | The last time someone checked the page against the current release. |

### Optional fields

| Field | Format | Purpose |
| --- | --- | --- |
| `sidebar_position` | Number | Order within the folder. |
| `sidebar_label` | Short text | Sidebar text when the title is too long. |
| `deprecated_in` | Version, for example `"14"` | The release that deprecated the feature or approach. |
| `superseded_by` | Path of the replacement page | Where readers should go instead. |
| `owner` | GitHub username | Someone who knows the topic and can answer questions. Anyone can still change the page. |

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
| Waiting Payment | `WP` |
| Waiting Confirmation | `WC` |
| Approved | `AP` |
| Not Approved | `NA` |
| Completed | `CO` |
| Closed | `CL` |
| Voided | `VO` |
| Reversed | `RE` |
| Invalid | `IN` |
| Unknown | `??` |

| Document action | Code |
| --- | --- |
| Complete | `CO` |
| Prepare | `PR` |
| Approve | `AP` |
| Reject | `RJ` |
| Post | `PO` |
| Void | `VO` |
| Close | `CL` |
| Reverse - Correct | `RC` |
| Reverse - Accrual | `RA` |
| Re-activate | `RE` |
| Invalidate | `IN` |
| Unlock | `XL` |
| Wait Complete | `WC` |
| &lt;None&gt; | `--` |

The lists match the document status and action codes in iDempiere core (`DocAction.java`).

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

### Checking Java snippets

Check the Java blocks on a page against the iDempiere source before you open a pull request. The check does not compile the code or look at method calls. It checks that the classes exist, and that each full class has a `package` line, a `title` and its imports.

1. Keep a local clone of iDempiere. The check only reads its git data and changes nothing. It uses `upstream/master`, then `origin/master`, then `master`, whichever the clone has first. To check another version, add `--ref`, for example `--ref upstream/release-13`.
2. Run it on the pages you changed:

   ```bash
   npm run lint:java -- --source ~/src/idempiere docs/basic-development/plugin-development/plugin-eventhandler.md
   ```

3. Read the result:
   - An **error** is an `org.adempiere`, `org.compiere` or `org.idempiere` import that does not exist in that version, or exists in another package. The message names the right class when there is one. Fix errors before the merge. The exit code is 1.
   - A **warning** is a full class without a `package` line or a `title`, or a class that is used but not imported. Fix the warnings on the code you change.

The check skips classes that the page declares itself, such as `MyEventHandler`, and types from `java.*`, `org.osgi.*` and `org.zkoss.*`. A block without a class declaration is a fragment. The check looks at its imports but does not ask for a `package`, `title` or `import` lines. The check is not part of the pull request checks.

## Screenshots

- Take screenshots in the GardenWorld demo Tenant, with the default theme and the `en_US` language, so pages look alike.
- Crop to the part of the screen that matters.
- Write alt text that says what the screenshot shows. Alt text is required.
- Put images under `static/img/docs/<section>/` and reference them as `/img/docs/<section>/<file>.png`. Pages since iDempiere 13 use this path. Older pages under `static/img/new-features/` stay where they are.

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

Each pull request runs these checks on the pages it changes. Findings show up as annotations on the pull request.

- **markdownlint** checks heading levels, list style and trailing spaces. Configuration: `.markdownlint-cli2.jsonc`.
- **Vale** checks the words to avoid, em dashes and sentence-case headings. Rules: `styles/iDempiere/`.
- **Frontmatter check** reports missing or invalid frontmatter fields. Run it locally with `npm run lint:frontmatter`. For a new page, run `node scripts/check-frontmatter.js --strict <page>`.
- **Java snippet check** compares the imports and class names in Java code blocks with the iDempiere source. It is not part of the pull request checks. See [Checking Java snippets](#checking-java-snippets).
- **Link check** runs once a week on external links and reports broken ones.

### What blocks a merge

A new page must pass all checks:

- markdownlint finds no problems.
- The frontmatter has every required field, in the right format.
- Vale finds no em dashes and no words to avoid.

On a page that already exists, the pull request only has to keep its own changes clean:

- Vale finds no em dashes and no words to avoid on the lines you add or change.
- Frontmatter fields that are set have the right format, for example `last_reviewed: 2026-10-19` or `applies_to: ">=9"`.

If Vale flags a word that is correct in context, such as "leverage" as a noun in "financial leverage", turn the rule off around that line and turn it back on after it:

```markdown
<!-- vale iDempiere.AvoidWords = NO -->
Financial leverage is the ratio of debt to equity.
<!-- vale iDempiere.AvoidWords = YES -->
```

Everything else on an existing page, such as a missing frontmatter field or an older markdownlint problem, is a warning. Fix it when you can, but it does not block the merge. Set `applies_to` and `last_reviewed` only after you have checked the page against the current release.
