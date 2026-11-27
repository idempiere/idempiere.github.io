---
sidebar_position: 5
sidebar_label: Fast cache code
description: Patterns for fast iDempiere cache code in plug-ins, such as preloading small tables, loading many records in one query and caching small value records.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Fast cache code

Patterns that cut database round trips, memory and copies. They extend `MMyCategory` from [Practical examples](./caching-examples). Applies to iDempiere 12 and later, on Java 17 or later.

## In real numbers

Single reports from production servers in the community chat, not benchmarks.

| Measured | Cause | After the fix |
| --- | --- | --- |
| 2 million locator queries in 2 hours (280 per second) | Requests used about 3000 locators, but the cache held 1000 | 44,000 in 2 hours with a limit of 10,000: 98% fewer |
| 4.4 million reference queries in 2 hours | Code that bypassed the cache | Use the cached `get` |
| 1 to 2 million locator queries in 8 to 10 hours | Each product read loaded all locators | Fixed in [IDEMPIERE-5224](https://idempiere.atlassian.net/browse/IDEMPIERE-5224) |

- A query by ID takes under a millisecond. At 280 per second, that is still up to 0.28 seconds of database time every second.
- A cache smaller than the set of records in use costs more than none: every miss also evicts an entry that the next request needs. A few hot records still hit.
- One cache serves all tenants, so size it for the total, for example `-DCache.MaxSize.M_Locator=20000` for 17,612 locators.

## Preload small tables in one query

One query for the whole table instead of one per ID, as `MUOM` does. No size limit, so nothing is evicted.

```java
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

- Only for small tables. It loads the rows of **every tenant** into one cache.
- `synchronized` stops two threads from preloading at once. Every caller waits for the lock.
- An empty table makes every `get` run the full query again.
- `MUOM` adds `setApplyAccessFilter(MRole.SQL_NOTQUALIFIED, MRole.SQL_RO)`. That suits shared data, not tenant data.

## Load many records in one query

One query for all misses, instead of one per `get` in a loop.

```java
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

The `IN` list holds only integers, so no SQL can come in from outside. The IDs must not be `null`.

## Cache small records instead of model objects

A Java `record` is small, immutable and needs no copy. Keyed by the record ID, a save still removes the right entry.

```java
public record CategoryInfo(int id, String value, String name) {
}

private static final CCache<Integer, CategoryInfo> s_info =
    new CCache<>(Table_Name, Table_Name + "|Info", 100, 0, false, 5000);

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

## Compute an expensive value only once

When many threads miss at the same moment, the first computes and the others wait.

```java
private static final CCache<String, BigDecimal> s_prices =
    new CCache<>(Table_Name, Table_Name + "|Price", 100, 60, false, 5000);
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
        price = s_prices.get(key); // it may have finished meanwhile
        if (price == null)
            price = computePrice(clientId, MY_Category_ID); // your expensive code
        s_prices.put(key, price);
        mine.complete(price);
        return price;
    } catch (RuntimeException | Error e) {
        mine.completeExceptionally(e); // never leave waiting threads blocked
        throw e;
    } finally {
        s_loading.remove(key, mine);
    }
}
```

- `computePrice` must not return `null`.
- If it fails, waiting threads get a `CompletionException` from `join()`.
- Do not compute inside `ConcurrentHashMap.computeIfAbsent`. It blocks other keys while the database works.
- A reset during the computation can be overwritten with the old result. Expiry counts from the last access, so a value that is read often can stay old until the next reset. Add the version check from the [list example](./caching-examples#cache-a-list-per-tenant) where that matters.

## Keep the hot path short

- Every server thread has its own context, so other threads get a new copy of a cached PO on every `get`. For code that many threads read, cache records or primitives.
- Call `get` once before a loop.
- Measure hits and misses on `/idempiereMonitor?CacheDetails=Yes`, before and after.
