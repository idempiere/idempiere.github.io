---
sidebar_position: 18
title: "Refactor ESC/Alt+X Shortcut for Closing Tabs"
sidebar_label: "Refactor ESC/Alt+X Shortcut for Closing Tabs"
description: "**Ticket:** &lt;https://idempiere.atlassian.net/browse/IDEMPIERE-5786&gt;(http://IDEMPIERE-5786)"
tags: [user-experience]
---
## Refactor ESC/Alt+X Shortcut for Closing Tabs
**Ticket:** &lt;https://idempiere.atlassian.net/browse/IDEMPIERE-5786&gt;(http://IDEMPIERE-5786)

**Developer:** Peter Takacs, Cloudempiere

**Review:** Carlos Ruiz, Heng Sin Low

## Description
The scope of this improvement can be split into two parts:

### Implement Alt-X shortcut for the missing tab types
Before this improvement, closing Tabs with Alt+X shortcut was not supported in most of the tab types. For the complete list, see the following ticket: &lt;https://idempiere.atlassian.net/browse/IDEMPIERE-4409&gt;(http://Review%20Shortcuts%20Alt-x%20for%20all%20tab%20types%20(IDEMPIERE-4409)). After this improvement, the Alt-X shortcut should work for all tab types.

#### Support ESC shortcut for closing tab
A new System Configuration record was added: USE_ESC_FOR_TAB_CLOSING. If it is set, then the user will be able to close tabs with the ESC key (besides Alt-X).

##### How to use:
- Y - use ESC for closing tabs

- N - use Alt+X for closing tabs

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_ESC/Alt+X_Shortcut_for_Closing_Tabs)_
