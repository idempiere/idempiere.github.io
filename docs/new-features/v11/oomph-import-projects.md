---
sidebar_position: 33
title: "OOMPH Import Projects"
sidebar_label: "OOMPH Import Projects"
description: "**Goal:** UX/Functional"
tags: [development]
---
**Goal:** UX/Functional

**Developer:** Hengsin

**Feature** **Ticket:** [IDEMPIERE-5655](https://idempiere.atlassian.net/browse/IDEMPIERE-5655)


### Description
Added **idempiere.setup** to **utils_dev/oomph** to support import of iDempiere projects into a new Eclipse workspace through the use of Oomph Import feature.

### Steps
- Create workspace folder and clone iDempiere source.

![Clone iDempiere Source](pathname:///img/new-features/v11/Clone_iDempiere_Source.gif)

_Clone iDempiere Source_

- Run Maven Build.

![Run Maven build](pathname:///img/new-features/v11/Run_Maven_build.gif)

_Run Maven build_

- Install Eclipse (Eclipse 2024-09, recommended to use the Eclipse installer).

- Use Oomph to import iDempiere projects into workspace.
    - Launch Eclipse and use the workspace created at step 1 above.
    - Open the Oomph Import dialog and select utils_dev/idempiere.setup file.
    - Click **Finish** to start the import process.
    - Oomph Import Dialog Video - see **Import project1.webm** attachment at [IDEMPIERE-5655](https://idempiere.atlassian.net/browse/IDEMPIERE-5655)
    - Click **Finish** at the Import Progress Dialog to restart Eclipse
    - Import of projects will auto continue after restart of Eclipse.
    - Import Progress Dialog Video - see **Import project2.webm** attachment at [IDEMPIERE-5655](https://idempiere.atlassian.net/browse/IDEMPIERE-5655)
    - The import process will took a while. At the end, click **Finish** again to complete the process.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_OOMPH_Import_Projects)_
