---
title: "Read Access To Tables Not In Role Table Access List"
sidebar_label: "Read Access To Tables Not In Role Table Access List"
sidebar_position: 9
description: "When using the Role Table Access Include list (i.e uncheck the Exclude checkbox) for Read Write access, the current behaviour is hard coded as the role has no access to other tables that is not par..."
tags:
  - functional
---

# Read Access To Tables Not In Role Table Access List

**Feature:** Add READ_TABLES_NOT_IN_TABLE_ACCESS_INCLUDE_LIST AD_SysConfig flag for Role Table Access

**Goal:** Functional

**Developer:**  Heng Sin

**Feature Ticket:** [IDEMPIERE-6730](https://idempiere.atlassian.net/browse/IDEMPIERE-6730)

### Description
When using the Role Table Access Include list (i.e uncheck the Exclude checkbox) for Read Write access, the current behaviour is hard coded as the role has no access to other tables that is not part of the include list. This make it very hard to use as you have to figure out all other tables that the user should have read only access to.

### Changes
1. Add client level **READ_TABLES_NOT_IN_TABLE_ACCESS_INCLUDE_LIST** AD_SysConfig Y/N entry.
  - **N** to disallow both read-only and read write access to other tables that's not part of the Role Table Access include list.
  - **Y** to allow read-only access to tables not in the include list.
  - Default is **N** to maintain backward compatibility.
1. Note that you still can use the Role Table Access Exclude feature to disallow access to specific set of tables).
