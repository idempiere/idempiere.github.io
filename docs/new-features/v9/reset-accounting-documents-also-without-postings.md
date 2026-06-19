---
sidebar_position: 12
title: "Reset Accounting Documents also without Postings"
sidebar_label: "Reset Accounting Documents also without Postings"
description: "**Developer:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Functional

**Developer:** Carlos Ruiz

**Description:**

By default, the [Reset Accounting](https://wiki.idempiere.org/en/Reset_Accounting_(Process_ID-176)) process doesn't reset documents that don't have postings.

This is sometimes convenient when you're sure that a repost will not create new accounting facts.

But in some cases there are configuration or customization changes that makes some documents that usually didn't have postings to start posting.

In these cases is possible to use this new flag:

![ResetAccountingAlsoWithoutPostings](pathname:///img/new-features/v9/ResetAccountingAlsoWithoutPostings.png)

**Technical Info:** [IDEMPIERE-3219](https://idempiere.atlassian.net/browse/IDEMPIERE-3219)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Reset_Accounting_Also_Without_Postings)_
