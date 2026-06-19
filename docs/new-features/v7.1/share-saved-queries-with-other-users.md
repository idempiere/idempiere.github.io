---
sidebar_position: 9
title: "Share saved queries with other users"
sidebar_label: "Share saved queries with other users"
description: "**Goal:** Functional - Usability"
tags: [user-experience]
---
**Goal:** Functional - Usability

**Developer:** Diego Ruiz

**Sponsor:** [BX Service GmbH](http://www.bx-service.com/)

![GlobalSearch](pathname:///img/new-features/v7.1/GlobalSearch.gif)

**Description:**

The goal is to allow users to share some search filters with other users. This functionality works for Windows and for the Report Viewer Window.

Behaviour is defined by these rules:
1. A User Query record with no user and no role with client = System => Universal across the system for all clients.
1. A User Query record with no user and no role with client != System => search filter accessible for all users of that client.
1. A User Query record with a role and no user => Accessible for all users within that role.
1. A User Query record user => Default behaviour, search filter just for that particular user.

The advanced users and System client can create new queries in the new “User Queries” Window. Depending on the rules defined above, those filters will be applied to all users in the system, all users of a client, all users within a role in a client or a particular user.

![UserQueriesWindow](pathname:///img/new-features/v7.1/UserQueriesWindow.jpg)

Additionally, users within roles with Preference Level = ‘Client’ have the possibility of sharing a filter search with all users with a new button in the Find Window.

![ShareQueryButton](pathname:///img/new-features/v7.1/ShareQueryButton.jpg)

The save and share button are disabled when a search filter that does not belong to the user is selected (f.e. A search query created by System), only the user that shared the filter originally can modify it.

![DisableQueryButtons](pathname:///img/new-features/v7.1/DisableQueryButtons.jpg)

**Technical Info:** [IDEMPIERE-2837](https://idempiere.atlassian.net/browse/IDEMPIERE-2837)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Share_Saved_Queries)_
