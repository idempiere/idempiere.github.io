---
sidebar_position: 56
title: "Storage Providers"
sidebar_label: "Storage Providers"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [technical]
---
**Goal:** Technical

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

This feature opens the posssibility to have more ways to save the attachments and archives in the system.

New Window "Storage Provider"

Actually there are two methods in the storage provider : Database, File System.

For File System need to configure the folder to save the files.

For other methods for example cloud services need new developments > implement the OSGi service IArchiveStore, for example we can have extensions to implement dropbox, google drive, etc. as storage providers"

![storage1](pathname:///img/new-features/v1.0/storage1.png)

![storage3](pathname:///img/new-features/v1.0/storage3.png)

In the Window "Client" Tab "Client Info" add two new field : Attachment Store and Archive Store, that way can choose different way to save attachment and archives for the same client

![storage2](pathname:///img/new-features/v1.0/storage2.png)

**Technical Info:** [IDEMPIERE-390](http://idempiere.atlassian.net/browse/IDEMPIERE-390)

If you are migrating an existing database, you should consider migrating the existing attachments/archives. The process [Migrate Storage Provider](https://wiki.idempiere.org/en/NF7.1_Migrate_Storage_Provider) is intended to do that.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Storage_Providers)_
