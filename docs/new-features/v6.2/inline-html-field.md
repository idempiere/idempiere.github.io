---
sidebar_position: 9
title: "Inline HTML Field"
sidebar_label: "Inline HTML Field"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Developers:** Murilo Habermann Torquato, Le Quy Hiep, Carlos Ruiz

**Description:**

iDempiere allows now to define HTML fields that render HTML directly for user viewing.

To define a field to be HTML is easy, there is a new flag in the *Table and Column* window, *Column*:

![InlineHTMLFieldDefinition](pathname:///img/new-features/v6.2/InlineHTMLFieldDefinition.png)

This flag is visible just for fields with type String, Text and Text Long.

This is how the field is presented to the user:

![InlineHTMLFieldUsage](pathname:///img/new-features/v6.2/InlineHTMLFieldUsage.png)

When the user edits this field (using right click Edit or double click), the HTML CK Editor is shown automatically.

**Technical Info:** [IDEMPIERE-2310](https://idempiere.atlassian.net/browse/IDEMPIERE-2310)

**Additional info:** In addition to this, we can also take into account the HTML formatting of IDempiere in a jasper report.

To do this, you must specify in the jasper report that the field is in 'html'

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_Inline_HTML_Field)_
