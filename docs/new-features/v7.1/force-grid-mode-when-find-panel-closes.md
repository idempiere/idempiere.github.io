---
sidebar_position: 5
title: "Force grid mode when Find panel closes"
sidebar_label: "Force grid mode when Find panel closes"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Developer:** Nicolas Micoud

**Sponsor:** [Rubric](http://rubric.com)

**Description:**

Now iDempiere can automatically switch to grid mode when the Find panel closes.

Behaviour is defined in User Preferences :
1. Default : use the value set in the SysConfig [ZK_GRID_AFTER_FIND](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#ZK_GRID_AFTER_FIND)
1. Always in grid view : force the tab to switch to grid
1. According to a threshold : the tab will switch if the number of records exceeds the threeshold

![GridAfterFind UserPreference](pathname:///img/new-features/v7.1/GridAfterFind_UserPreference.png)

**Technical Info:** [IDEMPIERE-4005](https://idempiere.atlassian.net/browse/IDEMPIERE-4005)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Force_Grid_After_Find)_
