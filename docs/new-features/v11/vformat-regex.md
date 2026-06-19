---
sidebar_position: 19
title: "VFormat RegEx"
sidebar_label: "VFormat RegEx"
description: "**Developer:** Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Carlos Ruiz

**Description:**

Now you can add validation for Strings based on regular expressions using the VFormat definition.

This is achieved simply adding a VFormat starting with the prefix ~ and followed by the regular expression that you want to apply.

For example, the following regular expression can be used to validate Spanish person names:

`^[A-Za-záéíóúÁÉÍÓÚñÑüÜ][A-Za-záéíóúÁÉÍÓÚñÑüÜ\s-]*$`

But, to put it in the VFormat you must add the ~ prefix, like this:

`~^[A-Za-záéíóúÁÉÍÓÚñÑüÜ][A-Za-záéíóúÁÉÍÓÚñÑüÜ\s-]*$`

![01 VFormat](pathname:///img/new-features/v11/01_VFormat.png)

This is what the user would see when entering an invalid Name:

![02 Error](pathname:///img/new-features/v11/02_Error.png)

Furthermore, if you want to supply the user a more friendly error message you can define a Message for the regular expression itself, just the regular expressions, without the ~ prefix:

![03 Message](pathname:///img/new-features/v11/03_Message.png)

And now the user would see the error like:

![04 Error](pathname:///img/new-features/v11/04_Error.png)

**Technical Info:** [IDEMPIERE-6096](https://idempiere.atlassian.net/browse/IDEMPIERE-6096)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_VFormat_RegEx)_
