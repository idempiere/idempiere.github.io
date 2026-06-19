---
sidebar_position: 26
title: "Theme Customization"
sidebar_label: "Theme Customization"
description: "**Developer:**  Nicolas Micoud"
tags: [technical]
---
**Goal:** Technical

**Developer:**  Nicolas Micoud

**Feature Ticket:** [IDEMPIERE-6293](https://idempiere.atlassian.net/browse/IDEMPIERE-6293)

**Sponsor:** [TGI](http://tgi.eu)

**Description:**

Objective of the ticket is to allow minor variations on themes.

Sometimes, only several toolbar buttons or little variations on css are needed and there is no other way but to duplicate the whole theme which is time consuming to maintain.

With this new feature, you just have to add resources in your theme (deployed as a fragment) and record changes in the dedicated window.

On the header, fill following fields
- Org and/or Role and/or User : scope of application
- Theme : the theme on which customizations will apply
- Description
- Stylesheet : path to the new Stylesheet (to override /css/theme.css.dsp if needed)

On Detail tab, you register current and new values.

![ThemeCustomizationExample](pathname:///img/new-features/v12/ThemeCustomizationExample.png)

This example will invert Delete and Save buttons for GardenWorld User role - for hazing new users :)

That's why in the toolbar:
- the Save button is active (in reality is the Delete button)
- the Delete button is not active (in reality is the Save button)

To deploy new elements, you can use a fragment or attachment (ie it can be used on-the-fly, without any changes to the code).

Simply attach your image(s) and/or css file to the Theme Customization record and use the following syntax in the field:

eg: attachment:AD_UserDef_Theme/custom.css,e3979632-b924-43c9-8771-13c69a81015a

![ThemeCustomizationAttachment](pathname:///img/new-features/v12/ThemeCustomizationAttachment.png)

And you can see the New button has been updated and the selected tab is now red

#### See also
[NF8.2 Lightweight theme customization](https://wiki.idempiere.org/en/NF8.2_Lightweight_theme_customization)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Theme_Customization)_
