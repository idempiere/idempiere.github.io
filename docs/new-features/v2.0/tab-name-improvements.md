---
sidebar_position: 13
title: "Tab Name Improvements"
sidebar_label: "Tab Name Improvements"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Developer:** Nicolas Micoud

**Description:**

The name of the tab was improved to show a *configurable* description of the record, like the next screenshot shows.

NOTE also that when a record is modified an asterisk * is prefixed in the window to show that the record has been modified and is unsaved, making it easy to decide which windows has not been saved on logout time.

![NF20TabName01](pathname:///img/new-features/v2.0/NF20TabName01.png)

You can configure the title logic for each window as shown in the image below, note in the image above the title logic is also used on the *Recent Items* gadget

![NF20TabName02](pathname:///img/new-features/v2.0/NF20TabName02.png)

The format for *Title Logic* is one or several context variables surrounded by @, examples: @TaxID@ @DocumentNo@ @Value@ @Name@.

If this field is left empty a default title/label is created using the DocumentNo, Value and Name fields if they exist.

You can show indirect column from related tables, for example if you set on "GL Journal" window the logic "@DocumentNo@ @C_Period_ID&lt;Name&gt;@" - it will show the number of document and the name of the related period (obtained from C_Period_ID).

Note also the &lt;&gt; notation can be used to format dates, number or messages like @DateColumn&lt;dateformat&gt;@

**Technical Info:** [IDEMPIERE-1328](http://idempiere.atlassian.net/browse/IDEMPIERE-1328)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.0_Tab_Name_Improvements)_
