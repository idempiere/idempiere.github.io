---
sidebar_position: 7
title: "Invoice Not Realized Gain/Loss Fixes"
sidebar_label: "Invoice Not Realized Gain/Loss Fixes"
description: "**Developer:** Carlos Ruiz"
tags: [functional]
---
**Goal:** Functional

**Developer:** Carlos Ruiz

**Description:** Chuck Boecking

Running the process Invoice Not Realized Gain/Loss found several errors:
1. Not working in spanish (or any translated language, just in english)
1. Creating journal batch - must be changed in favour of generating just the journal
1. Can show link to the generated doc at the end
1. Generating report lines for invoices in the same currency than schema
1. The account generated (gain/loss) is wrong

**Background Information:**
This topic only applies to you when you invoice in multiple currencies. If you hold short-term assets or liabilities in foreign currencies, you are generally expected to adjust these assets/liabilities back to your primary currency at the end of a period for the purpose of producing more accurate financial statements. You will typically reverse accrue these adjustments on the first day of the next period. Open balances on AP and AR invoices fit the category of short-term assets/liabilities.

Invoice Not Realized Gain/Loss report and process serves two purposes. You can simply execute the report, or you can execute the report and specify a Revaluation Document Type to generate the GL Journal.
1. Create a report to itemize adjustments
1. Create a GL Journal to execute the adjustment.

You will often attach the PDF report to the generated GL Journal for future reference (defend the results).

**Technical Info:** [IDEMPIERE-1695](http://idempiere.atlassian.net/browse/IDEMPIERE-1695)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Invoice_Not_Realized_Gain/Loss_Fixes)_
