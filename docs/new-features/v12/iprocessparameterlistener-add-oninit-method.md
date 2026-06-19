---
sidebar_position: 22
title: "IProcessParameterListener - add onInit method"
sidebar_label: "IProcessParameterListener - add onInit method"
description: "**Developer:**  Nicolas Micoud"
tags: [technical]
---
**Goal:** Technical

**Developer:**  Nicolas Micoud

**Feature Ticket:** [IDEMPIERE-6466](https://idempiere.atlassian.net/browse/IDEMPIERE-6466)

**Sponsor:** [TGI](http://tgi.eu)

**Description:**

Processes are a powerful tool and several improvements were made recently.
One of them is an interface that allow to do stuff when a parameter is changed by user or when the panel is validated.

My requirement was to initialize parameters according to several business logics, and using default values and/or default values based on SQL was not enough.

So I just add a onInit method, which is called when the panel opens.

And now, you can execute some code on initialization, eg:

```java

public void onInit(ProcessParameterPanel parameterPanel) {
```
   parameterPanel.getEditor("Parameter1").setValue("YourDesiredValue1");
   parameterPanel.getEditor("Parameter1").dynamicDisplay(); // if the parameter is mandatory, its label won't be colored in red :)
```
}

```

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_IProcessParameterListener_onInit)_
