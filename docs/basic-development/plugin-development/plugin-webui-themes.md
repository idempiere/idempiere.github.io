---
title: Developing WebUI Themes
sidebar_label: WebUI Themes
sidebar_position: 16
description: Learn how to create custom WebUI themes for iDempiere using OSGi fragment projects.
---

# Developing WebUI Themes

[Video walkthrough](https://www.youtube.com/watch?v=DHD6bQFxCMs)

:::warning
This page describes a workflow that applies to older iDempiere versions (pre-9). Some tooling details (Buckminster, target platform setup) have changed. The overall approach of using an OSGi fragment attached to `org.adempiere.ui.zk` is still valid, but refer to the current iDempiere documentation for the latest build setup.
:::

## Purpose

Customize the WebUI by replacing images or changing CSS without touching core using an OSGi fragment project.

## Prerequisites

Before you start, review the following tutorials:

- [Developing Plug-Ins Without Affecting the Core](./developing-plugins)
- [Running Plug-ins Locally in iDempiere](./plugin-running-locally)
- [Distributing and Installing Plug-ins](./distributing-plugins)

## Creating the fragment

### New Fragment project

In Eclipse, go to **File > New > Other > Plug-in Development > Fragment Project**:

- **Name:** `org.evenos.newtheme`
- **Location:** use a directory outside the iDempiere workspace (keep plug-ins separate)
- **Target Platform:** OSGi Equinox
- **Execution environment:** JavaSE-11
- **Host Plug-in:** `org.adempiere.ui.zk`

### Create the new theme

Base the theme on iDempiere's default theme:

1. Create a folder called `theme` in the project root, and inside it create a subfolder for your theme (e.g. `newtheme`).
2. Copy all resources from `org.adempiere.ui.zk/theme/default` into `theme/newtheme`.
3. Replace images in `theme/newtheme/images` or modify CSS files.

:::note
Some `.zul` files in `theme/newtheme/zul` contain hard-coded resource paths. Update file paths there if necessary.
:::

### Configure MANIFEST.MF

In your `MANIFEST.MF`:

- **Overview tab:** check **This fragment is a singleton**.
- **Runtime tab > Classpath:** click **Add** and select the `theme` folder.
- **Build tab:** make sure the theme folder is checked under **Binary Build**.
- **MANIFEST.MF tab:** add this line at the end (followed by a newline):

```
Jetty-WarFragmentFolderPath: /
```

Save the manifest.

## Testing locally in Eclipse

To test the theme fragment in Eclipse:

1. Open **Run Configurations**, select the **server.product**, go to the **Plug-ins** tab, and check your theme fragment to activate it.
2. Go to the **Arguments** tab and add to VM arguments:

```
-DZK_THEME=newtheme
```

3. Run the server.
4. Log in as SuperUser with the System role, open the **System Configurator** window, search for `ZK_THEME`, and change the Configured Value from `default` to `newtheme`. Save.
5. Click **Change Role** (or select the same role again) to apply the theme.

:::tip
You can also set the browser title by adding a `ZK_BROWSER_TITLE` key in System Configurator.
:::

## Installing on the server

Export your theme fragment (via a feature project or by right-clicking the fragment and using **Export > Deployable plug-ins and fragments**), then install it following the [distributing plug-ins](./distributing-plugins) guide.

After installation:

1. In the Apache Felix Web Console, confirm that your fragment shows the state **Fragment** (refresh packages if needed).
2. Refresh the `org.adempiere.ui.zk` bundle to apply the changes.
3. Log in as SuperUser with the System role, open **System Configurator**, and change `ZK_THEME` to your theme name. Save.
4. Click **Change Role** to load the new theme.

:::tip
If the theme or images don't change, flush your browser cache. If that doesn't help, recycle the application.
:::

## See also

- [Update your development environment (zk7 branch)](https://wiki.idempiere.org/en/Update_your_development_environment_zk7_branch): there is a known issue with fragments caused by the move from Tomcat to Jetty.
