---
sidebar_position: 5
title: "JSON Field Type"
sidebar_label: "JSON Field Type"
description: "**Developer:** Diego Ruiz - [BX Service GmbH](https://www.bx-service.com/)"
tags: [functional]
---
**Developer:** Diego Ruiz - [BX Service GmbH](https://www.bx-service.com/)

**Sponsor:** [Cloudempiere](https://www.cloudempiere.com/)

**Technical Info:** [IDEMPIERE-2981](https://idempiere.atlassian.net/browse/IDEMPIERE-2981)

## Description
JSON is a commonly used data format with diverse applications in data interchange, including web applications communicating with servers. With the development of the [REST API](https://wiki.idempiere.org/en/REST_Web_Services) in iDempiere, the system has become very flexible. Furthermore, with the new support of native JSON fields, this flexibility is extended even further.

## How to Configure
In the *Table and Column* window, configure the new column, set the Reference type to JSON, and create the corresponding field in the window.

![JsonType](pathname:///img/new-features/v11/JsonType.png)

Once you open the window, you can see the JSON field displayed as a standard text field. The JSON will be formatted automatically when saving.

![ValidJSON](pathname:///img/new-features/v11/ValidJSON.png)

The JSON string will be validated when editing and leaving the field content. If the JSON is invalid you will get an error message.

![InvalidJSON](pathname:///img/new-features/v11/InvalidJSON.png)

## Technical notes
In Postgresql, the field text will be saved as a [JSONB](https://www.postgresql.org/docs/current/datatype-json.html)  column.

For backward compatibility, in Oracle, it is stored as a CLOB column with a check constraint to ensure that the textual data in the column is well-formed JSON data.

## Unsupported
- altering from another datatype to JSON is not supported at this moment, you would need first to drop the old column and then create it again with the JSON datatype

- On Oracle: altering the column from JSON to Text Long is not removing the JSON constraint, workaround here is to drop the column first and then recreate it with the new datatype

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_JSON_Field_Type)_
