---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker

## Purpose

The purpose of this page is to help you get iDempiere up and running with docker. For more advanced iDempiere docker topic see the [idempiere-docker](https://github.com/idempiere/idempiere-docker) github page.

## Docker Quick Start

```shell
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:13
```

```shell
docker run -d --name idempiere -p 8443:8443 --link postgres:postgres idempiereofficial/idempiere:10
```

## Docker Compose Quick Start

Create a `docker-stack.yml` file:

```yaml
version: '3.7'

services:
  idempiere:
    image: idempiereofficial/idempiere:11-release
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
    image: postgres:15
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
