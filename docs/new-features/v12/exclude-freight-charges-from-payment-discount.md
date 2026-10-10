# Exclude Freight Charges from Payment Discount

> **Developer:** Diego Ruiz [BX Service GmbH](https://www.bx-service.com/)

**Goal:** Functional

**Feature** **Ticket:** [IDEMPIERE-6588](https://idempiere.atlassian.net/browse/IDEMPIERE-6588)

To improve the accuracy of payment discounts, a new flag *IsExcludedFromDiscount* was introduced on the Charge (C_Charge) table. When this flag is enabled for a charge (e.g., Freight), amounts associated with that charge will be excluded from the discount calculation during payment processing.

NOTE this calculation works just when the [Tenant Info](https://wiki.idempiere.org/en/Tenant_(Window_ID-109)#Tab:_Tenant_Info) flag "Discount calculated from Line Amounts" is enabled.

![NewChargeFlag](pathname:///img/new-features/v12/NewChargeFlag.png)
