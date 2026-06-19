---
sidebar_position: 9
title: "Find Window Improvements"
sidebar_label: "Find Window Improvements"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Sponsor:** [Trek Global](http://www.trekglobal.com/)

**Description:**

With the stabilization of the release 2 the find window has been heavily improved again:

## Range on Simple Search Tab:
All fields that represent dates and numbers can now be searched as a range.  A button was added next to the field, if that button is pushed a new upper limit field appears.  The search is done this way:
- Range button not pushed: Search for exact value
- Range button pushed and lower/upper limit filled: Search for a range between the two limits
- Range button pushed and just lower limit filled: Search for records greater or equal to lower limit
- Range button pushed and just upper limit filled: Search for records lesser or equal to upper limit

![NF20 01SearchRange](pathname:///img/new-features/v2.0/NF20_01SearchRange.png)

## Extended Fields on Simple Search Tab:
There is also a new button marked with three dots (...) in the simple search tab (as can be seen in the image above), pushing that button open a full list of available fields to allow more complex searches

![NF20 02SearchExtended](pathname:///img/new-features/v2.0/NF20_02SearchExtended.png)

## Save from Simple Search Tab:
With the improvements mentioned now the user can construct more complex queries in the simple tab, so it's important to allow now saving searches also from simple search tab.  You can see the result of a saved search on the image next, check the operators used for each field.

![NF20 03SearchSimpleSaved](pathname:///img/new-features/v2.0/NF20_03SearchSimpleSaved.png)

**Technical Info:** [IDEMPIERE-1535](http://idempiere.atlassian.net/browse/IDEMPIERE-1535), [IDEMPIERE-1579](http://idempiere.atlassian.net/browse/IDEMPIERE-1579), [IDEMPIERE-1608](http://idempiere.atlassian.net/browse/IDEMPIERE-1608)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.0_Find_Window_Improvements)_
