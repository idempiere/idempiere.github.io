---
title: Server Push in Plug-ins
sidebar_label: Server Push (ITopicSubscriber)
sidebar_position: 15
description: Learn how to use ServerPushTemplate, IServerPushCallback, and ITopicSubscriber to broadcast real-time messages between iDempiere WebUI sessions.
---

# Server Push in Plug-ins

This tutorial was contributed by Jan Thielemann from evenos GmbH.

## Goal

The goal of this tutorial is to show how to use `ServerPushTemplate`, `IServerPushCallback`, and `ITopicSubscriber` to push changes to other users in real time. This tutorial builds a simple chat dashboard panel to demonstrate the technology.

## Prerequisites

Before you start, review the following tutorials:

- [Developing Plug-Ins Without Affecting the Core](./developing-plugins)
- [Running Plug-ins Locally in iDempiere](./plugin-running-locally)
- [Dashboard Panel Fragments](./plugin-dashboard-panels)

## Full example code

```java
package org.adempiere.webui.dashboard;

import java.util.HashMap;
import java.util.Map;

import org.adempiere.base.Service;
import org.adempiere.webui.apps.AEnv;
import org.adempiere.webui.component.Label;
import org.adempiere.webui.component.Textbox;
import org.adempiere.webui.util.IServerPushCallback;
import org.adempiere.webui.util.ServerPushTemplate;
import org.compiere.util.Env;
import org.idempiere.distributed.IMessageService;
import org.idempiere.distributed.ITopic;
import org.idempiere.distributed.ITopicSubscriber;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.event.EventListener;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zul.Button;
import org.zkoss.zul.Vlayout;

public class DPTest extends DashboardPanel implements EventListener<Event>, ITopicSubscriber<Map<String, String>> {
    private static final long serialVersionUID = 3769375216193585342L;

    static final String ON_OUR_TOPIC = "onOurTopic";
    static final String SOURCE_USER = "SOURCE_USER";
    static final String DESTINATION_USER = "DESTINATION_USER";
    static final String OUR_MSG = "OUR_MSG";

    String current_user = Env.getAD_User_ID(Env.getCtx()) + "";

    Textbox msg = new Textbox();
    Textbox user = new Textbox();
    Label label = new Label("Nothing yet");
    String labeltext;

    IServerPushCallback callback;
    ServerPushTemplate template;

    public DPTest() {
        super();

        this.setSclass("dptest-box");
        this.setHeight("220px");

        Vlayout layout = new Vlayout();
        layout.setParent(this);
        layout.setSclass("broadcaster-layout");
        layout.setSpacing("0px");
        layout.setStyle("height: 100%; width: 100%");

        layout.appendChild(new Label("Message to send:"));
        msg.setParent(layout);

        layout.appendChild(new Label("User:"));
        user.setParent(layout);

        Button btn = new Button("Send");
        btn.addEventListener(Events.ON_CLICK, this);
        layout.appendChild(btn);

        layout.appendChild(new Label("Received Message:"));
        label.setParent(layout);

        IMessageService service = Service.locator().locate(IMessageService.class).getService();
        if (service != null) {
            ITopic<Map<String, String>> intopic = service.getTopic(ON_OUR_TOPIC);
            intopic.subscribe(this);
        }

        this.template = new ServerPushTemplate(AEnv.getDesktop());
        this.callback = new IServerPushCallback() {
            @Override
            public void updateUI() {
                label.setText(labeltext);
            }
        };
    }

    @Override
    public void onEvent(Event event) throws Exception {
        Map<String, String> properties = new HashMap<String, String>();
        properties.put(SOURCE_USER, current_user);
        properties.put(DESTINATION_USER, user.getText());
        properties.put(OUR_MSG, msg.getText());

        IMessageService service = Service.locator().locate(IMessageService.class).getService();
        if (service != null) {
            ITopic<Map<String, String>> itopic = service.getTopic(ON_OUR_TOPIC);
            itopic.publish(properties);
        }
    }

    @Override
    public void onMessage(Map<String, String> message) {
        String dest = message.get(DESTINATION_USER);
        if (dest.equalsIgnoreCase(current_user)) {
            labeltext = "Message from " + message.get(SOURCE_USER) + ": " + message.get(OUR_MSG);
            template.executeAsync(callback);
        }
    }
}
```

## Code walkthrough

### Interfaces

```java
implements EventListener<Event>, ITopicSubscriber<Map<String, String>>
```

`EventListener` handles button clicks. `ITopicSubscriber` receives messages from the OSGi messaging system. Both are implemented directly on the `DashboardPanel` subclass.

### Topic constants

```java
static final String ON_OUR_TOPIC = "onOurTopic";
static final String SOURCE_USER = "SOURCE_USER";
static final String DESTINATION_USER = "DESTINATION_USER";
static final String OUR_MSG = "OUR_MSG";
```

The messaging system works with topics. All subscribers registered for `ON_OUR_TOPIC` receive messages published to it. The message payload is a `Map<String, String>` using the remaining constants as keys.

### Subscribing to a topic

```java
IMessageService service = Service.locator().locate(IMessageService.class).getService();
if (service != null) {
    ITopic<Map<String, String>> intopic = service.getTopic(ON_OUR_TOPIC);
    intopic.subscribe(this);
}
```

After registering, the dashboard panel's `onMessage()` method is called whenever a message arrives on `ON_OUR_TOPIC`.

### Server push callback

```java
this.template = new ServerPushTemplate(AEnv.getDesktop());
this.callback = new IServerPushCallback() {
    @Override
    public void updateUI() {
        label.setText(labeltext);
    }
};
```

Messages may arrive on a non-UI thread. Calling ZK component methods from a non-UI thread causes a `NullPointerException`. `ServerPushTemplate.executeAsync(callback)` runs `updateUI()` on the correct UI thread, making it safe to update the label.

### Sending a message

```java
@Override
public void onEvent(Event event) throws Exception {
    Map<String, String> properties = new HashMap<String, String>();
    properties.put(SOURCE_USER, current_user);
    properties.put(DESTINATION_USER, user.getText());
    properties.put(OUR_MSG, msg.getText());

    IMessageService service = Service.locator().locate(IMessageService.class).getService();
    if (service != null) {
        ITopic<Map<String, String>> itopic = service.getTopic(ON_OUR_TOPIC);
        itopic.publish(properties);
    }
}
```

When the Send button is clicked, the message map is published to `ON_OUR_TOPIC`. Every subscribed dashboard panel — on every logged-in session — receives the message via `onMessage()`.

### Receiving a message

```java
@Override
public void onMessage(Map<String, String> message) {
    String dest = message.get(DESTINATION_USER);
    if (dest.equalsIgnoreCase(current_user)) {
        labeltext = "Message from " + message.get(SOURCE_USER) + ": " + message.get(OUR_MSG);
        template.executeAsync(callback);
    }
}
```

Each dashboard panel checks if it is the intended recipient. If so, it sets `labeltext` (a plain `String` instance variable, safe to write off-thread) and then delegates the UI update to `ServerPushTemplate`.

## How the flow works

1. Two users are both logged in and have the dashboard panel open.
2. Both panels register themselves as `ITopicSubscriber` for `onOurTopic`.
3. User A enters a message and the recipient's `AD_User_ID`, then clicks **Send**.
4. User A's `onEvent()` method publishes a message to the messaging system.
5. The messaging system calls `onMessage()` on both panels.
6. User A's panel sees it is not the destination and does nothing.
7. User B's panel sees it is the destination, sets `labeltext`, and calls `executeAsync`.
8. The UI thread updates User B's label. User B sees the message.

<!-- TODO: missing image: Dptest1.png -->
