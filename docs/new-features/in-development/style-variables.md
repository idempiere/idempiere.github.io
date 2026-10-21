---
sidebar_label: Variables in CSS Style Lines
sidebar_position: 6
description: Use context variables such as @Column@ and @FK_ID.Column@ in the Inline Style of a CSS Style Line, so a style can depend on the data of the record.
tags:
  - user-experience
applies_to: ">=14"
last_reviewed: 2026-10-21
---

# Variables in CSS Style Lines

:::warning Not Yet in Stable Release

This feature is not yet part of a stable iDempiere release and may change.

:::

**Goal:** Usability  
**Developer:** [Peter Takacs](https://github.com/PeterTakacs300) <!-- TODO: verify - company name and link for the developer line -->  
**Feature Ticket:** [IDEMPIERE-7163](https://idempiere.atlassian.net/browse/IDEMPIERE-7163)  
**Version:** iDempiere 14

## The problem

CSS Styles and their Style Lines are set up as described in [Styles On Fields](/docs/new-features/v4.1/styles-on-fields). The Inline Style of a Style Line was used exactly as written. Only the Display Logic of the line could read the record, so a style could not use a value stored in a column. To show a status colour, you had to create one Style Line per colour, each with its own Display Logic.

## What changed

The Inline Style of a Style Line can now contain variables. A variable is replaced with its value when the style is applied. Variables are resolved by the same evaluator that reads the context variables in Display Logic.

| Variable | Replaced with |
| --- | --- |
| `@Column@` | The value of the column in the current record |
| `@FK_ID.Column@` | The value of a column in the record that the foreign key column points to |
| `@Column:default@` | The value of the column, or `default` if the column is empty |
| `@@` | A literal `@` character |

### Rules

- **Variables must be paired.** Every `@` needs a closing `@`. Use `@@` for a literal `@`, for example `content: '@@'`.
- **A line with an odd number of `@` is not changed at all.** None of its variables are replaced, and no error is shown. For example, `color: @Color@; background-image: url(a@b.png)` has three `@` and is used as written. Write `url(a@@b.png)` instead.
- **No nesting.** A variable name cannot contain `@`.
- **A variable that cannot be resolved is kept as written**, for example `@Missing@`. The browser ignores the invalid value.
- **Only inline styles are parsed.** CSS blocks such as `@media print { ... }` are not changed.
- **Class prefixes.** The `@sclass=` and `@zclass=` prefix is not treated as a variable, and it is matched without regard to upper or lower case. The class name after the prefix can contain variables, for example `@sclass=status-@Status@`.
- **SQL is not supported.** To use a calculated value, create a virtual column with a SQL Column and reference it as `@ColumnName@`.

### Where the values come from

| Style used for | Variables are read from |
| --- | --- |
| Field Style and Label Style in a window | The current record |
| Row style in the grid view | The row <!-- TODO: verify - in the grid view the table of @FK_ID.Column@ is derived from the column name, so it works for R_RequestType_ID but not for columns such as SalesRep_ID. Confirm in the UI. --> |
| Info window columns | The row of the Info window |
| Labels | The Label record itself |
| HTML report output | The data of the report row |

## How to set it up

This example colours a field of a Request by its Request Type. The Request Type window has the fields **Header Color** and **Content Color**, and a Request points to its Request Type through the **Request Type** field (`R_RequestType_ID`).

1. Open the Request Type window.
2. Select a Request Type and fill in **Header Color** with `#2E9E6B` and **Content Color** with `#DCF2E6`. <!-- TODO: verify - accepted format of these two fields and whether GardenWorld has request types with colours -->
3. Open the CSS Style window and create a CSS Style named "Request colours".
4. Go to the CSS Style window => Style Line subtab and add a line with this Inline Style:

   ```css
   background-color: @R_RequestType_ID.HeaderColor@; color: @R_RequestType_ID.ContentColor@
   ```

5. Open the Window, Tab & Field window => Request window => Tab => Field subtab.
6. Select the field that should be coloured and set **Field Style** to "Request colours".

A Request with the Request Type above now shows the field with a green background and mint text. A Request without a Request Type keeps the default look, because the variables stay unresolved and the browser ignores the invalid values.

<!-- TODO: screenshot of the Style Line subtab with the Inline Style and of the coloured Request field -->

## Technical notes

- `MStyle.parseVariables(String, Evaluatee)` does the substitution. Plugin code that builds style text from Style Lines itself can call it to behave the same way.
- `MStyle.isSClass(String)` and `MStyle.isZClass(String)` check the `@sclass=` and `@zclass=` prefix without regard to case. Use them instead of `startsWith(MStyle.SCLASS_PREFIX)` in code that applies a style.
- The value of a referenced record is placed into the style of the page. The role access of the user to that referenced record is not checked. Secure columns are masked. Only users who can edit CSS Styles decide what is read.

**Technical Info:** [IDEMPIERE-7163](https://idempiere.atlassian.net/browse/IDEMPIERE-7163) | [Pull Request #3412](https://github.com/idempiere/idempiere/pull/3412)

## Migration impact

Styles that contain a single `@` keep working. If an existing Inline Style contains two or more `@` characters that were not meant as a variable, replace each of them with `@@`. Text between two `@` that does not match a column is left as it is.

## Related tickets

- [IDEMPIERE-7163](https://idempiere.atlassian.net/browse/IDEMPIERE-7163)
