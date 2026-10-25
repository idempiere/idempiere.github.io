---
sidebar_position: 20
description: Translate windows, fields, menus and messages of iDempiere, keep the translations through upgrades, and override texts for one Tenant.
tags: [functional]
applies_to: ">=11"
last_reviewed: 2026-10-25
---
# Translate the user interface

How to translate windows, fields, menus and messages. Applies to iDempiere 11 and later.

:::tip[In short]

- Log in as System Administrator. Changes apply to all Tenants.
- Translate the element, not the field.
- Use the System Translation Check window to work through one language.

:::

## Where to translate

| Text | Window => tab |
| --- | --- |
| Field labels, help | Element => Translation |
| Window, tab, field names | Window, Tab & Field => Window, Tab or Field Translation |
| Menu entries | Menu => Translation |
| Processes and parameters | Report & Process => Report Translation, Parameter Translation |
| Messages and buttons | Messages => Translation |
| Drop-down values | Reference => List Translation |
| Info windows | Info Window => Window Translation, Column Translation |

The System Translation Check window shows all these tabs for one language.

A language appears on the login page only when Login Locale is selected. See [Language flags](./how-translation-works.md#language-flags).

## Translate the element, not the field

Most fields are Centrally Maintained: they take their label from the element. [Synchronize Terminology](./how-translation-works.md#processes) copies element translations to fields, process parameters, info columns, print format items and menus.

:::warning

Every upgrade runs Synchronize Terminology. A translation typed on a centrally maintained field is lost. To give one field its own label, clear Centrally Maintained first.

:::

## Other tasks

- **Override a message for one Tenant:** see [Messages at Client Level](/docs/new-features/v9/messages-at-client-level).
- **Find untranslated texts:** filter a translation tab on Translated = No, or run the [coverage query](./how-translation-works.md#measure-the-coverage-of-a-language).
- **See your changes:** run Cache Reset, then log in again.
- **Plug-in texts:** translate them in the same windows. To deliver them, see [Ship translations](./ship-translations.md).
