---
sidebar_position: 55
title: "Scheduler Improvements"
sidebar_label: "Scheduler Improvements"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [technical]
---
**Goal:** Technical

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

This feature enable to define a schedule that can be used in any of the scheduled processes.  You can also define the IP address(es) where the schedule can run.

A Reload link was added on iDempiereMonitor to re-read the scheduled configuration.

New Window Schedule
![scheduler1](pathname:///img/new-features/v1.0/scheduler1.png)

 * The field Schedule Type can choose between : Frequency or Cron Scheduling Pattern
 * In the field Run Only IP: you can specify  the IP's that can run the Scheduler that have assign this Schedule

iDempiere fully supports: Cron Scheduling Pattern to create any necessary  pattern. For more information about this  pattern [cron4j](http://www.sauronsoftware.it/projects/cron4j/manual.php)

The client System can use all the Scheduler, but the other clients can only see the schedulers that are not flagged as "System Schedulers"

![scheduler3](pathname:///img/new-features/v1.0/scheduler3.png)

On Scheduler window a new field Schedule was added to choose  the schedule to that process.

![scheduler2](pathname:///img/new-features/v1.0/scheduler2.png)

The Schedule can also be used in all tables requiring a schedule, like accounting processor, alert processor, etc.

**Technical Info:** [IDEMPIERE-391](http://idempiere.atlassian.net/browse/IDEMPIERE-391)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Scheduler_Improvements)_
