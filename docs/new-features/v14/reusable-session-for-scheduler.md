---
title: Reusable Web Session for Scheduler
sidebar_label: Reusable Web Session for Scheduler
sidebar_position: 1
description: Allow reuse of an existing session for schedulers
---

**Goal:** Technical  
**Developer:** [Nicolas Micoud](https://wiki.idempiere.org/en/User:Nmicoud) ([TGI](https://www.tgi.eu))  
**Feature Ticket:** [IDEMPIERE-6661](https://idempiere.atlassian.net/browse/IDEMPIERE-6661)

## Reusable Web Session for Scheduler

The Scheduler can reuse an existing web session (`AD_Session`) instead of creating a new one each time it runs.

This improves performance and avoids unnecessary session creation when multiple scheduled executions are performed under the same logical context.

**Use Cases**
- Reducing session creation overhead in frequent schedulers
- Ensuring consistent session reuse for batch processing
- Grouping scheduler executions under a logical session key
- Improving performance in high-frequency scheduling environments

A new field **Web Session Logic** has been added to the **Scheduler** window.

This field allows defining a dynamic expression used to compute a logical identifier for a web session.

This field can contain any combination of:

- System variables (e.g. `@AD_Client_ID@`, `@AD_Scheduler_ID@`, `@Date@`)
- Static values (e.g. `myScheduler`, `batch1`, ...)
- Mixed expressions

eg: @AD_Client_ID@_@AD_Scheduler_ID@_batch1

The expression is evaluated using the standard engine and produces the final logical Web Session identifier used for lookup.


When the scheduler is executed, iDempiere attempts to find an existing session matching the computed Web Session value.

The lookup is performed using the following criteria:
- AD_Client_ID
- AD_Org_ID
- AD_Role_ID
- CreatedBy
- ServerName
- WebSession

If a matching session is found, it is reused.
Otherwise, a new AD_Session is created.


**Important Notes**
- The Web Session Logic must evaluate to a stable value to benefit from reuse.
- If the expression changes between executions, a new session will be created.
