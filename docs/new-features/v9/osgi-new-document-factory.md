---
sidebar_position: 47
title: "OSGi New Document Factory"
sidebar_label: "OSGi New Document Factory"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Description:**
Implement a new document factory base class (MappedDocumentFactory class and IMappedDocumentFactory interface).

**Usage:**

With following Doc class:

```java
public class MyDocInOut extends Doc_InOut {
   public MyDocInOut(MAcctSchema as, ResultSet rs, String trxName) {
	super(as, rs, trxName);
   }
}
```

Developer can use one of the following approach:

1. At plugin Activator start method, register the document class.

```java
public void start(BundleContext context) throws Exception {
  IMappedDocumentFactory factory = Core.getMappedDocumentFactory();
  factory.addMapping(null, MInOut.Table_Name, (p) -> new MyDocInOut(p.as, p.rs, p.trxName));
  //need to reset cache if you are replacing doc classes from core
  CacheMgt.get().reset(DocManager.IDOC_FACTORY_CACHE_TABLE_NAME);
}
```

2. Create an osgi component, at the bind method for the IMappedDocumentFactory service.
```java
public void bindService(IMappedDocumentFactory factory) {
  factory.addMapping(null, MInOut.Table_Name, (p) -> new MyDocInOut(p.as, p.rs, p.trxName));
  //need to reset cache if you are replacing doc classes from core
  CacheMgt.get().reset(DocManager.IDOC_FACTORY_CACHE_TABLE_NAME);
}
```

3. Create a subclass of MappedDocumentFactory, register as IDocFactory service (DO NOT register as IMappedDocumentFactory service).
```java
public class MyDocFactory extends MappedDocumentFactory {
  public MyDocFactory() {
     addMapping(null, MInOut.Table_Name, (p) -> new MyDocInOut(p.as, p.rs, p.trxName));
     //need to reset cache if you are replacing doc classes from core
     CacheMgt.get().reset(DocManager.IDOC_FACTORY_CACHE_TABLE_NAME);
  }
}
```
**Technical Info:** [IDEMPIERE-4695](https://idempiere.atlassian.net/browse/IDEMPIERE-4695)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_OSGi_New_Document_Factory)_
