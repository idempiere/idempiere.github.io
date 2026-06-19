---
sidebar_position: 39
title: "Run reports in the scheduler using context variables for dates"
sidebar_label: "Run reports in the scheduler using context variables for dates"
description: "**Developer:** Heng Sin Low"
tags: [technical]
---
**Goal:** Technical

**Developer:** Heng Sin Low

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:** Chuck Boecking

This feature gives users the ability to schedule a process/report with variable date parameters. Doing so enables you to schedule and deliver reports via email or execute processes with current information. Here is an example Scheduler configuration using the Order Detail report/process.

![iDempiere report scheduler with relative parameters](pathname:///img/new-features/v2.1/iDempiere_report_scheduler_with_relative_parameters.png)

_iDempiere Report Scheduler With Relative Parameters_

Rapid syntax : @#Date@+1d (for adding one day)

It is possible to use "d" for days, "m" for months and "y" for years.

If suffix is not added then days is assumed.

**Technical Info:** [IDEMPIERE-1952](http://idempiere.atlassian.net/browse/IDEMPIERE-1952)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Scheduler_Variable_Date_Parameter)_
