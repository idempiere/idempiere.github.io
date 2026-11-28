---
sidebar_position: 2
sidebar_label: Troubleshooting
description: Why a change in iDempiere sometimes seems not to work, explained for consultants, support and administrators, with what to check and do.
tags: [development, functional]
applies_to: ">=12"
last_reviewed: 2026-11-28
---
# Troubleshooting

Sometimes a user changes something in iDempiere and "it did not work": the old value still shows, a rule still applies, or a setting has no effect. Often the change was saved correctly, and the server still uses a copy it keeps in memory. This page explains these cases without code. Applies to iDempiere 12 and later.

## Why it happens

iDempiere keeps often-used data in memory, such as products, price list headers, units of measure and settings. When a record is saved in a window, iDempiere clears its copy after the save is complete, usually within a second. Some changes do not clear the copy:

- changes made outside the windows, such as SQL scripts, imports by script, or other applications writing to the database;
- a few settings that the server reads only once, when it starts;
- some tables where iDempiere 13 and later do not clear the copy, see the table below.

If the company runs several servers, each one has its own copy. The other servers get the message to clear it a moment later.

## What users see

Start from what the user reports. Most cases are solved by waiting a moment or by **Cache Reset**.

| What the user sees | Why | What to do |
| --- | --- | --- |
| A colleague still sees the old value for a few seconds | With several servers, the other server clears its copy a moment later. | Wait a few seconds and refresh. |
| Data changed by a script, import or another application does not show | Only saves in iDempiere clear the copy. | Run **Cache Reset**. |
| A System Configurator setting has no effect | Most settings apply after saving, but some are read only when the server starts, for example the map URLs of locations. | Check the setting's description. If it is read at startup, restart the server. |
| A changed or deleted Table Validation Rule still applies (iDempiere 13 and later) | iDempiere does not clear this copy after the change. | Run **Cache Reset**. Logging in again does not help. |
| A change to product category accounting, such as the costing method, is not used yet (iDempiere 13 and later) | iDempiere does not clear this copy after the change. It expires after 5 minutes without use. | Run **Cache Reset**. |
| A changed translation still shows (iDempiere 11 and earlier) | Older releases did not clear translations. | Run **Cache Reset**, or update. Fixed in iDempiere 12. |
| The web shop or app still shows an old price | iDempiere calculates product prices fresh on every request. An old price comes from a cache in the shop, app or CDN. | Clear the cache of the shop, app or CDN. |
| Windows are slow during a large import | Saved records make open lookup fields reload again and again. | Run large imports outside working hours, or ask the developer to suspend cache resets during the import. |
| The error "PO is Immutable" | A program tried to change a copy from memory. This is a bug in the code, not a user mistake. | Report it to the developer with the steps to reproduce. |
| The database is busy with millions of small queries | A memory cache is too small for the data, or code does not use it. | Ask the administrator to check the cache sizes on the server monitor. |

## Why it matters

Reports from production servers in the community:

| Measured | Cause | After the fix |
| --- | --- | --- |
| 2 million locator queries in 2 hours | 3000 locators in use, cache limit 1000 | 44,000 queries with a limit of 10,000 |
| 4.4 million reference queries in 2 hours | Code that did not use the cache | Remedy: use the cache in that code |

## Cache Reset

**Cache Reset** is a menu item. Which roles can run it depends on their process access. It clears all copies on all servers.

- It does not change any data.
- Right after it, the next actions are a little slower, because iDempiere reads the data from the database again.
- It does not help for settings that are read at startup. Those need a server restart.

The administrator can see all caches, with their size and how often they are used, on the server monitor at `/idempiereMonitor?CacheDetails=Yes`.

## Before you escalate to a developer

Collect these facts. They save a lot of time:

1. What was changed, in which window, record and field.
2. How it was changed: in a window, by import, by script, or by another application.
3. When it was changed, and on which server, if there are several.
4. What the user sees, and on which server.
5. Whether **Cache Reset** fixed it. If it did, the cause is a cache. If not, it is something else.
