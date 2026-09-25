---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 11."
tags: [features, migration, installation, development, developer-documentation, reference]
---

# Migration notes - iDempiere 11 (technical)

## Java 17 required

For release-11, the project moved to the next Long Term Support version of Java. Because Java 11 is too close to its end of life, release-11 requires Java 17 for running and compiling.

## Storage size increase because of new Record_UU columns

A number of `Record_UU` columns have been added to core tables, which can represent an increase in storage size and backup size in implementations that have many records in these tables, for example many attachments, or heavy usage of chat, post-it, or labels. The change log can also be affected by size, depending on the System Configurator key `AD_CHANGELOG_SAVE_UUID`.

See the "NF11 UUID Key Tables" wiki page, "Enabled Features for tables with UUID key and without ID key" section, for details.

<!-- TODO: verify — the "NF11 UUID Key Tables" wiki page has not been migrated to Docusaurus yet; linking out to https://wiki.idempiere.org/en/NF11_UUID_Key_Tables until it is. -->

:::note
See also [Support for pure UUID key tables](/docs/new-features/v11/support-for-pure-uuid-key-tables) for the related feature documentation already migrated to this site.
:::

## New MPInstance constructors to manage AD_PInstance.AD_Table_ID

The `AD_PInstance` table had a `Record_ID` column without a corresponding `AD_Table_ID`. This was an anomaly that made it impossible to figure out which table triggered a process and use `Record_ID` to navigate to the originating record.

With ticket [IDEMPIERE-5567](https://idempiere.atlassian.net/browse/IDEMPIERE-5567), the column was added, and the migration script `202309111844_IDEMPIERE-5567_ADPInstance.sql` tries to fill the new `AD_Table_ID` column by discovering the related table from column, toolbar button, print formats, and similar sources.

:::warning
Not all relationships can necessarily be discovered. After migration, review which records were left on `AD_PInstance` with a `null` `AD_Table_ID` and `Record_ID > 0`, and decide whether to fill them for your specific cases. Sometimes it is not possible to discover the table at all, for example a process such as `org.compiere.process.BankStatementMatcher` could have been called from three different tables with no trace of which one.
:::

It is also possible that your plugins call processes that fill `AD_PInstance` without the table. The old `MPInstance` constructors are marked as deprecated to help you find them in your plugins and migrate to the new methods.

## Constructor MPaymentBatch(Properties, String, String) changed

There was a constructor `MPaymentBatch(Properties, String, String)` that was not used in official core. Its second parameter was the name, and it was intended to create a new record and set the name of the payment batch record.

This constructor conflicts with the new UUID based constructor described in the "NF11 UUID Key Tables" wiki page, so it was replaced by the UUID constructor and its behavior is now completely different.

<!-- TODO: verify — the "NF11 UUID Key Tables" wiki page has not been migrated to Docusaurus yet; linking out to https://wiki.idempiere.org/en/NF11_UUID_Key_Tables#New_UUID_based_constructors until it is. -->

:::warning
Most likely nobody is using the old constructor, but if you use `MPaymentBatch`'s constructor in your plugins, verify that you are not using this one. If used, change it to a normal constructor with zero as the ID parameter, then set the name separately.
:::

## Product Info toolbar button deactivated in core

Community feedback indicated most people were not using this toolbar button, so it was deactivated in core.

:::tip
If you miss it after upgrading, go to the Toolbar Button window and activate it again.
:::

## Export button not exporting official dictionary entries

Since [IDEMPIERE-6018](https://idempiere.atlassian.net/browse/IDEMPIERE-6018), the Export button on windows does not export official dictionary entries. To export the dictionary, configure and use a PackOut.

## Hazelcast defaults to disable auto-detection

With ticket [IDEMPIERE-6279](https://idempiere.atlassian.net/browse/IDEMPIERE-6279), Hazelcast's automatic detection of other servers within the network was disabled.

:::warning
If you plan to use Hazelcast in a multi-server or load-balanced scenario, `hazelcast-template.xml` needs to be customized.
:::
