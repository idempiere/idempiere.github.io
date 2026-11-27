---
sidebar_position: 4
sidebar_label: Practical examples
description: Copyable examples of iDempiere caches in plug-ins, from a cached model class to tenant-aware lookups, cached lists and caches cleared by event handlers.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching examples

Each example solves one common task and names the rules it follows. The examples use a custom table `MY_Category` with an integer ID and the columns `Value` and `Name`, and core tables where that is clearer. `Query` creates `MMyCategory` objects only when a [model factory](../plugin-modelfactory) returns that class for `MY_Category`. Without one, `Query` returns a `GenericPO`, and the examples fail with a `ClassCastException`. Read [How caching works](./caching-overview) first. Applies to iDempiere 12 and later.

## Cache model objects by ID

This model class caches its records the way core model classes such as `MCharge` and `MUOM` do. It follows `MCharge` in iDempiere 13. `X_MY_Category` stands for the class that the model generator created for your table.

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

Points to note:

- The cache is created with `Table_Name`, so saving or deleting a `MY_Category` record removes its entry.
- `get` only puts the object in the cache when the record exists (`get_ID() == MY_Category_ID`). It does not cache "not found".
- `get` and `put` get a copy operator, so the cache never needs reflection. The copy constructors are still needed, because the copy operator and `getCopy` call them.
- The UUID constructor is used when iDempiere creates the model from a UUID. Model classes in core have it too.
- If your class holds child objects, such as lines, copy them in the copy constructor and mark them immutable in `markImmutable`.

## Look up a record by search key

Users often look up records by their search key, not their ID. Add a second cache keyed by tenant and search key to the class above. The key contains the tenant, because the cache is shared by all tenants on the server.

```java
/** Cache by tenant and search key. Every save of MY_Category clears it, because the key is not the record ID. */
private static final ImmutablePOCache<String, MMyCategory> s_cacheByValue =
    new ImmutablePOCache<>(Table_Name, Table_Name + "|Value", 20, 0, false, 0);

/** Get by search key from the cache (immutable) */
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

Add `import org.compiere.model.Query;` and `import org.idempiere.cache.ImmutablePOCache;` to the class. The cache has no size limit, so use this only for tables with a limited number of records.

## Cache a list per tenant

A list of records needs two changes to `CCache`. The key here is a tenant ID, not a record ID, so `reset(int)` must clear everything. And a new record must clear the list, because `CCache` ignores new records.

```java
/** Active category IDs per tenant, cleared on every change and every new record. */
private static final CCache<Integer, List<Integer>> s_activeIds =
    new CCache<>(Table_Name, Table_Name + "|ActiveIDs", 5, 0, false, 0) {
        private static final long serialVersionUID = 1L;

        @Override
        public int reset(int recordId) {
            return reset(); // the key is a tenant ID, not a record ID
        }

        @Override
        public void newRecord(int record_ID) {
            reset(); // a new record changes the list
        }
    };

/** IDs of the active categories of the tenant, sorted by name */
public static List<Integer> getActiveIds(Properties ctx) {
    int clientId = Env.getAD_Client_ID(ctx);
    List<Integer> ids = s_activeIds.get(clientId);
    if (ids != null)
        return ids;
    int[] found = new Query(ctx, Table_Name, "AD_Client_ID=?", null)
        .setParameters(clientId)
        .setOnlyActiveRecords(true)
        .setOrderBy("Name")
        .getIDs();
    // An unmodifiable list, because every caller gets the same object
    ids = Arrays.stream(found).boxed().toList();
    s_activeIds.put(clientId, ids);
    return ids;
}
```

Add `import java.util.Arrays;`, `import java.util.List;`, `import org.compiere.model.Query;` and `import org.compiere.util.CCache;` to the class.

## Cache a value that depends on several tables

Some values combine data from several tables. This cache holds the sales price list of a Business Partner Group: the group's own price list, or the tenant's default sales price list. It has to be cleared when either `C_BP_Group` or `M_PriceList` changes. Its table name is not a real table, so only the event handler below clears it.

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

The event handler clears the cache after every new, changed or deleted record of either table. `scheduleCacheReset` waits for the commit and sends the reset to every server. Calling `init()` in `initialize()` registers the cache on every server where the plug-in runs, so that a save on any server sends the reset. Register the handler as shown in [Event handlers](../plugin-eventhandler).

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

The SQL ends with `FROM DUAL`. iDempiere creates a `DUAL` view on PostgreSQL, so the same statement works on PostgreSQL and Oracle.

## Create a record and read it in the same transaction

A process that creates a record and reads it again must not use the cache, because the record is not committed yet.

```java
MMyCategory category = new MMyCategory(getCtx(), 0, get_TrxName());
category.setValue("NEW");
category.setName("New category");
category.saveEx();

// Wrong: the cache reads without the transaction and does not find the record
MMyCategory notFound = MMyCategory.get(getCtx(), category.get_ID());

// Right: read in the same transaction
MMyCategory found = new MMyCategory(getCtx(), category.get_ID(), get_TrxName());
```

## Change many records in a batch

See [Suspend resets during batch jobs](./caching-best-practices#suspend-resets-during-batch-jobs) for a batch that commits in chunks and clears the cache once at the end.

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).
