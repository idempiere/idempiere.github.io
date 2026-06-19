---
sidebar_position: 14
title: "Starting other workflows within a workflow"
sidebar_label: "Starting other workflows within a workflow"
description: "**Developer:**  Heng Sin Low, Martin Schönbeck"
tags: [functional]
---
**Goal:** Functional

**Developer:**  Heng Sin Low, Martin Schönbeck

**Feature Ticket:** [IDEMPIERE-4187](https://idempiere.atlassian.net/browse/IDEMPIERE-4187), [IDEMPIERE-4188](https://idempiere.atlassian.net/browse/IDEMPIERE-4188)

**Sponsor:**

**Description:**

You can now start other workflows from within a workflow. To achive this there must be a process for this workflow. Typically you don't want to start this workflow for the actual document (else you could have extended the actual workflow) so you have to transfer the Record_ID of the document you are going to process. Because this Record_ID is no normal process parameter but an attribute a way is implemented to set this attribute.

To call e.g. the standard Process_Shipment from Process_InOutConfirm you add it's process as seen here (or take the 2packs from the above mentioned IDEMPIERE-4187)

![CallWorkflow](pathname:///img/new-features/v8.2/CallWorkflow.png)

Then you add a parameter named Record_ID in the Attribute Name field. Make sure Process Parameter is left empty. Add Attribute Value to tell where to get the record_id.

![RecordParameter](pathname:///img/new-features/v8.2/RecordParameter.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Starting_other_workflows_within_a_workflow)_
