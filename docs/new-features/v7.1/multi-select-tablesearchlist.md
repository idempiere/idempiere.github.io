---
sidebar_position: 8
title: "Multi Select Table/Search/List"
sidebar_label: "Multi Select Table/Search/List"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Developer:** Heng Sin Low

## Description
Now is possible to have window fields, and also report and process parameters that can contain reference to multiple foreign records.

![01 Multi](pathname:///img/new-features/v7.1/01_Multi.png)

## How to Configure
Configuration is very simple, just select in the reference field one of the new three types:
- Chosen Multiple Selection Table
- Chosen Multiple Selection Search
- Chosen Multiple Selection List
And fill the Reference Key properly

![02 HowMulti](pathname:///img/new-features/v7.1/02_HowMulti.png)

## Technical Info
### Normal Reports
The usage in reports is just straight (unless the report has some pre-processing class, in such case you must see below the notes about Processes)

### Jasper Reports
The parameter is passed to Jasper as a String with the record IDs separated by commas.

The Jasper Report must take care of parsing the parameter accordingly.

Example in PostgreSQL:
```SQL

cbp.c_bpartner_id = any(string_to_array($P{param_c_bpartner_id}, ',')::int[]);

```

### Processes
For processes, the parameter is passed a String with the record IDs separated by commas.

The process must take care of splitting and processing the parameters accordingly.

### Windows
When used in windows, take into account that the value is saved in the database as a String with the record IDs separated by commas. *(IMPORTANT: ColumnName can't ending with _ID)*

#### IMPORTANT NOTES
- No foreign key management in the database, it means, is possible to delete the parent record, and the reference will be left orphan, you need to take care of checking this validation, for example in a BeforeDelete developed for the parent table
- The [Copy Client](https://wiki.idempiere.org/en/NF6.2_Copy_Client) functionality doesn't manage this foreign keys, you need to take care about processing this extra foreign keys, for  example in a Pre or PostProcess for this process

### Link to JIRA Ticket
[IDEMPIERE-3413](https://idempiere.atlassian.net/browse/IDEMPIERE-3413)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Multi_Select)_
