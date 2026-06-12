---
title: "Attachment List"
sidebar_label: "Attachment List"
sidebar_position: 5
description: "The list of attachment files has been usually stored in a ZIP file in the database (the default), or as an XML file for FileSystem and DB_LOB (Database with Large Object Support)."
tags:
  - functional
---

# Attachment List

## **Feature:** Attachment List
**Goal:** Functional / Performance

**Developer:** Carlos Ruiz

**Description:**

The list of attachment files has been usually stored in a ZIP file in the database (the default), or as an XML file for FileSystem and DB_LOB (Database with Large Object Support).

Saving the list of files as XML causes three problems:

1 - The XML file is hard to read and extract the list of files, possible, but difficult

2 - Every time a user adds/update/delete a file to the Attachment, the XML file needs to be written again, and because the way how postgresql implement MVCC (Copy-On-Write), it creates a copy per each change on a record.  When the volume of transactions over attachment is big this can become a big problem

3 - There is no way to have audit (Change Log) for single files, there is no way to determine which and when users create/update/delete an attachment file

In order to solve that a new table (Attachment File) AD_AttachmentFile has been implemented and is shown in the Attachment window:

![Attachment File Tab in Attachment Window](/img/docs/new-features/v13/01_AttachmentFile.png)

As shown in the image additional to the previous information that iDempiere had in the XML file, now is also saving:
- File Name
- File Size
- SHA256 Checksum
- MIME Type

This change is backward compatible and transparent to the user.  No configuration is needed.

**Technical Notes:**

- This is implemented for the Storage Providers File System and DB_LOB (Database with Large Object Support) in Core.

- For external plugins using S3 or another providers, the plugins would need to implement the new file approach if needed/wanted.

- The default ZIP method in Database doesn't use the AttachmentFile approach, but the list is always queried in the ZIP file, because adding/updating/removing an attachment file always update the ZIP file, then the gain on performance is null.  This means also, if the attachment table is heavily used it is better to manage a different Storage Provider instead of the default ZIP method.

- A new SysConfig key [ATTACHMENT_SAVE_LIST_IN_AD_ATTACHMENTFILE](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#ATTACHMENT_SAVE_LIST_IN_AD_ATTACHMENTFILE) has been added to preserve backward compatibility in case is needed to keep the old XML approach (for example if there is already some report extracting the list from the XML file).  The default of this SysConfig is TRUE, so, by default the new Attachment File is going to be used unless explicitly disabled in this SysConfig.

- The SysConfig [ZK_MAX_UPLOAD_SIZE](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#ZK_MAX_UPLOAD_SIZE) has been changed to Tenant level

:::note

There is no migration of old XML attachments to the new Attachment File approach. The [Migrate Storage Provider](https://wiki.idempiere.org/en/NF7.1_Migrate_Storage_Provider) process can be used for that purpose.

:::

**Technical Info:** [IDEMPIERE-6640](https://idempiere.atlassian.net/browse/IDEMPIERE-6640)

**See also:** [MVCC in Oracle vs. PostgreSQL, and a little no-bloat beauty](https://franckpachot.medium.com/mvcc-in-oracle-vs-postgres-and-a-little-no-bloat-beauty-e3a04d6a8bd2)
