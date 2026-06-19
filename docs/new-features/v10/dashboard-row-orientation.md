---
sidebar_position: 26
title: "Dashboard Row Orientation"
sidebar_label: "Dashboard Row Orientation"
description: "**Goal:** UX/Functional"
tags: [user-experience]
---
**Goal:** UX/Functional

**Developer:** cloudempiere, Takacs Peter, **Design**: Norbert Bede **Review**: Hengsin Low

**Feature Ticket: [IDEMPIERE-5389](https://idempiere.atlassian.net/browse/IDEMPIERE-5389)**

**Improvement**

This feature allows you to arrange dashboard modules/gadgets into rows. The image illustrate a potential layout with various row organisation. The solution supports drag and drop and re-organisation by mouse, for different widget width must be set proper **flex-grow** value. [read more.](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)
![Dashboard row concept](pathname:///img/new-features/v10/Dashboard-row-concept.png)

_Dashboard-row-concept_

*Note: The solution still supports column orientation.*

**Changes**

- New sysconfig added: DASHBOARD_LAYOUT_ORIENTATION - R = Row C = Column (default/fallback)
- Dasboard Preference new field: FlexGrow - default 1

**Setup**: DASHBOARD_LAYOUT_ORIENTATION must be set to 'R'

**Example Use-case**:  the next example illustrate flexible flex based 1-3-1 layout. In this case user must set flex-grow field for KPI2 to 3
![Dashboard row 1 3 1](pathname:///img/new-features/v10/Dashboard-row-1-3-1.png)
![Row orientation example](pathname:///img/new-features/v10/Row-orientation_example.png)

_Row-orientation example including charts_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Dashboard_Row_Orientation)_
