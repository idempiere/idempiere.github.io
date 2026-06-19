---
sidebar_position: 7
title: "Messages at Client Level"
sidebar_label: "Messages at Client Level"
description: "**Developer:**  Nicolas Micoud"
tags: [functional]
---
**Goal:** Functional

**Developer:**  Nicolas Micoud

**Feature Ticket:** [IDEMPIERE-5136](https://idempiere.atlassian.net/browse/IDEMPIERE-5136)

**Sponsor:** [TGI](http://tgi.eu)

**Description:**

Messages are defined and translated at System level.
Sometimes, it can be useful to set a translation at tenant level.

It is possible now using the new "Client level messages" window.

Logged in a tenant, open "Client level messages" window, and add a record : select the message and the language.
Content of "Message Text" and "Message Tip" will be read from the message.
Simply adapt it so it fits your need and save :

![ClientLevelMessage MessageTrl](pathname:///img/new-features/v9/ClientLevelMessage_MessageTrl.png)

Set the System Configurator MESSAGES_AT_TENANT_LEVEL to Y.

Execute Cache Reset process to force the reload of messages.

And you can see the result, "Home" has been translated for "Home of Garden World"

![ClientLevelMessage Home](pathname:///img/new-features/v9/ClientLevelMessage_Home.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Messages_at_Client_Level)_
