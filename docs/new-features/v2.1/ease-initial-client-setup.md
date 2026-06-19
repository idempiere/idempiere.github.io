---
sidebar_position: 3
title: "Ease Initial Client Setup"
sidebar_label: "Ease Initial Client Setup"
description: "In order to ease the initial setup of a new tenant three options were added to the 'Initial Client Setup Process':"
tags: [functional]
---
**Goal:** Functional

**Description:**

In order to ease the initial setup of a new tenant three options were added to the "Initial Client Setup Process":

- **Activity Accounting:** To allow defining activity as an accounting dimension since setup

- **Use Default CoA:** now you can create a new tenant without needing a CoA, iDempiere has a default CoA with dummy default accounts.  This is very useful in case you're not going to use accounting, or you plan to upload your CoA later

- **Inactivate Defaults:** you can create the tenant with the default accounts inactive, this can be helpful to identify when an accounting object (like Bank, Tax) has not been configured in accounting, instead of using a default CoA that is not correct

![01 Client Setup](pathname:///img/new-features/v2.1/01_Client_Setup.png)

**Technical Info:** [IDEMPIERE-1685](http://idempiere.atlassian.net/browse/IDEMPIERE-1685)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Ease_Initial_Client_Setup)_
