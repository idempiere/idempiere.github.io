---
sidebar_position: 22
title: "Desktop Tab Enhancements"
sidebar_label: "Desktop Tab Enhancements"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4949](https://idempiere.atlassian.net/browse/IDEMPIERE-4949)

**Description:**
Implement the following new enhancement for desktop tab:
1. Option to show/hide Home toolbar button for desktop browser. Default to show.
1. Option to show/hide Show Open Windows drop down toolbar button for desktop browser. Default to show.
1. Option to auto shrink desktop tab to fit more tab to screen without scrollbar. Default to off.
1. Make max length of desktop tab title configurable

## Usage
1. Home toolbar button
1. * ZK_DESKTOP_SHOW_HOME_BUTTON
1. ** Y/N type Client level System Config entry, default to Y.
1. ** When Y, add Home toolbar button for desktop client (This is an existing feature for mobile client).
1. * ![4949 show home button](pathname:///img/new-features/v9/4949_show_home_button.png)

_Home toolbar button_
1. Show Open Windows drop down toolbar button
1. * ZK_DESKTOP_SHOW_TAB_LIST_BUTTON
1. ** Y/N type Client level System Config entry, default to Y.
1. ** When Y, add toolbar button to show a list of open tabs for desktop client(This is an existing feature for mobile client).
1. * ![4949 show tab list button](pathname:///img/new-features/v9/4949_show_tab_list_button.png)

_Show Open Windows toolbar button_
1. Auto shrink desktop tab
1. * ZK_DESKTOP_TAB_AUTO_SHRINK_TO_FIT
1. ** When Y, ZK_DESKTOP_SHOW_TAB_LIST_BUTTON is always on regardless of the actual value of ZK_DESKTOP_SHOW_TAB_LIST_BUTTON
1. ** When Y, tab scroll button is make hidden, you have to use the tab list dropdown to select tab that's not visible.
1. ** When Y, tab will be auto shrink to fit more tabs on screen (similar to how Chrome tabs work).
1. * ![4949 auto shrink to fit](pathname:///img/new-features/v9/4949_auto_shrink_to_fit.png)

_Auto shrink desktop tab_
1. Make max length of desktop tab title configurable
1. * ZK_DESKTOP_TAB_MAX_TITLE_LENGTH
1. ** Integer type Client level System Config entry, default to 30.
1. ** Set the maximum length of desktop tab title/label.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Desktop_Tab_Enhancements)_
