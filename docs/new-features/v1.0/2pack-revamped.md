---
sidebar_position: 68
title: "2Pack Revamped"
sidebar_label: "2Pack Revamped"
description: "**Goal:** Architecture"
tags: [architecture]
---
**Goal:** Architecture

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Video:**

[Watch on YouTube](https://www.youtube.com/watch?v=jykimSDE_54) by Jan.thielemann - [evenos Consulting GmbH](http://evenos-consulting.de)

**Description:**

The new 2Pack became a central piece of iDempiere.

With the revamped 2Pack you can:
- Move any object between databases - 2Pack takes care about the conflicting IDs with the usage of the new UUID columns that each table must have
- Move objects between tenants within the same database - 2Pack takes care of conversion table between the original UUID and new UUID to allow "update" incremental 2packs

**'Pack Out:**'

- You can choose now to include in the Packout just objects created or modified after a specific Date
- And also you can choose since Packout if you want to export/import dictionary entries (previously this was in Packin leading to errors)

![01 PackOut](pathname:///img/new-features/v1.0/01_PackOut.png)

- For any object that doesn't have a dedicated packout definition, you can export it using the Data type

![02 PackOut](pathname:///img/new-features/v1.0/02_PackOut.png)

- Also, for a straight way to Packout you can use the Export button, it will export the record (current or queried) and the detail records.

![03 PackOut](pathname:///img/new-features/v1.0/03_PackOut.png)

**'Pack In:**'

- In PackIn you must now attach the 2pack file in order to import it (previously it was needed to upload the zip file to the server and choose a file in server)

- At the end of the process 2pack gives feedback about the number of processed and un-resolved records - in case you find un-resolved you must check in the error log or the console to identify the problematic objects.

![01 PackIn](pathname:///img/new-features/v1.0/01_PackIn.png)

**Technical Info:** [IDEMPIERE-254](http://idempiere.atlassian.net/browse/IDEMPIERE-254)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_2Pack_Revamped)_
