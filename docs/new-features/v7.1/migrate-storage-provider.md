---
sidebar_position: 3
title: "Migrate Storage Provider"
sidebar_label: "Migrate Storage Provider"
description: "**Developers:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Technical

**Developers:** Carlos Ruiz

**Sponsors:**  [FH](https://www.fh.com.br/)

## Description
This functionality migrates files between storage providers

## Usage
- Log in as System
- Open the process **[Migrate Storage Provider](https://wiki.idempiere.org/en/Migrate_Storage_Provider_(Process_ID-200117))**
- Fill the parameters properly as explained below in detail

![01 MigrateStorageProvider](pathname:///img/new-features/v7.1/01_MigrateStorageProvider.png)

## Parameters
**Client:** Optional, you can select a client to migrate, if empty it will try to migrate storage providers from all clients with the Actual Storage Provider selected below.

Migrate Attachment:
Migrate Archive:
Migrate Image:
Delete old/existing files:

**Actual Storage Provider:** If the client is empty, you define here the storage provider to migrate, if empty it migrates clients with the storage provider not set (this is by default DB).

**Storage Provider:** The new storage provider to migrate the files.

**Migrate Attachment:** Check this flag if you want to migrate the attachment files to the new storage provider.

**Migrate Archive:** Check this flag if you want to migrate the archive files to the new storage provider.

**Migrate Image:** Check this flag if you want to migrate the image files to the new storage provider.

**Delete old/existing files:** If this flag is checked, after the attachments are migrated the program tries to delete (free space) the files from the previous storage provider.

## Process
The process provides status updates when running in foreground, however as the process can take long time, it can be executed in background.  Please note that during the migration the whole table being migrated (attachment, archive, image) is locked, so operations on these tables are not permitted.  Because of this, it is recommended to run this process in a maintenance window without users logged in the system.

There are intermediate commits in the process every time a table is migrated successfully for a client.&nbsp; So,&nbsp;in case of failure&nbsp;the attachments / archives / images that succeeded as a whole from a client are still migrated, but not partial records (which would result in data corruption if allowed).

## **WARNING!**
- This process can be destructive, so please be sure that you have a backup of the database, as well as a backup of your old storage provider.
- Note that migrating from/to a DB storage provider is a destructive action that cannot be recovered, it implies deleting the old/existing files.

**Technical Info:** [IDEMPIERE-4191](https://idempiere.atlassian.net/browse/IDEMPIERE-4191)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Migrate_Storage_Provider)_
