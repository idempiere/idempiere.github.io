---
sidebar_position: 2
title: "Add Customer Account FreightCostRule"
sidebar_label: "Add Customer Account FreightCostRule"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-5083](https://idempiere.atlassian.net/browse/IDEMPIERE-5083)

**Description:**

Add FREIGHTCOSTRULE_CustomerAccount where freight cost should be charged to the receiver/customer shipper account.

**Changes:**

- *Add **Customer Account (U)** to the **C_Order FreightCostRule** Reference List*
![5083 FreightCostRule](pathname:///img/new-features/v10/5083_FreightCostRule.png)

_Customer Account Freight Cost Rule_

- *Shipment (Customer): when freight cost rule is **U**, default shipper account from **C_BP_ShippingAcct** (by M_Shipper_ID and C_BPartner_ID of receiver/customer) and set freight charge rule to **Collect (A_Col)** *
    - Business Partner Shipping Account configuration
![5083 BPShippingAccount](pathname:///img/new-features/v10/5083_BPShippingAccount.png)

_Business Partner Shipping Account_
:* Sales Order Freight Cost Rule
![5083 SalesOrderFreightCostRule](pathname:///img/new-features/v10/5083_SalesOrderFreightCostRule.png)

_Sales Order Freight Cost Rule_
:* Customer Shipment Default
![5083 CustomerShipment](pathname:///img/new-features/v10/5083_CustomerShipment.png)

_Customer Shipment Default_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Add_Customer_Account_FreightCostRule)_
