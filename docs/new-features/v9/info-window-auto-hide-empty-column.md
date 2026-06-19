---
sidebar_position: 26
title: "Info Window Auto Hide Empty Column"
sidebar_label: "Info Window Auto Hide Empty Column"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4841](https://idempiere.atlassian.net/browse/IDEMPIERE-4841)

**Description:**
Info window will auto hide empty column if the feature is turn on through system configurator (system wide or tenant wide).

## Usage
1. Added client level system config key ZK_INFO_AUTO_HIDE_EMPTY_COLUMNS (Y/N, default to N). Set this to Y to turn on the auto hide feature system wide or tenant wide.

## Example
Original Info Window View:

![4841 Original View](pathname:///img/new-features/v9/4841_Original_View.png)

_Original View_

Info Window View with Auto Hide Empty Column turn on:

![4841 With Auto Hide](pathname:///img/new-features/v9/4841_With_Auto_Hide.png)

_Info Window with Auto Hide_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Info_Window_Auto_Hide_Empty_Column)_
