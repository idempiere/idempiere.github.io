---
sidebar_position: 23
title: "Generate Model Template"
sidebar_label: "Generate Model Template"
description: "**Developers:** Nicolas Micoud"
tags: [technical]
---
**Goal:** Technical

**Developers:** Nicolas Micoud

**Sponsor:** [TGI](http://tgi.eu)

**Feature Ticket:** [IDEMPIERE-5796](https://idempiere.atlassian.net/browse/IDEMPIERE-5796)

**Description:**
This plugin allows to execute GenerateModel from iDempiere using templates, only when the [Developer Mode](https://idempiere.atlassian.net/browse/IDEMPIERE-5795) is active (ie when is executed from Eclipse)

### Configuration of templates
In each template, you can configure:
- **Name:** The name of the template
- **Folder:** The folder where the model java classes X_ and I_ will be generated
- **DB Table Name:** this is a table name, or a LIKE clause (f.e. if you use underscore _ or percent sign %), it can also be a comma separated list of table names surrounded by single quotes, also you can write `@TableName@` here so when the process is executed from the *Table and Column* window, the current table will be retrieved
- **Package Name:** the package used for the classes, this also determines in which folder the classes will be written
- **Table Entity Type:** These are the entity types of the tables to generate model classes, you can write `@EntityType@` so when the process is executed from the *Table and Column* window, the current Entity Type will be retrieved
- **Column Entity Type:** this is normally left empty, but it can be used if you want to generate the model classes just for the columns with certain entity types, same as with Table Entity Type you can write `@EntityType@` with the same purpose

![GenerateModelTemplates Window](pathname:///img/new-features/v11/GenerateModelTemplates_Window.png)

### Execution of the process
The process can be called from the menu or from the toolbar of Table and Column / Reference windows
It has the same layout as the "old" java panel

There, you can select a template and it will populate fields.

![GenerateModelTemplates ProcessPanel](pathname:///img/new-features/v11/GenerateModelTemplates_ProcessPanel.png)

Output can be read on Eclipse console

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Generate_Model_Template)_
