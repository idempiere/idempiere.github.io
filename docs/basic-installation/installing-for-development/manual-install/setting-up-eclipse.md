---
sidebar_position: 3
---

# Setting up Eclipse

## Materialize and Build

On the operating system, navigate to the folder where you cloned the code, named below as `$IDEMPIERE_REPOSITORY` (e.g., `/home/carlos/sources/idempiere`), and run:

```bash
cd $HOME/sources/idempiere
./mvnw verify
```

:::info Disk Space
You need around **5GB** of free disk space to run this step.
:::

This command downloads all libraries on Bundle-ClassPath, builds all projects, and outputs binaries to `org.idempiere.p2/target/products`.

## Setup Workspace in Eclipse

1. Open Eclipse with the workspace pointing to the folder where you cloned the code.
   - Example: `$HOME/sources/idempiere` (just a recommendation, you can use any folder as your workspace)
2. Turn off **Project > Build automatically**
3. Navigate to **Window > Preferences > General > Workspace**
   - Set **Text file encoding** to **UTF-8** (if default is different)
   - Set **New text file line delimiter** to **Unix** (if default is different)
4. (Optional) Switch to Java perspective and choose Working Sets as the Top Level Elements
   - Heng Sin prefers the Plug-in Development perspective for easy access to plugin and target platform state.
5. In **Java > Installed JREs**, add the `java-17-openjdk` JRE if not present and select it as the active JRE:
   - Click **Add**
   - Select **Standard VM**, click **Next**
   - Enter `/usr/lib/jvm/java-17-openjdk-amd64` as JRE Home (or use **Directory...** to find the JRE/JDK 17 root folder), click **Finish**
   - Click the Checkbox next to the new entry to apply changes
6. Navigate to **Window > Preferences > Java > Compiler**
   - Set **Compiler compliance level** to **17**

## Import Projects in Eclipse

1. Navigate to **File > Import**
2. Select **Maven > Existing Maven Projects**
3. Click **Next** and **Browse...** to select the cloned idempiere source folder
   - Example: `$HOME/sources/idempiere`
4. All projects must appear selected, click **Finish** to complete the import
   - At the end, all projects are loaded into the workspace
5. Sometimes Eclipse creates changes to the workspace; you can discard those changes via right-click on the projects and select **Replace With > HEAD Revision**

## Set Target Platform

### Using Downloaded Libraries

1. Open the `org.idempiere.p2.targetplatform.mirror.target` file inside the `org.idempiere.p2.targetplatform` project
2. In **Target Editor**, click **Set as Active Target Platform**
3. Enable back **Project > Build automatically**
4. If there are files with compilation errors, right-click on the iDempiere project and select **Maven > Update Projects**, then press **OK**
5. When everything is good, close the target editor with `org.idempiere.p2.targetplatform.mirror.target`. Keeping it open may cause erratic behavior in Eclipse (especially after restart).

### Downloading Sources Libraries

If you want to have the source code for the target platform downloaded libraries, there is an alternative method.

:::info Source Libraries
This method is slower (depends on your internet speed), and consumes more disk space (around 287MB more at this moment).

The advantage is that you'll have the source code for the target platform contents and everything is set up if you need to debug into the target platform plugin (which is rare anyway).
:::

1. Open the `org.idempiere.p2.targetplatform.target` file inside the `org.idempiere.p2.targetplatform` project
   - This is the default target platform definition with remote URL
   - Eclipse takes some time downloading the required dependencies (how long depends on your internet connection)
2. In **Target Editor**, click **Set as Active Target Platform**
3. Wait for Eclipse to finish downloading bundles onto target platform
   - Click the **Reload** button if some downloads fail, until there are no red errors on the Locations list
4. Enable back **Project > Build automatically**
5. If there are files with compilation errors, right-click on the iDempiere project and select **Maven > Update Projects**, then press **OK**
6. When everything is good, close the target editor with `org.idempiere.p2.targetplatform.target`. Keeping it open may cause erratic behavior in Eclipse (especially after restart).

## Eclipse Version

:::note Minimum Version
The minimum version to run iDempiere is **Eclipse 2024-03**, specifically the **Eclipse IDE for Enterprise Java and Web Developers**.
:::

If you use **Eclipse IDE for Java Developers** instead, you'll find some problems when compiling. To overcome that, install the **m2e PDE - Maven Integration for Eclipse Plugin Development** plugin (check at **Help > About Eclipse IDE > Installation Details > Installed Software** tab). Install it from [https://download.eclipse.org/releases/latest](https://download.eclipse.org/releases/latest) (**Help > Install New Software...**). This plugin sits inside the **General Purpose Tools** category.

## Notes about Target Platform

- If you want to make changes to the target platform, you might want to install the Target Platform DSL Editor from [https://download.eclipse.org/cbi/tpd/3.0.0-SNAPSHOT/](https://download.eclipse.org/cbi/tpd/3.0.0-SNAPSHOT/) (**Help > Install New Software...** and enter the URL into the "Work with:" field). This plugin allows you to generate new `org.idempiere.p2.targetplatform.target` file from `org.idempiere.p2.targetplatform.tpd`. Note that after you have generated a new `org.idempiere.p2.targetplatform.target` file, you need to manually copy the maven locations from `maven.locations.xml` into it.
- If you want to use a local/mirror target platform with the source, you can use my file or create one yourself by following [this guide](https://hieplq.github.io/docs/my-space/idempiere/mirrorTargetPlatform).

---

*This How-To is brought to you by Carlos Ruiz from [BX Service GmbH](https://www.bx-service.com/). Feel free to improve directly or suggest using the Discussion tab.*
