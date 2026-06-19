---
sidebar_position: 30
title: "Improve Password Hashing"
sidebar_label: "Improve Password Hashing"
description: "**Developer:** Carlos Ruiz Heng Sin"
tags: [security]
---
**Goal:** Security

**Developer:** Carlos Ruiz Heng Sin

**Description:**

Currently password hashing is using SHA-512 and salt is generated using SHA1PRNG random generator and 64 bytes.

This ticket make the following changes to improve the security of password hashing in iDempiere:
- Generate salt using the DRBG algorithm and 256 bit strength.
- Add support for PBKDF2 and Argon2 hashing algorithm.

**Changes:**

1. Added USER_PASSWORD_HASH_ALGORITHM System Configurator entry. Supported values are SHA-512, PBKDF2 and Argon2.
![User password hash algorithm](pathname:///img/new-features/v12/User_password_hash_algorithm.png)

_USER_PASSWORD_HASH_ALGORITHM_

2. Added **Password Hash Algorithm** parameter to the **Convert passwords to hashes** process.
![Convert passwords to hash](pathname:///img/new-features/v12/Convert_passwords_to_hash.png)

_Convert password to hashes process_

**Migration of existing SHA-512 hashes**:
&lt;p&gt;
- Change USER_PASSWORD_HASH_ALGORITHM System Configurator entry to PBKDF2 or Argon2, reset cache.
- User's password will be rehashed using the newly set algorithm when they login next time.

**Technical Info:** [IDEMPIERE-6712](https://idempiere.atlassian.net/browse/IDEMPIERE-6712)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Improve_Password_Hashing)_
