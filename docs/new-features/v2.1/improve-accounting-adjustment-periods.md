---
sidebar_position: 6
title: "Improve Accounting Adjustment Periods"
sidebar_label: "Improve Accounting Adjustment Periods"
description: "**Developer:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Functional

**Developer:** Carlos Ruiz

**Description:** Chuck Boecking

The purpose of this enhancement is to give accounting users the ability to create GL Journal entries against an "Adjustment Period". This ability existed before if a development made specific tweaks to the system. This enhancement makes this feature available to everyone with correct permissions.

The most common use of this feature is to record your end-of-fiscal-year retained earnings adjustment. This is where you move the value of your income (income statement) to retained earnings (balance sheet). By entering your retained earnings GL Entry in an adjustment period, you can hide the results in a fictitious 13th period - the period that exists between the last period of one year and the first period of the next year. This solution gives you the ability to produce end-of-fiscal-year financial statements at any time without including adjusting GL Journal entries.

How to create an Adjustment Period in Gardenworld:
1. Open the Calendar, Year and Period window
1. Go to the 2014 Year
1. Go to the Dec-14 Period
1. Create a copy of Dec-14 and call it 'Dec-14-Adj'
1. Change its Period No from 12 to 13
1. Save the 'Dec-14-Adj' record
1. Note the date range for 'Dec-14-Adj' will remain the same as for 'Dec-14'.

When you create your adjusting GL Journal entry, be sure to set the Period field to 'Dec-14-Adj'.

When you produce your Financial Reports, you can choose between the 'Dec-14' and 'Dec-14-Adj' periods. If you choose 'Dec-14', then you will get results for all periods except the adjusting period. If you choose 'Dec-14-Adj', then you will get results for all periods including the adjusting period.

**Technical Info:** [IDEMPIERE-2184](http://idempiere.atlassian.net/browse/IDEMPIERE-2184)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Improve_Accounting_Adjustment_Periods)_
