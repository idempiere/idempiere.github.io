---
sidebar_position: 21
title: "Mail Signature And Images"
sidebar_label: "Mail Signature And Images"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Developer:** Nicolas Micoud

**Description:**

In the mail template you can now add images and use context variables (based on the user sending the email).

In the next screenshot you can see the example for a signature using an image, please note the usage of cid: as the prefix for the image - it won't work if you don't define exactly the image source as the example shown.

The name of the image must correspond with an attachment name.  Note you can use also context variables like @Name@ and they will be replaced by the Name of the user sending the email (any column of the AD_User table can be used here)

![01 MailSignature](pathname:///img/new-features/v2.1/01_MailSignature.png)

Then, on user window you can assign a default mail template to the user (like a signature) - and define if that will be automatically added to emails - or it will require pushing the add-signature button.

![02 MailSignature](pathname:///img/new-features/v2.1/02_MailSignature.png)

In the mail dialog window you can see the result of enabling this functionality and the new add-signature button:

![03 MailSignature](pathname:///img/new-features/v2.1/03_MailSignature.png)

**Technical Info:** [IDEMPIERE-1899](http://idempiere.atlassian.net/browse/IDEMPIERE-1899)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Mail_Signature_And_Images)_
