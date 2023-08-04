---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker

## Quick Start

```shell
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:13
```

```shell
docker run -d --name idempiere -p 8443:8443 --link postgres:postgres idempiereofficial/idempiere:10
```

## Advanced

### Using Docker Commands

iDempiere Docker uses a postgres admin password and user to create a clean database, example `POSTGRES_PASSWORD=postgres`, if you are using a different configuration you need to see [Environment Variables](#environment-variables):

```shell
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:13
```

Remember to change the postgres port in case you have one previously running, example -p 5433:5432. You could use any postgres version in the Prerequisites Page.

```shell
docker run -d --name idempiere -p 8443:8443 --link postgres:postgres idempiereofficial/idempiere:10
```

For persistent data see the section Volumes.

Starting containers automatically here.

Open in the browser: https://127.0.0.1:8443/webui/

### Using Docker Commands With an External DB

<Tabs groupId="operating-systems">
  <TabItem value="linux" label="Linux">

```
docker run -d --name idempiere -p 8443:8443 --network host\
  -e DB_HOST=127.0.0.1\
  -e DB_PORT=5432\
  -e DB_NAME=idempiere\
  -e DB_USER=adempiere\
  -e DB_PASS=adempiere\
  -e DB_ADMIN_PASS=postgres\
  idempiereofficial/idempiere:10
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```
docker run -d --name idempiere -p 8443:8443 ^
  -e DB_HOST=0.0.0.0 ^
  -e DB_PORT=5432 ^
  -e DB_NAME=idempiere ^
  -e DB_USER=adempiere ^
  -e DB_PASS=adempiere ^
  -e DB_ADMIN_PASS=postgres ^
  idempiereofficial/idempiere:10
```

  </TabItem>
</Tabs>

### Using Docker Stack (Docker Swarm or Docker Compose)

## Default Accounts

## Environment Variables

## Default Ports

## How does it work?
