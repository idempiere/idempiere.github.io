---
sidebar_position: 1
title: "Add Access Tab Document Status Activity"
sidebar_label: "Add Access Tab Document Status Activity"
description: "**Developer:** Deepak Pansheriya"
tags: [functional]
---
**Goal:** Functional

**Developer:** Deepak Pansheriya

**Feature** **Ticket:** [IDEMPIERE-4836](https://idempiere.atlassian.net/browse/IDEMPIERE-4836)


### Description
Currently Document status can be assigned single role or user but there is no way to configure multiple role or user assignment to document status.

Goal is to make document status to work as it is but for deciding access, instead of using Role and User on Document status, use Access tab (PA_DocumentStatusAccess)  and consider role or user access configured there.

Should have migrated existing configuration of Role or user on PA_DocumentStatus and create records in PA_DocumentStatusAccess table. Then Role and User from PA_DocumentStatus should be dropped. New logic will not use Role and User on PA_DocumentStatus.

If no record in Access table then consider access is available to all Role considering current Window and form access to work as it is.

xtab mattermost design discussion → https://mattermost.idempiere.org/idempiere/pl/ipw7ha1hh38j7c5xaf6e5i349a

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Add_Access_Tab_Document_Status_Activity)_
