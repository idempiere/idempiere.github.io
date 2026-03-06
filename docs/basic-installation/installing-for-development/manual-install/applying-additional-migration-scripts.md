---
sidebar_position: 6
---

# Applying Additional Migration Scripts

## Automated way

In the console, go to the `$IDEMPIERE_REPOSITORY` folder and execute:

```bash
bash RUN_SyncDBDev.sh
```

Verify there are no errors.

:::important
In case of errors, solve the error and then execute the command again.
:::

:::note Output logs per script
If you want to review the output of specific migration scripts, the script leaves the output of every script executed in `/tmp/SyncDB_out_[##]`, where the number is a random numeric value (process ID of the running script).
:::

:::note Windows
There is no batch file to run on Windows, but if you install git, this installs a **git bash** command that can execute `RUN_SyncDBDev.sh` without problems.
:::

## Manual way (not recommended)

First, get the list of all migration scripts:

```bash
ls $IDEMPIERE_REPOSITORY/migration/*/postgresql
```

Now get the list of migration scripts already applied in the database from `psql`:

```sql
select name from ad_migrationscript order by 1;
```

Compare the list of migration scripts with the contents of your `AD_MigrationScript` table. Apply all pending migration scripts in file-name order.

Please check carefully the output of each migration script. If you find errors, try to solve them or ask for help on the [support forums](http://groups.google.com/group/idempiere).

You must repeat the previous steps for each unapplied migration script. It is recommended to take note of the last applied script for future reference.

---

*This How-To is brought to you by Carlos Ruiz from [BX Service GmbH](https://www.bx-service.com/). Feel free to improve directly or suggest using the Discussion tab.*
