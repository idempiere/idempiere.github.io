---
sidebar_position: 1
title: "Copy or Move Tenant"
sidebar_label: "Copy or Move Tenant"
description: "**Developers:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Technical

**Developers:** Carlos Ruiz

**Sponsors:**  [FH](https://www.fh.com.br/)

This feature was introduced in version 6.2 and it has received improvements and bug fixes in different versions.

## Description
There are two use cases for this process:

- allows to move a whole tenant from an external database to the current, it can be used also to move a tenant from Oracle to PostgreSQL or vice versa
- allows to copy a template tenant in the current database into a new tenant

## Usage
- Log in as System
- Open the process **[Copy Tenant](https://wiki.idempiere.org/en/Copy_Client_(Process_ID-200110))**
- Fill the parameters properly as explained below in detail
- If there are errors, analyze and solve
    - **Tip:** if there are too many errors, you can find all of them in the Process Audit window, Log tab.  This can be exported to CSV or Excel also for easier analysis.

## Parameters
**Copy Template Tenant:** Flag to indicate if the copy is from an external database, or local from a template tenant.

### Parameters for External Copy
**JDBC URL:** JDBC URL of the external database.

**User Name:** user used to connect to the JDBC URL.  Optional, if empty use the same as target.

**Password:** password used to connect to the JDBC URL.  Optional, if empty use the same as target.

**Tables to Exclude:** Comma separated list of tables to exclude.  Temporary tables (name starting with T_) are always excluded.

**Tenants to Include:** Comma separated list of AD_Client_ID to include, if empty then all non-System tenants will be moved.  You must usually exclude tenant 11 (GardenWorld).

**Tenants to Exclude:** Comma separated list of AD_Client_ID to exclude.  Just Include or Exclude can be used, not both at the same time.

**Only Validate:** To do just initial validations and not execute the process.  Like a dry-run.

**Preserve IDs:** Comma separated list of tables that require to preserve IDs.  You must take care that the IDs don't collide.  In case you need to solve ID collisions the process [Migrate ID](https://wiki.idempiere.org/en/NF6.2_Migrate_ID) can help with this task.

**Fallback Records when FK not found:** When moving data from external database is possible to encounter System records in the source database that are not present in the target database, in this case all references to those missing records will error, this parameter helps to solve that problem assigning a fallback System record for the problematic tables/records.  This option is a comma separated list of table=idOrUuid or table.foreignUuid=idOrUuid.  More detailed explanation and examples can be found in the ticket [IDEMPIERE-6441](https://idempiere.atlassian.net/browse/IDEMPIERE-6441?focusedCommentId=53188).  (NOTE: this option was added in [Release-12.2025-04-04](https://wiki.idempiere.org/en/ChangeLog_Release_12#2025-04-04))

### Parameters for Copy Template
**Tenant Name:** This is the name of the new tenant to be created.

**Tenant Key:** The search key for the new tenant to be created, this is used to replace some initial object names (explained below in process).

**Tenants to Include:** This is the ID of the tenant to take as template - just one ID must be filled here (for example 11 for GardenWorld).

**Only Validate:** To do just initial validations and not execute the process.  Like a dry-run.

**Skip some validations:** In order to make the process faster, you can enable this flag if you're sure the data is correct (for example if all validations passed in some previous check).

**Fallback Records when FK not found:** Same as explained above for external copy, as the copy is within the same database the System records are present, so this option is mostly used for external copy.  But it can be helpful to solve cross-tenant issues found in some old databases.

## Copy Tenant from External DB
![01 MoveTenant](pathname:///img/new-features/v6.2/01_MoveTenant.png)

### Validations
Before starting to copy the external data the process performs the following validations:

- **General validations**
    - Verify connection to source database using the URL provided (and username/password also if necessary)
    - Verify there are tenants to move with the include/exclude filter provided
    - Verify the tenant does not exist in current database
    - Verify that attachments and archive are using the internal storage provider (Database) - migrating external storage provider is not implemented.  This validation is just necessary if there are attachment/archive records in the tenant to be moved, and also if the attachment/archive table has not been excluded.

- **Table validations:** Each table in the dictionary of the source database (not excluded in the filter) is checked, these validations are made just for tables that have tenant data
    - Table must be in target database - if the table doesn't exist in target database then the error is informed and the process cannot be executed

- **Column validations:** Each column of a table being moved is validated
    - The column must exist in target database
    - Source and target column must have the same reference - this validation is just performed for official references
    - Source and target column must have the same length in dictionary
    - Before release-11 the columns with types SingleSelectionGrid and MultipleSelectionGrid were not supported.

- **Foreign key validations:** Each column that is a foreign key is validated for
    - If the column has a foreign key in a tenant different than system the error is informed - this can be considered a cross-tenant data corruption error and is considered a stopper for the process
    - If the column has foreign keys in System tenant, then the UUIDs are verified to exist in the target database.  If the system UUID doesn't exist this is informed and the process cannot be executed.  To solve this error consider moving the required System data from source to target database using 2Pack.
    - When there are missing foreign keys the process report a summary of the offending keys at the end of the log, this allows easily to analyze and create fallback records when possible and necessary, and solve this issue using the parameter "Fallback Records when FK not found**"**

After passing all validations it is possible to execute the process, but still there is a possibility that required null columns or other foreign key issues are present in the database, this will be informed in the processing if found.

### Process
When all validations pass then the process can be executed if the flag "Only Validate" is disabled.

The process takes the records from every table to be moved, read it from the source database and insert the record in the target database.

The IDs are changed as necessary in the target database, and **the UUIDs are preserved**.

The conversion map of IDs are saved in the temporary table T_MoveClient.  This table also saves the original identifier on the source database when the record is replaced by a fallback record.

When inserting record the process needs to find the corresponding foreign key conversion for the IDs.  There can be some cases where orphan records are found at this stage (foreign keys not existing), this is informed and the process is stopped.

Also if the table is flagged to Preserve IDs is selected, and the ID already exists in the target database this is informed and the process is stopped.

Note also that tables containing AD_Table_ID+Record_ID or AD_Table_ID+Record_UU will migrate just the records of the included tables (this is, it will not migrate records for excluded tables).

There is a special treatment for the column AD_Preference.Value when AD_Preference.Attribute ends with _ID, in this case the Value is treated as a foreign key and the required conversion is saved as a String.  Also the columns with types "Chosen Multiple Selection Search", "Chosen Multiple Selection Table", "Single Selection Grid" and "Multiple Selection Grid" are converted.  However if your database has other ID fields being written as String in fields with other data types, these values will not be converted.

## Copy Template Tenant within current DB
![Copy Tenant   Process (iDempiere 1.0.0)](pathname:///img/new-features/v6.2/Copy_Tenant_-_Process_(iDempiere_1.0.0).png)

### Validations
Before starting to copy the template tenant the process performs the following validations:

- **General validations**
    - Verify there is just one tenant to move in the include filter provided
    - Verify the tenant does not exist in current database (verified by Name and Key)
    - Verify there is not W_Store record with the context as tenant key in lowercase
    - Verify that attachments and archive are using the internal storage provider (Database) - migrating external storage provider is not implemented.  This validation is just necessary if there are attachment/archive records in the tenant to be moved, and also if the attachment/archive table has not been excluded.

- **Table validations:** Each table in the dictionary of the source database (not excluded in the filter) is checked, these validations are made just for tables that have tenant data

- **Column validations:** Each column of a table being copied is validated
    - Before release-11 the columns with types SingleSelectionGrid and MultipleSelectionGrid were not supported.

- **Foreign key validations:** Each column that is a foreign key is validated for
    - If the column has a foreign key in a tenant different than system the error is informed - this can be considered a cross-tenant data corruption error and is considered a stopper for the process
    - When there are missing foreign keys the process report a summary of the offending keys at the end of the log, this allows easily to analyze and create fallback records when possible and necessary, and solve this issue using the parameter "Fallback Records when FK not found**"**

After passing all validations it is possible to execute the process, but still there is a possibility that required null columns or other foreign key issues are present in the database, this will be informed in the processing if found.

### Process
When all validations pass then the process can be executed if the flag "Only Validate" is disabled.

The process takes the records from every table to be copied, read it from the template tenant and insert the record in the target tenant.

The IDs are changed, and also **the UUIDs are changed**.

The conversion map of IDs or UUIDs are saved in the temporary table T_MoveClient.  This table also saves the original identifier on the source tenant when the record is replaced by a fallback record.

The conversion map of the UUIDs is saved in the table AD_Package_UUID_Map.

When inserting record the process needs to find the corresponding foreign key conversion for the IDs.  There can be some cases where orphan records are found at this stage (foreign keys not existing), this is informed and the process is stopped.

Note also that tables containing AD_Table_ID+Record_ID or AD_Table_ID+Record_UU will migrate just the records of the included tables (this is, it will not migrate records for excluded tables).

There is a special treatment for the column AD_Preference.Value when AD_Preference.Attribute ends with _ID, in this case the Value is treated as a foreign key and the required conversion is saved as a String.  Also the columns with types "Chosen Multiple Selection Search", "Chosen Multiple Selection Table", "Single Selection Grid" and "Multiple Selection Grid" are converted.  However if your database has other ID fields being written as String in fields with other data types, these values will not be converted.

The following columns replace the template tenant key with the target tenant key:
- AD_Org.Value
- AD_Org.Name
- AD_Role.Name
- AD_Tree.Name
- AD_User.Name
- AD_User.Description
- C_AcctProcessor.Name
- C_AcctSchema.Name
- C_BPartner.Value
- C_BPartner.Name
- C_Calendar.Name
- C_Element.Name
- M_CostType.Name
- R_RequestProcessor.Name

The column W_Store.WebContext is assigned with the Tenant Key in lowercase.  Same for the column AD_User.Value.

The columns AD_User.Password and AD_User.Salt are cleared, so initially there are not passwords assigned for the users in the new tenant, it is a job of SuperUser to log in there and assign passwords (or do it in some custom post-process).

**Technical Info:** [IDEMPIERE-3916](https://idempiere.atlassian.net/browse/IDEMPIERE-3916), [IDEMPIERE-6441](https://idempiere.atlassian.net/browse/IDEMPIERE-6441)

## Known Issues
- Alex reported that copying a big tenant from another postgresql got error "java.net.SocketException: Connection timed out (Read failed)".  Changed tcp_keepalives_idle in postgresql.conf to 300 sec and the process didn't hang anymore.

---

_Source: [Wiki](https://wiki.idempiere.org/en/HowTo:_Copy_or_Move_Tenant)_
