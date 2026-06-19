---
sidebar_position: 14
title: "Info Window Generate Invoice (manual)"
sidebar_label: "Info Window Generate Invoice (manual)"
description: "**Feature:** Generate invoice (manual) migrated to info window"
tags: [functional]
---
**Feature:** Generate invoice (manual) migrated to info window

**Goal:** Functional

**Developer:** cloudempiere/petertakach

**Review:** CarlosRuiz, Hengsin

**Feature Ticket:** [IDEMPIERE-1965](https://idempiere.atlassian.net/browse/IDEMPIERE-1965)

![Generate invoice info](pathname:///img/new-features/v10/Generate-invoice-info.png)

**Goal:**

- deprecate form generate invoice (manual)
- keep working old form (hidden)
- migrate legacy functionality to info window
- allow use new functionality of info window (value preference, customise parameters, new columns without development ...)
- use single source of true for info window and batch process

**Changes:**

- added new info window which replace form (in case you want to use old form, then you can enable it in application dictionary)
- processes attached to info window for order to ship and rma to return
- improved process generate invoice - using view %c_invoice_candidate%
- Print can be started manually from process info result window [Add Printing Support to ProcessInfoDialog](https://idempiere.atlassian.net/browse/IDEMPIERE-5356)

**Customisability:**

- you can change info window view c_invoice_candidate directly or report view component
- you can add/remove columns and filters (configure info window) by editing Application Dictionary => info window
- you can add new custom process to additional data processing - development required
- info window customisation without development  [NF8.2_Info_Window_Customisation](https://wiki.idempiere.org/en/NF8.2_Info_Window_Customisation)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Info_Window_Generate_Invoice_(manual))_
