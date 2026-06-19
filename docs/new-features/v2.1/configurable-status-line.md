---
sidebar_position: 14
title: "Configurable Status Line"
sidebar_label: "Configurable Status Line"
description: "**Developer:** Nicolas Micoud"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Nicolas Micoud

**Video:**

[Watch on YouTube](https://www.youtube.com/watch?v=lLtjxjklfZY) by Jan.thielemann - [evenos Consulting GmbH](http://evenos-consulting.de)

**Description:**

Now you can define in a configurable way a status line to be shown for any window/table (in past you needed to hack GridTab.getTrxInfo).

Firstly you define a translatable message with the text you want to display in the status line, please note the usage of the MessageFormat parameters.  Here you can define positional parameters numbered from zero, describe the type (number, date, time, format, choice or undefined for a default string), and the format style:

![01 SL Message](pathname:///img/new-features/v2.1/01_SL_Message.png)

Then you define the associated query for the message, please note the number of values returned by the query must match the number and order of the positional parameters of the message.  You can (and maybe must) use context variables referencing the window fields to restrict the query:

![02 SL Query Used](pathname:///img/new-features/v2.1/02_SL_Query_Used.png)

The resulting status line is shown in next screenshot:

![03 SL StatusLine](pathname:///img/new-features/v2.1/03_SL_StatusLine.png)

**Technical Info:** [IDEMPIERE-1150](http://idempiere.atlassian.net/browse/IDEMPIERE-1150)

**See also:** [Quick Info Widget](https://wiki.idempiere.org/en/NF2.1_Quick_Info_Widget), [Java Message Format](http://docs.oracle.com/javase/6/docs/api/java/text/MessageFormat.html)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Configurable_Status_Line)_
