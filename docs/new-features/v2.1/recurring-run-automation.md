---
sidebar_position: 11
title: "Recurring Run Automation"
sidebar_label: "Recurring Run Automation"
description: "The Recurring functionality can now be used for subscriptions where you want to generate recurring documents automatically."
tags: [functional]
---
**Goal:** Functional

**Description:**

The Recurring functionality can now be used for subscriptions where you want to generate recurring documents automatically.

A new window ***Recurring Group*** was added in order to group related recurring subscriptions:

![01 Recurring](pathname:///img/new-features/v2.1/01_Recurring.png)

Then, you need to define your template document to repeat periodically, you can use tags in the Description field to change based on columns of the generated document, like @DateOrdered&lt;yyyy-MM&gt;@ - which means the DateOrdered field on the Order and formatted to show year-month.

You can also use the special tag @Prm_Comment@ to be replaced with a parameter defined when running the recurring process (NOTE you can add more Prm_ parameters as you wish, just prefix the parameters with Prm_ and use the corresponding tag to replace in Description).

Note the template order must be prepared in order to make this feature work:

![02 Recurring](pathname:///img/new-features/v2.1/02_Recurring.png)

Then you define the recurring to automate and assign it to a group:

![03 Recurring](pathname:///img/new-features/v2.1/03_Recurring.png)

Now, periodically you need to execute the recurring run process, note the usage of the Parameter Comment to be replaced in Description, and you can also define if the document will be prepared or completed at the end:

![04 Recurring](pathname:///img/new-features/v2.1/04_Recurring.png)

And this is the resulting order based on the recurring run of the example:

![05 Recurring](pathname:///img/new-features/v2.1/05_Recurring.png)

**Technical Info:** [IDEMPIERE-2100](http://idempiere.atlassian.net/browse/IDEMPIERE-2100)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Recurring_Run_Automation)_
