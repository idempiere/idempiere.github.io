---
sidebar_position: 27
title: "Use System Configurator from css files"
sidebar_label: "Use System Configurator from css files"
description: "**Developer:**  Nicolas Micoud"
tags: [technical]
---
**Goal:** Technical

**Developer:**  Nicolas Micoud

**Feature Ticket:** [IDEMPIERE-6495](https://idempiere.atlassian.net/browse/IDEMPIERE-6495)

**Sponsor:** [TGI](http://tgi.eu)

**Description:**

Objective of the ticket is to load dynamically some resources such as a background image for the login page.

To make it work, the login.css.dsp file must start with
```css

<%@ taglib uri="http://www.idempiere.org/dsp/web/util" prefix="u" %>

```

in order to be able to use the new function added into idempiere-util.dsp.tld ; and then you can change the content of *.login-window .z-window-content* from your *login.css.dsp* file to something like

```css

.login-window .z-window-content {
```
   background-image: url(../images/$&#123;u:sysConfig("LOGIN_BACKGROUND_IMG", "login_tgi.png")&#125;) !important;
   background-repeat: no-repeat;
   background-position: center;
```
}

```
You also need to create a System Configurator key to store the name of the image.

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_Use_System_Configurator_from_css_files)_
