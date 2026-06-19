---
sidebar_position: 15
title: "Suspend workflow until commit"
sidebar_label: "Suspend workflow until commit"
description: "**Developer:**  Martin Schönbeck"
tags: [functional]
---
**Goal:** Functional

**Developer:**  Martin Schönbeck

**Feature Ticket:** [IDEMPIERE-4186](https://idempiere.atlassian.net/browse/IDEMPIERE-4186)

**Sponsor:** [Martin Schönbeck Beratungen GmbH](https://www.schoenbeck.de/)

**Description:**

This feature allows to suspend a workflow upto the actual transaction is committed. It does not initiate a commit itself. Effectively it works like the normal wait with a time greater than 0 where the workflow processor restarts the workflow later, but here the workflow is restarted immediately after commit. It is activated by using a value of -1 in the wait action. This also ensures the workflow will be restarted by the workflow processor if it by any reason couldn't be continued after the commit.

This is especially useful before a jasperreport is to be started by a workflow to ensure it sees all changes done. Or if you want to send an e-mail you'll probably make sure the e-mail doesn't tell anything which may be rolled back due to later errors.

![WorkflowWaitCommit](pathname:///img/new-features/v8.2/WorkflowWaitCommit.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Suspend_workflow_until_commit)_
