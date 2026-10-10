# Email Template Markdown Text

> **Feature:** Implement markdown text support for email template

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
