---
sidebar_position: 10
title: "Unallocated Cash and Payment Selection Configurable Business Partner"
sidebar_label: "Unallocated Cash and Payment Selection Configurable Business Partner"
description: "&lt;h2 style='color:red'&gt;NOTE: This is not yet integrated into core&lt;/h2&gt;"
tags: [functional]
---
&lt;h2 style="color:red"&gt;NOTE: This is not yet integrated into core&lt;/h2&gt;

**Goal:** Functional

**Developer:** Deepak Pansheriya

**Feature** **Ticket:** [IDEMPIERE-5516](https://idempiere.atlassian.net/browse/IDEMPIERE-5516)


### Description
Unallocated Cash and Payment Selection Accounts were configured on Bank account but those accounts are suspense balancing for account receivable and Accounts payable respectively.

As currently this configuration is on bank account, if we want to configure different AR and AP account and group related Unallocated Cash and Payment Selection accounts in COA then it is not possible. So this feature has make Unallocated Cash and Payment Selection Accounts on Business Partner instead of on Bank account.

When iDempiere DB migrated after this feature and on a given tenant and accounting schema, if only single GL account for  Unallocated Cash and Payment Selection Accounts configured then migration script will apply same to all BPartner and BPartner group accounting. If that is not case then those accounts kept blank.

It is advised after migrating, All Bpartner Group are configured proper accounting and if requred change implementation after testing. In future, Unallocated Cash and Payment Selection Accounts from bank account will be deleted.

Below are changes done in this enhancement
1. Add B_UnallocatedCash_Acct columns on Business Partner-> Customer account and Business Partner Group-> Account.
1. Similarly add B_PaymentSelect_Acct columns on Business Partner-> Vendor account and Business Partner Group-> Account.
1. Correct defaulting logic on Business Partner Group as well as Business Partner accounting. As well as copy accounts process.
1. Make sure that on Payment and allocation posting, Account from Business Partner is used.
1. If B_PaymentSelect_Acct and B_UnallocatedCash_Acct  are not configured on BPartner then it fall back to from Bank/Cash-> Account->Accounting for backward compitability.

Link to the start of mattermost discussion:
https://mattermost.idempiere.org/idempiere/pl/he13t3j8kbb55m3p77nmc3stke

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Unallocated_Cash_and_Payment_Selection_Configurable_Business_Partner)_
