---
sidebar_position: 40
title: "Order and Invoice: Tax Lookup Interface"
sidebar_label: "Order and Invoice: Tax Lookup Interface"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-5056](https://idempiere.atlassian.net/browse/IDEMPIERE-5056)

**Description:**

Implement a new tax lookup interface to allow plugin to override the relation between bp/location/product and tax code without changing core.

**Changes:**

- *Add **org.adempiere.base.ITaxLookup** interface.*
- *Add **TAX_LOOKUP_SERVICE** tenant level system configurator record. This define the OSGi component name for tax lookup service and default to **org.adempiere.base.DefaultTaxLookup**. *
![5056 TAX LOOKUP SERVICE](pathname:///img/new-features/v10/5056_TAX_LOOKUP_SERVICE.png)

_TAX_LOOKUP_SERVICE System Configurator record_
- *Add new lookup rule for **Delivery Via** rule. When **Delivery Via** rule is **PickUp**, Warehouse Location instead of Billing To Location is use as Tax Location To. *

**Usage:**

- *Create new OSGI component that implement the **org.adempiere.base.ITaxLookup** interface.*
- *If the new service is for all tenant, change the System tenant's **TAX_LOOKUP_SERVICE** system configurator record value to the new OSGI component name.*
- *If the new service is for a particular tenant, create a new **TAX_LOOKUP_SERVICE** system configurator record for that particular tenant with the new OSGI component name as value.*

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Tax_Lookup_Interface)_
