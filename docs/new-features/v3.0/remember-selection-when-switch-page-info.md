---
sidebar_position: 10
title: "Remember Selection When Switch Page Info"
sidebar_label: "Remember Selection When Switch Page Info"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Contributor:** MULTIMAGE (cloudempiere)

**Developer:** Le Quy Hiep

**Reference:** [IDEMPIERE-2230](https://idempiere.atlassian.net/browse/IDEMPIERE-2230)

**Starting Point:** The info window in version 2.1 support multiple-records selection, however doesn't select records on more then 1 page.

**Solution:**  Improve record selection functionality allow select records over multiple info window pages (paginations e.g 100 records = 4 pages) remember them when user paginate records. This functionality must have when Info window has attached a process, which allow generates records.

**Example**

In version v10 we migrate form to info window ->  Generate Shipment (Invoice).

1. Let say the user delivered 40 shipments, Depends on sales order invoice rule the orders are appearing in info window over 2 paginated pages. Invoice clerk start generate invoices not for all but selected orders/records eg. 1,3,10,15,20 from second page 30,32,33,34,35.

2. the invoice clerk want select all 40 orders(shipped)  - so click on select all, then navigate to the next page, click on select all again.

Then run process which generates invoices.

**Tip**: If the page size does not meet your needs, the administrator can allow you to change as SuperUser in the definition field of the Info window: Page size, for example. change page size from 25 to 50

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF3.0_Remember_Selection_When_Switch_Page_Info)_
