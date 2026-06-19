---
sidebar_position: 16
title: "More Formats for Import CSV"
sidebar_label: "More Formats for Import CSV"
description: "**Developer:** Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Carlos Ruiz

**Description:**

The import CSV template allows now to define more options:
- **Separator Character:** allows to define the field separator on the CSV file, the default is the commonly used comma (,) but it can also support any other character like semicolon or tab
- **Quote Char:** allows to define the character that surrounds strings, commonly used is the double quote (") but it can also support any other character like single quote
- **Import Template Type:** The default is still CSV files, and now is possible also to import directly from Excel files with format XLS or XLSX.  Note that the Excel file is preprocessed to create a CSV file with the format defined, and then importing the CSV

![01 Template](pathname:///img/new-features/v11/01_Template.png)

**Technical Info:** [IDEMPIERE-6040](https://idempiere.atlassian.net/browse/IDEMPIERE-6040)

## See Also
- [NF1.0_ImportCSV](https://wiki.idempiere.org/en/NF1.0_ImportCSV)
- [NF2.1 Import Template](https://wiki.idempiere.org/en/NF2.1_Import_Template)
- [NF2.1 Import CSV_Process](https://wiki.idempiere.org/en/NF2.1_Import_CSV_Process)
- [NF3.0 CSV Importer Single Transaction](https://wiki.idempiere.org/en/NF3.0_CSV_Importer_Single_Transaction)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_More_Formats_for_Import_CSV)_
