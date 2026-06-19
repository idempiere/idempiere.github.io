---
sidebar_position: 30
title: "Protect Passwords on Properties"
sidebar_label: "Protect Passwords on Properties"
description: "**Developer:** Carlos Ruiz"
tags: [security]
---
**Goal:** Security

**Developer:** Carlos Ruiz

**Sponsor:**  [FH](https://www.fh.com.br/)

**Description:**

Historically *mpiere has saved some sensitive information in the files idempiereEnv.properties, idempiere.properties, myEnvironment.sh and myEnvironment.sav unencrypted and sometimes unprotected from other users eyes, the workaround has been usually to protect these files manually.

In version 8.2-20210106 the mechanism to store the sensitive information changed.

## File Permissions
The installers now take care of restricting the access to the files containing sensitive information, just the user that install iDempiere have read access to these files.

NOTE the restriction is just applied on unix-based systems, in windows the person installing must take care manually to protect these files.

## Obfuscated keystore password
The password for the certificate is saved in the variable ADEMPIERE_KEYSTOREPASS and is now obfuscated, note that obfuscation algorithm just protects the password from casual viewing, but for a tech savvy person is relatively easy to find how to deobfuscate it.

## Mail and database passwords separated and obfuscated
The database passwords contained in variables ADEMPIERE_DB_PASSWORD and ADEMPIERE_DB_SYSTEM, as well as the mail password contained in ADEMPIERE_MAIL_PASSWORD are now obfuscated and written in a separate file with name .idpass in the IDEMPIERE_HOME folder (next to idempiereEnv.properties).

Now the idempiereEnv.properties and the myEnvironment.sh files DO NOT contain these variables, they were moved to .idpass in an obfuscated way.

**IMPORTANT NOTE:** if you have scripts that use idempiereEnv.properties or myEnvironment.sh to obtain these passwords then you must modify those scripts to cope with the new way.

NOTE: This implementation is just for unix-based systems, for windows the system continues working as before.

Also note the obfuscation algorithm just protects the password from casual viewing, but for a tech savvy person is relatively easy to find how to deobfuscate it.

## Ability to extend for better encryption or externalization
It is possible to extend and use custom secret managers to improve the default obfuscation, or to encrypt the passwords, or even to use an external secret manager (f.e. amazon AWS secret manager or Ansible Vault).

When using external secret manager the passwords are not stored in the system, enabling to effectively protect the secrets against a leak of the hard disk image.

To extend this feature is as simple as implementing the scripts customSetVar.sh and customGetVar.sh in the IDEMPIERE_HOME/utils folder (a sample is provided there for AWS secretsmanager).  The setup programs will detect that custom scripts are there and use them instead of the default, please note is important to protect those scripts from external users eyes.

## Disabling this feature
In case you want to disable this feature, for example when running in a development or safe test environment, you can do that passing the following parameter to the JVM in the console applications and also in the idempiere server application:
```
-DIDEMPIERE_SECURE_PROPERTIES=false
```

**Technical Info:** [IDEMPIERE-4602](https://idempiere.atlassian.net/browse/IDEMPIERE-4602), [IDEMPIERE-4618](https://idempiere.atlassian.net/browse/IDEMPIERE-4618)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Protect_Passwords_On_Properties)_
