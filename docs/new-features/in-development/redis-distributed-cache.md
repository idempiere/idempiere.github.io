---
title: Redis as Distributed Cache Backend
sidebar_label: Redis as Distributed Cache Backend
sidebar_position: 3
description: Introduces org.idempiere.redis.service, an optional Redis-backed alternative to the Hazelcast distributed cache bundle.
---

**Goal:** Technical  
**Developer:** [Norbert Bede](https://github.com/norbertbede), [Peter Takacs](https://github.com/PeterTakacs300)  
**Feature Ticket:** [IDEMPIERE-6989](https://idempiere.atlassian.net/browse/IDEMPIERE-6989)

## Redis as an Alternative Distributed Cache Backend

iDempiere's distributed cache interfaces (`ICacheService`, `IMessageService`, `IClusterService`) are pluggable. Until now the only implementation was `org.idempiere.hazelcast.service`, which runs an embedded Hazelcast cluster inside each iDempiere JVM.

This feature introduces a new bundle — `org.idempiere.redis.service` — that implements the same interfaces using [Redisson](https://github.com/redisson/redisson) against an external Redis server. **Hazelcast remains the default.**

### Problem with Hazelcast in container environments

When iDempiere runs in containers (Docker, Kubernetes, ECS), every pod restart or rolling deployment causes Hazelcast to rebalance its partitions across the cluster. This leads to cache instability and increased database load until the cluster recovers. Since each JVM is part of the cluster, there is no way to restart a node without affecting the others.

### How Redis solves this

With Redis, the cache lives outside the iDempiere JVMs. Restarting or replacing a pod does not affect the cache, and other nodes continue working normally. This makes rolling deployments, autoscaling, and blue/green deploys safe without any special coordination.

### Setting it up

**1. Install Redis.** Any Redis 6+ instance works. For a quick local test: `docker run -p 6379:6379 redis`.

**2. Swap the P2 feature.** Using p2director, uninstall `org.idempiere.hazelcast.service.feature.feature.group` and install `org.idempiere.redis.service.feature.feature.group`.

**3. Configure the connection.** Copy `redis-template.yaml` (bundled in `org.adempiere.server-feature`) to `$IDEMPIERE_HOME/redis.yaml` and uncomment the topology block that matches your setup. The template includes single-node, Sentinel, and Cluster examples with inline comments.

**4. Enable the backend.** Add the JVM argument `-Didempiere.distributed.backend=redis` (or set `IDEMPIERE_DISTRIBUTED_BACKEND=redis`) and restart iDempiere. This flag is required — installing the bundle alone is not enough. Without it the Redis bundle stays passive; if Hazelcast was also removed in step 2, the server will start with no distributed cache provider. If you kept Hazelcast installed alongside Redis, omitting this flag leaves Hazelcast as the active backend.

A key prefix (`idempiere:<INSTANCE_NAME>:`) is applied automatically to all Redis keys. The instance name is resolved in this order: `redis.instance.name` property, `IDEMPIERE_INSTANCE_NAME` environment variable, `ADEMPIERE_DB_NAME`, falling back to `"default"`. This avoids key collisions when multiple deployments share a Redis instance.

### Capabilities

- **Caching**: Map, List, and Set operations. An optional Caffeine near-cache can be enabled per cache for fast in-memory reads.
- **Distributed locks**: tryLock / unlock support via Redisson RLock.
- **Messaging**: Fire-and-forget pub/sub via RTopic. Durable delivery using Redis Streams (RReliableTopic) is available as an opt-in.
- **Cluster membership**: Nodes register themselves using heartbeat keys. No Hazelcast discovery configuration is needed.
- **Remote execution**: IClusterService.execute() is supported via topic-based request/response. Calls can target a single member or a list of members.
- **Resilience**: A circuit breaker detects Redis unavailability. Optionally, iDempiere can fall back to a local in-memory cache while Redis is down.
- **Diagnostics**: OSGi console commands are available to inspect Redis state: `redisStatus`, `redisHealth`, `redisMembers`, `redisKeys`, `redisBound`, `redisKeyspace`.
