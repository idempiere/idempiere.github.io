---
sidebar_label: Charge-Based Manual Cost Elements
sidebar_position: 9
description: Map manual non-material cost elements to a Charge to post burden, overhead, and resource costs to Charge accounts.
tags:
  - functional
  - technical
applies_to: ">=14"
last_reviewed: 2026-11-24
---

# Charge-based posting for manual cost elements

**Goal:** Functional  
**Developer:** [Heng Sin Low](https://github.com/hengsin) ([TrekGlobal](https://www.trekglobal.com/))  
**Feature Ticket:** [IDEMPIERE-7231](https://idempiere.atlassian.net/browse/IDEMPIERE-7231)  
**Version:** iDempiere 14

## The problem

In iDempiere, non-material cost elements such as **Burden (M.Overhead)**, **Overhead**, and **Resource** (with no **Costing Method**) are used to add fixed amounts or percentage markups to a product's cost in the **Product Costs** window.

Previously, these manual costs were bundled directly into `MCost.getCurrentCost(...)`. On inventory issues such as shipments, production consumption, or project issues, the combined amount was credited out of the Product Asset account (`P_Asset`) and recorded in `M_CostDetail` together with material costs. Organizations could not separate manual overhead or burden absorption into dedicated GL accounts without creating custom accounting logic, because crediting `P_Asset` for costs that were never debited to inventory on receipt distorted inventory valuation.

## What changed

Manual (non-material) cost elements can now be linked to a **Charge** (`M_CostElement.C_Charge_ID`):

- A new **Charge** (`C_Charge_ID`) column and field have been added to the **Cost Element** table and window.
- The **Charge** field is displayed only for manual non-material cost elements (`CostingMethod` is empty and `CostElementType` is not Material). Saving a cost element with a **Costing Method** or with **Cost Element Type** set to Material clears `C_Charge_ID`.
- When `C_Charge_ID` is set on a manual cost element:
  - `MCost.getCurrentCost(...)` excludes it so inventory valuation and `M_CostDetail` remain strictly material-only.
  - Posting engines query charge-mapped manual costs separately via `MCost.getManualCosts(...)` and post the offsetting entries to the Charge's **Charge Expense** (`Ch_Expense_Acct`) account with `C_Charge_ID` recorded on `Fact_Acct`.
- When `C_Charge_ID` is left empty, existing behavior is preserved for backward compatibility.

## How to set it up

### 1. Configure a Charge

1. Open the **Charge** window (or select an existing Charge).
2. On the **Accounting** subtab, verify that **Charge Expense** (`Ch_Expense_Acct`) points to the GL account that should absorb the manual cost (for example, an Overhead Applied or Burden Absorption account).

### 2. Link the Charge to a manual Cost Element

1. Open the **Cost Element** window.
2. Create or select a Cost Element with:
   - **Cost Element Type** set to **Burden (M.Overhead)**, **Overhead**, **Resource**, or **Outside Processing**.
   - **Costing Method** left empty.
3. In the **Charge** field, select the Charge configured in step 1.
4. Save the record.

### 3. Define product manual costs

1. Open the **Product Costs** window (or **Product** => **Costs** subtab) for the target **Product** and **Accounting Schema**.
2. Create a cost record for the manual **Cost Element** and set either or both:
   - **Current Cost Price**: fixed cost per unit (multiplied by transaction quantity).
   - **Percent**: percentage applied to `currentMaterialCost + (CurrentCostPrice * qty)`.
3. Save the record.

:::note

Products using the **Standard Costing** costing method ignore charge-mapped manual cost elements.

:::

## Accounting impact by document

For a product with material cost of `100.00` per unit and a charge-mapped 10% Burden cost element (`10.00` per unit):

### Sales Shipment (`Doc_InOut`)

Shipping 2 units posts:

| Account | Debit | Credit | Notes |
| --- | --- | --- | --- |
| Product COGS (`P_Cogs`) | `220.00` | | Material cost plus rounded manual costs |
| Product Asset (`P_Asset`) | | `200.00` | Material cost only; `M_CostDetail` records `-200.00` |
| Charge Expense (`Ch_Expense_Acct`) | | `20.00` | One line per non-zero manual cost element, with `C_Charge_ID` set |

### Customer Return (`Doc_InOut`)

Returning 2 units via Customer RMA and Customer Return posts the inverse:

| Account | Debit | Credit | Notes |
| --- | --- | --- | --- |
| Product Asset (`P_Asset`) | `200.00` | | Material cost only; `M_CostDetail` records `+200.00` |
| Charge Expense (`Ch_Expense_Acct`) | `20.00` | | One line per non-zero manual cost element, with `C_Charge_ID` set |
| Product COGS (`P_Cogs`) | | `220.00` | Material cost plus rounded manual costs |

### Production (`Doc_Production`)

Producing 1 finished unit from 2 units of the component (`200.00` material + `20.00` component burden) posts:

| Account | Debit | Credit | Notes |
| --- | --- | --- | --- |
| Finished Good Product Asset (`P_Asset`) | `220.00` | | Rolls up component material and manual costs into finished good `M_Cost` and `M_CostDetail` |
| Component Product Asset (`P_Asset`) | | `200.00` | Component `M_CostDetail` records `-200.00` (material-only) |
| Charge Expense (`Ch_Expense_Acct`) | | `20.00` | One line per non-zero component manual cost element, with `C_Charge_ID` set |

### Project Issue (`Doc_ProjectIssue`)

Issuing 2 units from inventory to a project (when not priced from an explicit receipt line or time expense line) posts:

| Account | Debit | Credit | Notes |
| --- | --- | --- | --- |
| Project WIP or Project Asset | `220.00` | | Also added to `C_Project.ProjectBalanceAmt` |
| Product Asset (`P_Asset`) / Expense | | `200.00` | `M_CostDetail` records material cost only |
| Charge Expense (`Ch_Expense_Acct`) | | `20.00` | One line per non-zero manual cost element, with `C_Charge_ID` set |

### Price List creation (`M_PriceList_Create`)

When generating a Price List Version with a Discount Schema Line whose **Base** is **Product Cost**, `M_PriceList_Create` adds all charge-mapped manual costs to the product cost before applying additions, discounts, and rounding.

## Reversals and rounding

- **Rounding consistency:** Each manual cost entry and the material cost are rounded to the Accounting Schema's standard currency precision (`StdPrecision`) before summing, preventing unbalanced DR/CR rounding differences.
- **Batch/Lot costing:** When a product uses Batch/Lot costing and a line splits across multiple `M_InOutLineMA` or `M_ProductionLineMA` allocations, manual costs are evaluated per ASI (preferring an exact ASI cost row over the `ASI=0` fallback without double-counting) and accumulated per `M_CostElement_ID` before rounding.
- **Reversal fidelity:** Reversing a posted Sales Shipment, Customer Return, Production, or Project Issue reverses the originally posted Charge `Fact_Acct` lines (and Project Balance for Project Issues) directly from `Fact_Acct`. Even if a manual cost element's Charge, rate, or active status is changed before reversal, the reversal matches the original posting.

## Technical notes

New and updated APIs for core and plugin developers:

- `MCost.ManualCost`: Value class holding an `MCostElement` and its calculated `BigDecimal` amount.
- `MCost.getManualCosts(MProduct, int, MAcctSchema, int, BigDecimal, BigDecimal, String)`: Queries active charge-mapped manual cost records (`CostingMethod IS NULL AND CostElementType <> 'M' AND C_Charge_ID > 0`), resolving org/ASI via `MCost.CostingKey.resolve` and deduplicating exact ASI vs. `ASI=0` rows.
- `ProductCost.getManualCosts(MAcctSchema, int, BigDecimal)` and `DocLine.getManualCosts(MAcctSchema, int, BigDecimal)`: Convenience wrappers delegating to `MCost.getManualCosts`.
- `DocLine.getTotalProductCosts(MAcctSchema, int, boolean)`: Returns material cost plus all charge-mapped manual costs.
- `MCharge.getAccount(int C_Charge_ID, MAcctSchema as, String trxName)`: Transaction-aware overload (existing 2-argument method delegates with `null`).
- `FactLine.getReversedFactAcct_ID()` and `FactLine.updateReverseLine(MFactAcct, BigDecimal, boolean)`: Exposes the matched original `Fact_Acct_ID` and reverses an explicit `MFactAcct` record.
- `Doc` protected helpers: `accumulateManualCosts`, `roundManualCosts`, `hasPostedFacts`, `getPostedChargeFacts`, and `createReversedChargeFactLine`.

## Migration impact

The iD14 migration script adds `M_CostElement.C_Charge_ID` (`NUMERIC(10)` / `NUMBER(10)`, nullable, with foreign key `CCharge_MCostElement` referencing `C_Charge`) and the **Charge** field on the **Cost Element** tab. Existing manual cost elements with `C_Charge_ID` unset keep their previous behavior until a Charge is assigned.

## Related tickets

- [IDEMPIERE-7231](https://idempiere.atlassian.net/browse/IDEMPIERE-7231)
