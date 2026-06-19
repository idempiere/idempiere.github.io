---
sidebar_position: 17
title: "Info Window Customisation"
sidebar_label: "Info Window Customisation"
description: "**Goal:** Allow customize Info Window Component, make it really"
tags: [user-experience]
---
**Goal:** Allow customize Info Window Component, make it really

**Developer:** Igor Pojzl

**Sponsor:** [Cloudempiere](http://www.cloudempiere.com/)

**Description:**
Now you can configure an Info Window Customisation to change system Info Window behavior. The implementation is the same as Standard Window or Process Customisation, following all principles and standards.

**Use Cases**
- You have multi-tenant implementation and you would like to change the info window (eg. hide price in the warehouse).
- You have sensitive information and you can make it dependent according to a role.
- You want to use specific terminology if the customer requires.

**Process**:
- Create New info window customization in a specific client/tenant
- Select customizable Info window and define scope: User/Role/Language
- Add new Columns where you want to modify the behavior of a column (eg. hide, change sequence)
- Add new related info tab - select the info window defined previously on system info window, then setup display logic eg. @isAdvancedUser@ 'Y', change seqeunce.

- Business Partner Info without customization:

![InfoWinfowBeforeCustomisation](pathname:///img/new-features/v8.2/InfoWinfowBeforeCustomisation.png)

_Business Partner Info without customization_

- An example on how you can define info window customizations:

![InfoWinfowBPartner CustomiseColums](pathname:///img/new-features/v8.2/InfoWinfowBPartner_CustomiseColums.png)

_Column Customisations_

- As the consequence of the above change the columns were reordered and reduced/hidden:

![InfoWinfowBPartner Columns Changed](pathname:///img/new-features/v8.2/InfoWinfowBPartner_Columns_Changed.png)

- The next example shows how tabs can be renamed and re-ordered:

![InfoWinfowBPartner Tab Changed](pathname:///img/new-features/v8.2/InfoWinfowBPartner_Tab_Changed.png)

***Technical Info:** [IDEMPIERE-4459](https://idempiere.atlassian.net/browse/IDEMPIERE-4459)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Info_Window_Customisation)_
