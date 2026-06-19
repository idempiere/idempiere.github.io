---
sidebar_position: 16
title: "Maintenance Mode"
sidebar_label: "Maintenance Mode"
description: "You can define a system configurator key SYSTEM_IN_MAINTENANCE_MODE=Y on the tenant that you want to disable login for maintenance.  If you define SYST"
tags: [technical]
---
**Goal:** Technical

**Description:**

You can define a system configurator key SYSTEM_IN_MAINTENANCE_MODE=Y on the tenant that you want to disable login for maintenance.  If you define SYSTEM_IN_MAINTENANCE_MODE=Y for the client System then all tenants will be disabled (there must not be records SYSTEM_IN_MAINTENANCE_MODE=N on tenants).

![01 MaintenanceMode](pathname:///img/new-features/v2.0/01_MaintenanceMode.png)

The normal users will see a window like this:

![02 MaintenanceMode](pathname:///img/new-features/v2.0/02_MaintenanceMode.png)

Please note just Advanced roles are able to login in maintenance mode.

**Technical Info:** [IDEMPIERE-1717](http://idempiere.atlassian.net/browse/IDEMPIERE-1717)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.0_Maintenance_Mode)_
