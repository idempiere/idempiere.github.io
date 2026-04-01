---
title: Customization of email sent when server starts
sidebar_label: Customization of email sent when server starts
sidebar_position: 1
description: Allow to customize the content of the email sent when the iDempiere service starts
---

:::warning Not Yet in Stable Release
This feature is not yet part of a stable iDempiere release and may change.
:::

**Goal:** Technical  
**Developer:** [Nicolas Micoud](https://wiki.idempiere.org/en/User:Nmicoud) ([TGI](https://www.tgi.eu))  
**Feature Ticket:** [IDEMPIERE-6063](https://idempiere.atlassian.net/browse/IDEMPIERE-6063)

## Customization of email sent when server starts

Idea is to allow implementors to define which informations should be set in the email sent at server start.

You just have to define a Mail Template which can get any value from AD_Client and AD_System tables.

Moreover, some hardcoded variables are available:
- **ServerName**
- **ServerInfo**
- **Version**
- **SystemName**
- **SystemDescription**

nb: *SystemName* and *SystemDescription* need to be added there as AD_Client also has a Name and Description columns

For instance, the subject can be like :
`[@SystemName@] (@ServerName@) has started`

And the message: 
```
Version : @Version@
ServerInfo : @ServerInfo@
Status : @SystemStatus<Name>@
```

Which will results in:
Subject: [iDempiere] (8CC53311KQ:192.168.1.200) has started

Message: 
```
Version : 14.0.0.qualifier
ServerInfo : jetty/12.0.25
Status : Evaluation
```