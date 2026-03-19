---
sidebar_position: 2
description: Best practices for upgrading between iDempiere versions.
---

# Best Practices for Migrating to New iDempiere Versions

:::info Source
This guide is based on Carlos Ruiz's conference presentation: [Best Practices for Migrating to New iDempiere Versions](https://www.youtube.com/watch?v=GNdZWVjq3uI&t=1s).
:::

## Introduction

iDempiere is an open-source ERP system that regularly releases updates, ranging from minor bug fixes to major version upgrades.

Successful migration requires careful planning, thorough testing, and systematic execution. The goal is to preserve customizations while minimizing business disruption.

## Prepare

Review these artifacts before starting your upgrade:

- [Release notes for your target version](https://wiki.idempiere.org/en/Migration_Notes#Version_iDempiere_13)
- Migration notes for every version jump
- Installation guide for the target iDempiere version

:::tip
If you are jumping across multiple major versions, review migration notes in sequence (for example, 10 -> 11 -> 12), not only the final target version.
:::

## Why Migration Matters

- **Security updates:** protect against known vulnerabilities
- **Bug fixes:** resolve defects that impact daily operations
- **New features:** access improved functionality and performance
- **Long-term support:** remain within maintained version ranges

## Pre-Migration Assessment

Before any migration, perform a full assessment of your current environment.

### System Inventory

Document your baseline and all customization points:

- **Identify baseline version:** current iDempiere version and build number
- **Custom source code:** all changes made to core code
- **Database customizations:** custom tables, columns, indexes, and constraints
- **Plugin dependencies:** installed plug-ins and exact versions
- **Integration points:** external systems, APIs, and synchronization flows

:::note
Keep this inventory in version control. It will be your checklist during each migration iteration.
:::

### Review Migration Notes

The iDempiere wiki maintains [migration notes](https://wiki.idempiere.org/en/Migration_Notes#Version_iDempiere_13) per version. Pay special attention to:

- **Breaking changes:** API removals, deprecations, and behavior changes
- **Database schema changes:** new mandatory fields and table restructuring
- **Theme and UI updates:** components that can affect custom themes
- **Performance considerations:** new indexes or configuration updates

:::warning
Skipping migration notes is one of the most common causes of post-upgrade regressions.
:::

### Backup Strategy

Create complete backups before attempting migration:

- **Database backup:** full PostgreSQL dump with schema and data
- **Server folder snapshot:** full installation directory, including configuration files
- **Custom code repository:** ensure all customizations are committed and tagged
- **Documentation snapshot:** export configuration and customization notes

:::caution Critical
You will likely iterate through the migration process multiple times. Reliable restore points are essential for safe retries.
:::

## Minor Version Updates

Minor updates typically include bug fixes and small enhancements without breaking changes. Even so, they must be tested before production deployment.

### Testing Environment

Always test minor updates on a staging server that mirrors production:

- Same database version and configuration
- Identical customizations and plug-ins
- Representative test data
- Similar load characteristics

:::warning
Do not apply updates directly in production without validating first in staging.
:::

### Update Process

#### Step 1: Update Core System

```shell
cd /opt/idempiere-server
./update.sh
```

This script downloads and applies the latest patches from the official repository.

#### Step 2: Update Plug-ins via P2 Repository

```shell
cd /opt/idempiere-server

# Install or update extensions from a p2 repository (example: REST)
REPO=https://jenkins.idempiere.org/job/idempiere-rest/ws/com.trekglobal.idempiere.extensions.p2/target/repository/
PRODUCT=com.trekglobal.idempiere.rest.api
bash update-prd.sh "$REPO" "$PRODUCT"
```

Equivalent one-line command:

```shell
bash update-prd.sh https://jenkins.idempiere.org/job/idempiere-rest/ws/com.trekglobal.idempiere.extensions.p2/target/repository/ com.trekglobal.idempiere.rest.api
```

:::note
The one-line version and the variable version do the same operation. Use the variable version when scripting multiple plug-ins.
:::

Equivalent command with compare-update-prd instead of update-prd:

```shell
REPO=https://jenkins.idempiere.org/job/idempiere-rest/ws/com.trekglobal.idempiere.extensions.p2/target/repository/
PLUGIN=com.trekglobal.idempiere.rest.api
PRODUCT=com.trekglobal.idempiere.rest.api
bash compare-update-prd.sh $REPO $PLUGIN $PRODUCT
```

#### Update vs Compare-Update

In practice, teams often use two behaviors during plug-in maintenance:

- **Update:** always attempts uninstall + install.
	- If the plug-in is not installed, uninstall can print a harmless error.
	- Useful when you want a forced refresh.
- **Compare-update:** checks current state first.
	- Does not uninstall when the plug-in is not installed.
	- Does not reinstall when the same version is already present.
	- Uninstalls/reinstalls only when a different version is detected.

:::tip
Prefer compare-update behavior for routine maintenance to reduce unnecessary restarts and noisy harmless errors.
:::

#### Step 3: Apply Additional Plug-ins

For plug-ins not distributed in P2 repositories, use telnet scripts:

1. Connect to iDempiere via telnet (typically port 12612).
2. Execute plug-in installation commands.
3. Verify successful installation in logs and OSGi console status.

:::tip Pro Tip
Automate all plug-in installations in a single bash script for consistency and repeatability.
:::

### Post-Update Verification

After applying updates, run the Post Migration Helper process. It helps you identify:

- Customizations overwritten by updates
- Field order changes in Windows and Tabs
- Changelog entries affecting custom components
- Potential issues requiring manual review

:::note
Capture the Post Migration Helper output and store it with your release notes for traceability.
:::

## Major Version Migration

Major version migrations require more extensive planning and usually follow a fresh installation approach.

### New iDempiere Instance

As a general rule, create a new instance that represents your target production candidate (for example, iDempiere 13).

:::danger Why Not Upgrade In Place?
- If the process goes badly, you can lose your current production instance.
- Each new iDempiere release can introduce newer technology requirements (Java, PostgreSQL, and related dependencies).
- A new instance gives you multiple attempts to identify and solve issues before users are impacted.
:::

### Preparation Phase

#### 1. Download New Version Installer

Obtain the official installer for your target version from the iDempiere website.

#### 2. Prepare Installation Environment

- Rename existing server folder (for example, `idempiere-server_old`).
- Extract the new installer to your standard location.
- Copy critical configuration files from the old installation:
	- `idempiereEnv.properties`
	- SSL keystore and certificates
	- Custom configuration files

#### 3. Database Preparation

Before applying migration scripts:

- Create a dedicated migration copy of the production database.
- Verify backup integrity.
- Document the current schema state.

:::caution
Never run initial major-version migration tests directly on the live production database.
:::

## Migration Execution

### Applying Database Migration Scripts

iDempiere provides scripts to synchronize the database schema with new version requirements:

```shell
cd /opt/idempiere-server/utils
./RUN_SyncDB.sh
```

:::warning Important Behaviors
- The script stops when it encounters an `ERROR`.
- Pending changes must be resolved manually or via custom scripts.
- After fixing an error, run `./RUN_SyncDB.sh` again to continue with the remaining migration scripts.
- Repeat this cycle until `./RUN_SyncDB.sh` finishes without errors; otherwise only a subset of scripts will be applied.
- Custom scripts should follow a date-ordered naming convention.
:::

### Handling Migration Errors

Common migration error scenarios and practical resolutions are listed below.

#### Duplicate Column Errors

When custom columns conflict with new core columns:

- Use the *Migrate ID/UUID* process to synchronize custom IDs with official IDs.
- Rename custom columns using a custom prefix (for example, `LIT_User1_ID`).
- Update references in custom code, reports, and integrations.

#### Duplicate ID Conflicts

When custom dictionary entries use IDs now claimed by core:

- Run the *ID migration* utility to reassign custom IDs to safe ranges.
- Update all references in dependent objects.
- Document new ID mappings for future upgrades.

#### View Overwrites

To prevent core updates from overwriting custom views:

- Define custom views in Application Dictionary instead of managing them only as raw SQL.
- Use naming conventions that clearly distinguish custom objects from core objects.
- Use migration helper reports to detect and flag potential conflicts early.

### Custom Pre/Post Migration Scripts

For complex customizations, create dated migration scripts:

```text
YYYYMMDD_custom_description_pre.sql
YYYYMMDD_custom_description_post.sql
```

These scripts run in chronological order during migration.

:::tip
Keep script names stable and descriptive so teams can quickly identify intent and execution order.
:::

### Remote Database Administration

When direct database access is restricted, use monitored migration:

```shell
cd /opt/idempiere-server/utils
./RUN_MonitoredSyncDB.sh
```

This allows DBAs to apply required changes without granting broad direct database access, improving security posture.

## Post-Migration Tasks

### Verification Process

Run the Verify Migration process to identify issues early.

| Check Type | Description |
| --- | --- |
| Changed Customizations | Lists custom fields, Windows, and processes modified by migration. |
| Overwritten Views | Identifies custom database views replaced by core updates. |
| Field Order Changes | Reports Tabs where field sequence was reset to defaults. |
| Missing References | Finds broken links between custom and core objects. |

Table 1: Post-migration verification checks.

:::note
Treat the verification output as a release artifact and attach it to the migration ticket.
:::

### Performance Tuning

After major migrations, performance characteristics may change. Validate the following:

- **Query analysis:** monitor slow query logs for new performance issues.
- **Index review:** verify custom indexes are still optimal.
- **PostgreSQL version:** check whether a database version upgrade is recommended.
- **Cache configuration:** adjust cache sizes based on new version requirements.

### Business Process Testing

Conduct thorough testing of critical business processes:

- **Order-to-cash cycle:** Sales Orders, invoicing, and payments.
- **Procure-to-pay cycle:** Purchase Orders, receipts, and vendor payments.
- **Inventory management:** stock movements and physical inventory.
- **Financial reporting:** Trial Balance and financial statements.
- **Custom workflows:** organization-specific processes.

:::warning
Do not close a migration until business owners validate all critical end-to-end processes.
:::

## Best Practices and Recommendations

### Customization Management

- Prefer configuration over customization: use built-in flexibility before modifying code.
- Use proper naming conventions: prefix custom objects (for example, `XX_`, `LIT_`, `ORG_`).
- Document all changes: maintain records of customizations and rationale.
- Version control: keep all custom code in Git or a similar system.

### Contributing to Core

Consider contributing valuable customizations back to the iDempiere project:

- Reduces future migration costs by eliminating long-lived custom code.
- Benefits the broader community.
- Helps features receive ongoing maintenance.
- Provides recognition for your organization's contributions.

### Automation Strategies

Develop automation for repeatable tasks:

- Create bash scripts for plug-in installation sequences.
- Automate backup procedures with scheduled jobs.
- Script verification checks for consistent validation.
- Build rollback procedures for rapid recovery.

### Training and Documentation

Ensure team readiness for new versions:

- Update internal documentation to reflect changes.
- Train users on new features and UI modifications.
- Document process changes required by migration.
- Create quick-reference guides for common tasks.

## Troubleshooting Common Issues

### Migration Script Failures

**Symptom:** `RUN_SyncDB.sh` stops with errors.

**Solutions:**

- Review error messages carefully to identify root cause.
- Check for conflicting customizations.
- Apply ID/UUID migration utilities as needed.
- Create custom pre-scripts for edge cases.
- Re-run after corrections.

### Performance Degradation

**Symptom:** System is slower after migration.

**Solutions:**

- Analyze query execution plans for changes.
- Rebuild database statistics.

```sql
VACUUM ANALYZE;
```

- Review new indexes added by migration.
- Check PostgreSQL configuration parameters.
- Monitor resource utilization patterns.

### Custom Code Compatibility

**Symptom:** Custom plug-ins fail to load or crash.

**Solutions:**

- Review API deprecation notes in migration documentation.
- Update code to use supported APIs.
- Recompile plug-ins against new version libraries.
- Test thoroughly in an isolated environment.

### UI Rendering Issues

**Symptom:** Custom Windows display incorrectly.

**Solutions:**

- Check theme changes affecting custom components.
- Review field order changes flagged by migration helper.
- Verify custom CSS compatibility.
- Test across different browsers.

:::tip
Keep a known-issues log for each migration wave so repeated failures can be solved faster in future upgrades.
:::

## Conclusion

Successful iDempiere migration requires thorough preparation, systematic execution, and careful post-migration verification. By following these best practices, conducting comprehensive assessments, maintaining reliable backups, testing extensively, and using verification tools, organizations can minimize risk and ensure smooth transitions to new versions.

The investment in strong migration procedures pays dividends through reduced downtime, preserved customizations, and greater confidence in system stability. Regular updates keep your iDempiere installation secure, performant, and aligned with community developments.

### Key Takeaways

- Always test migrations in staging environments first.
- Maintain comprehensive backups with multiple restore points.
- Use official verification tools to catch customization conflicts.
- Automate repetitive tasks for consistency and efficiency.
- Consider contributing valuable customizations to core.
- Plan adequate time for testing and user preparation.
- Document all customizations and migration procedures.


