---
title: Distributing and Installing Plug-ins in iDempiere
sidebar_label: Distributing Plug-ins
description: Guide to distribute and install plug-ins in iDempiere.
sidebar_position: 3
---

# Distributing and Installing Plug-ins in iDempiere

This guide explains how to distribute and install your plug-ins in iDempiere. Whether you're using a p2 repository or managing bundles manually, this tutorial will help you deploy your plug-ins effectively.

---

## 🎯 Goal

Once your plug-in is ready, you need to distribute and install it in your iDempiere environment. This guide explains the different methods available for deploying plug-ins.

---

## 📦 Distributing Plug-ins

### 📡 Install via p2 Repository (Recommended)

This is the recommended way when you have a p2 repository. 

Navigate to your iDempiere server directory and run:

```bash
cd /opt/idempiere-server
bash update-prd.sh <repository_url> <feature_id>
```

Example:

```bash
bash update-prd.sh https://jenkins.idempiere.org/job/idempiere-rest/ws/com.trekglobal.idempiere.extensions.p2/target/repository/ com.trekglobal.idempiere.rest.api
```

Alternatively, run the install/uninstall steps manually using the `org.eclipse.equinox.launcher` JAR.

:::caution
These commands must be written on a **single line**.
:::

---

### Server / Web UI

To distribute your plug-in, you first need to export it as a JAR file. Follow these steps in Eclipse:

1. Right-click on your project and select **Export > Deployable plug-ins and fragments** and click Next.
2. Choose a directory where the exported file will be saved.
3. In the **Options** tab, select **Package plug-ins as individual JAR archives**.
4. Click **Finish**.

Now you have a JAR file that you can install in your iDempiere installations.

---

## 🔧 Apache Felix Gogo Console (if no p2 repository)

The Apache Felix Gogo Console allows you to manage OSGi bundles directly. To access the console, connect via Telnet:

```bash
telnet localhost 12612
```

### Common Commands

:::info Common OSGi Console Commands
- **`ss`**: Display installed bundles (short status). For example, `ss rest` shows information about plug-ins with "rest" in their name.
- **`install`**: Install a bundle using a URL.
- **`uninstall`**: Uninstall the specified bundle(s).
- **`setbsl`**: Set the start level for the bundle(s).
- **`sta`**: Start the specified bundle(s).
- **`sto`**: Stop the specified bundle(s).
- **`help`**: Display information about a specific command.
:::

### Example Commands

To view bundles related to "rest":

```bash
ss rest
```

To uninstall a bundle:

```bash
uninstall com.trekglobal.idempiere.rest.api
```

To install a bundle from a URL:

```bash
install https://jenkins.idempiere.org/.../com.trekglobal.idempiere.rest.api_0.1.0.202501241521.jar
```

To install a bundle from a local file:

```bash
install file:///tmp/com.trekglobal.idempiere.rest.api_0.1.0.202501241521.jar
```

To set the start level of a bundle:

```bash
setbsl 5 com.trekglobal.idempiere.rest.api
```

To start a bundle:

```bash
sta com.trekglobal.idempiere.rest.api
```

---

## 🌐 Apache Felix Web Console

Visit:

```
https://<your-server>:8443/osgi/system/console/bundles
```

Login as **SuperUser** (or another System Admin).  
Use **Install/Update...**, browse for the `.jar` file, and set:

- **Start Bundle**: ✅
- **Refresh Packages**: ✅
- **Start Level**: `5`

Click **Install or Update**, then verify the bundle is active. Use the "play" button to manually start it if needed.

---

## 🔚 Conclusion

By following this guide, you can distribute and install your plug-ins in iDempiere efficiently. For more advanced topics, explore the other plug-in development guides in this documentation.