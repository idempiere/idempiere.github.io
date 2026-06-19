---
sidebar_position: 52
title: "OSGi New Process Factory"
sidebar_label: "OSGi New Process Factory"
description: "**Feature:** New Process Factory and Process Annotations"
tags: [development]
---
**Feature:** New Process Factory and Process Annotations

**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))


### **Description**
- Implement a new process factory base class that's backed by Map and Lambda functional object.
- Add org.adempiere.base.annotation.Process annotation and factory base class that discover and register classes with Process annotation.

### **Usage**
With following process class:

```java
public class MyTest extends SvrProcess {
       @Override
       protected void prepare() {
       }
```

```
       @Override
       protected String doIt() throws Exception {
           return null;
       }
}
```

Developer can use one of the following approach:

1. At plugin Activator start method, register the process class.

```java
public void start(BundleContext context) throws Exception {
   IMappedProcessFactory mappedFactory = Core.getMappedProcessFactory();
   mappedFactory.addMapping(MyTest.class.getName(), () -> new MyTest());
}
```

2. Create an osgi component, at the bind method for IMappedDocumentFactory service component.
```java
public void bindService(IMappedProcessFactory factory) {
    factory.addMapping(MyTest.class.getName(), () -> new MyTest());
}
```

3. Create a subclass of MappedProcessFactory, register as IDocFactory service (DO NOT register as IMappedDocumentFactory service).
```java
public class MyFactory extends MappedProcessFactory {
    public MyFactory() {
        addMapping(MyTest.class.getName(), () -> new MyTest());
    }
}
```

4. IDEMPIERE-5001 added scan(BundleContext context, String... packages) method to IMappedProcessFactory and MappedProcessFactory. Developer can call that at plugin Activator start method to register process classes with org.adempiere.base.annotation.Process annotation.
```java
 public void start(BundleContext context) throws Exception {
      //replace org.idempiere.test.process with package name of your process classes
      Core.getMappedProcessFactory().scan(context, "org.idempiere.test.process");
 }
```

The approach above is not 100% safe as Core.getMappedProcessFactory() can return null if your bundle get activated before the activation of the IMappedProcessFactory service.
The better way is to use @Component, @Reference and @Activator instead.
```java
 @Component(immediate = true)
 public class MyActivator implements BundleActivator {

       @Reference(service = IMappedProcessFactory.class, cardinality = ReferenceCardinality.MANDATORY)
       private IMappedProcessFactory mappedProcessFactory;

       public MyActivator() {
       }

       @Override
       public void start(BundleContext context) throws Exception {
       }

       @Override
       public void stop(BundleContext context) throws Exception {
       }

       //activate will only be called after the injection of mappedProcessFactory reference
       @Activate
       public void activate(BundleContext context) {
          //replace org.idempiere.test.process with package name of your process classes
          mappedProcessFactory.scan(context, "org.idempiere.test.process");
       }
 }
```

### **Annotations**
1. org.adempiere.base.annotation.Process annotation with optional name parameter. A process class is always register to its fully qualify class name and the name parameter allow developer to add an alternate register name for the process class.

2. Plugin should either use the method 4 above or create a new OSGi component that extends the AnnotationBasedProcessFactory class (usually with @Component(immediate = true, service = IProcessFactory.class, property = &#123;"service.ranking:Integer=1"&#125;) component annotation).

```java
  @org.adempiere.base.annotation.Process
  public class BPartnerValidate extends SvrProcess  {
     ...
  }
```

**Technical Info:** [IDEMPIERE-4689](https://idempiere.atlassian.net/browse/IDEMPIERE-4689), [IDEMPIERE-5001](https://idempiere.atlassian.net/browse/IDEMPIERE-5001)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_OSGi_New_Process_Factory)_
