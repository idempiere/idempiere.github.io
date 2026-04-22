---
title: Accounting Implementation Classes Extracted to org.idempiere.acct
sidebar_label:  Accounting Plugin (org.idempiere.acct)
sidebar_position: 5
description: Accounting-related implementation classes have been moved from iDempiere core to a dedicated bundle, making it possible to run iDempiere without the accounting engine.
---

* **Goal:** Technical  
* **Developer:** [Diego Ruiz](https://github.com/d-ruiz/)([TrekGlobal](https://www.trekglobal.com/))
* **Feature Ticket:** [IDEMPIERE-6647](https://idempiere.atlassian.net/browse/IDEMPIERE-6647)

# Accounting Implementation Classes Extracted to `org.idempiere.acct`

Accounting-related implementation classes have been moved out of iDempiere core into a dedicated bundle: `org.idempiere.acct`. This separation lays the groundwork for running iDempiere without the accounting engine in use cases where it is not needed.

---

## What Changed

All accounting implementation classes (document posting logic, accounting schema handling, `Doc_*` classes, etc.) have been moved from core bundles into the dedicated `org.idempiere.acct` bundle.

| Aspect | Before | After |
|---|---|---|
| **Accounting classes location** | Spread across iDempiere core | Consolidated in `org.idempiere.acct` |
| **Accounting engine dependency** | Always loaded - part of core | Loaded only when `org.idempiere.acct` is active |
| **Running without accounting** | Not possible | Possible via Extension Manager (see limitations) |
| **Plugin developers referencing acct classes** | Resolved from core | Must declare dependency on `org.idempiere.acct` |
| **Functional behavior (standard installs)** | Unchanged | Unchanged — bundle is included by default |

---

## Who Is Affected

- **Standard implementations with accounting enabled**: No action required. The `org.idempiere.acct` bundle is included and active by default. Behavior is identical to previous releases.
- **Implementations wanting to run without accounting**: This is now slightly possible via the Extension Manager. Be aware of the known UI limitations listed below.
- **Custom plugin developers**: If your plugin references any accounting implementation classes (e.g., `org.compiere.acct.*`, `Doc_*` classes), you **must** update your plugin to declare an explicit dependency on `org.idempiere.acct`.

---

## Disabling Accounting via Extension Manager

It is now possible to disable the accounting engine by disabling the `org.idempiere.acct` bundle through the **Extension Manager**.

:::note
This is an advanced configuration intended for specialized deployments that do not require accounting: such as headless integrations, operational-only setups, or specific industry verticals.
:::

To disable accounting:

1. Log in to iDempiere as a **System Administrator**.
2. Navigate to **Extension Manager**.
3. Locate the `org.idempiere.acct` bundle.
4. Disable the extension.

:::warning
**Known limitations when accounting is disabled:**
- The **Post button** remains visible in document windows but performs no action when clicked.
- Some accounting-related menu entries and fields may still appear in the UI.

Do not disable accounting in production environments unless you fully understand the impact on your implementation.
:::

---

## Impact on Custom Plugin Developers

If your plugin had a compile-time or runtime dependency on accounting implementation classes, you must update your `MANIFEST.MF`:

```text
Require-Bundle: org.idempiere.acct
```

Rebuild your plugin and verify there are no missing class references. Plugins that do not declare this dependency will fail to compile or throw `ClassNotFoundException` at runtime when accounting classes are resolved.

:::tip
If your plugin only references **model classes** (e.g., `MInvoice`, `MOrder`) and does not directly invoke posting logic or `Doc_*` classes, no changes are needed.
:::

---

## Related Resources

- [iDempiere Migration Notes](https://wiki.idempiere.org/en/Migration_Notes)