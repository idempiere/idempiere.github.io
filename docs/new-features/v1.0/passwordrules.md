---
sidebar_position: 62
title: "Password Rules"
sidebar_label: "Password Rules"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [security]
---
**Goal:** Security

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**External Credits:** Supported on [vt-password](http://code.google.com/p/vt-middleware/wiki/vtpassword) and [vt-dictionary](http://code.google.com/p/vt-middleware/wiki/vtdictionary) libraries by [Middleware Services](http://www.middleware.vt.edu) at [Virginia Tech](http://www.vt.edu/).

**Description:**

- Implementors can define now system wide password policies using the window *Password Rule*, in this window you can configure:
    - Lengths: maximum and/or minimum
    - Number of Characters Required per type: Alphabetical, Digit, Uppercase, Lowercase, Non-Alphanumeric
    - Length of sequences to Forbid per type: Alphabetical, Numerical, QWERTY (keyboard), Repeated characters
    - Disallow using username within the password
    - Disallow whitespaces within the password
    - Check password against a text configurable dictionary, in this case you can also configure if the match will be checked backwards also and the minimum word length to check

- On *Client* just for System Client window you can configure the specific password policies that you want to apply to each client

![NF001 SEC PasswordRules](pathname:///img/new-features/v1.0/NF001_SEC_PasswordRules.png)

**Technical Info:** [IDEMPIERE-221](http://idempiere.atlassian.net/browse/IDEMPIERE-221)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_PasswordRules)_
