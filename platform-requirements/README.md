# Platform requirements

These files feed the "Platform changes" box of the [Compare versions](https://docs.idempiere.org/upgrade/compare) page. When someone compares two versions, the page shows every value that differs, for example "Java 11 → 17".

The rest of the page is built from the docs and needs no extra data:

- New features come from `docs/new-features/v<version>/`.
- Migration notes come from `docs/migration-notes/v<version>/`. Every `## ` section of a page is one note. The page's thematic tags (for example `breaking-change`, `database`) become the topic filter.

There is one file per release, named after the release: `13.yml`, `14.yml`, and so on. The build checks every file against `_schema.json` and stops with the file name and field if something is wrong.

## Example

```yaml
version: "13"
requirements:
  java:
    value: "17"
    source: https://github.com/idempiere/idempiere/blob/release-13/org.idempiere.parent/pom.xml
  postgresql:
    value: "13 or newer (11 and 12 need the pgcrypto extension)"
    source: https://github.com/idempiere/idempiere.github.io/blob/main/docs/migration-notes/v13/technical-notes.md
```

## Fields

| Field | Required | Meaning |
|---|---|---|
| `version` | Yes | The release, as a quoted string. It matches the `v<version>` folder names in the docs. |
| `requirements` | Yes | At least one of `java`, `zk`, `jetty`, `postgresql`, `oracle`. |
| `requirements.<name>.value` | Yes | The version, as text. It can include a short note. |
| `requirements.<name>.source` | Yes | A link to where the value is stated: a `pom.xml` on the release branch, a Jira ticket or a docs page. |

A value carries forward to later releases until a later file changes it. Only add a value when you have a source for it.
