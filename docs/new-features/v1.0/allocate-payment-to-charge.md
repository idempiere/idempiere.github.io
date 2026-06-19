---
sidebar_position: 2
title: "Allocate Payment To Charge"
sidebar_label: "Allocate Payment To Charge"
description: "**Sponsor:** [Adaxa](http://www.adaxa.com/)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [Adaxa](http://www.adaxa.com/)

**Description:**

- brought from [Payment allocation to charge](http://www.adempiere.com/Payment_allocation_to_charge) Adaxa description on Adempiere wiki.
Payment allocation to charge.
It is a very common scenario that the payment amount differs from invoice grand total due to reasons like currency difference, rounding, etc.

when the payment amount is greater than the invoice amount, we cannot write the payment off. Over time we can have hundreds of these remaining payments on our Unallocated Payment reports.

Assume an invoice of USD100 is allocated against a Payment of USD103 leaving a USD3 unallocated payment amount. There is no simple way to expense the unapplied payment amount. If this line is selected the “Difference” value box will display the USD3. If a Charge such as Bank Fees or Realised Exchange Gain/Loss is selected from the Charge dropdown and the process is run then a Payment Allocation line will be created that clears the amount and expenses it to the GL account associated with the Charge.

![allocation1](pathname:///img/new-features/v1.0/allocation1.png)

![allocation2](pathname:///img/new-features/v1.0/allocation2.png)

![allocation4](pathname:///img/new-features/v1.0/allocation4.png)

![allocation5](pathname:///img/new-features/v1.0/allocation5.png)

![allocation6](pathname:///img/new-features/v1.0/allocation6.png)

![allocation7](pathname:///img/new-features/v1.0/allocation7.png)

**Technical Info:** [IDEMPIERE-217](http://idempiere.atlassian.net/browse/IDEMPIERE-217)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Allocate_Payment_To_Charge)_
