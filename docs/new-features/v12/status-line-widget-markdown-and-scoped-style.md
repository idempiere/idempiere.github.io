---
sidebar_position: 24
title: "Status Line Widget Markdown And Scoped Style"
sidebar_label: "Status Line Widget Markdown And Scoped Style"
description: "**Feature:** Implement markdown and scoped style support for status line widget"
tags: [technical]
---
**Feature:** Implement markdown and scoped style support for status line widget

**Goal:** Technical

**Developer:**  Hengsin Low

**Feature Ticket:** [IDEMPIERE-6321](https://idempiere.atlassian.net/browse/IDEMPIERE-6321)

### Description
Status line widget can format the output using html tag and inline css style (i.e style="...").

This ticket enhance that with markdown and scoped css style (&lt;style&gt;@scope&#123;...&#125;&lt;/style&gt;) support.

### Scoped CSS Styling with `AD_Style`
- see CSS Styling with `AD_Style` in [NF12_Document_Search_Customisable_Layout](https://wiki.idempiere.org/en/NF12_Document_Search_Customisable_Layout)
- Added Style field to Status Line window

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

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Status_Line_Widget_Markdown_And_Scoped_Style)_
