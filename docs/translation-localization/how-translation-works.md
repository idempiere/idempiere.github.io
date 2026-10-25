---
sidebar_position: 40
description: How iDempiere stores translated texts in _Trl tables, when it creates and updates them, and which processes change them.
tags: [technical]
applies_to: ">=11"
last_reviewed: 2026-10-25
---
# How translation works

What happens in the database when you translate. Applies to iDempiere 11 and later. Checked against iDempiere master in October 2026.

:::tip[In short]

- Each translatable table has a `_Trl` twin with one row per language.
- `IsTranslated='N'` means the row still holds the English copy.
- Editing English text, Synchronize Terminology and Synchronize Doc Translation can overwrite translations.

:::

## Tables

`AD_Message` has `AD_Message_Trl`, `M_Product` has `M_Product_Trl`, and so on. A `_Trl` row holds:

- the key of the base record and `AD_Language`
- a copy of each column marked Translated. To add a `_Trl` table to your own table, see [Create/Complete Table](/docs/new-features/v8.2/createcomplete-table).
- `IsTranslated`
- a UU column, for example `AD_Message_Trl_UU`

`AD_Message_Trl` also has `AD_Client_ID` in its key, for [tenant-level messages](/docs/new-features/v9/messages-at-client-level).

## Language flags

| Flag | Meaning |
| --- | --- |
| Base Language | Language of the base tables. `en_US` by default. |
| System Language | iDempiere keeps `_Trl` rows for it. |
| Login Locale | Users can pick it on the login page. |

## When rows are created

- **New record:** one `_Trl` row per system language, copied from the base text (`PO.insertTranslations()`).
- **New language:** only when you run Language Maintenance with Add.
- **Upgrade:** `SyncDB` adds missing rows, then runs Synchronize Terminology.

## When rows are updated

Editing a translated column of a base record (`PO.updateTranslations()`):

| Multi Lingual Documents | Result |
| --- | --- |
| Off | All languages get the new text. Translations are lost. |
| On, Tenant language = base language | Texts stay. All rows marked `IsTranslated='N'`. |
| On, Tenant language ≠ base language | Tenant language gets the new text. Other languages get `IsTranslated='N'`. |

A migration script that changes English text with SQL changes no `_Trl` row and flags nothing.

System Administrator edits dictionary texts in the "System" Tenant, so that Tenant's Multi Lingual Documents setting decides what happens to dictionary translations. Check it in the Tenant window before you edit English texts. The default in a new database has not been verified.

<!-- TODO: verify - the Multi Lingual Documents setting of the "System" Tenant in the seed database. -->

## Processes

| Process | Effect |
| --- | --- |
| Language Maintenance | Add, delete or re-create the rows of one language |
| Synchronize Terminology | Copies element translations to fields, parameters, print format items, menus. Overwrites. |
| Synchronize Doc Translation | Copies base text into non-`AD` `_Trl` tables (products, mail templates). Overwrites. |
| Translation Import/Export | Exports to XML, or updates rows from XML. See [Ship translations](/docs/translation-localization/ship-translations). |

None of them resets the cache. Run Cache Reset afterwards.

Log Migration Scripts never logs `_Trl` changes.

## Translated views

A view `<name>_v` can have a twin `<name>_vt` that joins the `_Trl` tables and has an `AD_Language` column, for example `C_Invoice_Header_v` and `C_Invoice_Header_vt`. When the language is not the base language, iDempiere reads the `_vt` view instead and filters on the language:

| Reader | Switches to `_vt` when | Language |
| --- | --- | --- |
| Built-in print format | the `_vt` view exists in the database | The printout language |
| REST API (`/api/v1/models/<name>_v`) | the `_vt` view is registered as a table in the Application Dictionary | The `language` given at [login](https://bxservice.github.io/idempiere-rest-docs/docs/api-guides/authentication) |
| Jasper report | never, the report's SQL must query `_vt` itself | `CURRENT_LANG` |

The caller always asks for `_v` and gets translated data.

For your own `_vt` view:

- Give it the same columns as the `_v` view, plus `AD_Language`.
- Join each `_Trl` table on the language. A join without it returns every row once per language.
- Register it in the Application Dictionary if the REST API should use it.

## Measure the coverage of a language

PostgreSQL and Oracle:

```sql
SELECT t, AD_Language, COUNT(*) AS total,
  SUM(CASE WHEN IsTranslated='Y' THEN 1 ELSE 0 END) AS translated
FROM (
  SELECT 'AD_Message' AS t, AD_Language, IsTranslated FROM AD_Message_Trl WHERE AD_Client_ID=0
  UNION ALL SELECT 'AD_Element', AD_Language, IsTranslated FROM AD_Element_Trl
  UNION ALL SELECT 'AD_Field', AD_Language, IsTranslated FROM AD_Field_Trl
  UNION ALL SELECT 'AD_Menu', AD_Language, IsTranslated FROM AD_Menu_Trl
) x
GROUP BY t, AD_Language
ORDER BY t, AD_Language;
```

The result is only as good as the flags the language pack set.
