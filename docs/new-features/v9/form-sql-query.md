---
sidebar_position: 35
title: "Form SQL Query"
sidebar_label: "Form SQL Query"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Sponsor:** [FH](https://www.fh.com.br/)

## Description
The new form SQL Query allows admin users to execute queries in the database.

The form **DOES NOT support** multiple SQL statements, or any statement containing a semicolon (;)

It allows just to execute single queries.

For example:

![01 SQLQuery](pathname:///img/new-features/v9/01_SQLQuery.png)

The SQL statement executed is logged in the AD_Issue table as shown here:

![02 AuditIssueQuery](pathname:///img/new-features/v9/02_AuditIssueQuery.png)

## Configuration
### SysConfig FORM_SQL_QUERY_ALLOWED_KEYWORDS
The allowed commands are defined in the SysConfig key [FORM_SQL_QUERY_ALLOWED_KEYWORDS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#FORM_SQL_QUERY_ALLOWED_KEYWORDS), by default the form is enabled to execute the following commands:
- SELECT
- WITH
- SHOW

Restricting one of those commands to be executed can be simply done by removing it from this SysConfig whitelist.

### SysConfig FORM_SQL_QUERY_TIMEOUT_IN_SECONDS
The SysConfig key [FORM_SQL_QUERY_TIMEOUT_IN_SECONDS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#FORM_SQL_QUERY_TIMEOUT_IN_SECONDS) defines the timeout in seconds allowed to run the query, by default is 120 seconds (2 minutes).

### SysConfig FORM_SQL_QUERY_MAX_RECORDS
The SysConfig key [FORM_SQL_QUERY_MAX_RECORDS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#FORM_SQL_QUERY_MAX_RECORDS) defines the maximum number of records allowed to be queries with this tool, by default is set to 500 records.

### SysConfig FORM_SQL_QUERY_LOG_ISSUE
The SysConfig key [FORM_SQL_QUERY_LOG_ISSUE](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#FORM_SQL_QUERY_LOG_ISSUE) defines if the audit log is created in the AD_Issue table.  The default is to create the audit record.

## Technical Note
When a [replica database is configured](https://wiki.idempiere.org/en/NF6.2_Reporting_from_Read-Only_Replica), the query is executed against the replica database when possible.

**Technical Info:** [IDEMPIERE-5451](https://idempiere.atlassian.net/browse/IDEMPIERE-5451)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Form_SQL_Query)_
