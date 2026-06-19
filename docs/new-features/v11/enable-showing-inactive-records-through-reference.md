---
sidebar_position: 3
title: "Enable Showing Inactive Records through Reference"
sidebar_label: "Enable Showing Inactive Records through Reference"
description: "**Ticket:** [IDEMPIERE-5573](https://idempiere.atlassian.net/browse/IDEMPIERE-5573)"
tags: [functional]
---
## Enable Showing Inactive Records through Reference
**Ticket:** [IDEMPIERE-5573](https://idempiere.atlassian.net/browse/IDEMPIERE-5573)

**Developer:** Peter Takacs, Cloudempiere

**Review:** Heng Sin Low, Carlos Ruiz, Nicolas Micoud, Norbert Bede

## Description
There are some use cases, when showing inactive records in a list field of parameter can be useful, e.g. displaying Products inactivated by the customer.

## Changes
A new Show Inactive field was added to the Reference window, this is valid for references with validation type = Table Validation.

## How to use
If the Show Inactive field is set to Yes, then the Reference will allow to show **active** and **inactive** records too. When set to No, only the **active** records are shown. This is applied to the Columns, Process Parameters and other fields, where the Reference is used.

For example:

![ShowInactive](pathname:///img/new-features/v11/ShowInactive.png)

Note that the list shows the inactive records surrounded by tilde characters (~), like:

![ShowingUOMInactive](pathname:///img/new-features/v11/ShowingUOMInactive.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Enable_Showing_Inactive_Records_through_Reference)_
