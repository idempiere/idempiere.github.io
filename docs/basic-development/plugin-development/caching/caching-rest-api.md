---
sidebar_position: 8
sidebar_label: REST API
description: How iDempiere caches affect clients of the REST API plug-in, its cache endpoints, and the caching problems that were reported and fixed.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching and the REST API

The REST API is the separate [idempiere-rest](https://github.com/bxservice/idempiere-rest) plug-in, not core. It uses the core caches, so the other pages apply to it. Applies to iDempiere 12 and later.

## What REST clients should know

- Behind a load balancer, a read after a save can reach a server that has not reset yet. Use sticky sessions.
- Lookups in a response come from core caches. If they are too small, every request reloads them.
- The plug-in sends no caching headers or `ETag`. For fast responses, the core developers suggest a process that returns prebuilt JSON, a summary table, or a cache in front of the API.
- A cache in front of the API must keep responses apart by user, tenant and role, and check access. Otherwise it serves one user's data to another. Do not cache authenticated responses without that.

## Cache endpoints

| Request | Does | Who |
| --- | --- | --- |
| `GET /api/v1/caches` | Lists caches. Filter with `table_name` or `name`. | Users with the System role |
| `DELETE /api/v1/caches` | Resets all caches, or one table (`table_name`), or one record (`record_id`), on all servers. With `record_id`, caches whose keys are not integers are cleared completely. `entriesReset` sums all servers in 12 and 13. In 14 it counts only this server, so it is `0` in a cluster. | Roles with access to **Cache Reset** |

## Reported and fixed

| Problem | Ticket | Fixed in |
| --- | --- | --- |
| Changed translation returned until a manual reset | [IDEMPIERE-6506](https://idempiere.atlassian.net/browse/IDEMPIERE-6506) | 12, 13 |
| Reading a product loaded every locator | [IDEMPIERE-5224](https://idempiere.atlassian.net/browse/IDEMPIERE-5224) | 9, 10 |
| Bulk saves refreshed lookup fields once per record | [IDEMPIERE-6065](https://idempiere.atlassian.net/browse/IDEMPIERE-6065) | 12 |
| "PO is Immutable" when running a report | [IDEMPIERE-5413](https://idempiere.atlassian.net/browse/IDEMPIERE-5413) | 9, 10 |
| Hazelcast unstable in containers: Redis added | [IDEMPIERE-6989](https://idempiere.atlassian.net/browse/IDEMPIERE-6989) | 14 |
| Cluster resets on Redis, with stagger and debounce | [IDEMPIERE-7090](https://idempiere.atlassian.net/browse/IDEMPIERE-7090) | 14 |

Open: [IDEMPIERE-4466](https://idempiere.atlassian.net/browse/IDEMPIERE-4466), flexible locator cache size. Until then, use `-DCache.MaxSize.M_Locator`.
