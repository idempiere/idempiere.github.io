---
sidebar_position: 4
sidebar_label: Practical examples
description: Copyable examples of iDempiere caches in plug-ins, from a cached model class to tenant-aware lookups, cached lists and caches cleared by event handlers.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching examples

The examples use a custom table `MY_Category` with an integer ID, `Value` and `Name`. `Query` returns `MMyCategory` only with a [model factory](../plugin-modelfactory) for the table. Otherwise it returns a `GenericPO`, and the casts fail. Applies to iDempiere 12 and later.

## Cache model objects by ID

The pattern of `MCharge` in iDempiere 13. `X_MY_Category` is the class the model generator created.

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

- `get` caches only records that exist, never "not found".
- The copy operators avoid reflection. The copy constructors are still needed by them and by `getCopy`.
- Copy child objects, such as lines, in the copy constructor and mark them immutable in `markImmutable`.

## Look up a record by search key

The key contains the tenant, because one cache serves all tenants.

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

Imports: `org.compiere.model.Query`, `org.idempiere.cache.ImmutablePOCache`. No size limit, so only for small tables.

## Cache a list per tenant

The key is a tenant ID, not a record ID, so `reset(int)` must clear everything. A new record changes the list, so `newRecord` must clear it too. A version number stops a query that started before a reset from putting the old list back afterwards.

```java
private static final Object s_activeIdsLock = new Object();
private static int s_activeIdsVersion;

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
    };

public static List<Integer> getActiveIds(Properties ctx) {
    int clientId = Env.getAD_Client_ID(ctx);
    List<Integer> ids = s_activeIds.get(clientId);
    if (ids != null)
        return ids;
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
}
```

Imports: `java.util.Arrays`, `java.util.List`, `org.compiere.model.Query`, `org.compiere.util.CCache`.

## Cache a value from several tables

The sales price list of a Business Partner Group: its own price list, or the tenant's default. It depends on `C_BP_Group` and `M_PriceList`, so its name is not a table, and an event handler clears it.

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

The handler clears the cache after the commit, on every server. `init()` registers the cache on every server. The cache has no expiry, so if a change during the query must never leave an old value, add the version check from the list example. Register the handler as in [Event handlers](../plugin-eventhandler). `FROM DUAL` works on PostgreSQL too, because iDempiere creates a `DUAL` view.

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

## Create a record and read it in the same transaction

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

## Clear the cache after direct SQL

```java
int count = DB.executeUpdateEx(
    "UPDATE C_Charge SET IsActive='N' WHERE C_ChargeType_ID=?",
    new Object[] {C_ChargeType_ID}, trxName);
if (count > 0)
    // -1 clears all C_Charge caches after the commit
    CacheMgt.scheduleCacheReset(MCharge.Table_Name, -1, false, trxName);
```

## Change many records in a batch

Resets run after a commit, so commit inside the suspended period. In a process, use your own transaction, because the process transaction commits after `doIt`.

```java
CacheMgt.get().suspendTableCacheReset(MCharge.Table_Name);
Trx trx = Trx.get(Trx.createTrxName("ChargeBatch"), true);
try {
    // change many C_Charge records with trx.getTrxName(),
    // and call trx.commit(true) every few hundred records
    trx.commit(true); // throws SQLException
} finally {
    trx.close();
    CacheMgt.get().resumeTableCacheReset(MCharge.Table_Name);
    // One reset for the whole batch, also when a later chunk failed
    CacheMgt.get().reset(MCharge.Table_Name);
}
```

:::warning

The suspension applies to the whole server and drops resets, it does not queue them. Resets of the last commit can still run after you resume. Always resume and reset the table in `finally`, so that chunks committed before a failure are cleared too.

:::
