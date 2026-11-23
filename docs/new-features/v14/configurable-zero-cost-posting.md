---
sidebar_label: Configurable Zero-Cost Posting
sidebar_position: 9
description: Configure zero-cost accounting checks via System Configurator for PO/invoice, production, and free purchase price lists.
tags:
  - functional
  - technical
applies_to: ">=14"
last_reviewed: 2026-11-20
---

# Configurable zero-cost posting checks

**Goal:** Functional  
**Developer:** [Heng Sin Low](https://github.com/hengsin)  
**Feature Ticket:** [IDEMPIERE-7223](https://idempiere.atlassian.net/browse/IDEMPIERE-7223)  
**Version:** iDempiere 14

## The problem

Previously, when posting a Material Shipment (`Doc_InOut`) or Physical Inventory (`Doc_Inventory`) for a stocked Product with zero or missing cost, iDempiere only allowed posting at zero cost if a processed `M_CostDetail` record existed with `Amt = 0.00`, `Qty > 0`, and either `C_OrderLine_ID > 0` or `C_InvoiceLine_ID > 0` (introduced in [IDEMPIERE-216](https://idempiere.atlassian.net/browse/IDEMPIERE-216) and [IDEMPIERE-6600](https://idempiere.atlassian.net/browse/IDEMPIERE-6600)). For Material Receipt (`Doc_InOut`), zero cost was only allowed when a linked Purchase Order line had `PriceActual = 0`.

This fixed behavior had three gaps:

1. **Not configurable:** Tenants that require strict non-zero cost enforcement could not disable the zero-cost Purchase Order or Vendor Invoice fallback.
2. **Zero-cost production not handled:** When a stocked BOM Product was produced with zero cost (`M_CostDetail` with `M_ProductionLine_ID > 0`, `Amt = 0.00`, `Qty > 0`, and `Processed = 'Y'`), subsequent Material Shipment or Physical Inventory postings failed with `No Costs for <Product>`.
3. **Free purchase price lists not handled:** When a stocked Product was listed only on active purchase Price Lists with Standard Price (`PriceStd`) and List Price (`PriceList`) equal to `0`, Material Shipment, Physical Inventory, and Material Receipt without a Purchase Order line (for example, under Standard Costing) failed with `No Costs for <Product>` or `Resubmit - No Costs for <Product>`.

## What changed

Three Tenant-level System Configurator keys control how iDempiere decides whether a stocked Product with zero or missing cost can post at zero cost:

1. **Zero-cost Purchase Order or Vendor Invoice check (`CHECK_ZERO_COST_PO_FOR_ZERO_COST_POSTING`):** Defaults to `Y` to preserve existing behavior. Set it to `N` to disable this fallback and require non-zero costs.
2. **Zero-cost Production check (`CHECK_ZERO_COST_PRODUCTION_FOR_ZERO_COST_POSTING`):** Defaults to `N`. When set to `Y`, Material Shipment and Physical Inventory allow zero-cost posting if a processed zero-cost production cost detail (`M_ProductionLine_ID > 0`, `Amt = 0.00`, `Qty > 0`, `Processed = 'Y'`) exists for the Product.
3. **Free purchase price list check (`CHECK_PURCHASE_PRICE_LIST_FOR_ZERO_COST_POSTING`):** Defaults to `N`. When set to `Y`, Material Shipment, Physical Inventory, and Material Receipt (when no Purchase Order line is linked) allow zero-cost posting if the Product has at least one active effective purchase Price List version as of the document accounting date (`DateAcct`) with both Standard Price (`PriceStd`) and List Price (`PriceList`) equal to `0`, and no active effective purchase Price List version with a positive Standard Price or List Price.

### Document posting behavior

- **Material Shipment (`Doc_InOut`) and Physical Inventory (`Doc_Inventory`):** For stocked Products with zero or `null` cost, iDempiere evaluates the enabled checks in order (Purchase Order or Vendor Invoice cost detail, Production cost detail, free purchase Price List) and allows posting with zero cost on the first match.
- **Material Receipt (`Doc_InOut`):** When costs are zero or `null`, iDempiere first checks whether the receipt line links to a Purchase Order line with `PriceActual = 0` (existing behavior). If no Purchase Order line is linked (`orderLine == null`) and `CHECK_PURCHASE_PRICE_LIST_FOR_ZERO_COST_POSTING` is `Y`, iDempiere checks for a free purchase Price List as of the receipt's accounting date and allows posting with zero cost when matched. A Purchase Order line with a positive price is not overridden by the free purchase Price List check.

## How to set it up

### Configure zero-cost posting checks

1. Log in as System Administrator (to change the system-wide default) or Tenant Administrator (to override for a specific Tenant).
2. Open the **System Configurator** window.
3. Search for the key you want to change (for example, `CHECK_ZERO_COST_PRODUCTION_FOR_ZERO_COST_POSTING`), or create a Tenant-level record with the same **Name** (`Name`).
4. Set **Configured Value** (`Value`) to `Y` to enable the check or `N` to disable it.
5. Save the record and run **Cache Reset** if the server is already running.

### Configure a free purchase price list

To allow zero-cost posting for a free stocked Product using `CHECK_PURCHASE_PRICE_LIST_FOR_ZERO_COST_POSTING`:

1. Enable `CHECK_PURCHASE_PRICE_LIST_FOR_ZERO_COST_POSTING` (`Y`) in the **System Configurator** window.
2. Open the **Price List** window and select or create an active purchase Price List (**Sales Price list** unchecked).
3. Go to the **Price List** => **Version** subtab and ensure an active version exists with **Valid from** (`ValidFrom`) on or before the document's accounting date.
4. Go to the **Price List** => **Version** => **Product Price** subtab, add the Product, and set **Standard Price** (`PriceStd`) and **List Price** (`PriceList`) to `0`.
5. Confirm that the Product does not have a positive **Standard Price** or **List Price** on any other active effective purchase Price List version for that accounting date.

## Configuration

All three keys have **Configuration Level** (`ConfigurationLevel`) set to **Tenant** (`C`), so each Tenant can override the System defaults.

| System Configurator key | Default | Level | What it does |
| --- | --- | --- | --- |
| `CHECK_ZERO_COST_PO_FOR_ZERO_COST_POSTING` | `Y` | Tenant | Checks for a processed zero-cost Purchase Order or Vendor Invoice `M_CostDetail` before failing zero-cost posting on Material Shipment and Physical Inventory. |
| `CHECK_ZERO_COST_PRODUCTION_FOR_ZERO_COST_POSTING` | `N` | Tenant | Checks for a processed zero-cost Production `M_CostDetail` before failing zero-cost posting on Material Shipment and Physical Inventory. |
| `CHECK_PURCHASE_PRICE_LIST_FOR_ZERO_COST_POSTING` | `N` | Tenant | Checks for an active effective zero-price purchase Price List (with no active effective positive purchase price) before failing zero-cost posting on Material Shipment, Material Receipt (without a Purchase Order line), and Physical Inventory. |

## Technical notes

- **New `DocCostHelper` utility class:** `org.idempiere.acct.doc.DocCostHelper` centralizes the zero-cost checks shared by `Doc_InOut` and `Doc_Inventory`, and can be reused by custom `Doc` implementations:
  - `DocCostHelper.isWithZeroCost(Doc doc, MProduct product)`
  - `DocCostHelper.isWithZeroCost(Doc doc, MProduct product, MAcctSchema as)`
  - `DocCostHelper.isWithZeroCost(Doc doc, MProduct product, MAcctSchema as, int AD_Org_ID)`
  - `DocCostHelper.isWithFreePurchasePriceList(Doc doc, int M_Product_ID)`
  - `DocCostHelper.isWithFreePurchasePriceList(int AD_Client_ID, int M_Product_ID, Timestamp dateAcct, String trxName)`
- **New `MSysConfig` constants:** `org.compiere.model.MSysConfig` defines `CHECK_ZERO_COST_PO_FOR_ZERO_COST_POSTING`, `CHECK_ZERO_COST_PRODUCTION_FOR_ZERO_COST_POSTING`, and `CHECK_PURCHASE_PRICE_LIST_FOR_ZERO_COST_POSTING`.
- **Accounting schema and Organization scoping:** `DocCostHelper.isWithZeroCost` runs within `doc.getTrxName()` and scopes `M_CostDetail` queries to `C_AcctSchema_ID` when an accounting schema is available. When the Product's costing level is Organization (`MAcctSchema.COSTINGLEVEL_Organization`) and `AD_Org_ID > 0`, queries are also scoped to `AD_Org_ID`. `Doc_InOut` and `Doc_Inventory` pass `line.getAD_Org_ID()`.
- **Effective Price List version selection:** `DocCostHelper.isWithFreePurchasePriceList` evaluates active purchase Price Lists (`IsSOPriceList = 'N'`) for the document's `AD_Client_ID` as of `TimeUtil.getDay(dateAcct)`. For each Price List, only the latest active version with `TRUNC(ValidFrom) <= date` is considered (breaking same-day ties by the highest `M_PriceList_Version_ID`). Superseded versions and future versions do not affect the result.

## Migration impact

Migration script `202611201645_IDEMPIERE-7223.sql` inserts the three `AD_SysConfig` records. Existing behavior is preserved by default because `CHECK_ZERO_COST_PO_FOR_ZERO_COST_POSTING` defaults to `Y`, while `CHECK_ZERO_COST_PRODUCTION_FOR_ZERO_COST_POSTING` and `CHECK_PURCHASE_PRICE_LIST_FOR_ZERO_COST_POSTING` default to `N`.

One detail changes for existing installations: the `M_CostDetail` lookup is now scoped to `C_AcctSchema_ID` and, when the Product uses Organization costing level, to the line's `AD_Org_ID`. Zero-cost records from a different accounting schema or Organization no longer permit zero-cost posting in another schema or Organization.

## Related tickets

- [IDEMPIERE-7223](https://idempiere.atlassian.net/browse/IDEMPIERE-7223)
- [IDEMPIERE-6600](https://idempiere.atlassian.net/browse/IDEMPIERE-6600)
- [IDEMPIERE-216](https://idempiere.atlassian.net/browse/IDEMPIERE-216)
- Pull Request: [#3484](https://github.com/idempiere/idempiere/pull/3484)
