---
sidebar_position: 12
title: "Platform Upgrade"
sidebar_label: "Platform Upgrade"
description: "**Goal:** User Experience"
tags: [architecture]
---
**Goal:** User Experience

**Description:**

Release 3.0 represents an important upgrade:

***Platform***
- The project now run on Eclipse 4.4.1 (Luna)
- Equinox was upgraded to 3.10 ( OSGi R6 )

***ZK***
- Zk7.0.3
- Zk8 under [experimental branch](http://experimental.idempiere.org/webui/) by Hiep LQ

***Java***
- Project now can be compiled with Java 7 and can run with Java 8 (java6 support is be deprecated on r3)

***Web Server/Servlet Container***
- Jetty 9.2.3 ( Servlet 3.1, JSP 2.2 ) has been chosen as a replacement for Tomcat

***Oracle***
- Support for oracle 10GXE has been deprecated, now it's necessary to run on oracle>=11G (including XE version)

***Jasper***
- Jasper has been upgraded to 5.6.1

***Libraries***
- Hazelcast 3.5.3
- postgresql-9.4-1204.jdbc41.jar
- c3p0-0.9.5.jar
- ojdbc7.jar
- cron4j-2.2.5.zip
- jcommon-1.0.23
- jfreechart-1.0.19
- super-csv-2.2.0
- vt-password-3.1.2
- atmosphere-runtime-1.0.4.jar

You can find some hints collected from Hieplq in the page [Update your development environment zk7 branch](https://wiki.idempiere.org/en/Update_your_development_environment_zk7_branch)

**Technical Info:** [IDEMPIERE-2245](http://idempiere.atlassian.net/browse/IDEMPIERE-2245)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF3.0_Platform_Upgrade)_
