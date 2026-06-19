---
sidebar_position: 9
title: "How To Configure The Toolbar"
sidebar_label: "How To Configure The Toolbar"
description: "This tutorial is brought to you by Diego Ruiz from [BX Service GmbH](http://www.bx-service.com/). If you have questions, criticism, or improvement sugg"
tags: [functional]
---
This tutorial is brought to you by Diego Ruiz from [BX Service GmbH](http://www.bx-service.com/). If you have questions, criticism, or improvement suggestions, feel free to write to me in the forums.

## Goal of this tutorial
The goal of this tutorial is to show you how you can configure the toolbar and customize how it looks, the toolbar design changed significantly in the 8.2 "Phong" release and here you can see how you can customize it to suit your preferences.

## What changed?
In the 8.2 release, the toolbar changed from this:

![OldToolbar](pathname:///img/new-features/v8.2/OldToolbar.jpg)

To this:

![NewToolbar8.2](pathname:///img/new-features/v8.2/NewToolbar8.2.jpg)

The changes can be summarized as:
1. The first noticeable change is the icons, it changed from icon images to font-icons.
1. The order and layout changed to not display every toolbar button, only those that are most currently used, and access the others through the ‘Show More’ button in the right part of the toolbar. This was made to improve the UX, the toolbar might seem overwhelming for many users with many options that they don’t even know what they do.
1. A new Select Query list in the toolbar allows the user to choose saved filters directly from the toolbar instead of the old way -> Click on the Find Button -> Choosing a filter from the list -> Click Ok.
1. The third point becomes powerful especially when you take advantage of the new features of [saving global filters that can be shared among users](https://wiki.idempiere.org/en/NF7.1_Share_Saved_Queries)

However, part of the magic of iDempiere is that it is highly customizable, so if you don’t like any of the changes, you can adapt it to your own preferences.

### How to customize the toolbar?
1. The first point can be changed easily, if you want to have the icon images back, you just need to change the  Configurator “ZK_THEME_USE_FONT_ICON_FOR_IMAGE” to N, logout and log back in.

![FontSysConfig](pathname:///img/new-features/v8.2/FontSysConfig.jpg)

2. The order in which the toolbar buttons are displayed in the window can be changed in the Toolbar Button window.

![ToolbarWindow](pathname:///img/new-features/v8.2/ToolbarWindow.jpg)

The button’s order can be changed by modifying the sequence, and yon can add or remove buttons from the show more section by checking/unchecking the Group in Show More flag

Change the order of the toolbar buttons:
![ToolbarButton](pathname:///img/new-features/v8.2/ToolbarButton.gif)

Group buttons in the toolbar
![GroupMoreToolbar](pathname:///img/new-features/v8.2/GroupMoreToolbar.gif)

External links:
[NF7.1 Toolbar Improvements](https://wiki.idempiere.org/en/NF7.1_Toolbar_Improvements)
[NF7.1 Share Saved Queries](https://wiki.idempiere.org/en/NF7.1_Share_Saved_Queries)
[NF7.1 SQL Search In Windows](https://wiki.idempiere.org/en/NF7.1_SQL_Search_In_Windows)

---

_Source: [Wiki](https://wiki.idempiere.org/en/How_To_Configure_The_Toolbar)_
