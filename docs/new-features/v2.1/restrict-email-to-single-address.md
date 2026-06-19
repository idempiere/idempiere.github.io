---
sidebar_position: 38
title: "Restrict EMail To Single Address"
sidebar_label: "Restrict EMail To Single Address"
description: "For test systems you can set up the SysConfig key MAIL_DONT_SEND_TO_ADDRESS=Y to avoid sending unwanted messages."
tags: [technical]
---
**Goal:** Technical

**Description:**

For test systems you can set up the SysConfig key MAIL_DONT_SEND_TO_ADDRESS=Y to avoid sending unwanted messages.
If combined with MAIL_SEND_BCC_TO_ADDRESS, then it will send messages just to the configured address.

Another use case can be to catch all the communications in a single email address in order to review and forward.

![01 RestrictEMail](pathname:///img/new-features/v2.1/01_RestrictEMail.png)

**Technical Info:** [IDEMPIERE-2104](http://idempiere.atlassian.net/browse/IDEMPIERE-2104), [MAIL_DONT_SEND_TO_ADDRESS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#MAIL_DONT_SEND_TO_ADDRESS), [MAIL_SEND_BCC_TO_ADDRESS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#MAIL_SEND_BCC_TO_ADDRESS)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Restrict_EMail_To_Single_Address)_
