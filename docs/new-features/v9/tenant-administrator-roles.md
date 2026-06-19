---
sidebar_position: 16
title: "Tenant Administrator Roles"
sidebar_label: "Tenant Administrator Roles"
description: "**Developer:**  Nicolas Micoud"
tags: [functional]
---
**Goal:** Functional

**Developer:**  Nicolas Micoud

**Feature Ticket:** [IDEMPIERE-5214](https://idempiere.atlassian.net/browse/IDEMPIERE-5214)

**Sponsor:** [TGI](http://tgi.eu)

**Description:**

Messages are defined and translated at System level.
Sometimes, it can be useful to set a translation at tenant level.

A new flag has been added to identify administrator roles at tenant level.

![TenantAdministratorRoles](pathname:///img/new-features/v9/TenantAdministratorRoles.png)

It can be used in display logics or anywhere else.
Eg: you can use the following logic to display a field for 'Advanced', 'Support' and 'Tenant Administrator' roles.

  @#ShowAdvanced@ = Y | @#AD_Role_Type@ = SS | @#IsClientAdministrator@ = Y

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Tenant_Administrator_Roles)_
