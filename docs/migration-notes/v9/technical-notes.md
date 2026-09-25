---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 9 Horizon."
tags: [features, migration, installation, development, developer-documentation, reference, v9, breaking-change, deprecation, database, security]
---

# Migration notes - iDempiere 9 Horizon (technical)

## Deprecated direct HTTP usage

iDempiere 9 Horizon no longer supports direct HTTP usage of the Web UI interface. The workaround is to use the HTTPS port instead.

:::warning
If you use HTTP, the system does not allow login in the Web UI.
:::

HTTP can still be used for proxy forwarding, but the configuration requires forwarding the `X-Forwarded-Proto` header to `https`.

In nginx, add the following line to the definition of the `/webui` and `/webui/zkau/comet` locations:

```
proxy_set_header  X-Forwarded-Proto $scheme;
```

See [Post-installation](/docs/basic-installation/installing-for-execution/post-installation) for the current proxy setup guidance, and the "Proxy iDempiere Through Nginx" wiki page for the original detailed walkthrough.

<!-- TODO: verify — the "Proxy iDempiere Through Nginx" wiki page has not been migrated to Docusaurus yet; linking out to https://wiki.idempiere.org/en/Proxy_iDempiere_Through_Nginx until it is. -->

## All core views imported to dictionary

With ticket [IDEMPIERE-5059](https://idempiere.atlassian.net/browse/IDEMPIERE-5059), the definition of the 149 core views was imported into the dictionary.

:::warning
The migration scripts recreate all these views, so it is very possible that custom columns you added to views will present problems when applying the scripts. Two possible cases to watch for:

- The script does not show errors, but your view customization is lost. Check all the core views you customized to see if they have problems, and apply the corresponding fixes in release 9.
- The script shows errors when applying (PostgreSQL usually complains because it cannot change columns).

In both cases, fix the views through the dictionary. Do not create the view by hand in SQL. Add your customized columns to the dictionary, then use the iDempiere process to validate and create the view in the database.
:::

## Take care of AD_Window.PredefinedContextVariables

Ticket [IDEMPIERE-4837](https://idempiere.atlassian.net/browse/IDEMPIERE-4837) erases changes made to `AD_Window.PredefinedContextVariables` for Order and Invoice windows.

:::danger
Back up the content of those fields before upgrading if you have customized them, and reapply your changes afterward.
:::

## PostgreSQL default to native dialect

Release-9 comes by default with the native PostgreSQL dialect. The SQL in core was changed to be compatible with both Oracle and PostgreSQL. Because of this, some plugins can break, for example if using `NATIVE_PostgreSQL_KEYWORD`.

:::tip
The best option is to change your plugin to use standard SQL, compatible with both databases.
:::

See [PostgreSQL Default to Native Dialect](/docs/new-features/v9/postgresql-default-to-native-dialect) for information about how to disable it, although this is not recommended.
