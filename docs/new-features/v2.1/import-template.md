---
sidebar_position: 18
title: "Import Template"
sidebar_label: "Import Template"
description: "**Developer:** Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Carlos Ruiz

**Description:**

Now you can enable CSV import in any window/tab in a controlled way for end-users.

This is, the user cannot import an arbitrary CSV file, but just a CSV file with the header you allow them to import.

For this feature to be enabled you need to define an import template as explained in the next screenshot:

***Template***
- ***Name:*** Define the name of the template, this is what the user will see in the list of templates to choose
- ***Window/Tab:*** Define the window+tab where this template can be used
- ***Character Set:*** Define the character set allowed for this template
- ***CSV Header:*** Define the allowed header for the template
- ***CSV Alias Header:*** The user can also use this alias header on the template for convenience (i.e. translated names, avoid the user looking for strange markers like /K)

***Template Access***
- Then, you can assign the template to be used by certain roles, and restrict also the import modes that can be used (Import/Merge/Update)

![01 ImportTemplate](pathname:///img/new-features/v2.1/01_ImportTemplate.png)

***Running***

- When the user open the tab where the role allows import templates, then the CSV import button is enabled and pushing the button will open a window where the user can choose the template, the mode and upload the file to be imported, the rest of the process works the same way as the usual importer documented at [NF1.0_ImportCSV](/docs/new-features/v1.0/importcsv)

![02 ImportTemplate](pathname:///img/new-features/v2.1/02_ImportTemplate.png)

**Technical Info:** [IDEMPIERE-2113](http://idempiere.atlassian.net/browse/IDEMPIERE-2113)

## See Also
- [NF1.0_ImportCSV](/docs/new-features/v1.0/importcsv)
- [NF2.1 Import CSV_Process](/docs/new-features/v2.1/import-csv-process)
- [NF3.0 CSV Importer Single Transaction](/docs/new-features/v3.0/csv-importer-single-transaction)
- [NF11 More Formats for Import_CSV](/docs/new-features/v11/more-formats-for-import-csv)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Import_Template)_
