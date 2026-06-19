---
sidebar_position: 12
title: "Set default Contact/User in Documents"
sidebar_label: "Set default Contact/User in Documents"
description: "**Developer:** Diego Ruiz"
tags: [functional]
---
**Goal:** Usability

**Developer:** Diego Ruiz

**Sponsor:** [Askey Dataloggers](https://www.askey.nl/) +  [BX Service GmbH](http://www.bx-service.com/)

**Description:**

The goal of the ticket is to ease the document creation process by setting default BillTo/ShipTo users based on a new flag on the User/Contact window.

**How to do configure it?**

In the 'User' window or in the 'User/Contact' tab on the Business Partner window, there are two new checkboxes.

![ShipToBillToUser](pathname:///img/new-features/v8.2/ShipToBillToUser.jpg)

When you create a Sales Order, Purchase Order, Invoice, or Shipment document. The system will set the user marked as Ship contact for the User/Contact field and the user marked as Invoice Contact in the 'Invoice Contact' field. If no user has those flags checked it will behave as before and set the user with the highest ID or the one selected in the User Info Window when choosing a Business Partner.

**Technical Info:** [IDEMPIERE-4490](https://idempiere.atlassian.net/browse/IDEMPIERE-4490)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Set_default_Contact/User_in_Documents)_
