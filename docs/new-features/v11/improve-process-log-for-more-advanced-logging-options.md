---
sidebar_position: 24
title: "Improve Process Log for more advanced logging options"
sidebar_label: "Improve Process Log for more advanced logging options"
description: "**Initiator**: Norbert Bede, Cloudempiere"
tags: [technical]
---
**Initiator**: Norbert Bede, Cloudempiere

**Developer**: Peter Takács, Cloudempiere

**Review**: Heng Sin Low, Carlos Ruiz, Chuck Boecking

**Feature** **Ticket**: https://idempiere.atlassian.net/browse/IDEMPIERE-5697

The main goal of this improvement was, to add the option of creating and updating Process Instance Logs (AD_PInstance_Log) during the execution of any process. Before this improvement, process developers could use only the "addLog" method, which flushes all logs at once, after the process is finished. The new methods for the continuous logging will be useful especially with long running processes.

## **Database changes**
For easier review of the logs a new field was added to AD_PInstance_Log: Log Type (PInstanceLogType). Three log types are differentiated: Status, Progress, Result.

## **How to use**
### Result log type - legacy functionality
The process developer can create Process Instance Logs through "addLog" methods. These logs are type: Result, they are saved into AD_PInstance_Log table after the process is executed.

```java

addLog(0, null, null, "This is a Result log");

```

### Status log type
Status logs can be created through "saveStatus" methods, they are saved to DB immediately when the method is called.

```java

saveStatus(0, null, null, "This is a Status log");

```

### Progress log type
Status logs can be created through "saveProgress" methods, they are saved to DB immediately when the method is called, and the AD_PInstance_Log_UU is returned. The difference between Status and Progress logs is, that Progress logs can be continuously updated through the "updateProgress" method.

```java

String progressLogUU = null;

for(int idx = 0; idx `<=` 100; idx+=10) {

```
   if(Util.isEmpty(progressLogUU))
```

```
       progressLogUU = saveProgress(0, null, null, "This is a Progress log: " + idx + "%");
```

    else

```
       updateProgress(progressLogUU, 0, null, null, "This is a Progress log: " + idx + "%");
```

}

```

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Improve_Process_Log_for_more_advanced_logging_options)_
