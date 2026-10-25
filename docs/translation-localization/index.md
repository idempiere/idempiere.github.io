---
sidebar_position: 1
description: Start page for translating iDempiere and localizing it for a country, with the user interface, printouts, core and plug-in translations.
tags: [technical]
applies_to: ">=11"
last_reviewed: 2026-10-25
---
# Translation and localization

Start here to run iDempiere in another language or country. Applies to iDempiere 11 and later.

:::tip[In short]

- Core ships English only. Other languages come from community language packs.
- Screens show the user's login language. Documents print in the Business Partner's language.
- Translate texts in iDempiere, move them with Translation Import/Export.

:::

## Find your page

| I want to | Page |
| --- | --- |
| Bring a new language to a customer | [Roll out a language](./roll-out-a-language.md) |
| Set up accounting, taxes and addresses for a country | [Localization checklist](./roll-out-a-language.md#localization-checklist) |
| Translate windows, fields, menus and messages | [Translate the user interface](./translate-the-user-interface.md) |
| Print invoices and orders in the customer's language | [Translate documents and printouts](./translate-documents-and-printouts.md) |
| Understand the `_Trl` tables | [How translation works](./how-translation-works.md) |
| Deliver translations to other systems | [Ship translations](./ship-translations.md) |

## Languages and coverage

Each language pack lives in its own repository. "Updated" is the last change to the repository, "Version" the iDempiere release named in the files. Checked in October 2026.

| Language | Repository | Updated | Version |
| --- | --- | --- | --- |
| German (`de_DE`, `de_CH`) | [bxservice/tbayen.translations](https://github.com/bxservice/tbayen.translations) | 2026-08 | 14 |
| Spanish, Colombia (`es_CO`) | [globalqss/globalqss-idempiere-lco](https://github.com/globalqss/globalqss-idempiere-lco) | 2026-06 | 13 |
| Spanish, Paraguay (`es_PY`) | [corvalanariel/idempiere-translation-es-py](https://github.com/corvalanariel/idempiere-translation-es-py) | 2026-06 | 13 |
| Portuguese, Brazil (`pt_BR`) | [idempierelbr/idempierelbr](https://github.com/idempierelbr/idempierelbr) | 2026-10 | 13 |
| Portuguese, Brazil (`pt_BR`), older | [devcoffee/idempiere-pt_br](https://github.com/devcoffee/idempiere-pt_br) | 2023-05 | 11 |
| Chinese, Taiwan (`zh_TW`) | [ray-idempiere/idempiere-language-zh_TW](https://github.com/ray-idempiere/idempiere-language-zh_TW) | 2026-03 | 12 |
| French (`fr_FR`) | [nmicoud/fr_FR](https://github.com/nmicoud/fr_FR) | 2025-05 | 12 |
| Czech (`cs_CZ`) | [SnowDrift80/iDempiere_cs_CZ_Trl](https://github.com/SnowDrift80/iDempiere_cs_CZ_Trl) | 2023-12 | 10 |
| Russian (`ru_RU`) | [kinerix/iDempiereTranslationRussia](https://github.com/kinerix/iDempiereTranslationRussia) | 2022-10 | Not stated |
| Romanian (`ro_RO`) | [idempiere-consulting/idempiere-romanian-translation](https://github.com/idempiere-consulting/idempiere-romanian-translation) | 2020-05 | 7.1 |
| Italian (`it_IT`) | [idempiere-consulting/idempiere-italy-translation](https://github.com/idempiere-consulting/idempiere-italy-translation) | 2020-03 | 5.1 |
| Slovak (`sk_SK`) | [cloudempiere/idempiere-translations](https://github.com/cloudempiere/idempiere-translations) | 2020-04 | 3.1 |

<!-- TODO: verify - Hungarian (hu_HU) and other languages listed on the old wiki Translations page, which could not be read. -->

An older pack still installs. Records added since then stay in English. To measure a language in your database, see [Measure the coverage](./how-translation-works.md#measure-the-coverage-of-a-language).

To improve a pack, send a pull request to its repository. Core does not take translations. The German pack was updated in 2026 with AI-translated texts ([pull request 10](https://github.com/bxservice/tbayen.translations/pull/10)); see [Translate with a tool or AI](./ship-translations.md#translate-with-a-tool-or-ai).

## Feature history

| Version | Feature |
| --- | --- |
| 1.0 | [Translation Improvements](/docs/new-features/v1.0/translation-improvements): import and export in the web client |
| 1.0 | [Base Language Flexible](/docs/new-features/v1.0/base-language-flexible): change the base language |
| 8.2 | [Create/Complete Table](/docs/new-features/v8.2/createcomplete-table): add a translation table |
| 9 | [Messages at Client Level](/docs/new-features/v9/messages-at-client-level): tenant-level messages |
| 9 | [AD_Message+AD_Element Resource Bundle for Jasper Report](/docs/new-features/v9/admessageadelement-resource-bundle-for-jasper-report) |
| 10 | [Synchronize Print Format Items](/docs/new-features/v10/synchronize-print-format-items) |
| 10 | [Make print filename configurable](/docs/new-features/v10/make-print-filename-configurable): translated file names |
