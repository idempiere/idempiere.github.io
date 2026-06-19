---
sidebar_position: 45
title: "Configurable Info on Login Window"
sidebar_label: "Configurable Info on Login Window"
description: "_All keys set in the System Configurator_"
tags: [security]
---
![All keys set 1](pathname:///img/new-features/v2.1/All_keys_set_1.png)

_All keys set in the System Configurator_
![All keys set 2](pathname:///img/new-features/v2.1/All_keys_set_2.png)

_Version Info panel showing all values. Some are overwritten via System Configurator_
![No keys set in production system](pathname:///img/new-features/v2.1/No_keys_set_in_production_system.png)

_Default settings (no keys are set in System Configurator) in a productive system_

**Goal:** Security

**Developer:** Jan Thielemann

**Description:**

The Version Info panel on the login page of iDempieres webui consists of 6 values:
- iDempiere Version
- Database Version
- Implementation Vendor
- Java Version
- Operating System Version
- Hostname of the server

In previous versions of iDempiere, all of those keys were shown, no matter if the system was a productive system or only for testing. With the new feature you now have six new keys for the System Configurator to configure if you want to show a value in the Version Info panel or not. These are boolean keys so you can use 'Y', 'N', 'true' and 'false' as the value.

```

APPLICATION_MAIN_VERSION_SHOWN
APPLICATION_DATABASE_VERSION_SHOWN
APPLICATION_IMPLEMENTATION_VENDOR_SHOWN
APPLICATION_JVM_VERSION_SHOWN
APPLICATION_OS_INFO_SHOWN
APPLICATION_HOST_SHOWN

```

If you don't implement the keys in the System Configurator, the default values to show or hide one of the values in the Version Info panel are following:

**AD_System.SystemStatus in ('E', 'I')** (system is evaluation or implementation):
- Show all values

**AD_System.SystemStatus = 'P' ** (system is production):
- Only show iDempiere Version and Implementation Vendor

Also you now can overwrite some of the values in the Version Info panel via the System Configurator. Use the following keys to provide your own values as a String:
```

APPLICATION_MAIN_VERSION
APPLICATION_IMPLEMENTATION_VENDOR
APPLICATION_DATABASE_VERSION

```

**Technical Info:** [IDEMPIERE-2259](http://idempiere.atlassian.net/browse/IDEMPIERE-2259)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Configurable_Info_Login)_
