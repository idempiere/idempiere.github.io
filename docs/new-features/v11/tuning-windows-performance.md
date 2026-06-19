---
sidebar_position: 30
title: "Tuning Windows Performance"
sidebar_label: "Tuning Windows Performance"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

iDempiere performance can have problems when trying to open windows with too many records, or windows pointing to complex views.

When opening a window the system first tries to execute a SELECT COUNT to know beforehand with how many records is dealing.

However this COUNT query can slow down the opening of the window, and in some cases can slow down the whole system.

Is because this reason that some restrictions were added, these restrictions can be configured using SysConfig keys.

The timeout for queries can be defined in the following SysConfig keys:

- **GRIDTABLE_LOAD_TIMEOUT_IN_SECONDS:** This is the number of seconds allowed for the load query to run when opening a window, it can be defined per Tenant and default is 30 seconds.  This is also used for the timeout when loading a Table list.
- **GRIDTABLE_INITIAL_COUNT_TIMEOUT_IN_SECONDS:** This is the number of seconds allowed for the initial count query to run when opening a window, it can be defined per Tenant and default is 1 second.
- **REPORT_LOAD_TIMEOUT_IN_SECONDS:** This is the number of seconds allowed for the load query to run when executing a report, it can be defined per Tenant and default is 120 seconds.
- **ZK_INFO_QUERY_TIME_OUT:** This is the number of seconds allowed for the load query to run when opening an Info Window, it can be defined per Tenant and default is 120 seconds.

NOTE: these timeouts can be defined as zero meaning no timeout is applied, however this is not recommended as the system can keep runnning wild queries that affects the overall performance.

Additionally to the timeout in seconds, there are also SysConfig keys to configure the number of records allowed in:

- **GLOBAL_MAX_QUERY_RECORDS:** This is the maximum number allowed to query when opening a window, note that the role can be configured with a different maximum and role takes precedence in this case.  It can be defined per Tenant and default is 100.000 records.
- **GLOBAL_MAX_REPORT_RECORDS:** This is the maximum number allowed to list when running a report.  It can be defined per Tenant and default is 100.000 records.

**Technical Info:** [IDEMPIERE-6123](https://idempiere.atlassian.net/browse/IDEMPIERE-6123)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Tuning_Windows_Performance)_
