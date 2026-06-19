---
sidebar_position: 32
title: "Create Fields Improvement"
sidebar_label: "Create Fields Improvement"
description: "When you run the **Create Fields** process from the Tab tab in the Window, Tab and Field window, you now have two parameters. The new parameters allow "
tags: [technical]
---
**Goal:** Technical

**Description:**

When you run the **Create Fields** process from the Tab tab in the Window, Tab and Field window, you now have two parameters. The new parameters allow you to create the fields only for a specific entity type and/or to only create fields which were added to the columns (window: Table and Column) since a specific date.

![Create fields new param](pathname:///img/new-features/v2.1/Create_fields_new_param.png)

**Example:**
- Run the Create Columns from DB process in the Table and Column window. Chose Dictionary, Application or something as the entity type
- Create your own column in the DB
- Run the Create Columns from DB process in the Table and Column window. Chose User Maintained as the entity type
- Run the Create Fields process in Window, Tab and Field and chose User Maintained as the entity type
- Only your one field get's added to the Tab. The old behaviour would be to add all columns which were added to your table.

**Reason:**
The reason behind this is, that many default tables have more columns in the DB than they have in iDempiere (window: Table and Column). Therefore when you add a new field to one of the default tables and create the columns from the db, you may end up having 10 new columns. If you then generate the fields, you would have 10 new fields.

**Technical Info:** [IDEMPIERE-1851](http://idempiere.atlassian.net/browse/IDEMPIERE-1851)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Create_Fields_Improvement)_
