---
sidebar_position: 3
title: "Migrate an ID or UUID"
sidebar_label: "Migrate an ID or UUID"
description: "**Developers:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Technical

**Developers:** Carlos Ruiz

**Sponsors:**  [FH](https://www.fh.com.br/)

## Description
This functionality allows to change the ID or UUID of a record.

There are some cases where an implementation requires to change these keys, for example:
- changing ID
    - when a dictionary object was created in an implementation but then it's created officially, in this case is good idea to keep the ID in sync with the official ID
- when migrating a record with 2Pack to a different database, but because of hardcoded references in programs you need to preserve the IDs (NOTE this is not a recommended practice, your hardcodes must better point to the UUID which is preserved by 2Pack between installations)
- changing UUID
    - when two developers created the same dictionary object - 2Pack usually collides, one of them needs to change the UUID
    - samely when managing multiple environments (development, qa, stage, production) sometimes you find conflicts in UUID that needs to be solved to upload 2Packs properly

## Usage
- Log in as System
- Open the process **[Migrate ID](https://wiki.idempiere.org/en/Migrate_ID_(Process_ID-200111))**
- Fill the parameters properly as explained below in detail

![01 MigrateID](pathname:///img/new-features/v6.2/01_MigrateID.png)

## Parameters
**Table:** This is the table that requires the ID/UUID change

**Record ID:** The record ID to be changed

**To Record ID:** The target record ID, if empty it will be generated using the table sequence

**Source UUID:** The UUID to be changed

**Target UUID:** The target UUID, if empty it will generate a new random UUID

Change ID or UUID are excluyent, you can change ID or UUID, but not both at the same time

## Process
Changing the UUID is simple, just an update as the UUID is not kept as foreign key.

Changing the ID is more complex as it requires to update the whole database:
- Migrate all children tables related
- Migrate special references for data types Location, Account, Locator, Attribute, Assignment, Image, Color and Chart
- Migrate weak references based on AD_Table_ID+Record_ID
- Migrate weak references in AD_Preference table when the attribute name is the same as the column name
- Special data types where the ID is within a comma separated string (ChosenMultipleSelectionTable, ChosenMultipleSelectionSearch, SingleSelectionGrid, MultipleSelectionGrid) are supported since release 11

**WARNING!**
- The full foreign key discovery is based on dictionary, not in database, so, it can be problematic if your dictionary is not accurate
- Custom data types that represent a foreign key are not migrated - Note if you have a custom data type is better to use it in AD_Field instead of AD_Column to avoid problems with these programs
- Other weak references are not migrated, for example if you use IDs or UUIDs in AD_SysConfig or other tables, they are NOT migrated, you must check for that condition manually

## WARNING!!  SPECIAL NOTE ABOUT AD_Client_ID
Be careful when changing the AD_Client_ID key when using keystore encryption (idempiere.ks and idempiere-ks.properties).

If you have encrypted columns and use the keystore approach (idempiere.ks), the encryption key is based on the AD_Client_ID, so, changing the AD_Client_ID can make your encrypted data useless.

**Technical Info:** [IDEMPIERE-3916](https://idempiere.atlassian.net/browse/IDEMPIERE-3916)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_Migrate_ID)_
