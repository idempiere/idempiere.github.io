---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 8.2."
tags: [features, migration, installation, development, developer-documentation, reference]
---

# Migration notes - iDempiere 8.2 (technical)

:::note
For migration script issues, see the "Note Upgrade 8.2" wiki page by Hiep.

<!-- TODO: verify — the "Note Upgrade 8.2" wiki page has not been migrated to Docusaurus yet; linking out to https://wiki.idempiere.org/en/Note_Upgrade_8.2 until it is. -->
:::

## Themes

With ticket [IDEMPIERE-4421](https://idempiere.atlassian.net/browse/IDEMPIERE-4421), a mechanism for versioning themes was implemented.

Backward compatibility with pre-8.2 themes was preserved as much as possible, but you may find problems under the following conditions:

- If your old plugin references `/theme/default`, because that URL was changed to the versioning approach.
  - Recommended solution: migrate your theme to the 8.2 approach.
  - Alternatively, change the pointers to `/theme/default` to point to your own theme.
  - As a last resort (not recommended), change the pointers to `~./theme/default/`. It is preferable to maintain your own theme assets.
- If your plugin referenced the public variable `ITheme.THEME_PATH_PREFIX`, that variable was dropped.
  - Solution: change the variable to `ThemeManager.THEME_PATH_PREFIX`.

You can find additional instructions to migrate your theme in the [IDEMPIERE-4421 ticket comment](https://idempiere.atlassian.net/browse/IDEMPIERE-4421?focusedCommentId=46667).

## PO is immutable

Plugin developers must take care not to write to objects retrieved from cache.

iDempiere now has a mechanism that forbids writing to these objects, to prevent multi-threading issues.

:::tip
The workaround is to read the object directly from the database, for example with a `ctx + ID + trx` constructor. Some classes also implement a `getCopy` method that returns an updatable copy from the cache.
:::

See ticket [IDEMPIERE-4287](https://idempiere.atlassian.net/browse/IDEMPIERE-4287).

## Cross-tenant reading/writing forbidden by default

Plugin developers must take care not to read or write records from a tenant different from the one used at login.

iDempiere now has a mechanism that forbids reading or writing records from a different tenant. Reading can be done from the current tenant or the System tenant. Writing can be done only on the current tenant.

How to avoid this condition:

- Always read/write records within the tenant.
- For example, filter `AD_Client_ID=?`.
- Or filter `AD_Client_ID IN (0,?)`.
- With `Query`, consider using the `setClient_ID` method.

If, for any reason, it is absolutely necessary to read or write a record in a different tenant, the following code can be used:

```java
try {
    PO.setCrossTenantSafe();
    // write here the Query.list or PO.saveEx that is cross tenant safe
} finally {
    PO.clearCrossTenantSafe();
}
```

See ticket [IDEMPIERE-4268](https://idempiere.atlassian.net/browse/IDEMPIERE-4268).
