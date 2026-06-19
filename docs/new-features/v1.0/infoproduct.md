---
sidebar_position: 17
title: "Improved Info Product"
sidebar_label: "Improved Info Product"
description: "**Functional:** Material Management, Info Views"
tags: [functional]
---
**Goal:** Usability

**Functional:** Material Management, Info Views

**Contributors:** Hesham Ahmed, Carlos Ruiz

**Description:**

- Info Product window now will always show one product per line. That includes new products without price and/or stock information yet.

- The price fields are shown only if a price list version is selected. These columns also follow the new role security configuration of iDempiere, hiding them if the user doesn't have role access rights.

- To show all prices for a product, a new *Price* tab is added.

- The stock fields are shown only if a warehouse is selected

- The info product window behaves accordingly when invoked from specific windows (i.e. Sales Order), now it recognizes properly the product on the field and behaves correctly when the user push enter on product fields

## Info Product with Warehouse and Price List Version selected
Note also the new price tab:

![NF001 UX InfoProduct01](pathname:///img/new-features/v1.0/NF001_UX_InfoProduct01.png)

## Info Product with just Warehouse selected
![NF001 UX InfoProduct02](pathname:///img/new-features/v1.0/NF001_UX_InfoProduct02.png)

## Info Product with just Price List Version selected
![NF001 UX InfoProduct03](pathname:///img/new-features/v1.0/NF001_UX_InfoProduct03.png)

## Info Product without Warehouse neither Price List Version
![NF001 UX InfoProduct04](pathname:///img/new-features/v1.0/NF001_UX_InfoProduct04.png)

**Technical Info:**
[IDEMPIERE-49](http://idempiere.atlassian.net/browse/IDEMPIERE-49)
[IDEMPIERE-191](http://idempiere.atlassian.net/browse/IDEMPIERE-191)
[IDEMPIERE-337](http://idempiere.atlassian.net/browse/IDEMPIERE-337)
[IDEMPIERE-339](http://idempiere.atlassian.net/browse/IDEMPIERE-339)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_InfoProduct)_
