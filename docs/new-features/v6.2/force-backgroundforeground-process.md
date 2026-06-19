---
sidebar_position: 8
title: "Force Background/Foreground Process"
sidebar_label: "Force Background/Foreground Process"
description: "**Developer:** Diego Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Diego Ruiz

**Sponsors:**  [TrekGlobal](http://www.trekglobal.com/)

**Description:**

The Execution Type field has been added to Report & Process to force execution in background/foreground - this can be useful for slow reports for instance.
**If the SysConfig [BACKGROUND_JOB_ALLOWED](https://wiki.idempiere.org/en/System_Configurator_(Window_ID-50006)#BACKGROUND_JOB_ALLOWED) = 'N', the value of the new field is ignored.**

![ExecutionTypeField](pathname:///img/new-features/v6.2/ExecutionTypeField.png)

The user can select the following values:

- Empty: if the field is empty, the process will have the same behaviour as before, it can be run in background or foreground by checking the 'Run as Job' checkbox in the process parameter window.
- Force Background: Always run in background.
- Force Foreground: Never run in background.

**Notes:**
- When 'Force Foreground' is selected, the 'Run as Job' checkbox is hidden in the process parameter window.
- When 'Force Background', the 'Run as Job' checkbox is shown checked, the user cannot modify it.

**Technical Info:** [IDEMPIERE-2816](https://idempiere.atlassian.net/browse/IDEMPIERE-2816), [IDEMPIERE-2351](https://idempiere.atlassian.net/browse/IDEMPIERE-2351)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF6.2_Force_Background/Foreground_Process)_
