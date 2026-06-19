---
sidebar_position: 8
title: "Dynamic Zoom"
sidebar_label: "Dynamic Zoom"
description: "**Contributor:**  Nicolas Micoud"
tags: [functional]
---
**Goal:** Functional

**Contributor:**  Nicolas Micoud

**Description:**

This enhancement allow the application to determine zoom window at runtime through the use of data driven SQL rule. This is useful when a table is used by multiple window, for instance M_InOut is used by Customer Shipment, Material Receipt, Customer Return and Return to Vendor.

**UI Changes:**

A new tab, Zoom Condition have been added to the Table and Column window to captured the SQL rule.

![Zoom Condition Grid](pathname:///img/new-features/v1.0/Zoom_Condition_Grid.png)

![Zoom Condition Form](pathname:///img/new-features/v1.0/Zoom_Condition_Form.png)

**Window:** Target zoom window.

**SQL Where:** SQL where clause. Records that matched the entered SQL clause will used the entered target zoom window above. For the example shown, any M_Inventory record that uses the cost adjustment document type will use Cost Adjustment as the zoom window.

**Zoom Logic:**
New feature add to Dynamic Zoom to resolve condition empty field and more

**Use Case:**
Imagine you got window1 for tenant1 and window2 for tenant2.
In Zoom condition, you will have something like @AD_Client_ID@=1000000 for window1 and @AD_Client_ID@=1000001 for window2.
But it seems that when zooming from an empty field, the zoom condition is not tested (it takes the default window), so it will always open the default one.

**Description:**
The zoom condition records are evaluated ordered by seqno, firstly the ZoomLogic is evaluated, if the logic returns true then the WhereClause is evaluated on the target record - if there is no WhereClause then it applies for all records including New.

**Read discussion in** [IDEMPIERE-1461](https://idempiere.atlassian.net/browse/IDEMPIERE-1461) for more understanding.

![Zoom Logic](pathname:///img/new-features/v1.0/Zoom_Logic.jpg)

**Technical Info:** [IDEMPIERE-528](http://idempiere.atlassian.net/browse/IDEMPIERE-528)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Dynamic_Zoom)_
