---
sidebar_position: 5
title: "CSV Importer Single Transaction"
sidebar_label: "CSV Importer Single Transaction"
description: "**Contributor:** Diego Ruiz - Thomas Bayen - BXService GmbH, Krefeld"
tags: [user-experience]
---
**Goal:** Usability

**Contributor:** Diego Ruiz - Thomas Bayen - BXService GmbH, Krefeld

**Developer:** Diego Ruiz

**Description:**

This new feature extends the functionality of the [CSV Importer](https://wiki.idempiere.org/en/NF1.0_ImportCSV)

Now you can configure a csv file to manage a single transaction for the whole file instead of a transaction for every line (standard way)

**How to set it up:**

Create your file in the normal way but if you want to have a single transaction for the whole process in your **Key Column** mark the column's name with /KT at the end, please notice that "/KT" must be written in capital letter.

**Result**

If you set the file to have a single transaction, the process will run until an error is found. When an error occurs the process will stop in that row and rollback all the previous rows.

**Technical Info:** [IDEMPIERE-2878](https://idempiere.atlassian.net/browse/IDEMPIERE-2878)

## See Also
- [NF1.0_ImportCSV](https://wiki.idempiere.org/en/NF1.0_ImportCSV)
- [NF2.1 Import Template](https://wiki.idempiere.org/en/NF2.1_Import_Template)
- [NF2.1 Import CSV_Process](https://wiki.idempiere.org/en/NF2.1_Import_CSV_Process)
- [NF11 More Formats for Import_CSV](https://wiki.idempiere.org/en/NF11_More_Formats_for_Import_CSV)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF3.0_CSV_Importer_Single_Transaction)_
