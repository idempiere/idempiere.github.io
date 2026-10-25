---
sidebar_position: 10
description: Steps, decisions and checks for bringing a new language and country to a customer's iDempiere, from language pack to go-live.
tags: [functional]
applies_to: ">=11"
last_reviewed: 2026-10-25
---
# Roll out a language

The steps to bring a new language and country to a customer, in order. Applies to iDempiere 11 and later. Checked in October 2026.

:::tip[In short]

1. Keep English as base language.
2. Activate the language, import the pack, reset the cache.
3. Set the Tenant and Business Partner languages.
4. Print a test document.

:::

## Decide first

- **Base language:** keep `en_US`. Core upgrades add English texts, so another base language falls behind. See [Base Language Flexible](/docs/new-features/v1.0/base-language-flexible).
- **Multi Lingual Documents** (Tenant window): turn it on if the customer works or sends documents in more than one language. See [When rows are updated](/docs/translation-localization/how-translation-works#when-rows-are-updated).
- **Language pack:** check [Languages and coverage](/docs/translation-localization#languages-and-coverage).

## Install the language

1. Language window: select System Language and Login Locale. Check the date and number formats.
2. Run Language Maintenance with Add.
3. Import the pack with the Translation Import/Export process, for the "System" Tenant. See [Ship translations](/docs/translation-localization/ship-translations#ship-with-translation-xml-files).
4. Run Synchronize Terminology, then Cache Reset.

## Set up the Tenant

1. Tenant window: set Language and Multi Lingual Documents.
2. Translate the business data printed on documents. See [Translate documents and printouts](/docs/translation-localization/translate-documents-and-printouts).
3. Set Language on foreign Business Partners.

## Test before go-live

1. Log in with the language and work through the main windows.
2. Print and email a document for a foreign Business Partner.

## After each upgrade

New core texts arrive in English, and changed English texts do not flag their translations. Import the updated pack and review.

## Localization checklist

| Area | Core provides | You set up |
| --- | --- | --- |
| Chart of accounts | US example (`AccountingUS.csv`) | The country chart, in Initial Tenant Setup |
| Taxes | Tax rates and the [tax provider](/docs/basic-development/plugin-development/plugin-tax-provider-factory) extension point | Country rates and rules |
| Addresses | Address layout and validation per country | Check the country, load regions and cities |
| Formats | Date, time and decimal format per language | Set them in the Language window |
| Documents | Print formats, document types | Legal texts and numbering |

Country localizations known so far (the list is not complete): [Brazil](https://github.com/idempierelbr/idempierelbr), [Colombia](https://github.com/globalqss/globalqss-idempiere-lco).

<!-- TODO: verify - other country localizations, and what each one covers. -->
