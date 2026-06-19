---
sidebar_position: 6
title: "Virtual UI Column"
sidebar_label: "Virtual UI Column"
description: "**Developers:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Technical

**Developers:** Carlos Ruiz

**Sponsors:**  [TrekGlobal](http://www.trekglobal.com/)

## Description
Legacy virtual DB columns can represent a big issue in terms of performance, for example writing complex SQL statements that bring SUM of records accessing without a proper index can add heavy usage to the database.

In high usage tables is not recommended at all to use these virtual DB columns, because every time a record is read from the database using the iDempiere model classes, all the virtual columns are read with the record, even if they are not required or going to be used.

In order to solve this issue we implemented the concept of Virtual **UI** Column (in contrast to the Virtual **DB** Column).

The virtual DB column functionality has not been changed, it keeps working as usual, note the virtual DB columns can be used for finding records, and also can be exported, printed, etc.

## How to define a Virtual UI Column
To define a Virtual UI Column is simple, you just need to prefix **@SQL=** to the definition of the column (AD_Column.ColumnSQL) - and usually you'll use context variables relating other fields on the same window, this way the Virtual UI Columns are refreshed every time the related fields change.

## Example
In the Product window there used to be a column (we inactivated it because of the impact on performance):

Virtual **DB** Column defition for CostStandard:
 (SELECT ROUND(SUM(c.CurrentCostPrice),2) FROM M_Cost c INNER JOIN M_CostElement e ON (e.M_CostElement_ID=c.M_CostElement_ID)
 WHERE e.CostingMethod='S' AND c.M_Product_ID=M_Product.M_Product_ID)

The same column can be obtained as a Virtual **UI** Column with much less impact on performance this way:
 @SQL=SELECT ROUND(SUM(c.CurrentCostPrice),2) FROM M_Cost c INNER JOIN M_CostElement e ON (e.M_CostElement_ID=c.M_CostElement_ID)
 WHERE e.CostingMethod='S' AND c.M_Product_ID=@M_Product_ID@

## Restrictions
Because they are calculated on the fly, Virtual UI Columns cannot be exported or printed in reports.

@SQL virtual UI columns cannot be used to find records, but there is a new @SQLFIND that allows it, see [Virtual Search Column](https://wiki.idempiere.org/en/NF7.1_Virtual_Search_Column).

Grid usage:  columns are calculated with the context, when record activated. The dependant context values are set only when you select a row.

**See also** [NF7.1 Virtual Search Column](https://wiki.idempiere.org/en/NF7.1_Virtual_Search_Column), [NF8.2 Override Virtual Column In Field](https://wiki.idempiere.org/en/NF8.2_Override_Virtual_Column_In_Field)

**Technical Info:** [IDEMPIERE-3760](https://idempiere.atlassian.net/browse/IDEMPIERE-3760)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_Virtual_UI_Column)_
