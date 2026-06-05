---
title: OSGi and MANIFEST.MF Background
sidebar_label: OSGi Background
sidebar_position: 10
description: Background reference on MANIFEST.MF, plugin.xml, OSGi concepts, and key iDempiere plug-in projects.
---

# OSGi and MANIFEST.MF Background

This page provides deeper explanations for concepts introduced in [Running Plug-ins Locally in iDempiere](./plugin-running-locally). The information here is not strictly required to follow the tutorial, but it can help you build a clearer mental model of how iDempiere's plug-in system works.

## MANIFEST.MF

**Short version:** `MANIFEST.MF` is the file that configures all attributes of your OSGi plug-in. It lives at `META-INF/MANIFEST.MF` inside your plug-in's jar file and is read by the OSGi framework (Equinox) to discover the plug-in's capabilities. It may be accompanied by a `plugin.xml` file for some Equinox-specific needs.

### Longer explanation

Two files describe an OSGi plug-in's attributes: `META-INF/MANIFEST.MF` and `plugin.xml`. To understand why both exist, a bit of history helps.

This technology originates in the Eclipse Platform. Originally, Eclipse used a `plugin.xml` file to describe plugin attributes. Starting around Eclipse 3.1, Eclipse adopted a new plugin system based on Equinox — an implementation of the OSGi Plugin Architecture developed as part of the Eclipse project.

OSGi defines `META-INF/MANIFEST.MF` as the standard way to describe a plugin's attributes. Switching entirely to the new system would have been straightforward, except for one problem: the OSGi standardization process is slow, and Eclipse needed capabilities that weren't yet standardized. So the Equinox framework implemented the standard OSGi behavior through `MANIFEST.MF` and used `plugin.xml` as a second configuration file for Equinox-specific extensions.

### For iDempiere developers

iDempiere uses Equinox as its OSGi implementation. You can use both configuration styles. `plugin.xml` is only needed when you require Equinox-specific features. For most plug-in configuration, `MANIFEST.MF` is the right place.

### Further reading

- [Vogella - Eclipse Plug-in Development](http://www.vogella.com/articles/EclipsePlugIn/article.html)
- [Vogella - Eclipse Extension Points](http://www.vogella.com/articles/EclipseExtensionPoint/article.html)
- [InformIT - Eclipse Architecture](http://www.informit.com/articles/article.aspx?p=1315271&seqNum=3)

## The org.adempiere.base project

This is the base plug-in for iDempiere. It contains the most fundamental parts of the codebase. Every iDempiere plug-in must include it in its dependency list.

## The org.adempiere.plugin.utils project

This plug-in contains helper utilities for plug-in development. It includes the `AdempiereActivator` class. If you use this class as your OSGi activator, it can perform automatic work when the plug-in is first activated — such as creating database entries. This is the mechanism used by 2Pack's automatic pack-in feature.

## Singleton plug-ins

A Singleton plug-in can only be loaded once in an OSGi framework.

OSGi's design goal is that plug-ins are independent of their environment, so it shouldn't technically matter if the same plug-in is loaded twice. In practice, however, loading a plug-in twice (perhaps in two different versions because you forgot to uninstall the old one) often causes strange errors and is rarely useful.

In iDempiere, you should always use Singleton plug-ins.
