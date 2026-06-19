---
sidebar_position: 18
title: "Export Tree Definition"
sidebar_label: "Export Tree Definition"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Feature Ticket:** [IDEMPIERE-6546](https://idempiere.atlassian.net/browse/IDEMPIERE-6546)

**Description:**

Before this change, it was only possible to export the main menu tree.

Now, is possible to export any Tree, using 2Pack.

Nb: the related record must be also exported (or already present in the target instance).

The 2Pack definition is simple

First, create a line with following content:
- Type : Data or Data Single
- Table : AD_Tree
- SQL Expression/Statement : SELECT * FROM AD_Tree WHERE AD_Tree_ID=&lt;your_tree_id&gt;

![ExportTreeDefinition Tree](pathname:///img/new-features/v12/ExportTreeDefinition_Tree.png)

Then, add another line where you'll precise which nodes should be exported.
- Type : Data or Data Single
- Table : AD_TreeNode / AD_TreeNodeMM / AD_TreeNodePR / ... according to the kind of tree you're exporting
- SQL Expression/Statement : SELECT * FROM AD_TreeNodeMM WHERE AD_Tree_ID=&lt;your_tree_id&gt; **AND Node_ID &gt; 0**

The Node_ID=0 record **MUST NOT BE** exported ; that's why *AND Node_ID > 0* is added on the SQL statement.
If is present, the import will fail.

![ExportTreeDefinition TreeNode](pathname:///img/new-features/v12/ExportTreeDefinition_TreeNode.png)

Then you can export the 2Pack and import it into the destination iDempiere instance

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Export_Tree_Definition)_
