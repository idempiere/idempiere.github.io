---
sidebar_label: "Configurable Keikai editable"
sidebar_position: 16
description: "Make the Keikai spreadsheet viewer read-only state configurable per context via SysConfig keys"
tags:
  - functional
  - v13
---

# Configurable Keikai editable

**Goal:** Functional

**Developer:** [Carlos Ruiz](https://wiki.idempiere.org/en/User:CarlosRuiz)

**Feature Ticket:** [IDEMPIERE-7118](https://idempiere.atlassian.net/browse/IDEMPIERE-7118)

## Overview

Before this enhancement, the Keikai spreadsheet viewer's read-only behavior was hardcoded: report previews and attachment previews were always read-only, while info window previews were always editable. There was no way for a tenant administrator to change this behavior.

This feature introduces three client-level `AD_SysConfig` settings that make the read-only/editable state configurable per context.

:::warning

Changes made while editing a spreadsheet are not saved. To keep them, the user must save a copy locally.

:::

## SysConfig keys

| Key | Default | Description | Level |
|---|---|---|---|
| `XLS_VIEWER_READONLY_ATTACHMENT` | `Y` | Controls whether XLS/XLSX/CSV previews in the Attachment window are read-only (`Y`) or editable (`N`). Changes are not preserved in the attachment. | Client |
| `XLS_VIEWER_READONLY_REPORT` | `Y` | Controls whether XLS/XLSX/CSV previews in the Report Viewer are read-only (`Y`) or editable (`N`) | Client |
| `XLS_VIEWER_READONLY_INFOWINDOW` | `N` | Controls whether XLS/XLSX/CSV previews in Info Windows and Account Info are read-only (`Y`) or editable (`N`) | Client |

## Affected views

The settings apply to:

- **Report Viewer**: `ZkJRViewer`, `ZkReportViewer`
- **Attachment window**: `WAttachment`
- **Info Windows**: `InfoWindow`
- **Accounting Viewer**: `WAcctViewer`

## Technical notes

- Because the SysConfig level is **Client**, each tenant can independently configure the behavior.
- The changes are backward compatible. The defaults preserve the previous behavior.

**Technical Info:** [IDEMPIERE-7118](https://idempiere.atlassian.net/browse/IDEMPIERE-7118) | [Pull Request #3368](https://github.com/idempiere/idempiere/pull/3368)
