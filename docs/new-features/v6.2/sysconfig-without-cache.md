---
sidebar_position: 15
title: "SysConfig without Cache"
sidebar_label: "SysConfig without Cache"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

By default all SysConfig values are cached, so when they change it requires a Cache Reset to take the new value.

In some cases it is required that the SysConfig is not cached, and it must always read its value from the database.

For this it was implemented a simple solution, just add the suffix `_NOCACHE` to your SysConfig variable, for example:

![SysConfig NOCACHE](pathname:///img/new-features/v6.2/SysConfig_NOCACHE.png)

**Technical Info:** [IDEMPIERE-3967](https://idempiere.atlassian.net/browse/IDEMPIERE-3967)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_SysConfig_Without_Cache)_
