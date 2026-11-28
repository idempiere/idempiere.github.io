---
sidebar_position: 36
sidebar_label: "Configurable Cache Size per Table"
description: "Configurable Cache Size per Table: a New Feature in iDempiere 10."
tags: [technical]
---
# Configurable Cache Size per Table

**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

The cache size can be configured per table passing the parameter -DCache.MaxSize.[tablename]=[size] to the JVM, for example:

 -DCache.MaxSize.AD_Column=15000

Set the cache size for AD_Column to 15.000 records

The name in the parameter is the cache name. For the caches of model classes this is usually the table name. `-DCache.MaxSize=[size]` sets the default for all caches (1000 when not set). See [Caching in plug-ins](/docs/basic-development/plugin-development/caching/caching-overview#settings) for the other settings.

Formerly the cache size was configured programatically.  You can check the cache details and sizes in the idempiereMonitor?CacheDetails=Yes page

**Technical Info:** [IDEMPIERE-5267](https://idempiere.atlassian.net/browse/IDEMPIERE-5267)
