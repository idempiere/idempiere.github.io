---
title: "Override Workflow Responsible"
sidebar_label: "Override Workflow Responsible"
sidebar_position: 2
description: "Workflow are normally defined at system tenant."
tags:
  - functional
---

# Override Workflow Responsible

**Goal:** Functional

**Developer:** Deepak Pansheriya

**Feature** **Ticket:** [IDEMPIERE-6028](https://idempiere.atlassian.net/browse/IDEMPIERE-6028)

### Description
Workflow are normally defined at system tenant. Workflow node has way to specify workflow responsible. Workflow responsible give way to make approver or action performer as either role, user assignee and normally tenant user or role are not accessible to select as system side configuration. So other than manual and invoker workflow responsible are not usable otherwise there is provision provided to configure this responsible at tenant level.

The goal of this feature is to allow a client admin to define workflow responsible at tenant level. With this feature flow will be as below. Let's assume that on purchase order Approval workflow, we want to make approver as workflow responsible which is configurable at tenant level. So in multi tenant deployment each tenant can define either a user or a role as its own approval responsible 

- Create a workflow responsible in system tenant.  Let's say we name it as "Purchase Order Approver". This responsible can define of any type
- Assign this workflow responsible on Approval node on purchase order approval workflow created.
- Now in GardenWorld tenant create workflow responsible with name "Gardenword PO Approver" and on Override Responsible field select "Purchase Order Approver"
![Override Wf responsible](/img/docs/new-features/v13/Override_Wf_responsible.png)
- Now on this  GW Purchase Order Approver workflow responsible record, On responsible type you can select any type and can select relevant role or user whom the task needs to assign.
