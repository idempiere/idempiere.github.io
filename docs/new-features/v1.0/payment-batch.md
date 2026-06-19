---
sidebar_position: 22
title: "Payment Batch"
sidebar_label: "Payment Batch"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

Main goal of this feature is to allow users to group payments in batches in order to reconcile several payments in one single statement line.

The usage is simple, with "Payments into Batch" window you can create a batch document that group several payments, the payments can be selected using the "Create Lines From" button.

![01 Payment Batch](pathname:///img/new-features/v1.0/01_Payment_Batch.png)

And then when reconciling bank statement, you can choose to reconcile based on a "Payment Batch"

![02 Payment Batch](pathname:///img/new-features/v1.0/02_Payment_Batch.png)

**Technical Info:**

[IDEMPIERE-853](http://idempiere.atlassian.net/browse/IDEMPIERE-853)

Other notes collected related to this functionality:

[changeset 8ea10ec](http://bitbucket.org/idempiere/idempiere-historic/commits/8ea10ec)

[changeset ee19655](http://bitbucket.org/idempiere/idempiere-historic/commits/ee19655)

[changeset 4a08fa4](http://bitbucket.org/idempiere/idempiere-historic/commits/4a08fa4)

[changeset 1cd8330](http://bitbucket.org/idempiere/idempiere-historic/commits/1cd8330)

- http://adempiere.com/wiki/images/b/ba/Batch_AR_Receipts.pdf - Description of the feature from Alejandro Falcone
- http://sourceforge.net/p/adempiere/discussion/610546/thread/a74be921/?limit=25&page=1#17a5/d3c9/5018 - First mention of this feature in the ADempiere forums I could find
- http://sourceforge.net/p/adempiere/discussion/611161/thread/a434e7f1 - another discussion that deals with similar things and talks about this feature
- [IDEMPIERE-5329](https://idempiere.atlassian.net/browse/IDEMPIERE-5329)

**See also:**

[NF12 Multiple Payments against statement line by Payment Batch](https://wiki.idempiere.org/en/NF12_Multiple_Payments_against_statement_line_by_Payment_Batch)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Payment_Batch)_
