---
sidebar_position: 1
title: "Add Always Updatable Logic Override Flag"
sidebar_label: "Add Always Updatable Logic Override Flag"
description: "**Developer:** Deepak Pansheriya"
tags: [functional]
---
**Goal:** Technical

**Developer:** Deepak Pansheriya

**Feature** **Ticket:** [IDEMPIERE-5349](https://idempiere.atlassian.net/browse/IDEMPIERE-5349)


### Description
When defining a column you can define if a value is updatable or always updatable (when you want to update it even if the record is marked as processed).

But there are some cases where you need to make a field updatable on processed records based on a condition.

For example, the following configuration allows just the SuperUser user to be able to change the currency field on processed records in Test table:

![01 AlwaysUpdatableLogic.png](pathname:///img/new-features/v10/01_AlwaysUpdatableLogic.png.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Add_Always_Updatable_Logic_Override_Flag)_
