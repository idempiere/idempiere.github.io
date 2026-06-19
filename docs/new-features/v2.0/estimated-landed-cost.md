---
sidebar_position: 4
title: "Estimated Landed Cost"
sidebar_label: "Estimated Landed Cost"
description: "**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)

**Description:**

Support estimated landed cost for Average Costing.

**Setup:**

Setup Landed Cost Clearing Account. This is the account for estimated landed cost posting and its balance should reflect the timing difference between Material Receipt and Landed Cost Invoice.

Accounting Schema Default:
![EstimatedLandedCost Accounting Schema](pathname:///img/new-features/v2.0/EstimatedLandedCost_Accounting_Schema.png)

Product Category Accounting:
![EstimatedLandedCost Product Category](pathname:///img/new-features/v2.0/EstimatedLandedCost_Product_Category.png)

Product Accounting:
![EstimatedLandedCost Product](pathname:///img/new-features/v2.0/EstimatedLandedCost_Product.png)

If you want to set the landed cost clearing account same account as the default you could use this SQL (please be careful):

```

update m_product_acct set p_landedcostclearing_acct = (select ac.p_landedcostclearing_acct from c_acctschema_default ac where ac.c_acctschema_id=1000000);
update m_product_category_acct set p_landedcostclearing_acct = (select ac.p_landedcostclearing_acct from c_acctschema_default ac where ac.c_acctschema_id=1000000);

```

**NOTE!** Change c_acctschema_id to your c_acctschema_id

**Workflow:**

1. Enter estimated landed cost for purchase order. The allocation is calculated when user complete the purchase order.

![EstimatedLandedCost Purchase Order](pathname:///img/new-features/v2.0/EstimatedLandedCost_Purchase_Order.png)

2. Material Receipt Posting will calculate the estimated landed cost using the allocation from Purchase Order. The amount will be posted to the landed cost clearing account.

![EstimatedLandedCost Material Receipt Posting](pathname:///img/new-features/v2.0/EstimatedLandedCost_Material_Receipt_Posting.png)

3. Enter landed cost invoice.

![EstimatedLandedCost Landed Cost Invoice Line](pathname:///img/new-features/v2.0/EstimatedLandedCost_Landed_Cost_Invoice_Line.png)

4. Distribute the landed cost invoice line to Material Receipt

![EstimatedLandedCost Distribute Landed Costs](pathname:///img/new-features/v2.0/EstimatedLandedCost_Distribute_Landed_Costs.png)

5. Result of #4.

![EstimatedLandedCost Landed Cost Allocation](pathname:///img/new-features/v2.0/EstimatedLandedCost_Landed_Cost_Allocation.png)

6. Posting of the Landed Cost Invoice. The posting will clear the landed cost clearing posting in Material Receipt and difference will be transferred to Average Costing Variance or Product Asset Account.

![EstimatedLandedCost Landed Cost Posting](pathname:///img/new-features/v2.0/EstimatedLandedCost_Landed_Cost_Posting.png)

7. The Landed Cost is added to the product cost.

![EstimatedLandedCost Product Cost 1](pathname:///img/new-features/v2.0/EstimatedLandedCost_Product_Cost_1.png)

![EstimatedLandedCost Product Cost 2](pathname:///img/new-features/v2.0/EstimatedLandedCost_Product_Cost_2.png)

**Technical Info:** [IDEMPIERE-1285](http://idempiere.atlassian.net/browse/IDEMPIERE-1285)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.0_Estimated_Landed_Cost)_
