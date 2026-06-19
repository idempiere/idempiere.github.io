---
sidebar_position: 39
title: "Synchronize Print Format Items"
sidebar_label: "Synchronize Print Format Items"
description: "**Developer:** Nicolas Micoud"
tags: [technical]
---
**Goal:** Technical

**Developer:** Nicolas Micoud

**Sponsor:** [TGI](http://tgi.eu)

**Feature Ticket:** [IDEMPIERE-5507](https://idempiere.atlassian.net/browse/IDEMPIERE-5507)

**Description:**

Especially in SaaS environnment, it is time consuming to add some columns in Report Views and make them available in reports.

Using this process, this task is quicker.

All missing columns will be added in corresponding print formats.

![PrintFormatItemSyncProcess](pathname:///img/new-features/v10/PrintFormatItemSyncProcess.png)

Just select :
- **Source** : Missing columns are taken from the Table (ie all columns), or from the ReportView Column (ie only those which are intented to be displayed)
- **Report View** : Which Report View should be taken as basis for print formats
- **Print Format** : You can select here a single print format (if you want to update only one)
- **Language** : The language to be used for the printname fields (without it, it will take the login language)

And that's it !

Missing Print Format Items are added (but not visible) ; user has to add them (using the Wizard for instance)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Sync_Print_Format_Items)_
