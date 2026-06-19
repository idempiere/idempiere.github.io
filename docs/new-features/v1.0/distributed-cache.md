---
sidebar_position: 54
title: "Distributed Cache"
sidebar_label: "Distributed Cache"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [technical]
---
**Goal:** Technical

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

iDempiere have build in support for distributed cache for a load balance environment. The distributed cache is implemented using the opensource [Hazelcast](http://www.hazelcast.com/) library.

From functional perspective it means for example that changes made on server are seen automatically by swing clients (or other servers) and viceversa.  No need to reset cache to refresh the changes done on other instances.

**Configuration:**

Download the default configuration from https://bitbucket.org/idempiere/idempiere/downloads/hazelcast.xml and copy it to your iDempiere home folder. The first changes you should make to the default configuration is to assigned it a unique group name ( see http://www.hazelcast.com/docs/1.9.4/manual/multi_html/ch11s03.html ). For other configuration options, please refer to the official Hazelcast documentation at http://www.hazelcast.com/docs/1.9.4/manual/multi_html/ch11.html

Since iDempiere 3.x ([IDEMPIERE-2245](https://idempiere.atlassian.net/browse/IDEMPIERE-2245)) you don't have to set the hazelcast group anymore because there is a sufficient default value set by the installation process.

**API Changes:**

Three constructor have been added to CCache:

public CCache (String name, int initialCapacity, int expireMinutes, boolean distributed)

public CCache (String tableName, String name, int initialCapacity, boolean distributed)

public CCache (String tableName, String name, int initialCapacity, int expireMinutes, boolean distributed)

Pass true for the distributed parameter to allocate distributed cache instance.

**Bundle:**

org.idempiere.hazelcast.service is the bundle that implement the distributed cache service. If you disable or stop this bundle, the system will fallback to local, non-distributed cache.

**Technical Info:** [IDEMPIERE-491](https://idempiere.atlassian.net/browse/IDEMPIERE-491)

## Using separate instances
If you have several server instances on one machine or in one lan they will distribute their caches through the hazelcast. If you do not want that behaviour, e.g. because you use different instances for production and testing you better use different hazelcast groups. To do that you have to create a hazelcast.xml file (you can use the link up on this page for an example) and set a name in the &lt;group&gt; element. (See meeting minutes from 2014-06-25)

**Best Practices:**

Norbert Bede experience - version 7.1 - hazelcast makes group by database username. This was a problem for me when i had application servers with multiple postgres users in same cluster. As CarlosRuiz suggested, this can be done by changing hazelcast-template.xml around line 35--&gt; DEFAULT is: &lt;name&gt;@ADEMPIERE_DB_USER@.@ADEMPIERE_DB_NAME@/@ADEMPIERE_DB_SERVER@&lt;/name&gt; Can be changed to &lt;name&gt;@ADEMPIERE_DB_NAME@/@ADEMPIERE_DB_SERVER@&lt;/name&gt;

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Distributed_Cache)_
