---
sidebar_position: 53
title: "Custom Window Toolbar Buttons"
sidebar_label: "Custom Window Toolbar Buttons"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [technical]
---

**Goal:** Technical

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

Create custom toolbar button for window using OSGi dynamic service.

**Example:**

**OSGi bundle project for the export button action**

![NF001 CustomWindowToolbarButton001](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton001.png)

Class ExportAction is implements interface org.adempiere.webui.action.IAction

**OSGi Service Component - Overview**

''Note that the component name is use to locate the service and also the loading of image and tooltip text.

![NF001 CustomWindowToolbarButton002](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton002.png)


**OSGi Service Component- Services**

![NF001 CustomWindowToolbarButton003](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton003.png)


**Bundle activator for auto 2pack import**

![NF001 CustomWindowToolbarButton004](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton004.png)


**Create new window toolbar button record**

![NF001 CustomWindowToolbarButton005](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton005.png)


**Create tooltip text message**

![NF001 CustomWindowToolbarButton006](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton006.png)


**Pack out the toolbar button and tooltip text record**

![NF001 CustomWindowToolbarButton007](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton007.png)


**Testing from Eclipse**

![NF001 CustomWindowToolbarButton008](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton008.png)


**Result**

![NF001 CustomWindowToolbarButton009](pathname:///img/new-features/v1.0/NF001_CustomWindowToolbarButton009.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_CustomWindowToolbarButton)_
