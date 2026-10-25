---
sidebar_position: 50
description: Ship translated texts for AD_Message, AD_Element, R_MailText and other _Trl tables with Translation XML files, 2Pack or migration scripts.
tags: [development]
applies_to: ">=11"
last_reviewed: 2026-10-25
---
# Ship translations

How to move translated texts to other iDempiere databases, for a plug-in, a language pack or a customer. Applies to iDempiere 11 and later. Checked against iDempiere master in October 2026.

:::tip[In short]

- Use Translation XML files, the files of the Translation Import/Export process. The import only updates existing rows and reports what it did not find.
- Core records: match by ID. Plug-in and tenant records: match by UU.
- Log Migration Scripts does not record translations.

:::

## Core or plug-in

| | Core | Plug-in |
| --- | --- | --- |
| Records | IDs up to 999999, same in every database | IDs differ per database |
| Match by | `id` | `uuid` of the base record |
| Goes to | The [language pack](/docs/translation-localization#languages-and-coverage) of the language | The plug-in's own XML files or 2Pack |

## Choose a format

| Format | Use for | Creates rows | Sets `IsTranslated` |
| --- | --- | --- | --- |
| Translation XML files | Records that already exist | No | `Y`, or the `trl` value |
| 2Pack | A plug-in shipping its records with their translations | Yes | The 2Pack value, `N` if missing |
| Migration script | A plug-in that already ships SQL | If you write `INSERT` | What you write |

## Ship with Translation XML files

### Export a translation file

1. Run the Translation Import/Export process: Export, the Language, the "System" Tenant. Table is optional.
2. Select Only Centralized Data for core records only. Clear it for plug-in records, then remove rows that are not yours (there is no Entity Type filter).
3. Download the ZIP. It has one file per table: `<Table>_Trl_<language>.xml`.

Centrally maintained fields are not exported. Their texts come from the element.

### Translation XML file format

The values below are samples. Replace the ID, UU and texts with your own.

```xml title="AD_Message_Trl_sk_SK.xml"
<?xml version="1.0" encoding="UTF-8"?>
<idempiereTrl language="sk_SK" table="AD_Message">
  <row id="200123" trl="Y">
    <value column="MsgText" original="Invalid code.">Neplatný kód.</value>
  </row>
  <row uuid="3f6c1d2e-8a4b-4c7d-9e10-5b2a7c8d9e0f" trl="N">
    <value column="MsgText" original="Your password has been reset.">Vaše heslo bolo obnovené.</value>
  </row>
</idempiereTrl>
```

- `table` is the base table.
- `uuid` is the UU of the base record (`AD_Message_UU`), not of the `_Trl` row.
- `trl` sets `IsTranslated`. Missing means `Y`.
- `original` is ignored on import.

### Import a translation file

1. Zip the files, flat or in a `<language>/` folder.
2. Run the Translation Import/Export process: Import, the Language, the ZIP file (or an `https://` URL), the "System" Tenant. An empty Tenant updates every Tenant.
3. Compare the `Updated=` count in the log with your row count.
4. Run Synchronize Terminology if you changed elements, then Cache Reset.

Command line: `RUN_TrlImport.sh <language> [folder]`.

## Ship translations with 2Pack

Translations travel only when `2PACK_HANDLE_TRANSLATIONS` is `Y` on both systems.

| Key | Default | Level | What it does |
| --- | --- | --- | --- |
| `2PACK_HANDLE_TRANSLATIONS` | `N` (set in 2009, not verified against the current seed database) | System | Packs `_Trl` rows with their parent record |

<!-- TODO: verify - the default N comes from the 2009 migration script 557_FR1786994.sql. Check the current seed database. -->

- Translations sit inside their parent element. A 2Pack with only `_Trl` rows fails.
- Pack In skips languages that are not system languages on the target.

See [Using 2Pack to transfer data](/docs/basic-development/2pack/packin-packout-guide).

## Ship translations with a migration script

Write it by hand. Match by a key that is the same everywhere. PostgreSQL and Oracle. Put the file in the migration folder of your release; `iD14` is an example.

```sql title="migration/iD14/postgresql/202610251200_IDEMPIERE-NNNN_sk_SK.sql"
SELECT register_migration_script('202610251200_IDEMPIERE-NNNN_sk_SK.sql') FROM dual;

UPDATE AD_Message_Trl SET MsgText='Vaše heslo bolo obnovené. Prihláste sa novým heslom.', IsTranslated='Y',
  Updated=TO_TIMESTAMP('2026-10-25 12:00:00','YYYY-MM-DD HH24:MI:SS'), UpdatedBy=100
WHERE AD_Message_ID=(SELECT AD_Message_ID FROM AD_Message WHERE Value='PasswordResetSuccess')
  AND AD_Language='sk_SK' AND AD_Client_ID=0
;
```

- `AD_Client_ID=0` keeps tenant-level messages untouched.
- Elements: match by `ColumnName`. Tenant data such as `R_MailText`: match by UU.
- iDempiere does not run plug-in SQL files by itself. See [Run Script with 2Pack](/docs/basic-development/2pack/run-script-with-2pack).

## Translate with a tool or AI

1. Export the language.
2. Translate only the text inside `value`. Keep `id`, `uuid` and `column`.
3. Set `trl="N"` on rows nobody has reviewed.
4. Import and check the `Updated=` count.

A wrong `id` that exists in your database changes another record. Prefer `uuid` outside core.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Fewer rows updated than in the file | Run Language Maintenance with Add. Use `uuid` for IDs above 999999. |
| `Update Rows=n (Should be 1)` | Set the Tenant and import again. |
| Old text still shows | Run Cache Reset. |

To keep translations through upgrades, see [Roll out a language](/docs/translation-localization/roll-out-a-language#after-each-upgrade).
