---
title: Developing Plug-ins Without Affecting the Core
sidebar_label: Plugin Workflow (Isolated from Core)
sidebar_position: 1
description: How to develop iDempiere plug-ins independently from the core codebase
---

# Developing Plug-ins Without Affecting the Core

This guide explains how to develop plug-ins **separately from the iDempiere core**, ensuring clean separation between your customizations and the official core codebase. This approach is ideal for:

- Building plug-ins for personal, educational, or testing purposes
- Implementing customer-specific extensions without modifying core code
- Enabling clean merges of iDempiere updates without interference from plug-in code

---

## 🧰 Prerequisites

Before you begin, ensure you have:

- A working iDempiere development environment set up in **Eclipse**.
- Version control configured.

---

:::info 
Instead of starting from scratch, you might want to use the scaffolding tool from [iDempiere Plugin Scaffold](https://github.com/saulojg/idempiere-plugin-scaffold/) instead. This tool provides a pre-configured structure to help you quickly set up your plug-in project, saving time and effort.
:::

## 📚 Recommended Workflow

1. In Eclipse, go to:

   ```
   File → New → Other… → Plug-in Project
   ```

2. Provide a custom project name (e.g., `com.yourcompany.pluginname`).

3. **Uncheck** “Use default location” and choose a custom folder outside the iDempiere core repository, such as:

   ```
   idempiere-plugins/your-plugin-name
   ```

4. Set the plug-in target platform to **Equinox** and click Next

5. Choose a compatible Java execution environment (e.g., JavaSE-17 or later).

6. Disable options like "Generate an activator".

7. Once created, connect the project to version control:

   ```
   Right-click the project → Team → Share Project
   ```

   Create or select a Git repository in your plugin directory.

---

:::tip
Instead of creating a Git repository for each of your plug-ins and fragments, you can also follow this approach:
- Create a directory on your hard drive to contain all your plug-ins and fragments.
- Initialize a single Git repository in this directory.
- Place all newly created plug-ins and fragments in this repository directory, skipping the step of creating separate repositories for each.
- This way, you maintain one consolidated repository containing all your files.

By following these tips, your plug-in development process becomes more streamlined and easier to manage.
:::