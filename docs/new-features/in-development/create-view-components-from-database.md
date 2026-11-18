---
sidebar_label: Create View Components from Database
sidebar_position: 5
description: Create the View Components and View Columns of a view table from the view definition that already exists in the database.
tags:
  - technical
  - development
applies_to: ">=14"
last_reviewed: 2026-11-17
---

# Create view components from a database view

:::warning Not Yet in Stable Release

This feature is not yet part of a stable iDempiere release and may change.

:::

**Goal:** Technical  
**Developer:** [Diego Ruiz](https://github.com/d-ruiz/) ([BX Service GmbH](https://www.bx-service.com/))  
**Feature Ticket:** [IDEMPIERE-7213](https://idempiere.atlassian.net/browse/IDEMPIERE-7213)  
**Version:** iDempiere 14

## The problem

A database view in iDempiere can be defined in the Application Dictionary with View Components and View Columns. The *View Validate* process then creates or replaces the view in the database from that definition.

Many views only exist in the database. They were created by SQL migration scripts, by hand or by other tools. To maintain such a view from the dictionary, every View Component and View Column had to be typed in by hand, copying the SQL piece by piece.

## What changed

A new process, *Create View Components from Database*, does the opposite of *View Validate*. It reads the definition of the view from the database and creates the dictionary records for it.

- It is available as a toolbar button on the Table and Column window => Table tab. The button is shown only when the View checkbox is selected on the record.
- The process is for the System role (access level System).
- It looks for a database view whose name is the DB Table Name of the current record. The comparison ignores case.
- It creates one View Component for each `SELECT` of the view. Several `SELECT` statements joined with `UNION` or `UNION ALL` become several components, with Union All set on the components after the first.
  - Name: the DB Table Name followed by the sequence, for example `RV_MyView-010`, `RV_MyView-020`.
  - Sequence: 10, 20, 30.
  - Distinct, From Clause, Where Clause and Other Clause (`GROUP BY`, `HAVING`, `ORDER BY` and similar) are filled from the SQL.
- It creates one View Column for each column of the view, with the Column Name and the Column SQL (the expression without its alias). The Column Name takes the case of the matching Column or System Element when one exists in the dictionary.
- Optionally, it runs the existing *Create Columns from DB* process for the same table, so the Columns of the view table are also ready to use.
- All records are created in one transaction. If any step fails, nothing is saved.

## How to set it up

1. Log in with the System Administrator role.
2. Open the Table and Column window.
3. Select the table of the view, or create a new record with the View checkbox selected and the DB Table Name set to the name of the database view.
4. Click the *Create View Components from Database* toolbar button.
5. Set the parameters (see below) and click OK.
6. Check the result in the Table and Column window => View Component tab and its View Column subtab.
7. Optionally, run *View Validate* to recreate the view from the new dictionary records and confirm it still works.

### Parameters

| Parameter | Default | What it does |
| --- | --- | --- |
| Delete existing view components | No | When selected, the existing View Components and View Columns of the table are deleted before the new ones are created. When not selected, the process stops with an error if the table already has View Components. |
| Create Columns from DB | Yes | When selected, the *Create Columns from DB* process runs afterwards for the same table and creates the Columns that are missing. |
| Remove PostgreSQL casts | Yes | Shown only on PostgreSQL. When selected, all the type casts (`::type`) are removed, so the definition can also be used on Oracle. The process log lists, for each View Component, the View Columns and clauses where casts were removed. When not selected, the definition is kept exactly as PostgreSQL returns it. |

## Known limitations

- Only views made of `SELECT` statements, optionally joined with `UNION` or `UNION ALL`, can be converted. The process stops with an error, and creates nothing, when the view uses:
  - a `WITH` clause (common table expression)
  - `INTERSECT`, `EXCEPT` or `MINUS`
  - `SELECT DISTINCT ON`
  - `SELECT *` or `alias.*` in the column list
  - a `SELECT` without `FROM`
  - a `UNION` nested inside parentheses
- Only views in the iDempiere database schema are searched.
- Materialized views are not found, because only regular views are searched.
- Every `SELECT` of the view must return the same number of columns as the view.
- The process reads the definition that the database stores, not the original script. Comments and the original formatting are lost.
- PostgreSQL returns the definition in its own normalized form: identifiers in lower case, extra parentheses and type casts (`::type`) that were not in the original SQL. Oracle does not accept `::type`.
- With *Remove PostgreSQL casts* selected:
  - All casts are removed, but some of them are needed on PostgreSQL itself, for example `lpad(x::text, 2, '0')` when `x` is a number, or a cast that sets the data type of a view column, such as `(...)::date`. Check the places listed in the process log and rewrite them in a form that works on both databases, for example `CAST(x AS VARCHAR(10))` or `TO_DATE(...)`.
  - A column that is only a typed `NULL`, for example `NULL::character varying`, becomes `NULL` with the DB Data Type set, for character and numeric columns. *View Validate* then creates it as `NULLIF('a','a')` or `NULLIF(1,1)`, which keeps the data type on both databases.
- With *Remove PostgreSQL casts* not selected, the definition only works on PostgreSQL. A typed `NULL` is kept in the Column SQL, for example `NULL::character varying`, without DB Data Type.
- When a clause or a column expression is longer than the From Clause, Where Clause, Other Clause or Column SQL field allows, the process stops with an error instead of cutting the SQL.
- The column names come from the database, in the order of the view columns.
- *Create Columns from DB* only adds the Columns that are missing in the table. It creates a System Element for column names that have none, with the Entity Type of the table.

## Technical notes

- Process class: `org.compiere.process.DatabaseViewImport`. The logic is also available as the static method `DatabaseViewImport.importDatabaseView(Properties ctx, MTable table, boolean deleteOld, boolean createColumns, boolean removeCasts, String trxName, ProcessInfo pi)`, which runs in the transaction passed by the caller.
- The SQL is split by `org.compiere.process.ViewDefinitionParser`. It has no database access.
- The view definition is read with `pg_get_viewdef` on PostgreSQL and from `ALL_VIEWS.TEXT` on Oracle.
- The *Create Columns from DB* process is called through the new constant `SystemIDs.PROCESS_AD_TABLE_CREATECOLUMNS`.
- The casts are removed by `ViewDefinitionParser.removeCasts(String)`, which ignores text inside string literals and quoted identifiers.
- New messages: `ViewNotFoundInDB`, `ViewDefinitionNotSupported` and `ViewCastsRemoved`.

## Migration impact

None. The feature adds a new process and a toolbar button. Existing behavior does not change.

## Related tickets

- [IDEMPIERE-7213](https://idempiere.atlassian.net/browse/IDEMPIERE-7213)
