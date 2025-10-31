---
title: Developing Plug-in Callouts
sidebar_label: Callouts
description: Learn how to implement column callouts in iDempiere plug-ins using modern best practices.
sidebar_position: 5
---

# Developing Plug-in Callouts

## 🎯 Goal

This tutorial shows you how to develop **callouts** in your own plug-in. 

### What is a Callout?

A **callout** is a piece of code that executes automatically when a user changes the value of a field in a window. Callouts are commonly used to:

- **Validate input data** before it's saved
- **Auto-fill related fields** based on the changed value
- **Perform calculations** (e.g., calculate totals, discounts, or taxes)
- **Show warnings or messages** to guide the user
- **Dynamically enable/disable fields** based on conditions
- **Load data from related records** (e.g., populate product details when selecting a product)

For example, when a user selects a Business Partner in a Sales Order, a callout can automatically fill in the payment terms, price list, and shipping address.

:::info Scope of Callouts
Callouts **only work** when data is entered through:
- **The iDempiere UI**
- **CSV Importer**

Callouts do **NOT** execute when records are created or modified via:
- **REST API calls**
- **Background processes**
- **Direct database operations**
- **Java code using PO.save()**

If you need validation or logic that works across all entry points, use an **[Event Handler](./plugin-eventhandler)** instead, which intercepts all record changes regardless of the source.
:::

### Implementation Approaches

This guide covers the following methods for implementing callouts:

1. **Mapped Column Callout Factory (iDempiere 9+)** - Modern approach with three registration methods:
   - Direct registration via Bundle Activator
   - OSGi Component with service binding
   - Factory subclass approach

2. **Annotation-Based Callouts (iDempiere 9+)** - _(Recommended)_ Use `@Callout` annotations to declare callouts declaratively

3. **Legacy CalloutFactory (Pre-iDempiere 9)** - Traditional approach using `IColumnCalloutFactory` interface

:::tip Recommended Approach
For **iDempiere 9+**, use **annotation-based callouts** for the cleanest and most maintainable code.  
For **earlier versions**, use the **CalloutFactory** approach.
:::

---

## ✅ Prerequisites

Before starting, review:

- [Developing Plug-Ins Without Affecting the Trunk](./developing-plugins)
- [Running Plug-ins Locally](./plugin-running-locally)

You should already know how to create a plug-in, as this guide will not cover that in detail.

---

## 📋 Implementation Methods

### Modern Approach (iDempiere 9+): Mapped Column Callout Factory

Starting with **iDempiere 9**, a new column callout factory base class was introduced that's backed by Map and Lambda functional objects. This approach supports:

- **Direct registration via Bundle Activator**
- **OSGi Component with service binding**
- **Annotation-based callout registration** _(recommended)_

:::tip Recommended
The annotation-based approach is the simplest and most maintainable method for iDempiere 9+.
:::

#### Method 1: Register at Plugin Activator Start

Register your callout directly in the plugin's activator `start()` method:

```java
public class MyTestAmountCallout implements IColumnCallout {
    @Override
    public String start(Properties ctx, int WindowNo, GridTab mTab, 
                       GridField mField, Object value, Object oldValue) {
        // Your callout logic here
        return null;
    }		
}
```

```java
public void start(BundleContext context) throws Exception {
    var factory = Core.getMappedColumnCalloutFactory();
    factory.addMapping(MTest.Table_Name, MTest.COLUMNNAME_T_Amount, 
                      () -> new MyTestAmountCallout());
}
```

:::warning
`Core.getMappedColumnCalloutFactory()` can return `null` if your bundle activates before the `IMappedColumnCalloutFactory` service. Use Method 2 or 3 for safer registration.
:::

#### Method 2: Bind via OSGi Component Service

Create an OSGi component and bind to the `IMappedColumnCalloutFactory` service:

```java
@Component(immediate = true)
public class MyCalloutComponent {
    
    @Reference
    public void bindService(IMappedColumnCalloutFactory factory) {
        factory.addMapping(MTest.Table_Name, MTest.COLUMNNAME_T_Amount, 
                          () -> new MyTestAmountCallout());
    }
}
```

#### Method 3: Extend MappedColumnCalloutFactory

Create a subclass of `MappedColumnCalloutFactory` and register it as an `IColumnCalloutFactory` service:

```java
@Component(service = IColumnCalloutFactory.class)
public class MyFactory extends MappedColumnCalloutFactory {
    public MyFactory() {
        addMapping(MTest.Table_Name, MTest.COLUMNNAME_T_Amount, 
                  () -> new MyTestAmountCallout());
    }
}
```

:::caution Important
Do **NOT** register as `IMappedColumnCalloutFactory` service when extending `MappedColumnCalloutFactory`.
:::

---

### Annotation-Based Callouts (Recommended for iDempiere 9+)

The annotation approach allows you to declare callouts directly on your callout classes using the `@Callout` annotation.

#### Step 1: Annotate Your Callout Class

Use the `@Callout` annotation with `tableName` and `columnName` parameters. You can use `*` to match any table or column name.

**Single Column Example:**

```java
import org.adempiere.base.annotation.Callout;
import org.adempiere.base.IColumnCallout;

@Callout(tableName = "AD_InfoWindow", columnName = "AD_Table_ID")
public class CalloutInfoWindow implements IColumnCallout {
    
    @Override
    public String start(Properties ctx, int WindowNo, GridTab mTab, 
                       GridField mField, Object value, Object oldValue) {
        // Your callout logic
        return null;
    }
}
```

**Multiple Columns Example:**

```java
@Callout(tableName = "AD_InfoColumn", 
         columnName = {"AD_Element_ID", "AD_Reference_ID"})
public class CalloutInfoColumn implements IColumnCallout {
    
    @Override
    public String start(Properties ctx, int WindowNo, GridTab mTab, 
                       GridField mField, Object value, Object oldValue) {
        // Your callout logic
        return null;
    }
}
```

#### Step 2: Register Annotated Callouts

You have two options for scanning and registering annotated callout classes:

**Option A: Create an OSGi Component (Recommended)**

Extend `AnnotationBasedColumnCalloutFactory` and register it as an `IColumnCalloutFactory` service:

```java
@Component(service = IColumnCalloutFactory.class)
public class MyAnnotationCalloutFactory extends AnnotationBasedColumnCalloutFactory {
    // The base class automatically scans for @Callout annotations
}
```

**Option B: Scan in Activator with Safe Service Binding**

Use `@Component`, `@Reference`, and `@Activate` to ensure safe registration:

```java
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;

@Component(immediate = true)
public class MyActivator implements BundleActivator {
    
    @Reference(service = IMappedColumnCalloutFactory.class, 
               cardinality = ReferenceCardinality.MANDATORY) 
    private IMappedColumnCalloutFactory mappedCalloutFactory;
    
    public MyActivator() {
    }
    
    @Override
    public void start(BundleContext context) throws Exception {
    }
    
    @Override
    public void stop(BundleContext context) throws Exception {
    }
    
    // activate() is called only after mappedCalloutFactory reference is injected
    @Activate
    public void activate(BundleContext context) {
        // Replace with your package name containing annotated callout classes
        mappedCalloutFactory.scan(context, "org.mycompany.callout");
    }
}
```

:::tip
The `@Activate` approach ensures that your callouts are only registered after the `IMappedColumnCalloutFactory` service is available, avoiding null pointer exceptions.
:::

**Example Project:**

For a complete working example of annotation-based callouts, see:  
[idempiere-examples: Callout Annotation Example](https://github.com/hengsin/idempiere-examples/tree/main/org.idempiere.callout.annotation.example)

**Technical References:**
- [IDEMPIERE-4690](https://idempiere.atlassian.net/browse/IDEMPIERE-4690)
- [IDEMPIERE-5015](https://idempiere.atlassian.net/browse/IDEMPIERE-5015)

---

### Using a CalloutFactory (iDempiere < 9)

This approach is recommended for versions before iDempiere 9.

#### Step 1: Create the Callout Class

Create a class that implements the [`IColumnCallout`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/IColumnCallout.java) interface.

**Example: `CalloutFromFactory.java`**

```java
package com.example.callout;

import org.adempiere.base.IColumnCallout;
import org.compiere.model.GridField;
import org.compiere.model.GridTab;
import java.util.Properties;

public class CalloutFromFactory implements IColumnCallout {
    
    @Override
    public String start(Properties ctx, int WindowNo, GridTab mTab, 
                       GridField mField, Object value, Object oldValue) {
        
        // Your callout logic here
        System.out.println("Callout triggered on: " + mField.getColumnName());
        System.out.println("New value: " + value);
        
        return null; // Return null if no error, or an error message string
    }
}
```

#### Step 2: Create the Callout Factory

Create a factory class that implements [`IColumnCalloutFactory`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/IColumnCalloutFactory.java).

**Example: `CalloutFactory.java`**

```java
package com.example.callout;

import org.adempiere.base.IColumnCallout;
import org.adempiere.base.IColumnCalloutFactory;
import org.compiere.model.MProduct;

public class CalloutFactory implements IColumnCalloutFactory {

    @Override
    public IColumnCallout[] getColumnCallouts(String tableName, String columnName) {
        
        // Check if this is the column we want to intercept
        if (tableName.equals(MProduct.Table_Name) && 
            columnName.equals(MProduct.COLUMNNAME_DocumentNote)) {
            
            return new IColumnCallout[] { new CalloutFromFactory() };
        }
        
        return null; // No callout for other columns
    }
}
```

#### Step 3: Register as an OSGi Component

**Option A: Using Annotations (Recommended)**

Add the `@Component` annotation to your factory class. See [Event Handling with Annotations](./developing-plugins#event-handle) for details.

```java
import org.osgi.service.component.annotations.Component;

@Component(
    service = IColumnCalloutFactory.class,
    immediate = true
)
public class CalloutFactory implements IColumnCalloutFactory {
    // ... implementation
}
```

**Option B: Manual Component Definition**

If not using annotations, create a component definition XML file manually.

1. Create a directory named `OSGI-INF` in your project root (this is the OSGi convention)
2. Create a file `OSGI-INF/calloutfactory.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.1.0" 
               name="com.example.callout.CalloutFactory">
   <implementation class="com.example.callout.CalloutFactory"/>
   <service>
      <provide interface="org.adempiere.base.IColumnCalloutFactory"/>
   </service>
</scr:component>
```

3. Update your `META-INF/MANIFEST.MF` to include the component:

```
Service-Component: OSGI-INF/calloutfactory.xml
```

4. Ensure `build.properties` includes the OSGI-INF directory in the binary build:

```
bin.includes = META-INF/,\
               .,\
               OSGI-INF/
```

---

## 🧪 Testing Your Callout

1. Start the iDempiere client
2. Log in as **GardenAdmin** to **GardenWorld**
3. Open the **Product** window
4. Enter or modify a value in the **Document Note** field
5. Tab out of the field to trigger the callout
6. Check your console log for the output

You should see:
```
Callout triggered on: DocumentNote
New value: [your entered text]
```

---

## 🎥 Video Tutorial

Watch this video walkthrough:  
[https://www.youtube.com/watch?v=twC6Dy8R5g4](https://www.youtube.com/watch?v=twC6Dy8R5g4)

---

## 📦 Exporting Your Plug-in

Before exporting your plug-in as a JAR:

1. Open `build.properties`
2. Verify that `OSGI-INF/` is listed in **Binary Build**
3. Ensure your component definition XML files are included

This ensures your OSGi component definitions are packaged correctly.

---

## 🔗 Related Resources

- [IColumnCallout Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/IColumnCallout.java)
- [IColumnCalloutFactory Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/IColumnCalloutFactory.java)
- [OSGi Declarative Services](https://wiki.idempiere.org/en/Plugin)
- [iDempiere 9 Callout Factory](https://wiki.idempiere.org/en/NF9_OSGi_New_Column_Callout_Factory)
