---
sidebar_position: 15
title: "SQL Workflow Condition"
sidebar_label: "SQL Workflow Condition"
description: "**Developers:** Anton Mostovenko, Heng Sin Low"
tags: [functional]
---
**Goal:** Functional

**Developers:** Anton Mostovenko, Heng Sin Low

**Description:**

Workflow conditions can be defined using SQL Statements:

**SQL Operation:**

When the operation is defined as sql, then the conditions is accepted when the query defined in SQL Statement returns *true* or *y* (case insensitive).

For example the following screenshot shows how to define a condition to process just orders where the subtype is *Standard Order*

![01 SQLOperation](pathname:///img/new-features/v9/01_SQLOperation.png)

**SQL Comparison:**

When the operation SQL Statement is defined and is an operator ( != &lt; &lt;= &gt; &gt;= = ~ |&lt;x&gt;| ), then the condition is accepted when comparing against the returned value.  The value is constructed as
 SELECT ([SQL Statement]) FROM [table being processed] WHERE [table ID or UU] = [ID or UUID value being processed]
So, in the SQL Statement you can use a column from the table, or a calculation over a column or a subquery.

For example the following screenshot shows an other way to define the same condition to process just orders where the subtype is *Standard Order*

![02 SQLComparison](pathname:///img/new-features/v9/02_SQLComparison.png)

Both cases uses the current workflow record being processed to replace context variables.

**Technical Info:** [IDEMPIERE-4900](https://idempiere.atlassian.net/browse/IDEMPIERE-4900)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_SQL_Workflow_Condition)_
