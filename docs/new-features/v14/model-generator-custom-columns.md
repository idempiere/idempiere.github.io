---
sidebar_label: Model Generator for Custom Columns
sidebar_position: 7
description: Generate typed access to the columns a plug-in adds to tables it does not own, such as C_Order, without changing core classes.
tags:
  - development
applies_to: ">=14"
last_reviewed: 2026-10-26
---

# Model generator for custom columns

**Goal:** Technical  
**Developer:** [Peter Takacs](https://github.com/PeterTakacs300) ([CloudEmpiere](https://www.cloudempiere.com))  
**Feature Ticket:** [IDEMPIERE-7161](https://idempiere.atlassian.net/browse/IDEMPIERE-7161)  
**Version:** iDempiere 14

## Summary

A plug-in that adds columns to a table it does not own, such as `C_Order`, can now generate an accessor class for its own columns. This example was tested on iDempiere 14.

```java
C_Order_XYZ.of(order).setXYZ_Note("Pallet delivery");
```

The accessor wraps any `PO` or `GridTab` of the table. Core's `I_`, `X_` and `M` classes stay as they are, and several plug-ins can each have their own accessor for the same table. The model generator also gets named command-line arguments and a `--check` option that fails a build when the generated classes no longer match the dictionary.

| Level | Table owner and column owners | Use |
| --- | --- | --- |
| A | Core only, or a plug-in with its own tables | `I_`, `X_` and `M` classes and a model factory. Unchanged. |
| B1 | Core and `XYZ` | Accessor `C_Order_XYZ` |
| B2 | Core, `XYZ` and `ABC` | One accessor per plug-in: `C_Order_XYZ`, `C_Order_ABC` |
| B3 | `XYZ` and `KLM` | `KLM` gets an accessor on a table that `XYZ` owns |

The rule at every level: each model stays with the owner of its entity type.

## The problem

Implementations add fields to standard documents all the time: a delivery note on the Sales Order, a customs code on the Product. The model generator already covers tables that a plug-in owns:

- Core generates `I_` and `X_` classes with entity type `D` into `org.compiere.model`. Business logic is in the `M` classes.
- A plug-in with its own tables generates `I_` and `X_` classes for its entity type into its own package, writes `M` classes and registers a [model factory](/docs/basic-development/plugin-development/plugin-modelfactory).

Run it with the [Generate Model](/docs/new-features/v11/generate-model-template) process or the `model.generator` launch configuration in Eclipse. This is level A, and its output does not change.

Level A stops working as soon as a second owner adds columns to the same table:

| Option | Problem |
| --- | --- |
| `get_Value("XYZ_Note")` | Untyped. A typo fails at run time. |
| Partial `I_C_Order` or `X_C_Order` | Name clash with core. A partial `X_` class breaks the model factory. |
| Subclass `MOrder` and a model factory | Only one plug-in can do it. |
| Columns in core's `X_C_Order` | A merge on every core upgrade. |

## What changed

The model generator can write an accessor: a small class for one owner's columns. It wraps an existing `PO` or `GridTab` and has no data or logic of its own.

- `C_Order_XYZ.of(po)` works on any `PO` of the table, including an `MOrder` that core created. It needs no model factory.
- `C_Order_XYZ.of(mTab)` works in a callout. Values go through `GridTab.setValue`, so dependent callouts still run and the read-only rules of the field apply.
- The getters and setters behave like the ones of the `X_` classes: an `_ID` set below 1 stores null (below 0 for the columns where 0 is valid), Boolean columns use Y and N, and list columns get the value constants of the `X_` class.
- On a `PO`, a column that is not updateable is written with `set_ValueNoCheck`. On a `GridTab`, every value goes through `GridTab.setValue`, so the read-only rules of the field apply also to a column that is not updateable.
- A column the table does not have fails at the first write, so a renamed column is not ignored.
- The accessor is named after the table and the plug-in: `<Table>_<suffix>`, for example `C_Order_XYZ`. Its interface, when generated in the same run, is `I_C_Order_XYZ`.

The command line of the model generator also accepts named arguments:

| Argument | What it does |
| --- | --- |
| `--folder` | Source folder. It must exist. |
| `--package` | Java package of the generated files. |
| `--tables` | One table name pattern (`LIKE`, case-insensitive) or a comma-separated list of exact names. |
| `--table-entity-type` | Entity types of the tables, comma separated. Default `U,A`. |
| `--column-entity-type` | Only columns of these entity types, comma separated. Default all columns. |
| `--output` | `interface`, `class` and/or `accessor`, comma separated. Default `interface,class`. |
| `--suffix` | Owner of the columns, for example `XYZ`. Required for `accessor`. Not allowed with `class`. |
| `--columns` | Only these columns, on top of `--column-entity-type`. Not allowed with `class`. |
| `--template` | Read the values not given from the Generate Model Template with this name. |
| `--check` | Compare instead of writing. See [Keep the classes in sync](#keep-the-classes-in-sync). |
| `--help` | Print the full description of the arguments. |

Write named arguments as `--key=value`. The form `--key value` is not supported.

The Generate Model process, the Swing dialog and the dictionary are not changed. The new options exist only on the command line.

## Before you start

The examples use `RUN_ModelGenerator.sh` in the root of the iDempiere source folder. It runs the model generator without Eclipse and needs:

1. The server product, built with `./mvnw verify`.
2. A database connection. Without a properties file as first argument, the script uses `idempiere.properties` in the source folder, which `install.app` or `install.console.app` creates in Eclipse.
3. On macOS, the `greadlink` command: `brew install coreutils`.

Run `bash RUN_ModelGenerator.sh -h` for the options of the script, and `bash RUN_ModelGenerator.sh --help` for the arguments of the generator.

:::warning

Do not mix named and positional arguments. A call such as `bash RUN_ModelGenerator.sh <folder> org.compiere.model D C_Order --output=accessor` is refused. Use the named form for every argument.

:::

## Generate an accessor

### B1. Core and one plug-in

The `XYZ` plug-in adds `XYZ_Note` (String) and `XYZ_PalletQty` (Quantity) to `C_Order`.

```bash
bash RUN_ModelGenerator.sh --folder=../com.xyz/src --package=com.xyz.model \
     --tables=C_Order --table-entity-type=D --column-entity-type=XYZ \
     --output=interface,accessor --suffix=XYZ
```

These calls were tested on iDempiere 14.

```java
// event handler: any C_Order PO, MOrder included
C_Order_XYZ.of(po).setXYZ_Note("Pallet delivery");

// callout: values go through the tab, other callouts still run
C_Order_XYZ.of(mTab).getXYZ_PalletQty();
```

### B2. Core and two plug-ins

A vertical plug-in `ABC` adds its own columns to the same table and generates its own accessor with `--column-entity-type=ABC --suffix=ABC`. This example was tested on iDempiere 14.

```java
C_Order_XYZ.of(order).setXYZ_Note("Ring twice");
C_Order_ABC.of(order).setABC_Region("North");
order.saveEx();
```

There is no model factory to compete for. Each plug-in owns only its own class.

### B3. A plug-in on another plug-in's table

`KLM` extends a table that `XYZ` owns, for example `XYZ_Shipment`. It works the same way:

```bash
bash RUN_ModelGenerator.sh --folder=../com.klm/src --package=com.klm.model \
     --tables=XYZ_Shipment --table-entity-type=XYZ --column-entity-type=KLM \
     --output=interface,accessor --suffix=KLM
```

The owner must generate its own classes with its own column entity type (`--column-entity-type=XYZ`). The generator does not enforce this. It cannot stop `XYZ` from generating all columns of its own table, and then the columns of `KLM` end up in the `X_` class of `XYZ`. Core already works this way with `D`.

## Keep each model where it belongs

| Rule | Enforced by |
| --- | --- |
| Accessor only over your own columns, never entity type `D` | Rule S7. Also refused: no `--column-entity-type` and no `--columns`. |
| No plug-in columns in a core package (`org.compiere.*`, `org.adempiere.*`) | Rule S4 |
| No partial `X_` class for a table you do not own | Rule S2 |
| No system entity type for the tables without a column entity type | Rule S1 |
| No accessor over an encrypted column | Refused by the generator |
| The suffix must not give the name of an existing table | Refused by the generator |
| A table in a `--tables` list, or a `--columns` name, that matches nothing | Refused, nothing is written |
| Logic goes in [event handlers](/docs/basic-development/plugin-development/plugin-eventhandler) and [callouts](/docs/basic-development/plugin-development/plugin-callouts), never in the accessor | `--check` reports edited files |
| Do not call or expose another plug-in's accessor. Pass the `PO`. | Review |
| Classes must match the dictionary | `--check` in the build |

With named arguments, rules S1, S2, S4 and S7 refuse the call. In the positional form they only print a warning, so existing scripts keep working. S4 refuses in both forms.

The accessor refuses columns of entity type `D` because it only gets and sets values. It skips the logic of the model classes. For example, `MOrder.setC_BPartner_ID` also sets the bill-to partner, and an accessor setter would not.

The dictionary is still the source of truth at run time. The accessor only adds compile-time types on top of it.

### What a refusal looks like

A refused call writes nothing. It prints the rule and ends with `result: refused`. For example, an accessor over the core dictionary columns:

```text
REFUSED S7: column entity type D is the core dictionary; the accessor only gets and sets values and skips the logic of the model classes (for example MOrder.setC_BPartner_ID). Use it for the columns of a plug-in, with the entity type of the plug-in in --column-entity-type.
result: refused
```

## Keep the classes in sync

Add `--check` to the generate command in your build. It generates into a temporary folder, compares the result with `--folder` and writes nothing. Use the same arguments as the generate call.

- It ignores the `serialVersionUID` and `@version` lines.
- It fails when no table matches, because a check that generated nothing has not checked anything.
- It does not report files that exist only in the target folder.

The exit code is 0 when everything matches. It is 1 for a difference, a refusal or an error. The last output line is `result: ok`, `result: refused`, `result: error` or `result: differs`.

On a core upgrade, take core's files as they are and run `--check`.

## Technical notes

- New classes: `org.adempiere.util.ModelGeneratorOptions` (argument parsing and safety rules) and `org.adempiere.util.ModelAccessorGenerator`.
- `ModelInterfaceGenerator` has new overloads with a suffix. The existing signatures are unchanged and delegate with a null suffix.

## Migration impact

None for the Generate Model process, the dialog and the generated core classes. The positional command-line form produces the same output as before. A few command-line calls that used to run now fail. See [Model generator command line](/docs/migration-notes/v14/technical-notes#model-generator-command-line).

## Related tickets

- [IDEMPIERE-5796](https://idempiere.atlassian.net/browse/IDEMPIERE-5796) Generate Model Template
