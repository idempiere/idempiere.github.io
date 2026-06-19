---
sidebar_position: 6
title: "Improve toolbar, make it more configurable and extend it"
sidebar_label: "Improve toolbar, make it more configurable and extend it"
description: "**Goal:** Functional - Usability"
tags: [user-experience]
---
**Goal:** Functional - Usability

**Developer:** Diego Ruiz

**Sponsor:** [BX Service GmbH](http://www.bx-service.com/)

**Description:**

The goal of the new feature is to improve the toolbar and make it more configurable and extend its functionality, with a show More option to hide the less used buttons by default without inactivating them and adding a Combobox with the saved queries to let the user (1) know which query is currently active in the window and (2) changed the filter easily and quick.

## Show More button
To know more about the show more button, please check [NF7.1 Show More Button In Toolbar](https://wiki.idempiere.org/en/NF7.1_Show_More_Button_In_Toolbar).

## Search in the toolbar
Now you can see the saved searches in the toolbar on any window.

The users will be able to search through that column in simple and advanced searches

![QueryToolbarCombobox](pathname:///img/new-features/v7.1/QueryToolbarCombobox.jpg)

If you select any search from the list, the corresponding filter will be applied to the window and the results will be displayed.

![ToolbarAppliedQuery](pathname:///img/new-features/v7.1/ToolbarAppliedQuery.jpg)

The update between Find and this Combobox is both ways - if you modify the search on the Combobox, when you open the find dialogue, that search query will be selected. If you open the find dialogue and select a saved query, when you click ok, the corresponding search will be selected in the toolbar Combobox.

''This feature was split in two. The code was pushed to the release 7.1 and 8.1 and the scripts were pushed to 8.1 exclusively.

''If you want to enable this feature in iDempiere 7.1, apply the following migration scripts in this order:

202002051703_IDEMPIERE-4084.sql

202002101911_IDEMPIERE-4084.sql

202003041800_IDEMPIERE-4085.sql
''

**Technical Info:** [IDEMPIERE-4084](https://idempiere.atlassian.net/browse/IDEMPIERE-4084) - **Technical Info:** [IDEMPIERE-4085](https://idempiere.atlassian.net/browse/IDEMPIERE-4085)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Toolbar_Improvements)_
