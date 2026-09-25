---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 14."
tags: [features, migration, installation, development, developer-documentation, reference]
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
