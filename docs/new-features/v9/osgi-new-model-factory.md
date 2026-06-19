---
sidebar_position: 51
title: "OSGi New Model Factory"
sidebar_label: "OSGi New Model Factory"
description: "**Feature:** OSGi New Model Factory and Model Annotations"
tags: [development]
---
**Feature:** OSGi New Model Factory and Model Annotations

**Goal:** Development

**Developer:** Hengsin, Saulo Gil


### **Description**
- Implement a new model factory base class that's backed by Map and Lambda functional object.
- Add org.adempiere.base.Model annotation and factory class that scan and register model classes with Model annotation

### **Usage**
With following model class:

```java
public class MyTest extends X_Test {
    /**
    *
    */
    private static final long serialVersionUID = 2010413233032792416L;

    public MyTest(Properties ctx, int Test_ID, String trxName) {
	super(ctx, Test_ID, trxName);
    }

    public MyTest(Properties ctx, ResultSet rs, String trxName) {
	super(ctx, rs, trxName);
    }
}
```

Developer can use one of the following approach:

1. At plugin Activator start method, register the model class.
```java
public void start(BundleContext context) throws Exception {
    var factory = Core.getMappedModelFactory();
    factory.addMapping(MyTest.Table_Name, () -> MyTest.class,
          (id, trxName) -> new MyTest(Env.getCtx(), id, trxName),
          (rs, trxName) -> new MyTest(Env.getCtx(), rs, trxName));
}
```

2. Create an osgi component, at the bind method for the IMappedModelFactory service.
```java
public void bindService(IMappedModelFactory factory) {
    factory.addMapping(MyTest.Table_Name, () -> MyTest.class,
          (id, trxName) -> new MyTest(Env.getCtx(), id, trxName),
          (rs, trxName) -> new MyTest(Env.getCtx(), rs, trxName));
}
```
3. Create a subclass of MappedModelFactory, register as IModelFactory service (DO NOT register as IMappedModelFactory service).
```java
public class MyFactory extends MappedModelFactory {
    public MyFactory() {
        addMapping(MyTest.Table_Name, () -> MyTest.class,
            (id, trxName) -> new MyTest(Env.getCtx(), id, trxName),
            (rs, trxName) -> new MyTest(Env.getCtx(), rs, trxName));
    }
}
```

4. IDEMPIERE-5004 added scan(BundleContext context, String... packages) method to IMappedModelFactory and MappedModelFactory. Developer can call that at plugin Activator start method to register model classes with org.adempiere.base.Model annotation.
```java
  public void start(BundleContext context) throws Exception {
      //replace org.idempiere.test.model.annotated with the package name of your model classes
      Core.getMappedModelFactory().scan(context, "org.idempiere.test.model.annotated");
  }
```

The approach above is not 100% safe as Core.getMappedModelFactory() can return null if your bundle get activated before the activation of the IMappedModelFactory service.
The better way is to use @Component, @Reference and @Activator instead.
```java
 @Component(immediate = true)
 public class MyActivator implements BundleActivator {

       @Reference(service = IMappedModelFactory.class, cardinality = ReferenceCardinality.MANDATORY)
       private IMappedModelFactory mappedModelFactory;

       public MyActivator() {
       }

       @Override
       public void start(BundleContext context) throws Exception {
       }

       @Override
       public void stop(BundleContext context) throws Exception {
       }

       //activate will only be called after the injection of mappedModelFactory reference
       @Activate
       public void activate(BundleContext context) {
          //replace org.idempiere.test.model.annotated with the package name of your model classes
          mappedModelFactory.scan(context, "org.idempiere.test.model.annotated");
       }
 }
```

### **Annotations**
1. org.adempiere.base.Model annotation with table attribute.

2. org.adempiere.base.AnnotationBasedModelFactory, new IModelFactory service that scan and register core model classes with Model annotation. Developer only have to annotate X_* model classes as the service will looks for the lowest subclass that extend annotated X_* model classes.

3. Model class generator is modify to generate X_* model class with Model annotation

4. Plugin should either use method 4 above or create OSGi component that extend AnnotationBasedModelFactory class (usually with @Component(immediate = true, service = IModelFactory.class, property = "service.ranking:Integer=1") component annotation).

```java
 @org.adempiere.base.Model(table="C_BPartner")
 public class X_C_BPartner extends PO implements I_C_BPartner, I_Persistent
 {
     ...
 }
```

**Technical Info:**

[IDEMPIERE-4675](https://idempiere.atlassian.net/browse/IDEMPIERE-4675), [IDEMPIERE-5004](https://idempiere.atlassian.net/browse/IDEMPIERE-5004), [IDEMPIERE-4842](https://idempiere.atlassian.net/browse/IDEMPIERE-4842)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_OSGi_New_Model_Factory)_
