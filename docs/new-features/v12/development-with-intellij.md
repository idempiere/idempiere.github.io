---
sidebar_position: 29
title: "Development With Intellij"
sidebar_label: "Development With Intellij"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin

**Feature** **Ticket:** [IDEMPIERE-5150](https://idempiere.atlassian.net/browse/IDEMPIERE-5150)


### Description
With the help of the **Eclipse PDE Partial** plugin, use IntelliJ for iDempiere development.

### Steps
- Install **Intellij 2024.3.5** or **Intellij 2025.1**
- Install **Eclipse PDE Partial** plugin **1.6.8** from Intellij Marketplace
- At the **Projects** window, select **Open** and pick the root iDempiere source folder. Make sure you have run **mvn verify** successfully before doing this.
- The **Eclipse PDE Partial** plugin should be able to setup everything without further input from user.
- The **Eclipse PDE Partial** plugin doesn't works well with Maven build files. Select **Skip** if the Intellij IDE shows the **Load Maven Projects** popup dialog.
- Run or debug with Maven Run Configuration:
    - **iDempiere Setup**: run the **org.adempiere.app.install** Maven run configuration.
    - **Generate Model**: run the **org.adempiere.modelgenerator.app** Maven run configuration.
    - **iDempiere Server**: run the **org.adempiere.server.application** Maven run configuration.
    - To debug, run one of the Maven run configuration above, click the **Attach debugger** link in the Run output panel or use **Run > Attach to process...**.
    - Due to the use of Equinox launcher, the Debug Maven run configuration menu wouldn't work.
    - To setup new maven run configuration, please refer to one of the pre-setup Maven run configuration. You can setup the **bundles.info** and **dev.properties** manually or copy it from Eclipse launch configuration (&lt;workspace&gt;/.metadata/.plugins/org.eclipse.pde.core/&lt;launch configuration name&gt;/). For the copy over bundles.info, you need to replace all occurrence of **&lt;home folder&gt;** with **$&#123;user.home&#125;**.
- Run or debug with **Eclipse Application Partial** Configuration:
    - **iDempiere Setup**: run or debug the **Install** configuration
    - **Generate Model**: run or debug the **Model Generator** configuration
    - **iDempiere Server**: run or debug the **iDempiere Server** configuration
- Run or debug plugin unit test (required **Eclipse PDE Partial** plugin **1.6.8** and above):
    - **org.idempiere.test**: run all unit test inside the **org.idempiere.test** project
    - **org.idempiere.test.SelectedClass**: run all unit test methods inside the currently selected class at the **Project** view (the class must belongs to the **org.idempiere.test** project).
    - **org.idempiere.test.SelectedClass.Method**: run single unit test methods inside the currently selected class at the **Project** view (the class must belongs to the **org.idempiere.test** project). The run configuration will prompt for the unit test method name (you can copy the method name using the **Structure** view).

### Maintenance of .iml file and run configurations
- We need to update the .iml files and run configurations if there are changes in project modules and/or target platform.
- To update .iml files, right click on **idempiere** project, select **Resolve Workspace**. Push the updated .iml files to repository.
- For Eclipse PDE Partial run configurations, update selection of target modules and run it. Push the updated configurations to repository.
- For Maven run configurations, get the updated dev.properties and bundles.info from your Eclipse installation (&lt;workspace&gt;/.metadata/.plugins/org.eclipse.pde.core/&lt;launch configuration name&gt;/). For the copy over bundles.info, you need to replace all occurrence of **&lt;home folder&gt;** with **$&#123;user.home&#125;**.

### Working with idempiere-rest module
1. Import **com.trekglobal.idempiere.rest.api** module

select "File" -> "New" -> "Module from Existing Sources..."
- Step 1

![Import com.trekglobal.idempiere.rest.api Step 1](pathname:///img/new-features/v12/Import_com.trekglobal.idempiere.rest.api_Step_1.png)

_Import com.trekglobal.idempiere.rest.api - Step 1_
- Step 2

![Import com.trekglobal.idempiere.rest.api Step 2](pathname:///img/new-features/v12/Import_com.trekglobal.idempiere.rest.api_Step_2.png)

_Import com.trekglobal.idempiere.rest.api - Step 2_
- Step 3

![Import com.trekglobal.idempiere.rest.api Step 3](pathname:///img/new-features/v12/Import_com.trekglobal.idempiere.rest.api_Step_3.png)

_Import com.trekglobal.idempiere.rest.api - Step 3_
- Step 4

![Import com.trekglobal.idempiere.rest.api Step 4](pathname:///img/new-features/v12/Import_com.trekglobal.idempiere.rest.api_Step_4.png)

_Import com.trekglobal.idempiere.rest.api - Step 4_
- Step 5

![Import com.trekglobal.idempiere.rest.api Step 5](pathname:///img/new-features/v12/Import_com.trekglobal.idempiere.rest.api_Step_5.png)

_Import com.trekglobal.idempiere.rest.api - Step 5_
- Step 6

![Import com.trekglobal.idempiere.rest.api Step 6](pathname:///img/new-features/v12/Import_com.trekglobal.idempiere.rest.api_Step_6.png)

_Import com.trekglobal.idempiere.rest.api - Step 6_
&lt;p&gt;
2. Configure Imported com.trekglobal.idempiere.rest.api Module
- Exclude Target Folder

![Exclude Rest API Module Target Folder](pathname:///img/new-features/v12/Exclude_Rest_API_Module_Target_Folder.png)

_Exclude com.trekglobal.idempiere.rest.api target folder_
- Set Compile Output Path

![Com.trekglobal.idempiere.rest.api compile output path](pathname:///img/new-features/v12/Com.trekglobal.idempiere.rest.api_compile_output_path.png)

_Compile output path of com.trekglobal.idempiere.rest.api_
- Set Eclipse PDE Partial Settings

![Com.trekglobal.idempiere.rest.api facet output path](pathname:///img/new-features/v12/Com.trekglobal.idempiere.rest.api_facet_output_path.png)

_com.trekglobal.idempiere.rest.api output path for Eclipse PDE Partial facet_
&lt;p&gt;
3. Close and re-open module setting to verify that the module's dependencies have been updated by the Eclipse PDE Partial plugin.
![Com.trekglobal.idempiere.rest.api Module Dependencies](pathname:///img/new-features/v12/Com.trekglobal.idempiere.rest.api_Module_Dependencies.png)

_Updated module dependencies of com.trekglobal.idempiere.rest.api_
&lt;p&gt;
4. Create a duplicate copy of **iDempiere Server** run configuration. Change runtime data directory path and select the **com.trekglobal.idempiere.rest.api** module
![Com.trekglobal.idempiere.rest.api Run Configuration](pathname:///img/new-features/v12/Com.trekglobal.idempiere.rest.api_Run_Configuration.png)

_Run configuration for com.trekglobal.idempiere.rest.api_
&lt;p&gt;
5. Run/Debug the newly created run configuration to test

---

_Source: [Wiki](https://wiki.idempiere.org/en/Development_With_Intellij)_
