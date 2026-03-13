---
title: Bug Reporting Guidelines
sidebar_label: Bug Reporting
sidebar_position: 2
description: How to report bugs in iDempiere so the community can reproduce and fix them efficiently
---

This page is part of the list of contribution paths described in [Contributing to iDempiere](./contributing-to-idempiere).

## Did you find a bug in iDempiere?

:::danger Security vulnerabilities
Do not open a JIRA ticket if the bug is a security vulnerability in iDempiere.

Instead, follow [How to Report a Vulnerability](./how-to-report-a-vulnerability).
:::

- Ensure the bug was not already reported by searching JIRA under [Issues](https://idempiere.atlassian.net/issues/). If you find an existing report, add any useful information you have there.
- If you cannot find an open issue for the problem, open a new one.
- Include a clear title, a precise description, and as much relevant information as possible.
- If possible, add a code sample or an executable test case that demonstrates the behavior that is not occurring as expected.
- It is a good idea to reproduce the issue first on one of the [test servers](https://www.idempiere.org/test-sites) before creating the ticket.

:::note Closed issue with the same symptoms?
If you find a closed issue that appears to describe the same problem, open a new issue and include a link to the original issue in the description of your new one.
:::

## Before submitting a bug report

- Check whether you can reproduce the problem in the latest version of iDempiere.
- Check the [forum FAQs](https://www.idempiere.org/forums) for common questions and known problems.

## How do I submit a good bug report?

Bugs are tracked as [JIRA issues](https://idempiere.atlassian.net/issues/).

Explain the problem and include enough detail to help maintainers reproduce it:

- Use a clear and descriptive title.
- Describe the exact steps that reproduce the problem in as much detail as possible.
- Provide specific examples to demonstrate the steps. If possible, reproduce the problem with GardenWorld data.
- Describe the behavior you observed after following those steps.
- Explain which behavior you expected to see instead and why.
- Include screenshots or videos when they help clarify the problem.
- If iDempiere crashed, attach the relevant crash report and stack trace from the logs.
- If the problem is related to performance or memory usage, include valid measurements.
- If the problem was not triggered by a single specific action, describe what you were doing before it happened.

Provide more context by answering these questions when relevant:

- Can you reproduce the problem in the [test sites](https://www.idempiere.org/test-sites)?
- Did the problem start happening recently, for example after upgrading to a newer version?
- If it started recently, can you reproduce it in an older version? What is the most recent version where it does not happen?
- Can you reliably reproduce the issue? If not, how often does it happen and under which conditions?

## Bug report components

These are the ideal components of a bug report. If your bug is well reported and clearly defined, it is much more likely that the community can verify it and work on it.

- Be specific. For example: I opened window XYZ and created a new record with `Name=ABC` and `Code=XYZ`.
- Be verbose. More useful detail is better than too little when someone else must reproduce the problem.
- Be careful with pronouns. Avoid ambiguous references like "it" or "there" when the subject is unclear.
- Read what you wrote before submitting it.
- Read Simon Tatham's guide, [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html).

### 1. Summary (bug title)

The summary is the most accessible part of a bug report. It creates the first impression and often influences whether the issue is easy to understand and search for.

Be pithy, precise, and concise in the title, but be verbose in the description. A developer should be able to read the summary and immediately understand what the issue is about. A bad summary is something vague like "iDempiere isn't working".

People often search by summary first, so make the title informative.

Examples:

- Not good enough: `Incorrect price is shown on order line`
- Why it is weak: it does not explain what made the price incorrect or what changed before the wrong value appeared.
- Good: `Prices from the price list are still displayed after updating them manually`

### 2. Actual results in the description

The actual results describe the behavior encountered in the application after performing certain actions.

The actual results can be similar to the summary when the problem is simple, but in most cases they need more context.

Examples:

- Not good enough: `The windows in Favourites are still displayed`
- Why it is weak: it does not explain what action happened before the issue was observed.
- Good: `After removing a window from the Favourite section, the product is still displayed in the Favourite section.`

Be as specific as possible when filling the required fields.

### 3. Expected results in the description

Expected results should describe the behavior that should have happened after the same actions.

If you click a menu item, the expected result is that the corresponding window opens. The expected result should describe both the action and the expected outcome, not only state that something "should not happen".

Examples:

- Not good enough: `The windows in Favourites not displayed`
- Why it is weak: it does not explain why they should no longer be displayed.
- Good: `The windows removed from Favourites should no longer be displayed there.`

### 4. Steps to reproduce in the description

The steps to reproduce are a key component of the bug report. They tell maintainers and community members exactly how to verify the issue. It is much easier for the community to validate a problem when it can be reproduced in GardenWorld.

If the steps are not clear enough, developers will not be able to reproduce the issue and the report may be rejected.

- The steps must provide full visibility into the actions taken before the issue occurs.
- The steps should contain only one action per step.
- The steps should end with a final observation that makes the problem explicit.

Examples:

Not good enough:

1. Open iDempiere and log in.
2. Observe.

Good:

1. Open iDempiere.
2. Log in.
3. Observe that the dashboard panel is blank instead of showing the configured dashboards.

### 5. Attachments

Attach evidence whenever possible. Screenshots, videos, and log excerpts make it easier for maintainers to understand what happened and verify the issue.

### 6. Bug template

Use a structure like this when filing the issue:

```text
iDempiere Version: <Copy from About>
Operating System: <OS and version>
Database: <Engine and version>
Java Version: <Version>

Steps to reproduce:
1.
2.
3.

Expected results:

Actual results:

Additional information:
Attach a screenshot if possible.
```