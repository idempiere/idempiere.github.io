---
sidebar_position: 9
title: "Private Access Window"
sidebar_label: "Private Access Window"
description: "**Developer:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Functional

**Developer:** Carlos Ruiz

**Description:**

Roles with "Personal Lock" permission are able to set locks in records.

And roles with "Personal Access" permission are able to see records locked by other users.

The lock can be applied using the "Private Record Lock" button on the toolbar.

However, until now, the users were not able to see in one window which records they have locked (sometimes by mistake), or the admin roles (those with "Personal Access" enabled) have not been able to see the records locked in the system.

The only way to see which records are locked has been using SQL.

The new window "Private Access" comes to solve this problem:

![00 PrivateAccess](pathname:///img/new-features/v11/00_PrivateAccess.png)

In this window the users are able to search for their own locked records, and also the admin roles (with "Personal Access") are able to search for locked records from any user.

In this window the records can be deleted or inactivated, but not added.  Note also that users can just delete their own locks, and admins can delete any lock.

**Technical Info:** [IDEMPIERE-4819](https://idempiere.atlassian.net/browse/IDEMPIERE-4819)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Private_Access_Window)_
