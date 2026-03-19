---
title: Contributing to iDempiere
sidebar_label: Start Here
sidebar_position: 1
description: Overview of how to get involved with the iDempiere project and where to start
---

First off, thanks for taking the time to contribute.

If you arrived at this page, it means you want to help the project, and we want to make that as easy as possible. iDempiere is a community-driven, volunteer-led open source project, and we need contributors with different kinds of experience to help it grow.

If you have not already, come find us on [Mattermost](https://mattermost.idempiere.org/). We want contributors working on things they are excited about.

:::note
These are guidelines, not strict rules. Use your best judgment, and feel free to propose improvements to this documentation in a pull request.
:::

Before you start, read the [iDempiere Code of Conduct](https://github.com/idempiere/idempiere/blob/master/CODE_OF_CONDUCT.md). Everyone participating in the project is expected to uphold it.

## How can I contribute?

### Report bugs or suggest improvements

If you found a bug, start with the [Bug Reporting Guidelines](./bug-reporting-guidelines).

If the issue is a security vulnerability, follow [How to Report a Vulnerability](./how-to-report-a-vulnerability).

If you have an idea for an enhancement, start with the [New Feature Suggestion Guidelines](./new-feature-suggestion-guidelines).

For early feedback and discussion, use the community channels:

- [Mattermost](https://mattermost.idempiere.org/)
- [iDempiere public forum](https://www.idempiere.org/forums)

There are often existing ideas, ongoing work, or design constraints worth understanding before implementation starts.

### Contribute code

If you want to fix a bug or add an enhancement to the core project, start with these pages:

- [How to Contribute](./how-to-contribute)
- [Fork and Branch Git Workflow](./git-workflow)
- [Common Issues](./common-issues)
- [Changing the Database](./changing-the-database)

In summary, the usual flow is:

1. Create your personal fork.
2. Clone it locally.
3. Synchronize it with the upstream repository.
4. Create a feature branch for your work.
5. Integrate your changes into the source code.
6. Test thoughtfully.
7. Create a commit using the standard message format: `IDEMPIERE-[####] [Ticket Description]`.
8. Push your commit to your own fork.
9. Create a pull request on GitHub.

When you open the pull request, make the review easy: include reproduction steps, tests performed, any required 2Packs or sample data, documentation updates, design rationale, and unit tests when applicable.

After opening the pull request, stay engaged with reviewer feedback. Pull requests or related tickets that receive no answer from the contributor for 60 days can be marked as stale and closed 7 days later if there is still no response. They can be reopened later when work resumes.

See [Fork and Branch Git Workflow](./git-workflow) for the full pull request checklist and inactivity policy.

### Review pull requests

Start with the [Pull Request Review](./pull-request-review) guide.

Code review is also a valuable contribution. Reviewing pull requests helps maintain quality, spread knowledge, and move community work forward.

When reviewing, pay attention to:

- correctness
- collateral impact
- tests
- clarity of the proposed change

The pages in this section, especially [How to Contribute](./how-to-contribute), [Changing the Database](./changing-the-database), and [Common Issues](./common-issues), are also useful references for reviewers.

### Share plugin work

If you built something valuable for the community, start with the [Plugin Guidelines](./plugin-guidelines).

For implementation patterns and extension tutorials, continue with [Developing Plug-Ins](../plugin-development/developing-plugins) so your work is easier for others to understand and adopt.

### Ask questions about the source code

If you have questions about how the code works or how to approach a change, ask in:

- [iDempiere public forum](https://www.idempiere.org/forums)
- [Mattermost support channel](https://mattermost.idempiere.org/idempiere/channels/support)

## Join the team

iDempiere is a community-driven open source project and a volunteer effort. If you want to help, there is room for you to contribute.

See the [contributors graph](https://github.com/idempiere/idempiere/graphs/contributors) and join the team.