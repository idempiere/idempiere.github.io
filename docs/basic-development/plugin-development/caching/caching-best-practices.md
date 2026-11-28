---
sidebar_position: 3
sidebar_label: Rules and gotchas
description: Rules for using iDempiere caches in plug-ins, the common problems with their causes and fixes, and a short checklist.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-28
---
# Caching rules and gotchas

Applies to iDempiere 12 and later. Code for the rules is on [Examples](./caching-examples).

## Rules

Follow these when you write cache code. Each one prevents a gotcha below.

| Rule | Why |
| --- | --- |
| Use `MCharge.get(ctx, id)`, not `new MCharge(ctx, id, trxName)` | The constructor always queries the database |
| Change records through `getCopy(ctx, id, trxName)` | Cached objects are shared and read-only |
| In your own transaction, read with `(ctx, id, trxName)` | The cache cannot see uncommitted data, also in 2Pack |
| Give the cache the table name of its data | Saves clear caches by table name |
| Key by the record ID | Other keys are cleared completely, or not at all |
| Put tenant, organization and language into the key | One cache serves all users |
| Do not cache "not found" | New records do not clear it |
| Store only values that cannot change | `CCache` returns the stored object itself |
| After SQL, call `CacheMgt.scheduleCacheReset` | Only `PO` saves clear caches |
| Size the cache for the data | A small cache evicts and reloads |
| Load the cache class when the plug-in starts | A server sends resets only for caches it has |
| Do not cache tables with heavy writes | Every save sends a reset to every server |

## Gotchas

What goes wrong in practice, why, and how to fix it. Start from what you see.

| You see | Why | Fix |
| --- | --- | --- |
| `PO is Immutable` | The object came from a cache | Use `getCopy` |
| A new record is not found | The cache reads without your transaction | Read with `(ctx, id, trxName)` |
| A new record is missing from a cached list | `newRecord` does nothing by default | Override `newRecord` |
| A later record is still "not found" | A cached `null` stays | Do not cache misses |
| Old value after SQL, even after an hour | Often-read entries never expire | `scheduleCacheReset` after the SQL |
| Old value on another server for a moment | Resets reach other servers later | Read from the database where it matters |
| A save does not clear another server | That server never loaded the cache class | Load it at plug-in start |
| Stale values, key is a tenant ID | `reset(int)` removes only the key equal to the record ID | Override `reset(int)` |
| Stale values on a table without a single integer ID (13 and later) | The reset carries the UUID | Schedule `CacheMgt.scheduleCacheReset(Table_Name, -1, false, get_TrxName())` in `afterSave` and `afterDelete` |
| Old list after a reload | The cache was empty, so the reset was skipped | See the [list example](./caching-examples#cache-a-list-per-tenant) |
| Another tenant's data | The key misses tenant, organization or language | Complete the key |
| `Cache.MaxSize.<table>` does nothing | It needs the cache name | Look it up on the server monitor |
| Lookups reload during an import | Every save resets the table | Suspend resets, see [batch example](./caching-examples#change-many-records-in-a-batch) |
| Millions of identical queries | Cache bypassed or too small | Use `get`, raise `Cache.MaxSize.<name>` |

## Checklist

Check these before you add a cache and after it goes live.

- [ ] Measured first: the query runs often in `pg_stat_statements`.
- [ ] Core does not cache it already.
- [ ] Every way the data changes clears the cache: saves, SQL, imports, other applications.
- [ ] Tested on `AbstractTestCase`: a second `get` is a hit; after `commit()` and a short wait, `get` returns the new value. See [Testing plug-ins](/docs/basic-development/testing/testing-plugins).
- [ ] After go-live: hits, misses and heap watched on the server monitor.
