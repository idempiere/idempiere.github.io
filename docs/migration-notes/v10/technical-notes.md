---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 10."
tags: [features, migration, installation, development, developer-documentation, reference, v10, breaking-change, deprecation, configuration, performance]
---

# Migration notes - iDempiere 10 (technical)

## System user with ID zero deprecated

The System user with `ID=0` was inactivated and replaced with a similar user with `ID=10`.

:::warning
Implementers that use System in any way must check for impact from this change. The migration script `202202072157_IDEMPIERE-5174.sql` copies the information from `AD_User`, but it does not copy custom columns. It also replaces `AD_User_ID` in some core tables, but implementers must take care of other custom tables if needed.
:::

## Change on schedule behavior

Ticket [IDEMPIERE-5093](https://idempiere.atlassian.net/browse/IDEMPIERE-5093) changed the way schedules work:

- Before this ticket, a schedule configured to run at 9 AM executed at 9 AM of the server timezone.
- After this ticket, the job executes at 9 AM of the tenant timezone where the job is defined.

## Terminology changed from Client to Tenant

Ticket [IDEMPIERE-4586](https://idempiere.atlassian.net/browse/IDEMPIERE-4586) changed the terminology from Client to Tenant throughout the application.

:::note
This has little impact from a user perspective, but it can have a big impact on documentation.
:::

## Backward compatibility issue with TimeUtil.getBusinessDaysBetween

Before v10, the method counted the last day of the period in the total of non-business days.

:::warning
The last day is now excluded. A new method with a new parameter, `includeEndDate`, has been added. Use that new method in your plugin if you want to preserve the behavior prior to v10.
:::

## Upgrade to Hazelcast

The Hazelcast library was upgraded with ticket [IDEMPIERE-5816](https://idempiere.atlassian.net/browse/IDEMPIERE-5816).

:::warning
The `hazelcast.xml` configuration file is not compatible with the previous version, so it is necessary to run setup again to use the new template. If your `hazelcast.xml` is customized, take the template for version 5.3 and reapply your changes.
:::

:::note
This change was also integrated into release-11, and into release-10 as of 2023-07-29.
:::
