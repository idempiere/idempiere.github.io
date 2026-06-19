---
sidebar_position: 37
title: "Parent Composite Keys"
sidebar_label: "Parent Composite Keys"
description: "Previously, in order to create a composite key you needed to define all composite columns as parent, but that didn't work properly.  Now you can define"
tags: [technical]
---
**Goal:** Technical

**Description:**

Previously, in order to create a composite key you needed to define all composite columns as parent, but that didn't work properly.  Now you can define composite keys in a table directly from the "Table Index" tab.

There are three flags related to the constraint creation:
- ***Create Constraint:*** Defines if a constraint is created on the table based on the defined index
- ***Unique:*** This is a unique constraint
- ***Key column:*** This is a primary key constraint

If you define multiple columns for the index then your constraint is composite.

This is now REQUIRED for translation tables.

![01 CompositeKeys](pathname:///img/new-features/v2.1/01_CompositeKeys.png)

**Technical Info:** [IDEMPIERE-1901](http://idempiere.atlassian.net/browse/IDEMPIERE-1901)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Composite_Keys)_
