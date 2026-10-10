# Configurable Cache Size per Table

> **Developer:** Carlos Ruiz

**Goal:** Technical

**Description:**

The cache size can be configured per table passing the parameter -DCache.MaxSize.[tablename]=[size] to the JVM, for example:

 -DCache.MaxSize.AD_Column=15000

Set the cache size for AD_Column to 15.000 records

Formerly the cache size was configured programatically.  You can check the cache details and sizes in the idempiereMonitor?CacheDetails=Yes page

**Technical Info:** [IDEMPIERE-5267](https://idempiere.atlassian.net/browse/IDEMPIERE-5267)
