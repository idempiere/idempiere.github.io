---
sidebar_position: 20
title: "Map Route On Locations"
sidebar_label: "Map Route On Locations"
description: "**Contributor:** Kenos"
tags: [functional]
---
**Goal:** Functional

**Contributor:** Kenos

**Description:**

This new feature adds "Map" and "Route" buttons in the location dialog:
- Map: The location is shown in a map
- Route: A route from actual organization address to the target address is shown.

![Screenshot34](pathname:///img/new-features/v1.0/Screenshot34.png)

![Screenshot35](pathname:///img/new-features/v1.0/Screenshot35.png)

## How to make it configurable (to allow using other services like yahoo, bing, mapquest)
 the "System Configurator" window, find  the "LOCATION_MAPS_URL_PREFIX" record.

![Screenshot36](pathname:///img/new-features/v1.0/Screenshot36.png)

You can use different providers by changing the value to the "Configured Value" field:

- Google (the default) = http://local.google.com/maps?q=
- Yahoo = http://maps.yahoo.com/#q=
- BING = http://www.bing.com/maps/?where1=
- Mapquest = http://www.mapquest.com/?q=

**Technical Info:** [IDEMPIERE-147](http://idempiere.atlassian.net/browse/IDEMPIERE-147)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Map_Route_On_Locations)_
