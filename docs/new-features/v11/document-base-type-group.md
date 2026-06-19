---
sidebar_position: 22
title: "Document Base Type Group"
sidebar_label: "Document Base Type Group"
description: "**Developer:** cloudempiere, takacs peter"
tags: [technical]
---
**Goal:** Business

**Developer:** cloudempiere, takacs peter

Now you can define new Document Base Type Groups, for example: document types for costing, for accounting, for AR etc.

Example we define test group  with doctype lines
![Doc type group](pathname:///img/new-features/v11/Doc_type_group.png)
DocType group Implementation in Period Control managent, allow open a doctype group. This open 2 period control
![Doctype Group Period](pathname:///img/new-features/v11/Doctype_Group_Period.png)
Period Control Management new field added, Document Base Type Group, which allow filter with group multiple period controls. in this example 2 periods.

**Real example:**

The user needs to open one quarter for 11 doc base types (costing) - when the user opens period control info, selects 3 months range, then it returns 32*3=96 period control entries and as next step, must select 11*3=33 period controls for this area.

Instead of this the user could now quickly select one from the predefined groups every time.
![Doctype Group Period Control](pathname:///img/new-features/v11/Doctype_Group_Period_Control.png)

**Technical Info:** [IDEMPIERE-5659](https://idempiere.atlassian.net/browse/IDEMPIERE-5659)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Document_Base_Type_Group)_
