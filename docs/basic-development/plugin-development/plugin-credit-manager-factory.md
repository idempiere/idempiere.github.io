---
title: Custom Credit Management in Plug-ins
sidebar_label: Credit Manager Factory
sidebar_position: 22
description: Learn how to customize iDempiere's credit management behavior using ICreditManagerFactory and ICreditManager.
---

# Custom Credit Management in Plug-ins

## Goal

The goal of this tutorial is to show how to use the `ICreditManagerFactory` service in your plug-in project. Use this service when iDempiere's built-in credit management logic doesn't fit your business requirements and you need to customize credit validation for Business Partners on Orders, Invoices, Payments, and Shipments/Receipts.

## Implementing ICreditManagerFactory

Create a class implementing `ICreditManagerFactory`. In `getCreditManager()`, check the type of the document and return an instance of your `ICreditManager` implementation, or `null` to fall through to the next factory.

```java
import org.compiere.model.MOrder;
import org.compiere.model.PO;
import org.compiere.model.credit.MyCreditManagerOrder;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, service = ICreditManagerFactory.class)
public class MyCreditManagerFactory implements ICreditManagerFactory {

    @Override
    public ICreditManager getCreditManager(PO po) {
        if (po instanceof MOrder)
            return new MyCreditManagerOrder((MOrder) po);
        // Add cases for MInvoice, MPayment, MInOut as needed
        return null;
    }
}
```

The `@Component` annotation registers this class as an OSGi Declarative Service. No manual `OSGI-INF` XML is needed when using annotations. See [Simplify Plug-in Development with DS Annotations](./annotations-instead-xml) for setup.

## Implementing ICreditManager

Create a class implementing `ICreditManager`. It has one method: `checkCreditStatus(String docAction)`, which returns a `CreditStatus` object.

```java
public class MyCreditManagerOrder implements ICreditManager {

    private MOrder order;

    public MyCreditManagerOrder(MOrder po) {
        this.order = po;
    }

    @Override
    public CreditStatus checkCreditStatus(String docAction) {
        String errorMsg = null;

        // Implement your custom credit check logic here.
        // Example: reject complete action if credit limit is exceeded
        // if (DocumentEngine.ACTION_Complete.equals(docAction)) {
        //     BigDecimal creditUsed = ...;
        //     BigDecimal creditLimit = ...;
        //     if (creditUsed.compareTo(creditLimit) > 0)
        //         errorMsg = "Credit limit exceeded";
        // }

        return new CreditStatus(errorMsg, errorMsg != null);
    }
}
```

## CreditStatus

`CreditStatus` is a plain data object returned by `checkCreditStatus()`:

```java
public class CreditStatus {
    protected String  errorMsg;
    protected boolean isError;

    public CreditStatus(String errorMsg, boolean isError) {
        this.errorMsg = errorMsg;
        this.isError  = isError;
    }

    public String  getErrorMsg() { return errorMsg; }
    public boolean isError()     { return isError; }
    // setters omitted for brevity
}
```

When `isError` is `true`, iDempiere blocks the document action and displays `errorMsg` to the user. When `isError` is `false`, the action proceeds.


Contributed by [Logilite Technologies](http://www.logilite.com/).

**Technical reference:** [IDEMPIERE-5768](https://idempiere.atlassian.net/browse/IDEMPIERE-5768)
