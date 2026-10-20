# OSGi New Column Callout Factory

> OSGi New Column Callout Factory

**Feature:** OSGi New Column Callout Factory

**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

### **Description**
- Implement a new column callout factory base class that's backed by Map and Lambda functional object.
- Implement callout annotation and factory base class that scan and register classes with callout annotation.

### **Usage**
With following Callout class:

```java
public class MyTestAmountCallout implements IColumnCallout {
    @Override
    public String start(Properties ctx, int WindowNo, GridTab mTab, GridField mField, Object value, Object oldValue) {
        return null;
    }
}
```

Developer can use one of the following approach:

1. At plugin Activator start method, register the callout class.

```java
public void start(BundleContext context) throws Exception {
    var factory = Core.getMappedColumnCalloutFactory();
    factory.addMapping(MTest.Table_Name, MTest.COLUMNNAME_T_Amount, () -> new MyTestAmountCallout());
}
```
2. Create an osgi component, at the bind method for the IMappedColumnCalloutFactory service.
```java
public void bindService(IMappedColumnCalloutFactory factory) {
    factory.addMapping(MTest.Table_Name, MTest.COLUMNNAME_T_Amount, () -> new MyTestAmountCallout());
}
```

3. Create a subclass of `MappedColumnCalloutFactory`, register as `IColumnCalloutFactory` service (DO NOT register as `IMappedColumnCalloutFactory` service).

```java
public class MyFactory extends MappedColumnCalloutFactory {
    public MyFactory() {
	addMapping(MTest.Table_Name, MTest.COLUMNNAME_T_Amount, () -> new MyTestAmountCallout());
    }
}
```

### **Annotations**

The `org.adempiere.base.annotation.Callout` annotation takes `tableName` and `columnName` parameters. Use `*` to match any table or column name.

Annotate your class with the `Callout` annotation:

```java
 @Callout(tableName = "AD_InfoWindow", columnName = "AD_Table_ID")
 @Callout(tableName = "AD_InfoColumn", columnName = {"AD_Element_ID","AD_Reference_ID"})
 public class CalloutInfoWindow implements IColumnCallout {
     @Override
     public String start(Properties ctx, int WindowNo, GridTab mTab, GridField mField, Object value, Object oldValue) {
        ...
     }
 }
```

Then register the annotated classes in one of two ways.

**Option 1:** Create an OSGi component that extends the `AnnotationBasedColumnCalloutFactory` class (with `service = IColumnCalloutFactory.class`). The class must implement the abstract `getPackages()` method and return the packages that hold your annotated callout classes. The scan does not include sub-packages.

```java title="src/com/example/callout/MyAnnotationBasedColumnCalloutFactory.java"
package com.example.callout;

import org.adempiere.base.AnnotationBasedColumnCalloutFactory;
import org.adempiere.base.IColumnCalloutFactory;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, service = IColumnCalloutFactory.class)
public class MyAnnotationBasedColumnCalloutFactory extends AnnotationBasedColumnCalloutFactory {

    @Override
    protected String[] getPackages() {
        return new String[] {"com.example.callout"};
    }
}
```

**Option 2:** In the plugin Activator `start` method, scan the annotated callout classes:

```java
 public void start(BundleContext context) throws Exception {
     //replace org.idempiere.test.callout with package name of your annotated callout classes
     Core.getMappedColumnCalloutFactory().scan(context, "org.idempiere.test.callout");
 }
```

The activator approach above is not 100% safe as `Core.getMappedColumnCalloutFactory()` can return null if your bundle gets activated before the activation of the `IMappedColumnCalloutFactory` service. The better way is to use the `@Component`, `@Reference` and `@Activate` annotations instead:

```java
 @Component(immediate = true)
 public class MyActivator implements BundleActivator {

       @Reference(service = IMappedColumnCalloutFactory.class, cardinality = ReferenceCardinality.MANDATORY)
       private IMappedColumnCalloutFactory mappedCalloutFactory;

       public MyActivator() {
       }

       @Override
       public void start(BundleContext context) throws Exception {
       }

       @Override
       public void stop(BundleContext context) throws Exception {
       }

       //activate will only be called after the injection of mappedCalloutFactory reference
       @Activate
       public void activate(BundleContext context) {
          //replace org.idempiere.test.callout with package name of your annotated callout classes
          mappedCalloutFactory.scan(context, "org.idempiere.test.callout");
       }
 }
```

**Technical Info:** [IDEMPIERE-4690](https://idempiere.atlassian.net/browse/IDEMPIERE-4690), [IDEMPIERE-5015](https://idempiere.atlassian.net/browse/IDEMPIERE-5015)
