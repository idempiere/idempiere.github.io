---
sidebar_position: 26
title: "Monitor Null Trx"
sidebar_label: "Monitor Null Trx"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

In version 4.1 it was implemented a way to monitor transactions on idempiereMonitor (see [Monitor_Trx](https://wiki.idempiere.org/en/NF4.1_Monitor_Trx)), but this implementation is able just to monitor explicit transactions.

In many places iDempiere uses a null transaction (an auto-commit transaction intended for short-time operations), and these transactions potentially can have leaks or open cursor problems too.

With this new feature you can also monitor null transactions using the System Property:
 -DTRACE_NULL_TRX_CONNECTION=true

You can also enable this on a running server from the OSGi console using:
 setprop TRACE_NULL_TRX_CONNECTION=true
and disable it with:
 setprop TRACE_NULL_TRX_CONNECTION=false

WARNING: This option can have a big performance impact and must be used with care on production just temporarily to trace problematic connection slowness or leaks.

**Technical Info:** [IDEMPIERE-6125](https://idempiere.atlassian.net/browse/IDEMPIERE-6125)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Monitor_Null_Trx)_
