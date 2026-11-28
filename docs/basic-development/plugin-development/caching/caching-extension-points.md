---
sidebar_position: 5
sidebar_label: Extension points
description: The extension points of iDempiere caching for plug-ins, from CCache subclasses and reset listeners to a custom distributed backend.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-28
---
# Caching extension points

What a plug-in can change. Applies to iDempiere 12 and later. The distributed backend needs iDempiere 14.

## Local caches

A plug-in can change how its own caches react to resets. The caches themselves stay in iDempiere.

| Extension point | What it does | Example |
| --- | --- | --- |
| Subclass `CCache` | Override `reset()`, `reset(int)`, `resetByStringKey`, `newRecord` or `size()` | [List example](./caching-examples#cache-a-list-per-tenant) |
| `CCache` with table name `null` that implements `CacheChangeListener` | Gets the resets of every table, also while empty | `ReferenceCache` in core's [`DefaultEvaluatee`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/compiere/util/DefaultEvaluatee.java) |

A `CacheChangeListener` only hears tables that have a cache on the server, and gets no `newRecord` notices.

Not replaceable: `CacheMgt`, the storage behind each cache, and when `PO` sends resets.

## Distributed backend (iDempiere 14)

The service that carries resets between servers can be replaced by a plug-in, the way Redis was added.

1. Register `ICacheService`, `IClusterService` and `IMessageService` as OSGi components that require `(osgi.condition.id=distributed.provider.<name>)`.
2. Start the servers with `-Didempiere.distributed.backend=<name>`.

Hazelcast (default) and Redis then stay inactive. A backend must implement all three services:

| Service | Used for |
| --- | --- |
| `ICacheService` | Resets between servers, `distributed=true` caches, scheduler locks |
| `IClusterService` | Cluster members, server monitor, system info, scheduler state |
| `IMessageService` | Messages between servers: running jobs, recent items, calendar |

In iDempiere 12 and 13, replacing the backend means replacing the Hazelcast bundle.
