---
sidebar_position: 17
title: "Email Template Markdown Text"
sidebar_label: "Email Template Markdown Text"
description: "**Feature:** Implement markdown text support for email template"
tags: [technical]
---
**Feature:** Implement markdown text support for email template

**Goal:** Technical

**Developer:**  Hengsin Low

**Feature Ticket:** [IDEMPIERE-6324](https://idempiere.atlassian.net/browse/IDEMPIERE-6324)

### Description
Add markdown text support for html email template.

### Markdown support
- Use `<#md></#md>` tags to enclose Markdown text.
- Example using with html tag:


```xml
<#md>**Bold Text**</#md>
```
- Example using just mark down:


```
<#md>**Bold Text**</#md>
```
- Support auto link and table markdown extension.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Email_Template_Markdown_Text)_
