---
sidebar_position: 16
title: "Document Search Customisable Layout"
sidebar_label: "Document Search Customisable Layout"
description: "**Feature:** Allow Define Customisable Layout for search result"
tags: [technical]
---
**Feature:** Allow Define Customisable Layout for search result

**Goal:** Technical

**Developer:**  Hengsin Low

**Idea/POC:**  Norbert Bede

**Sponsor:**  Cloudempiere

**Feature Ticket:** [IDEMPIERE-6253](https://idempiere.atlassian.net/browse/IDEMPIERE-6253)

### Description
iDempiere Document Search NF2.1 Document Search on Menu Lookup, allow define search, but the result is plain. This change allow define new visualisation (plan, card, markdown, table), Example.
![DocumentSearchCardLayout](pathname:///img/new-features/v12/DocumentSearchCardLayout.png)

_Document Search Card Layout_

**Release Notes Summary**

- New Features in Search Definition Window:
- Added `AD_Message_ID` and `AD_Style_ID` fields.
**Note** These fields are visible when the search type is set to "Query" (`SearchType=Q`).

- Enhanced Query type searches:
  - Query results can now be formatted using `Message Text` from `AD_Message` and styled with `CSS` definitions from `AD_Style`.
**Formatting with `AD_Message**

- Supports both HTML and Markdown, or a mix of both.
  - Use `<#md></#md>` tags to enclose Markdown.
- Basic structure support for headers, bodies, and footers:
  - Header text with `<#header></#header>`
  - Footer text with `<#footer></#footer>`
- Flexible variable substitution options:
```
 - Message format variables `{0}`, `{1}`, etc., and context variables like `@Name@`.
 - Special variables: `@WindowName@` for window name and `@Row@` for row number**CSS Styling with `AD_Style`**
```

**CSS Styling with `AD_Style`**

Built from `AD_StyleLine` and uses scoped CSS instead of inline styles.
```
 - Scoped CSS is not enabled by default in Firefox; to enable, use `about:config` and set `layout.css.at-scope.enabled` to `true`.
```
**Additional Updates and Fixes:**
Added a new JavaScript function: `idempiere.directZoom(keyColumnName, id)`.

Resolved an issue in `AD Window` list view:
  - Fixed broken list view display when field content includes single or double quotation marks.

This update brings enhanced search result customization and improved list view stability.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Document_Search_Customisable_Layout)_
