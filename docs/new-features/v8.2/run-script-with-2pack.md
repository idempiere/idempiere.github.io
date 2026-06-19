---
sidebar_position: 26
title: "Run Script with 2Pack"
sidebar_label: "Run Script with 2Pack"
description: "**Developer:** Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developer:** Carlos Ruiz

**Sponsor:** [FH](https://www.fh.com.br/)

**Description:**

*Pack In* (2Pack) is now able to run scripts when being imported, two types of scripts are supported: Shell Scripts and JSR223 Scripts.

When defining the *Pack Out* there are two new options:

- **Script JSR223:** This allows to execute JSR223 scripts on beanshell or groovy
- **Shell Script:** This allows to execute a shell script in the server

When one of these options is selected, a field *Execution Code* is displayed to enter the desired script.

![01 Script2Pack](pathname:///img/new-features/v8.2/01_Script2Pack.png)

## Shell Script
When running a shell script the *Pack In* process creates a temporary file in the server with the name like 2PackShellScript_[random].sh and executes it.

For example this script creates a temporary file with a timestamp and the list of files in log folder:

```bash

TS=$(date +%Y%m%d%H%M)
OUTF=/tmp/2Pack_IDEMPIERE-4968_$TS.out
date > $OUTF
ls -l log >> $OUTF
exit 0

```

## JSR223 Beanshell
By default the script language to execute this java-like code is [beanshell](http://www.beanshell.org/).

For example this script can run the *Initial Client Setup* process directly from *Pack In*:

```java

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import org.adempiere.util.ProcessUtil;
import org.compiere.process.ProcessInfo;
import org.compiere.process.ProcessInfoParameter;

ProcessInfo pi = new ProcessInfo("Initial Client Setup", 53161);
pi.setAD_Client_ID(A_AD_Client_ID);
pi.setAD_User_ID(A_AD_User_ID);
pi.setClassName("org.adempiere.process.InitialClientSetup");
String timeStamp = new SimpleDateFormat("yyyyMMddHHmm").format(new Date());
ProcessInfoParameter p_ClientName=new ProcessInfoParameter("ClientName", "Test Client "+timeStamp, null, null, null);
ProcessInfoParameter p_OrgValue=new ProcessInfoParameter("OrgValue", "HQ", null, null, null);
ProcessInfoParameter p_OrgName=new ProcessInfoParameter("OrgName", "HeadQuarters", null, null, null);
ProcessInfoParameter p_AdminUserName=new ProcessInfoParameter("AdminUserName", "AdminTestClient" + timeStamp, null, null, null);
ProcessInfoParameter p_NormalUserName=new ProcessInfoParameter("NormalUserName", "UserTestClient" + timeStamp, null, null, null);
ProcessInfoParameter p_IsSetInitialPassword=new ProcessInfoParameter("IsSetInitialPassword", "Y", null, null, null);
ProcessInfoParameter p_C_Currency_ID=new ProcessInfoParameter("C_Currency_ID", 100., null, null, null);
ProcessInfoParameter p_C_Country_ID=new ProcessInfoParameter("C_Country_ID", 100, null, null, null);
ProcessInfoParameter p_C_Region_ID=new ProcessInfoParameter("C_Region_ID", 116, null, null, null);
ProcessInfoParameter p_CityName=new ProcessInfoParameter("CityName", "Vancouver", null, null, null);
ProcessInfoParameter p_IsUseBPDimension=new ProcessInfoParameter("IsUseBPDimension", "Y", null, null, null);
ProcessInfoParameter p_IsUseProductDimension=new ProcessInfoParameter("IsUseProductDimension", "Y", null, null, null);
ProcessInfoParameter p_IsUseProjectDimension=new ProcessInfoParameter("IsUseProjectDimension", "N", null, null, null);
ProcessInfoParameter p_IsUseCampaignDimension=new ProcessInfoParameter("IsUseCampaignDimension", "N", null, null, null);
ProcessInfoParameter p_IsUseSalesRegionDimension=new ProcessInfoParameter("IsUseSalesRegionDimension", "N", null, null, null);
ProcessInfoParameter p_IsUseActivityDimension=new ProcessInfoParameter("IsUseActivityDimension", "N", null, null, null);
ProcessInfoParameter p_UseDefaultCoA=new ProcessInfoParameter("UseDefaultCoA", "Y", null, null, null);
ProcessInfoParameter p_InactivateDefaults=new ProcessInfoParameter("InactivateDefaults", "Y", null, null, null);
pi.setParameter(new ProcessInfoParameter[] { p_ClientName, p_OrgValue, p_OrgName, p_AdminUserName, p_NormalUserName,
		p_IsSetInitialPassword, p_C_Currency_ID, p_C_Country_ID, p_C_Region_ID, p_CityName, p_IsUseBPDimension,
		p_IsUseProductDimension, p_IsUseProjectDimension, p_IsUseCampaignDimension, p_IsUseSalesRegionDimension,
		p_IsUseActivityDimension, p_UseDefaultCoA, p_InactivateDefaults });
ProcessUtil.startJavaProcess(A_Ctx, pi, A_Trx, false);
result = pi.getSummary();

```

Another example for a script that executes cache reset on AD_Column
```java

org.compiere.util.CacheMgt.get().reset("AD_Column")

```

## JSR223 Groovy
To instruct the *Pack In* to execute [groovy](https://groovy-lang.org/) simply add a comment with the string @script:groovy somewhere in the script.

**IMPORTANT NOTE:** In tests it was noticed that in some cases beanshell doesn't support calling custom classes (from external plugins), while groovy works fine with those.

For example the following groovy script deletes records from T_Report table for all instances on the current client:

```java

/* @script:groovy */
import org.compiere.util.DB;

/* Delete all records from T_Report associated with the current client */
String sql = "DELETE FROM T_Report WHERE AD_PInstance_ID IN (SELECT AD_PInstance_ID FROM AD_PInstance WHERE AD_Client_ID=" + A_AD_Client_ID + ")";
int no = DB.executeUpdate(sql, A_TrxName);
result = "OK, deleted "+no+" rows from table T_Report";

```

## Logging
In order to have a better control of what is 2Pack executing a logging option was added to the *Package Maintenance* window:

![02 2PackLogging](pathname:///img/new-features/v8.2/02_2PackLogging.png)

**Technical Info:** [IDEMPIERE-4968](https://idempiere.atlassian.net/browse/IDEMPIERE-4968)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Run_Script_With_2Pack)_
