---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 1.0."
tags: [features, migration, installation, development, developer-documentation, reference]
---

# Migration notes - iDempiere 1.0 (technical)

## org.compiere.acct.Doc

The accounting schema parameter of the constructor changed from `MAcctSchema[]` to `MAcctSchema`.

:::warning
This can break extensions that modify accounting. The fix is simple: change your code to use the new method and adjust accordingly.
:::

## 2Pack

The new 2Pack format is not backward compatible.

## AD_WF_Node

The `xposition` and `yposition` columns now store the node's position in a grid, instead of an absolute pixel value.

## Change log configuration

The change log is now enabled by default on most tables.

Enabling the change log is done with the script `201306261840_EnableChangeLog.sql`.

:::note
If you have already tuned your change log configuration, you can skip that script, or run it and then recover your specific fine-tuning changes.
:::

:::warning
Enabling the change log increases disk consumption. If that's a concern for your installation, fine-tune this configuration after running the script.
:::

## Jasper ID parameters passed as BigDecimal, now as Integer

In some cases, ID parameters (table, table direct, search) were passed to Jasper reports as `BigDecimal`, while in other cases the same kind of parameters were passed as `Integer` (like `RECORD_ID` or ranges). With [IDEMPIERE-1422](http://idempiere.atlassian.net/browse/IDEMPIERE-1422), that behavior is now consistent, always using `Integer` for `_ID` parameters.

:::warning
This change can break old Jasper reports that defined the ID parameter as `BigDecimal`. The fix is simple: change the Jasper parameter to `Integer` and recompile.
:::

When this error is reached, running the Jasper report throws this exception:

```
java.lang.ClassCastException: java.lang.Integer cannot be cast to java.math.BigDecimal
	at net.sf.jasperreports.engine.query.JRJdbcQueryExecuter.setStatementParameter(JRJdbcQueryExecuter.java:553)
	at net.sf.jasperreports.engine.query.JRJdbcQueryExecuter.setStatementParameter(JRJdbcQueryExecuter.java:399)
	at net.sf.jasperreports.engine.query.JRJdbcQueryExecuter$1.visit(JRJdbcQueryExecuter.java:332)
	at net.sf.jasperreports.engine.query.JRAbstractQueryExecuter$QueryParameter.accept(JRAbstractQueryExecuter.java:157)
	at net.sf.jasperreports.engine.query.JRAbstractQueryExecuter.visitQueryParameters(JRAbstractQueryExecuter.java:646)
	at net.sf.jasperreports.engine.query.JRJdbcQueryExecuter.createStatement(JRJdbcQueryExecuter.java:317)
	at net.sf.jasperreports.engine.query.JRJdbcQueryExecuter.createDatasource(JRJdbcQueryExecuter.java:196)
	at net.sf.jasperreports.engine.fill.JRFillDataset.createQueryDatasource(JRFillDataset.java:1087)
	at net.sf.jasperreports.engine.fill.JRFillDataset.initDatasource(JRFillDataset.java:668)
	at net.sf.jasperreports.engine.fill.JRBaseFiller.setParameters(JRBaseFiller.java:1281)
	at net.sf.jasperreports.engine.fill.JRBaseFiller.fill(JRBaseFiller.java:900)
	at net.sf.jasperreports.engine.fill.JRBaseFiller.fill(JRBaseFiller.java:845)
```
