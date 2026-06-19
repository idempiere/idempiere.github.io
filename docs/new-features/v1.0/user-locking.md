---
sidebar_position: 67
title: "User Locking"
sidebar_label: "User Locking"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [security]
---
**Goal:** Security

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

This new feature allows to implement user locking on some events:

- Maximum account locking in minutes
- Maximum inactive period in days
- Maximum number of login attempts
- Maximum password age in days

These parameters are configured in "System Configurator" window

- USER_LOCKING_MAX_ACCOUNT_LOCK_MINUTES
- USER_LOCKING_MAX_INACTIVE_PERIOD_DAY
- USER_LOCKING_MAX_LOGIN_ATTEMPT
- USER_LOCKING_MAX_PASSWORD_AGE_DAY

## Maximum Login Attempts
**How to configure the system to lock the user account at the third failed attempt login:**

1. In "System Configuration" window, find record "USER_LOCKING_MAX_LOGIN_ATTEMPT".

2. Set value for field "Configured Value".

![Screenshot17](pathname:///img/new-features/v1.0/Screenshot17.png)
 * at the third failed attempt, the user account will be locked

3. Log out.

Login with another user, use password or user incorrect.

![Screenshot13](pathname:///img/new-features/v1.0/Screenshot13.png)

![Screenshot14](pathname:///img/new-features/v1.0/Screenshot14.png)

![Screenshot15](pathname:///img/new-features/v1.0/Screenshot15.png)

Try to log in for the fourth time and the system will ask you to contact your system administrator to unlock user's account.

![Screenshot16](pathname:///img/new-features/v1.0/Screenshot16.png)

Log in with "GardenAdmin". Use the "Reset Locked Account" process  to unlock the user account.

![Screenshot18](pathname:///img/new-features/v1.0/Screenshot18.png)

![Screenshot19](pathname:///img/new-features/v1.0/Screenshot19.png)
 * Now the user will be able to log in.

## Maximum Password Age
**How to configure the system to lock the user account using maximum password age in days:**

1. In "System Configuration" window, find record "USER_LOCKING_MAX_PASSWORD_AGE_DAY".

2. Set value for field "Configured Value".

![Screenshot20](pathname:///img/new-features/v1.0/Screenshot20.png)

3. Log out.

Log in with another user. Where value of "Date Password Changed" is more than 30 days ago, in "User" window.

![Screenshot21](pathname:///img/new-features/v1.0/Screenshot21.png)

Will be directed to change password screen.

![Screenshot22](pathname:///img/new-features/v1.0/Screenshot22.png)

## Maximum Inactive Period
**How to configure the system to lock the user account using maximum inactive period in days:**

1. In "System Configuration" window, find record "USER_LOCKING_MAX_INACTIVE_PERIOD_DAY".

2. Set value for field "Configured Value".

![Screenshot23](pathname:///img/new-features/v1.0/Screenshot23.png)

3. Log out.

Log in with another user. Where value of "Date Last Login" is more than 10 days ago, in "User" window.

![Screenshot24](pathname:///img/new-features/v1.0/Screenshot24.png)
 * Remember to use the "Reset Locked Account" process  to unlock the user account

**Technical Info:** [IDEMPIERE-373](http://idempiere.atlassian.net/browse/IDEMPIERE-373)

See also [Warning on Password Expiration](https://wiki.idempiere.org/en/NF6.2_Warning_on_Password_Expiration)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_User_Locking)_
