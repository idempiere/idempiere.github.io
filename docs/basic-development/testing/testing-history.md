---
sidebar_label: Testing history
sidebar_position: 6
description: "How testing in iDempiere changed from the ADempiere tests and FitNesse to JUnit 5, Mockito, coverage reports and Playwright."
tags: [development, architecture, testing]
applies_to: "all"
last_reviewed: 2026-11-24
---
# Testing history

This page records how testing in iDempiere changed over time, so you can tell current practice from old advice. The facts come from the core Git history and the linked JIRA tickets.

## Summary

| Period | Approach |
|---|---|
| Before 2020 | Mostly manual. FitNesse and Selenium were tried, but few tests were written |
| 2020 to 2024 | One JUnit 5 bundle on a real Garden World database becomes the standard |
| 2025 onward | Mockito, coverage measurement, more tests asked for in review, Playwright planned |

## Before 2020: early attempts

| Date | Change | Ticket |
|---|---|---|
| 2006 to 2010 | ADempiere-era JUnit 3/4 tests, mostly in `org.adempiere.extend`. Rarely run or maintained | |
| Nov 2012 | FitNesse integration in core | [IDEMPIERE-206](https://idempiere.atlassian.net/browse/IDEMPIERE-206) |
| Dec 2012 | Selenium integration for the ZK client (`org.idempiere.ui.zk.selenium`) | [IDEMPIERE-92](https://idempiere.atlassian.net/browse/IDEMPIERE-92) |
| 2013 | Load tests of the ZK client with JMeter | [IDEMPIERE-876](https://idempiere.atlassian.net/browse/IDEMPIERE-876) |
| Dec 2019 | FitNesse and Selenium moved out of core | [IDEMPIERE-4138](https://idempiere.atlassian.net/browse/IDEMPIERE-4138) |

## 2020 to 2024: the JUnit 5 suite

| Date | Change | Ticket |
|---|---|---|
| Apr 2020 | Old ADempiere tests removed from `org.adempiere.extend` | [IDEMPIERE-4199](https://idempiere.atlassian.net/browse/IDEMPIERE-4199) |
| May 2020 | New bundle `org.idempiere.test` with JUnit 5, Tycho Surefire and `AbstractTestCase` | [IDEMPIERE-4289](https://idempiere.atlassian.net/browse/IDEMPIERE-4289) |
| May 2020 | Better Garden World test data | [IDEMPIERE-4297](https://idempiere.atlassian.net/browse/IDEMPIERE-4297) |
| Aug 2020 | Unit tests run in the Jenkins daily jobs | [IDEMPIERE-2830](https://idempiere.atlassian.net/browse/IDEMPIERE-2830) |
| Oct 2020 | `org.idempiere.test-feature` added | |
| Nov 2021 | "Improve Unit Tests" umbrella ticket | [IDEMPIERE-5063](https://idempiere.atlassian.net/browse/IDEMPIERE-5063) |
| Feb 2022 | Test coverage configuration in the Eclipse launch | [IDEMPIERE-5183](https://idempiere.atlassian.net/browse/IDEMPIERE-5183) |
| Jun 2022 | Shared `DictionaryIDs` constants replace raw IDs in tests | [IDEMPIERE-5320](https://idempiere.atlassian.net/browse/IDEMPIERE-5320) |
| Aug 2022 | Parallel test execution support | [IDEMPIERE-5391](https://idempiere.atlassian.net/browse/IDEMPIERE-5391) |
| Sep 2022 | Pull request template with a "Tests" section | |
| Jun 2023 | `org.idempiere.test-feature` includes `org.idempiere.test`, so others can run the tests from the command line | [IDEMPIERE-5762](https://idempiere.atlassian.net/browse/IDEMPIERE-5762) |

## 2025 onward: isolation, coverage and browser tests again

| Date | Change | Ticket |
|---|---|---|
| Mar 2025 | Mockito support | [IDEMPIERE-6468](https://idempiere.atlassian.net/browse/IDEMPIERE-6468) |
| Jun 2025 | `Mockito.mockStatic` used to avoid records created outside the test transaction | [IDEMPIERE-6594](https://idempiere.atlassian.net/browse/IDEMPIERE-6594) |
| Aug 2025 | Test coverage push for `org.adempiere.base` (PO, Env, DB, GridTab, Cache, Trx, MRole) | [IDEMPIERE-6647](https://idempiere.atlassian.net/browse/IDEMPIERE-6647) |
| Nov 2025 | Community Testing Days with a shared library of manual test cases | |
| Dec 2025 | JaCoCo aggregate coverage report (`coverage-report` module) | [IDEMPIERE-6784](https://idempiere.atlassian.net/browse/IDEMPIERE-6784) |
| Sep 2026 | Playwright test suite proposed (open) | [IDEMPIERE-7119](https://idempiere.atlassian.net/browse/IDEMPIERE-7119) |
| Oct 2026 | AI agent skill `idempiere-unit-tests` in the core repository | [IDEMPIERE-7109](https://idempiere.atlassian.net/browse/IDEMPIERE-7109) |

## Growth of the test suite

Approximate number of files with "Test" in their name in `org.idempiere.test` at the end of each year (a few helper classes are included):

| Year | Files |
|---|---|
| 2020 | 21 |
| 2021 | 49 |
| 2022 | 76 |
| 2023 | 87 |
| 2024 | 96 |
| 2025 | 133 |
| 2026 (November) | 187 |

In November 2026 the bundle has about 1,700 test methods, and about 150 test classes extend `AbstractTestCase`.

## Back to the start

[Testing overview](./testing-overview.md)
