---
sidebar_position: 21
title: "Mixed POS Payments on Sales Order"
sidebar_label: "Mixed POS Payments on Sales Order"
description: "**Functional:** Sales"
tags: [functional]
---
**Goal:** Usability

**Functional:** Sales

**Contributor:** Quality Systems & Solutions (GlobalQSS)

**Description:**

Sales Order window was modified to allow management of Mixed Payments on POS Orders, this is, a sales order that is paid with different tender types.  Also you can enable registering guarantees, like post-dated checks.

When the POS sales order is completed then the corresponding payments are created (one per each tender type) and assigned to the generated invoice - except those marked as guarantees.

***POS Tender Type***

The new POS Tender Type window allows you to configure the types that you're enabling on the POS.

Each POS tender type has associated a Payment Tender Type, this is used when creating the payment.

Also, if you mark a tender type as Guarantee, then this type is not used to create a payment, if additionally you mark the Post Dated flag you will be able to register a date on the Sales Order, useful for example to enable reminder reports for post-dated checks.

![NF001 MixedPOSPayments000](pathname:///img/new-features/v1.0/NF001_MixedPOSPayments000.png)

***Bank / Cash***

You need to define a bank and accounts for your organizations, like shown in the screenshot:

![NF001 MixedPOSPayments000B](pathname:///img/new-features/v1.0/NF001_MixedPOSPayments000B.png)

***Sales Order***

Note the new POS Payment tab on Sales Order window, this tab is enabled when the payment rule is set to Mixed POS Payment.

![NF001 MixedPOSPayments001](pathname:///img/new-features/v1.0/NF001_MixedPOSPayments001.png)

And then you can register all the POS Payment types on the POS Payment tab:

![NF001 MixedPOSPayments002](pathname:///img/new-features/v1.0/NF001_MixedPOSPayments002.png)

***Generated Payment***

When the sales order is completed then the corresponding payment(s) are created:

![NF001 MixedPOSPayments003](pathname:///img/new-features/v1.0/NF001_MixedPOSPayments003.png)

***Validations***

- The order cannot be completed when the total of POS payments doesn't match with the total of the generated invoice, in such case iDempiere will show a message stating something like:
    - Total POS Payments differ from Total Invoice - POS Payment=12, Grand Total=23.75

- There must be an account defined for the POS on bank window for the organization and currency, in such case iDempiere will show a message stating something like:
    - No account defined for this organization / currency Create an account on the bank account window for the organization / currency, the POS payments will be created on the defined account

**Technical Info:** [IDEMPIERE-387](http://idempiere.atlassian.net/browse/IDEMPIERE-387)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_MixedPOSPayments)_
