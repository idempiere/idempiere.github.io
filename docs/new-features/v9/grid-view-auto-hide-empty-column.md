---
sidebar_position: 25
title: "Grid View Auto Hide Empty Column"
sidebar_label: "Grid View Auto Hide Empty Column"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4835](https://idempiere.atlassian.net/browse/IDEMPIERE-4835)

**Description:**
Grid view will auto hide empty column if the feature is turn on globally through system configurator or by user through the grid view customization dialog.

## Usage
1. Added client level system config key ZK_GRID_AUTO_HIDE_EMPTY_COLUMNS (Y/N, default to N). Set this to Y to turn on the auto hide feature system wide or tenant wide.
1. User can override the ZK_GRID_AUTO_HIDE_EMPTY_COLUMNS setting through the Grid View Customization Dialog:
![4835 Customize Grid View](pathname:///img/new-features/v9/4835_Customize_Grid_View.png)

_Grid View Customization Dialog_

## Example
Original Grid View:

![4835 Without Autohide](pathname:///img/new-features/v9/4835_Without_Autohide.png)

_Original Grid View_

Grid View with Auto Hide Empty Column turn on:

![4835 With AutoHide](pathname:///img/new-features/v9/4835_With_AutoHide.png)

_Grid View with Auto Hide Empty Column turn on_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Grid_View_Auto_Hide_Empty_Column)_
