---
title: New Feature Suggestion Guidelines
sidebar_label: New Feature Suggestions
sidebar_position: 4
description: How to propose enhancements and new features for iDempiere in a way the community can evaluate effectively
---

This page is part of the list of contribution paths described in [Contributing to iDempiere](./contributing-to-idempiere).

## Suggesting enhancements

These guidelines cover both completely new features and smaller improvements to existing functionality.

Following them helps the community understand your proposal, find related suggestions, and decide whether the idea belongs in the core project.

Before creating an enhancement suggestion, review the points below and include as much detail as possible.

## Before submitting an enhancement suggestion

- Suggest the change first in the [iDempiere public forum](https://www.idempiere.org/forums) or [Mattermost](https://mattermost.idempiere.org/idempiere/channels/support).
- Do not open a JIRA issue until you have collected positive feedback about the change.
- Remember that JIRA is primarily intended for bug reports and fixes.
- Search existing [JIRA issues](https://idempiere.atlassian.net/issues/) first to see whether the enhancement was already suggested.

## How do I submit a good enhancement suggestion?

Once the idea has community support, document it clearly so maintainers and contributors can evaluate it.

- Use a clear and descriptive title.
- Provide a step-by-step description of the suggested enhancement in as much detail as possible.
- Include specific examples to make the idea concrete.
- Describe the current behavior.
- Explain the behavior you would expect instead and why.
- Explain why this enhancement would be useful to a broad set of iDempiere users.
- Explain why the idea belongs in the core product instead of being better implemented as a community plug-in.

## What makes a proposal easier to evaluate?

The best enhancement suggestions make the tradeoffs easy to understand.

- State the problem first, not only the proposed solution.
- Describe who benefits from the change.
- Clarify whether the suggestion affects the dictionary, business logic, UI, reports, or integrations.
- Mention any compatibility, migration, or training impact you expect.
- If there are alternative approaches, mention them and explain why your preferred option is better.

## Core feature or plug-in?

Before proposing a core enhancement, consider whether the idea is better delivered as a plug-in.

In general, a feature is a stronger candidate for the core when it:

- benefits a large portion of the iDempiere community
- fits the project's general direction
- avoids adding narrow, company-specific behavior to the standard distribution

If your idea is valuable but too specific for the core, it may be better implemented through the [Developing Plug-Ins](../plugin-development/developing-plugins) path.