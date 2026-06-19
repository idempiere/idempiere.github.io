---
sidebar_position: 6
title: "Show Permalink URL in Record Info Dialog"
sidebar_label: "Show Permalink URL in Record Info Dialog"
description: "**Developer:** Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Carlos Ruiz

**Description:**

This is related to feature [Zoom From URL](https://wiki.idempiere.org/en/NF2.1_Zoom_From_URL)

On the Record Info dialog the user can now right click on a Permalink URL and copy the corresponding link to the actual record.

This is useful to pass direct URL information to access a record to other users in chat, documents or email.

![01 Permalink](pathname:///img/new-features/v5.1/01_Permalink.png)

You can set the SysConfig variable [APPLICATION_URL](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#APPLICATION_URL) to define your server URL in case the server is behind a proxy, for example:
- APPLICATION_URL = https://test.idempiere.org/webui/

**Technical Info:** [IDEMPIERE-2970](http://idempiere.atlassian.net/browse/IDEMPIERE-2970), [IDEMPIERE-2361](http://idempiere.atlassian.net/browse/IDEMPIERE-2361)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF5.1_RecordPermalink)_
