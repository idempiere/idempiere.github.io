---
sidebar_position: 39
title: "Configurable Quick Entry"
sidebar_label: "Configurable Quick Entry"
description: "***Goal:** User Experience"
tags: [user-experience]
---
***Goal:** User Experience
***Sponsor:** [Trek Global](https://www.trekglobal.com)
***Technical Info:** [IDEMPIERE-498](http://idempiere.atlassian.net/browse/IDEMPIERE-498)

## Description
A new "Quick Entry" flag was added on field configuration in order to make Business Partner Quick Entry window more flexible, i.e. if you want to enable the field Birthday on the Quick Entry BP window then you must check the flag as shown:

![NF001 QuickEntry001](pathname:///img/new-features/v1.0/NF001_QuickEntry001.png)

Here is the result with some additional field enabled too.  And notice that this new Quick Entry windows can be extended via callouts and they also fill the preconfigured defaults.

![NF001 QuickEntry002](pathname:///img/new-features/v1.0/NF001_QuickEntry002.png)

And that's not all, you can enable this functionality for other windows too, for example, if you want to enable Quick Entry for Charges (if that makes sense for you) then you can configure it as shown:

![NF001 QuickEntry003](pathname:///img/new-features/v1.0/NF001_QuickEntry003.png)

Now, the charge fields will have New and Update options on the right click context menu.

**NOTE:** Context menu is smarter now, it doesn't enable zoom when zooming is not possible, for example when zoom window is not configured, or because the user doesn't have access to the zoom window.

![NF001 QuickEntry004](pathname:///img/new-features/v1.0/NF001_QuickEntry004.png)

The resulting Charge Quick Entry window looks like this:

![NF001 QuickEntry005](pathname:///img/new-features/v1.0/NF001_QuickEntry005.png)

There is also a plugin contributed that configure quick entry for many windows, you can check it at:
***Plugin Tool:** [Plugin:_QuickEntry](https://wiki.idempiere.org/en/Plugin:_QuickEntry)
***Movie:** [Watch on YouTube](https://www.youtube.com/watch?v=F4FN6yFwzDQ) by Red1 ([talk](https://wiki.idempiere.org/en/User_talk:Red1)).

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_QuickEntry)_
