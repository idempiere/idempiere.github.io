---
sidebar_position: 2
sidebar_label: Best practices
description: Rules for using iDempiere caches in plug-ins, such as reusing existing caches, never changing cached objects and clearing caches correctly.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching best practices

Applies to iDempiere 12 and later. Code for each rule is on [Practical examples](./caching-examples).

| Rule | Why |
| --- | --- |
| Use the existing cache: `MCharge.get(ctx, id)`, not `new MCharge(ctx, id, trxName)`. | The constructor queries the database every time. |
| Never change a cached object. Use `getCopy(ctx, id, trxName)`. | Cached objects are shared and throw `PO is Immutable`. |
| Inside your own transaction, read with the `(ctx, id, trxName)` constructor. | The cache cannot see uncommitted data. This includes 2Pack and migration code. |
| Create the cache with the table name of its data. | Saves clear caches by table name. |
| Key by the record ID. | Other `String` keys clear the whole cache on every save. Other integer keys are not cleared at all. |
| Put everything the value depends on into the key: tenant, organization, language. | One cache serves all users and tenants of the server. |
| Do not cache "not found". | New records do not clear it. |
| Store only values that cannot change, such as immutable POs, records, or `List.copyOf` with immutable elements. | `CCache` returns the stored object itself. |
| After direct SQL, call `CacheMgt.scheduleCacheReset`. After changes by another application, run **Cache Reset** or call the REST reset endpoint. | Only saves through `PO` clear caches. |
| Size the cache for the data, or use no limit for small fixed data. | A cache that is too small evicts and reloads, and adds load. |
| Use the class that owns the cache when the plug-in starts. | A server only sends resets for caches it has registered. |
| Do not cache tables with heavy write traffic. | Every save sends a reset to every server. |
| In big batches, suspend resets and commit inside the suspended period. | Each save triggers a reset, and resets run only after a commit. |
