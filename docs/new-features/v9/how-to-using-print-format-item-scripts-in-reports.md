---
sidebar_position: 5
title: "How To: Using Print Format Item Scripts In Reports"
sidebar_label: "How To: Using Print Format Item Scripts In Reports"
description: "This document expands on the information provided in [NF8.2 Print Format Item Script](https://wiki.idempiere.org/en/NF8.2_Print_Format_Item_Script) and"
tags: [functional]
---
### Introduction
This document expands on the information provided in [NF8.2 Print Format Item Script](https://wiki.idempiere.org/en/NF8.2_Print_Format_Item_Script) and incorporates the additional features provided by  [IDEMPIERE-5111 Data type improvements to Print Format Item Script](https://idempiere.atlassian.net/browse/IDEMPIERE-5111) and [IDEMPIERE-5253](https://idempiere.atlassian.net/browse/IDEMPIERE-5253).

The purpose of this feature is to make it possible to create new columns in a report based on an expression, without having to modify the database. The expressions  can make use of either beanshell or SQL scripts.

The Print Format Item Script supports three tokens as follows:
| Type | Token | Usage |
|---|---|---|
| Column Value | @COL/ | @COL/column_name@ |
| Running Total | @ACCUMULATE/ | @ACCUMULATE/numeric_column_name@ |
| Line Number | `@LINE@ | @LINE@ |`
| SQL Statement | @SQL= | @SQL= SELECT column_name FROM DUAL |
Scripts containing Column Value and Running Total tokens are parsed as a string to the beanshell interpreter which is then able to return numeric, boolean, date or string values to the report.

The SQLStatement token is exclusive and the script must start with the @SQL= token. The sql statement must return a single value and is displayed as text in the report.

### Column Value
The @COL/column_name@ token is used to insert the value of a column in a script, for example @COL/DocumentNo@ means the to insert the value of the DocumentNo column in the report. The column must already exist as a Print Format Item prior to being used in a script, however it can be hidden by setting the display logic to 1=2 and clearing the Print Text field. The Column Value can also be a previously defined script column and is referenced by the Print Format Item "Name" field.

Consider the following example script comparing two columns and returning a True or False result:```java

if (@COL/GrandTotal@ > @COL/TotalLines@) &#123;
 return true;
&#125;
return false;

```This could be entered as follows:![IDEMPIERE 5011 boolean](pathname:///img/new-features/v9/IDEMPIERE-5011-boolean.png)

Using the value from the example above, our next script column could contain something like:```java

if (@COL/Has Tax@) {
   return (@COL/Tax@ / @COL/TotalLines@) ;
}
return 0;

```This could be entered as follows and include a Format Pattern to display as a percentage:![IDEMPIERE 5011 previous](pathname:///img/new-features/v9/IDEMPIERE-5011-previous.png)

There are a vast variety of scripts that can be created using the functionality provided by beanshell. Here are a few more examples:

Perform simple arithmetic operations on numeric columns and return a numeric result:```java

@COL/GrandTotal@ - @COL/TotalLines@

```Join two strings and return a string result:```java

"@COL/DocumentNo@" + "-" + "@COL/DocStatus@"

```Convert the string representation of an SQL timestamp to a date. Then based on a comparison add a certain number of days and return the updated date:```java

import java.util.date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

DateFormat formatter;
Date date;

str_date = "@COL/DateOrdered@";
formatter = new SimpleDateFormat("yyyy-MM-dd");
date = (Date)formatter.parse(str_date);

if (@COL/GrandTotal@ > 100) &#123;
 date.setDate(date.getDate() + 7);
 return date;
&#125;
date.setDate(date.getDate() + 14);
return date;

```

### Running Total
The @ACCUMULATE token is used to print a running total for any numeric column. As in the Column Value token, the column must already exist as a Print Format Item prior to being used in a script. The Running Total and Column Value tokens can also be used in the same script.

Example of showing a running total in a report:```java

@ACCUMULATE/GrandTotal@

```

### Line Number
The @LINE@ token is used to print the current line on the report.

Example of showing a number line:
```
@LINE@
```
Note: this was added in [release-9.20220406](https://wiki.idempiere.org/en/ChangeLog_Release_9#2022-04-06)

### SQL Statement
You can use @SQL= to print the value returned from an SQL statement as a string. The SQL statement can reference any column contained in the table associated with the print format and also make use of system variables.

Example using available columns from C_Order base Print Format:
```sql

@SQL=SELECT CASE WHEN DatePromised <> DateOrdered THEN DatePromised - DateOrdered ELSE NULL END FROM Dual

```

Example using System variable @#AD_User_ID@:
```sql

@SQL=SELECT Name FROM AD_User WHERE AD_User_ID=@#AD_User_ID@

```

Example to show the ConvertedAmt on a report based on RV_Payment:
```sql

@SQL=SELECT COALESCE(ConvertedAmt,PayAmt)*CASE WHEN C_Payment.IsReceipt='Y' THEN 1 ELSE -1 END FROM C_Payment WHERE C_Payment_ID=RV_Payment.C_Payment_ID

```

## Note About Security
Please note that the beanshell interpreter is a very powerful tool, but also very dangerous. The script field could be misused for SQL Injection, exposing database sensitive information, or even running scripts in the operating system.

That's why the script field is protected, just to be configured by advanced roles.

---

_Source: [Wiki](https://wiki.idempiere.org/en/How_To:_Using_Print_Format_Item_Scripts_In_Reports)_
