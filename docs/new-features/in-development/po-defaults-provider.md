---
sidebar_label: Record Defaults Provider
sidebar_position: 6
description: A plugin can replace the built-in defaults that orders and invoices fill in on save, such as sales rep, payment term and price list.
tags:
  - technical
  - development
applies_to: ">=14"
last_reviewed: 2026-11-07
---

# Pluggable defaults for new records

:::warning Not Yet in Stable Release

This feature is not yet part of a stable iDempiere release and may change.

:::

**Goal:** New OSGi Service  
**Developer:** [Igor Pojzl](https://github.com/igorpojzl) ([CloudEmpiere](https://www.cloudempiere.com))  
**Feature Ticket:** [IDEMPIERE-7136](https://idempiere.atlassian.net/browse/IDEMPIERE-7136)  
**Version:** iDempiere 14

## The problem

When a Sales Order or an Invoice is saved, the model fills empty header fields with built-in values in `beforeSave`. For example, an empty Sales Representative gets the `#SalesRep_ID` context value. That value is the logged-in user, or the user of the scheduler or server process. An order created by REST, an import or a scheduler therefore gets the technical user as its sales representative.

The defaults of the Business Partner are applied only through `setBPartner(MBPartner)`. `beforeSave` calls it only when the Business Partner Location is empty. Code that sets `C_BPartner_ID` and `C_BPartner_Location_ID` directly, as REST, import and most plugins do, gets the context values instead. The constructor also sets a fixed Delivery Rule and Invoice Rule, and on save nobody can tell them from a value the user chose.

A plugin could not change this:

- The `PO_BEFORE_NEW` and `PO_BEFORE_CHANGE` events fire after the model's `beforeSave`. At that point the built-in value has already filled the field, and a handler cannot tell it from a value set by the user.
- A model factory does not reach code that calls `new MOrder(...)` directly.

## Use cases

- **Orders from integrations.** A Sales Order created by REST, an import or a scheduler gets the Sales Representative of its Business Partner, not the technical user.
- **Rules of the Business Partner.** An order created with only `C_BPartner_ID` set gets the Delivery Rule and Invoice Rule of its Business Partner, not the fixed constructor values.
- **No sales representative.** A deployment leaves the Sales Representative empty when nobody is responsible, instead of filling in the logged-in user.

Without a provider plugin, nothing changes for users. The feature adds no window, field or setting.

## What changed

A new OSGi service, `IPODefaultsProvider`, supplies defaults for the records of one table. A plugin registers it with the name of the table it serves, the same way column callouts are selected.

- **Initial values.** When a new record is created, the model calls `initDefaults` of each provider at the end of its own initial values. A provider can overwrite these values, or clear one so that it is decided on save.
- **Values on save.** In `beforeSave`, before each built-in default, the model asks the providers for a value of the column, but only while the column is still empty. A value set by the user or by the calling code is kept.
- **No provider, no change.** With no provider registered for a table, the records get the same values as before.

The interface is generic and selected by table name. In this release, `MOrder` and `MInvoice` call it. A table whose model does not call it ignores its providers.

### Columns asked on save

| Table | Column | Built-in default when the provider gives no value |
| --- | --- | --- |
| `C_Order` | `Bill_Location_ID` | The Business Partner Location of the order (ship-to) |
| `C_Order` | `M_PriceList_ID` | The active price list of the tenant for the same sales or purchase side, the default price list first |
| `C_Order` | `SalesRep_ID` | Context `#SalesRep_ID` |
| `C_Order` | `C_PaymentTerm_ID` | Context `#C_PaymentTerm_ID`, then the default payment term of the tenant |
| `C_Order` | `DeliveryRule` | Availability |
| `C_Order` | `InvoiceRule` | Immediate |
| `C_Invoice` | `M_PriceList_ID` | Context `#M_PriceList_ID` if it is on the same sales or purchase side, then the active price list of the tenant, the default price list first |
| `C_Invoice` | `SalesRep_ID` | Context `#SalesRep_ID` |
| `C_Invoice` | `C_PaymentTerm_ID` | Context `#C_PaymentTerm_ID`, then the default payment term of the tenant |

`DeliveryRule` and `InvoiceRule` are set in the constructor of `MOrder`. They are empty on save only when a provider cleared them in `initDefaults`.

`MOrder.setC_BPartner_Location_ID` also sets `Bill_Location_ID`. When `Bill_BPartner_ID` is empty on save, the order sets it to the Business Partner and clears `Bill_Location_ID`, and the provider is asked for it.

The columns are asked in the order of the table above, after the Business Partner and its Location are resolved. A provider can read the columns that were resolved before its own. `C_Currency_ID` is not asked. It comes from the price list.

## How to add a defaults provider in a plugin

1. Implement `org.adempiere.base.IPODefaultsProvider`. Both methods have a default implementation, so override only what you need.
2. Register the class as an OSGi component with the `tableName` service property. The value must match the table name exactly, for example `C_Order`. Add `service.ranking` if more than one provider serves the same table.
3. Return `DefaultValue.useFallback()` for every column your provider does not decide.

This provider gives a new Sales Order the Sales Representative of its Business Partner:

```java
import org.adempiere.base.DefaultValue;
import org.adempiere.base.IPODefaultsProvider;
import org.compiere.model.MBPartner;
import org.compiere.model.MOrder;
import org.compiere.model.PO;
import org.osgi.service.component.annotations.Component;

@Component(service = IPODefaultsProvider.class,
		property = { "tableName=C_Order", "service.ranking:Integer=10" })
public class OrderDefaultsProvider implements IPODefaultsProvider {

	@Override
	public DefaultValue<?> getDefault(PO po, String columnName) {
		if (!MOrder.COLUMNNAME_SalesRep_ID.equals(columnName) || !(po instanceof MOrder order))
			return DefaultValue.useFallback();
		if (!order.isSOTrx() || order.getC_BPartner_ID() <= 0)
			return DefaultValue.useFallback();
		MBPartner bp = new MBPartner(po.getCtx(), order.getC_BPartner_ID(), po.get_TrxName());
		return bp.getSalesRep_ID() > 0 ? DefaultValue.of(bp.getSalesRep_ID()) : DefaultValue.useFallback();
	}
}
```

The `C_Order` table holds both sales and purchase orders, so check `isSOTrx()`. Read other records in the transaction of the record, `po.get_TrxName()`.

To test it, create an order in code with only `C_BPartner_ID` and `C_BPartner_Location_ID` set, save it, and check `SalesRep_ID`.

### The answer of a provider

`getDefault(PO po, String columnName)` returns a `DefaultValue`:

| Answer | Effect |
| --- | --- |
| `DefaultValue.of(value)` | The column gets this value. The value must not be `null` |
| `DefaultValue.useFallback()` | No opinion. The next provider is asked, then the built-in default applies |
| `DefaultValue.noDefault()` | The column stays empty. The built-in default is skipped |

A `null` answer counts as `useFallback()`. For an ID column, a value of 0 or less is not set and skips the built-in default, the same as `noDefault()`. `MOrder` also ignores a price list ID that does not exist.

The value must have the Java type of the column in the Application Dictionary: `Integer` for record IDs, `String` for list columns. An answer of another type is written to the log as a warning and skipped, and the next provider is asked. An answer for a column whose type cannot be checked, for example an unknown column name, is skipped the same way.

`noDefault()` on a mandatory column leaves it empty, so the save fails. Use it for optional columns.

### Changing initial values

`initDefaults(PO po)` runs at the end of the initial values of a new record. Only the context (tenant, organization, user) is known at this point. The Business Partner and `IsSOTrx` are not set yet, so decide values that depend on them in `getDefault`. `MOrder.copyFrom` overwrites the initial values with the values of the source order.

- The method runs inside the model constructor, and a subclass of the model is not initialized yet. Only call setters on `po`.
- To decide a value on save instead, clear it here and return it from `getDefault`. Clear a mandatory column with `po.set_ValueNoCheck(columnName, null)`. The generated setters refuse `null` on a mandatory column and leave an error that fails the save.

For example, a provider can clear `DeliveryRule` and `InvoiceRule` in `initDefaults`. On save, `getDefault` then picks the rule from the Business Partner. If no provider gives a value, the order gets the built-in rule. A rule set by the calling code or by `setBPartner(MBPartner)` is kept, because the column is no longer empty.

### Which provider wins

- `getDefault`: the providers are asked in order of `service.ranking`, highest first. The first answer other than `useFallback()` wins.
- `initDefaults`: all providers are called, lowest ranking first. When two providers set the same column, the value of the highest ranking provider is kept.
- Only the providers registered for the table of the record are called.
- A provider that throws a `RuntimeException` is written to the log as a warning and skipped. The save does not fail because of it.
- Providers can be registered and removed while the server runs. They are looked up again each time a record is created or saved.
- `getDefault` is called on every save while the column is empty, updates included. Keep it fast.
- One provider instance serves all threads and tenants. Keep it stateless, and use `po.getCtx()` and `po.get_TrxName()`.

## Technical notes

- New types in the package `org.adempiere.base`: `IPODefaultsProvider`, `DefaultValue` and `PODefaults`.
- `Core.getPODefaults(String tableName)` returns the providers registered for a table. Call it once per save, because it looks up the providers when it is called. To support the service in your own model, call it in the constructor and in `beforeSave` the same way `MOrder` and `MInvoice` do.
- `PODefaults.TABLE_NAME_PROPERTY` holds the name of the service property, `tableName`.
- With no provider for a table, `Core.getPODefaults` returns a shared instance that answers `useFallback()` for every column and does not read the Application Dictionary.
- No change of the Application Dictionary or of the database.

**Technical Info:** [IDEMPIERE-7136](https://idempiere.atlassian.net/browse/IDEMPIERE-7136) | [Pull Request #3383](https://github.com/idempiere/idempiere/pull/3383)

## Migration impact

None for installations without a provider plugin. Orders and invoices get the same defaults as before.

A built-in default is now applied only when its lookup finds a record. Before, a lookup that found nothing returned -1, and the model could pass -1 to the setter. For example, an order without a price list got the currency -1. Now the field stays empty, and the currency comes from the context.

## Related tickets

- [IDEMPIERE-7136](https://idempiere.atlassian.net/browse/IDEMPIERE-7136)
