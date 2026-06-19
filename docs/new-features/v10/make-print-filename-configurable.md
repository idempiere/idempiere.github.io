---
sidebar_position: 29
title: "Make print filename configurable"
sidebar_label: "Make print filename configurable"
description: "**Goal:** UX/Functional"
tags: [user-experience]
---
**Goal:** UX/Functional

**Developer:** cloudempiere, Takacs Peter, **Design**: Norbert Bede **Review**: Hengsin Low/CarlosRuiz

**Feature Ticket: [IDEMPIERE-4753](https://idempiere.atlassian.net/browse/IDEMPIERE-4753)**

**Solution**

This enhancement allows you to configure the human readable print file name instead of the system generated name.

The pattern  "SCO@DocumentNo@" generate pdf with human readable filename SCO20210406-001 instead InvoiceFormatGroup_5099627889056305320.pdf

The solution supports default printformat item and translations ​ as well as standard iDempiere form documents and Jasper report-based documents.

**Setup/Usage**

1. Open print format,
1. Select Print format item
1. Enter field FileNamePattern  , example
1. * A. invoice_@DocumentNo@
1. * B. rechnung_@DocumentNo@ (on _trl)
1. * C. SO_@DocumentNo@_@C_BPartner_ID&lt;Name&gt;@_@#AD_User_ID&lt;Name&gt;@

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Make_print_filename_configurable)_
