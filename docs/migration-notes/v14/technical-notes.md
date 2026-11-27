---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 14."
tags: [features, migration, installation, development, developer-documentation, reference, v14, breaking-change, architecture, configuration]
---

# Migration notes - iDempiere 14 (technical)

:::info
iDempiere 14 has not been released yet. It is currently known as "master" and these notes may change before final release.
:::

## WebSocket as default server push in ZK Web UI

The default server push mechanism in r14 has been set to WebSocket.

WebSocket improves performance and reduces overhead in standard environments.

However, if WebSocket fails or is not a fit for your environment, you can switch to Atmosphere.

:::tip
To use Atmosphere, add the following to "Java Options" when running iDempiere setup: `-Dorg.idempiere.ui.zk.serverpush=atmosphere`.

To use WebSocket explicitly, use `-Dorg.idempiere.ui.zk.serverpush=websocket`, or simply don't set it at all, since it is the default.
:::

## SOAP Web Services extracted from core

The SOAP Web Services bundle (`org.idempiere.webservice`) has been removed from iDempiere core and is now distributed as a separate optional plugin, hosted at [idempiere-soap-webservices](https://github.com/idempiere/idempiere-soap-webservices).

### Required action for implementations using SOAP Web Services

After upgrading to this release, the SOAP endpoints (`ModelADService`, `CompositeService`) will no longer be available until the plugin is explicitly installed via the Extension Manager.

To restore SOAP Web Services functionality:

1. Open the Extension Manager in iDempiere.
2. Install the "iDempiere SOAP Web Services (ADInterface)" extension.

No action is required for implementations that use only the REST API.

:::warning
If your custom plugin depends on SOAP web service classes (for example, classes inside `org.idempiere.webservice.*`), you must update your plugin's dependency declaration in `MANIFEST.MF` to reference the new standalone bundle instead of core. Failing to do so results in compilation errors when building against this release.
:::

This change reduces the core footprint by removing the Apache CXF framework and related WSDL libraries from base installations.

See [SOAP Web Services Plugin](/docs/new-features/v14/soap-web-services-plugin) for full details.

## Accounting implementation classes moved to org.idempiere.acct

The accounting implementation classes (document posting logic, `Doc_*` classes, accounting schema handling) have been extracted from iDempiere core into a dedicated bundle: `org.idempiere.acct`.

See [Accounting Plugin](/docs/new-features/v14/accounting-plugin) for details and impact.

## Model generator command line

The command line of the model generator is stricter. A few calls that used to run now fail with exit code 1, and the last output line is always `result: ok`, `result: refused`, `result: error` or `result: differs`. The positional form still produces the same files.

Scripts and builds that call the model generator from the command line are affected:

- A call with a core package (`org.compiere.*` or `org.adempiere.*`) and a column entity type other than `D` is refused, because it writes plug-in columns into core files.
- A call that mixes a named argument (`--...`) into positional arguments is refused.
- A wrong number of positional arguments prints the error and the usage and exits with 1. Before, it printed one usage line and returned.
- A table in a comma-separated table list that matches nothing is refused.
- Some other risky combinations, for example a system entity type for the tables without a column entity type, now print a `WARNING` line in the positional form.

Check the exit code of the scripts that call the generator. See [Model generator for custom columns](/docs/new-features/v14/model-generator-custom-columns) for the new named arguments.

## MTimeExpenseLine.getLaborCost null and exception behavior

`MTimeExpenseLine.getLaborCost(MAcctSchema)` now returns `null` instead of `BigDecimal.ZERO` when the referenced `S_TimeExpenseLine` row does not exist, throws `DBException` on SQL errors instead of logging and returning zero, and uses the expense line's own transaction name before falling back to the Accounting Schema transaction name. This lets callers distinguish a genuine zero-cost expense line from a missing record so Project Issue costing can fall back to standard product costs.

**Who is affected:** plug-in developers calling `MTimeExpenseLine.getLaborCost(MAcctSchema)` directly.  
**Ticket:** [IDEMPIERE-7231](https://idempiere.atlassian.net/browse/IDEMPIERE-7231)

### What to do

1. Check for `null` on the return value of `MTimeExpenseLine.getLaborCost(MAcctSchema)` if your code previously assumed a non-null `BigDecimal`.
2. Handle `DBException` if your caller expects database lookup errors to be caught instead of propagating.
3. Verify transaction visibility if your code passes a different transaction on the `MAcctSchema` than on the `MTimeExpenseLine` instance.

See [Charge-based posting for manual cost elements](/docs/new-features/v14/charge-based-manual-cost-elements) for full details.

## Manual cost element reversal posting

Tenants that configure active charge-mapped manual cost elements (`M_CostElement.C_Charge_ID`) now persist manual charge postings in `M_ManualCostDetail` and reverse Sales Shipments, Customer Returns, Productions, and Project Issues using `M_ManualCostDetail` and `M_CostDetail` instead of recalculating current rates. In those Tenants, Production and Project Issue reversals require the original document to be posted first. Installations without charge-mapped manual cost elements keep the existing reversal paths unchanged, while `MProjectIssue` now resolves product costing method via `product.getCostingMethod(as)` instead of `as.getCostingMethod()`.

**Who is affected:** Tenants that configure `M_CostElement.C_Charge_ID`, custom code deleting `Fact_Acct` rows directly, and installations using Product Category costing method overrides on Project Issues.  
**Ticket:** [IDEMPIERE-7231](https://idempiere.atlassian.net/browse/IDEMPIERE-7231)

### What to do

1. If you configure active charge-mapped manual cost elements, ensure original Production and Project Issue documents are posted before their reversals are posted (or allow the accounting processor to retry once the original posts).
2. If custom processes or scripts delete `Fact_Acct` rows directly via SQL instead of calling `MFactAcct.deleteEx()`, `Doc.deleteAcct()`, or the **Reset Accounting** process (`FactAcctReset`), delete matching `M_ManualCostDetail` rows as well.
3. Verify Project Issue balance calculations if products use Product Category costing method overrides.

See [Charge-based posting for manual cost elements](/docs/new-features/v14/charge-based-manual-cost-elements) for full details.
