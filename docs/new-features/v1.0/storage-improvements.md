---
sidebar_position: 25
title: "Storage Improvements"
sidebar_label: "Storage Improvements"
description: "**Functional:** Material Management"
tags: [functional]
---
**Goal:** Functional

**Functional:** Material Management

**Contributor:** Edwin Ang

**Description:**

Solve bugs in the table MStorage.

A big old issue inherited from Compiere times is that storage was recording reservations and on-hand quantities on the same table with different needs, for example
on-hand requires a locator - meanwhile reservations don't need that, also the attribute set instance managing for both can be different. This architectural issue was leading to negative quantities on reservations which sometimes led to data corruption - and made the real control of quantities too hard to track.

In iDempiere the storage table was split in two: on-hand storage (m_storageonhand) and reservation storage (m_storagereservation), the old m_storage table was converted to a view for backward compatibility (avoid breaking your old reports based on storage table), a reservation locator (just for reporting purposes) can be configured on warehouse table

![storage1 1](pathname:///img/new-features/v1.0/storage1-1.png)

**Technical Info:** [IDEMPIERE-385](http://idempiere.atlassian.net/browse/IDEMPIERE-385)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Storage_Improvements)_
