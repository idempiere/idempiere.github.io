---
title: Simplify Plug-in Development with DS Annotations
sidebar_label: Service Annotations
sidebar_position: 4
description: Learn how to use OSGi Declarative Service annotations to simplify plug-in development in iDempiere.
---

# Ditch XML: Declare Service Annotations and Simplify Plug-in Development

This guide explains how to use **OSGi Declarative Service (DS) annotations** to simplify plug-in development by eliminating the need for XML configuration. By leveraging DS annotations, you can optimize your development process and improve maintainability.

---

## 📖 Reference Links

- [Improvements in Declarative Services from Eclipse Oxygen](https://www.eclipse.org/eclipse/news/4.7/platform.php#ds-annotations)
- [OSGi Declarative Services Annotations Documentation](https://docs.osgi.org/specification/osgi.cmpn/7.0.0/service.component.html)
- [Vogella Blog on OSGi Declarative Services](https://www.vogella.com/tutorials/OSGiServices/article.html)

Eclipse has also modified the Felix SCR (Service Component Runtime) to make the API documentation more precise. You can find additional details in the [Eclipse documentation](https://www.eclipse.org/).

---

## 🛠️ How to Use DS Annotations

### 1. Eclipse Version

Ensure you are using **Eclipse Oxygen** or a newer version.

### 2. Configure Eclipse for DS Annotations

Set up Eclipse to support DS annotations:

1. Go to `Window > Preferences > Plug-in Development > DS Annotations`.
2. Configure the settings as shown in the image below:

![Eclipse DS Annotation Configuration](/img/docs/basic-installation/DSAConfiguration.png)

### 3. Update Your Plug-in Manifest

Add the following package to the `Import-Package` section of your plug-in's `MANIFEST.MF` file:

```
org.osgi.service.component.annotations
```

---

## Service Factory

For factory classes, add an annotation like the one below:

### Sample Code

```java
@Component(
    property = {"service.ranking:Integer=2"},
    service = org.adempiere.base.IProcessFactory.class
)
public class JRProcessFactory implements IProcessFactory {
    // Implementation here
}
```

:::info
- You don't need to declare a service if you directly implement a service interface like `IProcessFactory`.
- For array properties, repeat the property name for each value.
:::

---

## Event Handler

For event handler classes that extend from `AbstractEventHandler`, add an annotation like the one below:

### Sample Code

```java
@Component(
    reference = @Reference(
        name = "IEventManager",
        bind = "bindEventManager",
        unbind = "unbindEventManager",
        policy = ReferencePolicy.STATIC,
        cardinality = ReferenceCardinality.MANDATORY,
        service = IEventManager.class
    )
)
public class SampleEventHandler extends AbstractEventHandler {
    // Implementation here
}
```

---

By using DS annotations, you can eliminate the need for XML configuration, making your plug-in development process faster and more efficient.