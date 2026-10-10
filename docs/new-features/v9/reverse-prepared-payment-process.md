# Reverse Prepared Payment Process

> **Developer:**  Nicolas Micoud

**Goal:** Functional

**Sponsor:** [T.G.I.](https://tgi.eu)

**Feature Ticket:** [IDEMPIERE-5170](https://idempiere.atlassian.net/browse/IDEMPIERE-5170)

**Description:**

This process was implemented to be able to fix a processed Payment Selection record without the need to hack DB.

Scenario is:
- Create a payment selection and add invoices.
- Click on "Prepare Payment" => PaymentSelectionCheck tab is populated and PaymentSelectionLine is now processed
- Try to generate the file but it fails as there was missing info on BPartner>BankAccount (because an invoice was wrongly selected).

Now, you can just execute the process:

![ReversePreparedPaymentProcess](pathname:///img/new-features/v9/ReversePreparedPaymentProcess.png)

If no payment have been generated, it will:
- remove records from "Prepared Payments" tab
- 'unprocess' the header.

It will be as if you never run the "Create Payment" process.
It will be possible to add/remove records from the Payment Selection Line tab and execute the Prepare Payment process again.
