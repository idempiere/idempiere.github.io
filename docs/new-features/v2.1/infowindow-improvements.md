---
sidebar_position: 19
title: "InfoWindow Improvements"
sidebar_label: "InfoWindow Improvements"
description: "To make user more comfortable with info window"
tags: [user-experience]
---
**Goal:** Usability
To make user more comfortable with info window

**Description:**
***1. Add button reset to all infoWindow***
When clicked, it resets all criteria field to initial value.
- Where field has default value, it resets to default value
- Where field has a preference value it resets to preference value
- Where value of field init to a value (as "Price List Version" in produce info) it reset to this value.
- Others reset to a blank value

![Infowindow reset](pathname:///img/new-features/v2.1/Infowindow_reset.png)

***2. Add ability define "Default Logic" value for criteria field***

same default logic field at standard window

![Infowindow defaultValue](pathname:///img/new-features/v2.1/Infowindow_defaultValue.png)

***3. Add is mandatory to criteria field***

- Improvement as submitted at [IDEMPIERE-1970](http://idempiere.atlassian.net/browse/IDEMPIERE-1970).
    - Info-Window data not only comes from a Table, it can also come from a View.

- Improvement as submitted at [IDEMPIERE-1334](http://idempiere.atlassian.net/browse/IDEMPIERE-1334).
    - You can define a process run for group record, other process run for other group record.
    - So, you have to set the mandatory parameter.
    - You also can define display logic for process button by value input at criteria field.
    - According to the filter at the group, only the suitable process button is displayed

![Infowindow displayLogicProcess](pathname:///img/new-features/v2.1/Infowindow_displayLogicProcess.png)

**Technical Info:** [IDEMPIERE-1378](http://idempiere.atlassian.net/browse/IDEMPIERE-1378), [IDEMPIERE-1792](http://idempiere.atlassian.net/browse/IDEMPIERE-1792), [IDEMPIERE-1972](http://idempiere.atlassian.net/browse/IDEMPIERE-1972), [IDEMPIERE-1973](http://idempiere.atlassian.net/browse/IDEMPIERE-1973)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_InfoWindow_Improvements)_
