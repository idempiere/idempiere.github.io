---
title: Developing Plug-in Event Handlers
sidebar_label: Event Handlers
description: Learn how to implement event handlers in iDempiere plug-ins to intercept and respond to model events.
sidebar_position: 6
---

# Developing Plug-in Event Handlers

## 🎯 Goal

This tutorial shows you how to develop **event handlers** in your own plug-in, enabling you to intercept and respond to data model events throughout the iDempiere system.

### What is an Event Handler?

An **event handler** is a component that listens to and responds to events triggered by changes to data models (tables) in iDempiere. Event handlers are executed whenever records are created, updated, or deleted, regardless of how the change was initiated.

Event handlers are commonly used to:

- **Validate data** across all entry points (UI, REST API, processes, imports)
- **Enforce business rules** that must apply system-wide
- **Trigger automated actions** when data changes (e.g., send notifications, update related records)
- **Maintain data integrity** through cross-table validations
- **Audit and log** specific operations
- **Integrate with external systems** when data changes

For example, when a Sales Order is completed, an event handler can automatically create a shipment, send a notification email, or update inventory levels.

### Event Handlers vs Callouts

| Feature | Event Handler | Callout |
|---------|--------------|---------|
| **Scope** | All operations (UI, API, processes, imports) | UI and CSV Importer only |
| **Execution Point** | Before/after database operations | During field value changes in UI |
| **Use Case** | System-wide business rules and validations | UI-specific field interactions |

:::tip When to Use Event Handlers
Use **event handlers** when you need logic that applies regardless of how data is entered or modified. Use **[callouts](./plugin-callouts)** for UI-specific interactions like auto-filling fields or showing immediate feedback to users.
:::

---

## ✅ Prerequisites

Before starting, review:

- [Developing Plug-Ins Without Affecting the Trunk](./developing-plugins)
- [Running Plug-ins Locally](./plugin-running-locally)

You should already know how to create a plug-in, as this guide will not cover that in detail.

---

## 📋 Overview

iDempiere's event handling system is built on top of the **OSGi Event Admin Framework**. The `IEventManager` service, provided by the `org.adempiere.base` bundle, enables you to register event handlers that replace the legacy `AD_ModelValidator` table and `ModelValidator` interface approach.

---

## 📋 Implementation Methods

### Modern Approach (iDempiere 9+): Event Annotation

Starting with **iDempiere 9**, you can use annotations to register event handlers. This is the simplest and recommended approach.

For details, see the section on [Event Annotations](#event-annotations-idempiere-9) below.

---

### Creating an Event Handler Class

#### Step 1: Extend AbstractEventHandler

Create a class that extends [`AbstractEventHandler`](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/event/AbstractEventHandler.java). This base class simplifies event handler implementation and allows you to stop events by throwing a `RuntimeException`.

**Example: `MyEventHandler.java`**

```java
package com.example.eventhandler;

import org.adempiere.base.event.AbstractEventHandler;
import org.adempiere.base.event.IEventTopics;
import org.compiere.model.PO;
import org.compiere.model.MOrder;
import org.osgi.service.event.Event;

public class MyEventHandler extends AbstractEventHandler {

    @Override
    protected void initialize() {
        // Register for events on the C_Order table
        registerTableEvent(IEventTopics.PO_BEFORE_NEW, MOrder.Table_Name);
        registerTableEvent(IEventTopics.PO_BEFORE_CHANGE, MOrder.Table_Name);
        registerTableEvent(IEventTopics.PO_AFTER_NEW, MOrder.Table_Name);
    }

    @Override
    protected void doHandleEvent(Event event) {
        String type = event.getTopic();
        PO po = getPO(event);
        
        if (po instanceof MOrder) {
            MOrder order = (MOrder) po;
            
            if (type.equals(IEventTopics.PO_BEFORE_NEW)) {
                // Validation logic before creating a new order
                if (order.getC_BPartner_ID() <= 0) {
                    throw new RuntimeException("Business Partner is required");
                }
            } else if (type.equals(IEventTopics.PO_BEFORE_CHANGE)) {
                // Validation logic before updating an order
                validateOrderTotal(order);
            } else if (type.equals(IEventTopics.PO_AFTER_NEW)) {
                // Post-creation actions
                System.out.println("New order created: " + order.getDocumentNo());
            }
        }
    }
    
    private void validateOrderTotal(MOrder order) {
        // Your validation logic
        if (order.getGrandTotal().signum() < 0) {
            throw new RuntimeException("Order total cannot be negative");
        }
    }
}
```
**Example Project:**

For a complete working example of event handlers, see:  
[idempiere-examples: Event Handler Example](https://github.com/hengsin/idempiere-examples/blob/main/org.idempiere.eventhandler.example/src/org/idempiere/eventhandler/example/Activator.java)

#### Step 2: Override Required Methods

Your event handler class must override two methods:

1. **`initialize()`** - Register the table events you're interested in
2. **`doHandleEvent(Event event)`** - Implement your business logic

**Available Event Topics** (from `IEventTopics` interface):

##### Model (PO) Events

These events are triggered during record operations:

- `PO_BEFORE_NEW` - Before a new record is saved to the database
- `PO_AFTER_NEW` - After a new record is saved to the database
- `PO_AFTER_NEW_REPLICATION` - After new record replication
- `PO_BEFORE_CHANGE` - Before an existing record is updated
- `PO_AFTER_CHANGE` - After an existing record is updated
- `PO_AFTER_CHANGE_REPLICATION` - After record change replication
- `PO_BEFORE_DELETE` - Before a record is deleted
- `PO_AFTER_DELETE` - After a record is deleted
- `PO_BEFORE_DELETE_REPLICATION` - Before record deletion replication
- `PO_POST_CREATE` - Asynchronous event after record creation
- `PO_POST_UPDATE` - Asynchronous event after record update
- `PO_POST_DELETE` - Asynchronous event after record deletion
- `PO_ALL` - Wildcard to match all PO events

##### Document Events

These events are triggered during document workflow actions:

**Before Events:**
- `DOC_BEFORE_PREPARE` - Before document is prepared
- `DOC_BEFORE_COMPLETE` - Before document is completed
- `DOC_BEFORE_VOID` - Before document is voided
- `DOC_BEFORE_CLOSE` - Before document is closed
- `DOC_BEFORE_REACTIVATE` - Before document is reactivated
- `DOC_BEFORE_REVERSECORRECT` - Before document reverse correction
- `DOC_BEFORE_REVERSEACCRUAL` - Before document reverse accrual
- `DOC_BEFORE_POST` - Before document is posted to accounting

**After Events:**
- `DOC_AFTER_PREPARE` - After document is prepared
- `DOC_AFTER_COMPLETE` - After document is completed
- `DOC_AFTER_VOID` - After document is voided
- `DOC_AFTER_CLOSE` - After document is closed
- `DOC_AFTER_REACTIVATE` - After document is reactivated
- `DOC_AFTER_REVERSECORRECT` - After document reverse correction
- `DOC_AFTER_REVERSEACCRUAL` - After document reverse accrual
- `DOC_AFTER_POST` - After document is posted to accounting
- `DOC_ALL` - Wildcard to match all document events

##### Import Events

Events triggered during data import processes:

- `IMPORT_BEFORE_VALIDATE` - Before all import records are validated
- `IMPORT_AFTER_VALIDATE` - After all import records are validated
- `IMPORT_BEFORE_IMPORT` - Before an import record is processed
- `IMPORT_AFTER_IMPORT` - After an import record is processed

##### Process Events

Events triggered during process execution:

- `BEFORE_PROCESS` - Before starting a process, after it's prepared
- `AFTER_PROCESS` - After a process finishes, before commit
- `POST_PROCESS` - After a process is committed (asynchronous)

##### System Events

Other system-level events:

- `AFTER_LOGIN` - After user login
- `ACCT_FACTS_VALIDATE` - During accounting facts validation
- `PREF_AFTER_LOAD` - After preferences are loaded
- `DOCACTION` - During discovery of available document actions
- `BROADCAST_MESSAGE` - For broadcast messaging
- `REQUEST_SEND_EMAIL` - Before sending email for requests
- `REPORT_SEND_EMAIL` - Before sending email for reports (to prefill dialog variables)

:::tip Choosing the Right Event
- Use **BEFORE** events for validation and preventing operations
- Use **AFTER** events for post-processing and triggering subsequent actions
- Use **POST** events for asynchronous operations that shouldn't block the main transaction
- Use **DOC** events for document-specific workflow logic
- Use **PO** events for general record-level logic
:::

:::tip Showing Error Messages
Instead of throwing an exception, you can call `addErrorMessage(String message)` to display a user-friendly error message without a stack trace.
:::

---

## 🔧 Registering as an OSGi Component

### Option A: Using Annotations (Recommended)

Add the `@Component` annotation to your event handler class:

```java
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(
    service = org.osgi.service.event.EventHandler.class,
    immediate = true
)
public class MyEventHandler extends AbstractEventHandler {
    
    @Reference
    public void bindEventManager(IEventManager eventManager) {
        super.setEventManager(eventManager);
    }
    
    public void unbindEventManager(IEventManager eventManager) {
        super.setEventManager(null);
    }
    
    // ... rest of implementation
}
```

See [Event Handling with Annotations](./developing-plugins#event-handle) for more details.

---

### Option B: Manual Component Definition

If not using annotations, create a component definition XML file manually.

#### Step 1: Create OSGI-INF Directory

Create a directory named `OSGI-INF` in your project root (this is the OSGi convention for component definitions).

#### Step 2: Create Component Definition XML

Create a file `OSGI-INF/eventhandler.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.1.0" 
               name="com.example.eventhandler.MyEventHandler">
   <implementation class="com.example.eventhandler.MyEventHandler"/>
   <reference 
      bind="bindEventManager" 
      unbind="unbindEventManager"
      cardinality="1..1" 
      interface="org.adempiere.base.event.IEventManager" 
      name="IEventManager" 
      policy="static"/>
</scr:component>
```

The `bindEventManager` and `unbindEventManager` methods are inherited from the `AbstractEventHandler` class.

#### Step 3: Update MANIFEST.MF

Edit your `META-INF/MANIFEST.MF` file to include the component definition:

```
Service-Component: OSGI-INF/eventhandler.xml
```

If you have multiple component definitions, you can use:

```
Service-Component: OSGI-INF/*.xml
```

#### Step 4: Enable Plugin Activation

In your `MANIFEST.MF`, ensure the plugin activation is enabled:

```
Bundle-ActivationPolicy: lazy
```

Also ensure in your plugin configuration that "Activate this plugin when one of its classes is loaded" is enabled.

#### Step 5: Update build.properties

Ensure `build.properties` includes the OSGI-INF directory:

```
bin.includes = META-INF/,\
               .,\
               OSGI-INF/
```

---

## 🧪 Testing Your Event Handler

1. Deploy your plug-in to iDempiere
2. Start the iDempiere server
3. Perform an action that triggers your event (e.g., create or update a Sales Order)
4. Verify that your event handler logic executes
5. Check logs for any output or errors

---

## 📦 Exporting Your Plug-in

Before exporting your plug-in as a JAR:

1. Open `build.properties`
2. Verify that `OSGI-INF/` is listed in **Binary Build**
3. Ensure your component definition XML files are included
4. Test the exported JAR in a clean iDempiere instance

---

## 🎥 Video Tutorial

Watch this video walkthrough:  
[https://www.youtube.com/watch?v=zc_Ye8WZ-jc](https://www.youtube.com/watch?v=zc_Ye8WZ-jc)

Additional tutorial:  
[https://www.youtube.com/watch?v=lVPPnyiBvV8](https://www.youtube.com/watch?v=lVPPnyiBvV8)

---

## 🔗 Related Resources

- [AbstractEventHandler Class](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/event/AbstractEventHandler.java)
- [IEventTopics Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/event/IEventTopics.java)
- [IEventManager Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/event/IEventManager.java)
- [OSGi Event Admin Framework](https://osgi.org/specification/osgi.cmpn/7.0.0/service.event.html)
- [iDempiere 9 Event Annotations](https://wiki.idempiere.org/en/NF9_OSGi_New_Process_Factory)
