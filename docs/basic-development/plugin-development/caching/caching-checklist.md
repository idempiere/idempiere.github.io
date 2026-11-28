---
sidebar_position: 6
sidebar_label: Development checklist
description: A checklist for each step of adding a cache to an iDempiere plug-in, from design and code to tests, review, deployment and operation.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching development checklist

Applies to iDempiere 12 and later.

## Design

- [ ] Measured: the query runs often in `pg_stat_statements`.
- [ ] Core does not cache it already.
- [ ] Number of entries estimated, for all tenants together.
- [ ] Allowed age of a value decided. No delay allowed: read from the database.
- [ ] Every dependency is in the key: tenant, organization, language.
- [ ] Every way the data changes has a reset: `PO` saves, direct SQL, imports, migrations.

## Code

- [ ] Right class, table name and record ID key. See [How it works](./caching-overview#how-it-works).
- [ ] Copy constructors, `markImmutable` and copy operators for model classes.
- [ ] No cached `null`, only values that cannot change.
- [ ] `newRecord` overridden for cached lists, `reset(int)` for other integer keys. On tables without a single integer ID, a full reset scheduled in `afterSave` and `afterDelete` instead, because they send no `newRecord` notice.
- [ ] Size limit set, or none for small fixed data.
- [ ] Cache class loaded when the plug-in starts.

## Test

Integration tests on `AbstractTestCase`, see [Testing plug-ins](/docs/basic-development/testing/testing-plugins).

- [ ] A second `get` is a hit (compare `getHit()` and `getMiss()`).
- [ ] After `commit()` and a short wait, `get` returns the new value. Core's `CacheTest` waits 500 milliseconds. Delete committed test data.
- [ ] A new record appears in cached lists.
- [ ] Another tenant never gets your value.

## Review

- [ ] Every cache is cleared by its table name or by an event handler.
- [ ] No setter or `save` on a cached object.
- [ ] No unbounded cache for data that grows.

## Deploy and run

- [ ] All servers run the same plug-in version.
- [ ] `-DCache.MaxSize.<cache name>` set where needed. See [Settings](./caching-settings).
- [ ] **Cache Reset** after SQL migrations.
- [ ] Hits, misses and heap watched after go-live.
