# Multiple SMTP Per Tenant

> **Developer:**  Nicolas Micoud

**Goal:** Functional

**Feature Ticket:** [IDEMPIERE-4866](https://idempiere.atlassian.net/browse/IDEMPIERE-4866)

**Sponsor:** [T.G.I.](https://tgi.eu)

**Description:**

Since v9, is possible to define several SMTP servers per tenant.
Fill usual data (host, port, ...) and then "**Used by email or domain**" field:

![MultipleSmtpPerTenant](pathname:///img/new-features/v9/MultipleSmtpPerTenant.png)

If you fill it with an email address, the server will only be used when an email is sent using this 'from' address.
If you fill it with a domain, the server will be used for all email with a 'from' address using this domain.

nb: the program starts to check for the EMail address and if not found, check for the domain.
