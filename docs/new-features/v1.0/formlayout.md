---
sidebar_position: 31
title: "Improved Form Layout"
sidebar_label: "Improved Form Layout"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

To get a flexible layout of the fields on a tab three new configuration fields were created and implemented for zk webui:

**X Position:** Determines where the field label is positioned on the grid, starting from 1 - for buttons and checkboxes this X position determines where the label AND field are positioned

**Column Span:** Determines how many columns is spanned the text box associated to the field (please note the labels are always occupying just one column, this field just applies to the text box)

**Num Lines:** For text fields you can define the number of lines that text box can expand vertically

![NF001 FormLayout001](pathname:///img/new-features/v1.0/NF001_FormLayout001.png)

For example the business partner layout can be configured this way:

![NF001 FormLayout002](pathname:///img/new-features/v1.0/NF001_FormLayout002.png)

To achieve this result:

![NF001 FormLayout003](pathname:///img/new-features/v1.0/NF001_FormLayout003.png)

Please **NOTE** that for swing client the usual configuration is done using the Display Length and Same Line fields.

**Technical Info:** [IDEMPIERE-368](http://idempiere.atlassian.net/browse/IDEMPIERE-368)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_FormLayout)_
