---
name: idempiere-feature-docs
description: Writing iDempiere New Feature pages and migration notes in the documentation repository. Use when documenting a new feature, improvement or breaking change from an IDEMPIERE ticket or core pull request, adding a migration note, or moving a page from new-features/in-development to a version folder (v14, ...) after the core PR is merged.
---

# New Feature pages and migration notes

The core pull request template asks for documentation when a change is a new feature, a breaking change, or an improvement that changes how users work or what a process produces. This skill covers writing that documentation here.

All rules in `AGENTS.md` and `docs/documentation-standards.md` apply: do not invent facts, follow the writing standards, no em dashes, no banned words.

## 1. Gather the facts first

You need all of these before writing. Ask the user for anything missing, or read the core pull request or diff if you have access to it.

- Jira ticket (`IDEMPIERE-####`) and the core pull request link.
- Developer name, profile link and company (shown in the page header).
- Goal: use one of the values already in use, such as Functional, Technical, Usability, User Experience or New OSGi Service.
- The problem the feature solves and who it is for.
- How to use it: windows, fields, processes, SysConfig keys, roles, default values.
- Whether it changes existing behavior or breaks plugins (then it also needs a migration note).

Never guess window names, field names, SysConfig keys, default values or version numbers. If a fact is missing, write `<!-- TODO: verify: <question> -->` and tell the user.

## 2. Create the page

- Location: `docs/new-features/in-development/` while the core pull request is not merged.
- File name: short kebab-case, e.g. `avoid-sequence-locks.md`.
- `sidebar_position`: look at the sibling pages and pick the next free number.
- Start from `docs/_templates/new-feature.md`. It follows the structure of existing pages such as `docs/new-features/v14/default-view-detail-tabs.md` and `docs/new-features/in-development/avoid-sequence-locks.md`.
- Keep the "Not Yet in Stable Release" warning at the top while the page is in `in-development`.
- Set `tags` in the front matter, using only the values already in use: `functional`, `user-experience`, `technical`, `development`, `security`, `architecture`. The version compare page (`/upgrade/compare`) builds its category filters from these tags, so a new tag value creates a new filter. Ask the user before introducing one.
- Keep the `**Feature Ticket:**` line in the header block, before the first `##` heading. The version compare page reads the Jira key from it.
- In the header block, end each line with two spaces (or separate them with blank lines) so they render on separate lines.

Writing tips specific to feature pages:

- Explain the problem before the solution.
- Write setup instructions as numbered steps. Use `Window => subtab` notation and the exact names shown in the UI.
- Put details for plugin developers (new APIs, interfaces, extension points) in their own section near the end.
- Link related pages with absolute site paths, e.g. `/docs/new-features/v14/accounting-plugin`.

## 3. Screenshots

- Save images in `static/img/docs/new-features/` and reference them as `/img/docs/new-features/<Name>.png`.
- Name them after the feature and context, e.g. `DetailTabDisplayMode_CustomizeGrid.png`.
- Write meaningful alt text.
- You cannot take screenshots. Where one is needed, leave `<!-- TODO: screenshot of <window/dialog and state> -->` and list the missing screenshots for the user.

## 4. Breaking changes: add a migration note

If the change alters existing behavior, removes something, or requires action from implementers or plugin developers:

- Start from `docs/_templates/migration-note.md`.
- Use the folder of the version currently in development, e.g. `docs/migration-notes/v14/`.
- Pick the file by audience. The version compare page labels notes by file name:
  - `technical-notes.md`: developers and administrators.
  - `functional-notes.md`: consultants and functional users.
  - `removed-deprecated-apis.md`: removed or deprecated APIs, for plugin developers.
- If the file does not exist yet for that version, ask the user before creating it. Copy the front matter style from the same file in the previous version folder.
- Add one `##` section per change. The version compare page treats each `##` section as one note.
- Start the section with one plain prose paragraph that summarizes the change. The compare page shows that first paragraph as the summary and skips lists, code, tables and admonitions.
- After the summary, explain who is affected and the required action, as numbered steps when order matters.
- Link to the feature page.
- Use an admonition (`:::warning`) only for the action that would break a system if skipped.

## 5. After the core pull request is merged

- Move the page: `git mv docs/new-features/in-development/<page>.md docs/new-features/v14/<page>.md`.
- Remove the "Not Yet in Stable Release" warning.
- Check `sidebar_position` against the pages in the target folder.
- Search for links to the old path and update them: `grep -rn "in-development/<page>" docs`.

## 6. Check before committing

1. Run `npm run build` and confirm it succeeds. Read the warnings for broken markdown links.
2. Search the changed files for em dashes and banned words from `docs/documentation-standards.md`, e.g. `grep -n "—" <file>`.
3. Headings are sentence case, `##` or deeper, and short.
4. Admonitions have an empty line after the opening and before the closing `:::`. No `:::caution`.
5. No TODO comments left that the user has not seen.

## 7. Commit and pull request

- Commit message: `IDEMPIERE-#### <ticket title>`. The ticket key is linked to Jira on the docs changelog (`/updates`).
- Optionally add a `Change-Note:` trailer with one sentence for readers about what they can now find or do. The `/updates` page shows it. Example:
  ```text
  IDEMPIERE-1234 <ticket title>

  Change-Note: New page explaining how to set up <feature>.
  ```
- Do not commit or push without the user's confirmation. A push to `main` publishes the site.
- Contributors without write access push to their fork and open a pull request against `idempiere/idempiere.github.io`.
- Link the documentation pull request from the core pull request, and the other way round.
