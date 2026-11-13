---
sidebar_label: Design Discussion
sidebar_position: 6.5
description: Which core changes need a design discussion on Mattermost before you write code, and how that discussion works.
tags: [development]
applies_to: "all"
last_reviewed: 2026-11-13
---
# Changes that need a design discussion first

This page is part of the list of contribution paths described in [Contributing to iDempiere](./contributing-to-idempiere).

## Why this matters

Most pull requests are easy to judge. A bug is fixed or it isn't. Tests pass or they don't.

Some changes are different. They shape iDempiere for everyone who installs it, often for years. Reviewing them is not about whether the code works. It is about whether the project wants the change at all. Those decisions are hard to make inside a pull request review, and they are unfair to the contributor if they happen only after the work is done.

So for these changes we ask for one thing: talk about it before you build it.

## What counts as a design-level change

Your change needs a design discussion first if it does any of the following:

- Adds or changes Application Dictionary content in core: tables, columns, windows, processes. This is a shared namespace and effectively permanent for every installation. See [Changing the Database](./changing-the-database).
- Changes a public API or extension point that plugins build on.
- Changes default behavior, so an existing install behaves differently after upgrade with no configuration change. This is usually discouraged.
- Introduces a new dependency: a library, a database feature, a Java version or a build tool.
- Adds a second way to do something that already exists, or introduces a new architectural pattern.
- Adds a new configuration point, such as a SysConfig key or a preference. Each one is permanent surface area that someone maintains.
- Removes or deprecates anything.
- Contains a migration script that touches existing data.
- Is hard to revert once released.

:::tip

Not sure? Treat it as design-level. A short message costs less than a rejected pull request.

:::

## How it works

1. Start a discussion in the Mattermost [meeting channel](https://mattermost.idempiere.org/idempiere/channels/meeting) before writing the code. Describe the problem, the use case and the approach you have in mind. A Jira ticket is welcome too, but the conversation happens on Mattermost.
2. Give people time to respond. Core developers and implementers will comment, ask questions or suggest alternatives.
3. You can bring the topic to the weekly Friday meeting at any time, even before you post it anywhere else, and ask for a review or a decision.
4. Get an outcome. The answer can be yes, yes with changes, or no.
5. Open the pull request and link the discussion in the description.

## "No" is a valid outcome

The project can decline a proposal. When it does, the answer comes with a reason and is published in the discussion thread. A "no" is about fit for the core project, not about the quality of your work. Many declined ideas work well as a [plugin](./plugin-guidelines).

## Using AI tools to contribute

The agent skills in the core repository give the same guidance. If an AI assistant helps you write a design-level change, it should point you to Mattermost first. The rule is the same either way. See [Using AI Agents](./using-ai-agents).

<!-- TODO: verify — confirm the core repository skills (for example idempiere-core-coding-standards) include the design discussion rule -->
