---
title: "New Accounting Dimensions"
sidebar_label: "New Accounting Dimensions"
sidebar_position: 8
description: "in iDempiere, Activity use for cost center as well as department."
tags:
  - functional
---

# New Accounting Dimensions

**Feature:** New Accounting Dimensions

**Goal:** Functional

**Developer:**  Deepak Pansheriya

**Feature Ticket:** [IDEMPIERE-5598](https://idempiere.atlassian.net/browse/IDEMPIERE-5598)

### Description
in iDempiere, Activity use for cost center as well as department. But this needs to customize. So it is better to add out of box dimensions for Department and cost center.

As part of this feature, added following accounting dimensions

1. Charge: There may be cases when same GL account can be linked to multiple charges. In this case charge as dimnsion required to summaries accounting per charge.
1. Asset: Adding asset as accounting dimension allow to know expense, depreciations, asset value without adding new GL accounting.
1. Department: Activity is used till date and it requires customization to rename activity system element. In this feature added new window for Department and Department as accounting dimension as out of box.
1. Warehouse: Adding warehouse as out of box accounting dimension allow to trek inventory value per warehouse using financial report.
1. Employee: For trekking Employee salary expense or observed overhead difference analysis.
1. Cost Center: Implementation was using Activity, organization or custom column as cost center. but this all approach required customization. after adding out of box cost center dimension as well as window to maintain cost center reduce to customization efforts.
1. Attribute Set Instance: When batch wise inventory is important to manage, adding ASI as accounting dimension allow to easily trek inventory valuation report and inventory accounting difference.
1. Custom Field: This allows to configure text type field as accounting dimension.
1. Tax: This feature has added tax as parameter on accounting related reports so that tax related statements can be produced.

Following new window are added

1. Department: As now there is dedicated window for department added, if you are using activity window or system elements renamed then you need to rename it to Activity back. 
1. Cost Center: Now there is out of box window named cost center. so, if Activity is renamed to Cost center in your implementation, then needs to rename again to Activity. 

**Following new Context Variable added to track dimension used for accounting**

- $Element_AI - For Attribute Set Instance
- $Element_AS - For Asset
- $Element_CC - For Cost Center
- $Element_CH - For Charge
- $Element_DP - For Department
- $Element_EP - For Employee
- $Element_F1 - For Custom Field 1
- $Element_F2 - For Custom Field 2
- $Element_F3 - For Custom Field 3
- $Element_F4 - For Custom Field 4
- $Element_WH - For Warehouse 

As Part of this enhancement the following new column were added.

- A_Asset_Addition.C_CostCenter_ID
- A_Asset_Addition.C_Department_ID
- A_Asset_Disposed.C_CostCenter_ID
- A_Asset_Disposed.C_Department_ID
- A_Asset_Reval.C_CostCenter_ID
- A_Asset_Reval.C_Department_ID
- A_Asset_Transfer.C_CostCenter_ID
- A_Asset_Transfer.C_Department_ID
- A_Depreciation_Entry.C_CostCenter_ID
- A_Depreciation_Entry.C_Department_ID
- C_AcctSchema_Element.A_Asset_ID
- C_AcctSchema_Element.AD_Column2_ID
- C_AcctSchema_Element.C_Charge_ID
- C_AcctSchema_Element.C_CostCenter_ID
- C_AcctSchema_Element.C_Department_ID
- C_AcctSchema_Element.C_Employee_ID
- C_AcctSchema_Element.M_AttributeSetInstance_ID
- C_AcctSchema_Element.M_Warehouse_ID
- C_CostCenter.AD_Client_ID
- C_CostCenter.AD_Org_ID
- C_CostCenter.Value
- C_Department.AD_Client_ID
- C_Department.AD_Org_ID
- C_Department.Value
- C_InvoiceBatchLine.C_CostCenter_ID
- C_InvoiceBatchLine.C_Department_ID
- C_Invoice.C_CostCenter_ID
- C_Invoice.C_Department_ID
- C_Invoice.C_Employee_ID
- C_InvoiceLine.C_CostCenter_ID
- C_InvoiceLine.C_Department_ID
- C_InvoiceLine.C_Employee_ID
- C_Order.C_CostCenter_ID
- C_Order.C_Department_ID
- C_OrderLine.C_CostCenter_ID
- C_OrderLine.C_Department_ID
- C_Payment.C_CostCenter_ID
- C_Payment.C_Department_ID
- C_Payment.C_Employee_ID
- C_PaymentTransaction.C_CostCenter_ID
- C_PaymentTransaction.C_Department_ID
- Fact_Acct.C_Charge_ID
- Fact_Acct.C_CostCenter_ID
- Fact_Acct.C_Department_ID
- Fact_Acct.C_Employee_ID
- Fact_Acct.CustomFieldText1
- Fact_Acct.CustomFieldText2
- Fact_Acct.CustomFieldText3
- Fact_Acct.CustomFieldText4
- Fact_Acct.M_AttributeSetInstance_ID
- Fact_Acct.M_Warehouse_ID
- Fact_Acct_Summary.A_Asset_ID
- Fact_Acct_Summary.C_Charge_ID
- Fact_Acct_Summary.C_CostCenter_ID
- Fact_Acct_Summary.C_Department_ID
- Fact_Acct_Summary.C_Employee_ID
- Fact_Acct_Summary.CustomFieldText1
- Fact_Acct_Summary.CustomFieldText2
- Fact_Acct_Summary.CustomFieldText3
- Fact_Acct_Summary.CustomFieldText4
- Fact_Acct_Summary.M_AttributeSetInstance_ID
- Fact_Acct_Summary.M_Warehouse_ID
- GL_Distribution.A_Asset_ID
- GL_Distribution.AnyAsset
- GL_Distribution.AnyAttributeSetInstance
- GL_Distribution.AnyCharge
- GL_Distribution.AnyCostCenter
- GL_Distribution.AnyDepartment
- GL_Distribution.AnyEmployee
- GL_Distribution.AnyWarehouse
- GL_Distribution.C_Charge_ID
- GL_Distribution.C_CostCenter_ID
- GL_Distribution.C_Department_ID
- GL_Distribution.C_Employee_ID
- GL_DistributionLine.A_Asset_ID
- GL_DistributionLine.C_Charge_ID
- GL_DistributionLine.C_CostCenter_ID
- GL_DistributionLine.C_Department_ID
- GL_DistributionLine.C_Employee_ID
- GL_DistributionLine.M_AttributeSetInstance_ID
- GL_DistributionLine.M_Warehouse_ID
- GL_DistributionLine.OverwriteAsset
- GL_DistributionLine.OverwriteAttributeSetInstance
- GL_DistributionLine.OverwriteCharge
- GL_DistributionLine.OverwriteCostCenter
- GL_DistributionLine.OverwriteDepartment
- GL_DistributionLine.OverwriteEmployee
- GL_DistributionLine.OverwriteWarehouse
- GL_Distribution.M_AttributeSetInstance_ID
- GL_Distribution.M_Warehouse_ID
- GL_JournalLine.C_Charge_ID
- GL_JournalLine.C_CostCenter_ID
- GL_JournalLine.C_Department_ID
- GL_JournalLine.C_Employee_ID
- GL_JournalLine.C_Tax_ID
- GL_JournalLine.M_AttributeSetInstance_ID
- GL_JournalLine.M_Warehouse_ID
- M_InOut.C_CostCenter_ID
- M_InOut.C_Department_ID
- M_InOutLine.C_CostCenter_ID
- M_InOutLine.C_Department_ID
- M_Inventory.C_CostCenter_ID
- M_Inventory.C_Department_ID
- M_InventoryLine.C_CostCenter_ID
- M_InventoryLine.C_Department_ID
- M_Movement.C_CostCenter_ID
- M_Movement.C_Department_ID
- M_MovementLine.C_CostCenter_ID
- M_MovementLine.C_Department_ID
- M_Production.C_CostCenter_ID
- M_Production.C_Department_ID
- M_ProductionLine.C_CostCenter_ID
- M_ProductionLine.C_Department_ID
- M_RMALine.C_CostCenter_ID
- M_RMALine.C_Department_ID
- PP_Order.C_CostCenter_ID
- PP_Order.C_Department_ID
- R_Request.C_CostCenter_ID
- R_Request.C_Department_ID
- T_Fact_Acct_History.C_Charge_ID
- T_Fact_Acct_History.C_CostCenter_ID
- T_Fact_Acct_History.C_Department_ID
- T_Fact_Acct_History.C_Employee_ID
- T_Fact_Acct_History.CustomFieldText1
- T_Fact_Acct_History.CustomFieldText2
- T_Fact_Acct_History.CustomFieldText3
- T_Fact_Acct_History.CustomFieldText4
- T_Fact_Acct_History.M_AttributeSetInstance_ID
- T_Fact_Acct_History.M_Warehouse_ID
