---
sidebar_position: 19
title: "Get image through url from attachment"
sidebar_label: "Get image through url from attachment"
description: "**Developer:**  Hengsin,"
tags: [technical]
---
**Goal:** Technical

**Developer:**  Hengsin,

**Feature Ticket:** [IDEMPIERE-6256](https://idempiere.atlassian.net/browse/IDEMPIERE-6256)

**Sponsor:** [Norbert Bede at Cloudempiere.com](http://cloudempiere.com)

**Feature**This feature allow define in print format items image source from attachment with the next pattern. This feature inherited from jasper report lookup.

Example AD_PrintFormatItem.ImageURL:**attachment:test/emoji*.png,103**
<p/>
- The image path expression always start with **attachment:** prefix and after that, it is a 2 part expression separated by comma.
- Part 2 is a record id or record uuid literal (record id 103 in the example above).

- Part 1 is a 2 part expression separated by **/**.
- Part 1.1 is the table name (test in the example above).
- Part 1.2 is the attachment item index (0 base) or file name (support matching by wildcard, emoji*.png in the example above).

**When to use**
&lt;p&gt;
if  company  want to store their image asset as attachment eg. for product or categories, (storage provider)  then they want to print on documents.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Get_image_through_url_from_attachment)_
