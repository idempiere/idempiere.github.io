---
title: "Storage Validator OSGI Service"
sidebar_label: "Storage Validator OSGI Service"
sidebar_position: 12
description: "This enhancement introduces a new Storage Validator extension point to iDempiere."
tags:
  - functional
---

# Storage Validator OSGI Service

**Goal:** New OSGI Service

**Developer:** pultzlucas

**Feature** **Ticket:** [IDEMPIERE-7011](https://idempiere.atlassian.net/browse/IDEMPIERE-7011)

**Overview**

This enhancement introduces a new Storage Validator extension point to iDempiere.

The feature allows developers to implement custom validations for inventory storage movements and reservation updates using OSGi services.

The validation is executed automatically whenever:

- On Hand Storage (`MStorageOnHand`) is updated
- Reserved Storage (`MStorageReservation`) is updated

This makes it possible to implement warehouse-specific, business-specific, or compliance-related inventory validations without modifying the core inventory logic.

**Motivation**

Different installations frequently require custom validation rules for inventory movements.

Examples include:

- Restricting inventory movement by warehouse
- Blocking movement based on product rules
- Validating reservations against external systems
- Enforcing logistics or fulfillment constraints
- Preventing movement in special operational scenarios

Before this enhancement, these validations often required core modifications.

The new extension point provides a clean and modular mechanism for implementing custom validation logic.

**New Interfaces**

- IStorageValidator
- IStorageValidatorFactory

**Benefits**

- Provides a clean extension mechanism
- Follows existing iDempiere service patterns
- Supports modular OSGi implementations
- Simplifies maintenance and upgrades
- Improves flexibility for warehouse processes
