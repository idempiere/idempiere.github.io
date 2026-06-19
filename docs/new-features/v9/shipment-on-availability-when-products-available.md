---
sidebar_position: 14
title: "Shipment On Availability When Products Available"
sidebar_label: "Shipment On Availability When Products Available"
description: "**Developer:** Lukas Heidbreder"
tags: [functional]
---
**Goal:** Functional

**Developer:** Lukas Heidbreder

**Feature** **Ticket:** [IDEMPIERE-4269](https://idempiere.atlassian.net/browse/IDEMPIERE-4269)


### Description
1. when creating shipments (automatically or manually) existings shipments in status 'prepare' are not taken into account when calculating the available amount of products.
1. There are two stages where this is problematical. When shipments require a confirmation for picking they stay 'prepared' until picking is committed. So it happens that two or more shipments are created for the same product even if the amount available suffices only the first. That means extra effort for the people picking the products.
1. Second stages is when shipments require confirmation of delivery. Because all products being on the road to the customer are taken into account for new shipments there will be shipments created where nothing is on stock.
1. Because this is done on every run to create shipments it's very annoying.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Shipment_On_Availability_When_Products_Available)_
