---
sidebar_position: 1
description: Configure iDempiere to get official dictionary IDs from the central ID server, check the setup, and look up or reserve IDs.
tags: [development, technical]
applies_to: "all"
last_reviewed: 2026-10-27
---
# Request centralized IDs

:::warning

Centralized ID management is planned to be deprecated. There is no ticket or date yet. Use it until a replacement is announced, and ask in the [iDempiere public forum](https://www.idempiere.org/forums) for the current status.

:::

Core Application Dictionary records (entity type `D`) must use IDs reserved on the central ID server, not IDs from your local database sequences. This prevents primary ID clashes when another person installs your changes or when they are merged into core.

Key facts:

- The **Dictionary Maintenance** preference turns centralized IDs on. While it is on, every new record in the System or GardenWorld client gets its ID from the central ID server. The preference is shown only to System level users and is not saved between sessions, so turn it on again after each login. Use it only for core contributions.
- The central ID server is `developer.idempiere.com`. Core migration scripts from 2026 still reserve IDs there.
- You need a user name and password for the server. The user name is your committer GitHub ID. [Carlos Ruiz](https://github.com/CarlosRuiz-globalqss) manages the server and assigns the passwords. The password is not public. Ask for it in the [iDempiere public forum](https://www.idempiere.org/forums) or the [Mattermost support channel](https://mattermost.idempiere.org/idempiere/channels/support). It is sent to you privately. Never post it in a forum, ticket or commit.
- iDempiere sends your **Migration Script Comment** to the server with each reservation. Set the comment, with the ticket number, before you create records.
- Every reservation is announced automatically in the [iDempiere-dev group](https://groups.google.com/g/idempiere-dev) as "Centralized ID Reservation for project iDempiere".
- Official IDs are below 1,000,000. Local IDs of a normal client start at 1,000,000.
- Log and runtime tables, such as `AD_PInstance`, `AD_ChangeLog` and `AD_Issue`, always use the local sequence.

## Configure the ID server

Log in as System Administrator and set these keys in the System Configurator window at System level:

| Key | Value |
|---|---|
| [`DICTIONARY_ID_USE_CENTRALIZED_ID`](/docs/basic-development/system-configurator#DICTIONARY_ID_USE_CENTRALIZED_ID) | `Y` (default) |
| [`DICTIONARY_ID_WEBSITE`](/docs/basic-development/system-configurator#DICTIONARY_ID_WEBSITE) | `http://developer.idempiere.com/cgi-bin/get_ID` |
| [`DICTIONARY_ID_USER`](/docs/basic-development/system-configurator#DICTIONARY_ID_USER) | Your committer GitHub ID |
| [`DICTIONARY_ID_PASSWORD`](/docs/basic-development/system-configurator#DICTIONARY_ID_PASSWORD) | Your assigned password |

Use `http://`, not `https://`. As of October 2026, the HTTPS certificate of `developer.idempiere.com` is issued for `globalqss.com`, so iDempiere rejects the connection and the record is not saved. iDempiere sends the user name and password in the URL of each request, so they travel in clear text.

Setting `DICTIONARY_ID_USE_CENTRALIZED_ID` to `N` does not switch back to local IDs. With **Dictionary Maintenance** on, saving a record then fails with "System IDs must be always obtained from Centralized ID server".

## Check the setup

1. Turn on **Dictionary Maintenance** and **Log Migration Scripts**, and set the **Migration Script Comment**. See [Generating Migration Scripts](./migration-scripts.md).
2. Create a test record, for example an Element.
3. Check the ID in the generated migration script. It must be below 1,000,000.

If the server cannot be reached or the credentials are wrong, the record is not saved and the server log shows `No NextID (-1)`. At log level INFO, the line before it, `getNextID_HTTP - <TableName>=<response>(-1)`, shows what the server answered.

## Look up reserved IDs

The server keeps a log of the IDs reserved for each table. Open it in a browser and replace `AD_Column` with your table:

- `http://developer.idempiere.com/cgi-bin/showtaillog?AD_Column` shows the latest reservations (recommended).
- `http://developer.idempiere.com/cgi-bin/showlog?AD_Column` shows the full log.

Table names are case sensitive.

## Reserve an ID without creating a record

Use this when you move an existing record with a local ID (1,000,000 or higher) into core and only need an official ID for it. Call the server directly:

```text
http://developer.idempiere.com/cgi-bin/get_ID?PROJECT=Adempiere&USER=<your_user>&PASSWORD=<your_password>&TABLE=AD_Column&ALTKEY=&COMMENT=<ticket and description>
```

| Parameter | Meaning |
|---|---|
| `PROJECT` | `Adempiere` for core IDs |
| `USER`, `PASSWORD` | Your credentials |
| `TABLE` | The table to reserve an ID for. Case sensitive. |
| `ALTKEY` | Not used. Leave it empty. |
| `COMMENT` | The reason for the reservation, for example the ticket number |

The response is the reserved ID. Each call reserves a new one.

## Related pages

- [Generating Migration Scripts](./migration-scripts.md)
- [Run a project ID server](./project-id-server.md)
- [System Configurator](/docs/basic-development/system-configurator)
