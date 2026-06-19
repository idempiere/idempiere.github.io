---
sidebar_position: 38
title: "HikariCP Connection Pool"
sidebar_label: "HikariCP Connection Pool"
description: "**Developers:** Jasper Siepkes, Heng Sin Low, Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developers:** Jasper Siepkes, Heng Sin Low, Carlos Ruiz

## Description
The connection pool library has been replaced with [HikariCP](https://github.com/brettwooldridge/HikariCP)

Pros and cons for libraries HikariCP, c3p0 and DBCP2 were analyzed and in the end HikariCP was chosen.

## Properties file
You can find and configure options for the pool in the file hikaricp.properties, this can be found in the following path:
- $IDEMPIERE_HOME/PostgreSQL/hikaricp.properties
- $IDEMPIERE_HOME/Oracle/hikaricp.properties
Depending on the database you're using.

There are four properties that you cannot change:
- JdbcUrl
- Username
- Password
- driverClassName

You can define or fine-tune the following properties in the properties file, the information below is copied from [HikariCP documentation](https://github.com/brettwooldridge/HikariCP#gear-configuration-knobs-baby), please refer there for up to date information.

| Property | Type | Description | Library Default | Frequency | iDempiere Default |
|---|---|---|---|---|---|
| allowPoolSuspension | boolean | This property controls whether the pool can be suspended and resumed through JMX. This is useful for certain failover automation scenarios. When the pool is suspended, calls to getConnection() will not timeout and will be held until the pool is resumed. | false | infrequent |
| autoCommit | boolean | This property controls the default auto-commit behavior of connections returned from the pool. It is a boolean value. | true | frequent |
| catalog | String | This property sets the default catalog for databases that support the concept of catalogs. If this property is not specified, the default catalog defined by the JDBC driver is used. | driver default | infrequent |
| connectionInitSql | String | This property sets a SQL statement that will be executed after every new connection creation before adding it to the pool. If this SQL is not valid or throws an exception, it will be treated as a connection failure and the standard retry logic will be followed. | none | infrequent |
| connectionTestQuery | String | If your driver supports JDBC4 we strongly recommend not setting this property. This is for "legacy" drivers that do not support the JDBC4 Connection.isValid() API. This is the query that will be executed just before a connection is given to you from the pool to validate that the connection to the database is still alive. Again, try running the pool without this property, HikariCP will log an error if your driver is not JDBC4 compliant to let you know. | none | frequent |
| connectionTimeout | long | This property controls the maximum number of milliseconds that a client (that's you) will wait for a connection from the pool. If this time is exceeded without a connection becoming available, a SQLException will be thrown. Lowest acceptable connection timeout is 250 ms | 30000 (30 seconds) | frequent | 60000 (60 seconds) |
| idleTimeout | long | This property controls the maximum amount of time that a connection is allowed to sit idle in the pool. This setting only applies when minimumIdle is defined to be less than maximumPoolSize. Idle connections will not be retired once the pool reaches minimumIdle connections. Whether a connection is retired as idle or not is subject to a maximum variation of +30 seconds, and average variation of +15 seconds. A connection will never be retired as idle before this timeout. A value of 0 means that idle connections are never removed from the pool. The minimum allowed value is 10000ms (10 seconds). | 600000 (10 minutes) | frequent |
| initializationFailTimeout | long | This property controls whether the pool will "fail fast" if the pool cannot be seeded with an initial connection successfully. Any positive number is taken to be the number of milliseconds to attempt to acquire an initial connection; the application thread will be blocked during this period. If a connection cannot be acquired before this timeout occurs, an exception will be thrown. This timeout is applied after the connectionTimeout period. If the value is zero (0), HikariCP will attempt to obtain and validate a connection. If a connection is obtained, but fails validation, an exception will be thrown and the pool not started. However, if a connection cannot be obtained, the pool will start, but later efforts to obtain a connection may fail. A value less than zero will bypass any initial connection attempt, and the pool will start immediately while trying to obtain connections in the background. Consequently, later efforts to obtain a connection may fail. | 1 | infrequent |
| isolateInternalQueries | boolean | This property determines whether HikariCP isolates internal pool queries, such as the connection alive test, in their own transaction. Since these are typically read-only queries, it is rarely necessary to encapsulate them in their own transaction. This property only applies if autoCommit is disabled. | false | infrequent |
| keepaliveTime | long | This property controls how frequently HikariCP will attempt to keep a connection alive, in order to prevent it from being timed out by the database or network infrastructure. This value must be less than the maxLifetime value. A "keepalive" will only occur on an idle connection. When the time arrives for a "keepalive" against a given connection, that connection will be removed from the pool, "pinged", and then returned to the pool. The 'ping' is one of either: invocation of the JDBC4 isValid() method, or execution of the connectionTestQuery. Typically, the duration out-of-the-pool should be measured in single digit milliseconds or even sub-millisecond, and therefore should have little or no noticeable performance impact. The minimum allowed value is 30000ms (30 seconds), but a value in the range of minutes is most desirable. | 0 (disabled) | frequent |
| leakDetectionThreshold | long | This property controls the amount of time that a connection can be out of the pool before a message is logged indicating a possible connection leak. A value of 0 means leak detection is disabled. Lowest acceptable value for enabling leak detection is 2000 (2 seconds). | 0 | infrequent | 300000 (5 minutes) |
| maximumPoolSize | int | This property controls the maximum size that the pool is allowed to reach, including both idle and in-use connections. Basically this value will determine the maximum number of actual connections to the database backend. A reasonable value for this is best determined by your execution environment. When the pool reaches this size, and no idle connections are available, calls to getConnection() will block for up to connectionTimeout milliseconds before timing out. | 10 | frequent | 90 for PostgreSQL, 150 for Oracle |
| maxLifetime | long | This property controls the maximum lifetime of a connection in the pool. An in-use connection will never be retired, only when it is closed will it then be removed. On a connection-by-connection basis, minor negative attenuation is applied to avoid mass-extinction in the pool. We strongly recommend setting this value, and it should be several seconds shorter than any database or infrastructure imposed connection time limit. A value of 0 indicates no maximum lifetime (infinite lifetime), subject of course to the idleTimeout setting. The minimum allowed value is 30000ms (30 seconds). | 1800000 (30 minutes) | frequent |
| minimumIdle | int | This property controls the minimum number of idle connections that HikariCP tries to maintain in the pool. If the idle connections dip below this value and total connections in the pool are less than maximumPoolSize, HikariCP will make a best effort to add additional connections quickly and efficiently. However, for maximum performance and responsiveness to spike demands, we recommend not setting this value and instead allowing HikariCP to act as a fixed size connection pool. | same as maximumPoolSize | frequent | 10 |
| poolName | String | This property represents a user-defined name for the connection pool and appears mainly in logging and JMX management consoles to identify pools and pool configurations. | auto-generated | frequent |
| readOnly | boolean | This property controls whether Connections obtained from the pool are in read-only mode by default. Note some databases do not support the concept of read-only mode, while others provide query optimizations when the Connection is set to read-only. Whether you need this property or not will depend largely on your application and database. | false | infrequent |
| registerMbeans | boolean | This property controls whether or not JMX Management Beans ("MBeans") are registered or not. | false |
| schema | String | This property sets the default schema for databases that support the concept of schemas. If this property is not specified, the default schema defined by the JDBC driver is used. | driver default | infrequent |
| transactionIsolation | String | This property controls the default transaction isolation level of connections returned from the pool. If this property is not specified, the default transaction isolation level defined by the JDBC driver is used. Only use this property if you have specific isolation requirements that are common for all queries. The value of this property is the constant name from the Connection class such as TRANSACTION_READ_COMMITTED, TRANSACTION_REPEATABLE_READ, etc. | driver default | infrequent |
| validationTimeout | long | This property controls the maximum amount of time that a connection will be tested for aliveness. This value must be less than the connectionTimeout. Lowest acceptable validation timeout is 250 ms. | 5000 | infrequent |

## New SysConfig MSEQUENCE_GETNEXT_TIMEOUT
Under heavy conditions is common to get timeout error waiting for document numbers on AD_Sequence.

The timeout is set to 30 seconds by default, it can be changed using the [SysConfig MSEQUENCE_GETNEXT_TIMEOUT](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#MSEQUENCE_GETNEXT_TIMEOUT)

## Technical Info
[IDEMPIERE-5013](https://idempiere.atlassian.net/browse/IDEMPIERE-5013)

## Possibility of using c3p0
Probably not necessary, but is still possible to use the old c3p0 plugin, the plugin is preserved at [github org.idempiere.db.c3p0.provider](https://github.com/CarlosRuiz-globalqss/org.idempiere.db.c3p0.provider), the replacement is not trivial, but it can be done, it's documented [in this comment in ticket](https://idempiere.atlassian.net/browse/IDEMPIERE-5013?focusedCommentId=48695).

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_HikariCP)_
