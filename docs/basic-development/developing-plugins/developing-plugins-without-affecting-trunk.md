---
title: Developing Plug‑Ins Without Affecting the Trunk
description: How to set up a plug-in project in Eclipse separate from the iDempiere Core.
sidebar_position: 1
---

# Developing Plug‑Ins Without Affecting the Trunk


## 🎯 Goal

This guide shows you how to develop plug‑ins in Eclipse **without affecting the iDempiere Core**. You'll benefit if:

- Your plug‑in is for personal, testing, or tutoring use
- You need customized plug‑ins alongside a shared base
- You want to keep plug-in and core development separate to allow core updates independently

---

## 🛠 Prerequisites

Ensure you’ve set up the following:

- iDempiere workspace in Eclipse
- Github source control

---

## 🔗 Related Tutorials

If you're missing prerequisites, check out:

- Installing iDempiere for Development


## 🚀 Workflow

1. In Eclipse, go to **File → New → Other…**
2. Choose **Plug-in Project** under **Plug-in Development**
3. **Uncheck** "Use default location" and point to a separate folder. For example: ~/workspace/idempiere-plugins/de.evenos.testplugin
4. Select Equinox OSGi framework and Java 11 (or higher), and skip generating the activator.
5. Click **Finish**. The plug-in appears in Eclipse **without the [development] tag**, meaning it's not connected to the main iDempiere repository.
6. To use version control, right-click on the project → **Team → Share Project**
7. Select "Use or create repository in parent folder", ensure it's pointing to your chosen plugins folder, and click **Create Repository** → **Finish**.

Congrats! Your plug-in is now ready. Your changes are isolated and won't affect the Core.

---

## 💡 Additional Notes

- You can also place multiple plug-ins in one Git repo:
- Create a parent folder (e.g., `~/workspace/idempiere-plugins`)
- Initialize a single Git repository in it
- Add multiple plug-in subfolders inside (your new projects)
- This gives you a monolithic project structure without linking to the iDempiere Core.

---

## 🚧 What’s Next?

- Learn how to sync plug‑in updates with Core improvements
- Explore advanced OSGi features: service annotations, extension points, event handlers
- Check out other tutorials in the "Plug‑In Development" category for things like:

- Model Validators
- Pack‑In/Pack‑Out (2Pack)
- Custom Process
- Scaffolding
- Custom Forms
- Event Handlers

---

## 🧭 References

- OSGi Service Component annotations (Eclipse Oxygen+)
- Getting rid of `plugin.xml` using `@Component` from `org.osgi.service.component.annotations`
- Event handling with OSGi
- Advanced tutorials for extension development

---

## 🏁 Summary

By developing your plug-in outside the iDempiere core and using OSGi/Git isolation, you'll benefit from:

1. Independent plug-in lifecycle management  
2. Core updates without conflict  
3. Better plug-in scalability and structure  

From here, you're ready to build OSGi-based features, connect extension points, and auto-package changes using tools like 2Pack. Happy coding! 🚀