---
sidebar_position: 23
title: "Multiple SSO Provider Support"
sidebar_label: "Multiple SSO Provider Support"
description: "**Developer:** Deepak Pansheriya [Logilite Technologies](https://www.logilite.com)"
tags: [technical]
---
**Developer:** Deepak Pansheriya [Logilite Technologies](https://www.logilite.com)

**Feature Ticket:** [IDEMPIERE-6304](https://idempiere.atlassian.net/browse/IDEMPIERE-6304)
### Multiple SSO Provider Support
This enhancement introduces the ability to configure and support **multiple Single Sign-On (SSO) providers** in iDempiere. Previously, only one SSO provider could be used at a time, and the system lacked flexibility to present multiple options at login.

With this feature, system administrators can now configure more than one SSO provider (e.g., Cognito, Keycloak) and present each as a distinct **login button on the login page**. This provides organizations with flexible identity provider options and improves user experience across different domains or roles.

**System Configuration: SSO_SHOW_LOGINPAGE**
***Y** – Shows the iDempiere login page with native login and SSO provider buttons
***N** – Skips the login page and redirects to SSO (if one provider) or shows only SSO buttons (if multiple)
### Behavior Examples
| Providers | SSO_SHOW_LOGINPAGE | Result |
|---|---|---|
| Cognito | Y | Shows button for Cognito, allows login with iDempiere credentials |
| Cognito | N | Redirects to Cognito |
| Cognito + Keycloak | Y | Shows button for Cognito and Keycloak, allows login with iDempiere credentials |
| Cognito + Keycloak | N | Shows button for Cognito and Keycloak |
### How to Configure
1. Create multiple entries in the **SSO Configuration** window (e.g., Cognito and Keycloak).
1. Set the system config:
    1. `SSO_SHOW_LOGINPAGE` to `Y` or `N` depending on your desired login experience.
1. Run **Cache Reset.**

### See Also
- [iDempiere Single SignOn](https://wiki.idempiere.org/en/NF11_Single_SignOn)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Multiple_SSO_Provider_Support)_
