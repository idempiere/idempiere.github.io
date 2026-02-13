---
title: Using IModelFactory in Plug-ins
sidebar_label: Model Factory
sidebar_position: 6
description: Learn how to use the IModelFactory service to provide custom model classes in your iDempiere plug-in
---

# Using IModelFactory in Plug-ins

This guide explains how to use the **IModelFactory service** in your plug-in project to provide custom model classes for your tables.

## 🎯 Goal

The IModelFactory service allows you to provide your own model classes for custom tables. When properly configured, iDempiere will:

- Automatically use your custom models throughout the application
- Call your model's lifecycle methods (e.g., `beforeSave()`, `afterSave()`)
- Return your model class when using the Query API (instead of `GenericPO`)

---

## 📚 Understanding Model Classes

### Class Naming Conventions: X_, I_, and M

iDempiere uses different classes for its models, all inheriting from the **PO (Persistent Object)** base class.

#### The I_ Interface

The `I_` class is an **interface** that contains:

- A constant for the table name
- The table's ID in the Application Dictionary (loaded dynamically via `MTable.getTable_ID()`)
- Constants for every column in the table
- Template declarations for all getter and setter methods

#### The X_ Base Model

The `X_` class is the **basic model** for every table:

- Extends `PO` and implements the corresponding `I_` interface
- Implements all getters and setters with validation logic
- Uses PO methods to persist data
- **Auto-generated**: Will be regenerated when you run the model generator

:::warning
Never put custom business logic in the `X_` class, as it will be overwritten when you regenerate your models!
:::

#### The M Custom Model

The `M` class is where your **custom business logic** lives.

**Naming convention:** `M` + `table prefix (if ≥3 chars)` + `table name (camelCase, no spaces/underscores)`

**Example:** For table `EVE_This_Is_My_Table`, create class `MEVEThisIsMyTable`

:::tip Why Use a Prefix?
Using your 3-letter table prefix (e.g., "EVE") makes it easier to identify custom models at a glance.
:::

**What you can do in the M class:**

- Override model hooks: `beforeSave()`, `afterSave()`, `beforeDelete()`, `afterDelete()`
- Implement the `DocAction` interface to make your table behave like a document
- Create special getters and setters (like `MOrder.getLines()`)

---

## 🛠️ Implementing a Model Factory

### What You Need

- A **Model class** (usually extending an existing model or from a custom table)
- A **ModelFactory class** (implements `IModelFactory`)

:::caution Important
Your model factory and model class **must be in different classes**. Don't implement `IModelFactory` in your model class itself!

The good news: You only need **one model factory** for all your custom models.
:::

### Example: Custom MOrder Subclass

First, create your custom model class `MOrder_New` that extends `MOrder`:

```java
public class MOrder_New extends MOrder {
    
    // Default constructors
    public MOrder_New(Properties ctx, int C_Order_ID, String trxName) {
        super(ctx, C_Order_ID, trxName);
    }
    
    public MOrder_New(Properties ctx, ResultSet rs, String trxName) {
        super(ctx, rs, trxName);
    }
    
    @Override
    protected boolean beforeSave(boolean newRecord) {
        // Your custom logic here
        System.out.println("Custom beforeSave called!");
        return super.beforeSave(newRecord);
    }
}
```

### Creating the Model Factory

Create a class that implements `IModelFactory` and register it using OSGi annotations:

```java
import org.adempiere.base.IModelFactory;
import org.compiere.model.PO;
import org.compiere.util.Env;
import org.osgi.service.component.annotations.Component;

@Component(
    property = {"service.ranking:Integer=100"},
    service = org.adempiere.base.IModelFactory.class
)
public class MyModelFactory extends AbstractModelFactory {

    @Override
    public Class<?> getClass(String tableName) {
        if (MOrder.Table_Name.equals(tableName))
            return MOrder_New.class;
        return null;
    }

    @Override
    public PO getPO(String tableName, int Record_ID, String trxName) {
        if (MOrder.Table_Name.equals(tableName))
            return new MOrder_New(Env.getCtx(), Record_ID, trxName);
        return null;
    }

    @Override
    public PO getPO(String tableName, ResultSet rs, String trxName) {
        if (MOrder.Table_Name.equals(tableName))
            return new MOrder_New(Env.getCtx(), rs, trxName);
        return null;
    }
}
```

:::tip Best Practice
Always extend [AbstractModelFactory](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/AbstractModelFactory.java) as it handles most common tasks for you. This class has been part of iDempiere since version 9.
:::

### Testing Your Model Factory

1. Make sure your plug-in is active in the run configuration
2. Start the client and verify your plug-in is loaded
3. Log in as GardenAdmin/GardenWorld
4. Create a new Sales Order, fill in mandatory fields, and save
5. Check the console log. You should see output from your custom model class

---

## 🆕 Modern Approach: AnnotationBasedModelFactory (iDempiere 9+)

Since iDempiere 9, there's a new default model factory that automatically detects model classes using annotations.

### Benefits

- Automatically detects models with the `@Model` annotation
- Model classes with `M` prefix don't need annotation if their `X_` classes are annotated
- The default model generator automatically annotates `X_` classes

:::info Learn More
For detailed information, see [NF9_OSGi_New_Model_Factory](https://wiki.idempiere.org/en/NF9_OSGi_New_Model_Factory) and the [AnnotationBasedModelFactory source code](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/AnnotationBasedModelFactory.java).
:::

---

## 🗺️ Alternative: Map-Based Factory

With a map-based factory, you declare associations using method references:

```java
package org.evenos.factories;

import org.idempiere.model.MappedModelFactory;
import org.compiere.util.Env;

public class MyModelFactory extends MappedModelFactory {
    
    public MyModelFactory() {
        // Map each table to its model class and constructors
        addMapping(MEVESub.Table_Name, 
            () -> MEVESub.class,
            (id, trxName) -> new MEVESub(Env.getCtx(), id, trxName),
            (rs, trxName) -> new MEVESub(Env.getCtx(), rs, trxName)
        );
        
        addMapping(MEVEMain.Table_Name, 
            () -> MEVEMain.class,
            (id, trxName) -> new MEVEMain(Env.getCtx(), id, trxName),
            (rs, trxName) -> new MEVEMain(Env.getCtx(), rs, trxName)
        );
    }
}
```

This approach provides a clean, declarative way to register multiple models.

---

## 🔧 Generating Models for Custom Tables

If you're creating models for your own custom tables:

### Step 1: Create the Table

Follow the instructions in [Creating Windows](../creating-windows.md) to create your custom table in the Application Dictionary.

:::tip Table Naming
Custom tables should have a 3-letter prefix. Use camelCase for the rest of the name.
Example: `CUST_This_Is_My_Table`
:::

### Step 2: Generate Model Classes

1. Log in as **System**
2. Open the **Generate Model** process
3. Fill in the parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| **Folder** | Where generated files will be stored | `/home/user/gitidempiere/plugins/com.company.plugin/src/com/company/model/` |
| **Table Like** | Table name pattern (with wildcards) | `CUST_%` |
| **Entity Type** | Your entity type | `U` (User maintained) |
| **Checkboxes** | Check both to generate I_ and X_ classes | ✅ Both checked |

:::caution Case Sensitivity
Make sure you use the correct upper/lower case when specifying the table name!
:::

4. Click **OK** to generate the `I_` and `X_` classes
5. Create your `M` class by extending the generated `X_` class

---

## ❗ Troubleshooting

If your model factory isn't working:

- ✅ **Check service ranking**: Make sure no other model factory has a higher `service.ranking` property
- ✅ **Separate classes**: Verify your model and factory are in different classes
- ✅ **Plug-in activation**: Ensure your plug-in is activated **before** you log in
- ✅ **MANIFEST.MF**: Verify it contains `Service-Component:` with the path to your factory XML (e.g., `Service-Component: mymodelfactory.xml`)
- ✅ **Console logs**: Check for any OSGi service registration errors
---

## 📹 Video Tutorials

For visual learners, check out these video explanations:

- [IModelFactory Tutorial - Part 1](https://www.youtube.com/watch?v=Pxi46BmIrTw)
- [IModelFactory Tutorial - Part 2](https://www.youtube.com/watch?v=F1lFHS2riG4)

---

## 📖 Related Topics

- [Creating Windows](../creating-windows.md)
- [Plugin Process](plugin-process.md)
- [Plugin Model Validator](plugin-modelvalidator.md)
