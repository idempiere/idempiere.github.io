---
sidebar_position: 4
title: "Export SQL Insert Scripts"
sidebar_label: "Export SQL Insert Scripts"
description: "**Goal:** UX/Functional"
tags: [functional]
---
**Goal:** UX/Functional

**Developer:** Hengsin

**Feature** **Ticket:** [IDEMPIERE-5624](https://idempiere.atlassian.net/browse/IDEMPIERE-5624)


### Description
- Add **zip - SQL Insert scripts zip archive** option to the Export dialog.
- The new export type will export data as SQL insert scripts and create a zip file that includes Oracle and PostgreSQL (oracle/*.sql and postgresql/*.sql) scripts.
- ID value is exported as integer value for official ID and as nextfunc (for primary key) or toRecordId(for foreign key) for non official ID.

### Export Dialog
- New option added to export dialog open from the Export toolbar button.
![SQL Insert Scripts Export Types](pathname:///img/new-features/v11/SQL_Insert_Scripts_Export_Types.png)

_SQL Insert Scripts Export Types_

### SQL Export Type Options
- With **Export current row only** turn on, user can choose to select the immediate child tabs as part of the exported zip archive.

![Export Current Row to SQL Insert Scripts](pathname:///img/new-features/v11/Export_Current_Row_to_SQL_Insert_Scripts.png)

_Export Current Row to SQL Insert Scripts_

- When **Export current row only** is turn off (i.e all rows), only current header tab will be exported to the zip archive.

![Export All Rows to SQL Insert Scripts](pathname:///img/new-features/v11/Export_All_Rows_to_SQL_Insert_Scripts.png)

_Export All Rows to SQL Insert Scripts_

### Security
- Accessible to Advanced Role only
- Skip column that's secure, encrypted or with the name **password**

### Limitations
The exporter doesn't handle binary type (image, blob, etc).

### Sample Export Files
Attached to https://idempiere.atlassian.net/browse/IDEMPIERE-5624:
- Orders.zip - With **Export current row only** off.
- OrderAndLines.zip - With **Export current row only** on and Order Lines selected.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Export_SQL_Insert_Scripts)_
