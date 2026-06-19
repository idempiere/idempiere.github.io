---
sidebar_position: 7
title: "Prepay Order Configurable Shipment and Invoicing"
sidebar_label: "Prepay Order Configurable Shipment and Invoicing"
description: "**Goal:** Sales Process"
tags: [functional]
---
**Goal:** Sales Process

**Developer:** cloudempiere, Takacs Peter, **Design**: Igor Pojzl, Norbert Bede **Review**: CarlosRuiz, Hengsin

**Feature Ticket: [IDEMPIERE-6177](https://idempiere.atlassian.net/browse/IDEMPIERE-6177)**

**Background**

iDempiere allows to create various document types, from simple sales order with reservation through prepayment til pos order (order, ship, invoice, payment). The point of prepayment is to postpone delivery until the payment was received for this order.

**Motivation**

We are facing issues with variability requirement, when to generate shipment and invoice after payment received. There was a limitation before, iDempiere creates shipment and invoice for stocked items as well as for services. Also iDempiere assumed after prepayment the invoice and payment must be generated immediately. Therefore it was impossible to use a confirmation of picking or shipping.

**Use cases**

These changes allows to use prepay order in various use cases like

1. create e-commerce order for selling services, when paid by payment transaction, create payment and only an invoice will be created automatically
1. create sales order with 1 step ship, invoice after payment received
1. create sales order stop delivery, when payment received, then order being completed and can be released to shipment (generate shipment) which autogenerate Shipment Confirmation. When Shipment confirmed, then invoice generated which automatically allocate to payment paid before order delivered.

**Changes**

Added 2 new checkboxes to Document Type window (Generate Invoice, Generate Shipment), which enables to change, on which Prepayment process will be Shipment and/or Invoice generated. The new checkboxes are visible for the following SO Sub Types:

- Generate Invoice: On Credit Order, POS Order, Prepay Order
- Generate Shipment: On Credit Order, POS Order, Prepay Order, Warehouse Order

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Prepay_Order_Configurable_Shipment_and_Invoicing)_
