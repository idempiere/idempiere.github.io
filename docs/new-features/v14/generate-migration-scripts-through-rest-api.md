---
sidebar_label: Migration Scripts via REST API
sidebar_position: 7
description: Generate and append to SQL migration scripts for Application Dictionary changes made through the REST API using System administrator request headers.
tags:
  - technical
  - development
applies_to: ">=14"
last_reviewed: 2026-10-29
---

# Generate Migration Scripts Through REST API

**Goal:** Technical  
**Developer:** [Heng Sin Low](https://github.com/hengsin)  
**Feature Ticket:** [IDEMPIERE-7173](https://idempiere.atlassian.net/browse/IDEMPIERE-7173)  
**Version:** iDempiere 14  

## The problem

When configuring or customizing iDempiere through the user interface, developers can turn on migration script logging and Dictionary Maintenance mode. That writes every Application Dictionary modification into official SQL migration scripts with centralized IDs.

Before this feature, the REST API had no mechanism to enable migration script logging or dictionary maintenance during API calls. Each REST request ran without migration headers. Developers and automated tools (such as Model Context Protocol servers or AI coding agents) could not capture their dictionary modifications in standard migration files.

In addition, each call to the core migration script logger generated a separate timestamped file. Executing multiple related API requests in a sequence created fragmented script files instead of one consolidated migration script for the ticket.

## What changed

This feature adds support for generating database migration scripts directly through the REST API:

- **New HTTP request headers**: System administrators can pass headers to enable migration script logging, activate Dictionary Maintenance mode (centralized IDs), and specify a ticket comment.
- **Single migration file per session**: Core `Convert` now supports reusing a single migration file across multiple database operations within the same authenticated session.
- **Clean registration**: The `register_migration_script` call and Oracle headers are written once when the file is created. Subsequent operations in the same session append only their SQL statements.
- **Process inheritance**: Processes triggered through `/v1/processes/...` inherit the migration logging context from the calling request.
- **Model Context Protocol (MCP) support**: The iDempiere MCP server exposes parameters on record, window, and process tools to pass migration headers automatically.

## How to use it

### Step 1: Authenticate as System Administrator

Obtain a JWT token for the "System" Tenant (`AD_Client_ID=0`), "System Administrator" Role (`AD_Role_ID=0`), and an administrator user:

```bash
curl -X POST https://localhost:8443/api/v1/auth/tokens \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "SuperUser",
    "password": "SystemPassword",
    "parameters": {
      "clientId": "0",
      "roleId": "0",
      "organizationId": "0",
      "language": "en_US"
    }
  }'
```

Save the returned token for subsequent requests.

### Step 2: Send dictionary requests with migration headers

Include the migration headers on any REST request that modifies Application Dictionary records (such as tables, columns, windows, tabs, fields, or messages):

```bash
curl -X POST https://localhost:8443/api/v1/models/AD_Element \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -H "X-ID-LogMigrationScript: Y" \
  -H "X-ID-AdempiereSys: Y" \
  -H "X-ID-MigrationScriptComment: IDEMPIERE-7173 Add customer feedback element" \
  -d '{
    "ColumnName": "CustomerFeedback",
    "Name": "Customer Feedback",
    "PrintName": "Customer Feedback",
    "EntityType": "D"
  }'
```

### Step 3: Run subsequent requests in the same session

Send subsequent requests using the same bearer token and ticket comment:

```bash
curl -X POST https://localhost:8443/api/v1/models/AD_Column \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -H "X-ID-LogMigrationScript: Y" \
  -H "X-ID-AdempiereSys: Y" \
  -H "X-ID-MigrationScriptComment: IDEMPIERE-7173 Add customer feedback element" \
  -d '{
    "AD_Table_ID": 259,
    "ColumnName": "CustomerFeedback",
    "Name": "Customer Feedback",
    "AD_Element_ID": 1000001,
    "AD_Reference_ID": 10,
    "FieldLength": 255,
    "EntityType": "D"
  }'
```

Because both requests share the same authenticated session and ticket number (`IDEMPIERE-7173`), the SQL statements are appended to the same script file.

### Step 4: Verify the generated migration script

The server writes the migration scripts to the standard migration directories:

- PostgreSQL: `migration/postgresql/<timestamp>_IDEMPIERE-7173.sql`
- Oracle: `migration/oracle/<timestamp>_IDEMPIERE-7173.sql`

The resulting script contains the initial registration header followed by all statements generated during the session:

```sql
-- IDEMPIERE-7173 Add customer feedback element
SELECT register_migration_script('202610292100_IDEMPIERE-7173.sql') FROM dual;

INSERT INTO AD_Element (AD_Client_ID,AD_Element_ID,AD_Org_ID,ColumnName,Created,CreatedBy,EntityType,IsActive,Name,PrintName,Updated,UpdatedBy) VALUES (0,1000001,0,'CustomerFeedback',TO_TIMESTAMP('2026-10-29 21:00:00','YYYY-MM-DD HH24:MI:SS'),100,'D','Y','Customer Feedback','Customer Feedback',TO_TIMESTAMP('2026-10-29 21:00:00','YYYY-MM-DD HH24:MI:SS'),100)
;

INSERT INTO AD_Column (AD_Client_ID,AD_Column_ID,AD_Element_ID,AD_Org_ID,AD_Reference_ID,AD_Table_ID,ColumnName,Created,CreatedBy,EntityType,FieldLength,IsActive,IsAlwaysUpdateable,IsEncrypted,IsIdentifier,IsKey,IsMandatory,IsParent,IsSelectionColumn,IsSyncDatabase,IsTranslated,IsUpdateable,Name,SeqNo,Updated,UpdatedBy,Version) VALUES (0,1000002,1000001,0,10,259,'CustomerFeedback',TO_TIMESTAMP('2026-10-29 21:00:00','YYYY-MM-DD HH24:MI:SS'),100,'D',255,'Y','N','N','N','N','N','N','N','N','N','Y','Customer Feedback',0,TO_TIMESTAMP('2026-10-29 21:00:00','YYYY-MM-DD HH24:MI:SS'),100,0)
;
```

## Configuration

### Request headers

The following HTTP request headers configure migration script generation:

| Header | Values | Default | Description |
| --- | --- | --- | --- |
| `X-ID-LogMigrationScript` | `Y`, `N`, `true`, `false`, `1`, `0` | `N` | Enables or disables generation of database migration scripts. |
| `X-ID-AdempiereSys` | `Y`, `N`, `true`, `false`, `1`, `0` | `N` | Enables or disables Dictionary Maintenance mode and centralized ID generation. |
| `X-ID-MigrationScriptComment` | Text string | None | Ticket number or comment for the migration script header and file name. |

:::info Security Requirement

These headers are only honored when all of the following conditions are met:

1. The request uses a token for the "System" Tenant (`AD_Client_ID=0`).
2. The user has the "System Administrator" Role (`AD_Role_ID=0`).
3. The authenticated user has administrator privileges (`MUser.isAdministrator()`).

For any other tenant (such as "GardenWorld") or non-administrator user, the headers are ignored.

:::

### Session lifecycle and file reuse

1. When a dictionary modification generates SQL, the script file is opened and registered.
2. At the end of each request, the file buffer is flushed and closed, so changes are committed to disk immediately.
3. Within the same authenticated session (`AD_Session`), subsequent requests matching the same ticket comment (or the same `IDEMPIERE-<number>` ticket pattern) reuse and append to the existing file.
4. If a subsequent request in the same session does not supply `X-ID-LogMigrationScript: Y`, migration script logging is disabled for that request. It does not inherit the setting from previous requests.
5. If the comment changes to a new ticket number, the server begins a new migration script file.

## Technical notes

### Core API

Core iDempiere introduces a context variable in `org.compiere.dbPort.Convert`:

- `Convert.CONTEXT_MIGRATION_SCRIPT_FILE_NAME`: Set to `"MigrationScriptFileName"`. When present in the environment context (`Env.getCtx()`), `Convert.logMigrationScript` writes to the designated file name instead of generating a new timestamp for every SQL statement.
- `Convert.closeLogMigrationScript()`: Flushes and closes open file streams, saving the last generated file name.
- `Convert.getLastGeneratedFileName()`: Returns the name of the last generated script file.

### REST API filters

The `com.trekglobal.idempiere.rest.api` bundle manages the migration script context through JAX-RS filters:

- `RequestFilter`: Validates System administrator rights, sanitizes comments, and applies settings to the execution context via `MigrationScriptContext.apply(requestContext)`.
- `ResponseFilter`: Flushes and closes open script writers after request execution via `MigrationScriptContext.closeMigrationScriptFiles(requestContext)`.
- `ProcessResourceImpl`: Automatically copies the migration context to process threads via `MigrationScriptContext.copy(ctx, m_ctx)`, ensuring that processes such as table synchronization write to the active migration script.

### Model Context Protocol (MCP) integration

The iDempiere MCP server (`idempiere-mcp`) exposes three optional parameters on tools that modify records or execute processes:

- `logMigrationScript` (`boolean`)
- `adempiereSys` (`boolean`)
- `migrationScriptComment` (`string`)

## Migration impact

None. The new HTTP headers and tool arguments are optional. Existing REST API requests continue to behave as before.

## Related tickets

- [IDEMPIERE-7173](https://idempiere.atlassian.net/browse/IDEMPIERE-7173) Add support for generation of migration script through REST API
- [bxservice/idempiere-rest issue #543](https://github.com/bxservice/idempiere-rest/issues/543) Add HTTP header to support the generation of migration script through REST API
- [MCP Skills](https://github.com/hengsin/idempiere-mcp/tree/main/idempiere-mcp-skills) MCP skills with migration script support
