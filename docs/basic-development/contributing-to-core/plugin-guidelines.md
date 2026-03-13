---
title: Plugin Guidelines
sidebar_label: Plugin Guidelines
sidebar_position: 6
description: Community checklist to evaluate plugin quality, documentation, installation, and maintenance readiness
---

This page is part of the list of contribution paths described in [Contributing to iDempiere](./contributing-to-idempiere).

These guidelines help the community evaluate plugins consistently and improve documentation quality over time. They are not static and will continue to evolve. If you have suggestions, please share them in the [iDempiere forum](https://www.idempiere.org/forums).

## Minimum requirements for community plugins

Every community plugin should cover the following baseline requirements.

### 1. Documentation

- Installation guide: clear step-by-step instructions.
- Purpose: what the plugin does and why someone would install it.
- Screenshots or videos when possible, so users can preview what they will get.
- Technical notes for contributors, including special extension points or constraints.
- Access to source code with no broken links (mandatory).
- Access to the source of the documentation itself, not only exported files like PDF.
- List of plugin dependencies.
- List of similar or related solutions.

:::important Open source expectation
The community expects real open source maintenance. Repositories that are rarely updated publicly while active development happens in a private repository are not aligned with that expectation.
:::

### 2. Installation experience

It must be easy to install in existing iDempiere instances. Plugins that require core modifications to install should be treated as a fork or distribution, not a regular plugin.

Preferred installation expectations:

- Installation via OSGi or Felix with minimal extra steps.
- Includes 2Pack support when applicable.
- Binaries are available.
- One-click start is preferred.
- Multi-artifact installation is acceptable up to four clicks only when it is clearly justified and very well documented.

If additional manual configuration is required and cannot be covered through 2Pack, it must be clearly justified and documented.

### 3. Plugin status

- Compatibility with the latest stable iDempiere version.
- Date and version of the last community review.

## Development and extension best practices

For development patterns and extension practices, follow the [Developing Plug-Ins](../plugin-development/developing-plugins) tutorials. They explain how to extend iDempiere without affecting the core.

## Additional quality signals

Beyond the minimum requirements, the community can assess plugin quality using the following signals:

- Has someone other than the developer or sponsor tested it?
- Who uses it and in which scenarios?
- Has it gone through peer review for code quality and security?

Recommended peer-review checks:

- At least one reviewer who is not the developer.
- No hardcoded IDs.
- JDBC resources and cursors are properly closed.
- Security-focused review confirms no obvious vulnerabilities were introduced.