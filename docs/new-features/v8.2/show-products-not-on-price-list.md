---
sidebar_position: 13
title: "Show Products Not On Price List"
sidebar_label: "Show Products Not On Price List"
description: "One of the most common problems when entering sales or purchase order lines is hitting the error:"
tags: [functional]
---
**Goal:** Functional

Carlos Ruiz

**Description:**

One of the most common problems when entering sales or purchase order lines is hitting the error:

Product is not on PriceList

This error is OK most of the times, but in certain scenarios is unnecessary, for example:
- when there is a plugin that manages prices in tables different than the core
- when there is a mechanism to automatically create the price after saving the order line

Now this is possible to be configured at Client level with the [System Configurator key](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#INFO_PRODUCT_SHOW_PRODUCTS_WITHOUT_PRICE):

INFO_PRODUCT_SHOW_PRODUCTS_WITHOUT_PRICE = Y

**Technical Info:** [IDEMPIERE-5020](https://idempiere.atlassian.net/browse/IDEMPIERE-5020)

**Known Issues:** This is not working when there are prices for the product in other price list versions.

As a workaround you can use UsePriceListInProductInfo=N in the predefined context variables of the window.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Show_Products_Not_On_Price_List)_
