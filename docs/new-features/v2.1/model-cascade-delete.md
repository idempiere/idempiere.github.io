---
sidebar_position: 35
title: "Model Cascade Delete"
sidebar_label: "Model Cascade Delete"
description: "iDempiere allows to define foreign key constraints on database.  In addition to the options implemented with [DB Objects in Dictionary](https://wiki.id"
tags: [technical]
---
**Goal:** Technical

**Description:**

iDempiere allows to define foreign key constraints on database.  In addition to the options implemented with [DB Objects in Dictionary](https://wiki.idempiere.org/en/NF2.0_DB_Objects_in_Dictionary#Foreign_Keys), a new option for Model Cascade has been implemented, so the new list is as follows:

- ***No Action:*** This is the default, when the parent record is deleted it will throw an exception if there are child records
- ***Do Not Create:*** Do not create this constraint, not recommended, it can lead to data errors, the parent can be deleted without any notice leaving orphan children in the database
Also to change the behavior on children records you can use:
- ***Cascade:*** When the parent record is deleted then the child records on this constraint will be deleted too (if possible) - this constraint is executed in the database, consequently the business model rules are not triggered (workflows, changelog, etc)
- ***Model Cascade:*** When the parent record is deleted then the child records on this constraint will be deleted too (if possible) - this constraint is executed within iDempiere, so all business model rules are applied.
- ***Set Null:*** When the parent record is deleted then the child records on this constraint will set to null (if possible)

![01 ModelCascadeDelete](pathname:///img/new-features/v2.1/01_ModelCascadeDelete.png)

**Technical Info:** [IDEMPIERE-2060](http://idempiere.atlassian.net/browse/IDEMPIERE-2060)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Model_Cascade_Delete)_
