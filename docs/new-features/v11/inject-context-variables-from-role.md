---
sidebar_position: 25
title: "Inject Context Variables From Role"
sidebar_label: "Inject Context Variables From Role"
description: "**Developer:** muriloht"
tags: [technical]
---
**Goal:** Technical

**Developer:** muriloht

**Description:**

Now you can define context variables to inject in the context from a Role, for example:

![01 Inject From Role](pathname:///img/new-features/v11/01_Inject_From_Role.png)

In this example the following context variables will be available after login , in this case only with Role *Garden Admin *:

@+InfoProductShowHistory@=N

@+RoleLevel@=50

If you need to define multiple context variables to inject, you must define one per line, in other words, the list of variables is new-line separated.

**PLEASE NOTE** a plus ( + ) prefix is added to these variables to differentiate them from the normal window context variables.

You can use these variables anywhere in the window definition, like the where clause, the read only logic, display logic, etc.

Since [Release-12.2025-01-25](https://wiki.idempiere.org/en/ChangeLog_Release_12#2025-01-25) this also includes context variables in master roles.

**See also:**

[Inject Context Variables From Menu](https://wiki.idempiere.org/en/NF8.2_Inject_Context_Variables_From_Menu)

**Technical Info:** [IDEMPIERE-5647](https://idempiere.atlassian.net/browse/IDEMPIERE-5647)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Inject_Context_Variables_From_Role)_
