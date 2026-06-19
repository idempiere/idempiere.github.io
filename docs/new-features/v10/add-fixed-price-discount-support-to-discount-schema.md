---
sidebar_position: 3
title: "Add Fixed Price Discount Support to Discount Schema"
sidebar_label: "Add Fixed Price Discount Support to Discount Schema"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-5260](https://idempiere.atlassian.net/browse/IDEMPIERE-5260)

**Description:**

Enhance discount schema to support the setting of fixed unit price for each discount break point.

**Changes:**

- *Add **Fixed Price** field to the Discount Break tab.*
![5260 FixedPrice Field](pathname:///img/new-features/v10/5260_FixedPrice_Field.png)

_Fixed Price Field_

- ***Break Discount %** and **Fixed Price** field are mutually exclusive - if there is a **Break Discount %** and **Fixed Price** is entered, the **Break Discount %** should be reset to 0.  If there is a **Fixed Price** value, and a **Break Discount %** is entered, the **Fixed Price** should be reset to 0.  Only one value can exist on a line.*

- *When a new line is added to an order, the Discount Schema is process, and  the criteria for the Line are met, see if there is a value in **Fixed Price**, if there is, set Price on the Order Line to the **Fixed Price**.  If not, use **Break Discount %** as before.*

**Example:**

- *Setup Fixed Price=1 for Break Value=10 and Produce=Mulch.*
![5260 FixedPrice Example](pathname:///img/new-features/v10/5260_FixedPrice_Example.png)

_Fixed Price Discount Configuration Example_

- *Order line with Quantity=1. Quantity is less than break value and doesn't apply the fixed price discount.*
![5260 Price 1](pathname:///img/new-features/v10/5260_Price_1.png)

_Order line with Quantity=1_

- *Order line with Quantity=20. Quantity is greater than break value and unit price takes the fixed price value from discount schema.*
![5260 Price 20](pathname:///img/new-features/v10/5260_Price_20.png)

_Order Line with Quantity=20_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Fixed_Price_Discount)_
