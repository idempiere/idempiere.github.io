---
title: Support YAML and JSON on PackOut
sidebar_label: YAML and JSON on PackOut
sidebar_position: 5
description: Adds YAML and JSON as peer export/import formats for the 2Pack packaging system, alongside the existing XML format.
tags:
  - technical
---

* **Goal:** Technical
* **Developer:** [Peter Takacs](https://github.com/PeterTakacs300)
* **Feature Ticket:** [IDEMPIERE-7016](https://idempiere.atlassian.net/browse/IDEMPIERE-7016)

# YAML and JSON Support for 2Pack (PackOut / PackIn)

The 2Pack packaging system (`PackOut` / `PackIn`) has historically only supported XML as its serialization format. This feature adds **JSON and YAML** as peer export/import formats, giving users the choice of a more human-readable and version-control-friendly output.

---

## What Changed

| Aspect | Before | After |
|---|---|---|
| **Export formats** | XML only | XML, JSON, or YAML |
| **Import detection** | Looks for `PackOut.xml` | Auto-detects `PackOut.xml`, `PackOut.json`, or `PackOut.yaml` |
| **Process parameter** | None | New **Export Format** parameter on PackOut process |
| **Default format** | N/A | XML (unchanged — backward compatible) |

---

## Architecture

A new `IPackSerializer` interface decouples PackOut from the SAX/XML pipeline, enabling pluggable serialization backends:

- **`SAXPackSerializer`** — Adapter wrapping the existing XML path. Zero behavior change; all existing XML output is produced through this adapter.
- **`JacksonPackSerializer`** (base) + **`JsonPackSerializer`** + **`YamlPackSerializer`** — Jackson-based serializers that convert pack events to nested JSON/YAML structures using `_children` arrays for nested elements.
- **`DataPackInReader`** — Replays JSON/YAML as SAX events into the existing `PackInHandler`, so all import handler logic works unchanged regardless of the source format.
- All `ElementHandler` implementations have been refactored to use `IPackSerializer` instead of `TransformerHandler`, but their behavior remains identical for XML exports.

---

## Exporting a Package in JSON or YAML

1. Run the **PackOut** process as usual.
2. In the new **Export Format** parameter, select:
   - **X** — XML (default, backward compatible)
   - **J** — JSON
   - **Y** — YAML
3. The process generates the corresponding file (`PackOut.xml`, `PackOut.json`, or `PackOut.yaml`) in the package directory.

---

## Importing a Package

No configuration is needed. **PackIn** auto-detects the format by probing for `PackOut.json`, `PackOut.yaml`, and `PackOut.xml` in that order. If the package was exported in JSON or YAML, `DataPackInReader` routes it through the same `PackInHandler` used by XML imports.

The `PipoDictionaryService` (OSGi bundle auto-install) also follows the same probing order when importing dictionary files.

---

## Migration

A database migration creates:

- **AD_Reference** `200286` ("2Pack Export Format") with list values X / J / Y.
- **AD_Element** and **AD_Process_Para** `ExportFormat2Pack` on the `AD_PackOut` process (ID 50004).

---

## Dependencies

`jackson-dataformat-yaml` and `snakeyaml` have been added to the target platform, OSGi manifest imports, and all relevant launch configurations.

---

## Related Resources

- 🔗 [Pull Request #3274](https://github.com/idempiere/idempiere/pull/3274)
- 🔗 [Feature Ticket IDEMPIERE-7016](https://idempiere.atlassian.net/browse/IDEMPIERE-7016)
