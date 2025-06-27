---
title: Changing the Database
sidebar_label: Changing the Database
sidebar_position: 3
description: Guidelines for safely updating the iDempiere database schema
---

If your contribution includes **changes to the database**, follow these steps to ensure consistency across environments:

## 🆔 Requesting Centralized IDs
Request official IDs as described in the [Manage the Centralized IDs](https://wiki.idempiere.org/en/Centralized_ID_Management) guide or contact the core team.

## 🛠 Generating Migration Scripts

To generate migration scripts automatically:

1. Open the **iDempiere Web UI** and log in as **System Administrator**.
2. Click on the **Preference** icon next to **Change Role**.
3. Enable the following flags:
   - **Dictionary Maintenance**
   - **Log Migration Scripts**
4. Fill in the **Migration Script Comment** — it **must include the JIRA ticket number and a short description** (e.g., `IDEMPIERE-5409 Dashboard Content - Maximizable checkbox`).

After completing these steps, continue creating or updating the required dictionary objects.

iDempiere will automatically generate the corresponding SQL migration scripts and place them in your local migration folder (e.g., `migration/iD13/`). In most cases, these scripts will be ready to commit as part of your pull request.

---

### ⚠️ Important

> Even failed SQL statements are logged.  
> **You must carefully review the generated migration script before committing it.**  
> Remove or correct any invalid or unnecessary statements to ensure the integrity of the database update process.

---

### ✅ Example Migration Script

```sql
-- IDEMPIERE-5409 Dashboard Content - Maximizable checkbox
SELECT register_migration_script('202209061547_IDEMPIERE-5409.sql') FROM dual;

-- Sep 6, 2022, 3:47:13 PM CEST
INSERT INTO AD_Element (AD_Element_ID,AD_Client_ID,AD_Org_ID,IsActive,Created,CreatedBy,Updated,UpdatedBy,ColumnName,Name,PrintName,EntityType,AD_Element_UU) VALUES (203651,0,0,'Y',TO_TIMESTAMP('2022-09-06 15:47:13','YYYY-MM-DD HH24:MI:SS'),100,TO_TIMESTAMP('2022-09-06 15:47:13','YYYY-MM-DD HH24:MI:SS'),100,'IsMaximizable','Is Maximizable','Is Maximizable','D','250c4f55-23e9-48d7-b5b4-0154ecf8b52a')
;

-- Sep 6, 2022, 3:48:41 PM CEST
INSERT INTO AD_Column (AD_Column_ID,Version,Name,AD_Table_ID,ColumnName,DefaultValue,FieldLength,IsKey,IsParent,IsMandatory,IsTranslated,IsIdentifier,SeqNo,IsEncrypted,AD_Reference_ID,AD_Client_ID,AD_Org_ID,IsActive,Created,CreatedBy,Updated,UpdatedBy,AD_Element_ID,IsUpdateable,IsSelectionColumn,EntityType,IsSyncDatabase,IsAlwaysUpdateable,IsAutocomplete,IsAllowLogging,AD_Column_UU,IsAllowCopy,SeqNoSelection,IsToolbarButton,IsSecure,FKConstraintType,IsHtml) VALUES (215283,0,'Is Maximizable',50010,'IsMaximizable','Y',1,'N','N','Y','N','N',0,'N',20,0,0,'Y',TO_TIMESTAMP('2022-09-06 15:48:40','YYYY-MM-DD HH24:MI:SS'),100,TO_TIMESTAMP('2022-09-06 15:48:40','YYYY-MM-DD HH24:MI:SS'),100,203651,'Y','N','D','N','N','N','Y','afa27a31-f8f8-4bc4-a734-b136e430793a','Y',0,'N','N','N','N')
;

-- Sep 6, 2022, 3:50:01 PM CEST
ALTER TABLE PA_DashboardContent ADD COLUMN IsMaximizable CHAR(1) DEFAULT 'Y' CHECK (IsMaximizable IN ('Y','N')) NOT NULL
;
```
