---
sidebar_position: 8
title: "Find Window Extended Controls"
sidebar_label: "Find Window Extended Controls"
description: "**Goal:** Development - Usability"
tags: [functional]
---
**Goal:** Development - Usability

**Developer:** Deepak Pansheriya, Murilo H Torquato

**Feature Ticket:** [IDEMPIERE-3981](https://idempiere.atlassian.net/browse/IDEMPIERE-3981)

**Sponsor:** [[Logilite Technologies LLP](http://www.logilite.com)], [[devCoffee](https://devcoffee.com.br/)]

**Description:**

In short this improvement will allow you to:

- override the "Selection Column" property at field level and window customization
- configure whether the advanced tab of the search dialog will be displayed or not for a tab (tab level and window customization)
- configure a specific dynamic validation to be used in the search dialog in the column and override this property at the field level and window customization

**What's new?**

- At *Table and Column -> Column*  you can find one new field:
- # **Dynamic Validation (Lookup):** when defined it will overwrite (only in the finddialog) the value defined in the Dynamic Validation property. This is very useful when it is necessary to perform dynamic validations on data entry but let the user freely select values to find records in a window.
![IDEMPIERE 3981 C](pathname:///img/new-features/v8.2/IDEMPIERE-3981-C.png)
- At *Window, Tab & Field -> Tab*  you can find two new fields:
- # **Lookup Only Selection Columns:** false by default, when checked it will allow the display in the find dialog only fields in which the linked column is marked as a selection column (this property can be overridden at the field level).
- # **Allow Advanced Lookup:** true by default, when unchecked, the "Advanced" tab of the search dialog will not be displayed for the tab. This has no effect if the role has "Access Advanced" set.
![IDEMPIERE 3981 A](pathname:///img/new-features/v8.2/IDEMPIERE-3981-A.png)
- At *Window, Tab & Field -> Field*  you can find two new fields:
- # **Dynamic Validation (Lookup):** not defined by default, when defined it will overwrite the value configured for the Dynamic Validation (Lookup) property in the column linked to the field.
- # **Selection Column:** not defined by default, when defined it will override the configured value for the "Selection Column" property in the column linked to the field.
![IDEMPIERE 3981 B](pathname:///img/new-features/v8.2/IDEMPIERE-3981-B.png)
- At *Window Customization -> Tab Customization*  you can find two new fields:
- # **Lookup Only Selection Columns:** not defined by default, when defined it will overwrite the value configured for the property in the dictionary (tab definition).
- # **Allow Advanced Lookup:** not defined by default, when defined it will overwrite the value configured for the property in the dictionary (tab definition). This has no effect if the role has "Access Advanced" set.
- At *Window Customization -> Field Customization*  you can find one new field:
- # **Dynamic Validation (Lookup):** not defined by default, when defined it will overwrite the value configured for the property in the dictionary (column and field definitions)
![IDEMPIERE 3981 E](pathname:///img/new-features/v8.2/IDEMPIERE-3981-E.png)

**Technical Info:** [IDEMPIERE-3981](https://idempiere.atlassian.net/browse/IDEMPIERE-3981)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Find_Window_Extended_Controls)_
