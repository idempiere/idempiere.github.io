---
title: How to Contribute
sidebar_label: How to Contribute
sidebar_position: 1
description: Step-by-step checklist and workflow for contributing to the iDempiere core
---

This is a checklist of the **minimum steps** required to submit high-quality pull requests to the iDempiere core:

:::tip
If your contribution includes database changes, follow the [Changing the Database](./changing-the-database) instructions **before writing any code**.
:::

## ✅ Contribution Checklist

- **Every commit must be related to a JIRA ticket.**  
  Please **do not mix unrelated commits**. For example, if your change includes a refactoring, submit:
  - One commit for the **refactoring**
  - Another commit for the **actual solution**

- **Data access hierarchy**: Use the following methods in order of preference when retrieving data:
  1. **Model Classes** – Most `M*` classes have convenient `get` methods.
  2. **Query class** – Clean and efficient for many use cases.
  3. **DB class (`DB.get()`)** – Use with care.
  4. **JDBC (raw access)** – Only if absolutely necessary, as it impacts memory and performance.

- **Code standards**:
  - Follow Java standards (meaningful names, camelCase).
  - Use proper **indentation** and formatting for readability.
  - Add the **GPLv2 License Header** to each new Java class.
  - When adding, removing, or changing the signature of a **public method**:
    - **Prefer method overloading** instead of changing existing method signatures. This preserves backward compatibility and helps plugins continue working.
    - If you change the signature of a class or interface, **regenerate the `serialVersionUID`** if applicable. This ensures compatibility when serializing Java classes.


- **Run and maintain unit tests**:
  - Ensure that **all existing unit tests pass** before submitting your pull request.
  - If your contribution introduces new logic or fixes a bug, consider adding **new unit tests** to verify the behavior.

- **Perform a collateral impact analysis**:  
  Even if your change affects only one line, check:
  - Where that method/class is referenced elsewhere
  - Whether your change introduces unexpected behavior
  - All relevant test cases

- **Avoid common pitfalls**:  
  Review the list of [Common Issues](./common-issues) before submitting your patch.

## 📦 Final Step: Create the pull request

When your code is ready, create a [Pull Request](./git-workflow) with a **commit message that includes the JIRA ticket number** (e.g., `IDEMPIERE-1234 Fix XYZ`).  
This will allow automatic linking between the Git repository and the JIRA ticket.