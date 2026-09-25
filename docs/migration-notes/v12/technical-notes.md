---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 12."
tags: [features, migration, installation, development, developer-documentation, reference]
---

# Migration notes - iDempiere 12 (technical)

:::note Known issue
Running iDempiere as a server on Windows has reported problems. See the [forum thread](https://groups.google.com/g/idempiere/c/iFtEV_6mwf0/m/GejbvQhOAwAJ).
:::

## JDBC libraries upgraded

Three libraries related to JDBC were upgraded with ticket [IDEMPIERE-6716](https://idempiere.atlassian.net/browse/IDEMPIERE-6716):

- PostgreSQL from 42.7.3 to 42.7.8
- Oracle from ojdbc10 19.21.0.0 to ojdbc17 23.26.0.0.0
- HikariCP from 5.1.0 to 7.0.2

:::warning
PostgreSQL 42.7.8 has a change that could break previously working code. Before this version, `DatabaseMetaData.get*` methods worked with any catalog name, and that parameter was simply ignored. Since 42.7.5, the catalog is used as a filter, so it must be passed as the database name, or `null`.
:::

References:

- [pgjdbc issue #3394](https://github.com/pgjdbc/pgjdbc/issues/3394)
- [pgjdbc issue #3389](https://github.com/pgjdbc/pgjdbc/issues/3389)
- [pgjdbc pull request #3390](https://github.com/pgjdbc/pgjdbc/pull/3390)

## Session fingerprinting

Session fingerprinting was added to the ZK Web UI. See the "NF12 Session Fingerprinting" wiki page for the options being checked.

<!-- TODO: verify — the "NF12 Session Fingerprinting" wiki page has not been migrated to Docusaurus yet; linking out to https://wiki.idempiere.org/en/NF12_Session_Fingerprinting until it is. -->

It is possible your users will be logged out when changing the browser's language during an iDempiere session, or if the browser is updated.

:::warning
It is also possible that changes of IP address will be logged in the application log and in `AD_Issue`. This can happen when connecting to a VPN, changing Wi-Fi, or using mobile networks. It can also indicate an attempt to hijack the session. Keep an eye on these alerts and verify suspicious activity.
:::

## New Env.parseContext parameter

A new parameter was added to `Env.parseContext`:

- **forSQL**: if `true`, the parsed value is intended for a SQL statement, so it replaces quotes accordingly.

:::tip
Review your plugins and use the new parameter when `Env.parseContext` is intended to be used in SQL clauses. This is important to help prevent SQL injection attacks.
:::

## New SQLFragment approach

In many places in iDempiere, direct SQL clauses were built with parameters replaced directly within the where clause. This can open the door to SQL injection attacks.

To address this, `org.idempiere.db.util.SQLFragment` was added. This approach allows defining a where clause with binding parameters and associating a list of parameters to the clause.

:::note
Many methods were deprecated to encourage the use of the new `SQLFragment` approach instead of building where clauses directly. Review your plugins for usage of these deprecated methods and consider migrating to `SQLFragment`.
:::
