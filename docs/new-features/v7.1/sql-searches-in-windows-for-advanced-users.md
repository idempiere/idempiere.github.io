---
sidebar_position: 11
title: "SQL Searches in windows for advanced users"
sidebar_label: "SQL Searches in windows for advanced users"
description: "**Goal:** Functional - Usability"
tags: [user-experience]
---
**Goal:** Functional - Usability

**Developer:** Diego Ruiz

**Sponsor:** [BX Service GmbH](http://www.bx-service.com/)

**Description:**

The goal of the ticket is to allow advanced users to share advanced SQL search filter with other users, it is related to [NF7.1 Share Saved Queries](https://wiki.idempiere.org/en/NF7.1_Share_Saved_Queries).

The feature improvement was designed as follows:

The user can now go to the User Queries window and update the validation code directly with a SQL where clause.
For example:

@SQL=EXISTS (SELECT 1 FROM C_OrderLine WHERE C_OrderLine.c_order_id = C_Order.c_order_id AND C_Orderline.m_product_id = 126)

@SQL=C_Order.documentno BETWEEN '80000' AND '90000' AND C_Order.salesrep_id = @AD_User_ID@

**The user must not include the WHERE word**

This "where statement" is added to the one set to the window, so it respects all the previous configuration of the records.

When the user selects this kind of filter from the Saved query list. The advanced toolbar and Listbox are hidden because there is no purpose in interacting with them in these kinds of searches.
If the user selects a regular saved query, the advanced panel is shown normally.

![SQLAdvanceFindWindowTab](pathname:///img/new-features/v7.1/SQLAdvanceFindWindowTab.jpg)

**Technical Info:** [IDEMPIERE-2836](https://idempiere.atlassian.net/browse/IDEMPIERE-2836)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_SQL_Search_In_Windows)_
