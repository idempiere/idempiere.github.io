---
title: SOAP Web Services Plugin
sidebar_label: SOAP Web Services
sidebar_position: 4
description: The SOAP Web Services bundle has been extracted from iDempiere core and is now available as a standalone optional plugin.
---

* **Goal:** Technical  
* **Developer:** [Diego Ruiz](https://github.com/d-ruiz/)([TrekGlobal](https://www.trekglobal.com/))
* **Feature Ticket:** [IDEMPIERE-6955](https://idempiere.atlassian.net/browse/IDEMPIERE-6955)

# SOAP Web Services Plugin

The SOAP Web Services bundle has been extracted from iDempiere core and is now available as a standalone optional plugin, installable via the [Extension Manager](./extension-management.md).

**Repository:** [https://github.com/idempiere/idempiere-soap-webservices](https://github.com/idempiere/idempiere-soap-webservices)

---

## Background

Since its early versions, iDempiere included the SOAP Web Services bundle (`org.idempiere.webservice`) as part of its core. This bundle provided the `CompositeService` and `ModelADService` endpoints used for XML-based enterprise integrations.

Over time, the [REST API](https://github.com/bxservice/idempiere-rest) became the recommended and widely-adopted approach for integrating with iDempiere, making the SOAP bundle **optional** for most implementations. Additionally, the SOAP bundle carried a significant amount of heavy third-party libraries (Apache CXF, WSDL tooling, etc.) that added unnecessary overhead to deployments that did not require SOAP.

---

## What Changed

The SOAP Web Services bundle has been removed from the iDempiere core repository and moved to its own dedicated repository. This reduces the core footprint and makes SOAP support an explicit opt-in.

| Aspect | Before | After |
|---|---|---|
| **Distribution** | Bundled in iDempiere core | Separate plugin repository |
| **Installation** | Always present | Optional, via Extension Manager |
| **Core footprint** | Heavier (CXF + WSDL libs included) | Lighter. Libraries removed from core |
| **REST API impact** | None | None - REST API is unaffected |
| **SOAP Endpoint URLs** | Same | Same (once plugin is installed) |

---

## Who Is Affected

- **Implementations using SOAP Web Services**: You must install the plugin after upgrading. The SOAP endpoints will not be available until the plugin is installed.
- **Custom plugins depending on SOAP WS classes**: You must update your dependency declarations to reference the new standalone bundle instead of core.

---

## Installing the Plugin

1. Log in to iDempiere as a **System Administrator**.
2. Navigate to **Extension Manager**.
3. Add and install the extension **iDempiere SOAP Web Services (ADInterface)**
4. Verify the SOAP endpoints are accessible at:
- `http://<your-host>:8080/ADInterface/services/ModelADService`
- `http://<your-host>:8080/ADInterface/services/CompositeService`

---

## Impact on Custom Plugin Developers

If your plugin had a compile-time or runtime dependency on SOAP web service classes (e.g., `org.idempiere.webservice.*`), you must:

1. Add a dependency on the `idempiere-soap-webservices` bundle in your plugin's `MANIFEST.MF`.
2. Ensure your build references the new standalone repository instead of core.
3. Re-test your plugin against the updated bundle to verify it compiles and functions correctly.

:::warning
Failing to update your plugin dependencies will result in **compilation errors** and potential runtime failures after upgrading iDempiere.
:::

## Related Resources

- 🔗 [Plugin Repository](https://github.com/idempiere/idempiere-soap-webservices)
- 🔗 [iDempiere REST API](https://wiki.idempiere.org/en/REST_Web_Services)
- 🔗 [Migration Notes](https://wiki.idempiere.org/en/Migration_Notes)