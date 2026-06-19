---
sidebar_position: 32
title: "Disable OSGi Event Handler"
sidebar_label: "Disable OSGi Event Handler"
description: "**Goal:** UX/Functional"
tags: [development]
---
**Goal:** UX/Functional

**Developer:** Hengsin

**Feature** **Ticket:** [IDEMPIERE-5876](https://idempiere.atlassian.net/browse/IDEMPIERE-5876)


### Description
1. Allow user to configure the list of OSGi event handlers to disable.
1. User will do that by adding the disable list to “event.handlers.blacklist” text file at iDempiere home folder.
1. Each line of the text file should be in the format of &lt;event handler class name&gt;[&lt;comma separated event topic name&gt;] (use * for &lt;comma separated event topic name&gt; to match all event topics).
1. Example for subclass of AbstractEventHandler: org.adempiere.base.event.RequestEventHandler[adempiere/po/afterChange], org.adempiere.base.event.RequestEventHandler[*]
1. Example for event delegate: org.adempiere.base.event.delegate.AutoProduceEventDelegate[adempiere/doc/beforeComplete]

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Disable_OSGi_Event_Handler)_
