---
sidebar_position: 65
title: "Role Inheritance"
sidebar_label: "Role Inheritance"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [security]
---
**Goal:** Security

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

Actually iDempiere supports role inheritance - a role can be composed by included roles, and in such case it inherits the configuration for menu access options and for org access.

This feature extended the concept to enable defining master roles in System client, the master roles in System client can have menu access options (but cannot have org access options, because orgs are not available on System).

- The Client (not System) roles can inherit from System roles the access options, and configure exceptions for the roles: adding specific access not included in master role or  disabling (adding and inactivating) options included in the master role

- The inheritance work just for menu items, documents, but not for org.

- Users cannot be assigned to Master Roles.

- The list of "Included roles" only show "Master Roles"

New Flag in the Window Role "Master Role" to create a Master Role

![role1](pathname:///img/new-features/v1.0/role1.png)

The Client (not System) roles can inherit from Master Role, In the tab "Included Roles" in window "Role"

![role2](pathname:///img/new-features/v1.0/role2.png)

Is it possible also to configure Document Action Access on System Master Roles to be inherited to roles, to do that you must create base documents on System.

**Technical Info:** [IDEMPIERE-366](http://idempiere.atlassian.net/browse/IDEMPIERE-366)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Role_Inheritance)_
