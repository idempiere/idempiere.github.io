---
title: Support UOM and QtyEntered on Physical Inventory
sidebar_label: UOM and QtyEntered
sidebar_position: 1
description: Adds UOM and QtyEntered fields to Physical Inventory and Inventory Increase/Decrease windows.
tags:
  - functional
  - inventory
---

# Feature: Support UOM and QtyEntered on Physical Inventory and Inventory Increase/Decrease

:::warning Not Yet in Stable Release
This feature is not yet part of a stable iDempiere release and may change.
:::

## Goal
Functional

## Developer
[[User:Diego.ruiz|Diego Ruiz]]

## Sponsor
[https://www.bx-service.com/ BX Service GmbH]

## Description
This new feature introduces the UOM and Qty Entered fields in the Physical Inventory and Inventory Increase/Decrease windows. Previously, quantities could only be entered using the product's default UOM. With this update, you can now manage inventory adjustments using different UOMs, and the system will automatically calculate the adjusted quantity.

This enhancement aligns the functionality of Physical Inventory and Inventory Increase/Decrease with documents like Material Receipt, offering greater flexibility and consistency.

[[File:IDEMPIERE-7010PhysInv.png|center]]

## Technical Info
[https://idempiere.atlassian.net/browse/IDEMPIERE-7010 IDEMPIERE-7010]

