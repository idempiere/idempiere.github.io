---
sidebar_position: 50
title: "OSGi New Mapped By Name Factory"
sidebar_label: "OSGi New Mapped By Name Factory"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Description:**
iDempiere have many OSGi factory that create the requested instance  by class name or a string key (IProcessFactory, IModelValidatorFactory, IPaymentProcessorFactory, etc). This ticket add generic typed, lambda function based interface and class that help to simplify the development of such factory class.

**New interface and class:**

1. org.adempiere.base.IMappedByNameFactory&lt;T&gt; interface

2. org.adempiere.base.MappedByNameFactory&lt;T&gt; class (implements IMappedByNameFactory&lt;T&gt;)

**Usage:**

To add new implementation of BankStatementMatcherInterface.

1. Create class that implement the BankStatementMatcherInterface interface
```java
public class MyBankStatementMatcher implements BankStatementMatcherInterface {
	@Override
	public BankStatementMatchInfo findMatch(MBankStatementLine bsl) {
	    return null;
	}
```

```
	@Override
	public BankStatementMatchInfo findMatch(X_I_BankStatement ibs) {
	    return null;
	}
}
```

2. Create factory class that implement the IBankStatementMatcherFactory interface.

```java
public class MyBankStatementMatcherFactory extends MappedByNameFactory<BankStatementMatcherInterface> implements IBankStatementMatcherFactory {
	public MyBankStatementMatcherFactory() {
           //add mapping from name/key to create new instance lambda expression
           addMapping(MyBankStatementMatcher.class.getName(), () -> new MyBankStatementMatcher());
	}
```

```
	@Override
	public BankStatementMatcherInterface newBankStatementMatcherInstance(String className)     {
           //use the newInstance default method at IMappedByNameFactory interface
           return newInstance(className);
	}
}
```

**Technical Info:** [IDEMPIERE-4704](https://idempiere.atlassian.net/browse/IDEMPIERE-4704)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_OSGi_New_Mapped_By_Name_Factory)_
