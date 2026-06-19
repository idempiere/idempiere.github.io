---
sidebar_position: 10
title: "Placeholders"
sidebar_label: "Placeholders"
description: "**Developer:** Nicolas Micoud"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Nicolas Micoud

**Description:**

&lt;cite&gt;[Placeholder](https://www.w3schools.com/tags/att_input_placeholder.asp) specifies a short hint that describes the expected value of an input field (e.g. a sample value or a short description of the expected format).&lt;/cite&gt;

&lt;cite&gt;The short hint is displayed in the input field before the user enters a value.&lt;/cite&gt;

***Placeholders for Fields:***

The fields in iDempiere UI can have a placeholder to guide the user about what is expected to be in a field.

The placeholders - all translatable - can be defined at the following levels:
- [Element](https://wiki.idempiere.org/en/Element_(Window_ID-151))
- [Column](https://wiki.idempiere.org/en/Table_and_Column_(Window_ID-100)#Tab:_Column)
- [Field](https://wiki.idempiere.org/en/Window,_Tab_%26_Field_(Window_ID-102)#TAB:_Field)
- [Field Customization](https://wiki.idempiere.org/en/Window_Customization_(Window_ID-229)#Tab:_Field_Customization)
- [Info Window Column](https://wiki.idempiere.org/en/Info_Window_(Window_ID-385)#Tab:_Column)
- [Process Parameter](https://wiki.idempiere.org/en/Report_%26_Process_(Window_ID-165)#TAB:_Parameter)
    - In process parameters there is also a placeholder for the ***To*** field when the parameter is defined as a Range

![PlaceholderDefinitionElement](pathname:///img/new-features/v6.2/PlaceholderDefinitionElement.png)

For example when entering a new record this is what the user can see:

![PlaceholderExecution](pathname:///img/new-features/v6.2/PlaceholderExecution.png)

***Placeholders for Location Dialog:***

For the Location Dialog, translatable placeholders can be defined also at [Country](https://wiki.idempiere.org/en/Country_Region_and_City_(Window_ID-122)) level.

There are placeholders for the following elements:
- Address 1
- Address 2
- Address 3
- Address 4
- Address 5
- City
- Comments
- Postal
- Postal Add

![PlaceholderCountryDefinition](pathname:///img/new-features/v6.2/PlaceholderCountryDefinition.png)

For example when entering a location this is what the user can see:

![PlaceholderCountryExecution](pathname:///img/new-features/v6.2/PlaceholderCountryExecution.png)

**Technical Info:** [IDEMPIERE-3639](https://idempiere.atlassian.net/browse/IDEMPIERE-3639), [IDEMPIERE-3643](https://idempiere.atlassian.net/browse/IDEMPIERE-3643)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_Placeholders)_
