---
sidebar_position: 2
sidebar_label: Best practices
description: Rules for using iDempiere caches in plug-ins, such as reusing existing caches, never changing cached objects and clearing caches correctly.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching best practices

These rules come from the iDempiere source and from problems reported in the community. Read [How caching works](./caching-overview) first. Applies to iDempiere 12 and later.

## Use the cache that already exists

Before you add a cache or make one bigger, check that your code uses the cache that is already there. Most core model classes have a static `get` method that reads from the cache.

```java
// Reads from the cache. Do not change the returned object.
MCharge charge = MCharge.get(ctx, C_Charge_ID);

// Reads from the database every time.
MCharge charge2 = new MCharge(ctx, C_Charge_ID, trxName);
```

To find code that skips the cache, look in PostgreSQL's `pg_stat_statements` view for simple `SELECT ... WHERE X_ID=$1` statements that run millions of times.

## Never change a cached object

If you need to change a record, load a writable copy:

```java
// A writable copy in your transaction
MCharge charge = MCharge.getCopy(ctx, C_Charge_ID, trxName);
charge.setDescription("Changed");
charge.saveEx();
```

Classes without a `getCopy` method can be loaded with the `(ctx, id, trxName)` constructor.

## Read from the database inside your own transaction

The cache does not see what your open transaction has written. Code that creates a record and then reads it, or reads a record it has just changed, must use the `(ctx, id, trxName)` constructor. This also applies to 2Pack and migration code, where a column can reference a table created in the same package.

## Give the cache the real table name

Create the cache with the table name of the records it holds, for example `Table_Name` in a model class. Otherwise saving a record does not clear it. If the cache holds data derived from several tables, clear it yourself when one of the other tables changes.

A server only sends resets for tables that have a cache registered on that server. A cache in a `static` field is registered when its class is first used. In a cluster, make sure the class is loaded on every server, for example by using it when your plug-in starts. Otherwise a save on a server that never used the class does not clear the caches on the others.

## Use integer keys where you can

Key model caches by the record's own ID. Then a save removes only that one entry. With a `String` or composite key on a table with integer IDs, every save on the table clears the whole cache. An integer key that is not the record ID, such as a tenant ID, is worse: a save neither removes the right entry nor clears the cache. If you need such a key, see the [list example](./caching-examples#cache-a-list-per-tenant).

## Clear the cache after direct SQL

After an `UPDATE`, `INSERT` or `DELETE` that does not go through `PO`, schedule the reset for the same transaction so it runs after the commit.

```java
int count = DB.executeUpdateEx(
    "UPDATE C_Charge SET IsActive='N' WHERE C_ChargeType_ID=?",
    new Object[] {C_ChargeType_ID}, trxName);
if (count > 0)
    // -1 clears all entries of the C_Charge caches after the commit
    CacheMgt.scheduleCacheReset(MCharge.Table_Name, -1, false, trxName);
```

## Size the cache to the data it serves

A cache smaller than the set of records in use keeps evicting entries and then reloads them, so it adds database load instead of saving it. For example, 3000 locators in a cache limited to 1000 entries lead to millions of queries. Either size the cache to the data or, for small fixed data, use no limit. To change the limit without a code change, start the server with `-DCache.MaxSize.<cache name>=<entries>`, for example `-DCache.MaxSize.M_Locator=10000`. See [Configurable Cache Size per Table](/docs/new-features/v10/configurable-cache-size-per-table).

Do not use an unbounded cache for data that grows with the business, such as products or business partners.

## Do not cache tables with heavy write traffic

When a cache exists for the table, every save sends a reset to the other servers. On a table that changes many times per second, such as a message queue, these messages cost more than the cache saves. If the table is your own, do not define a cache for it. Since iDempiere 14 you can also limit the messages for a table, see [Cluster settings](./caching-settings#cluster-settings).

## Suspend resets during batch jobs

A batch job that saves thousands of records of one table triggers one reset per record, and each reset can refresh open lookup fields in the web UI. Suspend the resets for the table and clear it once at the end.

Suspension only drops resets that run while it is active, and resets run after a commit. So the batch has to commit inside the suspended period. In a process, the process transaction commits only after `doIt` returns, so use a transaction of your own:

```java
CacheMgt.get().suspendTableCacheReset(MCharge.Table_Name);
Trx trx = Trx.get(Trx.createTrxName("ChargeBatch"), true);
try {
    // create or change many C_Charge records with trx.getTrxName(),
    // and call trx.commit(true) every few hundred records
    trx.commit(true); // throws SQLException
} finally {
    trx.close();
    CacheMgt.get().resumeTableCacheReset(MCharge.Table_Name);
}
// One reset for everything the batch changed
CacheMgt.get().reset(MCharge.Table_Name);
```

:::warning

The suspension applies to the whole server, not only to your thread, and there is only one flag per table. Resets that run while it is active are dropped, not queued. Resets of the last commit can still run after you resume, because they run on a background thread. Always resume in a `finally` block and reset the table afterwards.

:::

Since iDempiere 12, lookup fields combine refresh requests that arrive within half a second ([IDEMPIERE-6065](https://idempiere.atlassian.net/browse/IDEMPIERE-6065)), so a suspension is mainly worth it for very large batches and in a cluster.

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).
