---
sidebar_position: 16
title: "Defaults for Fields in Send Mail Dialog"
sidebar_label: "Defaults for Fields in Send Mail Dialog"
description: "**Goal:** User Experience (Usability)"
tags: [user-experience]
---
**Goal:** User Experience (Usability)

**Developer:** Carlos Ruiz

## Description
A mechanism is implemented to fill with default values the variables in the Send EMail Dialog.

Because the needs are very different on every implementation, this needs to be done using an EventHandler plugin.

The plugin must register listening the event idempiere/reportSendEMail in the initialize method this way:
```java

@Override
protected void initialize() {
  registerEvent(IEventTopics.REPORT_SEND_EMAIL);
}

```

## Variables
And then in the doHandleEvent method the plugin can decide how to fill the context variables:
- CONTEXT_EMAIL_TO: To field - as EMail
- CONTEXT_EMAIL_USER_TO: To field - as User
- CONTEXT_EMAIL_CC: CC field - as EMail
- CONTEXT_EMAIL_USER_CC: CC field - as User
- CONTEXT_EMAIL_SUBJECT: Subject field
- CONTEXT_EMAIL_MESSAGE: Message field

## Example 1
For example, the following code will fill the To field as User:
- for orders with the invoice user
- for invoices with the user
when the user has an email configured

```java

@Override
protected void doHandleEvent(Event event) {
  String type = event.getTopic();
  if (IEventTopics.REPORT_SEND_EMAIL.equals(type)) {
    ReportSendEMailEventData ed = (ReportSendEMailEventData) event.getProperty(EventManager.EVENT_DATA);
    if (ed.getTableId() > 0 && ed.getRecordId() > 0
            && (ed.getTableId() == MOrder.Table_ID || ed.getTableId() == MInvoice.Table_ID)) {
      MTable table = MTable.get(ed.getTableId());
      PO po = table.getPO(ed.getRecordId(), null);
      int userId = -1;
      if (ed.getTableId() == MOrder.Table_ID) {
          userId = ((MOrder) po).getBill_User_ID();
      } else if (ed.getTableId() == MInvoice.Table_ID) {
          userId = ((MInvoice) po).getAD_User_ID();
      }
      if (userId > 0) {
        MUser user = MUser.get(userId);
        if (user != null && user.getEMail() != null) {
            Env.setContext(Env.getCtx(), ed.getWindowNo(), ReportSendEMailEventData.CONTEXT_EMAIL_USER_TO, userId);
        }
      }
    }
    return;
  }
}

```

## Example 2
Another example, the following code fill the EMail To (as User) field whenever the related table has a column with name AD_User_ID, and also fills the CC field when the table has a column with name SalesRep_ID.  Additionaly it prefills the message with the mail template with ID=100
```java

@Override
protected void doHandleEvent(Event event) {
  String type = event.getTopic();
  if (IEventTopics.REPORT_SEND_EMAIL.equals(type)) {
    ReportSendEMailEventData ed = (ReportSendEMailEventData) event.getProperty(EventManager.EVENT_DATA);
    if (   ed.getTableId() > 0
      && ed.getRecordId() > 0) {
      MTable table = MTable.get(ed.getTableId());
      PO po = table.getPO(ed.getRecordId(), null);
      int userId = -1;
      if (po.columnExists("AD_User_ID")) {
        userId = po.get_ValueAsInt("AD_User_ID");
        Env.setContext(Env.getCtx(), ed.getWindowNo(), ReportSendEMailEventData.CONTEXT_EMAIL_USER_TO, userId);
      }
      if (po.columnExists("SalesRep_ID")) {
        int repId = po.get_ValueAsInt("SalesRep_ID");
        MUser user = MUser.get(repId);
        Env.setContext(Env.getCtx(), ed.getWindowNo(), ReportSendEMailEventData.CONTEXT_EMAIL_CC, user.getEMail());
      }
      MMailText mt = new MMailText(Env.getCtx(), 100, null);
      mt.setUser(userId);
      String msg = Env.parseVariable(mt.getMailText(true), po, null, true);
      Env.setContext(Env.getCtx(), ed.getWindowNo(), ReportSendEMailEventData.CONTEXT_EMAIL_MESSAGE, msg);
    }
  }
}

```

**Technical Info:** [IDEMPIERE-4986](https://idempiere.atlassian.net/browse/IDEMPIERE-4986)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Defaults_for_Fields_in_Send_Mail_Dialog)_
