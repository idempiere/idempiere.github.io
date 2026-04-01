---
title: iDempiere Extension Management
sidebar_label: Extension Management
sidebar_position: 1
description: It provides a centralized service to discover, validate, install, and update OSGi-based plugins and database extensions directly within the iDempiere environment.
---

:::warning Not Yet in Stable Release
This feature is not yet part of a stable iDempiere release and may change.
:::

* **Goal:** Technical  
* **Developer:** [hengsin](https://github.com/hengsin)([TrekGlobal](https://www.trekglobal.com/))
* **Feature Ticket:** [IDEMPIERE-6908](https://idempiere.atlassian.net/browse/IDEMPIERE-6908)

## 🚀 Features

* **Centralized Registry:** Tracks all installed extensions and their current versions.
* **Dependency Resolution:** Automatically validates requirements and dependencies before installation.
* **Extension Lifecycle Control:** Provides services to install, uninstall, enable and disable dynamically.
* **Metadata Integration:** Parses and processes `metadata.json` and `info.md` files to provide a rich UI experience for administrators.
* **Secure Downloads:** Manages secure retrieval of artifacts from remote repositories and verifies checksums.


## 📦 Changes

* **New Metadata Tables:**
   - `AD_Extension`: to store name, id, version and metadata of an extension. This include external and bundled extension (differentiated by the `bundled` flag).
   - `AD_ExtensionEntity`.: to store database entity that belongs to an extension. This is use to disable/enable the corresponding database entities when user disable/enable/uninstall an extension.
* **New Form:**
   - `Extension Management`: Form to browse and manage extensions from remote extension repository, extensions that have been installed locally and extensions that's bundled with the application. 
* **New Window:**
  - `Extension Registry`: Window to view and manage `AD_Extension` and `AD_ExtensionEntity`.
* **New Process:**
  - `Install Extension`: Install remote extension.
  - `Uninstall Extension`: Uninstall locally installed extension.
  - `Disable Extension`: Disable installed extension.
  - `Enable Extensio`: Enable an extension that have been disabled.
  - Invoke from the `Extension Management`  form or `Extension Registry` window.
* **System Property:** Adds new System Property `IDEMPIERE_EXTENSION_REPOSITORY` to define default extension repository URLs.
* **Default Extension Repository:**  
   - https://github.com/idempiere/idempiere-extension-repository/
   - See README.md at the site on how to submit new extension.
   - Structure and metadata of an extension: https://github.com/hengsin/idempiere-extension-repository-template/blob/main/extension-spec.md
* **Extension Repository Template:** 
   - https://github.com/hengsin/idempiere-extension-repository-template/ 
   - Template to create a new extension repository.

## 🛠 Usage & Configuration

* **Configuration:**
    1. Configure the **Extension Provider URL** using the `IDEMPIERE_EXTENSION_REPOSITORY` System Property to point to a compatible metadata repository.
    2. Accessed the configured extension repository via the **Extension Management** form.
    3. View and manage installed extension at the **Extension Registry** window.
* **Extension Management Form:** 
    - Left Pane: 
      - Extension Repository: list extensions hosted in the configured extension repository.
      - Installed Extension: list extensions that have been installed locally.
      - Filter text input: filter extensions by name or description. Use tag:{filter text} to filter by tags and category:{filter text} to filter by categories.
    - Right Pane:
      - Toolbar to install, uninstall, enable or disable an extension.
      - Download button to download an extension as an archive with .idext extension.
      - Registry button to open the corresponding extension record in the Extension Registry window.
      - Content area to display the details and change log (if available) of the selected extension.
      - The content area include a right side bar to show some metadata of the selected extension.
* **Extension Form: Browse Available Extensions**
![Extension Form: Browse Available Extensions](/img/docs/new-features/ExtensionForm_Browse_Available_Extension.png)

* **Extension Form: Browse Installed Bundled Extensions**
![Extension Form:Browse Installed Bundled Extension](/img/docs/new-features/ExtensionForm_Browse_Installed_Bundled_Extension.png)

* **Extension Form: Browse Installed External Extensions**
![Extension Form:Browse Installed External Extension](/img/docs/new-features/ExtensionForm_Browse_Installed_External_Extension.png)

* **Extension Registry Window:**
   - View and manage installed extension.
   - Header: Installed extension details (`AD_Extension`) .
   - Detail: Database entities that managed by an extension (`AD_ExtensionEntity`).
   - Gear Dropdown: list of actions that can be applied to an extension (install, uninstall, disable or enable).

* **Extension Registry Window: Bundled Extension**
![Extension Registry: Bundled Extension](/img/docs/new-features/ExtensionRegistry_Bundled_Extension.png)

* **Extension Registry: External Extension**
![Extension Registry: Bundled Extension](/img/docs/new-features/ExtensionRegistry_External_Extension.png)
