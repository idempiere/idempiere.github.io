---
title: "Accounting Schema Valid Range"
sidebar_label: "Accounting Schema Valid Range"
sidebar_position: 2
description: "The goal of this enhancement is to enable accounting schema to validate within a provided range of time, so that the documents having accounting dates out of the configured range do not post."
tags:
  - functional
---

# Accounting Schema Valid Range

**Goal:** Functional

**Developer:** Deepak Pansheriya [Logilite Technologies](https://www.logilite.com)

**Feature** **Ticket:** [IDEMPIERE-6254](https://idempiere.atlassian.net/browse/IDEMPIERE-6254)
### Enable Accounting Configuration For Time Range
The goal of this enhancement is to enable accounting schema to validate within a provided range of time, so that the documents having accounting dates out of the configured range do not post.

On Accounting Schema, you will find Start Date and End Date field. These fields define effectiveness of accounting schema that means only accounting generated in this range only.

![Accounting Schema Validity](/img/docs/new-features/v13/Accounting_Schema_Validity.png)

Note that start or end date are not mandatory. Start and date value impact posting as below

1. If neither start or end date are provided then all documents will posted to generate GL entries in this accounting schema
1. if Start date is provided but not end date means accounting GL posting generated for all documents having accounting date is or after start date
1. if Start date is not provided and end date is provided then documents having accounting date before or equal to end date are only posted
1. if both Start Date and End date are provided then only documents having accounting date range between Start date and End Date inclusive.

Now consider that some of documents you want to ignore this date validation and want let it to post. for example GL Journal. in that case you can mark Always Posted on document type as below

![Img always update](/img/docs/new-features/v13/Img_always_update.png)

Note that if you making any changes in configuration, if Document are already posted, will not auto cleared. If you are making changes in this configuration, you must use reset accounting with clear accounting option to delete GL entries already generated and also to generate new entry which was not generated.
