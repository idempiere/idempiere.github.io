---
sidebar_position: 2
title: "Find Similar To"
sidebar_label: "Find Similar To"
description: "**Developer:** Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Usability

**Developer:** Carlos Ruiz

**Description:**

By default the matching queries in Find window ( ~ ) are resolved using the LIKE function.

There is a more powerful version of LIKE in PostgreSQL with the name SIMILAR TO.

Users can now set up this matching way using the user preference "Use Similar To":

![01 SimilarToPreference](pathname:///img/new-features/v5.1/01_SimilarToPreference.png)

After the user enable that, then syntax similar to regular expression can be used, for example:

![02 UserQuery](pathname:///img/new-features/v5.1/02_UserQuery.png)

Result in these records:

![03 ResultSimilarTo](pathname:///img/new-features/v5.1/03_ResultSimilarTo.png)

**Technical Info:** [IDEMPIERE-1906](http://idempiere.atlassian.net/browse/IDEMPIERE-1906)

- Please note that the conversion of SQL statements are cached in memory, if a LIKE query was executed previously will be converted to LIKE again until the user executes the "Cache Reset" process.

- PostgreSQL documentation about SIMILAR TO can be found [on this link](https://www.postgresql.org/docs/9.6/static/functions-matching.html#FUNCTIONS-SIMILARTO-REGEXP)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF5.1_FindSimilarTo)_
