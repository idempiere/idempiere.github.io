---
sidebar_position: 23
title: "Inject Context Variables From Menu"
sidebar_label: "Inject Context Variables From Menu"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

Now you can define context variables to inject in the context when opening a menu entry, for example:

![01 Inject From Menu](pathname:///img/new-features/v8.2/01_Inject_From_Menu.png)

In this example the following context variables will be available after the window *Business Partner (VIP)* is opened from the menu:
 @+Opened_From_Menu@=Y
 @+VIP@=Y

If you need to define multiple context variables to inject, you must define one per line, in other words, the list of variables is new-line separated.

**PLEASE NOTE** a plus ( + ) prefix is added to these variables to differentiate them from the normal window context variables.

You can use these variables anywhere in the window definition, like the where clause, the read only logic, display logic, etc.

In addition to Windows, you can also define the same predefined context variables for Info Window, Process, Report and Form.

The variables defined for windows are injected when the window is opened from the menu, or the Favourites, or the menu search box.

But please take note that windows can be opened from other parts of the application, not just menu, for example via zoom, or via the zoom across toolbar button.  In these cases, these variables are not injected.

However, there is the possibility to inject context variables also attached to the window definition (independent from menu), like in this example:

![02 Inject From Window](pathname:///img/new-features/v8.2/02_Inject_From_Window.png)

**See also:**

[NF11 Inject Context Variables From Role](https://wiki.idempiere.org/en/NF11_Inject_Context_Variables_From_Role)

**Technical Info:** [IDEMPIERE-4713](https://idempiere.atlassian.net/browse/IDEMPIERE-4713)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Inject_Context_Variables_From_Menu)_
