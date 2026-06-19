---
sidebar_position: 2
title: "Cloud Upload Interface for Report Viewer and Scheduler"
sidebar_label: "Cloud Upload Interface for Report Viewer and Scheduler"
description: "**Goal:** Development"
tags: [functional]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4771](https://idempiere.atlassian.net/browse/IDEMPIERE-4771)

**Description:**
Add cloud upload interface for report viewer and scheduler. This is builds on top of the [Configure_OAuth2_EMail](https://wiki.idempiere.org/en/Configure_OAuth2_EMail) models.

## Development
1. Create an OSGi component for the org.adempiere.base.upload.IUploadService interface.
1. Your implementation would have to provide org.adempiere.base.upload.IUploadHandler handler for the supported content type.
1. Your OSGi component must provide a value for the "provider" property. This value must match the name of an "Authorization Provider" record.

## Configuration
## Install an implementation of the upload interface
For e.g, the Google Drive implementation at &lt;https://github.com/hengsin/idempiere-gdrive&gt;(https://github.com/hengsin/idempiere-gdrive)

## Add Authorization to Drive/Document Account
Use "Add Authorization Account" process to add authorized access to your Document account:

![AddAuthorizationAccount.png](pathname:///img/new-features/v9/AddAuthorizationAccount.png.png)

After successful authorization, you should have a record added to the Authorization Account:

![AuthorizationCredentialAndAuthorizationAccount](pathname:///img/new-features/v9/AuthorizationCredentialAndAuthorizationAccount.png)

## Usage
Cloud upload at Report Viewer:

![CloudUploadToolbarButton](pathname:///img/new-features/v9/CloudUploadToolbarButton.png)

Upload Dialog for Google Drive plugin above:

![UploadToGoogleDrive](pathname:///img/new-features/v9/UploadToGoogleDrive.png)

Cloud Upload field at Scheduler Recipient (Upload, Authorization Account and File Name):

![SchedulerRecipient](pathname:///img/new-features/v9/SchedulerRecipient.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Cloud_Upload_Interface)_
