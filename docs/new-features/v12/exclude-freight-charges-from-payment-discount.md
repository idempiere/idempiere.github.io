---
sidebar_position: 3
title: "Exclude Freight Charges from Payment Discount"
sidebar_label: "Exclude Freight Charges from Payment Discount"
description: "**Developer:** Diego Ruiz [BX Service GmbH](https://www.bx-service.com/)"
tags: [functional]
---
**Goal:** Functional

**Developer:** Diego Ruiz [BX Service GmbH](https://www.bx-service.com/)

**Feature** **Ticket:** [IDEMPIERE-6588](https://idempiere.atlassian.net/browse/IDEMPIERE-6588)

### Exclude Freight Charges from Payment Discount
To improve the accuracy of payment discounts, a new flag *IsExcludedFromDiscount* was introduced on the Charge (C_Charge) table. When this flag is enabled for a charge (e.g., Freight), amounts associated with that charge will be excluded from the discount calculation during payment processing.

NOTE this calculation works just when the [Tenant Info](https://wiki.idempiere.org/en/Tenant_(Window_ID-109)#Tab:_Tenant_Info) flag "Discount calculated from Line Amounts" is enabled.

![NewChargeFlag](pathname:///img/new-features/v12/NewChargeFlag.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Exclude_Charges_From_Payment_Discount)_
