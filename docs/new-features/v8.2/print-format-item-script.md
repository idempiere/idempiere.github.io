---
sidebar_position: 10
title: "Print Format Item Script"
sidebar_label: "Print Format Item Script"
description: "**Developers:** Murilo Habermann Torquato, Igor Pojzl"
tags: [functional]
---
**Goal:** Functional

**Developers:** Murilo Habermann Torquato, Igor Pojzl

## Description
Now you can do numeric calculations over the columns of a print format, and even execute SQL to obtain values to print.

The new Format Type = Script let you define the calculation in the new field Script:

### Column Calculation
You can use the variable @COL/column_name@ to indicate a column in the calculation, for example @COL/T_Integer@ means the column with name T_Integer in the report:

![01 Script Column](pathname:///img/new-features/v8.2/01_Script_Column.png)

The script is calculated using beanshell, you can use normal numeric operators supported by beanshell.

### Running Total (Accumulate)
In a similar way, for example if you want to print a running total for the column T_Amount, you can use the variable @ACCUMULATE/T_Amount@ in the calculation:

![02 Script Accumulate](pathname:///img/new-features/v8.2/02_Script_Accumulate.png)

Note you can combine accumulate and column in the same formula.

### SQL
And also you can use @SQL= to define an arbitrary SQL to print a column:

![03 Script SQL](pathname:///img/new-features/v8.2/03_Script_SQL.png)

##### See also: [How To: Using Print Format Item Scripts In Reports](https://wiki.idempiere.org/en/How_To:_Using_Print_Format_Item_Scripts_In_Reports)
## Note about Security
Please note that the beanshell is too powerful but also too dangerous, the field could be misused for SQL Injection, exposing database sensitive information, or even running scripts in the operating system.

That's why the script field is protected, just to be configured by advanced roles.

## Technical Info
[IDEMPIERE-4709](https://idempiere.atlassian.net/browse/IDEMPIERE-4709)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Print_Format_Item_Script)_
