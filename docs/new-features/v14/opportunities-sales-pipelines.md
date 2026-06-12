---
title: Sales Pipelines
sidebar_label: Concept of Sales Pipeline for Opportunities
sidebar_position: 1
description: Allow the use of a list of Sales Stage per Sales Pipeline
---

**Goal:** Functional  
**Developer:** [Nicolas Micoud](https://wiki.idempiere.org/en/User:Nmicoud) ([TGI](https://www.tgi.eu))  
**Feature Ticket:** [IDEMPIERE-7009](https://idempiere.atlassian.net/browse/IDEMPIERE-7009)

## Sales Pipeline to contextualize Sales Stages in Opportunities

A Sales Pipeline allows grouping and ordering Sales Stages according to a specific sales process.
This provides greater flexibility for organizations that manage different types of opportunities requiring different sales workflows.

Some examples:
- Simple / fast sales vs. complex project-based sales
- Product sales vs. service engagements
- New business vs. renewals

In practice, a Sales Pipeline acts as a filter for the Sales Stage field on Opportunities window which gives:
- Better alignment with different sales processes
- Simpler sales stage selection
- Consistent stage ordering
- Improved reporting capabilities
- Greater flexibility for CRM implementations

A new window *Sales Pipelines* has been added.
There, you can select which Sales Stages will be available on opportunities using a given Sales Pipeline.

Note that the migration script:
- creates a default Sales Pipeline for each tenant
- adds all existing Sales Stages to this pipeline
- assigns the default Sales Pipeline to all existing opportunities
