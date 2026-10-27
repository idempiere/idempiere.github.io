---
sidebar_position: 3
description: Run your own ID server so plug-in developers with separate databases get dictionary IDs that do not clash.
tags: [development, technical]
applies_to: "all"
last_reviewed: 2026-10-27
---
# Run a project ID server

When several developers build the same plug-in in separate development databases, each local sequence hands out the same IDs. Their dictionary records then clash when you merge the work. Run your own ID server and point every development database at it, so all developers get IDs from one sequence.

:::warning

Centralized ID management is planned to be deprecated. There is no ticket or date yet. See [Request centralized IDs](./centralized-ids.md).

:::

## When this does not apply

- You contribute to iDempiere core. Core uses the official ID server. See [Request centralized IDs](./centralized-ids.md).
- One developer works on the plug-in, or all developers share one database. The local sequence is enough.

## How it works

- The `PROJECT_ID_*` keys apply when **Dictionary Maintenance** is off.
- They cover every table with an `EntityType` column, for example `AD_Column`, `AD_Element`, `AD_Window` and `AD_SysConfig`.
- Log and runtime tables, such as `AD_PInstance` and `AD_ChangeLog`, always use the local sequence.
- After each reservation, iDempiere moves the local sequence past the reserved ID.

## Set up the server

1. Install the CGI scripts from [globalqss/idempiere-stuff](https://github.com/globalqss/idempiere-stuff/tree/stuff/POC_Central_System_IDs/linux) in the `cgi-bin` directory of a web server.
2. Create a data directory for the project at `../data/<PROJECT_NAME>` relative to `cgi-bin`. The web server must be able to write to it.
3. Register the developers in `data/<PROJECT_NAME>/RegisteredDevelopers.pwd`, one `user|password` line each.

## Configure each development database

Set these keys in the System Configurator window at System level:

| Key | Value |
|---|---|
| [`PROJECT_ID_USE_CENTRALIZED_ID`](/docs/basic-development/system-configurator#PROJECT_ID_USE_CENTRALIZED_ID) | `Y` (default `N`) |
| [`PROJECT_ID_WEBSITE`](/docs/basic-development/system-configurator#PROJECT_ID_WEBSITE) | `http://<your_server>/cgi-bin/get_ID` |
| [`PROJECT_ID_PROJECT`](/docs/basic-development/system-configurator#PROJECT_ID_PROJECT) | `<PROJECT_NAME>` |
| [`PROJECT_ID_USER`](/docs/basic-development/system-configurator#PROJECT_ID_USER) | The developer's user name |
| [`PROJECT_ID_PASSWORD`](/docs/basic-development/system-configurator#PROJECT_ID_PASSWORD) | The developer's password |

iDempiere sends the user name and password in the URL of each request. Serve the scripts over `https://` with a valid certificate if the server is reachable from outside your network.

## Test it

Open this URL in a browser:

```text
http://<your_server>/cgi-bin/get_ID?PROJECT=<PROJECT_NAME>&USER=<user>&PASSWORD=<password>&TABLE=AD_Column&ALTKEY=&COMMENT=Test
```

The page shows an ID. The number must go up each time you reload the page. Table names are case sensitive.

## Related pages

- [Request centralized IDs](./centralized-ids.md)
- [System Configurator](/docs/basic-development/system-configurator)
- [Distributing Plug-ins](/docs/basic-development/plugin-development/distributing-plugins)
