---
sidebar_label: Running core tests
sidebar_position: 1
description: "Run the org.idempiere.test suite from Maven, Eclipse or IntelliJ, read the results and build the coverage report."
tags: [development, technical, testing]
applies_to: ">=12"
last_reviewed: 2026-11-24
---
# Running core tests

This page shows how to run the core test suite and read its results. Applies to iDempiere 12 and later. The `org.idempiere.test` bundle exists since iDempiere 8; older versions differ in details.

## What you run

- **Where:** the `org.idempiere.test` bundle in the [idempiere repository](https://github.com/idempiere/idempiere).
- **What:** JUnit 5 tests, built and run by Tycho inside an OSGi runtime.
- **Against:** a real iDempiere database with Garden World data, PostgreSQL or Oracle.

## Before you start

- You can build iDempiere from source. See [Introduction to iDempiere development](../../introduction.md).
- An `idempiere.properties` file in the repository root points to a database with Garden World data. The tests find it through `-DIDEMPIERE_HOME=..`, set in `org.idempiere.test/pom.xml`.
- All migration scripts are applied to that database:

  ```bash
  bash RUN_SyncDBDev.sh
  ```

:::warning

`idempiere.properties` usually holds database credentials. Never commit it, paste it into a pull request or share it in a chat.

:::

## Run from the terminal

Tests are **skipped by default** (`<skipTests>true</skipTests>` in `org.idempiere.test/pom.xml`). Always pass `-DskipTests=false` and use the `verify` goal.

### Run the whole suite

```bash
./mvnw clean verify -DskipTests=false
```

This builds iDempiere and runs every test. It takes a long time. Run it before you open a pull request.

### Run one class

```bash
./mvnw verify -DskipTests=false -Dtest=InOutTest
```

### Run one method

The Maven build cannot run a single method. Tycho 4.0.8, which the core build uses, turns `-Dtest` into a class file pattern, so `-Dtest='InOutTest#testMatShipmentPosting'` matches no test. Run one method from Eclipse or IntelliJ instead. See [Run from your editor](#run-from-your-editor).

:::note

`mvn test` does not run these tests. Tycho runs OSGi tests in the `integration-test` phase, so use `verify` or `install`. A green build without `-DskipTests=false` means no test ran.

:::

Use `clean` when you switch branches or review a pull request, so leftover build output does not hide compile errors.

## Run from your editor

### Eclipse

1. Open `org.idempiere.test/idempiere.unit.test.launch`.
2. Run it as a **JUnit Plug-in Test**. A plain "JUnit Test" has no OSGi runtime and fails at startup.
3. To run one class or one method, open Run => Run Configurations, duplicate `idempiere.unit.test`, and select the class and method on the Test tab.

:::warning

Do not start a test with Run As => JUnit Plug-in Test from the context menu. Eclipse then creates a new launch configuration with the project folder as working directory, so iDempiere does not find `idempiere.properties` in the repository root.

:::

The launch configuration lists its bundles one by one. If the tests need a new bundle, add it to the launch as well.

### IntelliJ

The repository ships the run configurations `org.idempiere.test`, `org.idempiere.test.SelectedClass` and `org.idempiere.test.SelectedClass.Method`. They need the Eclipse PDE Partial plugin 1.6.8 or newer. See [Development with IntelliJ](../../../new-features/v12/development-with-intellij.md).

## Read the results

1. Open `org.idempiere.test/target/surefire-reports/`.
2. Find the `.txt` file of the failing class. It holds the assertion message and the stack trace.
3. Check whether the same test also fails on `master`. If it does, say so in the pull request.

## Run tests in parallel

- The Maven build runs tests in one thread (`junit.jupiter.execution.parallel.enabled=false`).
- `org.idempiere.test/idempiere.unit.test.parallel.launch` runs test classes in parallel in Eclipse. Use it to check that your test does not depend on other tests.
- Tests that change shared data carry the JUnit 5 `@Isolated` annotation, so they never run at the same time as others.

## Build the coverage report

In iDempiere 13 and later, the `coverage-report` module builds a JaCoCo aggregate report over the core bundles whenever the tests run ([IDEMPIERE-6784](https://idempiere.atlassian.net/browse/IDEMPIERE-6784)):

```bash
./mvnw clean verify -DskipTests=false
```

The report is written under `coverage-report/target/site/`. <!-- TODO: verify - exact folder name (jacoco-aggregate) -->

iDempiere 12 has no `coverage-report` module, so this command builds no report there. On version 12, use the coverage configuration of the Eclipse launch ([IDEMPIERE-5183](https://idempiere.atlassian.net/browse/IDEMPIERE-5183)).

## Continuous integration

- The project runs builds and the test suite on [Jenkins](https://jenkins.idempiere.org/), in the daily jobs.
- GitHub Actions in the core repository only hold a SonarQube analysis that is started by hand. They do not run the tests.
- So run the tests yourself before you open a pull request.

## Check that it worked

- The Maven output lists `Tests run: N` with `N` greater than 0 for `org.idempiere.test`.
- `org.idempiere.test/target/surefire-reports/` contains a report for each class you ran.

If either is missing, see [Troubleshooting core tests](./troubleshooting-core-tests.md).

## Next

[Writing core tests](./writing-core-tests.md)
