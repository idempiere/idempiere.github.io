---
sidebar_position: 7
sidebar_label: "Financial Report : Exclude all adjustment periods"
description: "**Developer:**  Nicolas Micoud"
tags: [functional]
---
# Financial Report : Exclude all adjustment periods

**Goal:** Functional

**Developer:**  Nicolas Micoud

**Feature Ticket:** [IDEMPIERE-4721](https://idempiere.atlassian.net/browse/IDEMPIERE-4721)

**Sponsor:** [T.G.I.](https://tgi.eu) and [Rubric](http://rubric.com)

**Description:**

Until v8.2, financial reports were excluding the last adjustement period if it ends on the same day as the period selected for the report.
Now is possible to exclude all adjustement periods from the report (or to keep them all).

Simply set the desired value to the new added field "Exclude Adjustment Periods" :
- No
- Only Report Period
- All Adjustment Periods

![FinReportExcludeAdjustmentPeriod](pathname:///img/new-features/v8.2/FinReportExcludeAdjustmentPeriod.png)
