---
sidebar_label: Testing plugins
sidebar_position: 3
description: "Test an iDempiere plugin with a plain JUnit module for pure logic and an OSGi test bundle on AbstractTestCase for the rest."
tags: [development, technical, testing]
applies_to: ">=12"
last_reviewed: 2026-11-24
---
# Testing plugins

This page shows how to set up tests for your own plugin. Plugin tests do not go into `org.idempiere.test`; each plugin has its own test project that reuses the core test support. Applies to iDempiere 12 and later.

:::info

The project has no official template for plugin tests yet. This page describes common community practice. Where it differs from `org.idempiere.test/pom.xml`, copy from that file.

:::

## Before you start

- Your plugin builds with Maven and Tycho. See [Building plug-ins with Maven](../plugin-development/plugin-maven-build.md).
- You can run the core tests. See [Running core tests](./core-tests/running-core-tests.md).

## Step 1: Choose the kind of test

| The code under test | Test it with | Runs |
|---|---|---|
| Pure Java, nothing from `org.compiere` or `org.adempiere` is loaded | A plain JUnit 5 module (with Mockito) | Maven Surefire, no OSGi, no database, seconds |
| OSGi wiring: component registration, factories, service ranking | An OSGi test bundle | Tycho, OSGi runtime |
| Model validators, event handlers, processes, anything that saves records | An OSGi test bundle with tests on `AbstractTestCase` | Tycho, OSGi runtime, Garden World database |
| ZK UI only | Manual test steps in the pull request | |

:::tip

A class that looks pure but initialises iDempiere statics (a static `CLogger`, an `MSysConfig` lookup) fails in a plain module. Put its tests in the OSGi test bundle.

:::

## Step 2: Create the OSGi test bundle

Create a project `<plugin>.test` next to your plugin and add it to your build. A common layout makes it a **fragment of the plugin under test**, so the tests can see packages that the plugin does not export.

### Manifest

```text title="com.example.myplugin.test/META-INF/MANIFEST.MF"
Bundle-ManifestVersion: 2
Bundle-SymbolicName: com.example.myplugin.test
Bundle-Version: 1.0.0.qualifier
Fragment-Host: com.example.myplugin
Bundle-RequiredExecutionEnvironment: JavaSE-17
Require-Bundle: org.adempiere.base,
 org.idempiere.test
Import-Package: org.assertj.core.api,
 org.junit.jupiter.api,
 org.junit.jupiter.api.extension,
 org.junit.jupiter.params,
 org.junit.jupiter.params.provider
```

- `Fragment-Host` is your plugin, not `org.idempiere.test`.
- `org.idempiere.test` gives you `AbstractTestCase`, `DictionaryIDs` and Mockito, which it exports.
- Do not mark `org.idempiere.test` as optional. If it cannot be resolved you want one clear error, not hundreds of compile errors.

### Build properties

```text title="com.example.myplugin.test/build.properties"
source.. = src/
output.. = target/classes/
bin.includes = META-INF/,.
```

### Maven project file

The parts that matter:

- `<packaging>eclipse-test-plugin</packaging>`
- `<skipTests>true</skipTests>` as the default, passed to `tycho-surefire-plugin` as `<skipTests>${skipTests}</skipTests>`
- `tycho-surefire-plugin` with `<argLine>-DIDEMPIERE_HOME=${idempiere.home}</argLine>` and `<providerHint>junit59</providerHint>`
- The plugin under test and the bundles it needs, listed as extra requirements of the target platform so they are in the test runtime

`org.idempiere.test` is not published to the iDempiere P2 repository. Build it in the same reactor as your plugin, or publish it to your own repository. <!-- TODO: verify - confirm that no public P2 or Maven repository carries org.idempiere.test -->

## Step 3: Write the tests

Tests in the OSGi bundle follow the same rules as core tests: extend `AbstractTestCase`, pass `getTrxName()` everywhere, use `DictionaryIDs`, avoid updates to shared data and avoid `commit()`. See [Writing core tests](./core-tests/writing-core-tests.md).

Test the plugin through the path that iDempiere uses. For a model validator or event handler, save or complete the record and check the result, instead of calling the handler method directly. This also proves that the handler is registered.

## Step 4: Run the tests

Run from the build root, so the freshly built plugin is used:

```bash
mvn clean verify -DskipTests=false -Dtest=MyValidatorTest -DfailIfNoTests=false -Dsurefire.failIfNoSpecifiedTests=false -Didempiere.home=/path/to/folder/with/idempiere.properties
```

`-Dtest` applies to every test bundle in the build. If `org.idempiere.test` is in the same build, it has no `MyValidatorTest` and Tycho stops with "No tests found". `-DfailIfNoTests=false` prevents that. If the build also has a plain JUnit module (see below), Maven Surefire fails there for the same reason; `-Dsurefire.failIfNoSpecifiedTests=false` prevents that. Check that your test ran: results are in `<plugin>.test/target/surefire-reports/`.

## Optional: a plain JUnit module

For pure logic, a separate `jar` module with `junit-jupiter` and `maven-surefire-plugin` runs with `mvn test` in seconds and needs no database. Add a test there only when it passes there. If it needs the OSGi runtime, it belongs in the test bundle.

## Related pages

- [Unit Tests in iDempiere Plug-ins presentation (15 Minutes in iDempiere)](https://www.youtube.com/watch?v=rAtmhHeewk4), a community video by Saúl Piña. It shows a different setup from this page: mock-based tests in a test fragment from the [iDempiere plugin scaffold](https://github.com/ingeint/idempiere-plugin-scaffold), run by Maven Surefire without the OSGi runtime or a database.
- [Running plug-ins locally](../plugin-development/plugin-running-locally.md)
- [Testing extensions locally](../plugin-development/extension-registry-local-testing.md), for the manual install and update checks of an extension

## Next

[Manual testing](./manual-testing.md)
