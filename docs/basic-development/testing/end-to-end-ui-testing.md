---
sidebar_label: End-to-end browser testing
sidebar_position: 5
description: "The state of automated browser tests for the iDempiere ZK client: past Selenium and FitNesse work, ZK IDs and the Playwright proposal."
tags: [development, technical, testing]
applies_to: "all"
last_reviewed: 2026-11-24
---
# End-to-end browser testing

End-to-end tests drive the application the way a user does: log in, open a window, enter data, complete a document. iDempiere has **no automated end-to-end suite in core today**. This page explains what was tried, what is left in the code and what is planned. Applies to all iDempiere versions.

## Current state

- No Selenium, ZATS or Playwright tests in core.
- UI flows are tested by hand. See [Manual testing](./manual-testing.md).
- A Playwright suite is proposed in [IDEMPIERE-7119](https://idempiere.atlassian.net/browse/IDEMPIERE-7119) (open).

## What was tried before

| Year | Tool | What happened |
|---|---|---|
| 2012 | Selenium | Selenium integration for the ZK client ([IDEMPIERE-92](https://idempiere.atlassian.net/browse/IDEMPIERE-92)) |
| 2012 | FitNesse | Acceptance tests written as wiki tables ([IDEMPIERE-206](https://idempiere.atlassian.net/browse/IDEMPIERE-206)). See [FitNesse integration](../../new-features/v1.0/fitnesse-integration.md) |
| 2013 | JMeter | Load tests of the ZK client ([IDEMPIERE-876](https://idempiere.atlassian.net/browse/IDEMPIERE-876)) |
| 2019 | | FitNesse and Selenium moved out of core into separate repositories ([IDEMPIERE-4138](https://idempiere.atlassian.net/browse/IDEMPIERE-4138)) |

Few tests were written with these tools, and they were not kept up to date.

## Fixed component identifiers in ZK

ZK generates random component IDs, which makes browser tests fragile. Core still has the hook that the Selenium work used.

### How it works

`org.adempiere.ui.zk/WEB-INF/zk-selenium.xml` sets `org.adempiere.webui.AdempiereIdGenerator` as the ZK ID generator.

### Turn it on

Add this VM argument to the server launch configuration:

```text
-Dorg.zkoss.zk.config.path=file://${project_loc:org.adempiere.ui.zk}/WEB-INF/zk-selenium.xml
```

:::warning

Use it only on a development or test server, never in production.

:::

## Planned browser test suite

[IDEMPIERE-7119](https://idempiere.atlassian.net/browse/IDEMPIERE-7119) proposes a test suite with [Playwright](https://playwright.dev/).

- **Goal:** turn the manual test cases from Testing Days into Playwright tests that run automatically.
- **Element lookup:** the ticket mentions a test server with fixed ZK IDs. A later comment reports that Playwright can find elements through the field labels of the Application Dictionary, without fixed IDs.
- **How to help:** comment on the ticket before you start, so the work is not duplicated.

<!-- TODO: verify - check IDEMPIERE-7119 for the repository, conventions and status before linking to an implementation -->

## Tips for browser tests on iDempiere

These apply to any browser tool, Playwright or Selenium.

### Data

- Run against a fresh Garden World database that is reset before each run.
- Browser tests commit data. They cannot roll back like `AbstractTestCase`.

### Finding elements

- Find elements by visible label or role, not by generated ZK IDs.

### Waiting

- ZK updates the page through AJAX. Wait for a visible result (a status message, a field value), not for a fixed time.

### Scope

- Keep browser tests for flows that only the UI can show.
- Test business logic with JUnit tests in `org.idempiere.test`, which are faster and more stable.

## Next

[Testing history](./testing-history.md)
