---
sidebar_position: 28
title: "System Property to avoid cutting log"
sidebar_label: "System Property to avoid cutting log"
description: "**Developers:** Nicolas Micoud"
tags: [technical]
---
**Goal:** Technical

**Developers:** Nicolas Micoud

**Sponsor:** [TGI](http://tgi.eu)

**Feature Ticket:** [IDEMPIERE-6248](https://idempiere.atlassian.net/browse/IDEMPIERE-6248)

**Description:**

Current code is cutting trace log in a hardcoded way. And you can only have

''09:18:18.234-----------> ProxyLeakTask.run: Connection leak detection triggered for org.postgresql.jdbc.PgConnection@3101587f on thread pool-1-thread-5, stack trace follows [329]
java.lang.Exception: Apparent connection leak detected
```
   at com.zaxxer.hikari.HikariDataSource.getConnection(HikariDataSource.java:99)
   at org.compiere.db.DB_PostgreSQL.getCachedConnection(DB_PostgreSQL.java:609)
   at org.compiere.db.CConnection.getConnection(CConnection.java:1142)
   at org.compiere.util.DB.createConnection(DB.java:449)
   at org.compiere.util.Trx.getConnection(Trx.java:231)
   at org.compiere.util.Trx.getConnection(Trx.java:210)
   at org.compiere.db.PreparedStatementProxy.init(PreparedStatementProxy.java:89)
   at org.compiere.db.PreparedStatementProxy.<init>(PreparedStatementProxy.java:52)
   at org.compiere.db.ProxyFactory.newCPreparedStatement(ProxyFactory.java:54)
   at org.compiere.util.DB.prepareStatement(DB.java:750)
   at org.compiere.util.DB.prepareStatement(DB.java:708)
   at org.compiere.model.Query.first(Query.java:363)''
```

which gives no clue about the origin of the error.

Now, the *org.idempiere.FullExceptionTraceInLog* (if set to true) allow to get the full trace log.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_SystemPropertyToAvoidCuttingLog)_
