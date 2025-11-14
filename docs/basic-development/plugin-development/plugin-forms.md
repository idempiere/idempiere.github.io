---
title: Developing Plug-in Forms
sidebar_label: Forms
description: Learn how to create custom forms in iDempiere plug-ins using the IFormFactory service.
sidebar_position: 7
---

# Developing Plug-in Forms

## 🎯 Goal

This tutorial shows you how to use the **IFormFactory** service in your plug-in project to create custom forms in iDempiere.

### What is a Form?

A **form** in iDempiere is a custom user interface component that provides specialized functionality beyond standard windows. Forms are typically used for:

- **Complex data entry screens** with custom layouts
- **Data processing interfaces** (e.g., allocation forms, kanban board)
- **Reporting interfaces** with interactive parameters
- **Specialized business workflows** that don't fit the standard window model
- **Custom dashboards and visualizations**

---

## ✅ Prerequisites

Before starting, review:

- [Developing Plug-Ins Without Affecting the Trunk](./developing-plugins)
- [Running Plug-ins Locally](./plugin-running-locally)

You should already know how to create a plug-in, as this guide will not cover that in detail.

---

## 📋 Implementation Methods

### Modern Approach (iDempiere 9+): Mapped Form Factory

Starting with **iDempiere 9**, a new form factory base class was introduced that's backed by Map and Lambda functional objects. This approach supports multiple registration methods.

#### Example Form Class

First, create your form controller class that implements `IFormController`:

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

#### Method 1: Register at Plugin Activator Start

```java
public void start(BundleContext context) throws Exception {
    IMappedFormFactory mappedFactory = Extensions.getMappedFormFactory();
    mappedFactory.addMapping(MyTestForm.class.getName(), 
                            () -> new MyTestForm().getForm());
}
```

:::warning
`Extensions.getMappedFormFactory()` can return `null` if your bundle activates before the service. Use Method 4 for safer registration.
:::

#### Method 2: Bind via OSGi Component Service

```java
@Component(immediate = true)
public class MyFormComponent {
    
    @Reference
    public void bindService(IMappedFormFactory factory) {
        factory.addMapping(MyTestForm.class.getName(), 
                          () -> new MyTestForm().getForm());
    }
}
```

#### Method 3: Extend MappedFormFactory

```java
@Component(service = IFormFactory.class)
public class MyFactory extends MappedFormFactory {
    public MyFactory() {
        addMapping(MyTestForm.class.getName(), 
                  () -> new MyTestForm().getForm());
    }
}
```

:::caution Important
Do **NOT** register as `IMappedFormFactory` service when extending `MappedFormFactory`.
:::

#### Method 4: Scan Package with Annotations (Recommended)

Use `@Component`, `@Reference`, and `@Activate` for safe registration:

```java
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;

@Component(immediate = true)
public class MyActivator implements BundleActivator {
    
    @Reference(service = IMappedFormFactory.class, 
               cardinality = ReferenceCardinality.MANDATORY) 
    private IMappedFormFactory mappedFormFactory;
    
    public MyActivator() {
    }
    
    @Override
    public void start(BundleContext context) throws Exception {
    }
    
    @Override
    public void stop(BundleContext context) throws Exception {
    }
    
    // activate() is called only after mappedFormFactory reference is injected
    @Activate
    public void activate(BundleContext context) {
        // Replace with your package name containing form classes
        mappedFormFactory.scan(context, "org.mycompany.form");
    }
}
```

:::tip
The `@Activate` approach ensures that your forms are only registered after the `IMappedFormFactory` service is available, avoiding null pointer exceptions.
:::

---

### Using @Form Annotation

The `@Form` annotation allows you to declaratively register your form class. The annotation has an optional `name` parameter to provide an alternate registration name.

**Example:**

```java
import org.idempiere.ui.zk.annotation.Form;
import org.adempiere.webui.component.ADForm;

@Form(name = "org.compiere.apps.form.VAllocation")
public class WAllocation extends Allocation 
                          implements IFormController, EventListener<Event> {
    
    @Override
    public ADForm getForm() {
        return this;
    }
    
    // Your form implementation
}
```

To enable annotation scanning, create an OSGi component that extends `AnnotationBasedFormFactory`:

```java
@Component(
    immediate = true, 
    service = IFormFactory.class, 
    property = {"service.ranking:Integer=1"}
)
public class MyAnnotationFormFactory extends AnnotationBasedFormFactory {
    // The base class automatically scans for @Form annotations
}
```

**Example Project:**

For a complete working example of a custom form with annotation-based registration, see:  
[idempiere-examples: ZUL Form Example](https://github.com/hengsin/idempiere-examples/tree/main/org.idempiere.zul.form.example)

**Technical References:**
- [IDEMPIERE-4773](https://idempiere.atlassian.net/browse/IDEMPIERE-4773)
- [IDEMPIERE-5012](https://idempiere.atlassian.net/browse/IDEMPIERE-5012)

---

## 🔧 Creating a Custom Form (Step by Step)

### Step 1: Create Your Form Controller Class

Create a class that implements `IFormController` and `EventListener` to handle form functionality.

**Example: `WMyFormController.java`**

```java
package com.mycompany.webui.apps.form;

import org.adempiere.webui.component.ADForm;
import org.adempiere.webui.panel.IFormController;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.event.EventListener;

public class WMyFormController implements IFormController, EventListener<Event> {
    
    private ADForm form;
    
    public WMyFormController() {
        form = new ADForm();
        initForm();
    }
    
    private void initForm() {
        // Initialize your form components here
        form.setTitle("My Custom Form");
        // Add your UI components
    }
    
    @Override
    public ADForm getForm() {
        return form;
    }
    
    @Override
    public void onEvent(Event event) throws Exception {
        // Handle events here
    }
}
```

---

### Step 2: Create Your Form Factory Class

Create a class that implements `IFormFactory` to serve as the form loader for your plug-in.

**Example: `MyFormFactory.java`**

```java
package com.mycompany.webui.factory;

import org.adempiere.webui.factory.IFormFactory;
import org.adempiere.webui.panel.IFormController;
import com.mycompany.webui.apps.form.WMyFormController;

public class MyFormFactory implements IFormFactory {

    @Override
    public IFormController newFormInstance(String formName) {
        if (formName.equals("com.mycompany.webui.apps.form.WMyFormController")) {
            return new WMyFormController();
        }
        return null;
    }
}
```

---

### Step 3: Register as OSGi Component

**Option A: Using Annotations (Recommended)**

Add the `@Component` annotation to your factory class:

```java
import org.osgi.service.component.annotations.Component;

@Component(
    service = IFormFactory.class,
    immediate = true,
    property = {"service.ranking:Integer=1"}
)
public class MyFormFactory implements IFormFactory {
    // ... implementation
}
```

See [Event Handling with Annotations](./developing-plugins#event-handle) for more details.

**Option B: Manual Component Definition**

1. Create a directory named `OSGI-INF` in your project root
2. Create a file `OSGI-INF/formfactory.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.1.0" 
               name="com.mycompany.webui.factory.formfactory">
   <implementation class="com.mycompany.webui.factory.MyFormFactory"/>
   <property name="service.ranking" type="Integer" value="1"/>
   <service>
      <provide interface="org.adempiere.webui.factory.IFormFactory"/>
   </service>
</scr:component>
```

3. Update your `META-INF/MANIFEST.MF`:

```
Service-Component: OSGI-INF/*.xml
```

4. Ensure `build.properties` includes the OSGI-INF directory:

```
bin.includes = META-INF/,\
               .,\
               OSGI-INF/
```

:::info Service Ranking
The `service.ranking` property determines the priority for OSGi service lookup. Higher values have higher priority. If multiple plug-ins provide the same service, OSGi will call them in descending order of `service.ranking` until one returns a non-null object.
:::

---

## ⚙️ Configuring Your Form in iDempiere

### Step 1: Create a Form Record

1. Log in as **System Administrator**
2. Open **System Admin > General Rules > Form**
3. Create a new record:
   - **Name:** Your form name (e.g., "My Custom Form")
   - **Classname:** Your form controller's fully qualified class name  
     (e.g., `com.mycompany.webui.apps.form.WMyFormController`)
   - **Description:** Brief description of what the form does

### Step 2: Create a Menu Entry

1. Open **System Admin > General Rules > Menu**
2. Create a new record:
   - **Name:** Menu item name
   - **Action:** Select "Form"
   - **Special Form:** Select your form from Step 1
   - **Sequence:** Order in the menu
   - **Parent Menu:** Choose where to place it in the menu tree

### Step 3: Grant Role Access

1. Open **System Admin > Security > Role**
2. Select the appropriate role (e.g., "GardenWorld Admin")
3. Go to the **Form Access** tab
4. Add your new form and grant read access

---

## 🧪 Testing Your Form

1. Deploy your plug-in to iDempiere
2. Ensure your plug-in is set to auto-start in the Run Configuration
3. Start the iDempiere server
4. Log in as **GardenAdmin** (or the role you configured)
5. Navigate to your menu entry
6. The custom form should open

:::tip Troubleshooting
If the form doesn't appear:
- Check that your plug-in is activated in the Run Configuration
- Verify the classname in the Form record matches exactly
- Check the console for ClassNotFoundException or other errors
- Ensure the role has access to the form
:::

---

## 🔗 Related Resources

- [IFormFactory Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.ui.zk/WEB-INF/src/org/adempiere/webui/factory/IFormFactory.java)
- [IFormController Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.ui.zk/WEB-INF/src/org/adempiere/webui/panel/IFormController.java)
- [iDempiere 9 Form Factory](https://idempiere.atlassian.net/browse/IDEMPIERE-4773)
