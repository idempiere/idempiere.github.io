---
sidebar_position: 48
title: "OSGi New Event Handling Annotation"
sidebar_label: "OSGi New Event Handling Annotation"
description: "**Feature:** OSGi New Event Handling Annotation"
tags: [development]
---
**Feature:** OSGi New Event Handling Annotation

**Goal:** Development

**Developer:** Hengsin ([talk](https://wiki.idempiere.org/en/User_talk:Hengsin))

**Description:**
Implement a new thread safe, annotation based osgi event handling mechanism as an alternative to the existing AbstractEventHandler approach.


### **Usage**
To listen to before change of  C_BPartner (MBPartner), create new ModelEventDelegate subclass and use "@BeforeChange" for before change event (method name is insignificant here).

```java
public class MyBpBeforeChangeDelegate extends ModelEventDelegate<MBPartner> {
    public MyBpBeforeChangeDelegate(MBPartner po, Event event) {
	super(po, event);
    }

    @BeforeChange
    public void beforeChange() {
        MBPartner bp = getModel();
        //perform before change actions ...
	Env.setContext(Env.getCtx(), getClass().getName(), bp.toString());
    }
}
```

Developer can use one of the following approach to register the event delegate class:

1. At plugin Activator start method, register the event delegate class.

```java
public void start(BundleContext context) throws Exception {
    ModelEventHandler<MBPartner> handler = new ModelEventHandler<MBPartner>(MBPartner.class, MyBpBeforeChangeDelegate.class, (bp,  event) -> new MyBpBeforeChangeDelegate(bp, event));
    Core.getEventManager().register(handler);
}
```

2. Create an osgi component, at the bind method for the IEventManager service.
```java
public void bindService(IEventManager eventManager) {
    this.eventManager = eventManager;
    this.handler = new ModelEventHandler<MBPartner>(MBPartner.class, MyBpBeforeChangeDelegate.class,
		(po, event) -> new MyBpBeforeChangeDelegate(po, event));
    eventManager.register(handler);
}
```

3. Annotate your class with EventTopicDelegate and one of ModelEventTopic, ImportEventTopic or ProcessEventTopic annotation. Create a new OSGi component that extends the AnnotationBasedEventManager class (with service = &#123;&#125;).
```java
 @EventTopicDelegate
 @ModelEventTopic(modelClass = MInOut.class)
 public class AutoProduceEventDelegate extends ModelEventDelegate<MInOut> {
      ...
      @BeforeComplete
      public void onBeforeComplete() {
          ...
      }
 }
```

### **Event handlers and Event delegates**
1. PO and FactValidate - ModelEventHandler and ModelEventDeleagete
1. Import (I_BPartner, I_Product, etc) -  ImportEventHandler and ImportEventDelegate
1. Process - ProcessEventHandler and ProcessEventDelegate
1. Others - SimpleEventHandler and EventDelegate (and the optional, convenient delegate class of RequestSendEmailEventDelegate and AfterLoginEventDelegate)

### **Annotations**
1. There’s annotattion created for all predefined event delegate (“@AfterLogin”, “@AfterProcess”, “@BeforeComplete”, “@AfterImport”, etc)
1. Model/PO event annotation at org.adempiere.base.event.annotations.po
1. Process event annotation at org.adempiere.base.event.annotations.process
1. Import event annotation at org.adempiere.base.event.annotations.imp
1. Document event annotation at org.adempiere.base.event.annotations.doc
1. Base classes and Other event annotation at org.adempiere.base.event.annotations
1. IDEMPIERE-5019 added EventTopicDelegate, ModelEventTopic, ImportEventTopic and ProcessEventTopic class level annotation.
1. * Event delegate class with EventTopicDelegate annotation will be discovered and register by OSGi Component that extends the AnnotationBasedEventManager class (Doesn't have to provide any service, i.e service = &#123;&#125;).
1. * For core, annotate your event delegate class and place it in the org.adempiere.base.event.delegate package.
1. * ModelEventTopic, ImportEventTopic and ProcessEventTopic annotation is to define the parameter needed for each event type (for e.g, model class for model event type).
1. * Example from org.adempiere.base.event.delegate.AutoProduceEventDelegate:

```java
   @EventTopicDelegate
   @ModelEventTopic(modelClass = MInOut.class)
   public class AutoProduceEventDelegate extends ModelEventDelegate<MInOut> {
      public AutoProduceEventDelegate(MInOut po, Event event) {
         super(po, event);
      }
      @BeforeComplete
      public void onBeforeComplete() {
         MInOut mInOut = getModel();
         if (mInOut.isSOTrx()) {
             String msg = processShipment(mInOut);
             if (msg != null)
                throw new RuntimeException (msg);
         }
      }
      ...
   }
```

**Technical Info:** [IDEMPIERE-4694](https://idempiere.atlassian.net/browse/IDEMPIERE-4694), [IDEMPIERE-5019](https://idempiere.atlassian.net/browse/IDEMPIERE-5019)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF9_OSGi_New_Event_Handling_Annotation)_
