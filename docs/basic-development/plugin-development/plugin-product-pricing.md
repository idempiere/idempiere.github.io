---
title: Custom Product Pricing in Plug-ins
sidebar_label: Product Pricing Factory
sidebar_position: 20
description: Learn how to extend product pricing in iDempiere using IProductPricingFactory.
---

# Custom Product Pricing in Plug-ins

This tutorial was contributed by Diego Ruiz from BX Service GmbH.

## Goal

The goal of this tutorial is to show how to extend product pricing in your plug-in using `IProductPricingFactory`. Use this service when iDempiere's built-in pricing system doesn't cover your specific pricing requirements.

For more background on the pricing system, see [IDempiere Workshop 2015 - Pricing System](https://wiki.idempiere.org/en/IDempiere_workshop_2015/transcript#Pricing_System).

## Prerequisites

Before you start, review the following tutorials:

- [Developing Plug-Ins Without Affecting the Core](./developing-plugins)
- [Running Plug-ins Locally in iDempiere](./plugin-running-locally)

## Creating a ProductPricingFactory

Create two classes: one for the factory and one for the pricing logic.

The pricing class must extend [`AbstractProductPricing`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/AbstractProductPricing.java):

<!-- TODO: missing image: PluginPricing1.png -->

The factory implements [`IProductPricingFactory`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/IProductPricingFactory.java). In `newProductPricingInstance()`, check conditions (such as `AD_Client_ID`) and return an instance of your pricing class, or `null` to pass control to the next factory. This example applies custom pricing for any non-system client:

<!-- TODO: missing image: PluginPricing2.png -->

```java
@Override
public IProductPricing newProductPricingInstance(int M_Product_ID, int C_BPartner_ID,
        BigDecimal Qty, boolean isSOTrx, String trxName) {
    // Return null for system/default clients, use custom pricing for others
    if (Env.getAD_Client_ID(Env.getCtx()) <= 1)
        return null;
    return new MyProductPricing(M_Product_ID, C_BPartner_ID, Qty, isSOTrx, trxName);
}
```

## Registering via component definition

### Via annotations (recommended)

Add the following annotation to your factory class:

```java
@Component(
    property = { "service.ranking:Integer=100" },
    service = org.adempiere.base.IProductPricingFactory.class
)
public class MyProductPricingFactory implements IProductPricingFactory {
    // ...
}
```

Make sure Eclipse is configured to support DS annotations. See [Simplify Plug-in Development with DS Annotations](./annotations-instead-xml) for setup instructions.

### Via manual component definition

Create an `OSGI-INF` directory, add a component definition XML file, and set:

- **Implementation class:** your factory class
- **Service:** `org.adempiere.base.IProductPricingFactory`
- **Property:** `service.ranking` (Integer, value > 0)

Verify the `Service-Component:` entry in `MANIFEST.MF` points to your XML. Check the `build.properties` file to confirm the XML is included under **Binary Build**.
