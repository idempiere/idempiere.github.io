# Upgrade notes

These files feed the "Show upgrade notes" part of the [Compare versions](https://docs.idempiere.org/upgrade/compare) page. New features are listed there automatically from `docs/new-features/`. This folder holds what the feature articles don't cover: what you have to do when you migrate.

There is one file per release, named after the release: `11.yml`, `12.yml`, and so on. The build checks every file against `_schema.json` and stops with the file name and field if something is wrong.

## Adding an entry

1. Open the file for the release where the change landed, or create it with `version` and an empty `changes` list.
2. Add an entry under `changes`. Copy an existing one as a starting point.
3. Run `npm start` and open `/upgrade/compare?notes=1` to check it.

Only add what you can point to. Every entry needs a Jira ticket or a pull request link. If you are not sure about something, ask on the forum or in Mattermost before adding it.

## Example

```yaml
version: "11"
requirements:
  java:
    value: "17"
    source: https://example.org/link-to-where-this-is-stated
changes:
  - id: v11-example-change
    type: breaking
    area: Database
    audience: [developer, admin]
    title: Short title in plain words
    description: |
      What changed and why it matters for an upgrade. `Inline code` is allowed.
    steps:
      - text: First thing to do.
      - text: Run this in the database.
        code: |
          SELECT 1;
        lang: sql
    refs:
      jira: [IDEMPIERE-0000]
    docs: /docs/new-features/v11/some-article
```

## Fields

| Field | Required | Meaning |
|---|---|---|
| `version` | Yes | The release, as a quoted string. It must match the `docs/new-features/v<version>` folder. |
| `requirements` | No | Platform versions the release needs: `java`, `postgresql`, `oracle`, `zk`. Each has a `value` and a `source` link. The page shows the difference between the two selected versions. |
| `changes[].id` | Yes | Unique across all files, lowercase with hyphens. Checklist ticks are stored under it, so don't rename it after publishing. |
| `changes[].type` | Yes | One of the types below. |
| `changes[].area` | Yes | Free text, for example Database, OSGi, Web services, Accounting. |
| `changes[].audience` | Yes | Who has to act: `developer`, `consultant` (consultants and testers), `admin`. One or more. |
| `changes[].title` | Yes | Short and plain. |
| `changes[].description` | Yes | What changed and why it matters for an upgrade. |
| `changes[].steps` | For `breaking`, `incompatible` and `action` | What to do, in order. Each step has `text` and optionally `code` with `lang` (`java`, `sql`, `bash`, `xml`, `properties`, `text`). |
| `changes[].refs` | Yes | `jira` keys and/or `pr` links. At least one. |
| `changes[].docs` | No | A link to a page on this site. |

## Types

<!-- TODO: verify. These definitions are a proposal from the community discussion. Agree on them before relying on them. -->

| Type | Label on the page | Use it when |
|---|---|---|
| `breaking` | Breaking change | Custom code, plugins or configuration stop working until you change them. |
| `incompatible` | Backward incompatible | You cannot go back, or older clients, data or plugins no longer work with the new version. This is rare. |
| `disruptive` | Disruptive change | Things keep working but behave differently, so users or processes notice. |
| `action` | Action needed | A manual step is needed during the upgrade, for example running a process. |
| `deprecation` | Deprecated | Still works, but will be removed later. Plan the change. |
| `requirement` | Requirement | A platform change, for example a new Java or database version. |
