---
sidebar_position: 15
title: "Custom Homepage"
sidebar_label: "Custom Homepage"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Developer:** Antonio Cañaveral

**Description:**

The homepage for iDempiere is now customizable and themeable.

![01 CustomHomepage](pathname:///img/new-features/v2.1/01_CustomHomepage.png)

## How to change the homepage theme?
It's recommended that you create a home.properties file in your IDEMPIERE_HOME folder (you can copy it from sources at org.adempiere.server/src/main/home/org/bmlaurus/home/home.properties or on server you can find it within plugins/org.adempiere.server_*.jar, or download it from [bitbucket](http://bitbucket.org/idempiere/idempiere/raw/tip/org.adempiere.server/src/main/home/org/bmlaurus/home/home.properties)

In that file you can customize some variables.

To change the theme you need to customize:
- ***TemplateName:*** Defines the theme, by default iDempiere comes with white and black themes, you can create new themes (see below)

There are many other variables to customize, most are self-explanatory reading the home.properties file.  It can provide two RSS feeds and 7 links to social networks.

The next screenshot shows the theme black selected in home.properties:

![02 CustomHomepage](pathname:///img/new-features/v2.1/02_CustomHomepage.png)

## How to create a new theme?
In the home.properties file you can change the ***TemplatePath*** variable to point to the folder where your theme is located (or in server it could be added as a fragment of org.adempiere.server plugin).

The theme must simply define the associated images:

 white
 ├── images
 │   ├── img_back.png
 │   ├── img_facebook.png
 │   ├── img_felix.png
 │   ├── img_forum.png
 │   ├── img_googleplus.png
 │   ├── img_idempiereMonitor.png
 │   ├── img_irc.png
 │   ├── img_locsupport.png
 │   ├── img_option.png
 │   ├── img_resource.png
 │   ├── img_sendreq.png
 │   ├── img_supreq.png
 │   ├── img_twitter.png
 │   ├── img_webstore.png
 │   ├── img_webui.png
 │   └── img_wiki.png
 └── styles
     └── template.css

You just create a folder with your theme name and create the corresponding images according to the tree, and your own template.css

**Technical Info:** [IDEMPIERE-1325](http://idempiere.atlassian.net/browse/IDEMPIERE-1325)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Custom_Homepage)_
