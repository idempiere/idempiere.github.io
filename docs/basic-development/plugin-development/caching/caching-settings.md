---
sidebar_position: 7
sidebar_label: Settings
description: Reference of the Java system properties for iDempiere cache size, expiry and cluster reset messages, and how to check caches in the server monitor.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching settings

Java system properties, for example in `IDEMPIERE_JAVA_OPTIONS` of `idempiere-server.sh`. Read once at startup.

## Server settings

| Property | Default | Effect |
| --- | --- | --- |
| `Cache.MaxSize` | `1000` | Size limit of caches that set none in code. |
| `Cache.MaxSize.<cache name>` | none | Size limit of one cache. Overrides the code, must be above 0. Uses the cache name shown on the server monitor. |
| `Cache.ExpireMinute` | `60` | Minutes without access before an entry expires, for caches that set none in code. |

## Cluster settings

iDempiere 14 only ([IDEMPIERE-7090](https://idempiere.atlassian.net/browse/IDEMPIERE-7090)), for Hazelcast and Redis.

| Property | Default | Effect |
| --- | --- | --- |
| `Cache.ClusterResetDebounceTables` | none | Comma-separated tables. Other servers get one whole-table reset per interval, plus one at the end. |
| `Cache.ClusterResetDebounceMs` | `1000` | That interval in milliseconds. |
| `Cache.ResetStaggerMaxMs` | `500` | Receiving servers wait `position × value / servers` milliseconds before clearing. `0` turns it off. |

## Check the caches

- `/idempiereMonitor?CacheDetails=Yes` lists caches with entries: size, limits, hits, misses. Many misses and a full size: too small.
- **Cache Reset** clears all caches on all servers. The REST plug-in has [endpoints](./caching-rest-api#cache-endpoints) for the same.
