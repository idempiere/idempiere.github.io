---
sidebar_position: 39
title: "Boolean Logic Expression Enhancements"
sidebar_label: "Boolean Logic Expression Enhancements"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Feature Ticket:** [IDEMPIERE-4824](https://idempiere.atlassian.net/browse/IDEMPIERE-4824)

**Description:**
Enhancements for boolean logic expressions (readonly, display and mandatory):
1. Open and Close bracket support to define the evaluation order of logic expression that have multiple and/or combinations.
1. add NOT ($!), `<=`, `>=` and Regular Expression Match (~) operators
1. add Unit Test Cases for evaluation of boolean logic expressions

## Usage of New Features
1. Use open and close bracket to define evaluation order of expression.
    1. Example: `@IsSummary@='N' & (@ProductType@=I | @ProductType@=S)`
1. Not/Negate operator: $!
    1. Example: `$!(@IsLot@=Y & @M_LotCtl_ID@ > 0)`
    1. Note that we can't use ! as the legacy code have been using it as the not equal operator.
1. Greater than or equal to operator: `>=`
    1. Example: `@IsLot@=Y& @M_LotCtl_ID@ >= 100`
1. Less than or equal to operator `<=`
    1. Example: `@A_Asset_ID@<=1&@A_CreateAsset@='Y'`
1. Regular Expression Match Operator: ~
    1. Example: `@Identifier@ ~ '^([a-zA-Z_$][a-zA-Z\\d_$]*)$'`
    1. Note: to avoid parsing issues, always quote your regular expression with ' or ""
    1. It is fix to the format of &lt;Input String&gt; ~ '&lt;Regular Expressions&gt;', i.e you must always put your regular expression after the ~ operator.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Boolean_Logic_Enhancements)_
