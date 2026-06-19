---
sidebar_position: 6
title: "Ask For Secret Input Within Process"
sidebar_label: "Ask For Secret Input Within Process"
description: "**Goal:** UX - Security - Development"
tags: [functional]
---
![SecretInputGif](pathname:///img/new-features/v10/SecretInputGif.gif)

**Goal:** UX - Security - Development

**Developer:** Diego Ruiz - [BX Service GmbH](https://www.bx-service.com/)

**Technical Info:** [IDEMPIERE-2205](https://idempiere.atlassian.net/browse/IDEMPIERE-2205)

**Description:**

In iDempiere 2.1, the functionality to [ask the user for input within a process](https://wiki.idempiere.org/en/NF2.1_Ask_Input_Within_Process) was added. This development extends that feature and allows the system to ask for a secret input (f.i. A password or a TAN), obfuscating the characters that the user types in.

The way to use this is the same as before, with the slight difference that you need to call the askForSecretInput method instead.

Here is an example of how to use the askForSecretInput() method:
```java
```
		final StringBuffer answer = new StringBuffer();
```
		final StringBuffer retVal = new StringBuffer();
		processUI.askForSecretInput("Please enter some String", new Callback<String>() {
			@Override
			public void onCallback(String result) {
				addLog("You entered: " + result);
				retVal.append(result);
				answer.append("done");
			}
		});
```

![Secret input dialog within a process](pathname:///img/new-features/v10/Secret_input_dialog_within_a_process.jpg)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Ask_For_Secret_Input_Within_Process)_
