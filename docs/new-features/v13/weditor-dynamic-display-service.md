---
title: "WEditor Dynamic Display OSGI Service"
sidebar_label: "WEditor Dynamic Display OSGI Service"
sidebar_position: 14
description: "This enhancement expose the existing WEditor.DynamicDisplayListener interface as OSGi service"
tags: [technical]
---

# WEditor Dynamic Display OSGI Service

**Goal:** New OSGI Service

**Developer:** hengsin

**Feature** **Ticket:** [IDEMPIERE-7045](https://idempiere.atlassian.net/browse/IDEMPIERE-7045)

**Overview**

This enhancement expose the existing `WEditor.DynamicDisplayListener` interface as OSGi service.

The feature allows developers to implement OSGi component that will participate in the GridField WEditor dynamic display cycle.

**Usage**
* Create a new OSGi component that implement the `WEditor.DynamicDisplayListener` interface.
* The OSGi component must have the `AD_Field_UU` string property that will match with `AD_Field.AD_Field_UU` value of GridField.
* WEditor instance created for the corresponding GridField will add the OSGi component as dynamic display listener.
* The OSGi component must be thread safe.

**Example**
```java
@Component(
	property = {"AD_Field_UU=374eb2f5-41b6-45e4-8032-877d6f401c93"},
	service = WEditor.DynamicDisplayListener.class,
    immediate = true
)
public class CostAdjustmentLineASIListener implements WEditor.DynamicDisplayListener {
	@Override
   public void onDynamicDisplay(Properties ctx, WEditor editor) {
           ...
   }
}
```


