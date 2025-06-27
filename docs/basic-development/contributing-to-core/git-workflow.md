---
title: Fork and Branch Git Workflow
sidebar_label: Git Workflow
sidebar_position: 2
description: The recommended Git workflow for contributing to the iDempiere core repository
---

This is the official Git workflow used by the iDempiere project.  
It follows a **fork-and-branch model** using GitHub pull requests and JIRA ticket tracking.

---

## Overview

The general process:

1. Fork the iDempiere repository on GitHub.
2. Create a feature branch for your changes.
3. Make commits that include the related JIRA ticket number.
4. Push the branch to your fork.
5. Submit a pull request (PR) to the main repository.

---

## Step-by-Step Workflow

### 1. Fork the Repository

- Visit: [https://github.com/idempiere/idempiere](https://github.com/idempiere/idempiere)
- Click **“Fork”** to create your own copy of the repository.

Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/idempiere.git
cd idempiere
```

### 2. Add the Upstream Remote

Link your local repository to the original project:

```bash
git remote add upstream https://github.com/idempiere/idempiere.git
git branch --set-upstream-to=origin/master master
```

To verify:

```bash
git remote -v
```

The result should look like this:

```bash
origin	git@github.com:YOUR_USERNAME/idempiere.git (fetch)
origin	git@github.com:YOUR_USERNAME/idempiere.git (push)
upstream	https://github.com/idempiere/idempiere.git (fetch)
upstream	https://github.com/idempiere/idempiere.git (push)
```

And now proceed to configure your development environment as explained in Installing iDempiere.

## Create a Pull Request

### 3. Sync with upstream
```bash
git checkout master
git pull upstream master
# here is usually a good practice to execute
# bash RUN_SyncDBDev.sh
# to keep your local database in sync with the code
git push origin master
```

### 4. Create a branch based on the JIRA ticket:

Every commit must be done in a feature branch created for the specific ticket.

```bash
git checkout -b IDEMPIERE-(Jira-ticket-number)-(optional-additional-info)
```

:::danger 🚫 Never Commit Directly to `master`

Always create a separate branch for your changes.  
**Do not commit directly to the `master` branch**, even in your own fork.

This helps maintain a clean Git history, prevents accidental overwrites, and ensures your pull requests are easy to manage and review.
::: 
Use the ticket number and a short, descriptive title.

---

### 5. Make and Commit Your Changes

Make your changes and commit them with a JIRA-linked message:

```bash
git add .
git commit -m "IDEMPIERE-1234: Fix NPE on login page"
```

> 💡 **Always include the JIRA ticket number** in your commit message. This ensures automatic linking and tracking.

---

### 6. Push your changes to your fork

```bash
git push origin IDEMPIERE-1234-short-description
```

### 7. Open a Pull Request (PR)

- Go to your fork on GitHub.
- Click **“Compare & pull request”**.

To enable easy navigation between your pull request and the corresponding JIRA ticket, **please include the JIRA ticket link as the first line of your pull request message**.

Below the link, write a clear and concise description that includes:
- The purpose and impact of the changes  
- Tests you performed for your use case  
- Any other use cases that may be affected

:::tip
The more detail you provide about the change and how to verify it, the easier it will be for peer reviewers to understand and approve your contribution.
:::


Once your message is complete, click the **"Create pull request"** button to submit.
---

## After approval

To sync your fork with the latest iDempiere changes:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## ✅ Best Practices

- Create one branch per feature or fix.
- Keep commit messages short and descriptive.
- Solve conflicts when they appear.
- Respond promptly to review feedback.

---

By following this workflow, your contributions will be easier to review, test, and merge.  
It also ensures consistency across all developers and protects the integrity of the core project.