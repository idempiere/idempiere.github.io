---
sidebar_position: 8
title: "Period Control Document Close"
sidebar_label: "Period Control Document Close"
description: "**Developer:** cloudempiere, Takacs Peter, Igor Pojzl"
tags: [functional]
---
**Goal:** Functional

**Developer:** cloudempiere, Takacs Peter, Igor Pojzl

**Design**: Norbert Bede

**Review**: Carlos Ruiz

**Feature Ticket:** [IDEMPIERE-5575](https://idempiere.atlassian.net/browse/IDEMPIERE-5575)

**Goal**: The purpose of this change is to close a period for new documents first, so it is not allowed to enter new documents, but reposting documents remains possible.

**Behaviour**

Document Actions
    - state=opened => period control check does period is opened if yes then allow make doc-action.
    - state=document closed => period control check does period is document closed, disallow make doc-action.
    - state=closed period => control check does period is document closed, disallow make doc-action.
    - state=permanently closed period =>  control check does period is document closed, disallow make doc-action.

Posting and Re-Submit posting Action
    - state=document closed => period control check does period is document closed, allow post/resubmit
    - state=closed period control check does period is document closed, disallow post/resubmit
    - state=permanently closed period =>  control check does period is document closed, disallow post/resubmit

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Period_Control_Document_Close)_
