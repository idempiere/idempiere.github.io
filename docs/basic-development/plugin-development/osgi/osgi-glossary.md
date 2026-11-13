---
sidebar_label: OSGi Glossary
sidebar_position: 2
description: Plain-language explanations of the OSGi terms in the iDempiere plug-in guides, for developers writing their first plug-in.
tags: [development]
applies_to: ">=9"
last_reviewed: 2026-10-20
---

# OSGi glossary for plug-in developers

This page explains the OSGi words you meet in the plug-in guides. It is written for developers who write their first iDempiere plug-in and have not used OSGi before.

Applies to iDempiere 9 and later, where the Declarative Services annotations are available. For the history of `MANIFEST.MF` and Equinox, see [OSGi Background](./osgi-background).

## The big picture

You do not need to know OSGi in depth to write a plug-in. These six points are enough to start:

1. Your plug-in is a **bundle**: a jar file with a description file named `MANIFEST.MF`.
2. iDempiere runs on an OSGi framework called **Equinox**. It starts, stops and connects the bundles.
3. Your code adds behavior by publishing a **service**. For example, a process factory is a service.
4. You publish a service by putting the `@Component` annotation on a class. This is **Declarative Services**.
5. Core finds your service and uses it. When several services could answer, the highest **`service.ranking`** goes first.
6. You deliver the bundle to a server as a **feature** from a **p2** repository.

## A small example

This class adds a process factory to iDempiere. It is complete: the annotation publishes it, and `getPackages()` tells it where your process classes are.

```java title="src/com/example/process/MyProcessFactory.java"
package com.example.process;

import org.adempiere.base.AnnotationBasedProcessFactory;
import org.adempiere.base.IProcessFactory;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, service = IProcessFactory.class, property = {"service.ranking:Integer=100"})
public class MyProcessFactory extends AnnotationBasedProcessFactory {

    @Override
    protected String[] getPackages() {
        return new String[] {"com.example.process"};
    }
}
```

Read it from top to bottom:

- [`@Component`](#component-annotation) turns the class into a [component](#component).
- `service = IProcessFactory.class` says which [service](#service) it publishes.
- `immediate = true` creates the component right away. See [immediate](#immediate).
- `service.ranking:Integer=100` sets the [ranking](#serviceranking). Core's own process factories use values from -1 to 1, so yours is asked first.

## Terms from A to Z

### @Activate

A Declarative Services annotation for a method. OSGi calls that method once, when it creates the component. Use it to do start-up work, for example to scan for your classes. The core class `AnnotationBasedModelFactory` uses it. See [Service Annotations](../annotations-instead-xml).

:::warning
The annotation is `@Activate`. There is no `@Activator` annotation in OSGi. An **activator** is a different thing: see [Activator](#activator).
:::

### Activator

A class that implements `org.osgi.framework.BundleActivator`. OSGi calls its `start(BundleContext)` method when the bundle starts and `stop(BundleContext)` when it stops. The bundle names its activator in the `Bundle-Activator` header of `MANIFEST.MF`. For example, `org.adempiere.base` uses `org.adempiere.base.BaseActivator`.

iDempiere offers base classes for activators that load a 2Pack: `AdempiereActivator` and `Incremental2PackActivator`, both in `org.adempiere.plugin.utils`.

An activator is one way to register a service. The newer way is a component with [`@Component`](#component-annotation), which needs no activator class. See [Service Annotations](../annotations-instead-xml).

### Bundle

The unit that OSGi installs, starts and stops. A bundle is a jar file with a `META-INF/MANIFEST.MF`. Eclipse calls the same thing a plug-in, and so does iDempiere. In this documentation, "plug-in" and "bundle" mean the same thing.

### Bundle-ActivationPolicy: lazy

A `MANIFEST.MF` header. OSGi starts the bundle only when something loads a class from it. In the console such a bundle shows as `<<LAZY>>` until then. This is normal, not an error.

### @Component {#component-annotation}

A Declarative Services annotation on a class. It tells OSGi to create the class as a [component](#component) and to publish it as a [service](#service). The `service` attribute names the interface to publish, and `property` sets service properties such as `service.ranking`.

```java title="src/org/adempiere/base/AnnotationBasedModelFactory.java"
@Component(immediate = true, service = IModelFactory.class, property = {"service.ranking:Integer=0"})
```

### Component

An object that OSGi creates and manages for a bundle. A component can publish a service and can ask for other services.

### Declarative Services (DS)

The OSGi specification that lets you declare services and their dependencies instead of writing registration code. You declare them with annotations such as `@Component` and `@Reference`. The build turns the annotations into XML files in `OSGI-INF/`, and the `Service-Component` header in `MANIFEST.MF` points to them. See [Service Annotations](../annotations-instead-xml).

### @Deactivate

The counterpart of [`@Activate`](#activate). OSGi calls the annotated method when it stops the component. Use it to clean up.

### Equinox

The OSGi framework from the Eclipse project. iDempiere runs on it. See [OSGi Background](./osgi-background).

### Factory

An iDempiere pattern, not an OSGi term. Core asks the registered services of a factory interface in `service.ranking` order. For model factories (`IModelFactory`) and process factories (`IProcessFactory`), core uses the first answer that is not `null`. Column callout factories (`IColumnCalloutFactory`) work differently: core asks all of them and runs every callout they return. A plug-in adds behavior by publishing its own factory service. See [Model Factory](../plugin-modelfactory), [Process](../plugin-process) and [Callouts](../plugin-callouts).

### Feature

An Eclipse and p2 term for a group of bundles that you install together. The `update-prd.sh` script installs a feature from a p2 repository. See [Distributing Plug-ins](../distributing-plugins).

### Fragment

A bundle that attaches to a host bundle and shares its class loader. It names the host in the `Fragment-Host` header. The [Dashboard Panel Fragments](../plugin-dashboard-panels) guide creates a fragment of the `org.adempiere.ui.zk` bundle.

### immediate

An attribute of `@Component`. With `immediate = true`, OSGi creates the component as soon as its references are satisfied, instead of waiting until another bundle asks for its service. Most of the plug-in guides use it.

### Import-Package and Require-Bundle

Two headers in `MANIFEST.MF` that state what a bundle needs.

- `Import-Package` names the Java packages the bundle uses. OSGi finds any bundle that exports them.
- `Require-Bundle` names a whole bundle. All of its exported packages become visible.

Plug-ins that use the iDempiere core normally use `Require-Bundle: org.adempiere.base`.

### MANIFEST.MF

The file `META-INF/MANIFEST.MF` in a bundle. It holds the bundle's name, version, dependencies, exports and activator. See [OSGi Background](./osgi-background).

### OSGi console

A command line into the running OSGi framework. Use it to list bundles, see why a bundle did not start, and list the registered services. When you run iDempiere from Eclipse, it is the **Console** view. On a server, connect with Telnet to port 12612, which the [Docker setup](../../../basic-installation/docker) maps. [Running Plug-ins Locally](../plugin-running-locally) uses the `ss` command to check that a plug-in is `ACTIVE`.

### p2

The Eclipse mechanism that installs and updates bundles and features from a repository. See [Distributing Plug-ins](../distributing-plugins).

### @Reference

A Declarative Services annotation on a field or method. It asks OSGi to give the component another service. The component starts only after OSGi can supply every mandatory reference. See [Service Annotations](../annotations-instead-xml).

### Service

A Java object published in the OSGi service registry under one or more interface names, with properties. Other bundles look it up by interface. In iDempiere, core finds plug-in code this way, for example through `Service.locator()`.

### service.ranking

A service property with an integer value. When several services match a lookup, the one with the highest `service.ranking` comes first. A plug-in that must answer before a core factory publishes its service with a higher ranking. Core factories use low values, for example `0` for `AnnotationBasedModelFactory`.

### Service-Component

The header in `MANIFEST.MF` that lists the component XML files, for example `Service-Component: OSGI-INF/*.xml`. Without it OSGi does not see the components of the bundle.

## Bundle states

A bundle moves through these states:

| State | Meaning |
| --- | --- |
| `INSTALLED` | OSGi has the jar but cannot yet match its dependencies. |
| `RESOLVED` | Every dependency is matched. The bundle is not running. |
| `STARTING` | The bundle is starting. A lazy bundle stays here until a class is loaded. |
| `ACTIVE` | The bundle runs. |

If your bundle does not start, open the [OSGi console](#osgi-console) and check it in two steps:

1. Run `ss` to list the bundles and find the state of yours.
2. If it is `INSTALLED`, run `diag <bundle id>`. The output names the missing dependency.

## Common mix-ups

| You may read or write | What is right |
| --- | --- |
| `@Activator` | The annotation is `@Activate`. An activator is a class that implements `BundleActivator`. |
| "Plug-in" and "bundle" are different | They mean the same thing in this documentation. |
| A factory is an OSGi term | It is an iDempiere pattern. The OSGi term is service. |
| My bundle is `<<LAZY>>`, so it failed | It has not been used yet. Lazy bundles start when a class is first loaded. |
| `Import-Package` and `Require-Bundle` do the same | `Import-Package` names packages. `Require-Bundle` names a whole bundle. |
