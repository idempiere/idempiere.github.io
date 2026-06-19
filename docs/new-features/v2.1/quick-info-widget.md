---
sidebar_position: 22
title: "Quick Info Widget"
sidebar_label: "Quick Info Widget"
description: "**Contributor:** [Quality Systems & Solutions (GlobalQSS)](http://globalqss.com)"
tags: [user-experience]
---
**Goal:** Usability

**Contributor:** [Quality Systems & Solutions (GlobalQSS)](http://globalqss.com)

**Developer:** Carlos Ruiz

**Video:**

[Watch on YouTube](https://www.youtube.com/watch?v=lLtjxjklfZY) by Jan.thielemann - [evenos Consulting GmbH](http://evenos-consulting.de)

**Description:**

Now you can configure a QuickInfo widget to appear by any Window/Tab.

- Firstly you define a translatable message with the text you want to display in the status line. Please note the usage of the MessageFormat parameters.
- Here you can define positional parameters numbered from zero, describe the type (number, date, time, format, choice or undefined for a default string), and the format style.
- On the message you can even use basic html tags to format its title and values (i.e. bold, italic):

![01 QI Message](pathname:///img/new-features/v2.1/01_QI_Message.png)

- Then you define the associated query for the message. Please note the number of values returned by the query must match the number and order of the positional parameters of the message.
- You can (and maybe must) use context variables referencing the window fields to restrict the query:

![02 QI Query Used](pathname:///img/new-features/v2.1/02_QI_Query_Used.png)

- You can define more than one message/query for each window/tab/table:

![03 QI Query2 Used](pathname:///img/new-features/v2.1/03_QI_Query2_Used.png)

- The resulting QuickInfo widget is shown in next screenshot.
- When you type a business partner on Sales Order window the QuickInfo widget is filled with proper information:

![04 QI QuickInfo](pathname:///img/new-features/v2.1/04_QI_QuickInfo.png)

**Technical Info:** [IDEMPIERE-1684](http://idempiere.atlassian.net/browse/IDEMPIERE-1684)

**See also:** [Configurable Status Line](https://wiki.idempiere.org/en/NF2.1_Configurable_Status_Line), [Context Help Pane](https://wiki.idempiere.org/en/NF1.0_Context_Help_Pane), [Java Message Format](http://docs.oracle.com/javase/6/docs/api/java/text/MessageFormat.html)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Quick_Info_Widget)_
