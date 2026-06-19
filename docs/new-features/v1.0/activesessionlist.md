---
sidebar_position: 50
title: "Active Login Session List"
sidebar_label: "Active Login Session List"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [technical]
---
**Goal:** Technical

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**External Credits:**

**Description:**

- Administrator can monitor list of session which is currently active and also get information about current session like
    - 	Organization name
    - 	User name
    - 	Login role of user
    - 	Remote address
    - 	Client name
    - 	Server on which user login
Below image shows Active session window for one of  current  session .

![Active session List](pathname:///img/new-features/v1.0/Active_session_List.png)

- Administrator can filter list of active session using Lookup fields like
    - 	Client Name
    - 	Organization Name
    - 	User Name
    - 	Login Role
    - 	Server Name
Below image show look up window with default lookup fields

![Look up snap](pathname:///img/new-features/v1.0/Look_up-snap.jpg)

- System administrator can kill the active session in two ways,
    - Kill active session : Admin can kill any specific user on the ‘Active Sessions’ window.
    - Kill all session : Admin can kill all session those are currently active on the same server.

![killSession menu](pathname:///img/new-features/v1.0/killSession_menu.png)

- System administrator can set the timeout value before killing the session.

![killSession popup](pathname:///img/new-features/v1.0/killSession_popup.png)

- Once session time out initiated, based on the timeout value, an alert window with countdown timer will be displayed to the user whose session is going to be expired.

![killsession timeout panel](pathname:///img/new-features/v1.0/killsession_timeout_panel.png)

**Technical Info:** [IDEMPIERE-293](http://idempiere.atlassian.net/browse/IDEMPIERE-293)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_ActiveSessionList)_
