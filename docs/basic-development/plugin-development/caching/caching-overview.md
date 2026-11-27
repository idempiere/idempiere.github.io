---
sidebar_position: 1
sidebar_label: How caching works
description: Learn how iDempiere caches work, which cache classes exist, and when caches are cleared on one server and across a cluster.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# How caching works

iDempiere keeps frequently read records and values in memory so that it does not ask the database for them again and again. This page explains how these caches work and when they are cleared. The other pages in this section show how to use them in your own plug-in without serving stale or shared data. Applies to iDempiere 12 and later. Details that differ between releases say so.

## Choose the kind of cache first

There are three different things people mean by "cache". Decide which one you need before you write code.

| Kind | What it does | Status in iDempiere |
| --- | --- | --- |
| Custom cache | Your code fills it and reads from it with explicit calls, for example `MCharge.get(ctx, id)`. | This is what core uses in model classes, processes and callouts. The pages in this section are about this kind. |
| Transparent second-level cache | Every database read of a model goes through the cache without any code change. | iDempiere does not have one. |
| Response cache | Whole responses of an API are kept and served again. | Not part of core. See [Caching and the REST API](./caching-rest-api). |

A cache only helps when the same data is read many times. It does not make a slow query fast. If one view or report is slow, look at the query, a summary table or a scheduled process that builds the result in advance. If the data you need combines several models, such as a product catalog made of products, storage and prices, build a custom cache for that combined result.

## How it works

All caches are instances of `org.compiere.util.CCache` or one of its subclasses. A `CCache` is a thread-safe `Map` that registers itself with the global cache manager `org.compiere.util.CacheMgt` when it is created. For a cache in a `static` field, that happens when the class is first used.

| Class | Use it for |
| --- | --- |
| `org.idempiere.cache.ImmutableIntPOCache` | Model objects (PO) with the record ID as the key. Most core model classes use it. |
| `org.idempiere.cache.ImmutablePOCache` | Model objects with a `String` key, for example a search key or a language code. |
| `org.compiere.util.CCache` | Values that are not model objects: IDs, strings, lists, value objects. |
| `org.idempiere.cache.POCopyCache`, `IntPOCopyCache` | Model objects where every reader gets its own writable copy. They store a copy and return a new copy on every `get`. Rarely used. |

### Cached model objects are immutable

`ImmutablePOCache` and `ImmutableIntPOCache` call `markImmutable()` on the object you `put`. A setter or `save()` on an immutable object throws `IllegalStateException: PO is Immutable`. This keeps one thread from changing an object that other threads are reading. Marking an object immutable also removes its transaction name, so do not `put` an object that you still want to change.

The cache stores objects without a transaction. If the object you `put` was loaded in a transaction or with a context other than `Env.getCtx()`, the cache stores a copy instead. `get(ctx, key, copyOperator)` returns the shared object only when `ctx` is the same `Properties` object that the cached object holds. Otherwise it returns a new immutable copy on every call.

### When a cache is cleared

Each cache has a table name, the first constructor argument. When a record of a table is saved or deleted through `PO`, `PO` schedules a reset for that table. The diagram shows what happens on one server.

![Diagram of one server. On a read, your code calls MCharge.get. On a cache hit it gets the immutable object. On a miss, MCharge.get loads the record from the database itself and puts it into the cache, which marks it immutable. On a write, saveEx registers a cache reset with the transaction, then the transaction commits. After the commit, a background thread removes the record's entry from the cache, or clears the whole cache when its key type differs. On a rollback nothing is cleared.](/img/docs/plugin-development/cache-local.svg)

This has some consequences:

- **The reset runs after the commit, on a background thread.** A rollback discards it. Inside the transaction, and for a short time after the commit, other threads and other servers can still read the old value. A thread that loaded the old row just before the commit can even put it back into the cache after the reset.
- **A reset is only sent when this server has a cache for the table.** The check uses the caches registered on the saving server. A cache in a `static` field exists only after its class has been used on that server.
- **Only caches with that table name are cleared.** A cache is matched by its table name argument, not by its cache name. A cache whose table name is not a real table, such as `ProductCost_ValidCombination`, is only cleared by a full reset.
- **Only entries keyed by the record's own ID are removed one by one.** For a table with an integer ID, the reset carries the record ID. A cache with integer keys removes the entry with that key, and a cache with other keys is cleared completely. An integer key that is not the record ID, such as a tenant ID, is neither removed nor cleared.
- **Tables keyed by UUID work differently.** Since iDempiere 13, the reset for these tables carries the UUID. A cache with `String` keys removes only the entry whose key is that UUID. A `String` key built from something else, such as a search key, is not cleared. Key such caches by the UUID.

  <!-- TODO: verify: confirm with the core team whether String-keyed caches on UUID tables staying stale is intended, or a bug to report -->
- **New records do not clear anything.** Saving a new record calls `newRecord` on the caches of the table, and `CCache.newRecord(int)` does nothing. A cached list, such as "all active records of table X", or a cached "not found" result keeps its old content.
- **Changes that bypass `PO` are not seen.** An `UPDATE` through `DB.executeUpdateEx`, a database trigger or another application does not clear any cache.
- **Changing a translation clears the translation cache.** When a translated column of an existing `_Trl` record changes, `PO` also clears the matching entries of the translation cache.

`MSysConfig` clears its whole cache whenever a System Configurator record is created, changed or deleted. Keys that end with `_NOCACHE` are never cached. See [SysConfig without Cache](/docs/new-features/v6.2/sysconfig-without-cache).

### Size and expiry

`CacheMgt.register` builds each cache on a [Caffeine](https://github.com/ben-manes/caffeine) cache, or on a plain `ConcurrentHashMap` when there is no limit.

| Constructor arguments | Result |
| --- | --- |
| `(tableName, initialCapacity)` | At most `Cache.MaxSize` entries (default 1000). Entries expire `Cache.ExpireMinute` minutes (default 60) after their last access. |
| `(tableName, name, initialCapacity, expireMinutes, distributed, maxSize)` | Your own limits. `0` minutes means no expiry and `0` entries means no size limit. |
| `(..., 0, false, 0)` | No expiry and no size limit. Core uses this for small, fixed reference data such as `MRefList`, `MRegion`, `MLanguage` and `MSysConfig`. |

The `initialCapacity` argument is ignored. The property `Cache.MaxSize.<cache name>` overrides the size set in code. See [Caching settings](./caching-settings).

A `put(key, null)` stores a "not found" result in a separate set that has no size limit and never expires. Only a reset empties it.

### Caches in a cluster

Caches are local to each server. When a record changes, the reset has to reach every server. How that happens depends on the release.

**iDempiere 14:** the server that saved the record clears its own cache first. It then sends the reset to the other servers through the distributed service: a remote task on Hazelcast, the default, or a message on Redis. Each receiving server waits a short delay that depends on its position in the cluster, then clears its cache. The diagram shows this flow.

![Timeline with four columns: Server A, Database, Hazelcast or Redis, and Server B. Server A saves and commits a record, clears its own cache and sends a reset with the table and the record ID or key. The distributed service delivers it to Server B, which waits a delay of 0 up to Cache.ResetStaggerMaxMs milliseconds and then clears its own cache. Until then Server B can still return the old value. The next get on Server B loads the new row from the database.](/img/docs/plugin-development/cache-cluster.svg)

**iDempiere 12 and 13:** the saving server sends the reset as a task to every server in the cluster, itself included, and waits until all of them have run it. There is no delay.

In every release, other servers can return the old value between the commit and their own reset. Code that must see the latest value has to read from the database. For the iDempiere 14 settings that control the delay and limit the messages, see [Cluster settings](./caching-settings#cluster-settings).

The `distributed` constructor argument keeps the cache content itself in Hazelcast or Redis instead of on each server. Core uses it for two caches only. On a server that is not part of a cluster it has no effect. In a cluster, the size and expiry of such a cache come from the settings of Hazelcast or Redis, not from the constructor. Keep your caches local and rely on the resets.

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).

## Related pages

- [Model factories](../plugin-modelfactory)
- [Event handlers](../plugin-eventhandler)
- [PO is immutable](/docs/migration-notes/v8.2/technical-notes#po-is-immutable)
- [Distributed Cache](/docs/new-features/v1.0/distributed-cache)
- [Redis as Distributed Cache Backend](/docs/new-features/v14/redis-distributed-cache)
- [Configurable Cache Size per Table](/docs/new-features/v10/configurable-cache-size-per-table)
