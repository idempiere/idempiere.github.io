---
sidebar_position: 18
title: "Inventory Documents"
sidebar_label: "Inventory Documents"
description: "**Contributor:** Edwin Ang"
tags: [functional]
---
**Goal:** Functional

**Contributor:** Edwin Ang

**Contributor:** Carlos Ruiz

**Description:**

Previously when an Internal Use Inventory document had lines with qty 0 and complete the document the physical inventory of that product goes to zero, leading to big data corruption.

This problem was solved creating two different DocSubtype, one for "Physical Inventory" and other for "Internal Use Inventory"

Also the import inventory was improved to allow importing internal use inventories.

![inventory1](pathname:///img/new-features/v1.0/inventory1.png)

![inventory2](pathname:///img/new-features/v1.0/inventory2.png)

## New document types created
- Internal Use Inventory

![inventory3](pathname:///img/new-features/v1.0/inventory3.png)

- Material Physical Inventory

![inventory4](pathname:///img/new-features/v1.0/inventory4.png)

A new "Inv Sub Type" field was created in the "Document Type" window, which is visible only when Document BaseType=Material Physical Inventory

 * **Inv Sub Type**: The Inventory Sub Type indicates the type of inventory this document refers to.  This field only appears when the Document Base Type is Material Physical Inventory.
   The selection made here will determine which window must be used and which data in the lines is relevant for the document.
   Internal Use inventory (based on Internal Used Quantity) or Physical Inventory (based on difference   between Qty Counted vs Qty Book).

*Note: When you need to create a new type of inventory document, you need to set manually the inventory document subtype for your inventory documents*

**Technical Info:** [IDEMPIERE-281](http://idempiere.atlassian.net/browse/IDEMPIERE-281) [IDEMPIERE-675](http://idempiere.atlassian.net/browse/IDEMPIERE-675)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Inventory_Documents)_
