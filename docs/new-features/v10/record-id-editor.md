---
sidebar_position: 19
title: "Record ID Editor"
sidebar_label: "Record ID Editor"
description: "**Goal:** UX/Functional"
tags: [functional]
---
**Goal:** UX/Functional

**Developer:** cloudempiere, Takacs Peter, Design: Norbert Bede

**Review:** Hengsin Low, Carlos Ruiz

**Feature** **Ticket:** [IDEMPIERE-5238](https://idempiere.atlassian.net/browse/IDEMPIERE-5238)

**Improvement**

![Example](pathname:///img/new-features/v10/Example.gif)

_usage of record id editor_

The Record ID field type allows two actions - select Table and Record, and zoom to the selected record. If you click on the Edit button, a popup appears that can display 3 fields. The first is the current opened record.

The second is the Table selection. After selecting a table, the third field appears where you can select a record from the selection based on the chosen Table. You can not select a record without a Table. After a Table and a Record is selected, you can apply the changes with the ok button, then save it.

**Changes**

When creating or modifying a Window, the AD_Table_ID field is always set to read only before saving, when it's used with Record_ID. The AD_Table_ID can be modified only from the Record_ID dialog.

**Setup**

The Record ID editor can be used on tables which has both AD_Table_ID and Record_ID columns. In this case you can set the Reference field to "Record ID" on the Record_ID Column of the given Table in System.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Record_ID_Editor)_
