---
sidebar_label: AD_Window Toolbar Factory
sidebar_position: 2
description: OSGi extension point to provide a custom toolbar for the AD_Window (classic window) without forking the core.
tags: [development]
---
# OSGi AD_Window Toolbar Factory

* **Goal:** Development
* **Developer:** [muriloht](https://github.com/muriloht)
* **Feature Ticket:** [IDEMPIERE-2809](https://idempiere.atlassian.net/browse/IDEMPIERE-2809)

## Description

Adds the `IADWindowToolbarFactory` OSGi service so a theme or plugin can replace the
toolbar used by the classic AD_Window (`AbstractADWindowContent`) without forking the
core.

`AbstractADWindowContent` now obtains its toolbar through
`Extensions.getADWindowToolbar(...)`, which queries the registered
`IADWindowToolbarFactory` services and uses the first non-null toolbar returned. The
core ships `DefaultADWindowToolbarFactory`, registered at `service.ranking=-1`, which
returns the standard `ADWindowToolbar`.

When no custom factory is registered, behavior is identical to previous releases: the
default factory always supplies the standard toolbar.

## Usage

Register an OSGi component implementing `IADWindowToolbarFactory`:

```java title="src/com/example/ui/MyADWindowToolbarFactory.java"
package com.example.ui;

import org.adempiere.webui.adwindow.ADWindowToolbar;
import org.adempiere.webui.adwindow.AbstractADWindowContent;
import org.adempiere.webui.factory.IADWindowToolbarFactory;
import org.osgi.service.component.annotations.Component;

@Component(service = IADWindowToolbarFactory.class)
public class MyADWindowToolbarFactory implements IADWindowToolbarFactory {

    @Override
    public ADWindowToolbar create(AbstractADWindowContent windowContent, int windowNo) {
        return new MyADWindowToolbar(windowContent, windowNo);
    }
}
```

`MyADWindowToolbar` is your own subclass of `ADWindowToolbar`.

Notes:

- Return `null` from `create(...)` to defer to the next registered factory (or the
  default). This lets a factory customize only specific windows and fall back for the
  rest.
- A custom factory registered at the default service ranking (`0`) or higher takes
  precedence over `DefaultADWindowToolbarFactory` (`-1`). Use a higher explicit ranking
  if several custom factories compete.

**Technical Info:** [IDEMPIERE-2809](https://idempiere.atlassian.net/browse/IDEMPIERE-2809)
