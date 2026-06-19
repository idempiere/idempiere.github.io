---
sidebar_position: 25
title: "Support for Alternate DB Admin User"
sidebar_label: "Support for Alternate DB Admin User"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

Normally there are fixed admin users for Oracle (SYSTEM) and for PostgreSQL (postgres).

However, there are scenarios where a different admin user is required.  For example running the installation on a cloud provider.

In order to support that a context variable can be filled before running the setup script, so it is about to set something like:
```shell

export ADEMPIERE_DB_SYSTEM_USER=myCustomDBAdmin

```

And then run the setup script as usual.

**Technical Info:** [IDEMPIERE-6648](https://idempiere.atlassian.net/browse/IDEMPIERE-6648)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Support_for_Alternate_DB_Admin_User)_
