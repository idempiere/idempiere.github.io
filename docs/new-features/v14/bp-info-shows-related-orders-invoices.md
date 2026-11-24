---
sidebar_label: Related Orders and Invoices on BP Info
sidebar_position: 9
description: The Business Partner Info window now shows related Orders and Invoices tabs, and the feature can be disabled by deactivating the related records.
tags:
  - user-experience
applies_to: ">=14"
last_reviewed: 2026-11-22
---

# Show Related Orders and Invoices on Business Partner Info

**Goal:** User Experience

**Developer:** [Carlos Ruiz](https://github.com/CarlosRuiz-globalqss) ([BX Service](https://www.bx-service.com))

**Feature Ticket:** [IDEMPIERE-7227](https://idempiere.atlassian.net/browse/IDEMPIERE-7227)

**Version:** iDempiere 14

## The problem

When working with a Business Partner, users often need to see the related orders and invoices. Before this change, that meant leaving the Business Partner Info window and opening the separate Orders and Invoices info windows. This extra navigation made it harder to get a complete view of a partner's activity from one place.

## What changed

The Business Partner Info window now includes two related info tabs:

- **Order Info**
- **Invoice Info**

When you open the Business Partner Info window and select a Business Partner, the related orders and invoices appear in their own tabs without leaving the window.

The feature is implemented by adding two related info records in the Application Dictionary:

| Related tab | Info related record | Source info window |
| --- | --- | --- |
| Orders | 200001 | Orders |
| Invoices | 200002 | Invoices |

A hidden query criteria field (`IsNotOpenAsRelated`) was added to the Orders and Invoices info windows. When these windows are opened as related tabs, the Business Partner filter is hidden so the list shows only the records for the selected partner.

## How to use it

1. Open the **Business Partner Info** window.
2. Select or search for a Business Partner.
3. Click the **Order Info** tab to see the related sales and purchase orders.
4. Click the **Invoice Info** tab to see the related invoices.

![Business Partner Info window showing the related Orders and Invoices tabs](/img/docs/new-features/v14/BPInfoWithRelatedOrdersAndInvoices.png)

## How to disable the feature

To disable this feature, deactivate the related records in the Business Partner Info window:

1. Open the **Info Window** window.
2. Find and open the **Business Partner** info window.
3. Go to the **Info Related** subtab.
4. Deactivate the records for **Orders** and **Invoices**.

## Migration impact

None. The feature is enabled by default and only adds new related tabs to the Business Partner Info window. Existing behavior of the separate Orders and Invoices info windows is unchanged.

## Related tickets

- [IDEMPIERE-7227](https://idempiere.atlassian.net/browse/IDEMPIERE-7227)
