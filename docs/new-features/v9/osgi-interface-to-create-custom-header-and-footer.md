---
sidebar_position: 9
title: "OSGi Interface to Create Custom Header and Footer"
sidebar_label: "OSGi Interface to Create Custom Header and Footer"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4894](https://idempiere.atlassian.net/browse/IDEMPIERE-4894)

**Description:**
Add AD_PrintHeaderFooter table and OSGi interface IPrintHeaderFooter to replace Standard Header and Footer for tabular (non-form) report.

## Development
- Create OSGi component for the org.idempiere.print.IPrintHeaderFooter interface
- Create a AD_PrintHeaderFooter record for the created OSGi component. Fill Source Class field with Component Name
- Example AD_PrintHeaderFooter record:
![4894 Print Header Footer Window](pathname:///img/new-features/v9/4894_Print_Header_Footer_Window.png)

_Print Header Footer Window_

## Usage
- At print format, uncheck Standard Header Footer and select the desire Print Header Footer record.
- Example:
![4894 Print Format Example](pathname:///img/new-features/v9/4894_Print_Format_Example.png)

_Print Format Example Header and Footer_

## Example
### With Standard Header and Footer
![4894 BusinessPartnerDetails StandardHeaderFooter](pathname:///img/new-features/v9/4894_BusinessPartnerDetails_StandardHeaderFooter.png)

_Business Partner Details with Standard Header and Footer_

### With Example Header and Footer
![4894 BusinessPartnerDetail ExamplePrintHeaderFooter](pathname:///img/new-features/v9/4894_BusinessPartnerDetail_ExamplePrintHeaderFooter.png)

_Business Partner Detail Example Header and Footer_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Print_Format_Custom_Header_Footer)_
