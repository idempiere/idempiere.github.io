---
title: Automatic External Pack In
sidebar_label: Automatic External Pack In
description: Automatically install 2Pack files at startup across tenants using a shared folder and naming conventions.
sidebar_position: 3
---

# ⚙️ Automatic External Pack In

This feature allows 2Pack files to be installed automatically at server startup from an external folder—without requiring them to be embedded in a plug-in.

## 📝 Background

iDempiere supports several ways to install 2Packs from within plug-ins:

- `AdempiereActivator`: Installs `META-INF/2Pack.zip`
- `Version2PackActivator`: Installs multiple files `META-INF/2Pack_[version].zip` up to the plug-in version
- `Incremental2PackActivator`: Installs **all** `META-INF/2Pack_[version].zip` files regardless of plug-in version

**Limitations of these approaches:**

1. Only work when a plug-in is present  
2. Only install data on the **System** client  

---

## Automatic External Pack In

To overcome the limitations above, the **Automatic External Pack In** mechanism was introduced.

### 🔁 Automatic on Server Restart

This is driven by several **SysConfig** keys:

| Key | Description |
|-----|-------------|
| `AUTOMATIC_PACKIN_FOLDERS` | Folder(s) to scan for `.zip` files (semicolon `;` separated) |
| `AUTOMATIC_PACKIN_INITIAL_DELAY` | Time in seconds that org.adempiere.plugin.utils waits before starting to process the AUTOMATIC_PACKIN_FOLDERS, this is useful in order to wait for the internal plugins to be processed first |
| `AUTOMATIC_PACKIN_RETRIES` | When applying automatically a 2Pack, this defines the number of retries to wait for the semaphore when other plugins are applying 2Packs, this is used in combination with AUTOMATIC_PACKIN_TIMEOUT |
| `AUTOMATIC_PACKIN_TIMEOUT` | When applying automatically a 2Pack, this defines the waiting time to try to get the semaphore when other plugins are applying 2packs, this is used in combination with AUTOMATIC_PACKIN_RETRIES |
| `AUTOMATIC_PACKIN_PROCESSING` | This key is used internally by the automatic application of 2Packs as a semaphore to indicate that another 2Pack is being applied, is not intended to be managed by the user, but automatically managed by the system. |

---

### 🧩 ZIP File Naming Convention

Files must follow this naming pattern:

```
[Timestamp]_[ClientValue]_[OptionalInfo].zip
```

#### Naming Components

| Component | Description | Format |
|-----------|-------------|--------|
| **Timestamp** | Used to sort files chronologically | `yyyymmddHHMM` |
| **ClientValue** | Target client(s) for installation | See options below |
| **OptionalInfo** | Human-readable description | Any descriptive text |

#### ClientValue Options

:::info Client Targeting
The `ClientValue` component determines which client(s) will receive the 2Pack installation:
:::

| ClientValue | Behavior | Example |
|-------------|----------|---------|
| `SYSTEM` | Install only on System client | `SYSTEM` |
| `[ClientName]` | Install only on specific client | `GardenWorld` |
| `ALL-CLIENTS` | Install on all non-System clients | `ALL-CLIENTS` |
| `ALL-CLIENTS-[SeedClient]` | Install on seed client first, then all others | `ALL-CLIENTS-GardenWorld` |

:::tip Multi-Client Deployments
- Use `ALL-CLIENTS` when you want identical configurations across all tenants
- Use `ALL-CLIENTS-[SeedClient]` when you need to establish UUID mappings for cross-client record references
:::

### 📦 Examples

- `201803161725_SYSTEM_CreateNewColumn.zip` → Installs on System
- `201803161735_GardenWorld_CreateNewTax.zip` → Just GardenWorld
- `201803161745_ALL-CLIENTS_CreateNewTax.zip` → All non-System clients
- `201803161755_ALL-CLIENTS-GardenWorld_CreateNewTax.zip` → GardenWorld first, then others

---

### Seed Client Explained

When installing in **ALL-CLIENTS**, the seed client creates a UUID map. This allows:

- Creating **identical records** across tenants  
- **Updating** records in other clients that originated in the seed client  

The mapping is stored in the `AD_Package_UUID_Map` table.

---

## Flow Summary

1. Scans folders recursively for `.zip` files
2. Sorts files by **timestamp**
3. For each zip file:
   - Determines target client(s)
   - Installs into each tenant
   - Logs result in the **Pack In** window
4. Stops on error; remaining files will not be applied

---

## Email Notifications

To receive success/failure notifications:

- Configure email settings on each tenant (Request EMail must be valid)
- Set the `EMAIL_NOTIFY_2PACK` SysConfig key with one or more emails (comma-separated)

Emails are sent **per tenant** and also for **System** if applicable.

---

## 📚 References

- [IDEMPIERE-3551](https://idempiere.atlassian.net/browse/IDEMPIERE-3551)
- [IDEMPIERE-3660](https://idempiere.atlassian.net/browse/IDEMPIERE-3660)

---