---
sidebar_position: 2
title: "Implement notation @SQL for display logic"
sidebar_label: "Implement notation @SQL for display logic"
description: "**Developer:** Hieplq"
tags: [functional]
---
**Goal:** Technical

**Developer:** Hieplq

**Description:**

It is possible to base a display logic on a sql query, according to its result.
No row returned means false, it won't be displayed
Otherwise is true and it will be displayed

A nice feature is the use of ! which reverse the result (no row means true).

As an example, you can check the logic used on 'Web Service Security' > Web Service Type > InsertParameters ; is a button displayed only when there is no records in the parameters tabs.

@SQL=!SELECT 1 FROM WS_WebService_Para WHERE WS_WebServiceType_ID = @WS_WebServiceType_ID:0@

*nb: the :0 is here to handle null cases (see IDEMPIERE-194)*

**Technical Info:** [IDEMPIERE-3917](https://idempiere.atlassian.net/browse/IDEMPIERE-3917)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_@SQL_notation_for_display_logic)_
