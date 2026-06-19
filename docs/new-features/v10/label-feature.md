---
sidebar_position: 16
title: "Label Feature"
sidebar_label: "Label Feature"
description: "**Developer:** Alan.lesc1 ([talk](https://wiki.idempiere.org/en/User_talk:Alan.lesc1))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Alan.lesc1 ([talk](https://wiki.idempiere.org/en/User_talk:Alan.lesc1))

**Sponsor:** Norbert Bede

**Feature Ticket:** [IDEMPIERE-5259](https://idempiere.atlassian.net/browse/IDEMPIERE-5259)

**Description:**

This feature should allow users to assign metadata (labels) to any iDempiere record. Each label is a single word or a multi-word sentence. Labels can help users manage, identify, organize, search for, and filter entities. They can be used to add more context to records or to categorize them by purpose, department, team, owner, environment, or any other criteria. Users should be able to add, change, or remove labels. Records may have none, one or more labels:

![ToolbarIcon](pathname:///img/new-features/v10/ToolbarIcon.png)

Labels colors are calculated automatically based on the label text hashcode. That means you will always get the same color for a label in different systems. You can disable this behavior through System Configurator **LABEL_AUTOMATIC_COLOR** as shown below:

![SystemConfigurator](pathname:///img/new-features/v10/SystemConfigurator.png)

Labels can be translated, have a category assigned and have a CSS style applied to them:

![LabelWindow](pathname:///img/new-features/v10/LabelWindow.png)

Users can also assign a CSS style to a Label Category so labels inherit its style. It is also possible to restrict the use of labels in a given table:

![LabelCategoryWindow](pathname:///img/new-features/v10/LabelCategoryWindow.png)

Finally, users can use the Label Assignment window to perform common actions with labels, e.g. generate usage reports or perform batch actions (e.g. record deletions):

![LabelAssignmentWindow](pathname:///img/new-features/v10/LabelAssignmentWindow.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Label_Feature)_
