---
sidebar_position: 3
sidebar_label: "Configuration For Dont Get Page Count InfoPanel"
description: "**Goal:** User Experience"
tags: [user-experience]
---
# Configuration For Dont Get Page Count InfoPanel

**Goal:** User Experience

**Contributor:** MULTIMAGE

**Developer:** Le Quy Hiep

**Reference:** [IDEMPIERE-2488](https://idempiere.atlassian.net/browse/IDEMPIERE-2488)

**Description:** For info window, when query data, it also do a query for get total page.

some query with a lot join let slow when init. Now, you can configuration it per info window, by new checkbox "Load Page Num" at info window

query for counter only performance when user reach to page end or out of page range.
