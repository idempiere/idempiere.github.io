---
sidebar_position: 3
sidebar_label: Gotchas
description: Common iDempiere cache problems in plug-ins, from stale values and immutable objects to wrong keys, with the cause and the fix for each.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching gotchas

What you see, why, and the fix. Applies to iDempiere 12 and later.

## Objects and transactions

| You see | Why | Fix |
| --- | --- | --- |
| `IllegalStateException: PO is Immutable` | The object came from a cache. | `getCopy(ctx, id, trxName)` |
| A record you just created is not found | The cache reads without your transaction. | Read with `(ctx, id, trxName)`. |
| `RuntimeException: Error calling copy constructor` | No copy operator was passed, and the copy constructor is missing. | Pass copy operators and add both copy constructors. |
| Memory grows, or `==` is `false` | Each `get` with another `Properties` object returns a new copy, and every session has its own. | Call `get` once. Compare by ID. |

## Stale values

| You see | Why | Fix |
| --- | --- | --- |
| A new record is missing from a cached list | `CCache.newRecord` does nothing. Tables without a single integer ID send no notice at all. | Override `newRecord`. On those tables, schedule a full reset in `afterSave` with `CacheMgt.scheduleCacheReset(Table_Name, -1, false, get_TrxName())`. |
| A record added later is still "not found" | A cached `null` is not cleared by new records. | Do not cache misses. |
| Old value after direct SQL, even after an hour | Only `PO` saves clear caches. Entries that are read often never expire. | `scheduleCacheReset` after the SQL. |
| Old value after another application changed the data | No iDempiere code ran, so nothing reset the cache. | Run **Cache Reset**, or call `DELETE /api/v1/caches?table_name=...` from the integration. |
| Another server returns the old value for a moment | Resets reach other servers after the commit. | Read from the database where it matters. |
| A save on one server does not clear another | That server never loaded the cache class, so it sends no reset. | Load the class when the plug-in starts. |
| Old translations (iDempiere 11 and earlier) | Saving `_Trl` did not clear the translation cache. | Fixed in 12. Use **Cache Reset** before. |

## Keys

| You see | Why | Fix |
| --- | --- | --- |
| Stale values in a cache keyed by tenant ID | `reset(int)` removes only the key equal to the record ID. | Override `reset(int)` to clear everything. A `String` key helps only on tables with an integer ID. |
| Stale values on a table without a single integer ID (iDempiere 13 and later) | The reset carries the UUID, and a `String` key built from other columns is not cleared. | In `afterSave` and `afterDelete`, schedule a full reset after the commit with `CacheMgt.scheduleCacheReset(Table_Name, -1, false, get_TrxName())`. It reaches all servers. |
| Data from another tenant or language | The key leaves out what the value depends on. | Add tenant, organization or language to the key. |
| Values change in other sessions | `CCache` returns the stored list itself. | Store `List.copyOf` with immutable elements, or records. |

## Size and load

| You see | Why | Fix |
| --- | --- | --- |
| Millions of identical queries | Code bypasses the cache, or the cache is too small. | Use `get`. Raise `Cache.MaxSize.<name>`. |
| `Cache.MaxSize.<table>` has no effect | It matches the cache name, not the table name. | Look up the name on the server monitor. |
| Lookup fields refresh during an import | Each save resets the table, and lookups reload. | Suspend resets for the batch. |
| Suspending resets has no effect | The process transaction commits after you resumed. Resets also run on a background thread after each commit, so some can still run after you resume. | Commit your own transaction inside the suspended period, and reset the table once at the end. Suspension reduces resets; it does not guarantee that none run. |
| Changes of other users lost during a batch | Suspension drops all resets of the table on the server. | Keep it short, then reset the table. |
| A busy table slows down the cluster | Every save sends a reset to every server. | Do not cache it, or debounce it (14). |
