---
sidebar_position: 28
title: "Multiple BOM support for Mfg Light"
sidebar_label: "Multiple BOM support for Mfg Light"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-1250](https://idempiere.atlassian.net/browse/IDEMPIERE-1250)

**Description:**

Implement multi BOM support for manufacturing light:
1. Use Libero BOM (PP_Product_BOM and PP_Product_BOMLine) for multi BOM support
1. Change M_Product_BOM to view
1. Add product BOM field to Production window
1. Add product BOM parameter to Create Production dialog
1. Product BOM with BOM Use=Master and BOM Type=Current Active is the default BOM

## Screen Shot
1. Updated BOM tab at Product window
1. * ![BOM 1250](pathname:///img/new-features/v9/BOM_1250.png)

_BOM tab_
1. BOM Formula field at Production window
1. * ![Production BOM Formula 1250](pathname:///img/new-features/v9/Production_BOM_Formula_1250.png)

_BOM Formula field at Production window_
1. BOM Formula field at Create Production dialog
1. * ![Create Production BOM Formula 1250](pathname:///img/new-features/v9/Create_Production_BOM_Formula_1250.png)

_BOM Formula field at Create Production dialog_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Multi_BOM_Mfg_Light)_
