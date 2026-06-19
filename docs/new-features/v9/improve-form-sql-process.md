---
sidebar_position: 36
title: "Improve Form SQL Process"
sidebar_label: "Improve Form SQL Process"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

The form [SQL Process](https://wiki.idempiere.org/en/SQL_Process_(Form_ID-111)) has been improved to allow executing a configurable set of commands.

The configuration is defined in the SysConfig key [FORM_SQL_PROCESS_ALLOWED_KEYWORDS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#FORM_SQL_PROCESS_ALLOWED_KEYWORDS), by default the form is enabled to execute the following commands:
- ALTER
- ANALYZE
- COMMENT
- CREATE
- DELETE
- DROP
- GRANT
- INSERT
- REINDEX
- REVOKE
- SET
- UPDATE
- TRUNCATE
- VACUUM

Restricting one of those commands to be executed can be simply done by removing it from this SysConfig whitelist.

The form also supports multiple SQL statements separated by semicolon (;)

For example:

![01 SQLProcess](pathname:///img/new-features/v9/01_SQLProcess.png)

As part of the improvements the SQL statements executed are now logged in the AD_Issue table as shown here:

![02 AuditIssue](pathname:///img/new-features/v9/02_AuditIssue.png)

**Technical Info:** [IDEMPIERE-5450](https://idempiere.atlassian.net/browse/IDEMPIERE-5450)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Improve_Form_SQL_Process)_
