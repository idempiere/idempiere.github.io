---
sidebar_position: 21
title: "Workflow EMail Notification Enhancements"
sidebar_label: "Workflow EMail Notification Enhancements"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-5261](https://idempiere.atlassian.net/browse/IDEMPIERE-5261)

**Description:**

Make attachment of PDF document to Workflow EMail Notification optional.

Add bean property access to Mail Template.

**Changes:**

- ''Add **Attached Document** flag to Workflow Node tab. Visible when Action is EMail. Checked to attached PDF document to EMail (existing behavior) and unchecked to send EMail without attachment.
![5261 AttachedDocumentFlag](pathname:///img/new-features/v10/5261_AttachedDocumentFlag.png)

_Attached Document to EMail_

- *Add bean property access to Mail Template with the **@=&lt;bean property name&gt;@** notation. For e.g, **@=summary@** (**@=Summary@** works too, you can use upper or lower case for first character of the bean property name and it is case sensitive after the first character) for getSummary() of MOrder.*

- *Add context variable (@...@) support to **Subject** field of Mail Template. Access is provided to global variables (for e.g @#AD_Client_ID@), PO column (for e.g, @DocumentNo@) and bean property (for e.g @=summary@)*
- *Add support for a fake context variable @_noDocInfo_@  When this variable is present on the subject or the text of the mail template, then, no extra information is added by the workflow processor.*

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Workflow_EMail_Enhancement)_
