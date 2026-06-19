---
sidebar_position: 10
title: "Deductible and Non Deductible Input Tax"
sidebar_label: "Deductible and Non Deductible Input Tax"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-5057](https://idempiere.atlassian.net/browse/IDEMPIERE-5057)

**Description:**

Implement support for https://techconcepthub.com/deductible-tax-and-non-deductible-tax/

**Changes:**

- *Add **Tax Posting Indicator** field to **Tax Rate** window (for non-summary, line level purchase tax).*
    - **Separate tax posting**: For deductible input tax. This is the existing tax posting where tax is posted to a separate GL account from product asset account (i.e tax not added to product cost).
    - **Distribute tax with relevant expense**: For non deductible input tax. Tax is posted to the product asset account and added to product cost.
![5057 PostingIndicator](pathname:///img/new-features/v10/5057_PostingIndicator.png)

_Posting Indicator Field_

- *Modify tax and cost posting for Doc_Invoice, Doc_InOut, Doc_MatchInv and Doc_MatchPO.*

**Example:**

- *Setup Deductible Purchasing Tax Rate.*
![5057 Deductible](pathname:///img/new-features/v10/5057_Deductible.png)

_Deductible Purchasing Tax Rate_

- *Setup Non-Deductible Purchasing Tax Rate.*
![5057 NonDeductible](pathname:///img/new-features/v10/5057_NonDeductible.png)

_Non Deductible Purchasing Tax Rate_

- *Create 2 PO line, line 10 is using Deductible tax rate and line 20 is using Non-Deductible tax rate (both with 19% tax rate).*
![5057 PO Lines](pathname:///img/new-features/v10/5057_PO_Lines.png)

_Example PO Lines_

- *2 Order tax line created with Base Amount of 2550.00 and Tax Amount of 484.50.*
![5057 PO Tax](pathname:///img/new-features/v10/5057_PO_Tax.png)

_Example PO Tax Lines_

- *Material Receipt Posting. Line 10 posted 2550.00 to Product Asset account and Line 20 posted 3034.50 (2550.00+484.50) to Product Asset account.*
![5057 MR Posting](pathname:///img/new-features/v10/5057_MR_Posting.png)

_Example Material Receipt Posting_

- *Vendor Invoice Posting. Line 10 posted 484.50 to tax account and Line 20 didn't post to tax account.*
![5057 Invoice Posting](pathname:///img/new-features/v10/5057_Invoice_Posting.png)

_Example Vendor Invoice Posting_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Deductible_And_Non_Deductible_Input_Tax)_
