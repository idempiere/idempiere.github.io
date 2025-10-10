---
title: What is a 2Pack in iDempiere?
sidebar_label: 2Packs
description: Learn what a 2Pack is, how it works, and why it's essential for configuration migration in iDempiere.
sidebar_position: 1
---

# 📦 What is a 2Pack in iDempiere?

A **2Pack** in iDempiere is a powerful packaging mechanism that enables easy configuration management across environments.

:::note What is a 2Pack?
A 2Pack allows you to **export and import** application metadata and configuration (such as windows, processes, tables, reports, and even data) between different iDempiere environments.
:::

Think of it as a "configuration snapshot" that can be easily transferred and applied to different iDempiere instances.

---

## 🎯 Purpose

2Packs are used to:

- Transfer configurations between **development**, **test**, and **production** environments
- Distribute customizations as part of **plug-ins**
- Automatically **initialize** or **update** application components when deploying a plug-in

---

## 🧩 What Can Be Included?

A 2Pack can include the following elements:

| Type                         | Description |
|------------------------------|-------------|
| **Windows / Tabs / Fields**  | Entire UI components |
| **Processes / Reports**      | Custom processes or Jasper reports |
| **Tables / Columns**         | Custom database structures |
| **Roles / Menus / Messages** | Security settings and localization |
| **SQL Scripts**              | Executed automatically during Pack In |
| **Dynamic Validations**      | Input validation rules |
| **Print Formats / References** | Custom documents and reference data |
| **Arbitrary Data**           | Any row from any table using SQL |

---

## 🔁 Key Concepts

- **Pack Out**: Export configuration and/or data into a `.zip` file
- **Pack In**: Import the `.zip` file into another iDempiere environment

The `.zip` file contains an XML manifest and associated data files.

---

## ⚙️ How It Works

### 📋 Step-by-Step Workflow

1. **Define Package**: Developers define a **Pack Out** package using the iDempiere UI
2. **Generate Archive**: 2Pack generates a `.zip` file with all the selected metadata and data
3. **Deploy Package**: The `.zip` can be imported using multiple methods:

#### Import Methods

**Manual Import**
- Use the **Pack In** window in iDempiere UI

**Automated via Plug-ins** 
- `AdempiereActivator`: Basic activation
- `Incremental2PackActivator`: Advanced activation with version control

**Automatic External Pack In**
- iDempiere automatically scans a configured folder for `.zip` files
- Installs them automatically on startup
- Perfect for automated deployments and containerized environments

:::tip Pro Tip
Use **Automatic External Pack In** for CI/CD pipelines and Docker deployments to achieve zero-touch configuration updates.
:::

---

## 🛠️ File Naming Conventions

### Standard 2Pack Naming

For general use, 2Pack files are typically named using a descriptive format:

```
2Pack_1.0.0_MyPlugin.zip
```

### Automatic External Pack In

:::info Automatic External Pack In Feature
If you use the **Automatic External Pack In** feature, you must follow a specific naming convention for iDempiere to automatically detect and process your 2Pack files.
:::

**Required Format:**
```
[Timestamp]_[ClientValue]_[AdditionalInformation].zip
```

**Components:**
- **Timestamp**: Format `YYYYMMDDHHMM` (Year, Month, Day, Hour, Minute)
- **ClientValue**: The client identifier (e.g., `SYSTEM`, `GardenWorld`)
- **AdditionalInformation**: Descriptive name for the pack

**Example:**
```
201803161725_SYSTEM_CreateNewColumn.zip
```

:::tip Best Practice
Use descriptive names for the `AdditionalInformation` part to make it easy to identify what the 2Pack contains, especially when managing multiple packs.
:::

---

## ✅ Benefits

- Enables consistent configuration across systems
- Automates initial setup for plug-ins
- Reduces risk of manual errors
- Cleanly separates code from configuration
- Works with version control and CI/CD

:::success
2Pack is an **essential component** for working with iDempiere in a professional and scalable way. It's the foundation for maintainable, enterprise-grade iDempiere deployments.
:::
---

## 👉 What’s Next?

Now that you understand what a 2Pack is, **read the next section to learn step-by-step how to create and import 2Packs in your own plug-ins or iDempiere environments.**