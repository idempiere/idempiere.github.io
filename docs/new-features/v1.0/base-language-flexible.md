---
sidebar_position: 51
sidebar_label: "Base Language Flexible"
description: "Base Language Flexible: a New Feature in iDempiere 1.0."
tags: [technical]
---
# Base Language Flexible

**Goal:** Technical

**Seed Contributor:** Kenos

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

Please refer &lt;http://sourceforge.net/p/adempiere/discussion/611158/thread/506d18af&gt;

A new process was added "Change Base Language", use this process to swap en_US to another base language of your preference, or if you want a system without base language just set the base language to a non-login language.

PO.updateTranslations and Synchronize Doc Translation were changed to synchronize any change on the master table (i.e. C_Charge) to the corresponding translation table (i.e. C_Charge_Trl) for the language selected by tenant.

![lenguage1](pathname:///img/new-features/v1.0/lenguage1.png)

**Technical Info:** [IDEMPIERE-136](http://idempiere.atlassian.net/browse/IDEMPIERE-136) [IDEMPIERE-489](http://idempiere.atlassian.net/browse/IDEMPIERE-489)

See also: [How translation works](/docs/translation-localization/how-translation-works), which describes how translations are updated today.
