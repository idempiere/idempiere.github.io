---
sidebar_position: 6
title: "Validate EMail Format"
sidebar_label: "Validate EMail Format"
description: "**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)"
tags: [functional]
---
**Goal:** Functional

**Sponsor:** [TrekGlobal](http://www.trekglobal.com/)

**Description:**

In order to increase the data quality and avoid mistakes a basic validation is done now on EMail address to ensure it conforms to the syntax rules of RFC 822.

NOTE the java implementation checks many, but not all, syntax rules. Also note that even though the syntax of the address may be correct, there's no guarantee that a mailbox of that name exists.

![NF20ValidateEMail](pathname:///img/new-features/v2.0/NF20ValidateEMail.png)

**Technical Info:** [IDEMPIERE-1409](http://idempiere.atlassian.net/browse/IDEMPIERE-1409) [InternetAddress validate](http://docs.oracle.com/javaee/1.4/api/javax/mail/internet/InternetAddress.html#validate())

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.0_Validate_EMail_Format)_
