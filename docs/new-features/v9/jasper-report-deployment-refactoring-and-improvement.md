---
sidebar_position: 6
title: "Jasper Report Deployment Refactoring and Improvement"
sidebar_label: "Jasper Report Deployment Refactoring and Improvement"
description: "**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4873](https://idempiere.atlassian.net/browse/IDEMPIERE-4873)

**Description:**
Refactor and improve the deployment of Jasper Report.

## Images
1. To Load from File:
    1. add Report Parameter "RESOURCE_DIR" (type String) with Default Value Expression = ""
    1. Image Expression - $P&#123;RESOURCE_DIR&#125;+"image file name". For e.g $P&#123;RESOURCE_DIR&#125;+"MyCompanyLogo.png".
1. To Load from AD_Image:
    1. [NF9_Column_Display_Type_For_Jasper_Report](https://wiki.idempiere.org/en/NF9_Column_Display_Type_For_Jasper_Report)

## Sub Report
1. add Report Parameter "SUBREPORT_DIR" (type String) with Default Value Expression = ""
    1. Subreport Expression - $P&#123;SUBREPORT_DIR&#125;+"Subreport file name". For e.g $P&#123;SUBREPORT_DIR&#125;+"OrderLine.jasper".
    1. You can use any name for Subreport.

## Resource Bundle
1. Use resource bundle property file - [Multi-Lingual_Jasper](https://wiki.idempiere.org/en/Multi-Lingual_Jasper)
1. [NF9_AD_Resource_Bundle_For_Jasper_Report](https://wiki.idempiere.org/en/NF9_AD_Resource_Bundle_For_Jasper_Report)

## Deploy as Attachment
1. Upload all report artifacts as your Jasper Report Process's attachment
1. **Jasper Report field = "attachment:Jasper Report File Name"**. For e.g, "attachment:Order.jasper".
1. All report artifacts will be downloaded from the attachment archive to a temporary local folder.
1. The "RESOURCE_DIR" and "SUBREPORT_DIR" will be set to the temporary local folder.

## Deploy as File Resources
1. Deploy all report artifacts to a folder that's accessible by the iDempiere server.
1. This can be convenient for Development use as you can make your changes at Jasper Studio and preview the changes at a running instance of iDempiere immediately.
1. **Jasper Report field =  "full path to the Jasper Report File"** (the use of file: prefix is optional). For e.g, "/home/hengsin/myreports/Order.jasper" or "file:///home/hengsin/myreports/Order.jasper".
1. The Jasper Report file is download to a local temporary folder for compilation if it is a .jrxml file.
1. The "RESOURCE_DIR" and "SUBREPORT_DIR" will be set to the parent folder of the main jasper report file. Using the example above, it will be set to "/home/hengsin/myreports/". If your Subreport expression is $P&#123;SUBREPORT_DIR&#125;+"OrderLine.jasper", it will be resolved to "/home/hengsin/myreports/OrderLine.jasper" (Similar translation happen for Image expression).
1. If a folder is not included the file is intended to be in [IDEMPIERE_HOME]/reports - for example if the Jasper Report field is filled with "Order.jrxml" - then the file is searched in [IDEMPIERE_HOME]/reports/Order.jrxml

## Deploy as Web Resources
1. Deploy all report artifacts as static file of a web server (Can be an OSGi web bundle plugin too)
1. **Jasper Report field = "full web path to the Jasper Report File"**, for e.g, "http://127.0.0.1:8080/MyJasperReportFiles/Order.jasper"
1. The Jasper Report file is download to a local temporary folder for compilation if it is a .jrxml file.
1. The "RESOURCE_DIR" and "SUBREPORT_DIR" will be set to the parent path of the main jasper report file. Using the example above, it will be set to "http://127.0.0.1:8080/MyJasperReportFiles/" (you can use either http or https). If your Subreport expression is $P&#123;SUBREPORT_DIR&#125;+"OrderLine.jasper", it will be resolved to "http://127.0.0.1:8080/MyJasperReportFiles/OrderLine.jasper" (Similar translation happen for Image expression).

## Deploy as Class Loader Resources
1. Create a fragment plugin with "org.adempiere.report.jasper" as the Host Plug-in.
1. Create an unique Java Package (for e.g org.hengsin.jasper.reports) and deploy all your Jasper Report Resources there.
1. To deploy, install the fragment plugin using telnet or felix web console. If running from Eclipse, you just have to add your fragment plugin to the selected workspace plugin (for e.g, create a duplicate copy of "server.product" launch configuration and add the fragment plugin).
1. **Jasper Report Field = "resource:Package Name+Jasper Report File Name"**, for e.g "resource:org/hengsin/jasper/reports/Order.jasper"
1. The "RESOURCE_DIR" and "SUBREPORT_DIR" will be set to the parent path of the main jasper report file. Using the example above, it will be set to "resource:org/hengsin/jasper/reports/" (resource: will be replaced by the actual class loader resource prefix, for e.g bundleresource://86.fwk1882395698:2/). If your Subreport expression is $P&#123;SUBREPORT_DIR&#125;+"OrderLine.jasper", it will be resolved to "resource:org/hengsin/jasper/reports/OrderLine.jasper" (Similar translation happen for Image expression).
1. Since v11 (https://idempiere.atlassian.net/browse/IDEMPIERE-5922), we have added a new syntax of **Jasper Report Field = "resource:bundle symbolic name:Package Name+Jasper Report File Name"** (e.g resource:org.idempiere.test:org/idempiere/test/jasper/AR_Invoice.jrxml). With the new syntax, you don't have to create your plugin as fragment of "org.adempiere.report.jasper".

## Deploy as Fragment Resource Bundle
1. Create non-Java fragment plugin with "org.adempiere.report.jasper" as the Host Plug-in (i.e Don't create as a Java Project).
1. Create a unique Java package like folder structure at the root of your fragment project. For e.g, if your fragment project name is JasperReportFragment, JasperReportFragment/org/hengsin/jasper/reports.
1. Make sure that folder is added to build.properties and deploy all the report artifacts there.
1. To deploy, install the fragment plugin using telnet or felix web console. If running from Eclipse, you just have to add your fragment plugin to the selected workspace plugin (for e.g, create a duplicate copy of "server.product" launch configuration and add the fragment plugin).
1. **Jasper Report Field = "bundle:Full path to the Jasper Report File"**, for e.g "bundle:/org/hengsin/jasper/reports/Order.jasper".
1. The "RESOURCE_DIR" and "SUBREPORT_DIR" will be set to the parent path of the main jasper report file. Using the example above, it will be set to "bundle:/org/hengsin/jasper/reports/" (bundle: will be replaced by the actual bundle entries prefix, for e.g bundleentry://3.fwk1882395698/). If your Subreport expression is $P&#123;SUBREPORT_DIR&#125;+"OrderLine.jasper", it will be resolved to "bundle:org/hengsin/jasper/reports/OrderLine.jasper" (Similar translation happen for Image expression).
1. Since v11 (https://idempiere.atlassian.net/browse/IDEMPIERE-5922), we have added a new syntax of **Jasper Report Field = "bundle:bundle symbolic name:Full path to the Jasper Report File"** (e.g bundle:org.idempiere.test:/AR_Invoice_Bundle.jrxml). With the new syntax, you don't have to create your plugin as fragment of "org.adempiere.report.jasper".

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Jasper_Report_Deployment)_
