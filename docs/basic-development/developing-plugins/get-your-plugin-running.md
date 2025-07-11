---
title: Get Your Plug‑In Running
description: Step-by-step guide to creating and testing your first iDempiere plug-in.
sidebar_position: 2
---

# Get Your Plug‑In Running

This guide helps you get your first iDempiere plug-in up and running in Eclipse. It focuses on the essentials: creating the right project structure and testing your plug-in directly in the application.

---

## 🔧 What You'll Learn

- How to structure your plug-in project
- How to create and export a JAR file
- How to deploy and test your plug-in in iDempiere

---

## 📁 Recommended Project Structure

To keep your workspace clean and modular, use the following layout:

de.companyname.projectname/
├── plugin/ → Plug-in implementation
├── features/ → Feature definitions (optional)
└── site/ → P2 update site (optional)


Example:
de.evenos.testplugin/
├── plugin/
├── features/
└── site/

> You can also create each folder as a separate Eclipse project.

---

## Testing Your Plug-In

### Option 1: Direct Deployment

1. Export your plug-in project as a `.jar` file.
2. Install it via telnet
3. Start iDempiere.
4. If your code is correct, your plug-in will be loaded automatically.

### Option 2: P2 Update Site

If you're familiar with Eclipse update sites, you can also create a P2 site from your plug-in project using the **Site Project Wizard**. This allows you to deploy plug-ins via the OSGi console using the `install` command.

---

## 📦 Exporting Your Plug-In

1. Right-click your project → **Export**
2. Select **Plug-in Development → Deployable plug-ins and fragments**
3. Choose an export destination (e.g., `~/Desktop/testplugin.jar`)
4. Click **Finish**

> Tip: You can automate this using a Maven or Gradle build pipeline later.

---

## ✅ Summary

You now have:

- A basic plug-in structure
- A JAR file ready to deploy
- A running plug-in inside iDempiere

Next, dive into extending iDempiere with services, annotations, and extension points.

---

## 📚 Related Resources

- [Developing Plug-ins Without Affecting the Trunk](./developing-plug-ins-without-affecting-the-trunk)
- [Using OSGi Annotations](https://wiki.idempiere.org/en/Using_OSGi_Annotations)
- [Advanced OSGi Event Handling](https://wiki.idempiere.org/en/Using_OSGi_Event_Handlers)
