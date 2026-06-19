---
sidebar_position: 27
title: "Support for pure UUID key tables"
sidebar_label: "Support for pure UUID key tables"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Sponsor:** [FH](https://www.fh.com.br/)

## Description
Historically iDempiere has always required a primary key _ID (integer java type, numeric(10) database type) on tables to support many features.

Apart from the features not supported for non-ID tables, the integer _ID key has some inconvenients, like:
- maximum value not big enough for very high volume environments (max ID is 2.147.483.647)
- the need of a sequence to generate next numbers (AD_Sequence or native sequences)
- difficulty to manage multiple sequences (f.e. different numbering per tenant)
- difficulty to manage replication
- for official dictionary we need a centralized provider that defines the IDs for every developer

[UUID (Universally unique identifier)](https://en.wikipedia.org/wiki/Universally_unique_identifier) is the standard to solve this problem, and iDempiere has implemented UUIDs as alternative keys since version 1.0 but has never fully exploited it.

So, the goal of this feature is to enable using the alternate UUID key as a completely functional key for iDempiere tables.

In order to implement this the following changes has been done:

## New data types related to UUID
There are new datatypes to define UUID based relationships:
- UUID: the alternate UUID key
- Table (UU): defines a foreign key to an UUID key, equivalent to the Table data type
- TableDir (UU): defines a foreign key to an UUID key, equivalent to the TableDir data type
- Search (UU): defines a foreign key to an UUID key, equivalent to the Search data type
- Record UUID: associated to Record_UU columns, open the [Record ID editor](https://wiki.idempiere.org/en/NF10_Record_ID_Editor) and saves the UUID of the selected record

Note that every iDempiere table has the UUID alternate key, although we implemented recently a way to disable it when required, so it will be very rare to find an iDempiere table without UUID.

The UUIDs has been historically implemented to manage transporting data with 2Pack, and to enable using features even when the ID changes (which is typical when installing the same feature in different environments)

The new datatypes are managed as String in java and VARCHAR(36) in database.

The format of an UUID string is composed by 32 hexadecimal numbers in five groups separated by hyphens, in the form 8-4-4-4-12 for a total of 36 characters, like 123e4567-e89b-12d3-a456-426614174000

Also important to note:
- Chosen Multiple Selection Table: this is not a new data type, but it works fine with the new Table/TableDir UU types

## New Windows/Tables created
For testing purposes two new windows were created:
- Test UU Based Table: with master-detail relationship based on UUID keys
    - This is a maintenance window for the table "TestUU", which is a pure UUID table without _ID key or multi-parent key.
- Test UU Detail: to manage/test as master the detail table

## Changes to "Create/Complete Table" process
The process [CreateComplete Table](https://wiki.idempiere.org/en/NF8.2_Create/Complete_Table) accepts now to create a table without a KeyColumn.

Note that implicitly it ALWAYS create the UUID column, and this column has the new UUID data type, it also creates automatically the corresponding entry for the UUID index and constraint.

## Changes to "Create Window, Tab & Field from Table" process
The process [Create Window, Tab & Field from Table](https://wiki.idempiere.org/en/NF8.2_Create_Window_From_Table) requires now to define the parent link column when adding a new tab to an existing window with tab level greater than zero.

Previously this was not required as the program automatically discovered a parent link, but because multi-parent links are not a requisite for tables, then is necessary to define explicitly which is the link column to parent tab when creating a new tab.

It is possible also to create translation tables for UUID based tables.

## Changes to "Migrate ID" process
The process [Migrate ID](https://wiki.idempiere.org/en/NF6.2_Migrate_ID) now can discover and update children UUID keys.

There are no changes visible to the user, everything is done automatically.

## Enabled Features for tables with UUID key and without ID key
**IMPORTANT NOTE about storage**: In order to enable all these feature we needed to add a Record_UU column in different tables.  This column have a size of 36 bytes VARCHAR(36) and can represent an increase in storage size and backup size in implementations that have many records on these tables, for example many attachments, or heavy usage of chat, post-it or labels.

### Change Audit
Now tables without ID key can support change audit.  For this purpose the new column AD_ChangeLog.Record_UU was added.

Because of the usual big size of the AD_ChangeLog table, the new Record_UU column is not filled by default for ID based tables.

In order to enable filling Record_UU for other cases there is a new System Configurator key named AD_CHANGELOG_SAVE_UUID, which can have the following values:

- **B**: Fill the Record_UU just for UUID based tables, or tables with multi-ID key having an UUID column
- **A**: Always - fill the Record_UU and the Record_ID whenever is possible
- **U**: Fill just the Record_UU column, no need to fill the ID

Note that filling always Record_UU is not enabled by default, however it has big advantage over filling just the Record_ID.  Specifically on records imported using Pack In, if a record is imported, it has some sequence ID, but it will always have the same UUID, so if a "pack in imported record" is deleted and then imported again, the change log from previous imports will still be useful.

Now, filling Record_UU will increase the size of AD_ChangeLog table, which is always big, that's the reason why we decided not to fill it by default, the impact on storage must be measured in every implementation.

### Recent Items
The recent items include now tables without ID if they have a UUID key

### Attachment
Attachments are enabled now for tables without ID if they have a UUID key

### Chat
Chat is enabled also for tables without ID, just UUID

### Post-it
Samely, post-it is enabled for tables without ID

### Labels/Tag
The labels feature is also enabled for tables without ID, just UUID

### Requests
It is possible to create requests for tables without ID, just UUID

### Process Audit
It is possible to run processes associated with records on tables without ID, just UUID, in single and multi modes.

### Objects Installed in Package Installation Log
The package installation log can manage now UUID based tables too

## Changes to X_ and M model classes
### New UUID based constructors on X_ generated model classes
The X_ generated model classes implement now two new constructors based on the UUID column, additionally to the already existing two constructors based on the _ID column.

The new constructors look like this:
‎

```java

public X_TestUU (Properties ctx, String TestUU_UU, String trxName)

```

```java

public X_TestUU (Properties ctx, String TestUU_UU, String trxName, String ... virtualColumns)
‎
```

Additionally, when the table doesn't have _ID keys or multi-parent keys, then the two _ID based constructors are not generated.

Another change on the model generated classes is the generation of a getValueNamePair method instead of the getKeyNamePair method when the table is UUID based.

The usage of these two constructors are similar to the _ID constructor, this is:

### New UUID based constructors on M model classes
All official model classes in core were changed to add the new constructor.

If you want to use the new UUID constructor in your extensions, you also need to add this new constructor to your X_ and M model classes.

For example in MTest class the new constructor was added like this:
```java

public MTest(Properties ctx, String Test_UU, String trxName)
{
	super (ctx, Test_UU, trxName);
}

```

### Problem with MPaymentBatch(Properties, String, String) constructor
Please refer to the [Migration Notes](https://wiki.idempiere.org/en/Migration_Notes#Constructor_MPaymentBatch.28Properties.2C_String.2C_String.29_changed) for the explanation of an issue found with the MPaymentBatch class.

### Creating a new record
To create a new record with the _ID constructor, developers used to write:
```java

MTest test = new MTest(ctx, 0, trxName);

```

With the new UUID based constructor, the zero is replaced with the empty string, like:
```java

MTest test = new MTest(ctx, "", trxName);
‎
```

### Reading an existing record
To read a record with the _ID constructor, developers used to write:
```java

MTest test = new MTest(ctx, 103, trxName);
‎
```

With the new UUID based constructor, the ID is replaced with the UUID string, like:
```java

MTest test = new MTest(ctx, "d08e9de9-39e5-485c-ad50-e8bc7ee0f575", trxName);

```

## New URL shortcut Record_UU
It has been possible to [Zoom for URL](https://wiki.idempiere.org/en/NF2.1_Zoom_From_URL) using URL parameters AD_Table_ID or TableName and Record_ID.

Additionally is possible now to zoom using the new parameter Record_UU, for example:

https://test.idempiere.org/webui/index.zul?Action=Zoom&AD_Table_ID=200383&Record_UU=4e148b89-bdd9-48a6-8a8a-7609092f965c

Note the Permalink is generated using the [Record Info](https://wiki.idempiere.org/en/NF9_Record_Info_Copy_To_Clipboard_Buttons) dialog.

## SELECT query from button on Record Info dialog
Also using the [Record Info](https://wiki.idempiere.org/en/NF9_Record_Info_Copy_To_Clipboard_Buttons) dialog is possible to copy to clipboard a query to get the record in a SQL editor, this query can be based now on the UUID column when the table doesn't have an _ID key.

**Technical Info:** [IDEMPIERE-5567](https://idempiere.atlassian.net/browse/IDEMPIERE-5567)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_UUID_Key_Tables)_
