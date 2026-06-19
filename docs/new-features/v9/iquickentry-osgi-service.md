---
sidebar_position: 43
title: "IQuickEntry OSGI Service"
sidebar_label: "IQuickEntry OSGI Service"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Andreas Sumerauer

**Feature** **Ticket:** [IDEMPIERE-4794](https://idempiere.atlassian.net/browse/IDEMPIERE-4794)


### Description
I have prepared an OSGI Service that allows to use a customized WQuickEdit dialog in the web client.
Our immediate requirement was to block the dialog from trying to create a new table record that would violate an existing unique constraint. Instead it was meant to load the existing record from the database.
That was very easy to implement once I had the service in place.
Apart from that I can think of numerous other useful ways to customize the WQuickEntry dialog that are made possible by the proposed feature enhancement.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_IQuickEntry_OSGI_Service)_
