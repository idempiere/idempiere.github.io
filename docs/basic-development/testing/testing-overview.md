---
sidebar_label: Testing overview
sidebar_position: 1
description: "The test levels used in iDempiere, what exists for each one today, and which kind of test to write for your change."
tags: [development, technical, architecture, testing]
applies_to: "all"
last_reviewed: 2026-11-24
---
# Testing overview

This page explains how iDempiere is tested and which kind of test fits your change. Start here, then follow the pages of this section in order. The test levels on this page apply to all iDempiere versions. The `org.idempiere.test` bundle exists since iDempiere 8, and the commands and examples on the following pages apply to iDempiere 12 and later. Details checked against the master branch (version 14) in November 2026.

## In one minute

- Almost all automated tests are in one bundle, `org.idempiere.test`.
- They are **JUnit 5 tests that run inside OSGi against a real database** with Garden World data. The project calls them unit tests; in industry terms they are integration tests.
- They are **skipped by default**. Run them with `./mvnw verify -DskipTests=false`.
- There is **no automated UI test suite** in core. People test the UI by hand.
- Releases also depend on **manual testing**: pull request review and Testing Days.

## Read this section in order

| Step | Page | You learn |
|---|---|---|
| 1 | This page | The test levels and which test to write |
| 2 | [Running core tests](./core-tests/running-core-tests.md) | How to run the suite and read the results |
| 3 | [Writing core tests](./core-tests/writing-core-tests.md) | How to write a test with `AbstractTestCase` |
| 4 | [Troubleshooting core tests](./core-tests/troubleshooting-core-tests.md) | How to fix a failing or missing test |
| 5 | [Testing plugins](./testing-plugins.md) | How to test your own plugin |
| 6 | [Manual testing](./manual-testing.md) | How pull requests and releases are tested by hand |
| 7 | [End-to-end UI testing](./end-to-end-ui-testing.md) | The state of browser tests and the Playwright plan |
| 8 | [Testing history](./testing-history.md) | How testing changed from 2006 to today |

## Test levels

Each level below uses the usual industry name, then says what iDempiere has for it.

### Static analysis

- **Checks:** code smells and security patterns, without running code.
- **In iDempiere:** a SonarQube workflow in GitHub Actions, started by hand (`.github/workflows/sonarqube.yml`).

### Unit tests

- **Checks:** one class in isolation, no database, in milliseconds.
- **In iDempiere:** few. Some tests in `org.idempiere.test` use only plain Java and Mockito, but they run in the same OSGi suite as the rest.
- **Read:** [Writing core tests](./core-tests/writing-core-tests.md#replace-static-lookups-with-mockito).

### Integration tests

- **Checks:** classes working together with the database, the Application Dictionary and the login context.
- **In iDempiere:** **the main kind.** About 150 test classes extend `AbstractTestCase` and run on Garden World inside a transaction that is rolled back after each test.
- **Read:** [Running core tests](./core-tests/running-core-tests.md), [Writing core tests](./core-tests/writing-core-tests.md).

### Component (plugin) tests

- **Checks:** a plugin's own logic, its OSGi wiring and its model hooks.
- **In iDempiere:** a separate test bundle per plugin, built like `org.idempiere.test`. There is no official template.
- **Read:** [Testing plugins](./testing-plugins.md).

### API tests

- **Checks:** REST or web service requests and responses.
- **In iDempiere:** no automated suite in core. Tested by hand (for example with Postman) during Testing Days. The REST API is a separate project.
- **Read:** [Manual testing](./manual-testing.md).

### End-to-end (UI) tests

- **Checks:** a user flow in the browser, from login to a completed document.
- **In iDempiere:** none in core. Selenium and FitNesse were used from 2012 and moved out of core in 2019. Playwright is the proposed replacement.
- **Read:** [End-to-end UI testing](./end-to-end-ui-testing.md).

### Performance tests

- **Checks:** speed and load.
- **In iDempiere:** a few cache tests in the `performance` package of `org.idempiere.test`. JMeter was used for ZK load tests in 2013.

### Acceptance and exploratory testing

- **Checks:** a person confirms that the change does what the ticket asks.
- **In iDempiere:** pull request review and Testing Days with a shared library of test cases.
- **Read:** [Manual testing](./manual-testing.md).

### Coverage

- **Checks:** how much code the tests run.
- **In iDempiere:** a JaCoCo aggregate report in the `coverage-report` module.
- **Read:** [Running core tests](./core-tests/running-core-tests.md#build-the-coverage-report).

## The test pyramid in iDempiere

The usual advice is many fast unit tests at the bottom, fewer integration tests in the middle and a few end-to-end tests at the top. iDempiere has a different shape:

| Layer | Size in iDempiere | Why |
|---|---|---|
| Top: end-to-end | Manual only | No browser test suite in core |
| Middle: integration | Large | The PO model layer, the Application Dictionary and `Env` context are used everywhere, so most tests need a database |
| Bottom: unit | Thin, growing | Since 2025, Mockito `mockStatic` replaces static lookups such as `MSysConfig` |

When you write a test, use the lowest level that can show the bug. Use Mockito to avoid database updates where you can, and `AbstractTestCase` when the logic needs real records.

## Which test should I write?

| Your change | Write | Base class |
|---|---|---|
| Core bug fix in model, process, accounting, costing or utility code | A test in `org.idempiere.test` that fails before the fix and passes after it | `AbstractTestCase` |
| New core business logic | Tests in the matching `org.idempiere.test` package | `AbstractTestCase` |
| Pure Java logic with no iDempiere classes loaded | A plain JUnit 5 test, with Mockito for collaborators | none |
| A plugin: model validator, event handler, process, factory | A test bundle for the plugin | `AbstractTestCase` for code that saves records |
| A ZK UI change only | Usually no automated test. Write the manual test steps in the pull request | |

Before you open a pull request, all existing tests must still pass, and the pull request template asks which tests you added and ran. See [How to contribute](../contributing-to-core/how-to-contribute.md) and [Git workflow](../contributing-to-core/git-workflow.md).

## Next

[Running core tests](./core-tests/running-core-tests.md)
