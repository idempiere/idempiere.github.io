---
sidebar_position: 35
title: "Login Improvements"
sidebar_label: "Login Improvements"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [user-experience]
---
**Goal:** Usability

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

Now users can login directly using the defaults that used on their last session (client, role, organization, warehouse).  This is achieved with the new *Select Role* flag disabled.

To select different login defaults the user must enable the new flag *Select Role* and they'll be redirected to the default selection panel as usual.

![NF001 UX Login](pathname:///img/new-features/v1.0/NF001_UX_Login.png)

You can also enable Login using email instead of Name.
Backward compatibility is achieved using a System Configurator key : USE_EMAIL_FOR_LOGIN

After the user authenticated the second box was improved to invert the order, now it shows the clients if the user have access to more than one client, then it shows the associated roles.

![login1](pathname:///img/new-features/v1.0/login1.png)

![login2](pathname:///img/new-features/v1.0/login2.png)

**Technical Info:** [IDEMPIERE-354](http://idempiere.atlassian.net/browse/IDEMPIERE-354) [IDEMPIERE-358](http://idempiere.atlassian.net/browse/IDEMPIERE-358)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Login)_
