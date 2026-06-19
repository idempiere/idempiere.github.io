---
sidebar_position: 7
title: "Automatic External Pack In"
sidebar_label: "Automatic External Pack In"
description: "**Developers:** Diego Ruiz, Carlos Ruiz"
tags: [technical]
---
**Goal:** Technical

**Developers:** Diego Ruiz, Carlos Ruiz

**Sponsors:**  [TrekGlobal](http://www.trekglobal.com/),  [FH](http://www.fh.com.br//)

**Description:**

iDempiere architecture provides a way to install automatically 2Pack files that are inside plugins with several mechanisms depending on the plugin activator chosen in the plugin:

- org.adempiere.plugin.utils.AdempiereActivator: search and install a single file located at META-INF/2Pack.zip
- org.adempiere.plugin.utils.Version2PackActivator: search and install multiple files located at META-INF with the convention 2Pack_[version].zip - example: 2Pack_1.0.0.zip, 2Pack_1.0.1.zip - this activator install 2Pack files until the version of the plugin
- org.adempiere.plugin.utils.Incremental2PackActivator: it works same as Version2PackActivator, except that it applies ALL 2Pack_[version].zip files located at META-INF independently from the plugin version

There are two limitations for these plugin 2packs:
1. they must be inside a plugin, sometimes you just want to install a 2pack, without requiring a plugin to be developed and installed
1. they can apply just on System client, if there are data to install on another clients, plugin 2Packs are not the tool

To solve these limitations, an additional mechanism named **Automatic External Pack In**has been implemented.

There are two ways to use this new feature:**Automatic on server restart:**

The automatic application on server restart is driven by the following SysConfig keys:
- [AUTOMATIC_PACKIN_FOLDERS](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#AUTOMATIC_PACKIN_FOLDERS): This key defines a folder, or a set of folders separated by semicolon (;). When starting the plugin org.adempiere.plugin.utils, it searchs for new packins to apply present on these folders and applies them automatically
- [AUTOMATIC_PACKIN_INITIAL_DELAY](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#AUTOMATIC_PACKIN_INITIAL_DELAY): Time in seconds that org.adempiere.plugin.utils waits before starting to process the AUTOMATIC_PACKIN_FOLDERS, this is useful in order to wait for the internal plugins to be processed first
- [AUTOMATIC_PACKIN_RETRIES](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#AUTOMATIC_PACKIN_RETRIES): When applying automatically a 2Pack, this defines the number of retries to wait for the semaphore when other plugins are applying 2Packs, this is used in combination with AUTOMATIC_PACKIN_TIMEOUT
- [AUTOMATIC_PACKIN_TIMEOUT](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#AUTOMATIC_PACKIN_TIMEOUT): When applying automatically a 2Pack, this defines the waiting time to try to get the semaphore when other plugins are applying 2packs, this is used in combination with AUTOMATIC_PACKIN_RETRIES
- [AUTOMATIC_PACKIN_PROCESSING](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#AUTOMATIC_PACKIN_PROCESSING): This key is used internally by the automatic application of 2Packs as a semaphore to indicate that another 2Pack is being applied, is not intended to be managed by user, but automatically managed by the system.

**Running "Apply Pack In from Folder" Process:**

![01 ApplyPackInFromFolder](pathname:///img/new-features/v5.1/01_ApplyPackInFromFolder.png)

**ZIP File Name Notation:**

The key part to let the process know how to process is the filename notation.

The names of the files must follow the following conventions: [Timestamp]_[ClientValue]_[AdditionalInformation].zip
- Timestamp: this must follow the convention yyyymmddHHMM (from year to minute) - it is important as ALL the files are applied ordered by this timestamp, independently of the folder they are located
- ClientValue: case sensitive string to identify in which client the 2Pack file must be installed, this is compared against AD_Client.Value - Please note that in order to fulfill this convention the values of this field cannot contain the character underscore (_)
    - ClientValue has a special case to enable installing a 2Pack file in ALL the clients, this is useful for example if you want to install a new record in a table in ALL your clients (suppose a new Tax record), in order to achieve this your Client Value can be:
      - **ALL-CLIENTS:** This special ClientValue means that you want to install this 2Pack in ALL your non-System clients
      - **ALL-CLIENTS-[SeedClientValue]:** This special ClientValue means that you want to install this 2Pack **FIRSTLY** in the client with the ClientValue=SeedClientValue, and then in ALL your other non-System clients
- Additional Information: Optional additional information to identify the zip file

Examples:
- 201803161725_SYSTEM_CreateNewColumn.zip - this 2Pack will be installed in SYSTEM client
- 201803161735_GardenWorld_CreateNewTax.zip - this 2Pack will be installed JUST in GardenWorld client
- 201803161745_ALL-CLIENTS_CreateNewTax.zip - this 2Pack will be installed in ALL non-System clients
- 201803161755_ALL-CLIENTS-GardenWorld_CreateNewTax.zip - this 2Pack will be installed FIRSTLY in GardenWorld client and then in ALL the other non-System clients

**What is the usage of a Seed client?**

2Pack is able to create records in multiple clients provided a single 2Pack.

But, most importantly, 2Pack is able to **UPDATE** records in multiple clients, provided you installed it correctly.

This is, the first client where the 2Pack is creating records takes the UUID from the 2Pack file.

Other clients processed later will create a conversion UUID map (internally this is table AD_Package_UUID_Map) - when installing new 2Packs, the process is able to understand that a record is being updated from the Seed client and updates the record in the client being installed as well.

**Flow Description:**

Both processes work the same way:

- Look into the folder (or folders) searching recursively for files with extension .zip
- Order all the files **based on timestamp** (See [Discussion](https://wiki.idempiere.org/en/Talk:NF5.1_Automatic_External_Packin) page for comments from Hieplq about a possible different implementation per folder)
- For each zip file:
    - Identify the client or clients to install (when ALL-CLIENTS is used then it creates a list of the clients to install, starting with the defined Seed according to the convention)
    - For each tenant:
      - Apply the zip file in the corresponding tenant
      - The result of this application creates a record that can be reviewed in the PackIn window
    - If the application was successful in ALL-CLIENTS then it creates a record on System mentioning that fact, it can be reviewed in the PackIn window
- An ERROR on any ZIP file **stops the processing of subsequent files** - and this is informed in the console or process log

**EMail Notification:**

In order to get notifications (success or failure) of every applied 2Pack you need to:
- Configure properly the EMail on the tenants you want to be notified - the Request EMail must be configured as well as this is used for the From in the EMail
- Configure the SysConfig key **[EMAIL_NOTIFY_2PACK](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#EMAIL_NOTIFY_2PACK)**: This key defines an email or list of emails separated by comma (,). When defined the application of a 2Pack zip file (automatic or manual) will send a notification email to the emails on the list. This key can be configured by tenant and for System, the emails configured for System will be added to the list when processing a tenant.

**Technical Info:** [IDEMPIERE-3551](http://idempiere.atlassian.net/browse/IDEMPIERE-3551), [IDEMPIERE-3660](http://idempiere.atlassian.net/browse/IDEMPIERE-3660)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF5.1_Automatic_External_Packin)_
