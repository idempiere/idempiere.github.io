---
sidebar_position: 22
title: "Create/Complete Table"
sidebar_label: "Create/Complete Table"
description: "**Developers:** Nicolas Micoud, Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developers:** Nicolas Micoud, Carlos Ruiz

**Description:**

Traditionally it has been complicated to create a document table with all the required columns, dependencies, workflow, etc.

With the process *Create/Complete Table*, accessible from the gear button in *Table and Column* window, now is very easy to:
- add a workflow
- add the corresponding translation table
- add the required columns in a table to make it a document, or in general add the common columns:
    - Value
    - Name
    - Description
    - Help
    - DocumentNo
    - DocAction
    - DocStatus
    - Processed
    - ProcessedOn
    - Processing
    - C_DocTypeTarget_ID
    - C_DocType_ID
    - C_Currency_ID
    - DateTrx
    - DateAcct
    - Posted
    - IsApproved
    - SalesRep_ID
    - AD_User_ID

![01 CreateCompleteTable](pathname:///img/new-features/v8.2/01_CreateCompleteTable.png)

'''Adding a translation table:
- When creating a translation table remember to set on all columns you want to translate the 'translated'-flag (in group 'technical').
- After creating the table add those columns manually to the translation table.
- Then run 'create table index' for the translation table
- And at last open 'Language' and run 'Language Maintenance'/'Add Missing Translations' for all languages used (necessary only if the base table already contains rows)

**Technical Info:** [IDEMPIERE-4858](https://idempiere.atlassian.net/browse/IDEMPIERE-4858)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Create/Complete_Table)_
