---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker

## Purpose

The purpose of this page is to help you get iDempiere up and running with docker. For more advanced iDempiere docker topic see the [idempiere-docker](https://github.com/idempiere/idempiere-docker) github page.

## Docker Quick Start
iDempiere Docker uses a postgres admin password and user to create a clean database, example `POSTGRES_PASSWORD=postgres`
This is just an example, please choose a safer password for your instance, also you may need to change the postgres port in case you have one previously running, example `-p 5433:5432`. You could use any postgres version >= 11, in this example we use 16.

```shell
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:16
```

```shell
docker run -d --name idempiere -p 8443:8443 --link postgres:postgres idempiereofficial/idempiere:12-release
```
then you can follow the creation of the server using
```shell
docker logs -f idempiere
```
when finished, just open in the browser: [https://127.0.0.1:8443/webui/](https://127.0.0.1:8443/webui/)

## Alternative using Docker Compose Quick Start

Create a `docker-stack.yml` file:

```yaml
version: '3.7'

services:
  idempiere:
    image: idempiereofficial/idempiere:12-release
    volumes:
      - idempiere_config:/opt/idempiere/configuration
      - idempiere_plugins:/opt/idempiere/plugins
    environment:
      - TZ=America/Chicago
    ports:
      - 8080:8080
      - 8443:8443
      - 12612:12612

  postgres:
    image: postgres:16
    volumes:
      - idempiere_data:/var/lib/postgresql/data
    environment:
      - TZ=America/Chicago
      - POSTGRES_PASSWORD=postgres
    ports:
      - 5432:5432

volumes:
  idempiere_data:
  idempiere_plugins:
  idempiere_config:

```

Docker compose:

```bash
$ docker compose -f docker-stack.yml up
```
