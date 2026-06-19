---
sidebar_position: 4
title: "Dashboard Report Use Sql And Range Parameters"
sidebar_label: "Dashboard Report Use Sql And Range Parameters"
description: "**Developer:** Nicolas Micoud and Carlos Ruiz"
tags: [functional]
---
**Goal:** Functional

**Developer:** Nicolas Micoud and Carlos Ruiz

**Description:**

It is now possible to use @SQL= notation and set range parameters for embedded report on the home page.

Separator of parameters is the comma

Separator of from/to parameter is the semicolon

Simply fill the Process Parameters field of the Dashboard Content window:

![DashboardReportUseSqlAndRangeParametersSetup](pathname:///img/new-features/v8.2/DashboardReportUseSqlAndRangeParametersSetup.png)

Eg: C_DocType_ID=116,DateAcct=@SQL=SELECT SYSDATE - 30 FROM DUAL;@SQL=SELECT SYSDATE FROM DUAL

It means that the report will filter data
 - for Document Type 116
 - for dates between D-30 and today

**Postgres Example** &lt;blockquote&gt;@SQL=SELECT date_trunc('month', NOW()) + interval '1 month' - interval '1 second'&lt;/blockquote&gt;

**Technical Info:** [IDEMPIERE-4781](https://idempiere.atlassian.net/browse/IDEMPIERE-4781)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Dashboard_Report_Use_Sql_And_Range_Parameters)_
