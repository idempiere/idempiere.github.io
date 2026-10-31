---
sidebar_label: Report Parameters in Excel Export
sidebar_position: 6
description: Configure whether report parameters are rendered in Excel exports via System Configurator and User Preference.
tags:
  - functional
  - user-experience
applies_to: ">=14"
last_reviewed: 2026-10-28
---

# Report parameters in Excel Export

**Goal:** Usability  
**Developer:** [Heng Sin Low](https://github.com/hengsin) ([TrekGlobal](https://www.trekglobal.com/))  
**Feature Ticket:** [IDEMPIERE-7157](https://idempiere.atlassian.net/browse/IDEMPIERE-7157)  
**Version:** iDempiere 14

## The problem

When exporting reports to Excel (`.xls` or `.xlsx`), iDempiere automatically inserts the applied report parameters and filter criteria into the top header rows above the data table.

For users who use exported spreadsheets with pivot tables, formulas, or third-party data processing tools, these extra parameter rows require manual cleanup before the table columns can be processed. Previously, there was no option to suppress these parameter rows or configure their display per tenant or user.

## What changed

This feature allows administrators and users to choose whether report parameters are included in Excel exports:

- A new System Configurator flag, `SHOW_REPORT_PARAMETER_IN_XLS_REPORT`, sets the default behavior for the Tenant.
- A new field, **Excel Export with Parameters**, in the **User Preference** window allows individual users to override the tenant default.

## How to set it up

### Set the tenant default

1. Open the **System Configurator** window.
2. Locate or create the configuration key `SHOW_REPORT_PARAMETER_IN_XLS_REPORT`.
3. Set **Configuration Level** to **Tenant**.
4. Set **Search Key** (`Value`) to:
   - `Y` to include report parameters in the export header rows (default).
   - `N` to omit report parameters and start the export directly at the table headers.
5. Save the record.

### Set user preference

1. Open the **User Preference** window.
2. Open the preference record for the target user.
3. Set the **Excel Export with Parameters** field:
   - Leave empty to inherit the `SHOW_REPORT_PARAMETER_IN_XLS_REPORT` System Configurator setting.
   - Select **Yes** to always include report parameters for this user.
   - Select **No** to exclude report parameters for this user.
4. Save the record.

## Configuration

| System Configurator key | Default | Level | What it does |
| --- | --- | --- | --- |
| `SHOW_REPORT_PARAMETER_IN_XLS_REPORT` | `Y` | Tenant | Determines whether report parameters are inserted as header rows above the data in Excel exports. |

## Technical notes

- Report export engines `AbstractExcelExporter` (`.xls`) and `AbstractXLSXExporter` (`.xlsx`) determine parameter rendering through `Env.IsExcelExportWithParameters(Env.getCtx())`.
- `Env.IsExcelExportWithParameters(Properties ctx)` checks the user context property `P|IsExcelExportWithParameters`:
  - Returns `true` when set to `"Y"`.
  - Returns `false` when set to `"N"`.
  - When empty or null, falls back to `MSysConfig.getBooleanValue(MSysConfig.SHOW_REPORT_PARAMETER_IN_XLS_REPORT, true, Env.getAD_Client_ID(ctx))`.
- Database metadata adds the column `IsExcelExportWithParameters` (`CHAR(1)`) to the `AD_UserPreference` table.

## Migration impact

The iD14 migration adds the `AD_UserPreference.IsExcelExportWithParameters` column and related metadata. The `SHOW_REPORT_PARAMETER_IN_XLS_REPORT` key defaults to `Y`, and existing user preference records remain unset (`NULL`). Existing installations preserve their current export behavior without manual preference configuration.

## Related tickets

- [IDEMPIERE-7157](https://idempiere.atlassian.net/browse/IDEMPIERE-7157)
- Pull Request: [#3403](https://github.com/idempiere/idempiere/pull/3403)
