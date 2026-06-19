---
sidebar_position: 11
title: "Stocked Expense Type Product"
sidebar_label: "Stocked Expense Type Product"
description: "**Developer: Deepak Pansheriya [Logilite Technologies](http://www.logilite.com/)**"
tags: [functional]
---
**Goal:** Functional

**Developer: Deepak Pansheriya [Logilite Technologies](http://www.logilite.com/)**

**Feature** **Ticket:** [IDEMPIERE-5836](https://idempiere.atlassian.net/browse/IDEMPIERE-5836)


**Description:**

There are cases when purchased items needs to account to expense on Material Receipt but needs to track the movement of item. for example there may be marketing material or promotional items which needs to accounts in expense General Ledger at Material Receipt time but needs to maintain stock and records whom it shipped. Stocked Expense type product support is added to support this scenarios.

**Changes:**

Now on Product window, even selecting product type expense, stocked flag can be marked.

**Behavior:**

When material received, storage are updated to records stock for stocked expense type of product but it debit expense account instead of inventory asset account.

Customer Shipment, Movement, Physical Inventory and Internal Use inventory impact on-hand stock but do not generate any GL posting.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Stocked_Expense_Type_Product)_
