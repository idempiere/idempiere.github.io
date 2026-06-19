---
sidebar_position: 32
title: "Styles On HTML Report columns"
sidebar_label: "Styles On HTML Report columns"
description: "**Goal:** UX/Functional"
tags: [user-experience]
---
**Goal:** UX/Functional

**Developer:** cloudempiere, Takacs Peter, **Design**: Norbert Bede **Review**: CarlosRuiz

**Feature Ticket: [IDEMPIERE-5206](https://idempiere.atlassian.net/browse/IDEMPIERE-5206)**

**Motivation**

https://wiki.idempiere.org/en/NF4.1_Styles_On_Fields

**Solution**

You will be able to change css style of data in single cells of HTML report, based on the Display Logic defined in AD_FieldStyle.

**Usage**

1. Create css style
1. Select css style on print format => print format item
1. Validate the style was applied

**Example**

The report **Storage by product**, include custom individual column indicates the product ABC classification A, B, C on a specific warehouse.

Condition: A=Green B. Orange C. Red - meaning the column have colorised classification text for better visual controll.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Styles_On_HTML_Report_columns)_
