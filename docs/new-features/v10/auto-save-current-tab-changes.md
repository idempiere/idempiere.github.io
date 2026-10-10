# Auto Save Current Tab Changes

> **Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Goal:** Usability

**Feature Ticket:** [IDEMPIERE-5202](https://idempiere.atlassian.net/browse/IDEMPIERE-5202)

**Description:**

Implement auto save changes of current tab:
1. Option to auto save changes of current tab. Default to off.
1. When turn on, save is trigger for changes make to every field.
1. When turn on, there's option to exclude particular tab by AD_Tab_ID or AD_Tab_UU.

## Usage
1. [ZK_AUTO_SAVE_CHANGES](../../basic-development/system-configurator.md#ZK_AUTO_SAVE_CHANGES)
1. * Y/N type Client level System Config entry, default to N.
1. * When Y, save is trigger for changes make to every field.
1. [ZK_AUTO_SAVE_TABS_EXCLUDED](../../basic-development/system-configurator.md#ZK_AUTO_SAVE_TABS_EXCLUDED)
1. * Comma separated list of AD_Tab_ID or AD_Tab_UU value.
1. * Tab in the list will be excluded from the effect of the ZK_AUTO_SAVE_CHANGES flag above.
