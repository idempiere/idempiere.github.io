---
sidebar_position: 21
title: "Implement escape sequence for text with context variable"
sidebar_label: "Implement escape sequence for text with context variable"
description: "**Developer:**  Takacs Peter, Hengsin"
tags: [technical]
---
**Goal:** Technical

**Developer:**  Takacs Peter, Hengsin

**Feature Ticket:** [IDEMPIERE-6116](https://idempiere.atlassian.net/browse/IDEMPIERE-6116)

**Description**

We use a pair of @ character for context variable, for e.g @C_Order_ID@. This create a problem when we need to use text literal with @ character (for e.g email address) together with context variable.For e.g, the mail text template below:

```
Hello @Name@

Here is some text

Contact us at: test@test.com

or to this another mail test2@test.com
```

To solve this problem, this ticket implement the '@@' escape sequence to support the use of single @ character.

```
Hello @Name@

Here is some text

Contact us at: test@@test.com

or to this another mail test2@@test.com
```

**Note for logic expression**
&lt;p&gt;
The escape sequence is not needed for logic expression (display logic, readonly logic, etc).

For logic expression, you use “`@EMail@=test@idempiere`.com” or “`@EMail@='test@idempiere`.com'“, not “`@EMail@=test@@idempiere`.com”

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Escape_Sequence_For_Context_Variable)_
