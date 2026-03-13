---
title: Pull Request Review
sidebar_label: Pull Request Review
sidebar_position: 5
description: How to review and test iDempiere pull requests so good changes move faster and risky changes are caught early
---

This page is part of the list of contribution paths described in [Contributing to iDempiere](./contributing-to-idempiere).

There are many pull requests being submitted to the project, and you can help the core team by reviewing and testing them.

## Why this matters

Pull requests have been the default way of contributing code to the project since April 2020.

Because iDempiere is an open source project, code quality matters directly to the whole community. Well-written bug fixes and features benefit everyone. Poorly implemented changes can create regressions, collateral damage, or security problems in the core.

The project leaders put strong emphasis on keeping code quality high, but the more pull requests the project receives, the longer the review queue becomes. Community reviewers help by acting as an early filter and by validating changes before they reach the core team.

If you review carefully, you help important fixes and enhancements reach the project faster.

## How can I review a pull request?

At a high level, every pull request review should answer two questions:

1. Is the code well written and free of collateral damage or security issues?
2. Does the code do what it claims to do?

You can start with code review directly on GitHub, and then test the functionality locally.

## Code review

Start with one of the [open pull requests](https://github.com/idempiere/idempiere/pulls).

- Open the list of commits and the changed files to understand what the developer changed.
- Check whether the submitted code follows the project's contribution guidance:
  - [How to Contribute](./how-to-contribute)
  - [Common Issues](./common-issues)
  - [Changing the Database](./changing-the-database), if database changes are involved

The main points to consider are:

- The change must work in both PostgreSQL and Oracle.
- Prefer the data model and query APIs over raw SQL when possible.
- If database changes were made, the migration scripts must be present.
- JDBC should be avoided unless there is no better option. If it is used, resources must be closed properly.
- All code, comments, and identifiers should be written in English.
- The pull request should stay focused on one purpose and only touch the classes needed to solve the ticket.
- The proposed implementation should not introduce obvious security risks or collateral damage.

Once you are confident that the code follows the project's guidelines and best practices, test it locally.

## Review functionality

Use a disposable local branch for review so your `master` branch stays clean.

```bash
git checkout master
git pull upstream master
git checkout -b review-IDEMPIERE-1848
git pull --no-commit https://github.com/<pull-request-user>/idempiere.git IDEMPIERE-1848
```

Adjust the repository URL and branch name to match the pull request you are testing.

Once the changes are in your local environment:

1. Apply the migration scripts if necessary.
2. Run iDempiere and test the requested change.
3. Test more than the happy path. Verify that existing functionality still behaves correctly.
4. Check related areas that might be affected by the change, not only the exact scenario described by the ticket.

The system should behave exactly as before except for the intended new behavior or fix.

After the review, return to `master` and remove the temporary branch if you no longer need it.

## Report your findings

After performing your review, report your findings on the JIRA ticket or add a comment directly on the pull request.

Be specific about:

- what you reviewed
- what you tested
- what worked
- what failed
- any suggestions you have for improving the solution

If the result is positive, say that you tested the change and that it looks correct for the scenarios you covered.

If you found issues, describe them clearly and, if possible, explain how they might be solved.

## TL;DR

1. Choose one of the [open pull requests](https://github.com/idempiere/idempiere/pulls).
2. Review the code against the project's contribution guidelines.
3. Test the ticket locally.
4. Check for collateral damage and security issues.
5. Report your findings on JIRA or on the pull request.

Test thoughtfully and be completely honest about what you did and did not test. In an open source community, your review quality affects both the project and your own credibility.