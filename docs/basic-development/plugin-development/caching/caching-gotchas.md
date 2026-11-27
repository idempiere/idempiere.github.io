---
sidebar_position: 3
sidebar_label: Gotchas
description: Common iDempiere cache problems in plug-ins, from stale values and immutable objects to wrong keys, with the cause and the fix for each.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching gotchas

Each entry starts with what you see, then explains why it happens and what to do. Most of them come from questions in the iDempiere community chat and were checked against the source. Read [How caching works](./caching-overview) first. Applies to iDempiere 12 and later.

## Objects and transactions

### "PO is Immutable" when you save

**What you see:** `IllegalStateException: PO is Immutable: org.compiere.model.MCharge` when you call a setter or `saveEx()`.

**Why:** The object came from a cache, for example `MCharge.get(ctx, id)`. Cached objects are marked immutable so that threads cannot change an object that other threads are reading.

**Fix:** Load a writable copy with `MCharge.getCopy(ctx, id, trxName)`, or with the `(ctx, id, trxName)` constructor when the class has no `getCopy`.

### A record you just created is not found

**What you see:** In a process, you create a record and then `MMyCategory.get(id)` returns `null`, or returns the values from before your change.

**Why:** The cache reads without a transaction, so it cannot see data that your transaction has not committed yet. The cache is cleared only after the commit.

**Fix:** Inside the transaction, read with the `(ctx, id, trxName)` constructor. The same applies to 2Pack and migration code, where a column can reference a table created in the same package.

### "No copy constructor" at runtime

**What you see:** `RuntimeException: Error calling copy constructor for com.example.model.MMyCategory`, caused by a `NoSuchMethodException`.

**Why:** `ImmutablePOCache` makes a copy when the object was loaded with another context or a transaction. Without a copy operator, it looks for the constructors `(Properties, MMyCategory)` and `(Properties, MMyCategory, String)` by reflection.

**Fix:** Pass a copy operator to `get` and `put`, as in the [model class example](./caching-examples#cache-model-objects-by-id). Then the cache does not need reflection. Add the copy constructors anyway, because other code calls them.

### Every call returns a new object

**What you see:** `get` is called in a loop and memory use goes up, or `==` between two results is `false`.

**Why:** When the context you pass is not the context the cached object was loaded with, `ImmutablePOCache.get` returns a new copy on every call.

**Fix:** Call `get` once and keep the reference while you need it. Compare records by ID, never with `==`.

## Stale values

### A new record does not show up

**What you see:** A cached list, such as "all active categories", does not include a record that was just created. After **Cache Reset** it does.

**Why:** Saving a new record calls `newRecord` on the caches of that table, and `CCache.newRecord` does nothing. Only changes and deletes clear entries.

**Fix:** Override `newRecord` in the cache that holds the list, as in the [list example](./caching-examples#cache-a-list-per-tenant), or do not cache lists.

### A record added later is still "not found"

**What you see:** A lookup by search key returned nothing once. Someone then creates a record with that key, but the lookup still returns nothing.

**Why:** `put(key, null)` stores a miss in a set that has no size limit and never expires. When the record is created, the cache only gets a `newRecord` call, which does not remove the stored miss.

**Fix:** Do not put `null` in a cache unless the cache is cleared completely on every insert. Core model classes put a value only when the record exists.

### The value never changes after a direct SQL update

**What you see:** You changed rows with `DB.executeUpdateEx`, a database trigger or another application. The old value stays, even after an hour.

**Why:** Only saves through `PO` clear caches. Entries expire after a time without access (`expireAfterAccess`), so an entry that is read often never expires.

**Fix:** Schedule the reset yourself, see [Clear the cache after direct SQL](./caching-best-practices#clear-the-cache-after-direct-sql).

### Another server returns the old value for a moment

**What you see:** Behind a load balancer, a client saves a record on one server and reads it on another, and gets the old value.

**Why:** The reset runs after the commit on a background thread, and reaches the other servers through a message. Until the message is applied, they serve the old value. See the [cluster diagram](./caching-overview#caches-in-a-cluster).

**Fix:** Read from the database where the latest value matters. For REST clients, see [Caching and the REST API](./caching-rest-api).

### Changing a translation does not change what users see

**What you see:** A translated name stays old after you change the `_Trl` record.

**Why:** iDempiere 11 and earlier did not clear the translation cache when a `_Trl` record was saved.

**Fix:** iDempiere 12 and later clear the matching translation cache entries when a `_Trl` record is saved. On older releases, run **Cache Reset** after changing translations.

## Keys

### Saving one record clears the wrong entry

**What you see:** A cache keyed by tenant ID or by another integer that is not the record ID keeps stale values, and sometimes loses an unrelated entry.

**Why:** When a record is saved, `CCache.reset(int recordId)` removes the entry whose key equals the record ID, and leaves everything else. It assumes that integer keys are record IDs of the cache's table.

**Fix:** Use integer keys only for the record ID of the table. For other keys, use a `String` key, or override `reset(int)` to clear the whole cache, as in the [list example](./caching-examples#cache-a-list-per-tenant).

### Data from another tenant or language

**What you see:** A user sees a value that belongs to another tenant, organization or language.

**Why:** The cache key leaves out something the value depends on. A cache is shared by every user and tenant on the server.

**Fix:** Put everything the value depends on into the key. `MSysConfig`, for example, uses tenant, organization and name: `AD_Client_ID + "_" + AD_Org_ID + "_" + Name`.

### Changing a cached list breaks other users

**What you see:** Values appear or disappear in other sessions after your code changed a list or map it got from a cache.

**Why:** `CCache` returns the stored object itself, not a copy. Only the PO caches protect their objects.

**Fix:** Store values that cannot be changed, for example with `List.copyOf` or `Map.copyOf`.

## Size and load

### Millions of identical queries although there is a cache

**What you see:** `pg_stat_statements` shows a simple `SELECT ... WHERE X_ID=$1` running millions of times.

**Why:** Usually one of two things. Code creates objects with `new MXxx(ctx, id, trxName)` instead of the cached `get`. Or the cache is smaller than the set of records in use, so entries keep pushing each other out. With 3000 locators and a limit of 1000 entries, every lookup misses.

**Fix:** Use the cached `get`. Check hits and misses on `/idempiereMonitor?CacheDetails=Yes` and raise the limit with `-DCache.MaxSize.<cache name>`.

### `Cache.MaxSize.<table>` has no effect

**What you see:** You set `-DCache.MaxSize.AD_Field=20000`, but the monitor still shows the old limit.

**Why:** The property matches the cache name, not the table name. Many caches use the table name as their name, but not all. For example, the cache of field definitions on `AD_Field` is named `GridFieldVO Cache`.

**Fix:** Look up the cache name on the server monitor and use that.

### Lookup fields keep refreshing during an import

**What you see:** While a process saves thousands of records, open windows refresh their lookup fields again and again, and the server slows down.

**Why:** Every save clears the caches of the table. Table Direct fields listen to these resets and reload their lists. Since iDempiere 12 they combine requests that arrive within half a second, but a long batch still triggers many reloads.

**Fix:** Suspend the resets for the table during the batch, see [Suspend resets during batch jobs](./caching-best-practices#suspend-resets-during-batch-jobs).

### Changes from other threads are lost during a batch

**What you see:** While your batch job runs with suspended resets, users change records of the same table, and the servers keep the old values until the table is reset.

**Why:** `suspendTableCacheReset` applies to the whole server, not only to your thread. Resets that run while it is active are dropped, not queued.

**Fix:** Keep the suspended period short, always resume in a `finally` block, and reset the whole table after resuming.

### Suspending resets has no effect

**What you see:** You suspended resets around a batch in a process, but lookup fields still refresh and other servers still get one reset per record.

**Why:** Resets run after the commit, on a background thread. The process transaction commits only after `doIt` returns, when you have already resumed.

**Fix:** Commit your own transaction inside the suspended period, as in [Suspend resets during batch jobs](./caching-best-practices#suspend-resets-during-batch-jobs).

### A save on one server does not clear the cache on another

**What you see:** In a cluster, a record changed on server A stays old on server B until the entry expires.

**Why:** A server only sends resets for tables that have a cache registered on that server. Server A never used the class that owns the cache, so the cache does not exist there and no reset is sent.

**Fix:** Load the class on every server, for example by using it when your plug-in starts.

### A busy table slows down the whole cluster

**What you see:** Cluster messaging or Redis load goes up when one table gets many writes.

**Why:** When a cache exists for the table, every save sends a reset to every server.

**Fix:** Do not define a cache for a table with heavy write traffic. Since iDempiere 14, list it in `Cache.ClusterResetDebounceTables`. See [Cluster settings](./caching-settings#cluster-settings).

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).
