---
sidebar_position: 4
title: "On Start Schedule"
sidebar_label: "On Start Schedule"
description: "**Developer:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Functional

**Developer:** Carlos Ruiz

**Description:**

There is a new scheduler type configurable to run just when the server starts, this can be interesting in case there is the need to run a process on every iDempiere restart, or when setting a daemon.

The configuration is simply to define a Schedule and leave the Scheduler Type field empty.  Note when saving the first time the field is filled with the default, so you need to empty the field and save again:

![StartSchedule](pathname:///img/new-features/v6.2/StartSchedule.png)

**Technical Info:** [IDEMPIERE-3823](https://idempiere.atlassian.net/browse/IDEMPIERE-3823)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_On_Start_Schedule)_
