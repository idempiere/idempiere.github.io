---
title: Using 2Pack to Transfer Data and Automate Plug-in Setup
sidebar_label: 2Pack - Transfer & Automate
description: Learn how to use iDempiere's 2Pack functionality to transfer configuration and automate setup using plug-ins.
sidebar_position: 2
---

## 🎯 Goal

This tutorial explains how to use the **2Pack functionality** in iDempiere to:

- Transfer customizations such as windows, processes, or data from one system to another
- Automatically initialize data when a plug-in is first started

---

## ✅ Prerequisites

Before starting, review:

- [Developing Plug-Ins Without Affecting the Trunk](/docs/basic-development/plugin-development/developing-plugins)
- [Running Plug-ins Locally](/docs/basic-development/plugin-development/plugin-running-locally)

You should already know how to create a plug-in, as this guide will not cover that in detail.

---

## 🔁 TL;DR

Watch this quick video overview: 
[https://www.youtube.com/watch?v=jykimSDE_54](https://www.youtube.com/watch?v=jykimSDE_54)

---

## 🔧 Pack Out Data

### Managing Your Pack Outs

- Log in as **System Administrator** if you want to pack out system-level configurations.
- Open the **Pack Out** window via:  
  `Application Dictionary > Application Packaging > Pack Out`
- Create a new entry:
  - **Name**: Use a meaningful name based on the [file naming notation recommendations](./what-is-2pack#️-file-naming-conventions)
  - **Package Version**: Match your plug-in version from `MANIFEST.MF`
  - **Description / Instructions**: Optional metadata
  - **Date From**: Filter entries by creation date
  - **Export Dictionary Entity**: Include entries with entity type `D` if needed

Once ready, you will add **Package Details** before exporting.

### What Can Be Packed Out

Use the "Package Detail" tab to define specific components. Supported types include:

- **Application or Module**: Full module with menu, windows, tables, etc.
- **Data**: Custom SQL to extract any data
- **File / Code Snippet**: Include external files or scripts
- **Process / Report / Form / Window / Table / Workflow**
- **Role / Message / Import Format / Entity Type / Model Validator**
- **Print Format / Dynamic Validation / Reference / Report View / SQL Statement**

> 🧠 You can add custom types by implementing new PIPO Handlers in the `org.adempiere.pipo.handlers` bundle.

### Creating a Package Detail

1. Add a **Package Detail** (e.g., type `Data`)
2. Select a target table (e.g., `AD_Package_Exp`)
3. Write an SQL statement to filter the data
4. Go back to the **Export Package** tab and click **Export Package**

The result will be a `2Pack.zip` saved to the packout folder or downloadable via the Web UI.

### Exporting via Table Window

In any window (e.g., Product), click the **Export** button in the toolbar:

- Choose **2Pack** as the export type
- Select all records or just the current row
- iDempiere creates a 2Pack with all linked records

---

## 📥 Pack In Data Manually

### Install a 2Pack

1. Go to **Pack In** window
2. Create a new record and upload the `.zip` as an attachment
3. Click **Pack In**

> Make sure you're logged into the correct client (e.g., System vs. GardenWorld).

You can view installed packages via **Packages Installed** or use **Package Maintenance** for rollback.

### Rollback a 2Pack

In **Package Maintenance**, select a package and run the **Pack Roll** process.  

:::note 
`Data` type may not appear in rollback details but still rolls back.
:::

---

## ⚙️ Pack In Automatically with Plug-ins

### Option 1: `AdempiereActivator`

1. In your `MANIFEST.MF`, set `AdempiereActivator` as the plug-in activator
2. Add `org.adempiere.plugin.utils` as a dependency
3. Place your `2Pack.zip` inside the `META-INF` folder

> When the plug-in is started, the 2Pack is installed if not already present.

:::info
**Important:** Update your plug-in and 2Pack version when making changes.  
Only newer versions will be installed.
:::

---

### Option 2: `Incremental2PackActivator`

Allows handling **multiple** 2Packs named with a versioning pattern:

```
2Pack_<Name>_<version>.zip
```

Examples:

- `2Pack_Tables_1.0.0.zip`
- `2Pack_Processes_1.0.1.zip`

These will be loaded and installed in order.

:::tip
Newer versions of iDempiere (after IDEMPIERE-4105) allow using this format:
```
2Pack_1.0.0_Tables.zip
```
(Only the portion after the version can contain underscores.)
:::

---

## 📚 Advanced: Packing Out Related Records

To pack out hierarchical data (e.g., `C_BPartner` and related `AD_User`), use a structured SQL:

```sql
SELECT * FROM C_BPartner WHERE [your_condition];AD_User>R_ContactInterest;C_BPartner_Location
```

- `;` separates each reference path
- `>` defines nesting/depth

For implementation, refer to [GenericPOElementHandler](https://github.com/idempiere/idempiere/blob/master/org.adempiere.pipo.handlers/src/org/adempiere/pipo2/handler/GenericPOElementHandler.java).`exportDetail()` and `.create()` methods.

---