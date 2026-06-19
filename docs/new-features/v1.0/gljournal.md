---
sidebar_position: 13
title: "Simplified GL Journal"
sidebar_label: "Simplified GL Journal"
description: "**Functional:** Accounting"
tags: [functional]
---
**Goal:** Usability

**Functional:** Accounting

**Contributor:** Nicolas Micoud

**Description:**

- You can now populate a **GL Journal** without using a batch (Batch Journal Window is still in use and not removed).

- The **Journal Line** is simplified, where you can now enter just the GL Dimensions (i.e. account, business partner, product) and the combination will be created and used automatically

- Alias list is added too, in case you have combinations with alias they can be accessed directly from this list

- Import GL Journal is changed to allow simpler documents:
    - To create a batch you must include in the csv file the batch document number, or a line must be marked with *create new batch* - subsequent lines will use the same batch until a new *create new batch* header breaker is found (or conditions to create a new batch are applied).

![NF001 UX GLJournal](pathname:///img/new-features/v1.0/NF001_UX_GLJournal.png)

**Technical Info:** [IDEMPIERE-344](http://idempiere.atlassian.net/browse/IDEMPIERE-344)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_GLJournal)_
