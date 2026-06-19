---
sidebar_position: 54
title: "Use iDempiere Display/Reference Type In Jasper Report"
sidebar_label: "Use iDempiere Display/Reference Type In Jasper Report"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4868](https://idempiere.atlassian.net/browse/IDEMPIERE-4868) [IDEMPIERE-6048](https://idempiere.atlassian.net/browse/IDEMPIERE-6048)

**Description:**
Allow the use of iDempiere's Display/Reference Type based rendering of data in Jasper Report.

**Usage:**
1. Pass COLUMN_LOOKUP parameter of type java.util.function.BiFunction to Jasper Report.
1. To use it, you have to add a report parameter to your Jasper Report that's with the name and type above.
1. In your field expression, you will then use expression of the format $P&#123;COLUMN_LOOKUP&#125;.apply("Display Type", Value).
1. Value is usually a field reference (for e.g $F&#123;C_DocType_ID&#125;) but you can also use a string or number literal.
1. "Display Type" can be one of the following:
    1. "TableName.ColumnName" - Get Display/Reference type from AD_Column (AD_Reference_ID and AD_Reference_Value_ID)
      1. Supported Type: Search, Table, TableDir, List, ChosenMultipleSelectionList, ChosenMultipleSelectionSearch, ChosenMultipleSelectionTable, Location, Image, YesNo, Account, Locator and PAttribute.
      1. In [Release-10-2023-06-28](https://wiki.idempiere.org/en/ChangeLog_Release_10#2023-06-28) was added support for types Date and Numeric
    1. "location" - Address from C_Location.
    1. "account" - Description from Account Combination (C_ValidCombination)
    1. "locator" - Value from C_Locator
    1. "asi" - Description from M_AttributeSetInstance
    1. "AmtInWords" - Translate numeric Value to Wordings (i.e Msg.getAmtInWords)
    1. "Image" - get Image from AD_Image
    1. "YesNo"
    1. "chart/width/height" - width and height is numeric value for expected width and height in pixel. This render chart from AD_Chart as image.
    1. "attachment/table name/index" - index is index of attachment item (zero base). This get attachment item content as byte array (byte[]).  NOTE: added on [release-11-20240315](https://wiki.idempiere.org/en/ChangeLog_Release_11#2024-03-15)
    1. "attachment/table name/file name" - file name can be exact or wildcard (*) matching of attachment item's file name (case sensitive). This get attachment item content as byte array (byte[]).  NOTE: added on [release-11-20240315](https://wiki.idempiere.org/en/ChangeLog_Release_11#2024-03-15)

**Example:**
1. $P&#123;COLUMN_LOOKUP&#125;.apply( "c_order.c_bpartner_id", $F&#123;c_bpartner_id&#125; )
1. $P&#123;COLUMN_LOOKUP&#125;.apply( "location", $F&#123;ship_c_location_id&#125; )
1. $P&#123;COLUMN_LOOKUP&#125;.apply("c_bpartner_location.c_location_id",$F&#123;c_location_id&#125;)
1. $P&#123;COLUMN_LOOKUP&#125;.apply("c_bpartner.invoicerule",$F&#123;invoicerule&#125;)
1. $P&#123;COLUMN_LOOKUP&#125;.apply( "yesno", $F&#123;isbillto&#125; )
1. $P&#123;COLUMN_LOOKUP&#125;.apply( "chart/600/400", 50002)
1. $P&#123;COLUMN_LOOKUP&#125;.apply( "attachment/test/0", 103)
1. $P&#123;COLUMN_LOOKUP&#125;.apply( "attachment/test/emoji*.png", 103)

**Update:**
:[IDEMPIERE-6048](https://idempiere.atlassian.net/browse/IDEMPIERE-6048) added support for attachment ("attachment/table name/index" or "attachment/table name/file name").

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Column_Display_Type_For_Jasper_Report)_
