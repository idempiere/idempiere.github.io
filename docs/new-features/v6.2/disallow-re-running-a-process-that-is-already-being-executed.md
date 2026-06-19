---
sidebar_position: 2
title: "Disallow re-running a process that is already being executed"
sidebar_label: "Disallow re-running a process that is already being executed"
description: "**Developers:** Diego Ruiz"
tags: [functional]
---
**Goal:** Usability

**Developers:** Diego Ruiz

**Sponsors:**  [TrekGlobal](http://www.trekglobal.com/)

**Description:**

Sometimes when a user runs a heavy report/process more than once, the perfomance cost is really expensive. In order to avoid this, a new field has been created 'Multiple Execution'.

![MultipleExecution](pathname:///img/new-features/v6.2/MultipleExecution.png)

The new field has the following values:

- Empty: Always allow to execute a process multiple times.
- Disallow multiple executions: Never allow to execute a process that is already running.
- Disallow multiple executions with the same parameters: Allow to execute a process multiple times with different parameters.

According to the description before, all the reports have been set to 'Disallow multiple executions with the same parameters' by default in iDempiere.

**Technical Info:** [IDEMPIERE-3799](https://idempiere.atlassian.net/browse/IDEMPIERE-3799)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_Avoid_re-running_processes)_
