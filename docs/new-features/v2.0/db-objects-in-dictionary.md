---
sidebar_position: 15
title: "DB Objects in Dictionary"
sidebar_label: "DB Objects in Dictionary"
description: "**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)"
tags: [technical]
---
**Goal:** Technical

**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)

**Description:**

## Indexes
Now you can define and maintain database indexes directly in the dictionary.

On the first tab you must fill the index name, if you make the index unique you can select a message to show when the uniqueness is broken.

On the second tab you can define the columns that compose the window, including also

![NF20Index01](pathname:///img/new-features/v2.0/NF20Index01.png)

The button *Index Validate* creates or recreates the index in the database

![NF20Index02](pathname:///img/new-features/v2.0/NF20Index02.png)

There is also a new process in menu called *Create Table Index* which takes the DB definition and create the index in dictionary.

![NF20CreateTableIndex](pathname:///img/new-features/v2.0/NF20CreateTableIndex.png)

## Views
Now you can define and maintain views directly in the dictionary.

For a view you can define components (separate select portions concatenated using UNION).  Each component allows you to define the column views.

![NF20ViewComponents](pathname:///img/new-features/v2.0/NF20ViewComponents.png)

Once your view is defined/modified you can create/recreate the view using the button *View Validate*

![NF20ViewValidate](pathname:///img/new-features/v2.0/NF20ViewValidate.png)

**In the View component tab when you fill the "SQL FROM" and "SQL WHERE" fields, the FROM and WHERE words have to start the sentence. Otherwise, you will get an error**

## Foreign Keys
Now you can define the foreign key rules for table related columns database indexes directly in the dictionary.

The Constraint Type options will modify the behavior of the constraint this way:
- No Action: This is the default, when the parent record is deleted it will throw an exception if there are child records
- Cascade: When the parent record is deleted then the child records on this constraint will be deleted too (if possible)
- Set Null: When the parent record is deleted then the child records on this constraint will set to null (if possible)
- Do Not Create: Do not create this constraint, not recommended, it can lead to data errors

![NF20Constraint](pathname:///img/new-features/v2.0/NF20Constraint.png)

**Technical Info:** [IDEMPIERE-1132](http://idempiere.atlassian.net/browse/IDEMPIERE-1132)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.0_DB_Objects_in_Dictionary)_
