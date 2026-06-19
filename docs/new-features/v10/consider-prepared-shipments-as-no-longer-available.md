---
sidebar_position: 9
title: "Consider prepared shipments as no longer available"
sidebar_label: "Consider prepared shipments as no longer available"
description: "**Goal:** UX/Functional"
tags: [functional]
---
**Goal:** UX/Functional

**Developer:** Martin Schönbeck, Lukas Heidbreder

**Sponsor**: Martin Schönbeck Beratungen GmbH

**Feature Ticket: [IDEMPIERE-4269](https://idempiere.atlassian.net/browse/IDEMPIERE-4269)**

**Changes**

- Consider prepared shipments as no longer available.

- When creating new shipments up to now quantities assigned to not yet completed shipment where treated as available. When using ship confirmations this is true as long as the confirmation is not entered. This leads to new shipments generated which try to get products which are already on the road to another customer.

- InOutGenerate now takes a new parameter SubtractOnHand, setting this to 'Y' will reduce OnHand quantities by those quantities already used by other not yet completed shipments.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Consider_prepared_shipments_as_no_longer_available)_
