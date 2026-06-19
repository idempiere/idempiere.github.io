---
sidebar_position: 61
title: "Hashed Passwords"
sidebar_label: "Hashed Passwords"
description: "**Sponsor:** [Adaxa](http://www.adaxa.com/)"
tags: [security]
---
**Goal:** Security

**Sponsor:** [Adaxa](http://www.adaxa.com/)

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

**It is highly recommended to implement this feature in any production site.**

The default plain passwords configured in vanilla iDempiere are very unsafe, access to the database will expose all passwords.

The encrypted column feature reliefs a little this security flaw, but encryption is 2-way, meaning it can be decrypted, in vanilla iDempiere encryption is made using a known algorithm and a known key, so is not really safe by default.

This new feature implements one-way SHA-512 hashed and salted passwords which is a safer way to save passwords.  If the column AD_User.Password is encrypted you'll have hashed+salted+encrypted passwords.

**More information at:** [Hashing Java](https://www.owasp.org/index.php/Hashing_Java)

**How to:**

Backward compatibility is achieved using a [System Configurator](https://wiki.idempiere.org/en/System_Configurator) key *USER_PASSWORD_HASH* - but be careful, this key must not be changed directly (you'll end with a system where the users cannot log in).

To enable this key you must run the process *Convert passwords to hashes*

![NF001 SEC HashPassword](pathname:///img/new-features/v1.0/NF001_SEC_HashPassword.png)

That's all, at the end of this process your old passwords will be hashed, the system configurator key enabled and new passwords will be hashed by default.  Again, changing the sysconfig key will let you end with a system where users cannot log in.

NOTE: There is no way to go back and "un-hash" passwords, precisely because the algorithm is one-way.

**Technical Info:** [IDEMPIERE-347](http://idempiere.atlassian.net/browse/IDEMPIERE-347)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_HashedPasswords)_
