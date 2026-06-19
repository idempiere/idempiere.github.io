---
sidebar_position: 6
title: "Inventory Cost Adjustment"
sidebar_label: "Inventory Cost Adjustment"
description: "**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)

**Description:**

A new window to allow the entering of cost adjustment for product. Only Standard and Average Costing is supported for now.

**Workflow:**

Select Document Type.

![Cost Adjustment Document Type](pathname:///img/new-features/v1.0/Cost_Adjustment_Document_Type.png)

Select costing method.

![Cost Adjustment Costing Method](pathname:///img/new-features/v1.0/Cost_Adjustment_Costing_Method.png)

Enter the product that you need to make adjustment on. The system will retrieve the current cost price and you need to enter the new cost price for the product. The difference between the entered new cost price and current cost price will be used to perform the adjustment.

![Cost Adjustment Line](pathname:///img/new-features/v1.0/Cost_Adjustment_Line.png)

Difference will be posted to product asset and cost adjustment account. If you have selected a charge at the cost adjustment line, the charge account will be used in place of the cost adjustment account.

![Cost Adjustment Posting](pathname:///img/new-features/v1.0/Cost_Adjustment_Posting.png)

A cost detail record is created to adjust the current cost price.

![Cost Adjustment Cost Details](pathname:///img/new-features/v1.0/Cost_Adjustment_Cost_Details.png)

Cost movement that will happen after the processing of the cost detail record created by the cost adjustment document.

![Cost Adjustment Cost Movement](pathname:///img/new-features/v1.0/Cost_Adjustment_Cost_Movement.png)

**Standard Cost Update:**

The standard cost update process have been modify to create cost adjustment document instead of making direct update to the standard cost record (M_Cost). This should eliminate the need to make manual gl journal adjustment after running the standard cost update process.

![Cost Adjustment Standard Cost Update](pathname:///img/new-features/v1.0/Cost_Adjustment_Standard_Cost_Update.png)

**Technical Info:** [IDEMPIERE-1180](http://idempiere.atlassian.net/browse/IDEMPIERE-1180)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Cost_Adjustment)_
