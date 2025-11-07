---
title: Developing Plug-in Processes
sidebar_label: Processes
description: Learn how to create and manage custom processes in iDempiere plug-ins.
sidebar_position: 4
---

# Developing Plug-in Processes

## 🎯 Goal

This tutorial shows you how to develop **processes** within your own plug-in, enabling you to create custom business logic that users can execute on demand.

### What is a Process?

A **process** in iDempiere is a unit of business logic that performs specific operations, typically triggered by users through buttons, menus, or scheduled tasks. Processes can:

- **Perform batch operations** (e.g., generate invoices, update prices)
- **Generate reports and exports** (e.g., export data to XML, create PDFs)
- **Execute calculations** (e.g., calculate commissions, consolidate data)
- **Integrate with external systems** (e.g., send data to APIs, import files)
- **Automate workflows** (e.g., send notifications, update records)

### What You Will Learn

- Create and run a new process in your custom plug-in
- Define and read process parameters
- Log information during process execution
- Handle errors properly during and after process execution
- Interact with users during process execution

---

## ✅ Prerequisites

Before starting, review:

- [Developing Plug-Ins Without Affecting the Trunk](./developing-plugins)
- [Running Plug-ins Locally](./plugin-running-locally)

You should already know how to create a plug-in, as this guide will not cover that in detail.

---

## 📋 Creating a Process

### Step 1: Create the Process Class

Create a new class that extends `SvrProcess` and implements the required methods:

- **`prepare()`** - Reads and validates process parameters
- **`doIt()`** - Contains the main business logic

**Example: Simple Process with Annotation**

```java
import org.adempiere.base.annotation.Process;
import org.adempiere.base.annotation.Parameter;
import org.compiere.process.SvrProcess;
import org.compiere.model.MProduct;
import java.io.File;
import java.io.FileWriter;

@Process
public class PrintProductXML extends SvrProcess {

    @Parameter
    private int p_M_Product_ID;
    
    public PrintProductXML() {
    }

    @Override
    protected void prepare() {
        // Parameters are automatically injected via @Parameter annotation
    }

    @Override
    protected String doIt() throws Exception {
        MProduct product = MProduct.get(p_M_Product_ID);
        File exportFile = File.createTempFile(product.getValue(), ".xml");
        FileWriter writer = new FileWriter(exportFile);
        writer.write(product.get_xmlString(null).toString());
        writer.close();
        
        if (processUI != null)
            processUI.download(exportFile);
            
        return "@Ok@";
    }
}
```

**Example Project:**

For a complete working example, see:  
[idempiere-examples: Process Annotation Example](https://github.com/hengsin/idempiere-examples/tree/main/org.idempiere.process.annotation.example/src/org/idempiere/process/annotation/example)

---

## 📋 Registering Your Process

### Modern Approach (iDempiere 9+): Mapped Process Factory

Starting with **iDempiere 9**, a new process factory base class was introduced that's backed by Map and Lambda functional objects. This approach supports multiple registration methods.

#### Method 1: Register at Plugin Activator Start

```java
public void start(BundleContext context) throws Exception {
    IMappedProcessFactory mappedFactory = Core.getMappedProcessFactory();
    mappedFactory.addMapping(MyTest.class.getName(), () -> new MyTest());
}
```

:::warning
`Core.getMappedProcessFactory()` can return `null` if your bundle activates before the service. Use Method 4 for safer registration.
:::

#### Method 2: Bind via OSGi Component Service

```java
@Component(immediate = true)
public class MyProcessComponent {
    
    @Reference
    public void bindService(IMappedProcessFactory factory) {
        factory.addMapping(MyTest.class.getName(), () -> new MyTest());
    }
}
```

#### Method 3: Extend MappedProcessFactory

```java
@Component(service = IProcessFactory.class)
public class MyFactory extends MappedProcessFactory {
    public MyFactory() {
        addMapping(MyTest.class.getName(), () -> new MyTest());
    }
}
```

:::caution Important
Do **NOT** register as `IMappedProcessFactory` service when extending `MappedProcessFactory`.
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
    
    @Reference(service = IMappedProcessFactory.class, 
               cardinality = ReferenceCardinality.MANDATORY) 
    private IMappedProcessFactory mappedProcessFactory;
    
    public MyActivator() {
    }
    
    @Override
    public void start(BundleContext context) throws Exception {
    }
    
    @Override
    public void stop(BundleContext context) throws Exception {
    }
    
    // activate() is called only after mappedProcessFactory reference is injected
    @Activate
    public void activate(BundleContext context) {
        // Replace with your package name containing process classes
        mappedProcessFactory.scan(context, "org.mycompany.process");
    }
}
```

---

### Using @Process Annotation

The `@Process` annotation allows you to declaratively register your process class. The annotation has an optional `name` parameter to provide an alternate registration name.

**Example:**

```java
@Process(name = "MyCustomProcess")
public class BPartnerValidate extends SvrProcess {
    
    @Override
    protected void prepare() {
    }
    
    @Override
    protected String doIt() throws Exception {
        // Your logic here
        return "@Success@";
    }
}
```

To enable annotation scanning, create an OSGi component that extends `AnnotationBasedProcessFactory`:

```java
@Component(
    immediate = true, 
    service = IProcessFactory.class, 
    property = {"service.ranking:Integer=1"}
)
public class MyAnnotationProcessFactory extends AnnotationBasedProcessFactory {
    // The base class automatically scans for @Process annotations
}
```

**Technical References:**
- [IDEMPIERE-4689](https://idempiere.atlassian.net/browse/IDEMPIERE-4689)
- [IDEMPIERE-5001](https://idempiere.atlassian.net/browse/IDEMPIERE-5001)

---

### Legacy Approach: Using a Process Factory

For versions before iDempiere 9, use the `IProcessFactory` interface.

#### Step 1: Create the Process Factory Class

```java
package com.example.process;

import org.adempiere.base.IProcessFactory;
import org.compiere.process.ProcessCall;

public class MyProcessFactory implements IProcessFactory {

    @Override
    public ProcessCall newProcessInstance(String className) {
        if (className.equals("com.example.process.MyProcess")) {
            return new MyProcess();
        }
        return null;
    }
}
```

#### Step 2: Register as OSGi Component

**Option A: Using Annotations**

```java
@Component(
    service = IProcessFactory.class,
    immediate = true,
    property = {"service.ranking:Integer=100"}
)
public class MyProcessFactory implements IProcessFactory {
    // ... implementation
}
```

**Option B: Manual Component Definition**

Create `OSGI-INF/processfactory.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.1.0" 
               name="com.example.process.factory">
   <implementation class="com.example.process.MyProcessFactory"/>
   <property name="service.ranking" type="Integer" value="100"/>
   <service>
      <provide interface="org.adempiere.base.IProcessFactory"/>
   </service>
</scr:component>
```

Update `META-INF/MANIFEST.MF`:

```
Service-Component: OSGI-INF/*.xml
```

---

## 📥 Reading Process Parameters

### Using @Parameter Annotation (Recommended)

The simplest way to read parameters is using the `@Parameter` annotation:

```java
@Process
public class MyProcess extends SvrProcess {

    @Parameter
    private int p_M_Product_ID;
    
    @Parameter
    private String p_Name;
    
    @Parameter
    private boolean p_IsActive;
    
    @Override
    protected void prepare() {
        // Parameters are automatically injected
    }

    @Override
    protected String doIt() throws Exception {
        // Use the parameters directly
        log.info("Product ID: " + p_M_Product_ID);
        return "@Success@";
    }
}
```

### Manual Parameter Reading

For more control, you can manually read parameters in the `prepare()` method:

```java
public class MyProcess extends SvrProcess {

    private boolean p_IsPrinted = false;
    private int p_M_Product_ID = 0;
    
    @Override
    protected void prepare() {
        ProcessInfoParameter[] para = getParameter();
        for (int i = 0; i < para.length; i++) {
            String name = para[i].getParameterName();
            if (para[i].getParameter() == null)
                continue;
            else if (name.equals("IsPrinted"))
                p_IsPrinted = para[i].getParameterAsBoolean();
            else if (name.equals("M_Product_ID"))
                p_M_Product_ID = para[i].getParameterAsInt();
        }
    }

    @Override
    protected String doIt() throws Exception {
        // Your logic using the parameters
        return "@Success@";
    }
}
```

---

## 📝 Logging Information

### Using CLogger

Every process inheriting from `SvrProcess` has a `log` instance variable:

```java
@Override
protected String doIt() throws Exception {
    log.info("Starting process...");
    log.warning("This is a warning");
    log.severe("This is an error");
    return "@Success@";
}
```

These logs appear in the console and iDempiere logs (if configured).

### Using addLog() for Process Audit

The `addLog()` methods create entries in the **Process Audit** window, visible to users:

```java
@Override
protected String doIt() throws Exception {
    // Simple log entry
    addLog(getProcessInfo().getAD_Process_ID(),
           new Timestamp(System.currentTimeMillis()),
           new BigDecimal(getProcessInfo().getAD_PInstance_ID()),
           "Processing started");
    
    // Log entry with link to a record
    addLog(getProcessInfo().getAD_Process_ID(),
           new Timestamp(System.currentTimeMillis()),
           new BigDecimal(getProcessInfo().getAD_PInstance_ID()),
           "Processing product: " + product.getName(),
           MProduct.Table_ID,
           product.get_ID());
    
    return "@Success@";
}
```

### Using addBufferLog()

For simpler logging with record links:

```java
addBufferLog(id, date, number, "Message", MProduct.Table_ID, productId);
```

If the table ID and record ID are valid, this creates a clickable link in the process results.

---

## ⚠️ Error Handling

### Returning Status Messages

The `doIt()` method returns a `String` that's shown to the user:

```java
@Override
protected String doIt() throws Exception {
    if (success) {
        return "@Success@";  // Uses message from AD_Message
    } else {
        return "Process completed with warnings";
    }
}
```

### Throwing Exceptions

To stop the process and show an error:

```java
@Override
protected String doIt() throws Exception {
    if (p_M_Product_ID <= 0) {
        throw new AdempiereException("@Invalid@ @M_Product_ID@");
    }
    
    // Your logic here
    
    return "@Success@";
}
```

In the **Process Audit** window:
- **Result = 0** indicates an exception occurred
- **Result = 1** indicates successful completion with your return message

---

## 💬 Interacting with Users

### Asking Yes/No Questions

You can ask users for input during process execution:

```java
@Override
protected String doIt() throws Exception {
    processUI.ask("Do you want to continue?", new Callback<Boolean>() {
        public void onCallback(Boolean result) {
            addLog("You selected " + (result ? "Yes" : "No"));
        }
    });
    
    return null;
}
```

### Asking for String Input

Request text input from the user:

```java
processUI.askForInput("Please enter a value:", new Callback<String>() {
    @Override
    public void onCallback(String result) {
        addLog("You entered: " + result);
    }
});
```

### Blocking Until User Response

Since processes continue running before receiving the answer, you may need to block execution:

```java
final StringBuffer answer = new StringBuffer();
final StringBuffer retVal = new StringBuffer();

processUI.askForInput("Please enter some String", new Callback<String>() {
    @Override
    public void onCallback(String result) {
        addLog("You entered: " + result);
        retVal.append(result);
        answer.append("done");
    }
});

// Wait for user response
while (answer.length() == 0) {
    try {
        Thread.sleep(200);
    } catch (InterruptedException e) {
        // Handle interruption
    }
}

// Now you can use the value in retVal
String userInput = retVal.toString();
```

:::tip Why Two StringBuffers?
We use two separate `StringBuffer` objects because the user input could be empty. Using only one buffer would cause the process to wait forever if the user provides no input.
:::

### Asking for Secret Input (Passwords, PINs)

For sensitive information like passwords or TANs, use `askForSecretInput()` which obfuscates the characters as the user types:

```java
final StringBuffer answer = new StringBuffer();
final StringBuffer retVal = new StringBuffer();

processUI.askForSecretInput("Please enter your password:", new Callback<String>() {
    @Override
    public void onCallback(String result) {
        addLog("Password received");
        retVal.append(result);
        answer.append("done");
    }
});

// Wait for user response
while (answer.length() == 0) {
    try {
        Thread.sleep(200);
    } catch (InterruptedException e) {
        // Handle interruption
    }
}

// Now you can use the password in retVal
String password = retVal.toString();
// Use the password for authentication, etc.
```

:::info
The `askForSecretInput()` method works exactly like `askForInput()`, but displays asterisks or dots instead of the actual characters being typed, providing better security for sensitive data.
:::

**Technical Reference:** [IDEMPIERE-2205](https://idempiere.atlassian.net/browse/IDEMPIERE-2205)

---

## 🧪 Testing Your Process

1. Deploy your plug-in to iDempiere
2. Create a new process record in the **Process** window (`AD_Process`)
3. Set the **Classname** to your process's fully qualified class name
4. Add parameters in the **Process Parameter** tab if needed
5. Run the process from a window, button, or menu
6. Check the **Process Audit** window for results and logs

---

## 📦 Exporting Your Plug-in

Before exporting:

1. Verify `OSGI-INF/` is in `build.properties` under **Binary Build**
2. Ensure all component definition XML files are included
3. Test in a clean iDempiere instance

---

## 🎥 Video Tutorial

Watch this video walkthrough:  
[https://www.youtube.com/watch?v=5SDqnbYrpQc](https://www.youtube.com/watch?v=5SDqnbYrpQc)

---

## 🔗 Related Resources

- [SvrProcess Class](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/compiere/process/SvrProcess.java)
- [IProcessFactory Interface](https://github.com/idempiere/idempiere/blob/master/org.adempiere.base/src/org/adempiere/base/IProcessFactory.java)
- [Process Overview](https://wiki.idempiere.org/en/Process)
- [iDempiere 9 Process Factory](https://idempiere.atlassian.net/browse/IDEMPIERE-4689)
