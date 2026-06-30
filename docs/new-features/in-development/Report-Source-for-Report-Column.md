---
title: Support Report Source in Report Columns and Add User1/User2 as Report Sources
sidebar_label: Report Source in Report Columns
sidebar_position: 4
description: Support Report Source in Report Columns and Add User1/User2 as Report Sources
---

:::warning Not Yet in Stable Release
This feature is not yet part of a stable iDempiere release and may change.
:::
**Goal:** Functional
**Developer:** [Deepak Pansheriya](https://wiki.idempiere.org/en/User:Dpansheriya) ([Logilite Technologies](https://www.logilite.com))  
**Feature Ticket:** [IDEMPIERE-4069](https://idempiere.atlassian.net/browse/IDEMPIERE-4069)

## Support Report Source in Report Columns and Add User1/User2 as Report Sources

## Overview

This enhancement extends the Financial Report engine by introducing additional Report Source options and allowing Report Sources to be used in **Report Columns** in addition to **Report Lines**.

The enhancement enables creation of dynamic cross-tab financial reports, such as comparisons by:

- Cost Center
- Department
- Business Unit
- Campaign
- Project
- User Element 1 (User1)
- User Element 2 (User2)

without requiring custom SQL or multiple report definitions.

---

## Existing Limitation

Prior to this enhancement:

- Report Source could only be configured on **Report Lines**.
- Report Columns supported only fixed calculation types.
- Creating reports that compare values across Cost Centers or Departments required multiple report definitions or customizations.

For example, creating a report like:

| Account | Marketing | Admin | Balance | Total |
|----------|-----------|-------|----------|-------|

was not possible using the standard Financial Report engine.

---

## Enhancement

### 1. Report Source support in Report Columns

Report Columns now support **Report Source** similar to Report Lines.

This allows the report engine to dynamically generate one column for each value of the selected Report Source.

Supported Report Sources include:

- Organization
- Account
- Business Partner
- Product
- Project
- Campaign
- Activity
- Sales Region
- User1
- User2
- Cost Center (through User Elements)

This enables true cross-tab style financial reporting.

---

### 2. Support User1 and User2 as Report Sources

User1 and User2 are now available as selectable Report Sources.

Organizations commonly use these dimensions for:

- Department
- Cost Center
- Division
- Profit Center
- Region
- Custom Accounting Dimensions

This enhancement allows financial reports to be grouped dynamically using these dimensions.

---

## Example

The example report shown in the ticket demonstrates a financial report that compares balances by **Cost Center** (e.g., **Marketing** and **Admin**).

Reference:
https://idempiere.atlassian.net/browse/IDEMPIERE-4069

In this example:

- Each **Cost Center** is rendered as a dynamic report column.
- Financial accounts continue to be displayed as report lines.
- The **Balance** and **Total** columns retain their existing behavior and calculations.
- The resulting output is a cross-tab style financial report, allowing side-by-side comparison of balances across Cost Centers without requiring multiple report definitions or custom SQL.

---

## Typical Use Cases

### Department-wise Profit & Loss

| Account | HR | Sales | Finance | Total |
|----------|----|--------|----------|-------|

---

### Cost Center Comparison

| Account | Marketing | Admin | Production | Total |
|----------|------------|-------|------------|-------|

---

### Project Comparison

| Account | Project A | Project B | Project C |
|----------|------------|-----------|-----------|

---

### User1 / User2 Analysis

Organizations using User Elements can compare financial information by:

- Department
- Profit Center
- Branch
- Business Unit
- Custom Dimensions

without additional report definitions.

---

## Benefits

- Dynamic cross-tab financial reports.
- Eliminates duplicate report definitions.
- No custom SQL required.
- Supports organization-specific accounting dimensions.
- Improves financial analysis and comparison reporting.
- Reuses the existing Financial Report engine.

---

## Backward Compatibility

This enhancement is fully backward compatible.

Existing Financial Reports continue to function without modification.

The new functionality is available only when Report Source is configured on Report Columns.

---

## Notes

- Report Source behavior in Report Columns is consistent with Report Lines.
- Existing calculation logic remains unchanged.
- User1 and User2 are supported wherever Report Sources are available.
- Dynamic columns are generated based on the selected accounting dimension values.
