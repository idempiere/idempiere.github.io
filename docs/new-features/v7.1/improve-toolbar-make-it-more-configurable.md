---
sidebar_position: 7
title: "Improve toolbar, make it more configurable"
sidebar_label: "Improve toolbar, make it more configurable"
description: "**Goal:** Functional - Usability"
tags: [user-experience]
---
**Goal:** Functional - Usability

**Developer:** Diego Ruiz

**Sponsor:** [BX Service GmbH](http://www.bx-service.com/)

**Description:**

The goal of the ticket is to improve the toolbar and make it more configurable, with a show More option to hide the less used buttons by default without inactivating them.

The feature improvement was designed as follows:

Open the Toolbar button window and check the “Group in show more” flag in the buttons that you want to hide by default.

![NF7.1ShowMore](pathname:///img/new-features/v7.1/NF7.1ShowMore.jpg)

Do this with all the buttons you want to group in the show more button.

Open any window and see that the selected buttons are now grouped in a new button on the right of the toolbar.

![Nf7.1ShowMoreButton](pathname:///img/new-features/v7.1/Nf7.1ShowMoreButton.jpg)

If you click on the button, a menu will pop up.

![NF7.1PopupMenu](pathname:///img/new-features/v7.1/NF7.1PopupMenu.jpg)

If you click on a button that shows an additional popup like Archived documents or report. The menu will be shown below the show more button.

In mobile mode, the new button replaces the arrows that were being displayed previously. It behaves similarly to how it does currently if the screen is not big enough to show all buttons, it will show the rest of the buttons in the more button. In bigger screen as tablets, even when the screen is big enough to display the buttons, it will show a more button on the right of the toolbar.

**Technical Info:** [IDEMPIERE-4084](https://idempiere.atlassian.net/browse/IDEMPIERE-4084)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF7.1_Show_More_Button_In_Toolbar)_
