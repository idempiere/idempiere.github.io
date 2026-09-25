---
sidebar_label: "Functional notes"
sidebar_position: 2
description: "Functional migration notes for upgrading to iDempiere 1.0."
tags: [features, migration, installation, development, developer-documentation, reference, v1.0, breaking-change, deprecation, security]
---

# Migration notes - iDempiere 1.0 (functional)

## Inventory Document Types

Because of [IDEMPIERE-675](http://idempiere.atlassian.net/browse/IDEMPIERE-675), you need to manually set the inventory document subtype for your inventory documents (internal use and physical inventory).

:::tip
If you used the same document type for both cases, the recommendation is to inactivate the old mixed document and create new document types for each specific case.
:::

## Deprecated functionalities

With [IDEMPIERE-362](http://idempiere.atlassian.net/browse/IDEMPIERE-362), [IDEMPIERE-170](http://idempiere.atlassian.net/browse/IDEMPIERE-170), and [IDEMPIERE-247](http://idempiere.atlassian.net/browse/IDEMPIERE-247), some functionalities that were not working properly were deprecated. Check the tickets and commits for details; the most prominent are:

- Cash Journals (all cash functionality can be modeled using payments).
- MRP Heavy Manufacturing (Light Manufacturing was integrated instead).
- Payroll (being developed as an extension).

## Production

If you used the old Production window (the original from Compiere, with three tabs), some changes are required, as noted in [IDEMPIERE-521](http://idempiere.atlassian.net/browse/IDEMPIERE-521).

## Advanced roles

With ticket [IDEMPIERE-1160](https://idempiere.atlassian.net/browse/IDEMPIERE-1160), a new security feature was implemented. When creating a new client, the ClientAdmin role is configured as an advanced role, and the ClientUser role is not. You can then use ClientAdmin to configure the rest of the roles, advanced or not, and users.

:::note
Advanced role is not intended for end users. It is mostly intended for IT roles that administer the system. Advanced roles have access to many fields that expose security-sensitive settings in the system.
:::

:::warning
This feature creates a problem when migrating databases with existing tenants. Because the security configuration of an already existing client cannot be known in advance, a migration script cannot mark any of that client's roles as advanced in the database. As a result, when migrating databases, all roles on clients (other than GardenAdmin and System) are marked as non-advanced, and there is no way to mark an advanced role within the system. It is necessary to mark your required advanced role directly via SQL, for example:

```sql
UPDATE AD_Role SET IsAccessAdvanced='Y' WHERE AD_Role_ID=?
```

Replace `?` with the ID of the role you want to designate as advanced (with access to security-sensitive fields).
:::
