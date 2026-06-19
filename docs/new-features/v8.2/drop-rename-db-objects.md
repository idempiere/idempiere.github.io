---
sidebar_position: 5
title: "Drop Rename DB Objects"
sidebar_label: "Drop Rename DB Objects"
description: "**Goal:** Development - Usability"
tags: [functional]
---
**Goal:** Development - Usability

**Developer:** Carlos Ruiz

**Description:**

Five new processes have been added to allow some operations directly in the database without the need to open a DB manager (like DBeaver or pgadmin).

## New Process in Table tab
![01 TableProcesses](pathname:///img/new-features/v8.2/01_TableProcesses.png)

## Rename Table
This process allows to rename a table in the database, it also changes the table name in the dictionary record, and changes the _ID and _UU columns correspondingly.

![02 RenameTable](pathname:///img/new-features/v8.2/02_RenameTable.png)

At the end it shows the SQL statements executed to rename the table and the associated columns.

![03 RenameTableResult](pathname:///img/new-features/v8.2/03_RenameTableResult.png)

## Drop Table
This process allows to drop a table in the database.

As the process is destructive, it requires a confirmation parameter, and also another confirmation is required if the table has already data.

![04 DropTable](pathname:///img/new-features/v8.2/04_DropTable.png)

## New Processes in Column tab
![05 ColumnProcesses](pathname:///img/new-features/v8.2/05_ColumnProcesses.png)

## Drop Column
This process allows to drop a column in the database.

As the process is destructive, it requires a confirmation parameter, and also another confirmation is required if the column has already data (not null).

![06 DropColumn](pathname:///img/new-features/v8.2/06_DropColumn.png)

## Drop Constraint
This process allows to drop a constraint in the database.

![07 DropConstraint](pathname:///img/new-features/v8.2/07_DropConstraint.png)

## New Process in Element tab
![08 ElementProcess](pathname:///img/new-features/v8.2/08_ElementProcess.png)

## Rename Column(s)
This process allows to rename a column in the database, it changes all the columns associated in all tables using the element.

NOTE the process to rename columns in views is not implemented, so that operation is forbidden.

![09 RenameColumns](pathname:///img/new-features/v8.2/09_RenameColumns.png)

At the end it shows the SQL statements executed to rename all the columns found in the different tables.

![10 RenameColumnsResult](pathname:///img/new-features/v8.2/10_RenameColumnsResult.png)

**Technical Info:** [IDEMPIERE-4358](https://idempiere.atlassian.net/browse/IDEMPIERE-4358)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Drop_Rename_DB_Objects)_
