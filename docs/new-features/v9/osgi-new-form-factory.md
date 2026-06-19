---
sidebar_position: 49
title: "OSGi New Form Factory"
sidebar_label: "OSGi New Form Factory"
description: "**Feature:** New Form Factory and Form Annotations"
tags: [development]
---
**Feature:** New Form Factory and Form Annotations

**Goal:** Development

**Developer:** Hengsin, Matheus Marcelino


### **Description**
- Implement a new form factory base class that's backed by Map and Lambda functional object.
- Add org.idempiere.ui.zk.annotation.Form annotation and factory base class that discover and register classes with Form annotation.

### **Usage**
With following form class:

```java
 public class MyTestForm implements IFormController {
    private CustomForm form;
    public MyTestForm() {
       form = new CustomForm();
    }
    @Override
    public ADForm getForm() {
       return form;
    }
 }
```

Developer can use one of the following approach:

1. At plugin Activator start method, register the process class.

```java
public void start(BundleContext context) throws Exception {
   IMappedFormFactory mappedFactory = Extensions.getMappedFormFactory();
   mappedFactory.addMapping(MyTestForm.class.getName(), () -> new MyTestForm().getForm());
}
```

2. Create an osgi component, at the bind method for IMappedFormFactory service component.
```java
public void bindService(IMappedFormFactory factory) {
    factory.addMapping(MyTestForm.class.getName(), () -> new MyTestForm().getForm());
}
```

3. Create a subclass of MappedFormFactory, register as IFormFactory service (DO NOT register as IMappedFormFactory service).
```java
public class MyFactory extends MappedFormFactory {
    public MyFactory() {
        addMapping(MyTestForm.class.getName(), () -> new MyTestForm().getForm());
    }
}
```

4. IDEMPIERE-5012 added scan(BundleContext context, String... packages) method to IMappedFormFactory and MappedFormFactory. Developer can call that at plugin Activator start method to register form classes with org.idempiere.ui.zk.annotation.Form annotation.
```java
 public void start(BundleContext context) throws Exception {
      //replace org.idempiere.test.form with package name of your form classes
      Extensions.getMappedFormFactory().scan(context, "org.idempiere.test.form");
 }
```

The approach above is not 100% safe as Extensions.getMappedFormFactory() can return null if your bundle get activated before the activation of the IMappedFormFactory service.
The better way is to use @Component, @Reference and @Activator instead.
```java
 @Component(immediate = true)
 public class MyActivator implements BundleActivator {

       @Reference(service = IMappedFormFactory.class, cardinality = ReferenceCardinality.MANDATORY)
       private IMappedFormFactory mappedFormFactory;

       public MyActivator() {
       }

       @Override
       public void start(BundleContext context) throws Exception {
       }

       @Override
       public void stop(BundleContext context) throws Exception {
       }

       //activate will only be called after the injection of mappedFormFactory reference
       @Activate
       public void activate(BundleContext context) {
          //replace org.idempiere.test.form with package name of your form classes
          mappedFormFactory.scan(context, "org.idempiere.test.form");
       }
 }
```

### **Annotations**
1. org.idempiere.ui.zk.annotation.Form annotation with optional name parameter. A form class is always register to its fully qualify class name and the name parameter allow developer to add an alternate register name for the form class.

2. Plugin should either use the method 4 above or create a new OSGi component that extends the AnnotationBasedFormFactory class (usually with @Component(immediate = true, service = IFormFactory.class, property = &#123;"service.ranking:Integer=1"&#125;) component annotation).

```java
@org.idempiere.ui.zk.annotation.Form(name = "org.compiere.apps.form.VAllocation")
public class WAllocation extends Allocation implements IFormController, EventListener<Event>, WTableModelListener, ValueChangeListener {
  ...
}
```

**Technical Info:** [IDEMPIERE-4773](https://idempiere.atlassian.net/browse/IDEMPIERE-4773), [IDEMPIERE-5012](https://idempiere.atlassian.net/browse/IDEMPIERE-5012)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_OSGi_New_Form_Factory)_
