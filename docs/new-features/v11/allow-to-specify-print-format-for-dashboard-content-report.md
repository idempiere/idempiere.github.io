---
sidebar_position: 2
title: "Allow to Specify Print Format for Dashboard Content Report"
sidebar_label: "Allow to Specify Print Format for Dashboard Content Report"
description: "**Ticket:** [IDEMPIERE-5490](https://idempiere.atlassian.net/browse/IDEMPIERE-5490)"
tags: [functional]
---
## Allow to Specify Print Format for Dashboard Content Report
**Ticket:** [IDEMPIERE-5490](https://idempiere.atlassian.net/browse/IDEMPIERE-5490)

**Developer:** Peter Takacs, Cloudempiere

**Review:** Heng Sin Low

## Description
After this change, when adding a report to the dashboard by creating a new Dashboard Content, you can define, which Print Format will be used to render the chosen report.

## Changes
A new Print Format field was added to the Dashboard Content.

![Dashboardparameter pformat setup](pathname:///img/new-features/v11/Dashboardparameter-pformat-setup.png)

## How to use
To add a report to the dashboard with a specified Print Format, open the Dashboard Content window and create a new record. The Print
Format field is hidden by default, if will appear only when a Process is selected. After doing so, you can select from the list of Print Formats, which one will be used for this Dashboard Content.

### Note
To render a report in the dashboard, the Embed Report Content field must be checked.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Allow_to_Specify_Print_Format_for_Dashboard_Content_Report)_
