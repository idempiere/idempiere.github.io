---
sidebar_position: 11
title: "Replace Create From Form With Info Window Form"
sidebar_label: "Replace Create From Form With Info Window Form"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin)), Elaine Tan (etantg)"
tags: [functional]
---
**Goal:** Functional

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin)), Elaine Tan (etantg)

**Sponsor:** [TDI APJ Malaysia](https://tdiapj.com/)

**Feature Ticket:** [IDEMPIERE-5396](https://idempiere.atlassian.net/browse/IDEMPIERE-5396)

**Description:**

Use Info Window and Process to replace existing Create From custom form.

**Scope:**

- Material Receipt Create Lines From
- Invoice (Vendor) Create Lines From
- Vendor RMA Create Lines From
- Customer RMA Create Lines From
- Invoice (Customer) Create Lines From
- Customer Return Create Lines From
- Add Create Lines From feature to Return to Vendor
- Add Create Lines From feature to Shipment (Customer)

**Application Dictionary Changes:**

1. Add **Info Window** field to Column tab of **Table and Column** window.
:![5396 Column Button InfoWindow](pathname:///img/new-features/v9/5396_Column_Button_InfoWindow.png)

_Info Window field of Column_
:* Info Window field is active when Column Reference is Button.
:* For Button Reference, user will select one of Process or Info Window.
:* At Info Window, user will configure the process to run.
:![5396 InfoWindow Process](pathname:///img/new-features/v9/5396_InfoWindow_Process.png)

_Info Window Process_

2. Add **Query After Change** field to **Column** tab of **Info Window** window.
:![5396 InfoColumn QueryAfterChange](pathname:///img/new-features/v9/5396_InfoColumn_QueryAfterChange.png)

_Info Column Query After Change flag_
:* The flag is visible and active for info column with **Query Criteria**=Yes.
:* After user has made changes to an info column with **Query After Change**=Yes, info window will execute query if all visible **Query Criteria** info column with **Query After Change**=Yes have been filled with value. If one of the **Query After Change** info column is empty, existing query result (if any) will be cleared.

**Info Window, View and Process:**

1. Create lines from Invoice
1. *  View: C_Invoice_CreateFrom_v
1. *  Process: C_Invoice_CreateFromProcess
1. Create lines from Shipment/Receipt
1. *  View: M_InOut_CreateFrom_v
1. *  Process: M_InOut_CreateFromProcess
1. Create lines from RMA
1. *  View: M_RMA_CreateFrom_v
1. *  Process: M_RMA_CreateFromProcess

**Material Receipt Create Lines From:**

- De-activate existing Create From column (M_InOut.CreateFrom)
- Add CreateLinesFrom column to M_InOut. Configure as Button and uses Info Window (see Screen Shot above).
- Material Receipt window will render a **Create lines from** button.
:![5396 MaterialReceipt](pathname:///img/new-features/v9/5396_MaterialReceipt.png)

_Material Receipt Create Lines From Button_

- Clicking on the **Create lines from** button will open the corresponding info window.
:![5396 MaterialReceipt InfoWindow](pathname:///img/new-features/v9/5396_MaterialReceipt_InfoWindow.png)

_Material Receipt Create Lines From Info Window_

- The configure process is render as a button to the left of the "X" button.
- User will select order, execute search, select order lines and click the **Create lines from Shipment/Receipt** button to  create new Material Receipt lines from selected Order lines.
- The other windows (Invoice (Vendor), Vendor RMA, etc) will follows the same configuration and usage pattern.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Replace_CreateFrom_With_InfoWindow_Process)_
