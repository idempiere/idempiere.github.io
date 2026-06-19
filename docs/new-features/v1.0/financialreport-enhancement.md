---
sidebar_position: 9
title: "Financial Report Enhancement"
sidebar_label: "Financial Report Enhancement"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

1. Add include no transaction source account option for the existing list source accounts flag.
1. Add percentage calculation for column value against calculated line value.

## Include No Transaction Sources
![NF001 FinancialReport ListSourcesXTrx](pathname:///img/new-features/v1.0/NF001_FinancialReport_ListSourcesXTrx.png)

- New Flag added for the "List Sources" flag. When checked, the generated report will include sources account that have no transaction.
:

![NF001 ListSourcesXTrx Sample](pathname:///img/new-features/v1.0/NF001_ListSourcesXTrx_Sample.png)

## Percentage for column value against calculated line value
### Single Line Value
![NF001 ReportColumn PercentageOfLine Single](pathname:///img/new-features/v1.0/NF001_ReportColumn_PercentageOfLine_Single.png)

- One report line name for operand 2. The percentage calculation will get the operand 2 value from the report line that match the value in "Operand 2 Line Name" instead of from the same report line.

- Sample:

![NF001 Single Percentage Sample](pathname:///img/new-features/v1.0/NF001_Single_Percentage_Sample.png)

### Multiple Line Value
![NF001 ReportColumn PercentageOfLine Multi](pathname:///img/new-features/v1.0/NF001_ReportColumn_PercentageOfLine_Multi.png)

- Multiple report line name for operand 2, separated by comma. For each report line name, it defines the report line that the operand 2 value should comes from and the range of line included for the percentage calculation.

- Sample ( red is the "Sales" range and blue is the "COGS" range ):

![NF001 Multi Percentage Example](pathname:///img/new-features/v1.0/NF001_Multi_Percentage_Example.png)

**Technical Info:** [IDEMPIERE-673](http://idempiere.atlassian.net/browse/IDEMPIERE-673) [IDEMPIERE-674](http://idempiere.atlassian.net/browse/IDEMPIERE-674) [IDEMPIERE-726](http://idempiere.atlassian.net/browse/IDEMPIERE-726)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_FinancialReport_Enhancement)_
