---
sidebar_position: 45
title: "Media View Interface for Report and Attachment Viewer"
sidebar_label: "Media View Interface for Report and Attachment Viewer"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4801](https://idempiere.atlassian.net/browse/IDEMPIERE-4801)

**Description:**
Add media view interface for Report and Attachment Viewer. This allows plugin to provide custom viewer by content type and file extension. As part of the ticket, an implementation for excel file base on keikai.io have been added to core.

## Development
1. Create an OSGi component for the org.idempiere.ui.zk.media.IMediaViewProvider interface.
1. Create concrete implementation of org.idempiere.ui.zk.media.IMediaView interface.
1. Use service.ranking > 0 to override core viewer implementation (For e.g, to provide excel viewer using LibreOffice Online).
1. See org.idempiere.keikai project for reference.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Media_View_Interface)_
