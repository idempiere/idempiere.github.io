---
sidebar_position: 20
title: "Constraint Type for RecordID and UU"
sidebar_label: "Constraint Type for RecordID and UU"
description: "**Developer**: cloudempiere, Takacs Peter"
tags: [technical]
---
**Developer**: cloudempiere, Takacs Peter

**Design**: Carlos Ruiz/Norbert Bede

**Review**: Carlos Ruiz, Heng Sin Low

**Feature Ticket**: https://idempiere.atlassian.net/browse/IDEMPIERE-5683

The purpose of this improvement is to avoid storing IDs of deleted records in the Record_ID column. To achieve this, multiple model constraints were defined, which can be set on all AD_Column with Reference: Record ID.

Example use case:

You want to delete a sales order record, but it is already references from AD_WF_Activity.Record_ID. You can log in to System, navigate to AD_WF_Activity table -> Record_ID column and choose a Constraint Type from the available choices:

**Do Not Create - Ignore**

the ID of the deleted record (sales order in this case) will stay stored on all the referencing records (AD_WF_Activity in this case)

**Model Cascade**

all which refer to the deleted record, will be deleted too (in our case, the AD_WF_Activity will be deleted)

**Model No Action - Forbid Deletion**

you will not be able to delete the record (in our case the sales order), if any referencing records exist

**Model Set Null**

on all referencing records the Record_ID column will be cleared (set to NULL)

**Technical:** The record constraints will be only activated when deleting through java model classes (through PO.java).

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Constraint_Type_for_RecordID_and_UU)_
