---
sidebar_position: 35
title: "Add Context Variables in log entries"
sidebar_label: "Add Context Variables in log entries"
description: "**Developers:** Nicolas Micoud, Hengsin, Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developers:** Nicolas Micoud, Hengsin, Carlos Ruiz

**Tester**: Norbert Bede

**Sponsor:** [TGI](http://tgi.eu)

**Feature Ticket:** [IDEMPIERE-5608](https://idempiere.atlassian.net/browse/IDEMPIERE-5608)

**Description:**

It is now possible to use any Context Variables in the log.

You just need to add a VM argument ( eg: `-Dorg.idempiere.FileLogPrefix=@#AD_Client_Name@/lang=@#AD_Language@/@#AD_User_Name@` ) to get those additional information in logs.  **IMPORTANT NOTE:** do not use quotes when defining the variable in setup or idempiereEnv.properties

So instead of
 14:28:25.889===========> DB.saveError: SaveErrorNotUnique - ERREUR: la valeur d'une clé dupliquée rompt la contrainte unique « c_bpartner_value »
You can easily get
 14:23:01.335===========> **GardenWorld/lang=en_US/SuperUser** DB.saveError: SaveErrorNotUnique - ERREUR: la valeur d'une clé dupliquée rompt la contrainte unique « c_bpartner_value »
and understand who has generated the entry.

**Changing on the fly:**

The parameter can be changed on the fly too from the OSGi console, to do that you need to go to the OSGi console:
- in eclipse is the Console tab
- in a server environment is usually accessible running `telnet localhost 12612`

Within the OSGi console you can set the variable with:
 setprop org.idempiere.FileLogPrefix="@#AD_Client_Name@/lang=@#AD_Language@/@#AD_User_Name@->"

And reset it back to not use it anymore with:
 setprop org.idempiere.FileLogPrefix=""

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Add_Context_Variables_in_log_entries)_
