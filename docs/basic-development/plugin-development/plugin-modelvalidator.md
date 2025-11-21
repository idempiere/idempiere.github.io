---
title: Developing Plug-in Model Validators
sidebar_label: Model Validators
description: Learn how to create model validators in iDempiere plug-ins to add custom validation logic.
sidebar_position: 8
---

# Developing Plug-in Model Validators

## 🎯 Goal

This tutorial shows you how to develop **model validators** in your own plug-in, enabling you to add custom validation and business logic that executes during model operations.

### What is a Model Validator?

A **model validator** is a component that intercepts and validates model (record) operations in iDempiere. Model validators are similar to event handlers but use a different registration mechanism. They are commonly used to:

- **Validate data** before records are saved or deleted
- **Enforce complex business rules** across multiple fields
- **Calculate and set field values** based on business logic
- **Prevent invalid operations** by throwing exceptions
- **Audit and log** specific model changes
- **Trigger side effects** when records change

:::info Model Validators vs Event Handlers
Model validators and event handlers serve similar purposes. The main difference is in how they're registered and managed:
- **Model Validators** use the `ModelValidator` interface and `IModelValidatorFactory`
- **Event Handlers** use the OSGi Event Admin framework and `IEventManager`

For new development, consider using [Event Handlers](./plugin-eventhandler) as they provide more flexibility and better OSGi integration.
:::

---

## ✅ Prerequisites

Before starting, review:

- [Developing Plug-Ins Without Affecting the Trunk](./developing-plugins)
- [Running Plug-ins Locally](./plugin-running-locally)

You should already know how to create a plug-in, as this guide will not cover that in detail.

---

## 🎥 Video Tutorial

Watch this video walkthrough:  
[https://www.youtube.com/watch?v=Dwjl8p1Xguw](https://www.youtube.com/watch?v=Dwjl8p1Xguw)

---

## 📋 Creating a Model Validator

### Step 1: Create the Model Validator Class

Create a new class that implements the `ModelValidator` interface and all its required methods.

**Example: `MyModelValidator.java`**

```java
package com.mycompany.validator;

import java.util.logging.Level;
import org.compiere.model.ModelValidator;
import org.compiere.model.PO;
import org.compiere.model.MClient;
import org.compiere.model.MOrder;
import org.compiere.util.CLogger;

public class MyModelValidator implements ModelValidator {
    
    /** Logger */
    private static CLogger log = CLogger.getCLogger(MyModelValidator.class);
    
    /** Client ID */
    private int m_AD_Client_ID = -1;
    
    /** User ID */
    private int m_AD_User_ID = -1;
    
    /** Organization ID */
    private int m_AD_Org_ID = -1;
    
    /** Role ID */
    private int m_AD_Role_ID = -1;
    
    @Override
    public void initialize(ModelValidationEngine engine, MClient client) {
        // Store client ID
        if (client != null)
            m_AD_Client_ID = client.getAD_Client_ID();
        
        // Register for model changes on specific tables
        engine.addModelChange(MOrder.Table_Name, this);
        
        log.info("Model Validator initialized for client: " + m_AD_Client_ID);
    }
    
    @Override
    public int getAD_Client_ID() {
        return m_AD_Client_ID;
    }
    
    @Override
    public String login(int AD_Org_ID, int AD_Role_ID, int AD_User_ID) {
        // Store login information for later use
        m_AD_Org_ID = AD_Org_ID;
        m_AD_Role_ID = AD_Role_ID;
        m_AD_User_ID = AD_User_ID;
        
        log.info("Login - Org: " + AD_Org_ID + ", Role: " + AD_Role_ID + 
                 ", User: " + AD_User_ID);
        
        return null; // Return null if login is successful
    }
    
    @Override
    public String modelChange(PO po, int type) throws Exception {
        // Log the model change
        log.info("Model Change - Table: " + po.get_TableName() + 
                 ", Type: " + type + ", ID: " + po.get_ID());
        
        // Handle specific validation based on type
        if (po instanceof MOrder && type == TYPE_BEFORE_NEW) {
            MOrder order = (MOrder) po;
            
            // Example validation: Check if Business Partner is set
            if (order.getC_BPartner_ID() <= 0) {
                return "Business Partner is required";
            }
            
            // Example calculation: Set a custom field
            // order.set_ValueOfColumn("CustomField", calculatedValue);
        }
        
        return null; // Return null if validation passes
    }
    
    @Override
    public String docValidate(PO po, int timing) {
        // Handle document-level validations
        log.info("Document Validate - Table: " + po.get_TableName() + 
                 ", Timing: " + timing);
        
        // You can add document-specific validation here
        
        return null; // Return null if validation passes
    }
}
```

### Key Methods Explained

- **`initialize()`** - Called when the validator is loaded. Register for table events here.
- **`getAD_Client_ID()`** - Returns the client ID this validator serves.
- **`login()`** - Called when a user logs in. Store context information here.
- **`modelChange()`** - Called during model operations. Add validation logic here.
- **`docValidate()`** - Called during document workflow operations.

### Validation Types

The `type` parameter in `modelChange()` can be:

- `TYPE_BEFORE_NEW` - Before a new record is created
- `TYPE_AFTER_NEW` - After a new record is created
- `TYPE_BEFORE_CHANGE` - Before a record is updated
- `TYPE_AFTER_CHANGE` - After a record is updated
- `TYPE_BEFORE_DELETE` - Before a record is deleted
- `TYPE_AFTER_DELETE` - After a record is deleted

:::tip Return Values
- Return `null` if validation passes
- Return an error message string to prevent the operation and show the message to the user
- Throw an exception to halt the operation with an error
:::

---

## 🔧 Registering Your Model Validator

### Using a Model Validator Factory

Create a factory class that implements `IModelValidatorFactory` to tell iDempiere how to find your validator.

#### Step 1: Create the Factory Class

**Example: `MyModelValidatorFactory.java`**

```java
package com.mycompany.validator;

import org.adempiere.base.IModelValidatorFactory;
import org.compiere.model.ModelValidator;

public class MyModelValidatorFactory implements IModelValidatorFactory {

    @Override
    public ModelValidator newModelValidatorInstance(String className) {
        if (className.equals("com.mycompany.validator.MyModelValidator")) {
            return new MyModelValidator();
        }
        return null;
    }
}
```

#### Step 2: Register as OSGi Component

**Option A: Using Annotations (Recommended)**

Add the `@Component` annotation to your factory class:

```java
import org.osgi.service.component.annotations.Component;

@Component(
    service = IModelValidatorFactory.class,
    immediate = true,
    property = {"service.ranking:Integer=100"}
)
public class MyModelValidatorFactory implements IModelValidatorFactory {
    // ... implementation
}
```

See [Event Handling with Annotations](./developing-plugins#event-handle) for more details.

**Option B: Manual Component Definition**

1. Create a directory named `OSGI-INF` in your project root
2. Create a file `OSGI-INF/modelvalidatorfactory.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.1.0" 
               name="com.mycompany.validator.modelvalidatorfactory">
   <implementation class="com.mycompany.validator.MyModelValidatorFactory"/>
   <property name="service.ranking" type="Integer" value="100"/>
   <service>
      <provide interface="org.adempiere.base.IModelValidatorFactory"/>
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
The `service.ranking` property determines the priority for OSGi service lookup. Set it to a value like 100 to ensure your factory is loaded before the default iDempiere model validator factory.
:::

---

## ⚙️ Configuring Your Model Validator in iDempiere

### Creating a Model Validator Record

1. Log in as **System Administrator**
2. Open **System Admin > General Rules > Model Validator**
3. Create a new record:
   - **Name:** Your validator name (e.g., "My Custom Validator")
   - **Entity Type:** Your custom entity type
   - **Model Validation Class:** Fully qualified class name  
     (e.g., `com.mycompany.validator.MyModelValidator`)
   - **Description:** Brief description of what the validator does

The validator will be automatically activated when the system starts.

---

## 🧪 Testing Your Model Validator

1. Deploy your plug-in to iDempiere
2. Ensure your plug-in is set to auto-start in the Run Configuration
3. Start the iDempiere server
4. Create or update a record that should trigger your validator (e.g., a Sales Order)
5. Check the console logs for validation messages
6. Verify that validation rules are enforced

:::tip Debugging
Add logging statements in your validator methods to trace execution:
```java
log.info("Validating order: " + order.getDocumentNo());
log.warning("Validation failed: Missing required field");
```
:::

---

## 🔄 Model Validator vs Event Handler

Both approaches serve similar purposes but have different characteristics:

| Feature | Model Validator | Event Handler |
|---------|----------------|---------------|
| **Registration** | Via `IModelValidatorFactory` | Via OSGi Event Admin |
| **Interface** | `ModelValidator` interface | `EventHandler` interface or `AbstractEventHandler` |
| **Flexibility** | Less flexible | More flexible with topics |
| **Recommended** | Legacy code | New development |
| **Documentation** | Older API | Modern OSGi approach |

:::info Recommendation
For new plug-in development, consider using **[Event Handlers](./plugin-eventhandler)** instead, as they provide better OSGi integration and more flexibility. Model validators are still supported but are considered the legacy approach.
:::

---

## 🔗 Related Resources

- [ModelValidator Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/compiere/model/ModelValidator.java)
- [IModelValidatorFactory Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/IModelValidatorFactory.java)
- [Event Handlers (Modern Alternative)](./plugin-eventhandler)
- [Model Validation Engine](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/compiere/model/ModelValidationEngine.java)
