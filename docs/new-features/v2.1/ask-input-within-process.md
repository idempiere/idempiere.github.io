---
sidebar_position: 30
title: "Ask Input Within Process"
sidebar_label: "Ask Input Within Process"
description: "_String input in Swing_"
tags: [technical]
---
![Prozess3](pathname:///img/new-features/v2.1/Prozess3.jpg)

_String input in Swing_

**Goal:** Development

**Developer:** Jan Thielemann

**Technical Info:** [IDEMPIERE-1773](http://idempiere.atlassian.net/browse/IDEMPIERE-1773)

**Description:**

When running a process from the GUI, you now have two methods to interact with the user. In the SvrProcess subclass you can call the processUI to ask for boolean or String inputs. Here is an example of how to use the askForInput() method:
```

 final StringBuffer string = new StringBuffer();
 final StringBuffer stringcaptured = new StringBuffer();
 processUI.askForInput("Please enter a String:", new Callback<String>() {
	@Override
	public void onCallback(String result) {
		addLog("You entered: " + result);
		string.append(result);
		stringcaptured.append("true");
	}
 });
 int timeoutInSeconds = 5;
 int sleepms = 200;
 int maxcycles = timeoutInSeconds * 1000 / sleepms;
 int cycles = 0;
 while (stringcaptured.length() == 0) {
	try {
		Thread.sleep(sleepms);
	} catch (InterruptedException e) {}
	cycles++;
	if (cycles > maxcycles)
		throw new AdempiereUserError("Timeout waiting for user answer");
}
 String userinput = string.toString();

```

Notice that we have to use final objects so they can be used in the callback. Using a StringBuffer is a good idea here. Also notice that we implemented a timeout because a process produces a lot of locks.
![AksForInput2](pathname:///img/new-features/v2.1/AksForInput2.jpg)

_String input in WebUI_
![AksForInput3](pathname:///img/new-features/v2.1/AksForInput3.jpg)

_Parameters read during the process and logged with addLog()_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Ask_Input_Within_Process)_
