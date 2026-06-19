---
sidebar_position: 56
title: "Specify Tenant on Login"
sidebar_label: "Specify Tenant on Login"
description: "**Developer:** Carlos Ruiz"
tags: [security]
---
**Goal:** Security

**Developer:** Carlos Ruiz

**Sponsor:** [FH](https://www.fh.com.br/)

Traditionally the login flow of iDempiere has allowed the user to enter username and password and select the tenant to login in a second page.

This is perfect for most of implementations, but can raise some security concerns in multi-tenant implementations.

In multi-tenant applications is common to know which tenant is used at login time.

This new feature implement this option, with complete backward compatibility for the old method.

## Configuration
### System Configurator
#### LOGIN_WITH_TENANT_PREFIX
To configure the new way is really simple, you just need to set up the System Configurator key LOGIN_WITH_TENANT_PREFIX with one of these three possible values:
- N: No - This is the default, it simply keeps iDempiere working as before, the tenant CANNOT be specified at login time
- A: Allow - Specifying tenant as login prefix is OPTIONAL in this case, if specified, that tenant is used, if not then it works the same as before.  Here is optional to configure login prefix on the tenants that are going to use this feature.
- F: Force - Specifying tenant as login prefix is MANDATORY in this case, the user cannot login unless he provides a valid tenant before the username.  In this case is mandatory to configure login prefixes for ALL tenants, otherwise they cannot be used.

#### LOGIN_PREFIX_SEPARATOR
The second SysConfig key that is possible to configure is LOGIN_PREFIX_SEPARATOR, by default the prefix separator is the slash character (/)

### Login Prefix in Tenant Window
In order to use this feature you need to configure a login prefix for every tenant that is going to use this feature (or for all tenants in case the Force option is configfured).

This can be simply configured in the Tenant window:

![00 LoginPrefix](pathname:///img/new-features/v9/00_LoginPrefix.png)

## Usage
To use the new feature is simply to prefix the tenant prefix to the username

For example, if you configured GW as the prefix for GardenWorld, then you can login with:
- GW/GardenWorld
- GW/GardenUser
- GW/SuperUser
If you configured SYSTEM as the login prefix for System tenant, then you can login with:
- SYSTEM/SuperUser

Like this:

![01 Login](pathname:///img/new-features/v9/01_Login.png)

## Impact on MFA
Implementing this functionality helps to solve a security concern about the Multi-Factor-Authentication implementation.

Now, the MFA page is shown to the user when the tenant is defined, so, in the case of Force, the MFA page will be always shown before the tenant selection page.

This is mostly transparent for the user, the only difference is that previously the MFA page was shown after the tenant/role selection page, and now is shown before when the tenant is defined.

**Technical Info:** [IDEMPIERE-5408](https://idempiere.atlassian.net/browse/IDEMPIERE-5408)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Specify_Tenant_on_Login)_
