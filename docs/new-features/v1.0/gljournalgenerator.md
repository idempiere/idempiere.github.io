---
sidebar_position: 14
title: "GL Journal Generator"
sidebar_label: "GL Journal Generator"
description: "**Functional:** Accounting"
tags: [functional]
---
**Goal:** Usability

**Functional:** Accounting

**Contributor:** Quality Systems & Solutions (GlobalQSS)

**Description:**

GL Journal Generator allows you to configure the generation of GL Journals based on previous journals movements.

Example of use cases:
- Year End Closing
- Accrued Payroll Liabilities

***GL Journal Generator***

In these window you configure the variables that will affect the generation of journals:

- **Name:** The identifier of the process
- **Description:** Description of the process, the generated journals will have this description
- **Comment/Help:** Use this to document how to use the process, for example the expected parameters
- **Document Type:** The GL Journal document type that will be generated
- **GL Category:** The GL Journal category that will be used on the generated document
- **Posting Type:** The Posting Type that will be used on the generated document
- **Accounting Schema:** The Accounting Schema that will be used on the generated document, and also the schema that will be taken into account to get the facts to summarize
- **Account Adjust DR:** The account that will be used to adjust the journal - a DR line with this account will be added in case the sum of lines results in a CR balance
- **Account Adjust CR:** The account that will be used to adjust the journal - a CR line with this account will be added in case the sum of lines results in a DR balance

To run the process and generate a Journal you must push the **Generate GL Journal** toolbar gear button.

In the screenshot you can see the pre-configured sample for GardenWorld:

![NF001 GLJournalGenerator001](pathname:///img/new-features/v1.0/NF001_GLJournalGenerator001.png)

***GL Journal Generator Line***

The image above shows the configuration of the generator lines.

- **Sequence:** The sequence to process the lines
- **Description:** Description of the line, the generated journal lines will have this description
- **Account DR:** In case you want the sum of the sources be posted against an account when the balance is debit - it can be left blank when copying dimensions
- **Account CR:** In case you want the sum of the sources be posted against an account when the balance is credit - it can be left blank when copying dimensions
- **Type of BP Dimension:** Optionally you have three options to calculate the BP dimension of the generated journals, or leave it blank when copying dimensions
    - Column: You can define a column from the fact table to fill the BP of the generated journal.  You can also use indirect columns, for example indicating C_BPartner.SocialSecurityBP_ID will assign the SocialSecurityBP_ID of the business partner, this can be useful generating Accrued Payroll Liabilities
    - Fixed: Or you can select a specific BP to fill the generated journal
    - Same: Or you can use the same BP of the summarized facts
- **Same Product:** In case you want to generate the journal lines with the same product as the summarized facts
- **Copy All Dimensions:** In case you want to generate the journal lines with all the same dimensions as the summarized facts, this is usually the case for Year End Closing
- **Multiplier Amount:** Once all the sources are summarized the total amount is multiplied by this factor
- **Round Factor:** The resulting amount is rounded by this factor

***GL Journal Generator Sources***

On the next screenshot you can see the GardenWorld example where the line "Close (4) Sales and (80) Other Income" is summarizing the sources for accounts 4 and 80:

- **Account Element:** The account to be used to summarize the source lines
- **GL Category:** Optionally you can restrict the summarized sources by GL Category also (for example to summarize just facts based on payroll category)
- **Multiplier Amount:** Once the facts are summarized the total amount is multiplied by this factor
- **Round Factor:** The resulting amount is rounded by this factor

![NF001 GLJournalGenerator002](pathname:///img/new-features/v1.0/NF001_GLJournalGenerator002.png)

***Generating the GL Journal***

To generate the GL Journal you must push the **Generate GL Journal** toolbar gear button:

- **Processing Date (From/To):** You must define the period (start and end date) to summarize the accounting facts
- **Account Date:** This is the date to use for the generated GL Journal
- **Simulation:** If you check this flag no journal will be generated, the process will just show the resulting lines on a window for your review
- **Document Action:** If you want to prepare or complete the generated journal, leave it blank if you just want to generate without any check
- **Document No:** The number to assign to the generated GL Journal, leave it blank to use the default sequence
- **Business Partner:** In case you want to generate a journal filtering the facts just for a specific business partner
- **Product:** In case you want to generate a journal filtering the facts just for a specific product

![NF001 GLJournalGenerator003](pathname:///img/new-features/v1.0/NF001_GLJournalGenerator003.png)

***Sample of resulting Journal***

![NF001 GLJournalGenerator004](pathname:///img/new-features/v1.0/NF001_GLJournalGenerator004.png)

**Technical Info:** [IDEMPIERE-207](https://idempiere.atlassian.net/browse/IDEMPIERE-207)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_GLJournalGenerator)_
