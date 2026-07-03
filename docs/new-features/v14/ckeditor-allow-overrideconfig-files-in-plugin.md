---
title: "CKEditor : allow override config files in a plugin"
sidebar_label: "CKEditor : allow override config files in a plugin"
sidebar_position: 1
description: Allow to override config.js and config-min.js in a plugin
---

**Goal:** Technical  
**Developer:** [Nicolas Micoud](https://wiki.idempiere.org/en/User:Nmicoud) ([TGI](https://www.tgi.eu))  
**Feature Ticket:** [IDEMPIERE-6953](https://idempiere.atlassian.net/browse/IDEMPIERE-6953)

## CKEditor : allow override config files in a plugin

It can be useful to override config files of CKEditor in a plugin (eg: for spell check).

You can find an example of a plugin (fragment) here: https://github.com/nmicoud/org.idempiere.ckeditor.example

Two System Configurator keys are available to store the path:

- **CKEDITOR_FILE_CONFIG**
- **CKEDITOR_FILE_CONFIG_MIN**

