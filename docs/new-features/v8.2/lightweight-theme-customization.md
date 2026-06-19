---
sidebar_position: 18
title: "Lightweight theme customization"
sidebar_label: "Lightweight theme customization"
description: "**Developer:** Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Carlos Ruiz

**Description:**

To allow theme customization without the need to fully develop a theme the default theme can be extended with a fragment containing a "fragment/custom.css.dsp".

An example replacing the font can be found on https://github.com/CarlosRuiz-globalqss/idempiere.example.custom.theme

After loading the fragment with the felix console don't forget to refresh 'iDempiere Web Client (org.adempiere.ui.zk)'.

Additionally the usage of font symbols instead of graphical icons can be configured with ZK_THEME_USE_FONT_ICON_FOR_IMAGE

#### See also
[NF12 Theme Customization](https://wiki.idempiere.org/en/NF12_Theme_Customization)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Lightweight_theme_customization)_
