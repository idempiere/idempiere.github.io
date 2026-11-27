# Troubleshooting core tests

> Fix core tests that do not run, cannot find data, leak data between tests or fail on documents, posting or mocks.

This page lists the common problems with core tests, grouped by symptom. Start with the report of the failing class in `org.idempiere.test/target/surefire-reports/`. Applies to iDempiere 12 and later.

## The build is green but no test ran

- `-DskipTests=false` is missing. Tests are skipped by default.
- `mvn test` was used. Use `verify` or `install`; Tycho runs OSGi tests in the `integration-test` phase.

## A test is not found

- The test uses JUnit 4 imports (`org.junit.Test`). Use JUnit 5: `org.junit.jupiter.api.Test`.
- In Eclipse, the class was run as "JUnit Test". Use the `idempiere.unit.test` launch, or a copy of it with your class selected. See [Run from your editor](./running-core-tests.md#run-from-your-editor).
- A bundle the test needs is missing from `idempiere.unit.test.launch`. Add it to the launch.

## Tests fail at startup or the context is empty

- `idempiere.properties` is missing in the repository root, or the database is not reachable.
- The class does not extend `AbstractTestCase`, so iDempiere is not started and there is no login context.
- A subclass overrides `init(TestInfo)` without `@BeforeEach` or without calling `super.init(testInfo)` first.
- Context values are set in `@BeforeAll`. They are reset before each test; set them in `@BeforeEach`.

## Many tests fail on a fresh database

Migration scripts are not applied. Run `bash RUN_SyncDBDev.sh`, then run the tests again.

## Record not found, or "Transaction closed"

- A model constructor, `Query` or `DB` call gets `null` instead of `getTrxName()`, so it reads or writes outside the test transaction.
- A process run by the test commits or closes the test transaction. Keep the process inside the test transaction.
- `save()` returned false without an error. Use `saveEx()` to see the reason.

## A test passes alone but fails in the full suite

- The test depends on data that another test changed, or on the order of tests.
- A test committed data. Remove `commit()`, or clean up in a `finally` block and mark the class `@Isolated`.
- The test depends on today's date. `getLoginDate()` is the current time, so it does not help. Set a fixed date on the records, or override `newLoginDetails(TestInfo)` to log in with a fixed date.

## A document does not complete or posting is wrong

- Read `info.getSummary()` from `runDocumentActionWorkflow`. It gives the reason.
- Call `po.load(getTrxName())` before you read `DocStatus` or `isPosted()`.
- For posting, compare with the existing tests in the `acct` and `costing` packages.

## A mock has no effect

- The `MockedStatic` is not open around the call. Use try-with-resources around the code under test.
- The stubbed method is a different overload from the one the code calls. Match the arguments, or use `any()`.
- The code runs on another thread. Static mocks apply only to the current thread.

## Next

[Testing plugins](../testing-plugins.md)
