# Add option to Disable "Insufficient Inventory" Popup

> **Goal:** User experience - Usability

**Developer:**  Diego Ruiz

**Feature Ticket:** [IDEMPIERE-6549](https://idempiere.atlassian.net/browse/IDEMPIERE-6549)

**Description**
Currently, users always receive a popup message indicating "Insufficient Inventory" when creating a Sales Order Line, even if the associated warehouse is configured to allow negative inventory.

With this improvement, a flag was added to the Warehouse window to control this behavior. When enabled, the system does not show the warning dialog.

![WarehouseNewFlag](pathname:///img/new-features/v12/WarehouseNewFlag.png)
