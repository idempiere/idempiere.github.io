---
title: Running Plug-ins Locally in iDempiere
sidebar_label: Running Plug-ins Locally
description: Guide to configure and run plug-ins locally in iDempiere.
sidebar_position: 2
---

# Running Plug-ins Locally in iDempiere

This guide explains how to configure and run your plug-ins locally in iDempiere. Whether you're developing a `ModelValidator`, `Callout`, `Process`, or `Report`, this tutorial will help you get your plug-in running smoothly.

---

## 🎯 Goal

After setting up your plug-in project, you might wonder: **How do I make it work within iDempiere?**

To avoid merge conflicts and keep customizations maintainable, plug-ins should be developed **outside the core**. This tutorial shows you how.

---

## ✅ Prerequisites

Before continuing, we strongly recommend reading:

- [Developing Plug-ins Without Affecting the Core](./developing-plugins)

This guide explains best practices for clean, modular plug-in development.

---

## ⚙️ Workflow

After creating your plug-in project, open the `MANIFEST.MF` file.

### 1. Add Dependencies

Switch to the **Dependencies** tab and add:

- `org.adempiere.base`
- `org.adempiere.plugin.utils`

### 2. Enable Singleton and Activator

Switch back to the **Overview** tab:

- Check the box: **This plug-in is a singleton**
- Choose `Incremental2PackActivator` as the activator class (recommended).

> If you include a `2Pack.zip` in your `META-INF` folder, the activator automatically processes the pack.

### 3. Activate the Plug-in

Open your **Run Configurations**, select the `server.product` launcher, and go to the **Plug-ins** tab.

- Search for your plug-in and **enable it**.
- Set **Auto-Start** to `true`.
- Set **Start Level** to `5` or higher.

Then launch the server using the `server.product` configuration.

To verify that your plug-in is active:

1. In the Eclipse **Console** window, type `ss` and press Enter.
2. Find your plug-in in the list and confirm that its state is `ACTIVE`.

> If your plug-in does not start automatically, you can start it manually using:

```bash
start <bundle_number>
```

---

## 🚀 Additional Features

:::tip Automatically Start Your Plug-in
- Set **Autostart = true** in Run Configurations.
- Or check **"Activate this plug-in when one of its classes is loaded"** in `MANIFEST.MF`.
:::

For integrating `ModelValidators`, `Processes`, `Callouts`, and more, refer to the other plug-in development guides in the documentation.

---

## 🔚 Conclusion

By following this guide, you can configure and run your plug-ins locally in iDempiere. For the next step, learn how to distribute and install your plug-ins in the [Distributing Plug-ins](./distributing-plugins) guide.