---
sidebar_position: 3
title: "Monitor Trx"
sidebar_label: "Monitor Trx"
description: "**Contributor:** [TrekGlobal](http://www.trekglobal.com/)"
tags: [technical]
---
**Goal:** Technical

**Contributor:** [TrekGlobal](http://www.trekglobal.com/)

**Developer:** Heng Sin Low

### **Description**
Databases sometimes hit hard to trace conditions, like locks or connection leaks.

It's usually difficult to figure out where in the code the problem resides.

In order to ease that, a way to monitor transactions was implemented.

This is a strictly technical improvement, the user doesn't notice anything different, but the system administrator can now see in the idempiereMonitor page information about where the transaction was started.

It looks like this:

![01 MonitorTrx](pathname:///img/new-features/v4.1/01_MonitorTrx.png)

And when you click on a transaction a popup window is raised showing stack trace information collected, where is collected depends on SysConfig key (see below).

![02 MonitorTrx](pathname:///img/new-features/v4.1/02_MonitorTrx.png)

### **Technical Info**
[IDEMPIERE-3416](http://idempiere.atlassian.net/browse/IDEMPIERE-3416)

#### **For System Administrator**
By default the system traces the point where the transaction was opened or the last time it used the PO object.

However, if you need to trace in more detailed way it is possible to create in System a System Configurator key named TRACE_ALL_TRX_CONNECTION_GET with Value=Y - in this case the system will trace whenever the connection is used, this can be expensive in terms of performance, and that's why this option is disabled by default, and can be enabled per request with this SysConfig key.

#### **For Developers**
A new method setDisplayName was added to the org.compiere.util.Trx class - it is recommended whenever you use the createTrxName also set some additional information to display - the information set with setDisplayName is shown in the idempiereMonitor page.

After [release 9.20220805](https://wiki.idempiere.org/en/ChangeLog_Release_9#2022-08-05) the [[System_Configurator_(Window_ID-50006)#TRX_AUTOSET_DISPLAY_NAME|System Configurator TRX_AUTOSET_DISPLAY_NAME] was added (defaults to false).  When enabled it automatically set the class and method from the caller for the methods createTrxName() or createTrxName(null)

### **See also**
[NF11 Monitor Null Trx](https://wiki.idempiere.org/en/NF11_Monitor_Null_Trx)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF4.1_Monitor_Trx)_
