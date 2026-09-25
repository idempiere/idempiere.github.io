---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 7.1."
tags: [features, migration, installation, development, developer-documentation, reference]
---

# Migration notes - iDempiere 7.1 (technical)

## Multi-server schedulers

With ticket [IDEMPIERE-4056](https://idempiere.atlassian.net/browse/IDEMPIERE-4056), schedulers running on all servers are no longer supported.

Previously, when a scheduler did not have a `RunOnlyOnIP` defined, it executed on all servers. After IDEMPIERE-4056, schedulers without an IP defined execute on just one server, chosen randomly.

:::tip
`RunOnlyOnIP` keeps working as usual, so the easiest workaround is to configure one scheduler per server.
:::
