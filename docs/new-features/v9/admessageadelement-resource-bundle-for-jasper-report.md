---
sidebar_position: 37
title: "AD_Message+AD_Element Resource Bundle for Jasper Report"
sidebar_label: "AD_Message+AD_Element Resource Bundle for Jasper Report"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4850](https://idempiere.atlassian.net/browse/IDEMPIERE-4850)

**Description:**
Pass Resource Bundle backed by AD_Message and AD_Element as report parameter to Jasper Report.

**Usage:**
1. An implementation of Resource Bundle that's backed by AD_Message and AD_Element is pass to the Jasper Report using the standard Jasper Report parameter of JRParameter.REPORT_RESOURCE_BUNDLE. If a resource bundle property file is deploy together with the Jasper Report file, that will took precedence over the AD_Message and AD_Element resources.
1. In your Jasper Report, use the build in str function to get translated text from AD_Message or AD_Element (or property file if you have deploy one). For e.g, str("IsDefault")
1. Note that this will not work when you preview using Jasper Report Studio. To get reasonable output at Jasper Report Studio, you can make use of conditional expression, for e.g: str("IsDefault") != null ? str("IsDefault") : "str(IsDefault)"

Tip for concatenation with a field:```java

(str("IsDefault") != null ? str("IsDefault") : "str(IsDefault)") + ": " + $F&#123;IsDefaultField&#125;

```

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_AD_Resource_Bundle_For_Jasper_Report)_
