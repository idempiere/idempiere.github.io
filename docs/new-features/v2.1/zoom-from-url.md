---
sidebar_position: 29
title: "Zoom from URL"
sidebar_label: "Zoom from URL"
description: "Now you can pass parameters directly to the URL and zoom into a specific window or a record within a window."
tags: [user-experience]
---
**Goal:** Usability

**Description:**

Now you can pass parameters directly to the URL and zoom into a specific window or a record within a window.

The parameters that URL receives are:
- ***Action:*** at this moment you need to define Action=Zoom, in future more actions can be implemented
- Table: you can pass one of the following parameters to indicate the table to be zoomed in
    - ***AD_Table_ID:*** You can pass the table ID and the zoom will be discovered based on the usual rules
    - ***TableName:*** Or you can optionally pass the table name
- ***Record_ID:*** Optionally you can pass a Record_ID to zoom directly

Examples:

- Open iDempiere and navigate to product "Azalea Bush" (using TableName=M_Product)
    - &lt;https://test.idempiere.org/webui/?Action=Zoom&TableName=M_Product&Record_ID=128&gt;(https://test.idempiere.org/webui/?Action=Zoom&TableName=M_Product&Record_ID=128)
- Open iDempiere and navigate to the order containing the order line with ID 102 (using AD_Table_ID=260 which is C_OrderLine)
    - &lt;https://test.idempiere.org/webui/?Action=Zoom&AD_Table_ID=260&Record_ID=102&gt;(https://test.idempiere.org/webui/?Action=Zoom&AD_Table_ID=260&Record_ID=102)
- Open iDempiere and navigate to the Business Partner window (using AD_Table_ID=291 which is C_BPartner)
    - &lt;https://test.idempiere.org/webui/?Action=Zoom&AD_Table_ID=291&gt;(https://test.idempiere.org/webui/?Action=Zoom&AD_Table_ID=291)
- Open iDempiere and navigate to the Business Partner window (using TableName)
    - &lt;https://test.idempiere.org/webui/?Action=Zoom&TableName=C_BPartner&gt;(https://test.idempiere.org/webui/?Action=Zoom&TableName=C_BPartner)

![01 ZoomFromURL](pathname:///img/new-features/v2.1/01_ZoomFromURL.png)

**Technical Info:** [IDEMPIERE-2334](http://idempiere.atlassian.net/browse/IDEMPIERE-2334)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Zoom_From_URL)_
