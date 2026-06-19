---
sidebar_position: 7
title: "Improved Document Sequence"
sidebar_label: "Improved Document Sequence"
description: "**Contributor:** Nicolas Micoud"
tags: [functional]
---
**Goal:** Functional

**Contributor:** Nicolas Micoud

**Description:**

Sequences can restart every month and can be maintain by organization

Other improve DON'T need to run any process to restart the sequence just need to configure the document sequence.

For maintenance sequence for organization , it is a flag and a field orgcolumn to choose what column find the organization for example : AD_Org_ID or AD_OrgTrx_ID

![sequence1](pathname:///img/new-features/v1.0/sequence1.png)

For Restart sequence every month use a flag : "Restart sequence every month" this action will use the field "datecolumn" to know what column use to restart the sequences with that date.

![sequence2](pathname:///img/new-features/v1.0/sequence2.png)

**Technical Info:** [IDEMPIERE-332](http://idempiere.atlassian.net/browse/IDEMPIERE-332)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Document_Sequence_Improved)_
