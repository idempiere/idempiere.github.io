---
title: Developing Dashboard Panel Fragments
sidebar_label: Dashboard Panels
sidebar_position: 17
description: Learn how to create custom Dashboard Panels for the iDempiere WebUI using OSGi fragment projects.
---

# Developing Dashboard Panel Fragments

[Video walkthrough](https://www.youtube.com/watch?v=ivMTpXpTMqE)

## Goal

Dashboard Panels let you display relevant information or quick-access functions directly on the main page. This tutorial shows how to create a custom Dashboard Panel and deploy it via an OSGi fragment project.

## Prerequisites

Before you start, review the following tutorials:

- [Developing Plug-Ins Without Affecting the Core](./developing-plugins)
- [Running Plug-ins Locally in iDempiere](./plugin-running-locally)
- [Distributing and Installing Plug-ins](./distributing-plugins)

## Creating the fragment

In Eclipse, go to **File > New > Other > Plug-in Development > Fragment Project**. Select Equinox as the OSGi framework, enter a name and a location, and click **Next**. Select your execution environment and set `org.adempiere.ui.zk` as the **Host Plug-in**. Click **Finish**.

In the `src` folder, create a new package (e.g. `org.adempiere.webui.dashboard`) and a new class for your panel (by convention, Dashboard Panel class names start with `DP`, so name it something like `DPMyPanel`).

Also create a `zul` folder at the project root and add a file with a `.zul` extension.

### MANIFEST.MF setup

Open `MANIFEST.MF`:

- **Dependencies tab:** add any plug-ins your panel depends on (e.g. custom model classes).
- **Runtime tab > Exported Packages:** add your package.
- **Runtime tab > Classpath:** add the `zul` folder.
- **Build tab:** add `.` as a library if not already present; add the `src` folder. Under **Binary Build**, make sure both your `.zul` file and the manifest are checked.

## Implementing the Dashboard Panel

Extend `DashboardPanel` in your class. Call `super()` in the default constructor, then build your custom layout, add buttons, tables, or any other UI you need. Set a fixed height or let the panel calculate its own size (though an unconstrained panel may exceed the browser window height).

Open your `.zul` file and reference your class:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<window use="org.adempiere.webui.dashboard.DPMyPanel"/>
```

## Installing the fragment

Follow the [distributing plug-ins](./distributing-plugins) guide to create a feature project and install the fragment.

After installing, find the `org.adempiere.ui.zk` bundle in the Apache Felix Web Console and **refresh** it. This step is required — without it, the fragment remains in the **Installed** state instead of **Resolved** (or **Fragment**).

## Activating the Dashboard Panel

Log in as SuperUser with the System role and add your dashboard using **Dashboard Content Edit** in the menu.
