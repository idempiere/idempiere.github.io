---
sidebar_position: 5
title: "After Migrate Helper"
sidebar_label: "After Migrate Helper"
description: "**Developer:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Functional

**Developer:** Carlos Ruiz

**Sponsor:** [FH](https://www.fh.com.br/)

## Description
This process helps to find potential problems after migration scripts are applied.

## Verify Migration Process
After applying migration scripts (or applying 2Packs) you can run this process to generate verification records:

![01 VerifyMigrationProcess](pathname:///img/new-features/v10/01_VerifyMigrationProcess.png)

The Date To parameter serves to filter change audit records, in case you want to detect changes until some date.

This can be useful for example when applying 2Packs and help to verify if the 2Packs changed customizations unexpectedly, you would set the date to before the date the 2Packs were applied.

## Verify Migration Window
The Verify Migration Process generates records of potential problems that can be managed in the Verify Migration window.

If you want to discard completely a process, because there is no useful information, or because you plan to run it again, you can use the "Discard this Verify Migration" button.  This button inactivates the record (is not shown anymore in this window) and deletes all the associated records (if any).

![02 VerifyMigrationWindow](pathname:///img/new-features/v10/02_VerifyMigrationWindow.png)

The potential problems are found in the detail tab "Verify Migration", there are two types of errors being discovered:

### Expected Value differs from Current Value
It is possible that applying migration scripts destroys a customization on official dictionary entries.

The process detects this case comparing the expected customization with the actual value in the database.

For this it checks the change log records made to official entries (by definition these are records with `AD_Table_ID<1000000` and `Record_ID<1000000`)

If the expected value differs from the actual database value, then is reported in this tab like this:

![03 VerifyMigrationExpectedValueDiffers](pathname:///img/new-features/v10/03_VerifyMigrationExpectedValueDiffers.png)

From here you can navigate and reapply manually the change if necessary.

If the change is not necessary anymore, then you can mark the record to be ignored (enabling the Ignore flag), and add a Note why you consider this record can be ignored.

When a record is ignored it will not be reported again in subsequents executions of the Verify Migration process.

### Column View does not exists in Database
It is possible that applying migration scripts removes a custom column added to an official view.

The process detects this case checking that custom columns (by definition view columns where Entity Type is not Dictionary) exists in the database.

If the column does not exist, then is reported in this tab like this:

![04 VerifyMigrationColumnViewDoesNotExist](pathname:///img/new-features/v10/04_VerifyMigrationColumnViewDoesNotExist.png)

From here you can navigate and recreate the view if necessary, or inactivate/delete the custom column view if is not necessary anymore.

You can also mark the record to be ignored (enabling the Ignore flag), and add a Note why you consider this record can be ignored.

When a record is ignored it will not be reported again in subsequents executions of the Verify Migration process.

## Technical Info
[IDEMPIERE-5229](https://idempiere.atlassian.net/browse/IDEMPIERE-5229)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_After_Migrate_Helper)_
