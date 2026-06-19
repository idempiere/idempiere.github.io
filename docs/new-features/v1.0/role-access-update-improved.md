---
sidebar_position: 64
title: "Improved Role Access Update"
sidebar_label: "Improved Role Access Update"
description: "**Contributor:** Hesham S. Ahmed"
tags: [security]
---
**Goal:** Security

**Contributor:** Hesham S. Ahmed

**Description:**

In the process Role Access Update preserve the changes made to automatic roles

If the flag "Reset Existing Access" is checked  will replace everything

If the flag "Reset Existing Access" is unchecked, will honor the previous modifications done to automatic roles, for example:

  if a permission to a window was inactivated then it must keep inactive after the process is ran
  if a permission to a window was made read-only then it must keep read-only after the process is ran

The process will only add the new permission that automatic role doesn't have yet

![role1 1](pathname:///img/new-features/v1.0/role1-1.png)

**Technical Info:** [IDEMPIERE-162](http://idempiere.atlassian.net/browse/IDEMPIERE-162)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Role_Access_Update_Improved)_
