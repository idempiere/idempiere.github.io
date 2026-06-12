---
title: Support UOM and QtyEntered on Inventory Documents
sidebar_label: Support UOM and QtyEntered on Inventory Documents
sidebar_position: 13
description: Adds UOM and QtyEntered fields to Physical Inventory and Inventory Increase/Decrease windows.
tags:
  - functional
  - inventory
---

# Feature: Support UOM and QtyEntered on Physical Inventory and Inventory Increase/Decrease

* **Goal:** Functional
* **Developer**: [Diego Ruiz](https://github.com/d-ruiz)
* **Sponsor**:[BX Service GmbH](https://www.bx-service.com/)

## Description
This new feature introduces the **UOM** and **Qty Entered** fields in the Physical Inventory and Inventory Increase/Decrease windows. Previously, quantities could only be entered using the product's default UOM. With this update, you can now manage inventory adjustments using different UOMs, and the system will automatically calculate the adjusted quantity.

This enhancement aligns the functionality of Physical Inventory and Inventory Increase/Decrease with documents like Material Receipt, offering greater flexibility and consistency.

![Physical Inventory UOM](/img/docs/new-features/IDEMPIERE-7010PhysInv.png)

:::info Technical Info
For more details, visit the [JIRA Ticket IDEMPIERE-7010](https://idempiere.atlassian.net/browse/IDEMPIERE-7010).
:::

:::warning Migration Note
The CSV Import Formats for "Inventory Decrease/Increase" and "Physical Inventory" will fail and require updates:

- In Inventory Decrease/Increase, `QtyInternalUse` must be changed to `QtyEntered`.
- In Physical Inventory, `QtyCount` must be changed to `QtyEntered`.
:::

