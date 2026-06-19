---
sidebar_position: 1
title: "Configurable Activities Dashboard"
sidebar_label: "Configurable Activities Dashboard"
description: "**Contributor:** Adaxa"
tags: [user-experience]
---
**Goal:** Usability

**Contributor:** Adaxa

**Developers:** Ashley Ramdass, Deepak Pansheriya, Murilo Habermann Torquato, Carlos Ruiz

**Description:**

Now you can configure the Activities Dashboard.

This is achieved simply configuring records in the new Document Status window:

![01 Activities](pathname:///img/new-features/v4.1/01_Activities.png)

Fields:
- **Tenant:** You can define entries for System or in Tenants, all users will see the System defined entries, Tenant entries will be shown just in specific tenant
- **Organization:** If the organization is set, it is used as a filter for the query
- **Name:** Translatable name of the entry
- **Role:** If role is set, the entry will be shown just to users logged in this role
- **User:** If user is set, the entry will be shown just to this user
- **Project:** If project is set, it is used as a filter for the query
- **Sequence:** To control the order as the entries are shown
- **Print Font/Print Color for Name**: These are the print font and color to use for the name entry, when empty then the default from the theme will be used
- **Print Font/Print Color for Number**: These are the print font and color to use for the number (count), when empty then the default from the theme will be used
- **Table:** The table where the query is based on
- **SQL Where:** The where clause to apply to count records on the table.  Global context variables can be used.  Role access rules apply.
- **Window:** Window to zoom when the user click on the entry
- **Form:** If window is not defined, then this is the form to zoom when the user click on the entry

![02 Activities](pathname:///img/new-features/v4.1/02_Activities.png)

The result looks like this:

![03 Activities](pathname:///img/new-features/v4.1/03_Activities.png)

**Technical Info:** [IDEMPIERE-3338](http://idempiere.atlassian.net/browse/IDEMPIERE-3338)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF4.1_Configurable_Activities_Dashboard)_
