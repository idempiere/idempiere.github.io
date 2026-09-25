---
sidebar_label: "Migration scripts"
sidebar_position: 1
description: "Migration script folders for moving from ADempiere and early iDempiere releases."
tags: [features, migration, installation, development, developer-documentation, reference, adempiere, database]
---

# Legacy ADempiere and early iDempiere migration scripts

:::note
The folders referenced below can vary from release to release. The idea is to apply all migration scripts in order, until you arrive at the release you're migrating to.
:::

## From iDempiere 2.1 to iDempiere 3.1

Apply migration scripts from the following three folders, in order:

- [i2.1](https://github.com/idempiere/idempiere/tree/master/migration-historic/i2.1) - just the scripts not yet applied
- [i2.1z](https://github.com/idempiere/idempiere/tree/master/migration-historic/i2.1z)
- [i3.1](https://github.com/idempiere/idempiere/tree/master/migration-historic/i3.1)

## From iDempiere 2.0 to iDempiere 2.1

Apply migration scripts from the following three folders, in order:

- [i2.0](https://github.com/idempiere/idempiere/tree/master/migration-historic/i2.0) - just the scripts not yet applied
- [i2.0z](https://github.com/idempiere/idempiere/tree/master/migration-historic/i2.0z)
- [i2.1](https://github.com/idempiere/idempiere/tree/master/migration-historic/i2.1)

## From iDempiere 1.0 to iDempiere 2.0

Apply migration scripts from the following three folders, in order:

- [i1.0c](https://github.com/idempiere/idempiere/tree/master/migration-historic/i1.0c) - just the scripts not yet applied
- [i1.0z](https://github.com/idempiere/idempiere/tree/master/migration-historic/i1.0z)
- [i2.0](https://github.com/idempiere/idempiere/tree/master/migration-historic/i2.0)

## From ADempiere 360 to ADempiere 361

Apply migration scripts from the following folders, in order:

- [360lts-360lts.010](https://bitbucket.org/CarlosRuiz_globalqss/adempiere361/src/tip/migration/360lts-360lts.010?at=globalqss_adempiere361)
- [360lts.010-361.Final](https://bitbucket.org/CarlosRuiz_globalqss/adempiere361/src/tip/migration/360lts.010-361.Final?at=globalqss_adempiere361)
- [361.Final-BUG_FIXES](https://bitbucket.org/CarlosRuiz_globalqss/adempiere361/src/tip/migration/361.Final-BUG_FIXES?at=globalqss_adempiere361)

## From ADempiere 360 to iDempiere 1.0

Apply migration scripts from the following folders, in order:

- [360lts-i1.0a](https://github.com/idempiere/idempiere/tree/master/migration-historic/360lts-i1.0a)
- [i1.0a-i1.0b](https://github.com/idempiere/idempiere/tree/master/migration-historic/i1.0a-i1.0b)
- [i1.0b-i1.0c](https://github.com/idempiere/idempiere/tree/master/migration-historic/i1.0b-i1.0c)
- [i1.0c](https://github.com/idempiere/idempiere/tree/master/migration-historic/i1.0c)

## From ADempiere 361 to iDempiere 1.0

Apply the same migration scripts as migrating from 360, excluding those already applied when you migrated from 360 to 361.

## Increasing speed of some scripts

- The script `postgresql/789_GenerateUUIDColumns.sql` can apply `ALTER TABLE` too slowly for big tables. This can be improved by dropping the `DEFAULT NULL` at the end of each `ALTER TABLE`.
- It is highly recommended to run the "UUID Generator" process after migration to fill empty UUID columns, but this can be very slow for big tables. A faster way is to execute an update directly on the database. You can also consider deleting the related UUID index before the update and recreating it at the end, for example:

  ```sql
  DROP INDEX ad_changelog_uu_idx;
  UPDATE AD_ChangeLog SET AD_ChangeLog_UU=generate_uuid() WHERE AD_ChangeLog_UU IS NULL;
  CREATE UNIQUE INDEX ad_changelog_uu_idx ON ad_changelog (ad_changelog_uu);
  ```

- The script `processes_post_migration/postgresql/02_SynchronizeTerminology.sql` tends to be slow on PostgreSQL versions higher than 9.1 with default memory settings. Tune the database memory to resolve this.

## Note about migrating from ADempiere 370

Experience and documentation about this migration path is shared by Pb_integratio on the "Migration from ADempiere 370 to iDempiere" wiki page.

<!-- TODO: verify — the "Migration from ADempiere 370 to iDempiere" wiki page has not been migrated to Docusaurus yet; linking out to https://wiki.idempiere.org/en/Migration_from_ADempiere_370_to_iDempiere until it is. -->

## Note about migrating from ADempiere pre-360

### Problem

Migrating some ADempiere installations before 360 to iDempiere generates a problem when using PostgreSQL 9.2: applying the script `201309192024_IDEMPIERE-1370.sql` throws:

```
ERROR:  cannot change name of input parameter "p_product_id"
```

### Cause

An issue has been detected migrating a database pre-360 to iDempiere using PostgreSQL 9.2.

The `bomqtyonhand` function from the database seed does not match the `bomqtyonhand` function present in the migration scripts for pre-360. The script `201309192024_IDEMPIERE-1370.sql` fixes that situation, but PostgreSQL 9.2 does not allow changing a function's parameter name.

### Solutions

:::tip
You can perform the migration using PostgreSQL 8.4, which allows changing a function parameter's name, and migrate to 9.2 at the end.
:::

Alternatively, you can drop the old `bomqtyonhand` function (and all its associated views) and recreate them properly.
