---
title: <Feature title>
sidebar_label: <Short label>
sidebar_position: <next free number in the folder>
description: <One sentence describing what the feature does.>
tags:
  - <functional | user-experience | technical | development | security | architecture>
applies_to: "<first release with the feature, for example >=14>"
last_reviewed: <YYYY-MM-DD>
owner: <github-username>
---

:::warning Not Yet in Stable Release

This feature is not yet part of a stable iDempiere release and may change.

:::

**Goal:** <Functional | Technical | Usability | User Experience | New OSGi Service>  
**Developer:** [<Name>](<profile link>) ([<Company>](<company link>))  
**Feature Ticket:** [IDEMPIERE-####](https://idempiere.atlassian.net/browse/IDEMPIERE-####)  
**Version:** iDempiere <NN>

## The problem

<What users or developers could not do before, or what was hard. Keep it short and concrete.>

## What changed

<What the feature adds or changes. Mention new windows, fields, processes or SysConfig keys by their exact names.>

## How to set it up

1. Open the <Window name> window.
2. Go to the <Tab name> => <Subtab name> subtab.
3. Set <Field> to <value>.
4. <...>

![<Alt text describing the screenshot>](/img/docs/new-features/<FeatureName_Context>.png)

<!-- TODO: screenshot of <window/dialog and state> -->

## Configuration

<Role or access requirements. Remove this section if there is nothing to configure.>

| System Configurator key | Default | Level | What it does |
| --- | --- | --- | --- |
| `<EXACT_KEY>` | `<default>` | <System, Tenant or Organization> | <Effect> |

## Technical notes

<New APIs, interfaces, extension points or behavior changes relevant to plugin developers. Remove this section if not applicable.>

## Migration impact

<What changes for existing installations or plug-ins after the upgrade, or "None". If action is needed, also add a migration note (see `migration-note.md`) and link it here.>

## Related tickets

- [IDEMPIERE-####](https://idempiere.atlassian.net/browse/IDEMPIERE-####)
