---
title: Building iDempiere Plug-ins with Maven
sidebar_label: Maven Build
sidebar_position: 21
description: Learn how to build iDempiere plug-ins using Maven (Tycho), the build system adopted from iDempiere 6.1 onward.
---

# Building iDempiere Plug-ins with Maven

This tutorial was contributed by Luis Amesty from Amerpsoft Consulting.

From iDempiere version 6.1 onward, Maven (with Tycho) replaced Buckminster as the build system. This guide explains how to structure a Maven-based plug-in project set.

The sample projects referenced below are available at: [Amerpsoft iDempiere Community](https://github.com/luisamesty/Amerpsoft-iDempiere-community)

## Project structure

A Maven-based iDempiere plug-in set uses the following layout:

```
MyPlugins/
  org.myplugin.feature/          ← Feature project
  org.myplugin.editors/          ← Plugin project
  org.myplugin.themes/           ← Fragment project
  org.myplugin.p2.site/          ← P2 repository project
  org.myplugin.p2.targetplatform/ ← Target platform project
  pom.xml                        ← Root Maven POM
```

Keep the plug-in directory alongside (not inside) the iDempiere source tree so it can be built independently and upgraded without merge conflicts.

## Feature project

The feature project lists which plug-ins are included in the feature. P2 projects are not included in the feature XML.

**pom.xml:**

```xml
<project ...>
  <modelVersion>4.0.0</modelVersion>
  <artifactId>org.myplugin.feature</artifactId>
  <parent>
    <groupId>org.idempiere</groupId>
    <artifactId>org.idempiere.parent</artifactId>
    <version>7.1.0-SNAPSHOT</version>
    <relativePath>../../myexperiment/org.idempiere.parent/pom.xml</relativePath>
  </parent>
  <packaging>eclipse-feature</packaging>
</project>
```

**feature.xml:**

```xml
<feature id="org.myplugin.feature" label="My Plugin" version="7.1.0.qualifier">
  <plugin id="org.myplugin.editors" download-size="0" install-size="0"
          version="0.0.0" unpack="false"/>
  <plugin id="org.myplugin.themes" download-size="0" install-size="0"
          version="0.0.0" fragment="true" unpack="false"/>
</feature>
```

:::tip
- Do not add a `<groupId>` to the feature project POM.
- The `<artifactId>` in the POM must match the `id` attribute in `feature.xml`.
- Use `eclipse-feature` as the packaging type.
:::

## Plugin project

**pom.xml:**

```xml
<project ...>
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.idempiere</groupId>
    <artifactId>org.idempiere.parent</artifactId>
    <version>7.1.0-SNAPSHOT</version>
    <relativePath>../../myexperiment/org.idempiere.parent/pom.xml</relativePath>
  </parent>
  <artifactId>org.myplugin.editors</artifactId>
  <packaging>eclipse-plugin</packaging>
</project>
```

**MANIFEST.MF** (key entries):

```
Bundle-SymbolicName: org.myplugin.editors;singleton:=true
Bundle-Version: 7.1.0.qualifier
Require-Bundle: org.adempiere.base;bundle-version="7.1.0", ...
Service-Component: OSGI-INF/*.xml
```

:::tip
- The `<artifactId>` in the POM must match `Bundle-SymbolicName` in `MANIFEST.MF`.
- Use `eclipse-plugin` as the packaging type.
:::

## Fragment project

**pom.xml:**

```xml
<project ...>
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.idempiere</groupId>
    <artifactId>org.idempiere.parent</artifactId>
    <version>7.1.0-SNAPSHOT</version>
    <relativePath>../../myexperiment/org.idempiere.parent/pom.xml</relativePath>
  </parent>
  <artifactId>org.myplugin.themes</artifactId>
  <packaging>eclipse-plugin</packaging>
</project>
```

**MANIFEST.MF** (key entries):

```
Fragment-Host: org.adempiere.ui.zk;bundle-version="7.1.0"
Jetty-WarFragmentFolderPath: /
```

:::tip
Fragments use `eclipse-plugin` as packaging (not `eclipse-fragment`). The `Fragment-Host` entry in `MANIFEST.MF` is what makes it a fragment.
:::

## P2 site project

The P2 site project creates a deployable P2 repository from the feature.

**pom.xml:**

```xml
<project ...>
  <artifactId>org.myplugin.p2.site</artifactId>
  <parent>
    <groupId>org.idempiere</groupId>
    <artifactId>org.idempiere.parent</artifactId>
    <version>7.1.0-SNAPSHOT</version>
    <relativePath>../../myexperiment/org.idempiere.parent/pom.xml</relativePath>
  </parent>
  <packaging>eclipse-repository</packaging>
  <build>
    <plugins>
      <plugin>
        <groupId>org.eclipse.tycho</groupId>
        <artifactId>tycho-p2-repository-plugin</artifactId>
        <executions>
          <execution>
            <id>build-site-p2</id>
            <goals><goal>assemble-repository</goal></goals>
          </execution>
        </executions>
        <configuration>
          <includeAllDependencies>false</includeAllDependencies>
          <xzCompress>false</xzCompress>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

**category.xml:**

```xml
<site>
  <feature url="features/org.myplugin.feature_7.1.0.qualifier.jar"
           id="org.myplugin.feature" version="7.1.0.qualifier">
    <category name="org.myplugin"/>
  </feature>
</site>
```

:::tip
Use `eclipse-repository` as the packaging type. The feature `id` in `category.xml` must match the feature project artifact ID.
:::

## Target platform project

The target platform project points to the local iDempiere P2 repository so Maven can resolve dependencies.

**pom.xml:**

```xml
<project ...>
  <artifactId>org.myplugin.p2.targetplatform</artifactId>
  <parent>
    <groupId>org.idempiere</groupId>
    <artifactId>org.idempiere.parent</artifactId>
    <version>7.1.0-SNAPSHOT</version>
    <relativePath>../../myexperiment/org.idempiere.parent/pom.xml</relativePath>
  </parent>
  <packaging>eclipse-target-definition</packaging>
</project>
```

**`org.myplugin.p2.targetplatform.target`** (adjust the repository path):

```xml
<target name="idempiere-7.1">
  <locations>
    <location ... type="InstallableUnit">
      <unit id="org.adempiere.base.feature.feature.group"/>
      <!-- Add other required feature IDs -->
      <repository location="file:///path/to/myexperiment/org.idempiere.p2/target/repository"/>
    </location>
  </locations>
</target>
```

## Root POM

The root POM at the top of your plug-in directory lists all modules:

```xml
<project ...>
  <artifactId>myplugin-root</artifactId>
  <version>7.1.0-SNAPSHOT</version>
  <packaging>pom</packaging>
  <groupId>org.idempiere</groupId>
  <modules>
    <module>org.myplugin.feature</module>
    <module>org.myplugin.editors</module>
    <module>org.myplugin.themes</module>
    <module>org.myplugin.p2.site</module>
    <module>org.myplugin.p2.targetplatform</module>
  </modules>
</project>
```

## Building

From the root directory of your plug-in set, run:

```shell
mvn verify -Didempiere.target=org.myplugin.p2.targetplatform
```

The generated JAR files will be in:

```
org.myplugin.p2.site/target/repository/plugins/   ← plugin JARs
org.myplugin.p2.site/target/repository/features/  ← feature JARs
```

Install using the [distributing plug-ins](./distributing-plugins) guide, pointing to the generated P2 repository.
