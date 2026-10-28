---
sidebar_label: Export Calculations as Excel Formulas
sidebar_position: 6
description: Export report calculations and subtotals as dynamic Excel SUBTOTAL formulas instead of static values in XLS and XLSX exports.
tags:
  - functional
  - user-experience
applies_to: ">=14"
last_reviewed: "2026-10-28"
---

# Export report calculations as Excel formulas

:::warning Not Yet in Stable Release

This feature is not yet part of a stable iDempiere release and may change.

:::

**Goal:** Functional  
**Developer:** [Heng Sin Low](https://github.com/hengsin)  
**Feature Ticket:** [IDEMPIERE-7160](https://idempiere.atlassian.net/browse/IDEMPIERE-7160)  
**Version:** iDempiere 14

## The problem

When users generate reports in iDempiere and export them to Excel (`.xls` or `.xlsx`), calculated rows such as group subtotals and report grand totals are exported as static values.

If users adjust numbers in the exported spreadsheet for forecasting, auditing, or corrections, the totals do not update automatically. Users must manually recreate the formulas in Excel.

## What changed

iDempiere adds an option to export calculation rows as dynamic Excel formulas instead of static values.

When enabled:

- Group subtotal rows export as Excel `SUBTOTAL` formulas that reference the detail rows within their respective group.
- Grand total rows export as Excel `SUBTOTAL` formulas that span the entire data range. Because Excel's `SUBTOTAL` function automatically ignores other nested `SUBTOTAL` cells within its range, grand totals calculate correctly without double-counting intermediate group subtotals.
- The exporter writes the computed value as the initial cached cell value so spreadsheets display results immediately when opened.

### Supported functions

The exporter maps iDempiere print functions to corresponding Excel `SUBTOTAL` function codes:

| Calculation | Print data function | Excel formula |
| --- | --- | --- |
| Sum | `PrintDataFunction.F_SUM` | `SUBTOTAL(9, <range>)` |
| Count | `PrintDataFunction.F_COUNT` | `SUBTOTAL(3, <range>)` (`COUNTA`) |
| Minimum | `PrintDataFunction.F_MIN` | `SUBTOTAL(5, <range>)` |
| Maximum | `PrintDataFunction.F_MAX` | `SUBTOTAL(4, <range>)` |
| Average | `PrintDataFunction.F_MEAN` | `SUBTOTAL(1, <range>)` |
| Deviation | `PrintDataFunction.F_DEVIATION` | `SUBTOTAL(8, <range>)` (`STDEVP`) |
| Variance | `PrintDataFunction.F_VARIANCE` | `SUBTOTAL(11, <range>)` (`VARP`) |

### Scope and limitations

The exporter falls back to static values in the following cases:

- **Forms**: Document forms (such as Sales Orders or Invoices) continue to export static values.
- **Multiple group by columns**: Reports with more than one Group By item export static values.
- **Summary reports**: Reports configured as summary-only omit detail rows, so formulas cannot reference the underlying data.
- **Items with Suppress Repeats or Display Logic**: If a print format item uses **Suppress Repeats** or defines **Display Logic**, detail rows may be hidden, which would cause Excel formulas to calculate a different total from the printed report.
- **Page breaks across grand totals**: Grand total rows that cross page breaks fall back to static values to avoid invalid ranges.
- **Non numeric field**: Non numeric field such as Date continue to export static values.

## How to set it up

1. Open the **System Configurator** window as System Administrator or Tenant Administrator.
2. Search for the `EXPORT_EXCEL_FUNCTION` configuration key, or create a new record.
3. Set **Configuration Level** to `Client` (Tenant) or `System`.
4. Set **Value** to `Y`.
5. Run any tabular report that includes subtotals or grand totals in its print format.
6. Export the report to Excel (`.xls` or `.xlsx`). Open the spreadsheet to view the dynamic `SUBTOTAL` formulas in calculation cells.

## Configuration

| System Configurator key | Default | Level | What it does |
| --- | --- | --- | --- |
| `EXPORT_EXCEL_FUNCTION` | `N` | Client | When set to `Y`, exports report calculations as dynamic Excel `SUBTOTAL` formulas instead of static values. |

## Technical notes

- Added utility class `org.adempiere.impexp.ExcelSubtotalFunction` to provide Excel `SUBTOTAL` function codes and build column-range formulas.
- Added `org.adempiere.print.export.PrintDataExcelFunctionHelper` to evaluate `PrintData` function rows and map `PrintDataFunction` types to Excel function codes.
- `AbstractExcelExporter` and `AbstractXLSXExporter` check `MSysConfig.EXPORT_EXCEL_FUNCTION` and evaluate `isFunctionRow`, `getFunctionType`, and `isTotalRow` to set cell formulas with `cell.setCellFormula(formula)`.
- `PrintData` tracks function rows and total rows via overloaded methods `addRow(int levelNo, char functionType)` and `addRow(int levelNo, char functionType, boolean totalRow)`.

## Related tickets

- [IDEMPIERE-7160](https://idempiere.atlassian.net/browse/IDEMPIERE-7160) - Report: Add option for export of calculation as Excel formula cell
- [IDEMPIERE-7157](https://idempiere.atlassian.net/browse/IDEMPIERE-7157) - Add AD_SysConfig option for the rendering of report parameters in Excel format
