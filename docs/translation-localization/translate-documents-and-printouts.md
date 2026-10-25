---
sidebar_position: 30
description: Print invoices, orders and other documents in the Business Partner's language, with built-in print formats, Jasper reports and mail templates.
tags: [functional]
applies_to: ">=11"
last_reviewed: 2026-10-25
---
# Translate documents and printouts

How to send invoices, orders and mails in the customer's language. Applies to iDempiere 11 and later.

:::tip[In short]

- Set Language on the Business Partner. Documents print in that language.
- Built-in print formats translate labels and data for you.
- Jasper reports get the language as a parameter. The report does the rest.

:::

## Which language is used

| Printout | Language |
| --- | --- |
| A document (order, invoice, shipment, payment, dunning letter) | The Business Partner's Language. If empty, the Tenant's language. |
| A report from the menu | The user's login language |

This works even with Multi Lingual Documents off.

## What to translate

| Text | Where |
| --- | --- |
| Labels of a built-in print format | Print Format => Item Translation |
| Labels of a Jasper report | A properties file, or `AD_Message` / `AD_Element` |
| Mail text | Mail Template => Translation |
| Business data | Translation tab of each record, per Tenant: Document Type, Product, Unit of Measure, Payment Term, Tax, Charge, Greeting, Dunning Level |

Do not run Synchronize Doc Translation after translating business data. See [Processes](./how-translation-works.md#processes).

## Built-in print formats

- **Labels:** Synchronize Terminology fills them from the element translations. To refresh one print format, run [Synchronize Print Format Items](/docs/new-features/v10/synchronize-print-format-items).
- **Data:** a print format on a view such as `C_Invoice_Header_v` reads the translated view `C_Invoice_Header_vt`. Core has these views for order, invoice, shipment and dunning headers. For your own views, see [Translated views](./how-translation-works.md#translated-views).
- **File name:** can be translated. See [Make print filename configurable](/docs/new-features/v10/make-print-filename-configurable).

## Jasper reports

iDempiere passes the language. The report handles labels and data itself.

- **Language:** documents use the Business Partner rule above. Other reports use the login language, unless the process has a parameter named `CURRENT_LANG` or `AD_Language`. From iDempiere 12, the report viewer also offers a language drop-down for Jasper documents.
- **Parameters:** `CURRENT_LANG` (for example `de_DE`) and `REPORT_LOCALE` (date and number formats, follows `CURRENT_LANG`).
- **Labels:** `$R{key}` or `str("key")` is looked up in this order:
  1. the report's properties file, country first (`name_sv_SE.properties`), then language (`name_sv.properties`)
  2. `AD_Message`, including tenant-level messages when they are enabled ([discussion](https://mattermost.idempiere.org/idempiere/pl/negibnid5tyjbffffkxbwftx4y))
  3. `AD_Element`, its Print Name

  See [AD_Message+AD_Element Resource Bundle](/docs/new-features/v9/admessageadelement-resource-bundle-for-jasper-report).
- **Data:** nothing switches automatically. Query the [translated view](./how-translation-works.md#translated-views) yourself:

```sql
SELECT * FROM C_Invoice_Header_vt
WHERE C_Invoice_ID = $P{RECORD_ID} AND AD_Language = $P{CURRENT_LANG}
```

- **Amounts in another currency:** `DisplayType.getCurrencyFormat(language, currencyISOCode)` formats them for the language.

:::tip

Labels and `CURRENT_LANG` only work when iDempiere runs the report. To preview in Jaspersoft Studio, give `CURRENT_LANG` a default value.

:::

## Test

Set Language on a test Business Partner, then print and email a document for it.

## Known issues

Open in October 2026:

- [IDEMPIERE-4400](https://idempiere.atlassian.net/browse/IDEMPIERE-4400): the Language field in print preview is empty.
- [IDEMPIERE-6418](https://idempiere.atlassian.net/browse/IDEMPIERE-6418): payment print and export duplicate lines when three login languages are active and the Business Partner has a non-base language.
- [IDEMPIERE-6913](https://idempiere.atlassian.net/browse/IDEMPIERE-6913): the web client does not pass the print format to a Jasper process.
