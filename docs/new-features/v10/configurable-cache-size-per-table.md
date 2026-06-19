---
sidebar_position: 36
title: "Configurable Cache Size per Table"
sidebar_label: "Configurable Cache Size per Table"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

The cache size can be configured per table passing the parameter -DCache.MaxSize.[tablename]=[size] to the JVM, for example:

 -DCache.MaxSize.AD_Column=15000

Set the cache size for AD_Column to 15.000 records

Formerly the cache size was configured programatically.  You can check the cache details and sizes in the idempiereMonitor?CacheDetails=Yes page

**Technical Info:** [IDEMPIERE-5267](https://idempiere.atlassian.net/browse/IDEMPIERE-5267)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Configurable_Cache_Size_Per_Table)_
