---
sidebar_position: 11
title: "User Preferences"
sidebar_label: "User Preferences"
description: "**Contributor:** Diego Ruiz - Thomas Bayen - BXService GmbH, Krefeld"
tags: [user-experience]
---
**Goal:** Usability

**Contributor:** Diego Ruiz - Thomas Bayen - BXService GmbH, Krefeld

**Developer:** Diego Ruiz

**Description:**

Now you can configure preferences based on each user/client in the preference popup and the user preference's window.

- By default the previous preferences are created (AutoCommit and AutoNew).

- In the popup menu only the fields marked as quick entry in the user preference's window are displayed.

![UserPreferencesPopup](pathname:///img/new-features/v3.0/UserPreferencesPopup.png)

- When you click on the More Preference option, the User Preference's window will be open.

![UserPreferenceWindow](pathname:///img/new-features/v3.0/UserPreferenceWindow.png)

- In the images you can see that Automatic Commit and Automatic New are quick entry and Automatic Decimal Places For Amounts is not.

**How to add a new preference:**

- Login as System Administrator.

- Go to the table AD_UserPreference.

- Add a new column with the new preference. (**Don't forget to synchronize it**)

- Go to the User Preference window record on Window, Tab & Field.

- Create the new fields on the user preference tab.

- If you want it to be displayed in the popup menu, mark it as a quick entry. Otherwise you will be able to set it in the user preference window.

- Now you have your new preference for users.

**Technical Info:** [IDEMPIERE-2556](https://idempiere.atlassian.net/browse/IDEMPIERE-2556)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF3.0_User_Preference)_
