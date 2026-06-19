---
sidebar_position: 42
title: "Custom Query Clause for Report Parameter"
sidebar_label: "Custom Query Clause for Report Parameter"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4904](https://idempiere.atlassian.net/browse/IDEMPIERE-4904)

**Description:**
1. Add AD_Process_Para.Query column
1. Developer will enter custom query clause with context variable to the AD_Process_Para.Query field
1. When preparing for the execution of the reports, if AD_Process_Para.Query is not empty, the AD_Process_Para.Query value will be parsed (usually with context variable to take values from process parameter values enter by user) to generate sql clause (instead of the usual &lt;columnName&gt;=&lt;user enter value&gt; sql clause).
1. When AD_Process_Para.Query is empty, there’s no impact to existing flow/logic.

## Usage of New Features
1. Report/Process Window
1. * For report type proces
1. * Enter SQL filter into the "Query" column at process parameter tab.

## Example Screen Shot
![4904 Process Parameter](pathname:///img/new-features/v9/4904_Process_Parameter.png)

_Report parameter query field example_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Custom_Query_Clause_For_Report_Parameter)_
