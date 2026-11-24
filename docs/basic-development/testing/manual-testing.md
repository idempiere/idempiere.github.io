---
sidebar_label: Manual testing
sidebar_position: 4
description: "How iDempiere changes are tested by hand: in pull request review, in bug reports and during release Testing Days."
tags: [development, functional, testing]
applies_to: "all"
last_reviewed: 2026-11-24
---
# Manual testing

People test what the automated suite does not cover: the ZK user interface, the REST API and full business flows. This page explains where manual testing happens and what is expected from you. Applies to all iDempiere versions.

## What is tested by hand

| Area | Why manual |
|---|---|
| ZK windows and forms in the browser | No browser test suite in core. Some window and form logic is covered by JUnit tests in the `ui`, `form` and `adwindow` packages of `org.idempiere.test` |
| REST API | No API test suite in core. The REST API is a separate project |
| Full business flows (order to invoice, posting) | JUnit tests cover the logic; people check the screens |

## When you open a pull request

The pull request template asks which direct and collateral scenarios you tested.

1. Test the scenario from the ticket.
2. Test the related scenarios that your change could affect.
3. For a UI change, write the steps in the pull request: window, record, action, expected result. For example: Sales Order window, "Joe Block" Business Partner, complete the order, status is Completed.

See [Git workflow](../contributing-to-core/git-workflow.md).

## When you review a pull request

1. Merge the pull request into a temporary branch.
2. Apply its migration scripts.
3. Test beyond the happy path.
4. Report what you tested, honestly.

See [Pull request review](../contributing-to-core/pull-request-review.md).

## When you report a bug

Give steps that reproduce the problem on one of the public [test sites](https://www.idempiere.org/test-sites), so others see the same result. See [Bug reporting guidelines](../contributing-to-core/bug-reporting-guidelines.md).

## Testing Days and release stabilization

Before a release, the community runs a stabilization phase and Testing Days.

### Stabilization phase

- Only bug fixes are merged.
- Plugin maintainers test their plugins against the release candidate.

### Testing Days

- Testers pick test cases from a shared library of manual test cases.
- They run them on prepared PostgreSQL and Oracle test servers.
- The REST API is tested with Postman.
- Results and bugs are coordinated in the Mattermost triage channel and reported in [JIRA](https://idempiere.atlassian.net/).

Announcements are posted in the [iDempiere Google Group](https://groups.google.com/g/idempiere) and on [idempiere.org](https://www.idempiere.org).

## Next

[End-to-end UI testing](./end-to-end-ui-testing.md)
