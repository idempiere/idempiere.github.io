---
sidebar_position: 10
title: "Find Window"
sidebar_label: "Find Window"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [functional]
---
**Goal:** Usability

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

The history button was moved from toolbar to search window.

![search1](pathname:///img/new-features/v1.0/search1.png)

Can save advanced search

Make advanced search in any window

![search2](pathname:///img/new-features/v1.0/search2.png)

Assign a name to the search and save

![search3](pathname:///img/new-features/v1.0/search3.png)

Can use this search anytime needed, use the drill down to select a previously saved search.

![search4](pathname:///img/new-features/v1.0/search4.png)

Implement the AND/OR for use in the advanced search also can use parenthesis for organize the search

![search5](pathname:///img/new-features/v1.0/search5.png)

All operators were reviewed to allow using operators on all columns where is possible, like  > `>=` < `<=` ...  (also operators to search NULL and NOT NULL values were added)

For Example:

![search6](pathname:///img/new-features/v1.0/search6.png)

  != not equal
  `>=` greater than or equal
  `<=` lesser than or equal
  >_< between
  !NULL  not null

Now you can order the fields on the search window.

  With role System Administrator
  In Window  "Table and Column" tab "Column"
  Select the column that will appear in the  search window
  Select the flag "Selection Column"
  The field "Selection Column Sequence" comes on to select the order that will appear in the window search

![search7](pathname:///img/new-features/v1.0/search7.png)

![search8](pathname:///img/new-features/v1.0/search8.png)

**Technical Info:** [IDEMPIERE-377](http://idempiere.atlassian.net/browse/IDEMPIERE-377)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Find_Window)_
