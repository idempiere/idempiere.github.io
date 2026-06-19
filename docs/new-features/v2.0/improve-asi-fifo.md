---
sidebar_position: 5
title: "Improve ASI FIFO"
sidebar_label: "Improve ASI FIFO"
description: "**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)

**Description:**

Previously the Attribute Set Instance (ASI) was being used to control FIFO/LIFO warehouse picking methods.

There was a problem with the system creating fake ASI records, and creating an ASI per each document, now the system manage the creation of ASI records based on the receipt date.

Also, a field "Use Warranty Date for Material Policy" was added to the ASI definition in order to support [FEFO](http://en.wikipedia.org/wiki/First_expired,_first_out)

![01 Improve ASI FIFO](pathname:///img/new-features/v2.0/01_Improve_ASI_FIFO.png)

**Technical Info:** [IDEMPIERE-386](http://idempiere.atlassian.net/browse/IDEMPIERE-386)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.0_Improve_ASI_FIFO)_
