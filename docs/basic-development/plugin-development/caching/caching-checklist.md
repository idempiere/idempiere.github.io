---
sidebar_position: 6
sidebar_label: Development checklist
description: A checklist for each step of adding a cache to an iDempiere plug-in, from design and code to tests, review, deployment and operation.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching development checklist

Use this checklist when you add or change a cache in a plug-in. It follows the steps of the work, from the first measurement to running the server. Each item links to the page that explains it. Applies to iDempiere 12 and later.

## Before you write code

- [ ] Measure first. Find the queries that run most often in `pg_stat_statements`, and check the hits and misses on `/idempiereMonitor?CacheDetails=Yes`.
- [ ] Check whether core already caches the data, and whether your code just bypasses it. See [Use the cache that already exists](./caching-best-practices#use-the-cache-that-already-exists).
- [ ] Decide which kind of cache you need. A slow query needs a better query or a summary table, not a cache. See [Choose the kind of cache first](./caching-overview#choose-the-kind-of-cache-first).
- [ ] Estimate the number of entries per tenant and in total. This decides the size limit.
- [ ] Decide how old a value may be. Within one server a value is cleared shortly after the commit. Across servers it can be old for longer. If no delay is acceptable, read from the database.
- [ ] List everything the value depends on: tenant, organization, language, role, date. All of it goes into the key.
- [ ] List every way the data can change: saves through `PO`, direct SQL, imports, migration scripts, other applications. Each one needs a way to clear the cache.

## Write the code

- [ ] Use the right class: `ImmutableIntPOCache` for model objects by ID, `ImmutablePOCache` for model objects by `String` key, `CCache` for other values. See [How it works](./caching-overview#how-it-works).
- [ ] Give the cache the table name of its data, or a name of its own that an event handler clears. See [Give the cache the real table name](./caching-best-practices#give-the-cache-the-real-table-name).
- [ ] Use the record ID as the key where you can. A `String` key is cleared as a whole on every save. For an integer key that is not the record ID, override `reset(int)`. See [Saving one record clears the wrong entry](./caching-gotchas#saving-one-record-clears-the-wrong-entry).
- [ ] For a cached list, override `newRecord`. See [Cache a list per tenant](./caching-examples#cache-a-list-per-tenant).
- [ ] For model classes, add the copy constructors and `markImmutable`, and pass copy operators to `get` and `put`. See [Cache model objects by ID](./caching-examples#cache-model-objects-by-id).
- [ ] Do not put `null` in a cache unless new records clear it.
- [ ] Store only values that cannot be changed, such as immutable model objects, records or `List.copyOf`.
- [ ] Set a size limit that fits your estimate, or no limit for small, fixed data.
- [ ] Read with the transaction, not from the cache, wherever the code has just written the data.
- [ ] Clear the cache after direct SQL with `CacheMgt.scheduleCacheReset`. See [Clear the cache after direct SQL](./caching-best-practices#clear-the-cache-after-direct-sql).
- [ ] Load the class that owns the cache when the plug-in starts, so that every server sends resets for it.
- [ ] Load many records with one query, and compute expensive values once. See [Fast cache code](./caching-performance).

## Test

Write integration tests on `AbstractTestCase` in the GardenWorld demo Tenant. See [Testing plug-ins](/docs/basic-development/testing/testing-plugins).

- [ ] A second `get` is a hit. Core's `CacheTest` compares `getHit()` and `getMiss()` of the cache before and after a call.
- [ ] After a change and a commit, `get` returns the new value. `AbstractTestCase` rolls the test transaction back at the end, and no reset runs without a commit, so call `commit()` in the test and delete the data you committed afterwards. The reset runs on a background thread after the commit, so wait before you check. Core's `CacheTest` waits 500 milliseconds.
- [ ] After a rollback, the cache still holds the old value.
- [ ] A new record shows up in cached lists. Commit and wait here too. Core's `CacheTest` counts the `newRecord` calls with a test cache that overrides `newRecord`.
- [ ] A user of another tenant, organization or language never gets your cached value.
- [ ] Code that changes a value it got from the cache fails with "PO is Immutable", and your code does not do that.

## Review

- [ ] Every cache has a table name that saves really clear, or an event handler that clears it.
- [ ] Every key holds everything the value depends on.
- [ ] No setter or `save` is called on an object from a cache.
- [ ] No unbounded cache holds data that grows with the business.
- [ ] Direct SQL, imports and batch jobs clear the cache afterwards.
- [ ] Suspended resets are resumed in a `finally` block, and the batch commits inside the suspended period.

## Deploy

- [ ] All servers of a cluster run the same version of the plug-in, so that they all have the same caches.
- [ ] Size limits are set with `-DCache.MaxSize.<cache name>` where the default does not fit. See [Caching settings](./caching-settings).
- [ ] On iDempiere 14, tables with heavy write traffic are listed in `Cache.ClusterResetDebounceTables` if they have a cache.
- [ ] After migration scripts or other SQL that changes cached data, run **Cache Reset** or restart the servers.
- [ ] The Hazelcast or Redis setup is checked. See [Distributed Cache](/docs/new-features/v1.0/distributed-cache) and [Redis as Distributed Cache Backend](/docs/new-features/v14/redis-distributed-cache).

## Run and monitor

- [ ] Check the hits, misses and size of your caches on the server monitor after go-live. A full cache with many misses is too small.
- [ ] Watch the Java heap. Caches without a size limit grow with the data.
- [ ] Watch `pg_stat_statements` for queries that run millions of times.
- [ ] When users report old values, check first whether the data was changed without `PO`, then whether the key is complete.

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).
