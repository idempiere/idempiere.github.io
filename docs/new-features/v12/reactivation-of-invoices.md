---
sidebar_position: 8
title: "Reactivation of Invoices"
sidebar_label: "Reactivation of Invoices"
description: "**Developer:**  Nicolas Micoud"
tags: [functional]
---
**Goal:** Functional

**Developer:**  Nicolas Micoud

**Feature Ticket:** [IDEMPIERE-6067](https://idempiere.atlassian.net/browse/IDEMPIERE-6067)

**Sponsor:** [TGI](http://tgi.eu)

**Description:**

**Disclaimer : Reactivating an invoice can be forbidden by law, so be careful before enabling it.**

Reactivation is configurable per Role and Document Type. Both must be configured in order to enable it.

If those conditions are met, you'll be able to reactivate invoices.

- **Document Type must be set as 'Reactivable**'
A new field has been added on Document Type : Can Be Reactivated

![ReactivationInvoice DocType CanBeReactivated](pathname:///img/new-features/v12/ReactivationInvoice_DocType_CanBeReactivated.png)

- **Role must be authorized**
If is ticked and role has been granted to reactive it (via Document Action Access tab):

![ReactivationInvoice Role DocActionAccess](pathname:///img/new-features/v12/ReactivationInvoice_Role_DocActionAccess.png)

You'll find the Re-activate item on Document Action :

![ReactivationInvoice DocAction](pathname:///img/new-features/v12/ReactivationInvoice_DocAction.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Reactivation_of_Invoices)_
