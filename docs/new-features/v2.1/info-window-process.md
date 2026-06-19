---
sidebar_position: 34
title: "Info Window Process"
sidebar_label: "Info Window Process"
description: "**Include Sub-Info tabs, IDEMPIERE-1045 by Xolali**"
tags: [technical]
---
**Include Sub-Info tabs, IDEMPIERE-1045 by Xolali**

**Goal:** Technical improvement

**Contributors:** Red1 ([talk](https://wiki.idempiere.org/en/User_talk:Red1)), assisted by Heng Sin, reviewed by Carlos Ruiz. Hiep Le Q for [Multi-process options](http://idempiere.atlassian.net/browse/IDEMPIERE-1334). MULTIMAGE/Norbert Bede (Design and test)

**Sponsor:** SYSNOVA (http://www.sysnova.com)

**Technical Info:** [IDEMPIERE-1711](http://idempiere.atlassian.net/browse/IDEMPIERE-1711), [IDEMPIERE-1045](http://idempiere.atlassian.net/browse/IDEMPIERE-1045), [Multi-process options IDEMPIERE-1334](http://idempiere.atlassian.net/browse/IDEMPIERE-1334)

**Version:** Only works in ZK AJAX UI (HTML Browser User Interface)

**User/Developer Guide:** [INFOWINDOW.PDF](http://sourceforge.net/projects/red1/files/ADempiere%20PDFs/InfoWindow.pdf/download)

**Movies**
- [Watch on YouTube](https://www.youtube.com/watch?v=MHj7Nl2ZXp8)
- [Watch on YouTube](https://www.youtube.com/watch?v=6lp3n8jKBPw)

![InfoWindowProcess](pathname:///img/new-features/v2.1/InfoWindowProcess.jpg)

## Description
- As extension of [NF001_Info_Window](https://wiki.idempiere.org/en/NF001_Info_Window), now with an extra Process button that is configured in the Info Window to a defined process.
- The Process class has to access the T_Selection table which stores the selected multiple records in the Info Window.
- This is very simple and convenient to use as the Info Window can be configured to display a set of records in a SQL JOIN plan.
- If only single record selected the Zoom button will enable for Look-Up.

## Backward Compatible
![InfoWindowNoProcess](pathname:///img/new-features/v2.1/InfoWindowNoProcess.png)
- What is amazing about this feature is that if the Process field is not set in the System setup, it will maintain the old look of no Process button and radio button selection for Zoom and look up the main document.
- While in Process mode, it can still do the same Zoom, only if a single record is selected.
- The above screen-shot shows the same Info Window without the Process setting. Notice the change in multiple check boxes to radio buttons for single selection.

## Setting Up
- Login Role as System to access the Info Window
- You will see the Process field which you can assign any Process intended for that Info Window.
![InfoWindowSetProcess](pathname:///img/new-features/v2.1/InfoWindowSetProcess.png)
- Then changing Role to GardenAdmin, you can call up the Info Window and see a Process icon at the bottom.
- After putting in criteria or leaving them blank, press Requery to obtain a list of output.
- After selecting one or more records in the output, the Process icon will enable for you to press it to go to your process.
- Complete through and a finished process message is displayed.
- Check your results as programmed in the process.

## Pop-Up Process Dialog
![InfoWindowPopUpProcess](pathname:///img/new-features/v2.1/InfoWindowPopUpProcess.png)
- The Process dialog is the same as usually expected but it will take the selected records only for processing.
- In order to do that you have to introduce a simple change in your Process class.
- You can see above the Process dialog and when OK is submitted, it will execute the process and then show a response message as shown below.
- The selected records would then disappear leaving the remaining not selected and not processed records for later review.
![InfoWindowProcessEnd](pathname:///img/new-features/v2.1/InfoWindowProcessEnd.png)

_45-px_

## Programming the Process Class
- Because InfoPanel class will embed your data set as:
 // store in T_Selection table selected rows for Execute Process that retrieves from T_Selection in code.
   DB.createT_Selection(instance.getAD_PInstance_ID(), getSelectedKeysCollection(),
- You process class should pick it up with this real life sample from Libero WMS plugin, at the doIt() method:
![InfoWindowProcessClass](pathname:///img/new-features/v2.1/InfoWindowProcessClass.png)

## Synched with Sub-Info Tabs
- While releasing this feature, we also merged new changes from http://idempiere.atlassian.net/browse/IDEMPIERE-1045 as shown below.
- It can further display sub-tabs of Info Windows related to the main Info Window.
![SubInfoTabs](pathname:///img/new-features/v2.1/SubInfoTabs.png)
- The Info Window framework is so robust that even when I added a Related Info Window to the Process type of main Info Window it still maintain data operational integrity as shown below.
- Note also the right arrow down crumb control to reduce the lower sub panel.
![InfoCombo](pathname:///img/new-features/v2.1/InfoCombo.png)

## Run Multi Process
http://idempiere.atlassian.net/browse/IDEMPIERE-1334

- InfoWindow process definition has moved to the Window>Process Tab in more elegant manner.
- Multiple processes can appear as a series of buttons, a list in Combobox or Menu.
    - This is defined in the **Layout Type** value.
    - Each process can even have its own icon image using **Image URL**.
![Info process config](pathname:///img/new-features/v2.1/Info_process_config.png)

- Under that tab the Help panel is usable when focus button or selection is made.
![info process demo](pathname:///img/new-features/v2.1/info_process_demo.png)

- Present definition of Layout Type default layout type is set at:
    - Table AD_InfoProcess, Column LayoutType, Default Logic set to B (button)where you can change to your preferred mode.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Process_on_Info_Window)_
