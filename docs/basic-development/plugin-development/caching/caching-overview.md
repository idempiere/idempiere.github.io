---
sidebar_position: 1
sidebar_label: How caching works
description: Learn how iDempiere caches work, which cache classes exist, when caches are cleared, and which settings change them.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-28
---
# How caching works

iDempiere keeps often-read data in memory on each server. Applies to iDempiere 12 and later.

## What it covers

The cache saves database reads for data that many users read often. It is not a general data store.

| Covers | Does not cover |
| --- | --- |
| In-memory caches on each server, filled on first read | A shared cache server holding the data |
| Clearing an entry after a save commits, also on other servers | Caching every database read automatically |
| Master data, such as products, price list headers, units of measure, settings | Calculated results, such as product prices |
| | API responses: see [REST API](./caching-rest-api) |
| | Changes from outside iDempiere, such as SQL scripts: they need **Cache Reset** |

## Cache classes

Pick the class by what you store. Model objects need a cache that protects them from changes.

| Class | For |
| --- | --- |
| `ImmutableIntPOCache` | Model objects by record ID. Most core model classes. |
| `ImmutablePOCache` | Model objects by `String` key |
| `CCache` | Other values: IDs, strings, lists, records |

All of them are `CCache`, a thread-safe `Map` registered with `CacheMgt`.

## Cached objects are read-only

Many users share one cached object, so nobody may change it.

- A setter or save that changes a cached object throws `PO is Immutable`.
- Store only objects loaded without a transaction.
- Another `Properties` object gets its own copy on every `get`.

## When a cache is cleared

A cache entry is cleared after the database change is committed, not before. Some changes do not clear it at all.

![Diagram of one server. On a read, your code calls MCharge.get. On a cache hit it gets the immutable object. On a miss, MCharge.get loads the record from the database itself and puts it into the cache, which marks it immutable. On a write, saveEx registers a cache reset with the transaction, then the transaction commits. After the commit, a background thread removes the record's entry from the cache, or clears the whole cache when its key type differs. On a rollback nothing is cleared.](/img/docs/plugin-development/cache-local.svg)

| Event | Effect |
| --- | --- |
| Save or delete through `PO`, after commit | Removes the entry with that record ID. Clears `String`-keyed caches completely. |
| Rollback | Nothing |
| New record | Nothing, by default |
| SQL script, import by script, other application | Nothing: run **Cache Reset** |
| Cache is empty | The reset is skipped |
| Table without a single integer ID (13 and later) | Removes only the entry keyed by the UUID |

Details and fixes: [Rules and gotchas](./caching-best-practices).

## Caches in a cluster

With several servers, each keeps its own copy, and the server that saved a change tells the others to clear theirs.

![Timeline with four columns: Server A, Database, Hazelcast or Redis, and Server B. Server A saves and commits a record, clears its own cache and sends a reset with the table and the record ID or key. The distributed service delivers it to Server B, which waits a delay of 0 up to Cache.ResetStaggerMaxMs milliseconds and then clears its own cache. Until then Server B can still return the old value. The next get on Server B loads the new row from the database.](/img/docs/plugin-development/cache-cluster.svg)

- Each server has its own cache. Only resets travel between servers.
- iDempiere 14 sends them through Hazelcast (default) or Redis. iDempiere 12 and 13 run the reset on every server and wait.
- Other servers can show the old value for a moment.

## Settings

The administrator can change cache sizes and cluster behavior without code. These are Java system properties, for example in `IDEMPIERE_JAVA_OPTIONS`, read once at startup.

| Property | Default | Effect |
| --- | --- | --- |
| `Cache.MaxSize` | `1000` | Entries per cache, if the code sets no limit |
| `Cache.MaxSize.<cache name>` | none | Entries for one cache, overrides the code. Names are on the server monitor. |
| `Cache.ExpireMinute` | `60` | Minutes without access before an entry expires |
| `Cache.ClusterResetDebounceTables` (14) | none | Tables whose resets to other servers are combined |
| `Cache.ClusterResetDebounceMs` (14) | `1000` | Interval for those combined resets |
| `Cache.ResetStaggerMaxMs` (14) | `500` | Maximum delay before other servers clear. `0` turns it off. |

The server monitor lists caches with size, hits and misses at `/idempiereMonitor?CacheDetails=Yes`.

## Public resources

The source code, tickets and libraries behind this section.

- Source: [`CCache`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/compiere/util/CCache.java), [`CacheMgt`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/compiere/util/CacheMgt.java), [`ImmutablePOCache`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/idempiere/cache/ImmutablePOCache.java), [`CacheTest`](https://github.com/idempiere/idempiere/blob/master/org.idempiere.test/src/org/idempiere/test/performance/CacheTest.java)
- Tickets: [IDEMPIERE-4287](https://idempiere.atlassian.net/browse/IDEMPIERE-4287) immutable objects, [IDEMPIERE-5267](https://idempiere.atlassian.net/browse/IDEMPIERE-5267) size per cache, [IDEMPIERE-6851](https://idempiere.atlassian.net/browse/IDEMPIERE-6851) reset after commit, [IDEMPIERE-6989](https://idempiere.atlassian.net/browse/IDEMPIERE-6989) Redis, [IDEMPIERE-7090](https://idempiere.atlassian.net/browse/IDEMPIERE-7090) cluster resets
- Libraries: [Caffeine](https://github.com/ben-manes/caffeine/wiki), [Hazelcast](https://docs.hazelcast.com/hazelcast/latest/), [Redisson](https://redisson.org/docs/), [caching patterns](https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/caching-patterns.html) (AWS)
