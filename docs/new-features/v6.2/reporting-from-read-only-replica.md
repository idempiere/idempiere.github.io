---
sidebar_position: 14
title: "Reporting from Read-Only Replica"
sidebar_label: "Reporting from Read-Only Replica"
description: "**Goal:** Technical (Performance)"
tags: [technical]
---
**Goal:** Technical (Performance)

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Developer:** Carlos Ruiz

**Description:**

Some reports can create huge CPU and disk stress on the database, the reporting engine from iDempiere provides an ad-hoc way for users to create and shape their own reports, that's a big advantage, but also it can have a penalty on performance of the production database.

In order to relieve the production database from the stress of some heavy reports, it is possible now to configure a read-only replication and reports can be issued directly from the replica database, not affecting the CPU and disk from the master database, but from the replica server.

**Configuration:**

Configuring this new feature is simply filling properly the following SysConfig parameters:
- **[DB_READ_REPLICA_URLS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#DB_READ_REPLICA_URLS):** In this you can define one or several JDBC URLs pointing to the replica database(s), if there are more than one URL, they must be separated by the pipe character (|)
- **[DB_READ_REPLICA_NORMAL_TIMEOUT_IN_MILLISECONDS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#DB_READ_REPLICA_NORMAL_TIMEOUT_IN_MILLISECONDS):** Timeout in milliseconds to wait between discoveries of a synchronized read-only replica.  To give time to the replicas to synchronize with master.
- **[DB_READ_REPLICA_NORMAL_MAX_ITERATIONS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#DB_READ_REPLICA_NORMAL_MAX_ITERATIONS):** Number of iterations to check that the replica is synchronized before giving up.

**Verification of replica synchronization:**

Just reports running without a transaction can be executed from the replica, this is because the replica is not synchronized until the transaction is committed, so is not possible to read an uncommitted record from the replica server.

Before executing a report from the replica there are several validations that are checked to ensure the report is consistent with what the user expects:

- The system connects to the first replica, if the verifications don't pass, then it connects and verify the second replica ... and so on

- Firstly it verifies if the value of AD_System.DBAddress matches in master and replica database
    - if the DBAddress doesn't match then the replica is marked as invalid and is not used anymore

- Next it verifies if the replica is synchronized, mechanism works this way:
    - Before executing the report the system register the timestamp in the unique record of the table DBReplicaSyncVerifier.LastUpdate, and then when reading the replica verifies if that timestamp has already being recorded in the replica
- if the replica is not in sync, then tries the next URL, when all URLs are exhausted then the system waits for DB_READ_REPLICA_NORMAL_TIMEOUT_IN_MILLISECONDS milliseconds, and then try again for a maximum number of DB_READ_REPLICA_NORMAL_MAX_ITERATIONS times
- if after all iterations it cannot find a valid replica in sync, then the report is executed from the master database

**Technical Notes:**

This feature opens a direct connection to the replica database, not using a connection pool, it simply opens the connection, execute the report and close the connection.

**Technical Notes for PostgreSQL:**

Sometimes postgresql throws error when running a big query on a read-only replica - this can happen because the query takes too long.

In such cases, the following postgresql.conf parameters can help:
 max_standby_archive_delay=-1
 max_standby_streaming_delay=-1
See [runtime-config-replication on PostgreSQL documentation](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-ARCHIVE-DELAY)

**Technical Info:** [IDEMPIERE-3850](https://idempiere.atlassian.net/browse/IDEMPIERE-3850)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_Reporting_from_Read-Only_Replica)_
