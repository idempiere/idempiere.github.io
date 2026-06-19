---
sidebar_position: 13
title: "Virtual Search Column"
sidebar_label: "Virtual Search Column"
description: "**Developer:** Diego Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Diego Ruiz

**Sponsor:** [BX Service GmbH](http://www.bx-service.com/)

**Description:**

The goal of the ticket is to allow the configuration of virtual search columns.

To add a virtual search column, the user must define a SQL Column as a regular virtual column but starting with “@SQLFIND=(*QUERY*)”.

For example:

@SQLFIND=(SELECT b.so_creditlimit FROM C_BPartner b WHERE C_Order.c_bpartner_id = b.c_bpartner_id) -> **Creates a search column for business partner credit limit**

@SQLFIND=(SELECT l.postal
FROM C_BPartner_Location bp
JOIN c_location l ON (bp.c_location_id = l.c_location_id)
WHERE (C_Order.bill_location_id = bp.c_bpartner_location_id)
AND bp.isshipto = 'Y'
AND l.isactive = 'Y'
AND bp.isactive = 'Y'
AND bp.c_location_ID = l.c_location_ID
AND C_Order.C_BPartner_ID = bp.C_BPartner_ID
AND bp.C_BPartner_Location_ID = (SELECT MAX(bp1.C_BPartner_Location_id)
FROM C_BPartner_Location bp1
WHERE bp1.C_BPartner_ID = C_Order.C_BPartner_ID))
-> **Creates a search column that allows the user to search by zip code in the orders window**

The user must create the Column and the Field as normally (after saving the field, isDisplayed will be set to ‘N’ automatically)

![SQLFINDCOLUMN](pathname:///img/new-features/v7.1/SQLFINDCOLUMN.jpg)

The users will be able to search through that column in simple and advanced searches

![SQVIRTUALNORMAL](pathname:///img/new-features/v7.1/SQVIRTUALNORMAL.jpg)

![SQLFINDAVANCED](pathname:///img/new-features/v7.1/SQLFINDAVANCED.jpg)

**See also** [NF6.2 Virtual UI Column](https://wiki.idempiere.org/en/NF6.2_Virtual_UI_Column), [NF8.2 Override Virtual Column In Field](https://wiki.idempiere.org/en/NF8.2_Override_Virtual_Column_In_Field)

**Technical Info:** [IDEMPIERE-4087](https://idempiere.atlassian.net/browse/IDEMPIERE-4087)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Virtual_Search_Column)_
