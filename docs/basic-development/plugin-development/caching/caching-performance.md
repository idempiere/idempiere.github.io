---
sidebar_position: 5
sidebar_label: Fast cache code
description: Patterns for fast iDempiere cache code in plug-ins, such as preloading small tables, loading many records in one query and caching small value records.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Fast cache code

A cache saves time only when the code around it is fast too. These patterns cut database round trips, memory and object copies. They build on the `MMyCategory` class from [Caching examples](./caching-examples). Read [How caching works](./caching-overview) first. Applies to iDempiere 12 and later, which run on Java 17 or later.

## In real numbers

These figures were measured on production servers and reported in the iDempiere community chat. They are single reports, not benchmarks, but they show why the patterns on this page matter.

| What was measured | Figures | Cause | Result after the fix |
| --- | --- | --- | --- |
| Locator queries on one server | About 2 million in 2 hours, around 280 per second | About 3000 locators, but the locator cache held 1000 entries. Every lookup pushed out an entry that the next lookup needed. | About 44,000 in 2 hours after raising the limit to 10,000, around 6 per second. That is 98% fewer queries. |
| Reference queries on the same server | 4.4 million in 2 hours | Code that read references without the existing cache | The remedy is to find that code and use the cached `get` |
| REST requests from a warehouse app | 1 to 2 million locator queries in 8 to 10 hours | Every product read loaded all 6000 locators of the tenant, 17,612 in the database, into a cache of 10,000 | Fixed in core, [IDEMPIERE-5224](https://idempiere.atlassian.net/browse/IDEMPIERE-5224) |
| REST requests from a web shop | 504,000 reference list queries and 180,000 language queries in 12 hours, around 12 and 4 per second | Reads that did not use a cache | The remedy is to find that code and use the cached `get` |

How to read such figures:

- **Each query is cheap, the volume is not.** A simple query by ID takes less than a millisecond. At 280 queries per second, that is still up to 0.28 seconds of database time in every second, plus a network round trip and a connection from the pool each time.
- **A cache that is too small costs more than no cache.** In the locator case, the cache missed almost every time, and every miss also evicted an entry. The fix was the size, not the code.
- **Size for the data, not for the default.** One cache serves all tenants of a server, so the limit must cover the total. With 17,612 locators in the database, a limit of `-DCache.MaxSize.M_Locator=20000` keeps all of them. The property exists since iDempiere 10. Check the result on the server monitor: the misses should stop growing once the cache is warm.

## Preload small tables in one query

For a small table that is read all the time, load every row with one query the first time the cache is empty, instead of one query per ID. Core does this in `MUOM`. Give the cache no size limit, so that the preloaded rows are not evicted again.

```java
/** No size limit and no expiry: the whole table is kept */
private static final ImmutableIntPOCache<Integer, MMyCategory> s_cache =
    new ImmutableIntPOCache<>(Table_Name, Table_Name, 100, 0, false, 0);

public static synchronized MMyCategory get(Properties ctx, int MY_Category_ID) {
    if (s_cache.isEmpty())
        loadAll();
    MMyCategory category = s_cache.get(ctx, MY_Category_ID, e -> new MMyCategory(ctx, e));
    if (category != null)
        return category;
    // Not preloaded, for example inactive or created after the preload
    category = new MMyCategory(ctx, MY_Category_ID, (String) null);
    if (category.get_ID() == MY_Category_ID) {
        s_cache.put(MY_Category_ID, category, e -> new MMyCategory(Env.getCtx(), e));
        return category;
    }
    return null;
}

private static void loadAll() {
    List<MMyCategory> all = new Query(Env.getCtx(), Table_Name, "IsActive='Y'", null).list();
    for (MMyCategory category : all)
        s_cache.put(category.get_ID(), category, e -> new MMyCategory(Env.getCtx(), e));
}
```

- `synchronized` keeps two threads from preloading at the same time. `MUOM.get` does the same. Use it only when `get` is cheap after the preload, because every caller waits for the lock.
- A full reset empties the cache, and the next `get` preloads again. A save of one record only removes that entry, and the next `get` for it loads just that row.
- Use this only for tables with a limited number of rows, such as types, categories or settings. Never for products or business partners.
- The query loads the active rows of **every tenant** into one cache. The total over all tenants must be small. `MUOM` also calls `setApplyAccessFilter(MRole.SQL_NOTQUALIFIED, MRole.SQL_RO)`, so that the role of the first caller decides what is loaded. That suits shared data such as units of measure, but not tenant data: rows the first caller cannot see are then loaded one by one later.
- The table must have at least one active row. If it has none, the cache stays empty and every `get` runs the full query again.
- Like the examples, this needs a [model factory](../plugin-modelfactory) for `MY_Category`, because `Query.list()` creates the objects through it.

## Load many records in one query

Code that needs many records, such as the categories of all lines of a document, often calls `get` in a loop. Every miss is one query. Collect the misses and load them with one query instead.

```java
/** Gets many categories with one query for all cache misses */
public static Map<Integer, MMyCategory> getAll(Properties ctx, Collection<Integer> ids) {
    Map<Integer, MMyCategory> result = new HashMap<>(ids.size() * 2);
    List<Integer> missing = new ArrayList<>();
    for (Integer id : ids) {
        MMyCategory category = s_cache.get(ctx, id, e -> new MMyCategory(ctx, e));
        if (category != null)
            result.put(id, category);
        else
            missing.add(id);
    }
    // Oracle allows at most 1000 values in an IN list
    for (int from = 0; from < missing.size(); from += 1000) {
        List<Integer> chunk = missing.subList(from, Math.min(from + 1000, missing.size()));
        String in = chunk.stream().map(String::valueOf).collect(Collectors.joining(","));
        List<MMyCategory> loaded =
            new Query(ctx, Table_Name, "MY_Category_ID IN (" + in + ")", null).list();
        for (MMyCategory category : loaded) {
            // put marks the object immutable, so it can be returned as it is
            s_cache.put(category.get_ID(), category, e -> new MMyCategory(Env.getCtx(), e));
            result.put(category.get_ID(), category);
        }
    }
    return result;
}
```

The `IN` list is built from `Integer` values only, so it cannot carry SQL from outside. Add `java.util.ArrayList`, `Collection`, `HashMap`, `List`, `Map` and `java.util.stream.Collectors` to the imports.

## Cache small value records instead of model objects

A model object holds every column, the old and new values and its context. When callers only need a few columns, cache a Java `record` instead. A record is small, cannot be changed and needs no copy constructor. The cache is still keyed by the record ID and has the table name, so a save removes the right entry.

```java
/** The columns that callers need, as an immutable value */
public record CategoryInfo(int id, String value, String name) {
}

private static final CCache<Integer, CategoryInfo> s_info =
    new CCache<>(Table_Name, Table_Name + "|Info", 100, 0, false, 5000);

/** Value and name of a category, or null when it does not exist */
public static CategoryInfo getInfo(int MY_Category_ID) {
    CategoryInfo info = s_info.get(MY_Category_ID);
    if (info != null)
        return info;
    String sql = "SELECT Value, Name FROM MY_Category WHERE MY_Category_ID=?";
    try (PreparedStatement pstmt = DB.prepareStatement(sql, null)) {
        pstmt.setInt(1, MY_Category_ID);
        try (ResultSet rs = pstmt.executeQuery()) {
            if (rs.next()) {
                info = new CategoryInfo(MY_Category_ID, rs.getString(1), rs.getString(2));
                s_info.put(MY_Category_ID, info);
            }
        }
    } catch (SQLException e) {
        throw new DBException(e, sql);
    }
    return info;
}
```

Add `java.sql.PreparedStatement`, `java.sql.ResultSet`, `java.sql.SQLException`, `org.adempiere.exceptions.DBException`, `org.compiere.util.CCache` and `org.compiere.util.DB` to the imports. This cache needs no `ctx`, because the record does not hold one.

## Compute an expensive value only once

When a value takes long to compute, such as a price that needs several queries, many threads can miss the cache at the same moment and all compute it. Let the first thread compute it and the others wait for its result.

```java
private static final CCache<String, BigDecimal> s_prices =
    new CCache<>(Table_Name, Table_Name + "|Price", 100, 60, false, 5000);

/** Keys that are being computed right now, with the result the other threads wait for */
private static final ConcurrentHashMap<String, CompletableFuture<BigDecimal>> s_loading =
    new ConcurrentHashMap<>();

public static BigDecimal getPrice(int clientId, int MY_Category_ID) {
    String key = clientId + "|" + MY_Category_ID;
    BigDecimal price = s_prices.get(key);
    if (price != null)
        return price;
    CompletableFuture<BigDecimal> mine = new CompletableFuture<>();
    CompletableFuture<BigDecimal> running = s_loading.putIfAbsent(key, mine);
    if (running != null)
        return running.join(); // another thread is computing it
    try {
        // Another thread may have finished between the first get and putIfAbsent
        price = s_prices.get(key);
        if (price == null)
            price = computePrice(clientId, MY_Category_ID); // your expensive code
        s_prices.put(key, price);
        mine.complete(price);
        return price;
    } catch (RuntimeException e) {
        mine.completeExceptionally(e);
        throw e;
    } finally {
        s_loading.remove(key, mine);
    }
}
```

- Threads that arrive while the first one computes wait for its result. The second `get` after `putIfAbsent` covers a thread that arrives just after the first one finished.
- If `computePrice` fails, the waiting threads get a `CompletionException` from `join()`, with the original exception as its cause.
- `computePrice` must not return `null`, because `CCache.get` returns `null` for a cached miss too.
- Do not compute inside `computeIfAbsent` of a `ConcurrentHashMap`. It blocks other keys in the same part of the map while the database works.
- If the cache is reset while a thread computes, that thread can still put the old result. It stays until the next save of a `MY_Category` record clears the cache, or until nobody reads it for 60 minutes. Use this pattern only where a short-lived old value does no harm.

Add `java.math.BigDecimal`, `java.util.concurrent.CompletableFuture` and `java.util.concurrent.ConcurrentHashMap` to the imports.

## Keep the hot path short

- **Cache small values for code that many threads read.** `ImmutablePOCache.get` returns the shared object only when the context you pass is the one the object holds, which is the context of the thread that loaded it. Every server thread, such as a web UI session or a REST request, has its own context, so other threads get a new copy on every call. A record or a primitive value needs no copy.
- **Hold the reference.** Call `get` once before a loop, not in every iteration.
- **Read only what you need.** If a caller needs one column of a large record, cache that value, not the model object.
- **Measure.** Check hits and misses on `/idempiereMonitor?CacheDetails=Yes` before and after a change, and compare the number of queries in `pg_stat_statements`.

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).
