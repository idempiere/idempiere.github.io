---
sidebar_position: 55
title: "Virtual Column Lazy Loading"
sidebar_label: "Virtual Column Lazy Loading"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Saulo Gil

**Feature Ticket:** [IDEMPIERE-5126](https://idempiere.atlassian.net/browse/IDEMPIERE-5126)

**Description:**

Virtual columns were loaded among the rest of the regular columns when instantiating a model class. This behavior was changed as a performance improvement, now virtual columns are queried on-demand whenever their *getter* methods are called. In case the developer wants to load virtual column along with regular ones, that can be achieved as shown below.

**New constructor**

```
 testPo = new MTest(Env.getCtx(), testPo.get_ID(), getTrxName(), MTest.COLUMNNAME_TestVirtualQty);
```

One or many virtual columns can passed on as parameters after the trxName parameter.

```
 testPo = new MTest(Env.getCtx(), testPo.get_ID(), getTrxName(), MTest.COLUMNNAME_TestVirtualQty, MTest.COLUMNNAME_AnotherVirtualColumn);
```

**Using Query**

```
 new Query(Env.getCtx(), MTest.Table_Name, MTest.COLUMNNAME_Test_ID + "=?", getTrxName())
   .setVirtualColumns(I_Test.COLUMNNAME_TestVirtualQty).first();
```

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Virtual_Column_Lazy_Loading)_
