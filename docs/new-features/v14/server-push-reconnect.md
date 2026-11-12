---
sidebar_label: Server Push Reconnect (Atmosphere)
sidebar_position: 8
description: How Atmosphere server push in the ZK Web UI retries after an outage, when it reloads the page, and how to set timeouts behind a proxy.
tags:
  - installation
  - configuration
applies_to: ">=14"
last_reviewed: 2026-11-12
---
# Server Push Reconnect (Atmosphere)

**Goal:** Technical  
**Developer:** [Norbert Bede](https://github.com/norbertbede), [Heng Sin Low](https://github.com/hengsin)  
**Feature Ticket:** [IDEMPIERE-7205](https://idempiere.atlassian.net/browse/IDEMPIERE-7205)  
**Version:** iDempiere 14

## Overview

Before this change, the Atmosphere server push gave up after 3 failed requests within about 1 second and showed a blocking browser alert: "The page or component you request is no longer available. This is normally caused by timeout or rebooting the server." A proxy reload, a short network problem or a load balancer returning 502/503 during a deployment was enough to trigger it, even on the login page.

Now the browser:

- retries with increasing waits, so a short outage passes without the user noticing;
- reloads the page without an alert when the server stays unreachable, so a reverse proxy or load balancer can show its maintenance page;
- stops quietly when the server reports that the session or desktop no longer exists;
- detects a server that accepts connections but never answers.

This page applies only to the Atmosphere implementation (`-Dorg.idempiere.ui.zk.serverpush=atmosphere`). The default WebSocket implementation is not changed. See [Migration notes - iDempiere 14 (technical)](/docs/migration-notes/v14/technical-notes) for how to choose between them.

## How the long poll works

1. The browser sends `POST /webui/zkau/comet` for its desktop.
2. The server holds the request open until it has something to push, or until the push timeout ends (2 minutes by default).
3. The server answers with HTTP 200 in both cases.
4. The browser sends the next request right away.

The browser also has its own timeout: the push timeout plus 30 seconds. It fires only when the server or the network does not answer at all.

## What the browser does with each answer

| Answer | Meaning | Counted as a failure | Next request |
|---|---|---|---|
| HTTP 200 | Push data or normal end of an idle poll | No, the counter goes back to 0 | Right away |
| No answer (network error, status 0) | Server or network unreachable | Yes | After the backoff wait |
| HTTP 5xx (502, 503, 504...) | Proxy or load balancer cannot reach the server | Yes | After the backoff wait |
| Browser timeout (push timeout + 30 s) | Server accepts the connection but does not answer | Yes | After the backoff wait |
| HTTP 400 with header `X-Atmosphere-Error: SessionNotFound` or `DesktopNotFound` | Server is up, but the session or desktop has ended | No | None, server push stops |
| Other HTTP 4xx | Request rejected | Yes | Right away, without a wait |

The backoff wait doubles after each failure: 1, 2, 4 and 8 seconds. After the 5th failure in a row the browser stops polling and loads `index.zul` with a full page request. No alert is shown.

The session error is sent in the `X-Atmosphere-Error` header because the HTTP status text (for example "SessionNotFound") is not available over HTTP/2 and is replaced by some proxies.

## Examples

Short outage, for example a proxy reload of 6 seconds:

| Time | Event |
|---|---|
| 0 s | Proxy starts returning 503 |
| 0 s | Request fails (failure 1), wait 1 s |
| 1 s | Request fails (failure 2), wait 2 s |
| 3 s | Request fails (failure 3), wait 4 s |
| 7 s | Server is back, request succeeds, counter back to 0 |

The user keeps the page and any unsaved input.

Lasting outage, for example a server restart:

| Time | Event |
|---|---|
| 0 s | First failed request, wait 1 s |
| 1 s | Failure 2, wait 2 s |
| 3 s | Failure 3, wait 4 s |
| 7 s | Failure 4, wait 8 s |
| 15 s | Failure 5: the browser loads `index.zul` |

While the server is down, the proxy answers the page request with its maintenance page. A static maintenance page does not return to iDempiere by itself: the user reloads the page, or the maintenance page reloads itself after a short delay (see [Maintenance page](#maintenance-page)). When the server is back, the user gets the login page. The in-memory session is lost after a restart in any case, so waiting longer would not help.

## Session timeout

A real session timeout is handled by ZK, not by the retry logic above. By default the browser shows `timeout.zul`, as set by `timeout-uri` in `WEB-INF/zk.xml`. If `timeout-message` is used instead, `jawwa.atmosphere.sessionTimeout()` still shows the alert with the "SessionTimeoutText" message and then loads `index.zul`.

## Configuration

| Setting | Default | Purpose |
|---|---|---|
| `-Dorg.idempiere.ui.zk.serverpush=atmosphere` | WebSocket | Selects the Atmosphere implementation |
| `-Dfi.jawsy.jawwa.zk.atmosphere.timeout=<milliseconds>` | `120000` | Push timeout: how long the server holds an idle poll |

Add both to "Java Options" when running iDempiere setup, or to `JAVA_OPTIONS` for the Docker image. The push timeout can also be set as a ZK library property in `WEB-INF/zk.xml`. The retry count and the backoff waits are fixed.

## Running behind a reverse proxy or load balancer

### Read timeout

Every proxy between the browser and iDempiere must keep the comet request open longer than the push timeout. Otherwise the proxy ends the idle poll first with 504, which counts as a failure. If this happens on 5 polls in a row, the idle page reloads.

| Component | Setting | Default |
|---|---|---|
| nginx | `proxy_read_timeout` | 60 s |
| Apache httpd (`mod_proxy`) | `ProxyTimeout` | Value of `Timeout`, 60 s |
| AWS Application Load Balancer | `idle_timeout.timeout_seconds` | 60 s |
| AWS CloudFront | Origin response timeout | 30 s |

Either raise the proxy timeout above the push timeout, or lower the push timeout below the smallest proxy timeout in the chain. For example, behind nginx or an Application Load Balancer with default settings (60 s), `-Dfi.jawsy.jawwa.zk.atmosphere.timeout=50000` keeps idle polls below 60 seconds. Behind CloudFront, first raise its origin response timeout above the push timeout, or set the push timeout below 30 seconds, for example `25000`.

:::tip
Leave a margin. If the proxy timeout and the push timeout are equal, the proxy often answers first.
:::

### Maintenance page

After the 5th failure the browser loads `index.zul` with a normal page request, so a maintenance page configured for 502, 503 and 504 is shown to the user. Keep a 5xx status on the maintenance response: a 200 would look like a successful poll.

nginx example:

```nginx
error_page 502 503 504 /maintenance.html;

location = /maintenance.html {
    root /usr/share/nginx/html;
    internal;
}

location /webui/ {
    proxy_pass http://idempiere:8080;
    proxy_read_timeout 180s;
    # also use error_page for 502/503/504 returned by iDempiere itself
    proxy_intercept_errors on;
}
```

To bring users back without a manual reload, the maintenance page can reload itself, for example with `<meta http-equiv="refresh" content="30">`.

On AWS CloudFront, use custom error responses for 502, 503 and 504 that point to the maintenance page and return 503.

## Before and after

| | Before | After |
|---|---|---|
| Failures before giving up | 3, within 1 second | 5, over about 15 seconds |
| Alert on a server outage | Yes, the tab is blocked until OK is clicked | No |
| End state of a lasting outage | `index.zul` after OK | `index.zul` directly, or the proxy maintenance page |
| Session or desktop gone | Detected only from the HTTP status text | Detected from the `X-Atmosphere-Error` header |
| Server not answering | Not detected | Counted after push timeout + 30 s |
| Alert on a real session timeout (`timeout-message`) | Yes | Yes, unchanged |
