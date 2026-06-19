---
sidebar_position: 28
title: "Validate Required Plugins"
sidebar_label: "Validate Required Plugins"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Description:**

There are cases where a plugin is absolutely critical for the correct behavior of a server, if the plugin is missing or didn't start correctly the consequences can be data corruption, for example plugins that change the posting of documents.

To prevent this problem the window Required Plugin can be used to register the plugins that are critical, if a registered plugin is missing when the server starts, the situation is informed in the log and the server is terminated.

![Required Plugin   Required Plugin   Window (iDempiere 1.0.0)](pathname:///img/new-features/v12/Required_Plugin_-_Required_Plugin_-_Window_(iDempiere_1.0.0).png)

This is how the error in console looks when a plugin is not found:

![01 ServerTerminated](pathname:///img/new-features/v12/01_ServerTerminated.png)

**Technical Info:** [IDEMPIERE-6471](https://idempiere.atlassian.net/browse/IDEMPIERE-6471)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Validate_Required_Plugins)_
