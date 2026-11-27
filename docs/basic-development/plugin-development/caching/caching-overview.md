---
sidebar_position: 1
sidebar_label: How caching works
description: Learn how iDempiere caches work, which cache classes exist, and when caches are cleared on one server and across a cluster.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# How caching works

iDempiere keeps often-read records and values in memory. This page explains the mechanism. The next pages show how to use it. Applies to iDempiere 12 and later.

## Choose the kind of cache first

| Kind | What it does | In iDempiere |
| --- | --- | --- |
| Custom cache | Your code fills and reads it, for example `MCharge.get(ctx, id)`. | Used everywhere in core. This section is about it. |
| Second-level cache | Every model read goes through a cache without code changes. | Does not exist. |
| Response cache | Whole API responses are kept. | Not in core. See [REST API](./caching-rest-api). |

A cache helps only when the same data is read many times. It does not make a slow query fast.

## How it works

Every cache is a `org.compiere.util.CCache`, a thread-safe `Map` that registers with `CacheMgt` when it is created. A cache in a `static` field is created when its class is first used.

| Class | For |
| --- | --- |
| `ImmutableIntPOCache` | Model objects by record ID. Most core model classes. |
| `ImmutablePOCache` | Model objects by `String` key. |
| `CCache` | Other values: IDs, strings, lists, records. |
| `POCopyCache`, `IntPOCopyCache` | A writable copy on every `get`. Rare. |

### Cached model objects are immutable

- `put` marks the object immutable and removes its transaction. Setters and saves that change it then throw `PO is Immutable`. A `save()` without changes returns before that check.
- Because `put` removes the transaction first, an object loaded in a transaction is stored as it is, with any uncommitted values. Only put objects loaded without a transaction. Objects with another context are stored as a copy.
- `get(ctx, key, copyOperator)` returns the shared object only for the same `Properties` object. Every other thread gets a new copy per call.

### When a cache is cleared

![Diagram of one server. On a read, your code calls MCharge.get. On a cache hit it gets the immutable object. On a miss, MCharge.get loads the record from the database itself and puts it into the cache, which marks it immutable. On a write, saveEx registers a cache reset with the transaction, then the transaction commits. After the commit, a background thread removes the record's entry from the cache, or clears the whole cache when its key type differs. On a rollback nothing is cleared.](/img/docs/plugin-development/cache-local.svg)

- **After the commit, on a background thread.** A rollback clears nothing. For a short time, other threads and servers still see the old value.
- **Only if this server has a cache for the table.** Caches are matched by their table name argument, not their cache name.
- **By record ID.** An integer-keyed cache removes that one entry. A `String`-keyed cache is cleared completely. An integer key that is not the record ID is not cleared at all.
- **Tables without a single integer ID differ.** This covers UUID-keyed tables and tables with several key columns. Since iDempiere 13 their reset carries the UUID, and a `String`-keyed cache removes only that exact key. A key built from something else stays stale, also in core caches such as `MProductCategoryAcct` and `MTableValRule`. In iDempiere 12 these resets cleared the whole cache. Clear such caches yourself in `afterSave` and `afterDelete`, as `MSysConfig` does, or run **Cache Reset**.
- **New records clear nothing by default.** `CCache.newRecord` does nothing, so cached lists and cached "not found" results stay. Exception in iDempiere 14: for tables in [`Cache.ClusterResetDebounceTables`](./caching-settings#cluster-settings), a new record clears the whole table on the other servers.
- **Direct SQL clears nothing.** Only saves through `PO` trigger a reset.

### Size and expiry

- Default: at most 1000 entries (`Cache.MaxSize`), expiring 60 minutes after the last access (`Cache.ExpireMinute`).
- `(tableName, name, capacity, expireMinutes, distributed, maxSize)` sets your own limits. `0` means no limit.
- A cached `null` is kept in a separate set without limit or expiry, until the next reset.

See [Settings](./caching-settings).

### Caches in a cluster

![Timeline with four columns: Server A, Database, Hazelcast or Redis, and Server B. Server A saves and commits a record, clears its own cache and sends a reset with the table and the record ID or key. The distributed service delivers it to Server B, which waits a delay of 0 up to Cache.ResetStaggerMaxMs milliseconds and then clears its own cache. Until then Server B can still return the old value. The next get on Server B loads the new row from the database.](/img/docs/plugin-development/cache-cluster.svg)

- Each server has its own cache. Only resets travel between servers.
- **iDempiere 14:** the saving server clears itself, then sends the reset through Hazelcast (a remote task) or Redis (a message). Receivers wait a short delay, then clear.
- **iDempiere 12 and 13:** the saving server runs the reset on all servers and waits for them.
- Code that must see the latest value reads from the database.
- `distributed=true` keeps the content itself in Hazelcast or Redis. Core uses it twice. Prefer local caches.
