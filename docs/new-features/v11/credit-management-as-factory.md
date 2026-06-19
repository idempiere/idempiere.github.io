---
sidebar_position: 31
title: "Credit Management as Factory"
sidebar_label: "Credit Management as Factory"
description: "**Goal:** Customizibility, Extendibility"
tags: [development]
---
**Goal:** Customizibility, Extendibility

**Developer:** [Logilite Technologies](http://www.logilite.com/)


## Goal
The goal of this How-To guide is to demonstrate how to utilize the ICreditManagerFactory service in your plug-in project. Different business follow different Credit Management for customers. This require needs to customize behavior of Credit Management on implementation when out of box Credit Management not sufficient. Still it is advise to add enhancement to core if it is general usable, but if there are any specific requirement to domain or business which can not be acceptable as in core then The Credit Manager factory service is help to override core behavior for Business Partner's Credit Management and validation for Order, Invoice, Payment, and Inout.

## Description
- Implement a new Credit Manager factory base class (ICreditManagerFactory interface & ICreditManager interface)

## Usage
### Implementing Credit Manager Factory
For implementing Credit Manager factory, add new class implementing ICreditManagerFactory as below. you should add condition in which case the object of your Credit Manager (ICreditManager) implementor should be returned. Mostly we used PO Mode on Credit Manager screen.

```java

import org.compiere.model.MOrder;
import org.compiere.model.PO;
import org.compiere.model.credit.MyCreditManagerOrder;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, service = ICreditManagerFactory.class)
public class MyCreditManagerFactory implements ICreditManagerFactory
{

	@Override
	public ICreditManager getCreditManager(PO po)
	{
		if (po instanceof MOrder)// MInvoice, MPayment, MInOut
			return new MyCreditManagerOrder((MOrder) po);
		return null;
	}

}

```

### Implement Credit Manager
Credit Manager class implements ICreditManager interface.

#### ICreditManager Method:
##### **checkCreditStatus**
- Method has Document Action (String) as a parameter.
- Method will return Credit Status (CreditStatus).

```java

public class MyCreditManagerOrder implements ICreditManager
{
	private MOrder order;

	/**
	 * Order Credit Manager Load Constructor
	 *
	 * @param po MOrder
	 */
	public MyCreditManagerOrder(MOrder po)
	{
		this.order = po;
	}

	@Override
	public CreditStatus checkCreditStatus(String docAction)
	{
		String errorMsg = null;

		// Check as per document action

		return new CreditStatus(errorMsg, !Util.isEmpty(errorMsg));
	} // creditCheck
}

```

### Credit Status POJO Class
Credit Status is POJO to return in  *checkCreditStatus*

```java

public class CreditStatus
{
	protected String	errorMsg;
	protected boolean	isError;

	/**
	 * Credit Status Load Constructor
	 *
	 * @param errorMsg
	 * @param isError
	 */
	public CreditStatus(String errorMsg, boolean isError)
	{
		super();
		this.errorMsg = errorMsg;
		this.isError = isError;
	}

	public String getErrorMsg()
	{
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg)
	{
		this.errorMsg = errorMsg;
	}

	public boolean isError()
	{
		return isError;
	}

	public void setError(boolean isError)
	{
		this.isError = isError;
	}
}

```

**Technical Info:** [IDEMPIERE-5768](https://idempiere.atlassian.net/browse/IDEMPIERE-5768)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Credit_Management_Factory)_
