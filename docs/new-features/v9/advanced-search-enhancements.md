---
sidebar_position: 19
title: "Advanced Search Enhancements"
sidebar_label: "Advanced Search Enhancements"
description: "**Developer:** Igor Pojzl"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Igor Pojzl

**Feature Ticket:** [IDEMPIERE-4364](https://idempiere.atlassian.net/browse/IDEMPIERE-4364)

**Description:**

Allow user to search using field from tabs other than the main tab (For e.g, Order Line tab at order window):
- Added Tab column at Advanced Search.
- Allow search by Product attribute at Product window

## Example
1. Advanced search with Product field at Order Line tab.
1. * ![Advanced Search 4364](pathname:///img/new-features/v9/Advanced_Search_4364.png)

_Advanced Search Example_
1. Advanced search with Product attribute at Product window.
1. * ![Product Attribute 4364](pathname:///img/new-features/v9/Product_Attribute_4364.png)

_Product attribute advanced search_

## Example
You need to consider the parenthesis when querying detail records as they impact the result query.

If you don't add parenthesis and you have two conditions on the same table, the result SQL will look like this:

 WHERE (((
 M_Product.IsActive='Y'
 AND EXISTS(SELECT 1 FROM M_Product_PO WHERE M_Product_PO.M_Product_ID = M_Product.M_Product_ID  AND C_BPartner_ID=1006812)
 AND EXISTS(SELECT 1 FROM M_Product_PO WHERE M_Product_PO.M_Product_ID = M_Product.M_Product_ID  AND IsCurrentVendor='Y')
 )))

If you set the parenthesis it will look like this

![Find Parenthesis](pathname:///img/new-features/v9/Find_Parenthesis.jpg)

 (M_Product.IsActive = 'Y'
 and exists (
 select 1
 from M_Product_PO
 where M_Product_PO.M_Product_ID = M_Product.M_Product_ID and (C_BPartner_ID = 1006812 and IsCurrentVendor = 'Y')))

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Advanced_Search_Enhancements)_
