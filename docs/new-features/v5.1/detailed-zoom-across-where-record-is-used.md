---
sidebar_position: 1
title: "Detailed Zoom Across (Where record is used)"
sidebar_label: "Detailed Zoom Across (Where record is used)"
description: "**Developer:** Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Carlos Ruiz

**Description:**

By default the toolbar button zoom across discover where the record on screen is used on first tabs of windows.

With detailed zoom across it goes deeper in the discovery of relationships within detailed tabs.

Normal Zoom Across on product looks like:

![01 NormalZoomAcross](pathname:///img/new-features/v5.1/01_NormalZoomAcross.png)

Users can enable/disable the new Detailed Zoom Across going to User Preference window (by default is disabled):

![02 DetailedZoomPreference](pathname:///img/new-features/v5.1/02_DetailedZoomPreference.png)

And as a result the Zoom Across button can show a lot more related information about where a record is used:

![03 DetailedZoom](pathname:///img/new-features/v5.1/03_DetailedZoom.png)

You can set per tenant the System Configurator [ZOOM_ACROSS_QUERY_TIMEOUT](http://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#ZOOM_ACROSS_QUERY_TIMEOUT).  This defines a timeout in seconds for every count query executed in this toolbar button, by default these queries timeout in 5 seconds.

![04 SysConfigZoomTimeout](pathname:///img/new-features/v5.1/04_SysConfigZoomTimeout.png)

**Technical Info:** [IDEMPIERE-3580](http://idempiere.atlassian.net/browse/IDEMPIERE-3580)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF5.1_DetailedZoomAcross)_
