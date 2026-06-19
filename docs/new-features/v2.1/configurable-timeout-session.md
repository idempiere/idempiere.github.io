---
sidebar_position: 31
title: "Configurable Timeout Session"
sidebar_label: "Configurable Timeout Session"
description: "A new sysconfig key [ZK_SESSION_TIMEOUT_IN_SECONDS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#ZK_SESSION_TIMEOUT_IN_SECONDS) "
tags: [technical]
---
**Goal:** Technical

**Description:**

A new sysconfig key [ZK_SESSION_TIMEOUT_IN_SECONDS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#ZK_SESSION_TIMEOUT_IN_SECONDS) was defined to allow configuring the timeout in seconds per tenant - or system wide in case it's not defined for the tenant.

There is no ZK_SESSION_TIMEOUT_IN_SECONDS entry in the System Configurator by default. If you wish to use it, you must create it yourself. Below is an example of a timeout of 120 minutes for all clients in the system:
- Log in as the System Administrator role
- Open the System Configurator window
- Create a new record with the following entries:
    - Name = ZK_SESSION_TIMEOUT_IN_SECONDS
    - Configured Value = 7200
    - Configuration Level = System

If there is no ZK_SESSION_TIMEOUT_IN_SECONDS created in the System Configurator window, the system will take the timeout configured in org.adempiere.ui.zk/WEB-INF/web.xml - which is defined by default 60 minutes.

Possible values for ZK_SESSION_TIMEOUT_IN_SECONDS:
- **-2**: used internally by iDempiere - same as not set, in this case it uses the default
- **-1 or any negative value different than -2**: disable timeout.  According to [oracle java doc](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpSession.html#setMaxInactiveInterval-int-): An interval value of zero or less indicates that the session should never timeout.
- **0**: Is working in jetty, but still times out - not like specified (Note some old versions with tomcat have problems with setting 0, disallowing completely the login)
- **Positive value**: Number of seconds to timeout

**Technical Info:** [IDEMPIERE-2110](http://idempiere.atlassian.net/browse/IDEMPIERE-2110)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Configurable_Timeout_Session)_
