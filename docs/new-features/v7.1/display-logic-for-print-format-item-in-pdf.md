---
sidebar_position: 1
title: "Display Logic for Print Format Item in PDF"
sidebar_label: "Display Logic for Print Format Item in PDF"
description: "**Developer:** Heng Sin Low"
tags: [functional]
---
**Goal:** Functional

**Developer:** Heng Sin Low

**Description:**

Now is possible to set a Display Logic for a Print Format Item rendered as PDF format.

The display logic follows the normal convention for the display logic field:

 &#123;expression&#125; [&#123;logic&#125; &#123;expression&#125;]

 expression := @&#123;context&#125;@&#123;operand&#125;&#123;value&#125; or @&#123;context&#125;@&#123;operand&#125;&#123;value&#125;

 logic := &#123;|&#125;|&#123;&&#125; - these are OR and AND, resolved from left to right (no precedence)

 context := any **print format item column name** from the report surrounded by @ - like @C_BPartner_ID@ or @Name@
         := the **special values** @*Page@ and @*PageCount@ are supported also
         := **foreign columns** can be referenced too with the notation column.foreign_column, for example @C_BP_Group_ID.Name@

 value := strings or numbers

 operand := eq&#123;=&#125;, gt&#123;&gt;&#125;, le&#123;&lt;&#125;, not&#123;~^!&#125;

![DisplayLogicPrintFormatItem](pathname:///img/new-features/v7.1/DisplayLogicPrintFormatItem.png)

**Technical Info:** [IDEMPIERE-3996](https://idempiere.atlassian.net/browse/IDEMPIERE-3996)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Display_Logic_for_Print_Format_Item)_
