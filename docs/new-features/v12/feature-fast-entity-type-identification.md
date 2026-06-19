---
sidebar_position: 4
title: "FEATURE: Fast entity type identification"
sidebar_label: "FEATURE: Fast entity type identification"
description: "**Developer:** Murilo H. Torquato"
tags: [functional]
---
## **FEATURE: Fast entity type identification**
**Goal:** Technical

**Developer:** Murilo H. Torquato

**Feature** **Ticket:** [IDEMPIERE-3989](https://idempiere.atlassian.net/browse/IDEMPIERE-3989)


### Description
1. With the growing number of plugins and extensions for the iDempiere platform is important to create a fast way to identify the entity type for each dictionary entry (window, tab, field, process, parameter, etc..).
1. This can help support and implementors on troubleshooting and bug triage.

## How to Enable
Entity type identification can be activated in the User preference window by checking the 'Show Technical Information on Help' flag
![UserPreference](pathname:///img/new-features/v12/UserPreference.png)

## How it Works
Once activated, you can check the entity type of the selected field in Tool Tip and the entity type of the open window in How to. The entity type of the tab and its fields will also be displayed in the help window.
![EntityType Identification Tool tip & How To](pathname:///img/new-features/v12/EntityType_Identification_Tool_tip_&_How_To.png)
![EntityType HelpWindow](pathname:///img/new-features/v12/EntityType_HelpWindow.png)

You can see the entity type of a field in the changelog as its current value as well
![EntityType ChangeLog](pathname:///img/new-features/v12/EntityType_ChangeLog.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Plugins_Extension_Entity_Type_Identification)_
