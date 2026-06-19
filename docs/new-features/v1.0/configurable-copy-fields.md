---
sidebar_position: 3
title: "Configurable Copy Fields"
sidebar_label: "Configurable Copy Fields"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

The system administrator can determin which fields are copied When you copy a register using the "Copy Record" option in any window.

**How to configure which field to copy when using the "copy register" button in any window:**

1. Log in with user "System".

2. Open "Table and Column" window.

3. Find any table.

4. Go to "Column".

![Screenshot26](pathname:///img/new-features/v1.0/Screenshot26.png)
 * "Allow Copy" determine if a column must be copied when pushing  the button to "Copy Record" in the toolbar button.

It is also possible to override this configuration in the "Field" tab of the "Window, Tab Field" window.

![Screenshot25](pathname:///img/new-features/v1.0/Screenshot25.png)
 * "Allow Copy" determine if a column must be copied when pushing  the button to "Copy Record" in the toolbar button.

**Technical Info:** [IDEMPIERE-686](http://idempiere.atlassian.net/browse/IDEMPIERE-686)

NOTE the column configuration also affects the copied columns when you programatically calls a PO.copyValues - if you want a column to be copied with PO.copyValues but not in a window, then you must allow copy on column and disallow it on field.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Configurable_Copy_Fields)_
