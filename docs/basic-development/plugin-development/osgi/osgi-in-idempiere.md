---
sidebar_label: OSGi in iDempiere
sidebar_position: 3
description: How iDempiere's use of OSGi changed over time, and which parts are OSGi standard, Eclipse specific or iDempiere's own.
tags: [development]
applies_to: all
last_reviewed: 2026-10-20
---

# How iDempiere uses OSGi

iDempiere has used OSGi for more than ten years, and the way plug-ins are written changed a lot in that time. This page explains how it changed. It also tells you which parts of a plug-in are OSGi standard, which come from Eclipse, and which are iDempiere's own.

It helps when you read old forum posts, old plug-ins or the older guides, because they often show an older way of doing the same thing. For the terms, see the [OSGi Glossary](./osgi-glossary).

## How it changed

The dates below come from the commit history of the iDempiere source code. Each row names the Jira ticket when there is one.

| When | What changed | What it means for you |
| --- | --- | --- |
| January 2010 | The code base starts to run inside Equinox, the OSGi framework of Eclipse. | The first step to bundles. |
| August 2010 | Support for Declarative Services on Equinox is added. | Components can be described in XML files. |
| September 2010 | Projects are renamed to match their bundle symbolic names, and the build moves to Eclipse features and a product configuration. | One bundle per project, delivered as features. |
| December 2010 | System events are built on the OSGi Event Admin service. The first component XML file appears in `OSGI-INF/`. | Event handlers are OSGi services. |
| November 2012 to February 2013 | [IDEMPIERE-359](https://idempiere.atlassian.net/browse/IDEMPIERE-359) adds OSGi services as a second way to extend core, next to the Eclipse extension points of `plugin.xml`. `Service.locator()` then looks services up in the OSGi service registry. | A plug-in can publish a service instead of declaring an extension point. |
| October 2019 | The first `@Component` annotation appears in the source ([IDEMPIERE-4056](https://idempiere.atlassian.net/browse/IDEMPIERE-4056)). | Components no longer need hand-written XML. |
| February to October 2021 | Factory base classes and annotations are added. Examples: [IDEMPIERE-4675](https://idempiere.atlassian.net/browse/IDEMPIERE-4675) for models, [IDEMPIERE-4689](https://idempiere.atlassian.net/browse/IDEMPIERE-4689) for processes, [IDEMPIERE-4690](https://idempiere.atlassian.net/browse/IDEMPIERE-4690) for callouts, [IDEMPIERE-4694](https://idempiere.atlassian.net/browse/IDEMPIERE-4694) for event handlers and [IDEMPIERE-4773](https://idempiere.atlassian.net/browse/IDEMPIERE-4773) for forms. The class scanner ClassGraph first appears with [IDEMPIERE-4842](https://idempiere.atlassian.net/browse/IDEMPIERE-4842). | You can register a model, process, callout, event handler or form by annotating the class. See the iDempiere 9 feature pages. |
| January to May 2026 | Parts of core move behind services or into their own bundles: accounting ([IDEMPIERE-6793](https://idempiere.atlassian.net/browse/IDEMPIERE-6793)), the SOAP web services ([IDEMPIERE-6955](https://idempiere.atlassian.net/browse/IDEMPIERE-6955)), an extension manager ([IDEMPIERE-6908](https://idempiere.atlassian.net/browse/IDEMPIERE-6908)) and Redis as an alternative to Hazelcast for the distributed cache ([IDEMPIERE-6989](https://idempiere.atlassian.net/browse/IDEMPIERE-6989)). | Core depends less on its own implementations, and optional parts install as extensions. |

## What is standard OSGi, and what is not

A plug-in mixes three kinds of things. Knowing which is which tells you where to look for help.

| Kind | Examples in iDempiere | Where to read more |
| --- | --- | --- |
| **OSGi standard** | Bundles and `MANIFEST.MF`, `BundleActivator`, the service registry, Declarative Services (`@Component`, `@Reference`, `@Activate`), Event Admin | The OSGi specifications |
| **Eclipse and Equinox** | The Equinox framework, `plugin.xml` and extension points, features and p2 repositories, fragments, the Eclipse project and PDE tools | The Eclipse documentation |
| **iDempiere's own** | `Service.locator()`, the factory pattern (`IModelFactory`, `IProcessFactory` and similar), the mapped factories built on a `Map` and lambdas, class scanning with ClassGraph, `AbstractEventHandler`, the extension manager | The plug-in guides on this site |

Two things surprise newcomers:

- The annotations you write are standard OSGi, but the way iDempiere finds the classes that carry its own annotations, such as `@Callout` or `@Process`, is iDempiere's own code. It scans packages, which is why a factory has a `getPackages()` method.
- The older Eclipse extension points have not disappeared from the source. `plugin.xml` files in core bundles still declare extension points such as `org.adempiere.base.ModelValidator` and `org.adempiere.webui.Form`. New plug-ins use services instead, as the guides show.

## What this means when you write a plug-in

- **Use services and annotations.** Publish a service with `@Component`. This is the way the current guides teach, and it needs no XML.
- **Expect older examples to differ.** An old plug-in may use a `BundleActivator` to register things in `start()`, a hand-written file in `OSGI-INF/`, or a `plugin.xml` extension point. They still show what the code does, but write new code the current way.
- **Check the version.** The annotation-based factories exist from iDempiere 9. For an older version, the activator and XML way applies.
- **Ask in the right place.** For `@Component` and `@Reference` questions, the OSGi Declarative Services documentation applies. For "which factory do I implement", the iDempiere guides apply.
