---
sidebar_position: 10
title: "Payment Selection Improvements"
sidebar_label: "Payment Selection Improvements"
description: "The 'Payment Selection' process and the corresponding 'Payment Selection (manual)' has been improved:"
tags: [functional]
---
**Goal:** Functional

**Description:**

The "Payment Selection" process and the corresponding "Payment Selection (manual)" has been improved:

- The most important change is that now the functionality can work also for receipts (Direct Debit)
- Many issues found in the process were fixed to improve it and make it more reliable like:
    - improve transaction management
    - inform the user about the consequences of printing and creating the payments/checks
    - correct management of invoice schedules
    - correct refreshing when the search parameters are changed
    - filter inactive payment rules
    - avoid repeating invoices
    - calling the "generate payments" at the end of payment selection is now configurable

**Technical Info:** [IDEMPIERE-1881](http://idempiere.atlassian.net/browse/IDEMPIERE-1881), [IDEMPIERE-2134](http://idempiere.atlassian.net/browse/IDEMPIERE-2134), [IDEMPIERE-2135](http://idempiere.atlassian.net/browse/IDEMPIERE-2135)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Payment_Selection_Improvements)_
