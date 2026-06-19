---
sidebar_position: 7
title: "Period Close Disallow When Unposted Documents Exists"
sidebar_label: "Period Close Disallow When Unposted Documents Exists"
description: "**Goal:** Controlling Improvment"
tags: [functional]
---
**Goal:** Controlling Improvment

**Developer:** cloudempiere, Takacs Peter

**Design**: Norbert Bede

**Review**: x

**Feature Ticket:** [IDEMPIERE-5576](https://idempiere.atlassian.net/browse/IDEMPIERE-5576)

The purpose of this change better controlling between period close and un-posted documents. (completed documents but not posted or has posting issue). **Issue happened**: the accountant closed the period from time to time even when there were posting errors

**Improvement**

This improvement disallows to close or permanently close the period, if any un-posted documents with Document Status = Completed exist within that period. This new check for un-posted documents was added to 2 processes:

1. **Open/Close all (on tab Period)**  checks for all un-posted documents between Period Start Date and End Date
1. **Open/Close (on tab Period Control)**  checks only the documents with Document Base Type from the Period Control (for this purpose a Document Base Type column was added to the RV_UnPosted report)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Period_Close_Disallow_When_Unposted_Documents_Exists)_
