---
sidebar_label: Writing core tests
sidebar_position: 2
description: "Write a JUnit 5 test in org.idempiere.test step by step with AbstractTestCase, DictionaryIDs, document actions and Mockito."
tags: [development, technical, testing]
applies_to: ">=12"
last_reviewed: 2026-11-24
---
# Writing core tests

This page walks you through writing a core test, from choosing where it goes to reporting it in the pull request. Applies to iDempiere 12 and later. Mockito is available from iDempiere 12 ([IDEMPIERE-6468](https://idempiere.atlassian.net/browse/IDEMPIERE-6468)).

On the master branch (iDempiere 14 and later), the core repository ships an AI agent skill with the same rules: `.agents/skills/idempiere-unit-tests/SKILL.md`, with a template in `references/test-template.java`. See [Using AI agents](../../contributing-to-core/using-ai-agents.md).

For a recorded walkthrough, watch [Unit tests in iDempiere's core (15 Minutes in iDempiere)](https://www.youtube.com/watch?v=bO71gw3is5I&t=412s).

## Before you start

- You can run the suite. See [Running core tests](./running-core-tests.md).
- You know which behaviour the test must prove: the bug that the fix removes, or the rule that the new logic adds.

## Step 1: Decide whether a test is expected

| Change | Test expected? |
|---|---|
| Bug fix in logic that runs without the UI | Yes. The test fails before the fix and passes after it |
| New business logic (model classes, processes, accounting, costing, utilities) | Yes |
| Refactoring | Existing tests stay green. If the code has no tests, add them first |
| UI-only (ZK) change | Usually no. Write the manual test steps in the pull request |

## Step 2: Choose the package and class

Put the test in the package for its area under `org.idempiere.test/src/org/idempiere/test/`:

| Package | For |
|---|---|
| `base` | Core utilities and documents (`InOutTest`, `InvoiceTest`, `EnvTest`, `DBTest`) |
| `model` | Model classes, callouts, allocations, bank statements |
| `acct`, `costing` | Posting and costing |
| `process`, `workflow`, `event`, `form`, `print`, `ui`, `dashboard` | The matching area |

- Add a method to an existing test class for the same model or feature when there is one.
- Otherwise name the new class `<Subject>Test` and start it with the GPLv2 header used by the other files.

## Step 3: Write the test

Each test follows Arrange, Act, Assert:

```java title="org.idempiere.test/src/org/idempiere/test/model/SampleOrderTest.java"
package org.idempiere.test.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.math.BigDecimal;

import org.compiere.model.MBPartner;
import org.compiere.model.MOrder;
import org.compiere.model.MOrderLine;
import org.compiere.process.DocAction;
import org.compiere.process.ProcessInfo;
import org.compiere.util.Env;
import org.compiere.wf.MWorkflow;
import org.idempiere.test.AbstractTestCase;
import org.idempiere.test.DictionaryIDs;
import org.junit.jupiter.api.Test;

/**
 * IDEMPIERE-#### what this test verifies
 */
public class SampleOrderTest extends AbstractTestCase {

	@Test
	public void testCompleteSalesOrder() {
		// Arrange: always pass getTrxName(), it is rolled back after the test
		MOrder order = new MOrder(Env.getCtx(), 0, getTrxName());
		order.setBPartner(MBPartner.get(Env.getCtx(), DictionaryIDs.C_BPartner.JOE_BLOCK.id));
		order.setC_DocTypeTarget_ID(DictionaryIDs.C_DocType.STANDARD_ORDER.id);
		order.setIsSOTrx(true);
		order.setDateOrdered(getLoginDate());
		order.setDocStatus(DocAction.STATUS_Drafted);
		order.setDocAction(DocAction.ACTION_Complete);
		order.saveEx();

		MOrderLine line = new MOrderLine(order);
		line.setM_Product_ID(DictionaryIDs.M_Product.AZALEA_BUSH.id);
		line.setQty(BigDecimal.ONE);
		line.saveEx();

		// Act: run the document workflow, as the UI does
		ProcessInfo info = MWorkflow.runDocumentActionWorkflow(order, DocAction.ACTION_Complete);

		// Assert
		assertFalse(info.isError(), info.getSummary());
		order.load(getTrxName());
		assertEquals(DocAction.STATUS_Completed, order.getDocStatus(), "Order should be completed");
	}
}
```

The sections below explain each part.

### Extend the base test class

`org.idempiere.test.AbstractTestCase` starts iDempiere once per test class and prepares each test method:

- **Login context:** Garden World Tenant, HQ Organization, admin User and Role, HQ Warehouse, `en_US`, primary accounting schema.
- **Transaction:** a new one per test, from `getTrxName()` or `getTrx()`, rolled back in `@AfterEach`.
- **Helpers:** `getAD_Client_ID()`, `getAD_Org_ID()`, `getAD_User_ID()`, `getAD_Role_ID()`, `getM_Warehouse_ID()`, `getLanguage()`, `getLoginDate()`, `commit()`, `rollback()`.

Rules that follow:

- Pass `getTrxName()` to every model constructor, `Query` and `DB` call. A `null` transaction writes outside the test and leaves data behind.
- Use `Env.getCtx()`, not a new `Properties` object.
- Use `saveEx()`, not `save()`, so a failed save shows its reason.
- For your own setup, add a separate `@BeforeEach` method. If you override `init(TestInfo)`, annotate the override with `@BeforeEach` and call `super.init(testInfo)` first. Without the annotation, JUnit 5 runs neither method.

### Refer to records with DictionaryIDs

`org.idempiere.test.DictionaryIDs` holds named constants for Garden World records, for example `DictionaryIDs.C_BPartner.JOE_BLOCK.id` ("Joe Block" Business Partner) or `DictionaryIDs.M_Product.AZALEA_BUSH.id` ("Azalea Bush" Product).

- Never write raw IDs in a test.
- If a record you need is missing, add an enum constant with the real ID and UUID from the Garden World database. Never invent IDs.

### Run documents and processes as the UI does

- Run a document action with `MWorkflow.runDocumentActionWorkflow(po, action)`. The action you pass decides what happens: `DocAction.ACTION_Complete` completes the document, `DocAction.ACTION_Void` voids it.
- Assert `assertFalse(info.isError(), info.getSummary())`. The summary tells you why a document did not complete.
- Call `po.load(getTrxName())` before you read `DocStatus` or `isPosted()`.
- For posting, follow the tests in the `acct` and `costing` packages and the `FactAcct` helper in `org.idempiere.test`.
- When a test runs a process, use `ServerProcessCtl.process(pi, getTrx(), false)`, as the tests in the `costing` package do. It reads the process class from the process definition, and `false` stops it from committing and closing the test transaction. The shorter overload `ServerProcessCtl.process(pi, getTrx())` commits when the process succeeds.
- A process that commits internally still commits, and the rollback in `@AfterEach` does not remove its data. Delete that data in a `finally` block with a separate transaction that you commit, and mark the class `@Isolated`.

### Write clear assertions

- Assert the specific outcome with a message: `assertEquals(expected, actual, "why")`.
- Test one behaviour per method.
- Cover failure and edge cases (empty, zero, boundary, validation error), not only the happy path.
- AssertJ is available as well (`org.assertj.core.api`).

## Step 4: Keep the test independent

The suite can run test classes in parallel, and tests must not depend on their order.

- Create the records you need as new rows in the test transaction.
- **Do not update shared Garden World records** (SysConfig, Client Info, Products, conversion rates) to set up a scenario. Updates lock rows, slow the suite and break parallel runs.
- Do not depend on the current date. `getLoginDate()` returns the time the test started, so set fixed dates on your records when the result depends on the date. If the code under test reads the login date, also override `newLoginDetails(TestInfo)` to log in with a fixed date.
- Avoid `commit()`. If the code under test needs committed data, clean up afterwards and mark the class with JUnit 5 `@Isolated`.

### Replace static lookups with Mockito

Use `mockStatic` to change what a static getter returns for one block, instead of changing data in the database:

```java
try (MockedStatic<MSysConfig> mocked = Mockito.mockStatic(MSysConfig.class, Mockito.CALLS_REAL_METHODS)) {
	mocked.when(() -> MSysConfig.getBooleanValue(MSysConfig.EXPORT_BLOB_COLUMN_FOR_INSERT, true, Env.getAD_Client_ID(Env.getCtx())))
		.thenReturn(true);
	// code under test
}
```

- `CALLS_REAL_METHODS` keeps every other method of the class real.
- Static mocks apply only to the current thread. Code on another thread sees the real method.
- Examples in the suite: `base/POInsertSQLTest.java` for `MSysConfig`, and `ConversionRateHelper.mockStatic()` used in `base/MatchInvTestIsolated.java` for conversion rates.

## Step 5: Run the test

1. Run your class: `./mvnw verify -DskipTests=false -Dtest=SampleOrderTest -DfailIfNoTests=false`.
2. For a bug fix, check that the test fails without your fix and passes with it.
3. Run the whole suite before you open the pull request.

See [Running core tests](./running-core-tests.md) for all options.

## Step 6: Report it in the pull request

- List the tests you added or changed.
- Give the exact command you ran and the result.
- If you did not run the full suite, or a test already failed on `master`, say so.

## Next

[Troubleshooting core tests](./troubleshooting-core-tests.md)
