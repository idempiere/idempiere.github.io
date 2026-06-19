---
sidebar_position: 16
title: "Info Window"
sidebar_label: "Info Window"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [functional]
---
**Goal:** Usability

**Contributors:**

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Video:**

[Watch on YouTube](https://www.youtube.com/watch?v=quiG5nlZQ0Y) by Jan.thielemann - [evenos Consulting GmbH](http://evenos-consulting.de)

**Description:**

- Allow definition of info window for any table without any Java coding.
- Allow opening of info window from application menu.
- Allow a field to specify which info window to used.
- Now extended with Process button - [NF3.0_Process_on_Info_Window](https://wiki.idempiere.org/en/NF3.0_Process_on_Info_Window)

## Info Window
![NF001 InfoWindowHeader](pathname:///img/new-features/v1.0/NF001_InfoWindowHeader.png)

1. The table that the info window definition is created for.
1. SQL From clause ( without the FROM keyword ) including any inner and outer join necessary to build the info window result set. To avoid runtime parsing error, you must define a unique alias for each table, use upper case for SQL keyword and always leave space before and after a SQL keyword.
1. Optional static SQL Where clause for this info window ( without the WHERE keyword )
1. Order by clause ( without the ORDER BY keyword ). You must always use fully qualified column name here, for e.g p.M_Product_ID instead of just M_Product_ID.
1. Other SQL Clause, optional. Typical use is for group by.
1. Checked this if SELECT DISTINCT is needed. Note that the use of SELECT DISTINCT will introduce performance overhead.
1. Checked this if this is the default info window for a table. The system will ensured there's only one default info window per table.
1. Run the validate process after you have completed the info window definition ( including all the columns ).

## Info Column
![NF001 InfoWindowInfoColumn](pathname:///img/new-features/v1.0/NF001_InfoWindowInfoColumn.png)

1. System element for this info column. The system will copy all relevant AD_Column setting over if the DB Column Name belongs to one of the table from   the From Clause.
1. Database Column Name. This is used to return selected row's data to the caller context if the display checkbox for this column is set to on.
1. This is used to build the info window's complete SQL select clause if Displayed is set to on. If Query Criteria is set to on then it will be used to build the search clause. Enter a value of 0 if you need a Query Criteria that's only used to update the info window's context variables.
1. Displayed column will be used to build the info window's result grid.
1. Displayed column sequence. Also served as the query criteria column sequence if selection column sequence is set to zero.
1. Query Criteria column will be used to build the info window's query panel.
1. Identifier column will be used to matched against the value that user have entered into the textbox of a search field. For e.g, a product search key that user have enter into a order line's product field.
1. Query criteria column sequence.
1. Display logic for displayed and query criteria column.
1. SQL operator for query criteria column.
1. Optional SQL function for query criteria column. If the SQL function takes more than one argument, use ? as place holder for this column, for e,g "To_Char(?,'DD')"
1. Reference type for this column. Use for both displayed and query criteria.
1. Checked this if name, description and help text should be synchronized with what's defined at the associated system element record.

## Column Display Logic Example
![NF001 InfoWindowColumnDisplayLogic](pathname:///img/new-features/v1.0/NF001_InfoWindowColumnDisplayLogic.png)

## Query Criteria Display Logic Example
![NF001 InfoWindowQueryCriteriaDisplayLogic](pathname:///img/new-features/v1.0/NF001_InfoWindowQueryCriteriaDisplayLogic.png)

## Select Clause Variable Example
![NF001 InfoWindowSQLSelectVariable](pathname:///img/new-features/v1.0/NF001_InfoWindowSQLSelectVariable.png)

## Reference Key Example
- Create table reference
![NF001 InfoWindowReference](pathname:///img/new-features/v1.0/NF001_InfoWindowReference.png)

- As reference key for search field
![NF001 InfoWindowReferenceKey](pathname:///img/new-features/v1.0/NF001_InfoWindowReferenceKey.png)

## Menu Example
![NF001 InfoWindowMenu](pathname:///img/new-features/v1.0/NF001_InfoWindowMenu.png)

**Technical Info:**
[IDEMPIERE-325](http://idempiere.atlassian.net/browse/IDEMPIERE-325)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Info_Window)_
