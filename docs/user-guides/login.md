---
sidebar_position: 1
---

# Login

Some more Text


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

