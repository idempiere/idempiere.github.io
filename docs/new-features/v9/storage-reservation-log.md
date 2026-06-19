---
sidebar_position: 32
title: "Storage Reservation Log"
sidebar_label: "Storage Reservation Log"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-5021](https://idempiere.atlassian.net/browse/IDEMPIERE-5021)

**Description:**

Implement movement log for QtyReserved and QtyOrder:
1. Add M_StorageReservationLog table
1. Add Qty Reserved Log and Qty Ordered Log tab to Product window
1. Add IReservationTracer and IReservationTracerFactory class, add IReservationTracer parameter to MStorageReservation.add method. Plugin that uses the now deprecated MStorageReservation.add method should migrate the new api (see MOrder.reserveStock method for example usage of the new classes and new MStorageReservation.add method)

## Example
1. Qty Reserved Log and Qty Ordered Log at Product window:
1. * ![Reserved Quantity Log 5021](pathname:///img/new-features/v9/Reserved_Quantity_Log_5021.png)

_Qty Reserved Log_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Storage_Reservation_Log)_
