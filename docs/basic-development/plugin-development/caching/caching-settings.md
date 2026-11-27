---
sidebar_position: 7
sidebar_label: Settings
description: Reference of the Java system properties for iDempiere cache size, expiry and cluster reset messages, and how to check caches in the server monitor.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching settings

Java system properties that change cache sizes, expiry and cluster behavior, and where to see what the caches do. Applies to iDempiere 12 and later. The cluster settings need iDempiere 14.

## Server settings

Set these as Java system properties when you start the server, for example in `IDEMPIERE_JAVA_OPTIONS`, which `idempiere-server.sh` passes to Java.

| Property | Default | Effect |
| --- | --- | --- |
| `Cache.MaxSize` | `1000` | Size limit of every cache whose constructor does not set one. |
| `Cache.MaxSize.<cache name>` | none | Size limit of one cache. It overrides the size set in code, including no limit. The value must be above 0. The name is the cache name, which for most model classes is the table name. Check it on the server monitor. |
| `Cache.ExpireMinute` | `60` | Minutes after the last access before an entry of a cache without its own setting expires. |

## Cluster settings

These settings exist in iDempiere 14 ([IDEMPIERE-7090](https://idempiere.atlassian.net/browse/IDEMPIERE-7090)). They apply to both Hazelcast and Redis. They are read once when the server starts.

| Property | Default | Effect |
| --- | --- | --- |
| `Cache.ClusterResetDebounceTables` | none | Comma-separated tables whose resets to other servers are combined. The local server is still cleared at once. The other servers get one whole-table reset per interval, plus one more at the end if writes continued. |
| `Cache.ClusterResetDebounceMs` | `1000` | The interval for those tables, in milliseconds. Other servers can be stale for about this long, plus their delay from `Cache.ResetStaggerMaxMs`. |
| `Cache.ResetStaggerMaxMs` | `500` | When a server receives a reset from another server, it waits before clearing, so that the servers do not all reload from the database at the same moment. The servers are sorted by member ID, and each waits `position × Cache.ResetStaggerMaxMs / number of servers` milliseconds. The first one does not wait. `0` turns the delay off. |

## Check what the caches do

The server monitor lists the caches that hold entries, with their size, limits, hits and misses, at `/idempiereMonitor?CacheDetails=Yes`. A cache with many misses and a full size is too small. A cache with no hits is not worth keeping.

The **Cache Reset** menu item clears all caches on all servers. The REST API plug-in has endpoints for the same, see [Caching and the REST API](./caching-rest-api#cache-endpoints).

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).
