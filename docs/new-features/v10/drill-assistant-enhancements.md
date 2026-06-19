---
sidebar_position: 28
title: "Drill Assistant Enhancements"
sidebar_label: "Drill Assistant Enhancements"
description: "**Goal:** UX/Functional"
tags: [user-experience]
---
**Goal:** UX/Functional

**Developer:** cloudempiere, review by @hengsin

**Feature Ticket: [IDEMPIERE-5302](https://idempiere.atlassian.net/browse/IDEMPIERE-5302)**

**Description:**

This enhancement allows to define Drill Rules for admins, then users are allowed to run new reports with predefined parameters by Drill Assistant from previously rendered report.

Example: user opens Storage Per Report  Report, he identifies a specific product which has idle storage qty and wants to analyse sales history. So click on column Product and start Drill Assistant.

**Changes:**

- New window: Process Drill Rule

- Refactored: Capture parameters from Scheduler - generalised/extended functionality for Drill Rules Parameter generation

- Table has new field: isShowInDrillOptions - if set to N - default - then automatic DrillDown enabled/disabled (too many unusable drill was generated.)

- New Popup Window => Drill Assistant - Has 2 modes: A. Drill Rules (list all drill rules and their print format)  B. Table - legacy mode. (must be enabled in App Dict with isShowInDrillOptions)

## Configuration
#### STEP 1 - Configure Drill Rule
![Drill rule window procparameter](pathname:///img/new-features/v10/Drill-rule-window-procparameter.png)

**Drill Rules configuration steps/explanation:**
1. Enter name Drill Rule and description - to be displayed, tip: can be specific eg. Last year order details.
1. Actions Group => Process - meaning report to be start - with parameters defined on parameter tab.
1. Actions Group => Show Help - 2 options A. silent mode - no parameters asking B. With opening parameter panel.
1. Source Group => Table loaded from process report view read only
1. Source Group => Select a Report view (you can make multiple report view for the same application table eg. group by bpartner should reduce rv_orderdetail to bpartner - > means result return report per bpartner)
1. Print format if defined then only 1 drill rule print format explored - otherwise each print format created based on table or Report View  will be rendered. (eg. 10 print formats)
1. Select an existing Process parameter - this specify drill rule starting parameter - where user allowed select drill option and start drill assistant with print format column focus
1. Run capture - in step 2. same as scheduler. Parameters not used can be deleted otherwise must be specified based on your requirement

### STEP 2 -  Drill Rule - run capture - to generate parameters
![Drill rule window procparameter capture](pathname:///img/new-features/v10/Drill-rule-window-procparameter-capture.png)
time saver, propose parameters to be defined.

### STEP 3 -  Drill Rule - capture - enter parameters
![Drill rule window procparameter capture para](pathname:///img/new-features/v10/Drill-rule-window-procparameter-capture-para.png)

The selected parameters will be saved in Parameter Tab. You can also define the Drill Rule Parameters manually, one by one - the restriction here is, that if the selected Process has any mandatory parameters, a corresponding Drill Rule Parameter must be defined for each of them (see [IDEMPIERE-5514](https://idempiere.atlassian.net/browse/IDEMPIERE-5514)).

## Usage
### STEP 4 -  Click to a selected column over Drill Rule will start
![Drill start](pathname:///img/new-features/v10/Drill-start.png)

### STEP 5 -  Drill Assistant in Action
Drilling supported from report and windows

#### Step 5b Drill from Report
Drill Rule allow run report with without help option - running silent, with predefined parameter.![Drill assistant opened](pathname:///img/new-features/v10/Drill-assistant-opened.png)

_Drill Assistant has 2 modes: A. Rules B. Tables (legacy)_

Drill Rule allow run report with help - means asking for parameters for further modification on-the-fly.
![Drillassistant with help](pathname:///img/new-features/v10/Drillassistant-with-help.png)

#### Drill from Window
Drill Rule allow also run report from window table, table direct and search references.
![Drill from window](pathname:///img/new-features/v10/Drill-from-window.gif)

_allow drilling from window_

### STEP 6 -  Drill Assistant Run, and the new report rendered
![Drill action runreport](pathname:///img/new-features/v10/Drill-action-runreport.png)

## Potential Improvements
1. Run not only reports but also processes.
1. Run Drill Assistant from regular window eg. Product field or Business Partner field.
1. Implement favorites same in the menu, so user will able set print format as favorites - then filter by tab/dropdown
1. Sorting drill rules by popularity not name (another ticket, implement statistics, how often the reports are started -  then filter by tab/dropdown
1. Parameter inheritance from actual to drilled report

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_DrillAssistant)_
