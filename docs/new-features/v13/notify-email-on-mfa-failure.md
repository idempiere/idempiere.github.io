---
sidebar_label: "Notify email on MFA failure"
sidebar_position: 18
description: "Send an email notification to users when a multi-factor authentication validation attempt fails."
tags:
  - security
  - user-experience
applies_to: ">=13"
last_reviewed: 2026-11-22
---

# Notify email on MFA failure

**Goal:** Security

**Developer:** [Carlos Ruiz](https://github.com/CarlosRuiz-globalqss) ([BX-Service](https://www.bx-service.com))

**Feature Ticket:** [IDEMPIERE-7226](https://idempiere.atlassian.net/browse/IDEMPIERE-7226)

**Version:** iDempiere 13

## The problem

When a multi-factor authentication (MFA) validation attempt fails, the affected user may not be aware that someone tried to access their account. Without a notification, the user cannot react quickly to a possible unauthorized access attempt.

## What changed

iDempiere now sends an email notification to a user when an MFA validation attempt fails for that account. The email is sent only when the user has an email address configured.

The notification contains:

- The date and time of the failed attempt
- The IP address of the attempt
- The failure reason

The message is rendered in the login language using the Mail Template record named **"MFA Validation Failed"**. iDempiere looks for an active Mail Template with that name in System or in the current tenant. If the template is inactive or missing, no email is sent.

## How to set it up

1. Open the **Mail Template** window (System Admin > Client Rules > Mail Template).
2. Find the record with **Name** `MFA Validation Failed`.
3. Customize the **Subject**, **Text**, and other fields as needed.
4. Save the record.

To apply the template to all tenants, maintain the record in the System client. To use a tenant-specific version, create or maintain the record in that tenant.

## How to disable the feature

Deactivate the Mail Template record with **Name** `MFA Validation Failed`. When that template is inactive or not present, iDempiere does not send email notifications for failed MFA attempts.

## Template variables

The following variables are available in the **MFA Validation Failed** Mail Template.

| Variable | Description |
| --- | --- |
| `@Name@` | Recipient name |
| `@#_MFA_Failed_Date_@` | Date and time of the failed MFA attempt |
| `@#_MFA_Failed_IPAddress_@` | IP address of the failed attempt |
| `@#_MFA_Failed_FailureReason_@` | Reason the MFA attempt failed |

## Migration impact

None. The feature sends notifications only when the **MFA Validation Failed** Mail Template is active. Existing behavior does not change.

## See also

- [Configure MFA](/docs/new-features/v8.2/configure-mfa)

## Related tickets

- [IDEMPIERE-7226](https://idempiere.atlassian.net/browse/IDEMPIERE-7226)
