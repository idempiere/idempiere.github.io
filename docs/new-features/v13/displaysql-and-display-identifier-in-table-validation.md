---
title: "DisplaySQL and Display Identifier in Table Validation"
sidebar_label: "DisplaySQL and Display Identifier in Table Validation"
sidebar_position: 4
description: "Before this ticket, in search and list type of reference field, it shows identifier columns if Display column is same at _ID column of table."
tags:
  - technical
---

# DisplaySQL and Display Identifier in Table Validation

**Goal:** Technical

**Developer:** Deepak Pansheriya [Logilite Tchnologies](https://www.logilite.com)

**Feature** **Ticket:** [IDEMPIERE-6163](https://idempiere.atlassian.net/browse/IDEMPIERE-6163)
### Description
Before this ticket, in search and list type of reference field, it shows identifier columns if Display column is same at _ID column of table. But there is no way to show different data as identifier at different field reference.

Here we are adding two enhancement

![Idempiere 6163 logilite DisplaySql](/img/docs/new-features/v13/Idempiere_6163_logilite_DisplaySql.png)

1.Display Identifier

If Display iDentifier is marked then identifier shows identifier column of referenced table by Display Column.

2.Display SQL

If Display Identifier is not clicked, then user can provide sql select statements like below.

- COALESCE(AD_Column.ColumnName,'-1') || '_' || COALESCE(AD_Column.Name,'-1')
- Value || '_' || Name
- Lot || ' - ' || (Select Value || ' - ' || Name From M_Product WHERE M_Product.M_PRoduct_ID = PP_Order.M_Product_ID)

Last example shows product key and name for Manufacturing order field.
