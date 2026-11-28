---
sidebar_position: 4
sidebar_label: Examples
description: Copyable examples of iDempiere caches in plug-ins, from a cached model class and tenant-aware lookups to fast loading and batch changes.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-28
---
# Caching examples

The examples use a custom table `MY_Category` with an integer ID, `Value` and `Name`. `Query` returns `MMyCategory` only with a [model factory](../plugin-modelfactory). Applies to iDempiere 12 and later, on Java 17 or later.

## Cache model objects by ID

The pattern of core's `MCharge`. `X_MY_Category` is the generated class.

<details>
<summary>Show code: MMyCategory.java</summary>

```java title="src/com/example/model/MMyCategory.java"
package com.example.model;

import java.sql.ResultSet;
import java.util.Properties;

import org.compiere.util.Env;
import org.compiere.util.Util;
import org.idempiere.cache.ImmutableIntPOCache;
import org.idempiere.cache.ImmutablePOSupport;

public class MMyCategory extends X_MY_Category implements ImmutablePOSupport {

    private static final long serialVersionUID = 1L;

    /** Cache by ID. The table name makes saves of MY_Category clear it. */
    private static final ImmutableIntPOCache<Integer, MMyCategory> s_cache =
        new ImmutableIntPOCache<>(Table_Name, 20);

    /** Get from the cache (immutable) */
    public static MMyCategory get(int MY_Category_ID) {
        return get(Env.getCtx(), MY_Category_ID);
    }

    /** Get from the cache (immutable) */
    public static MMyCategory get(Properties ctx, int MY_Category_ID) {
        if (MY_Category_ID <= 0)
            return null; // ID 0 would create and cache a new, unsaved record
        MMyCategory category = s_cache.get(ctx, MY_Category_ID, e -> new MMyCategory(ctx, e));
        if (category != null)
            return category;
        category = new MMyCategory(ctx, MY_Category_ID, (String) null);
        if (category.get_ID() == MY_Category_ID) {
            s_cache.put(MY_Category_ID, category, e -> new MMyCategory(Env.getCtx(), e));
            return category;
        }
        return null;
    }

    /** Get a writable copy in a transaction */
    public static MMyCategory getCopy(Properties ctx, int MY_Category_ID, String trxName) {
        MMyCategory category = get(MY_Category_ID);
        return category != null ? new MMyCategory(ctx, category, trxName) : null;
    }

    public MMyCategory(Properties ctx, int MY_Category_ID, String trxName) {
        super(ctx, MY_Category_ID, trxName);
    }

    public MMyCategory(Properties ctx, String MY_Category_UU, String trxName) {
        super(ctx, MY_Category_UU, trxName);
        if (Util.isEmpty(MY_Category_UU))
            setIsActive(true); // set your defaults for a new record here
    }

    public MMyCategory(Properties ctx, ResultSet rs, String trxName) {
        super(ctx, rs, trxName);
    }

    /** Copy constructors, used by the cache */
    public MMyCategory(Properties ctx, MMyCategory copy) {
        this(ctx, copy, (String) null);
    }

    public MMyCategory(Properties ctx, MMyCategory copy, String trxName) {
        this(ctx, 0, trxName);
        copyPO(copy);
    }

    @Override
    public MMyCategory markImmutable() {
        if (is_Immutable())
            return this;
        makeImmutable();
        return this;
    }
}
```

</details>

- The copy constructors and `markImmutable` are required.
- Copy child objects, such as lines, in the copy constructor.

## Look up a record by search key

The key holds the tenant, because one cache serves all tenants.

<details>
<summary>Show code</summary>

```java
/** Cache by tenant and search key. Every save of MY_Category clears it. */
private static final ImmutablePOCache<String, MMyCategory> s_cacheByValue =
    new ImmutablePOCache<>(Table_Name, Table_Name + "|Value", 20, 0, false, 0);

public static MMyCategory getByValue(Properties ctx, String value) {
    int clientId = Env.getAD_Client_ID(ctx);
    String key = clientId + "|" + value;
    MMyCategory category = s_cacheByValue.get(ctx, key, e -> new MMyCategory(ctx, e));
    if (category != null)
        return category;
    category = new Query(ctx, Table_Name, "AD_Client_ID=? AND Value=?", null)
        .setParameters(clientId, value)
        .setOnlyActiveRecords(true)
        .first();
    // Do not cache a miss: creating the record later would not remove it.
    if (category != null)
        s_cacheByValue.put(key, category, e -> new MMyCategory(Env.getCtx(), e));
    return category;
}
```

</details>

- Only for small tables: the cache has no size limit.
- A query just before a save can put the old row back. Where that matters, use the version check of the next example.

## Cache a list per tenant

A list needs three overrides: `reset(int)`, because the key is a tenant ID; `newRecord`, because a new record changes the list; and `size()`, because `CacheMgt` skips empty caches. The version check stops a query that started before a reset from storing the old list.

<details>
<summary>Show code</summary>

```java
private static final Object s_activeIdsLock = new Object();
private static int s_activeIdsVersion;
private static final AtomicInteger s_activeIdsLoading = new AtomicInteger();

private static final CCache<Integer, List<Integer>> s_activeIds =
    new CCache<>(Table_Name, Table_Name + "|ActiveIDs", 5, 0, false, 0) {
        private static final long serialVersionUID = 1L;

        @Override
        public int reset() {
            synchronized (s_activeIdsLock) {
                s_activeIdsVersion++; // loads started before this reset are discarded
                return super.reset();
            }
        }

        @Override
        public int reset(int recordId) {
            return reset(); // the key is a tenant ID, not a record ID
        }

        @Override
        public void newRecord(int record_ID) {
            reset(); // a new record changes the list
        }

        @Override
        public int size() {
            int size = super.size();
            // CacheMgt resets only caches with entries: stay visible while a query runs
            return size == 0 && s_activeIdsLoading.get() > 0 ? 1 : size;
        }
    };

public static List<Integer> getActiveIds(Properties ctx) {
    int clientId = Env.getAD_Client_ID(ctx);
    List<Integer> ids = s_activeIds.get(clientId);
    if (ids != null)
        return ids;
    s_activeIdsLoading.incrementAndGet(); // before the version is read
    try {
        int version;
        synchronized (s_activeIdsLock) {
            version = s_activeIdsVersion;
        }
        int[] found = new Query(ctx, Table_Name, "AD_Client_ID=?", null)
            .setParameters(clientId)
            .setOnlyActiveRecords(true)
            .setOrderBy("Name")
            .getIDs();
        ids = Arrays.stream(found).boxed().toList(); // unmodifiable: callers share it
        synchronized (s_activeIdsLock) {
            if (version == s_activeIdsVersion) // no reset since the query started
                s_activeIds.put(clientId, ids);
        }
        return ids;
    } finally {
        s_activeIdsLoading.decrementAndGet();
    }
}
```

</details>

- Imports: `java.util.Arrays`, `java.util.List`, `java.util.concurrent.atomic.AtomicInteger`.

## Cache a value from several tables

The sales price list of a Business Partner Group depends on `C_BP_Group` and `M_PriceList`. Its name is not a table, so an event handler clears it on new, changed and deleted records of both tables.

<details>
<summary>Show code: BPGroupPriceListCache.java</summary>

```java title="src/com/example/cache/BPGroupPriceListCache.java"
package com.example.cache;

import java.util.Properties;

import org.compiere.util.CCache;
import org.compiere.util.DB;
import org.compiere.util.Env;

public final class BPGroupPriceListCache {

    /** Not a table name: only BPGroupPriceListCacheHandler clears this cache */
    public static final String CACHE_NAME = "MY_BPGroupPriceList";

    private static final CCache<String, Integer> s_cache =
        new CCache<>(CACHE_NAME, CACHE_NAME, 50, 0, false, 0);

    private BPGroupPriceListCache() {
    }

    /** Loads the class, which registers the cache on this server */
    public static void init() {
    }

    /** Sales price list of the group, or -1 when there is none */
    public static int getPriceListId(Properties ctx, int C_BP_Group_ID) {
        int clientId = Env.getAD_Client_ID(ctx);
        String key = clientId + "|" + C_BP_Group_ID;
        Integer id = s_cache.get(key);
        if (id != null)
            return id;
        id = DB.getSQLValueEx(null,
            "SELECT COALESCE("
            + "(SELECT pl.M_PriceList_ID FROM C_BP_Group g"
            + " JOIN M_PriceList pl ON pl.M_PriceList_ID=g.M_PriceList_ID"
            + " WHERE g.C_BP_Group_ID=? AND pl.IsActive='Y'),"
            + "(SELECT MIN(M_PriceList_ID) FROM M_PriceList"
            + " WHERE AD_Client_ID=? AND IsDefault='Y' AND IsSOPriceList='Y' AND IsActive='Y'),"
            + "-1) FROM DUAL",
            C_BP_Group_ID, clientId);
        // -1 is cached too: the handler clears the cache when a price list is created
        s_cache.put(key, id);
        return id;
    }
}
```

</details>

<details>
<summary>Show code: BPGroupPriceListCacheHandler.java</summary>

```java title="src/com/example/event/BPGroupPriceListCacheHandler.java"
package com.example.event;

import org.adempiere.base.event.AbstractEventHandler;
import org.adempiere.base.event.IEventTopics;
import org.compiere.model.MBPGroup;
import org.compiere.model.MPriceList;
import org.compiere.model.PO;
import org.compiere.util.CacheMgt;
import org.osgi.service.event.Event;

import com.example.cache.BPGroupPriceListCache;

public class BPGroupPriceListCacheHandler extends AbstractEventHandler {

    @Override
    protected void initialize() {
        BPGroupPriceListCache.init();
        for (String table : new String[] {MBPGroup.Table_Name, MPriceList.Table_Name}) {
            registerTableEvent(IEventTopics.PO_AFTER_NEW, table);
            registerTableEvent(IEventTopics.PO_AFTER_CHANGE, table);
            registerTableEvent(IEventTopics.PO_AFTER_DELETE, table);
        }
    }

    @Override
    protected void doHandleEvent(Event event) {
        PO po = getPO(event);
        // -1 clears the whole cache, after the commit, on every server
        CacheMgt.scheduleCacheReset(BPGroupPriceListCache.CACHE_NAME, -1, false, po.get_TrxName());
    }
}
```

</details>

- `init()` registers the cache on every server, so a save on any server sends the reset.
- Register the handler as in [Event handlers](../plugin-eventhandler).

## Clear the cache after SQL

Only saves through `PO` clear caches. After SQL, schedule the reset for after the commit.

<details>
<summary>Show code</summary>

```java
int count = DB.executeUpdateEx(
    "UPDATE C_Charge SET IsActive='N' WHERE C_ChargeType_ID=?",
    new Object[] {C_ChargeType_ID}, trxName);
if (count > 0)
    // -1 clears all C_Charge caches after the commit
    CacheMgt.scheduleCacheReset(MCharge.Table_Name, -1, false, trxName);
```

</details>

## Change many records in a batch

Suspend resets, commit inside the suspended period, and reset the table once at the end.

<details>
<summary>Show code</summary>

```java
CacheMgt.get().suspendTableCacheReset(MCharge.Table_Name);
Trx trx = Trx.get(Trx.createTrxName("ChargeBatch"), true);
try {
    // change many C_Charge records with trx.getTrxName(),
    // and call trx.commit(true) every few hundred records
    trx.commit(true); // throws SQLException
} catch (Exception e) {
    trx.rollback(); // close() would commit the failed chunk
    throw e;
} finally {
    trx.close();
    CacheMgt.get().resumeTableCacheReset(MCharge.Table_Name);
    // One reset for the whole batch, also when a later chunk failed
    CacheMgt.get().reset(MCharge.Table_Name);
}
```

</details>

- `Trx.close()` commits an active transaction, so roll back a failed chunk first.
- The suspension applies to the whole server and drops resets. Some can still run after you resume.

## Load many records in one query

One query for all cache misses, instead of one per `get`.

<details>
<summary>Show code</summary>

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

</details>

- Oracle allows at most 1000 values in an `IN` list.

## Cache small records instead of model objects

A Java `record` is small, immutable and needs no copy.

<details>
<summary>Show code</summary>

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

</details>

## Compute an expensive value only once

When many threads miss at once, the first computes and the others wait.

<details>
<summary>Show code</summary>

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

</details>

- `computePrice` must not return `null`.
- Do not compute inside `ConcurrentHashMap.computeIfAbsent`: it blocks other keys.
