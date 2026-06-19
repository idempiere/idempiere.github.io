---
sidebar_position: 7
title: "Improvement: Double Click in Grid View"
sidebar_label: "Improvement: Double Click in Grid View"
description: "**Sponsor:** Integratio"
tags: [user-experience]
---
## **Improvement:** Double Click in Grid View
**Goal:** Usability

**Sponsor:** Integratio

**Developer:** Diego Ruiz - BXService GmbH, Krefeld

**Description:**

In iDempiere when you are in grid mode and double click on a field the view changes to a single record view. Something similar happens when you double click in a field on the detail panel, it navigates to the detail and opens it in the single record view. This behavior sometimes is not what we want, for example if you want to paste something in a field in grid mode it cannot be done.

With this improvement now you can configure in the User Preference window this behavior.

You have to open the user preference window, there you will see the 'Toggle on Double Click' option.

![UserPrefs](pathname:///img/new-features/v3.0/UserPrefs.png)

- If the option is unchecked the window will not change its view mode on double click - **this is the default option**.

- If the option is checked it means that when double click on a field it will open the single record view with the selected record.

**Technical Info:** [IDEMPIERE-2896](https://idempiere.atlassian.net/browse/IDEMPIERE-2896)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF3.0_Toggle_on_Double_Click)_
