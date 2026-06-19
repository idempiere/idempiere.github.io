---
sidebar_position: 12
title: "Support Quick Info Widget for Info Windows"
sidebar_label: "Support Quick Info Widget for Info Windows"
description: "**Ticket:** [IDEMPIERE-5772](https://idempiere.atlassian.net/browse/IDEMPIERE-5772)"
tags: [functional]
---
**Ticket:** [IDEMPIERE-5772](https://idempiere.atlassian.net/browse/IDEMPIERE-5772)

**Developer:** Peter Takacs, Cloudempiere

**Review:** Carlos Ruiz, Heng Sin Low

## Description
The Quick Info widget can be defined in System, through the Status Line window. The scope of this improvement is to allow to define a Quick Info widget for Info Windows. In order to make it useful, the support of context variables on Info Windows was also included with this feature.

## Application Dictionary Changes
A new Info Window field was added to the *Status Line - Used In* tab. If an Info Window is selected, then the Table, Window and Tab values must be 0.

## Context Variables
With this feature some new context variables were introduced. They can be divided into two groups:

#### 1) Parameters
The info window parameter context is updated, when the Re-Query button is pressed.

In the status line SQL, the parameters can be accessed with the @*ColumnName*@ syntax, e.g. @C_Order_ID@

#### 2) Selected row values
The values of the selected row are updated in the context on every selection. Only one row's values are put into the context at a time. In case of multi-selection, only the last selected row is counted.

In the status line SQL, the row values can be accessed with the @_IWInfo_*ColumnName*@ syntax, e.g. @_IWInfo_C_Order_ID@.

There is a special context variable for listing the ID's of the selected rows, separated by comma (e.g. 100,101,102,103). This variable can be accessed with @_IWInfoIDs_Selected@ syntax. Example usage in a WHERE clause:
 SELECT C_Order_ID
 FROM C_Order
```
WHERE C_Order_ID = ANY(string_to_array('@_IWInfoIDs_Selected@',',')::NUMERIC[])
```

## How to Use:
- in the Message window create a new message, that will be displayed in the Quick Info
- create a new Status Line, and set the new message on it
- define an SQL select, where you can use the context variables, as described above
- in the Used In tab, create a new record and select the desired Info Window

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Support_Quick_Info_Widget_for_Info_Windows)_
