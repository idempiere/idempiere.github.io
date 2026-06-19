---
sidebar_position: 25
title: "Override Virtual Column Definition in Field"
sidebar_label: "Override Virtual Column Definition in Field"
description: "**Developer:** Igor Pojzl"
tags: [technical]
---
**Goal:** Technical

**Developer:** Igor Pojzl

**Sponsor:** [Cloudempiere](https://www.cloudempiere.com/)

**Description:**

The ColumnSQL used to define virtual columns can be overwritten in the Field definition:

![01 VirtualFieldColumn](pathname:///img/new-features/v8.2/01_VirtualFieldColumn.png)

**Usage and Impact of the different options for Virtual Columns:**

| ColumnSQL in AD_Column | ColumnSQL in AD_Field | Type | Master | Grid | PO.get | Find | Report |
|---|---|---|---|---|---|---|---|
| no prefix | null | Virtual | Y | Y | Y - can impact the database heavily. | Y | Y |
| @SQL= | null | Virtual UI | Y | just on actual row | N | N | N |
| @SQLFIND= | null | Virtual Find | N | N | N | Y | Y |
| null | no prefix | Virtual  in Field | Y | Y | N | N | N |
| @SQLFIND= | no prefix | Virtual Find in Column, Virtual in Field | Y | Y | N | Y | Y |

As shown in the table above, the best combination is to define a [virtual search column](https://wiki.idempiere.org/en/NF7.1_Virtual_Search_Column) at Column level and a normal (no prefix) virtual column at Field level.  This kind of configuration doesn't impact the performance of PO.get and is searchable, shown properly in reports, master and grid mode.

**See also** [NF6.2 Virtual UI Column](https://wiki.idempiere.org/en/NF6.2_Virtual_UI_Column), [NF7.1 Virtual Search Column](https://wiki.idempiere.org/en/NF7.1_Virtual_Search_Column)

**Technical Info:** [IDEMPIERE-4479](https://idempiere.atlassian.net/browse/IDEMPIERE-4479)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Override_Virtual_Column_In_Field)_
