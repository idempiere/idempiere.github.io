---
sidebar_position: 1
title: "Add Java Options Field To Setup"
sidebar_label: "Add Java Options Field To Setup"
description: "**Goal:** UX/Functional"
tags: [functional]
---
**Goal:** UX/Functional

**Developer:** Hengsin

**Feature** **Ticket:** [IDEMPIERE-5617](https://idempiere.atlassian.net/browse/IDEMPIERE-5617)


### Changes
![Add Java Options Field to Setup](pathname:///img/new-features/v11/Add_Java_Options_Field_to_Setup.png)

_Add Java Options Field to Setup_

Added a new field to the iDempiere server setup dialog, *Java Options*. Changes to this field will be saved as the IDEMPIERE_JAVA_OPTIONS property in idempiereEnv.properties.

### Migration Note
Scripts that depends on the number of parameters read by console-setup.sh will needs to be adjusted to cater for the added *Java Options* parameter (come after *Java Home* parameter).

### Limitation
Changes to *Java Options* field will not be added to idempiere.ini file. Therefore, if you start your server using the native executable (for e.g "./idempiere") instead of the shell script (for e.g "./idempiere-server.sh"), you will still need to edit idempiere.ini to add JVM options.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Add_Java_Options_Field_To_Setup)_
