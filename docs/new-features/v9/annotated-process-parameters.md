---
sidebar_position: 38
title: "Annotated Process Parameters"
sidebar_label: "Annotated Process Parameters"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Saulo Gil

**Feature Ticket:** [IDEMPIERE-5025](https://idempiere.atlassian.net/browse/IDEMPIERE-5025)

**Description:**

This feature was created in order to simplify the task of reading process parameters by using the new @Parameter annotation. Here's a comparison between new and the traditional way of achieving this goal, using the OrderBatchProcess class as reference.

*Using this feature*

```java
 @org.adempiere.base.annotation.Process
 public class OrderBatchProcess extends SvrProcess
 {
   @Parameter
   private int      p_C_DocTypeTarget_ID = 0;
   @Parameter
   private String     p_DocStatus = null;
   @Parameter
   private int      p_C_BPartner_ID = 0;
   @Parameter
   private String     p_IsSelfService = null;
   @Parameter
   private Timestamp  p_DateOrdered_From = null;
   @Parameter
   private Timestamp  p_DateOrdered_To = null;
   @Parameter
   private String     p_DocAction = null;
   @Parameter
   private String     p_IsDelivered = null;
   @Parameter
   private String     p_IsInvoiced = null;

   protected void prepare (){ /* nothing else to do here */ }
 }
```

*Traditional way*

```java
 protected void prepare ()
 {
   ProcessInfoParameter[] para = getParameter();
   for (int i = 0; i < para.length; i++)
   {
     String name = para[i].getParameterName();
     if (para[i].getParameter() == null && para[i].getParameter_To() == null)
       ;
     else if (name.equals("C_DocTypeTarget_ID"))
       p_C_DocTypeTarget_ID = para[i].getParameterAsInt();
     else if (name.equals("DocStatus"))
       p_DocStatus = (String)para[i].getParameter();
     else if (name.equals("IsSelfService"))
       p_IsSelfService = (String)para[i].getParameter();
     else if (name.equals("C_BPartner_ID"))
       p_C_BPartner_ID = para[i].getParameterAsInt();
     else if (name.equals("DateOrdered"))
     {
       p_DateOrdered_From = (Timestamp)para[i].getParameter();
       p_DateOrdered_To = (Timestamp)para[i].getParameter_To();
     }
     else if (name.equals("DocAction"))
       p_DocAction = (String)para[i].getParameter();
     else if (name.equals("IsDelivered")) {
       p_IsDelivered = (String)para[i].getParameter();
     } else if (name.equals("IsInvoiced")) {
       p_IsInvoiced = (String)para[i].getParameter();
     }
     else
       log.log(Level.SEVERE, "Unknown Parameter: " + name);
   }
 }  //  prepare
```

In case the class attribute name doesn't match the parameter name, we can use the name annotation attribute as follows:

```
   @Parameter(name = "declaredName")
   private String parameter = null;
```

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Annotated_Process_Parameters)_
