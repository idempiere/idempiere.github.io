---
sidebar_position: 41
title: "Custom Commission calculations"
sidebar_label: "Custom Commission calculations"
description: "**Goal:** Extensibility"
tags: [development]
---
**Goal:** Extensibility

**Developer:** Diego.ruiz

**Feature Ticket:** [IDEMPIERE-5119](https://idempiere.atlassian.net/browse/IDEMPIERE-5119)

**Description:**
The core commission feature works well but it is limited. Usually, every company has a different way of calculating commissions. The goal of this ticket is to make the process that calculates the commission extensible, in a way that every implementation has the flexibility to mix their own rules with iDempiere ones without having to copy the whole class.

## Development
To extend the CommisionCalc process that is run when clicking "Generate Commission". You need to extend CommissionCalc from your custom class and in your Process factory return your custom class when the class name = ""org.compiere.process.CommissionCalc"".

Methods that you can override within your custom class.

**doIt**: In case you want to do something completely different.

**setStartEndDate:** Sets the start and end date to parse the documents from which the commission will be calculated.

**createCommissionRun**: In case you want to set special values to the created commission run

**getCommissionRunDescription:** If you want to set a special description to the created commission run. By default, the description is set to Start date - End Date - Currency symbol

**getCommissionCalculationSQL**: This is the method that defines the SQL statement used to create the commission line details.

**getPaymentCommissionSQL, getOrderCommissionSQL, getInvoiceCommissionSQL:** Defines the SQL statement to set in the commission lines details based on Payment, Order, Invoice respectively. The query by default sets the columns in this order: Currency ID, Commission Amt, Qty, C_OrderLine_ID, C_InvoiceLine_ID, Reference, Info, Date. If you change this order, you need to override the createDetail method as well.

**createDetail:** Creates the commission detail based on the SQL query created with the methods explained above.

## Example
Let's say your company has a rule for commissions where the commission for sales orders is calculated based on the margin (sales price - purchase price) and not on the total.

*The explanation of where to get the purchase price is out of the scope of this guide and it will be assumed that there's a CUSTOM_PurchasePrice column in C_OrderLine that contains the purchase price of the selected product.*

In this case, all you need to do is create a class like this to override the getOrderCommissionSQL with the right amount:```java

public class CUSTOM_CommissionCalc extends CommissionCalc  &#123;

	protected String getOrderCommissionSQL() &#123;
		StringBuilder sql = new StringBuilder();
		if (m_com.isListDetails())
		&#123;
			sql.append("SELECT h.C_Currency_ID, l.LineNetAmt - (l.CUSTOM_PurchasePrice*l.QtyOrdered) AS Amt, l.QtyOrdered, ")
				.append("l.C_OrderLine_ID, NULL, h.DocumentNo,")
				.append(" COALESCE(prd.Value,l.Description),h.DateOrdered ")
				.append("FROM C_Order h")
				.append(" INNER JOIN C_OrderLine l ON (h.C_Order_ID = l.C_Order_ID)")
				.append(" LEFT OUTER JOIN M_Product prd ON (l.M_Product_ID = prd.M_Product_ID) ")
				.append("WHERE h.DocStatus IN ('CL','CO')")
				.append(" AND h.IsSOTrx='Y'")
				.append(" AND h.AD_Client_ID = ?")
				.append(" AND h.DateOrdered BETWEEN ? AND ?");
		&#125;
		else
		&#123;
			sql.append("SELECT h.C_Currency_ID, SUM(l.LineNetAmt-(CUSTOM_PurchasePrice*l.QtyOrdered)) AS Amt,")
				.append(" SUM(l.QtyOrdered) AS Qty, ")
				.append("NULL, NULL, NULL, NULL, MAX(h.DateOrdered) ")
				.append("FROM C_Order h")
				.append(" INNER JOIN C_OrderLine l ON (h.C_Order_ID = l.C_Order_ID) ")
				.append("WHERE h.DocStatus IN ('CL','CO')")
				.append(" AND h.IsSOTrx='Y'")
				.append(" AND h.AD_Client_ID = ?")
				.append(" AND h.DateOrdered BETWEEN ? AND ?");
		&#125;
		return sql.toString();
	&#125;

&#125;

```

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_Extending_CommissionCalc)_
