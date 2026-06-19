---
sidebar_position: 18
title: "Negate Option for Chosen Multiple Component parameter"
sidebar_label: "Negate Option for Chosen Multiple Component parameter"
description: "**Developer:** Matheus.marcelino ([talk](https://wiki.idempiere.org/en/User_talk:Matheus.marcelino))"
tags: [functional]
---
**Goal:** Functional

**Developer:** Matheus.marcelino ([talk](https://wiki.idempiere.org/en/User_talk:Matheus.marcelino))

**Sponsor:** devCoffee

**Feature Ticket:** [IDEMPIERE-5468](https://idempiere.atlassian.net/browse/IDEMPIERE-5468)

**Description:**

This feature allows users to negate a multiple selection component value in parameter panel, working for process and reports (jaspers included):

![Negatebutton](pathname:///img/new-features/v10/Negatebutton.png)

![Negatebuttonpressed](pathname:///img/new-features/v10/Negatebuttonpressed.png)

To identify if a parameter is negated in jasper, create a parameter in .jrxml file named as columnName + "_NOT" (String "Y"/"N"). To use in java code process, call isNotClause method from ProcessInfoParameter.java

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Negate_Option_for_Chosen_Multiple_Component_parameter)_
