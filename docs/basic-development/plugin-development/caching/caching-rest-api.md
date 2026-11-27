---
sidebar_position: 8
sidebar_label: REST API
description: How iDempiere caches affect clients of the REST API plug-in, its cache endpoints, and the caching problems that were reported and fixed.
tags: [development]
applies_to: ">=12"
last_reviewed: 2026-11-27
---
# Caching and the REST API

The REST API is not part of iDempiere core. It is the separate [idempiere-rest](https://github.com/bxservice/idempiere-rest) plug-in, which runs inside the iDempiere server. This page explains how the core caches described in this section affect REST clients, and lists the caching problems that REST users reported and that were fixed. Applies to iDempiere 12 and later.

## How core caches affect REST clients

The plug-in uses the same model classes and caches as the rest of the server. Everything on the other pages of this section applies to REST requests too:

- A record that one request saves is cleared from the caches after the commit, on a background thread. Behind a load balancer, the next request can reach another server before its reset has run, and get the old value. See [Caches in a cluster](./caching-overview#caches-in-a-cluster). Sticky sessions keep a client on the server that wrote the record.
- Reference lists, translations and other lookups that a response contains come from the core caches. If these caches are too small for your data, every request reloads them. See [Size the cache to the data it serves](./caching-best-practices#size-the-cache-to-the-data-it-serves).

## Response caching

The plug-in adds no caching headers and no `ETag` to its responses, and does not keep responses itself. If a client, such as a web shop, needs fast answers for data that changes often, the core developers suggested these approaches in the community discussion:

- A process that builds the result from cached data and returns it as JSON, called through the REST process endpoint.
- A summary table that a scheduled process keeps up to date, read through the normal model endpoint.
- A separate cache in front of the API, for example a CDN or Redis, with your own rules for when to refresh it.

A cache for model reads does not help when the slow part is one view query. Look at the query first.

## Cache endpoints

The plug-in has two endpoints for the core caches.

| Request | What it does | Who can call it |
| --- | --- | --- |
| `GET /api/v1/caches` | Lists the caches with name, table name, size, expiry, size limit and whether they are distributed. Filter with `table_name` or `name`. | Users who have the System role assigned |
| `DELETE /api/v1/caches` | Resets all caches. With `table_name`, only the caches of that table. With `table_name` and `record_id`, only that record. The reset reaches every server in the cluster. The response field `entriesReset` counts only this server's entries, and is `0` in a cluster even when entries were cleared. | Roles with access to the **Cache Reset** process |

## Reported and fixed

These caching problems were found with REST clients in production, discussed in the community chat, and fixed in core.

| Problem | Ticket | Fixed in |
| --- | --- | --- |
| A changed translation was still returned until a manual cache reset. | [IDEMPIERE-6506](https://idempiere.atlassian.net/browse/IDEMPIERE-6506) | 12, 13 |
| Reading a product loaded every locator, and the locator cache of 1000 entries kept evicting them. Millions of queries per day. | [IDEMPIERE-5224](https://idempiere.atlassian.net/browse/IDEMPIERE-5224) | 9, 10 |
| Saving many records refreshed every open lookup field once per record. Refresh requests are now combined. | [IDEMPIERE-6065](https://idempiere.atlassian.net/browse/IDEMPIERE-6065) | 12 |
| Running a report through the API failed with "PO is Immutable" on the print format. | [IDEMPIERE-5413](https://idempiere.atlassian.net/browse/IDEMPIERE-5413) | 9, 10 |
| Hazelcast was unstable when servers ran in containers and restarted often. Redis was added as an alternative backend. | [IDEMPIERE-6989](https://idempiere.atlassian.net/browse/IDEMPIERE-6989) | 14 |
| Cache resets across servers on Redis, with protection against all servers reloading at once and against floods from busy tables. | [IDEMPIERE-7090](https://idempiere.atlassian.net/browse/IDEMPIERE-7090) | 14 |

Still open: [IDEMPIERE-4466](https://idempiere.atlassian.net/browse/IDEMPIERE-4466) asks for a more flexible way to size the locator cache. Until then, use `-DCache.MaxSize.M_Locator`. See [Caching settings](./caching-settings).

This page is part of [Caching](/docs/basic-development/plugin-development/caching): [overview](./caching-overview), [best practices](./caching-best-practices), [gotchas](./caching-gotchas), [practical examples](./caching-examples), [fast cache code](./caching-performance), [development checklist](./caching-checklist), [settings](./caching-settings) and [REST API](./caching-rest-api).
