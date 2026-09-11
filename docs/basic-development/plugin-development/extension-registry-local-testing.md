---
title: Testing an Extension Locally
sidebar_label: Testing Extensions Locally
sidebar_position: 24
description: "Point an iDempiere instance at a local file: extension provider to test the full install, update, disable, and uninstall cycle before publishing."
---

# Testing an Extension Locally

:::info
This applies to iDempiere 14 and later. It documents the new way of distributing plug-ins through the official Extension Registry, alongside the existing manual plug-in distribution described in [Distributing and Installing Plug-ins in iDempiere](./distributing-plugins.md).
:::

Before you open a pull request against the public [iDempiere Extension Repository](https://github.com/idempiere/idempiere-extension-repository), you should verify that your extension actually installs. This guide shows how to point an iDempiere instance at a local folder acting as an extension provider, so you can run the complete install, update, disable, and uninstall cycle without publishing anything.

[iDempiere Extension Management](../../new-features/v14/extension-management.md) already mentions that you can point `IDEMPIERE_EXTENSION_REPOSITORY` at a `file:///path/to/...` folder for local development. This guide covers the full mechanics: what that folder needs to contain, how to point iDempiere at it, and what to check once it is installed. No web server, no GitHub account, no network access required.

:::warning Test against a vanilla instance
The registry requires that an extension install and work on an unmodified official iDempiere release: no patched core, no manual pre-steps, no undeclared prerequisites. See [Must install on vanilla iDempiere](./extension-registry-contributing.md#must-install-on-vanilla-idempiere). Your day-to-day development instance is usually not vanilla: it has your other plug-ins, your tenant data, and roles and configuration you set up months ago. An extension that installs there and nowhere else is the most common reason a submission is sent back. See [The vanilla check](#the-vanilla-check) below.
:::

## What an extension provider is

It is a plain directory (or Git repository) containing:

* `index.json` at the root, the catalog the Extension Management form reads on open.
* An `extensions/` tree holding one `metadata.json` per published version, plus the human-readable `info.md` and `CHANGELOG.md`.

There is no p2 update site, no OBR, and no server component. iDempiere fetches these files with a plain HTTP client, or, when the configured URL starts with `file:`, straight off the disk.

## Create the local provider

```bash
export REG=$HOME/idempiere-local-registry
mkdir -p "$REG/extensions/com.example.demo/1.0.0" "$REG/jars"
```

Target layout:

```
$HOME/idempiere-local-registry/
├── index.json
├── jars/
│   └── com.example.demo_1.0.0.jar
└── extensions/
    └── com.example.demo/
        ├── info.md
        ├── CHANGELOG.md
        ├── assets/
        └── 1.0.0/
            └── metadata.json
```

The `extensions/` and `jars/` names are conventions; only `index.json`'s position at the root is fixed. Everything else is reached through the absolute URLs you write into `index.json`.

### index.json

:::warning Use the versions shape, not the one in index-schema.json
`index-schema.json` describes each entry as a complete metadata object, including `bundles`. That form does work: `onSelectExtension` checks `isFullMetadata()` (does the entry have `bundles`?) and renders directly if so. But it is not what the registry actually publishes, and it gives you a single version with no lazy loading.

What the official `scripts/generate_index.py` emits, and what `ExtensionBrowserFormController.java:240` is written for, is a stub entry plus a `versions` array of `{version, metadataUrl}`; the full metadata is fetched on selection. The schema documents neither `versions` nor `metadataUrl`. Use the shape below. It is the one the registry uses, and the only one that supports multiple versions.

An entry with neither `bundles` nor `versions` is the broken case: it lists, but installing fails with `NoBundlesInExtensionMetadata`.
:::

```json
{
  "generatedAt": "2026-09-08T10:00:00Z",
  "extensions": [
    {
      "id": "com.example.demo",
      "name": "Demo Extension",
      "description": "Short description shown in the extension list.",
      "categories": ["Demo"],
      "tags": ["conference", "demo"],
      "entityType": "XDEMO",
      "infoUrl": "file:/home/you/idempiere-local-registry/extensions/com.example.demo/info.md",
      "changeLogUrl": "file:/home/you/idempiere-local-registry/extensions/com.example.demo/CHANGELOG.md",
      "versions": [
        {
          "version": "1.0.0",
          "metadataUrl": "file:/home/you/idempiere-local-registry/extensions/com.example.demo/1.0.0/metadata.json"
        }
      ]
    }
  ]
}
```

Notes:

* Replace `/home/you` with your real absolute path. `file:` URLs must be absolute.
* Only `id` is structurally mandatory for an index entry; `name`, `description`, `categories`, and `tags` drive the list rendering and the filter box (`tag:` and `category:` prefixes).
* `versions[0]` is the entry loaded when the user clicks the item. The official indexer sorts newest-first, so put your newest version first.
* A `versions` array with more than one element is what makes the version dropdown appear in the sidebar (`ExtensionBrowserFormController.java:383`). With a single version, the field is rendered as plain text, useful to know when you are demoing multi-version support.

### extensions/com.example.demo/1.0.0/metadata.json

```json
{
  "id": "com.example.demo",
  "version": "1.0.0",
  "idempiereVersion": "14",
  "releaseDate": "2026-09-08",
  "name": "Demo Extension",
  "description": "Short description of this specific version.",
  "categories": ["Demo"],
  "tags": ["conference", "demo"],
  "entityType": "XDEMO",
  "bundles": [
    {
      "symbolicName": "com.example.demo",
      "downloadUrl": "file:/home/you/idempiere-local-registry/jars/com.example.demo_1.0.0.jar",
      "sha256": "put-the-real-hash-here"
    }
  ],
  "dependencies": []
}
```

Compute the hash with `sha256sum jars/com.example.demo_1.0.0.jar | cut -d' ' -f1`. `sha256` is optional, but including it locally lets you exercise the integrity check.

### info.md and CHANGELOG.md

`info.md` is rendered as the **Details** tab, `CHANGELOG.md` as the **Changelog** tab. Both are Markdown, converted through `Core.getMarkdownRenderer()` and then sanitised with `AEnv.sanitize()` (an OWASP HTML sanitiser: blocks, formatting, images, links, styles, tables). Scripts and unknown tags are stripped, so do not rely on raw HTML.

Use the section structure reviewers expect: Summary, Features, Compatibility, Database Changes, Usage & Configuration, Author/Support. See [The info.md file](./extension-registry-contributing.md#the-infomd-file) for the full template.

If a tab is missing at runtime, the corresponding `*Url` key is absent from your index entry. Both tabs are driven by `infoUrl` and `changeLogUrl`, which live in `index.json`, not in `metadata.json`.

## Build the jar under test

Nothing special is required. Build the plug-in the way you always do:

* Maven/Tycho: the standard `eclipse-plugin` packaging, take the jar from `target/`. See [Building iDempiere Plug-ins with Maven](./plugin-maven-build.md).
* Eclipse: File → Export → Plug-in Development → Deployable plug-ins and fragments.

Copy the result into `$REG/jars/`.

Two things the extension manager cares about inside the jar:

* **`Bundle-SymbolicName`** must equal the `symbolicName` in your metadata. The manager matches installed bundles by symbolic name for update, enable, disable, and uninstall. A mismatch means your extension installs but can never be managed afterwards.
* **`META-INF/2Pack_<version>.zip`**, if you ship dictionary content. After starting the bundle, `installExtension()` looks for it with `bundle.findEntries("META-INF", "2Pack_*.zip", false)` (`ExtensionBrowserService.java:932`) and, when found, reports that the import is running in the background. The actual import is performed by `Incremental2PackActivator` from `org.adempiere.plugin.utils`, exactly as for a manually deployed plug-in.

## Point iDempiere at the local provider

The setting is the `IDEMPIERE_EXTENSION_REPOSITORY` system property, falling back to the environment variable of the same name:

```java
// org.adempiere.base/src/org/compiere/model/SystemProperties.java:337
public static String getIDempiereRepositoryUrl() {
    String repositoryUrl = System.getProperty(IDEMPIERE_EXTENSION_REPOSITORY);
    if (Util.isEmpty(repositoryUrl, true))
        repositoryUrl = System.getenv(IDEMPIERE_EXTENSION_REPOSITORY);
    return repositoryUrl;
}
```

It is not an `AD_SysConfig` record and cannot be changed from inside the application. It is read from the JVM, so changing it requires a restart.

### Option A: Eclipse or development workspace

Edit the `VM_ARGUMENTS` attribute of your launch configuration and replace the shipped default:

```
-DIDEMPIERE_EXTENSION_REPOSITORY=https://github.com/idempiere/idempiere-extension-repository
```

with

```
-DIDEMPIERE_EXTENSION_REPOSITORY=file:/home/you/idempiere-local-registry
```

Launch configurations that carry the default:

* `org.adempiere.server-feature/server.product.launch`
* `org.idempiere.p2.profile/core/core.product.launch`
* `org.idempiere.p2.profile/extended/extended.product.launch`

The same value also lives in the corresponding `*.product` files, which is what ends up in a built distribution.

### Option B: installed server

`idempiere-server.sh` honours an existing environment value and forwards it as a `-D`:

```bash
# idempiere-server.sh:30
IDEMPIERE_EXTENSION_REPOSITORY=${IDEMPIERE_EXTENSION_REPOSITORY:-https://github.com/idempiere/idempiere-extension-repository}
# idempiere-server.sh:43
-DIDEMPIERE_EXTENSION_REPOSITORY=$IDEMPIERE_EXTENSION_REPOSITORY
```

So it is enough to export it before starting:

```bash
export IDEMPIERE_EXTENSION_REPOSITORY=file:$HOME/idempiere-local-registry
./idempiere-server.sh
```

`idempiere-server.bat` does the same on Windows (`:15-16`, `:37`).

### Option C: ad hoc

```bash
export IDEMPIERE_JAVA_OPTIONS="$IDEMPIERE_JAVA_OPTIONS -DIDEMPIERE_EXTENSION_REPOSITORY=file:$HOME/idempiere-local-registry"
```

## Two file: rules that will bite you

**No `/main/` segment is inserted for `file:` URLs.**

```java
// ExtensionBrowserService.java:178
public String toRawGithubURL(String repoUrl, String relativePath) {
    if (repoUrl.startsWith("file:")) {
        return repoUrl.endsWith("/") ? repoUrl + relativePath : repoUrl + "/" + relativePath;
    }
    if (repoUrl.contains("github.com"))
        repoUrl = repoUrl.replace("github.com", "raw.githubusercontent.com");
    return repoUrl.endsWith("/") ? repoUrl + "main/" + relativePath : repoUrl + "/main/" + relativePath;
}
```

For any non-`file:` URL, the branch segment `main/` is appended. A GitHub repo URL becomes `raw.githubusercontent.com/<owner>/<repo>/main/index.json`. For `file:`, the path is used verbatim, so your index must sit at exactly `<repoUrl>/index.json`.

**`file:` downloads are refused unless the repository URL is also `file:`.**

```java
// ExtensionBrowserService.java:1002
private void validateFileURL(String downloadUrl) {
    String repoUrl = SystemProperties.getIDempiereRepositoryUrl();
    if (!repoUrl.startsWith("file:"))
        throw new AdempiereException("Local file download not supported when iDempiere repository is remote.");
}
```

You cannot mix a remote catalog with local jars. Either the whole provider is local, or none of it is.

:::note
This method dereferences `repoUrl` without a null check. If the property is unset entirely, you get a `NullPointerException` rather than the friendlier "iDempiere extension repository URL is not set" message.
:::

## Run the install

1. Log in as System Administrator.
2. Open the Extension Management form (search the menu for "Extension").
3. The Extension Repository tab lists whatever `index.json` contains. If it shows a red error line instead, the message is the fetch failure. Check the path and the two rules above.
4. Select your extension. The Details and Changelog tabs render, and the sidebar shows ID, version, required iDempiere version, release date, database requirements, categories, and tags.
5. Click Install. Progress is streamed to the process dialog: downloading, installing, starting, and, if a 2Pack was found, importing data in the background.
6. Switch to Installed Extensions, or click Registry to zoom into the Extension Registry window and inspect the `AD_Extension` row and its `AD_ExtensionEntity` children.

## Test matrix

Run these before opening a PR. Each row is a small edit to your local metadata plus one click.

| # | Scenario | How to trigger | Expected result |
|---|---|---|---|
| 1 | Fresh install | Install | Bundles installed and started; `AD_Extension.ExtensionState = 'IN'` |
| 2 | 2Pack import | Ship `META-INF/2Pack_1.0.0.zip` in the jar | Broadcast message on start and finish; `AD_ExtensionEntity` rows created for every imported record |
| 3 | Update | Add `2.0.0/metadata.json` and a `versions[]` entry, reopen the form | Button label becomes Update; installing replaces the bundle |
| 4 | Stale-bundle guard | Delete the `AD_Extension` row but leave the bundle running, then Install | `ExtensionBundleNewerVersionInstalled`, see the note below the table |
| 5 | iDempiere version gate | Set `"idempiereVersion": "[99,100)"` | `IncompatibleIDempiereVersion` |
| 6 | Missing dependency | Add `"dependencies": [{"id":"com.example.absent","version":"1.0.0"}]` | `MissingDependency`, "Missing dependency: {0}. Please install it first" |
| 7 | Dependency version | Depend on an installed extension with a range it does not satisfy | `IncompatibleDependencyVersion` |
| 8 | Database requirement | `"database": [{"id":"postgresql","extensions":["nonexistent"]}]` | `DatabaseExtensionNotFound` |
| 9 | Database version | `"database": [{"id":"postgresql","version":"99.0.0"}]` | `DatabaseVersionTooOld` |
| 10 | Checksum | Corrupt one character of `sha256` | `BundleSHA256HashNotMatch`; the temp file is deleted and nothing is installed |
| 11 | Missing download URL | Remove `downloadUrl` from a bundle | `BundleNoDownloadURL` |
| 12 | Disable | Disable | Bundles stopped; every `AD_ExtensionEntity` target gets `IsActive='N'`; state `DI` |
| 13 | Enable | Enable | Bundles started; targets back to `IsActive='Y'`; state `IN`; cache reset |
| 14 | Uninstall | Uninstall | Entities deactivated, bundles uninstalled, state `UN` |
| 15 | Uninstall blocked | Install B depending on A, then uninstall A | `ExtensionHasDependents`, "Cannot uninstall extension {0} because the following extensions depend on it: {1}" |
| 16 | Bundled protection | Select a core extension (for example `org.idempiere.acct`) | Uninstall and Download disabled, tooltip `CannotUninstallBundledExtension` |
| 17 | .idext export | Download (.idext) | Zip containing `metadata.json`, `info.md`, `CHANGELOG.md`, `assets/*`, `bundles/*.jar` |
| 18 | Filtering | Type `tag:demo` or `category:Demo` in the filter box | Only matching entries listed |
| 19 | Vanilla install | Repeat rows 1 and 2 on a fresh, unmodified iDempiere, see [The vanilla check](#the-vanilla-check) | Installs and functions with no manual pre-steps |

Rows 5 to 9 are the validation gates that also run inside the `InstallExtension` process, so they behave identically whether triggered from the form or from the Extension Registry window's toolbar button.

:::note Row 4 needs explaining
It is the one piece of behaviour that is not obvious from the metadata. `prepareInstall` (`ExtensionBrowserService.java:648`) compares the installed OSGi bundle's version against a `version` field on the bundle entry in your metadata:

```java
Version newVersion = Version.parseVersion(b.has("version") ? b.get("version").getAsString() : "0.0.0");
...
if (currentVersion != null && currentVersion.compareTo(newVersion) > 0)
    throw new IllegalStateException(... "ExtensionBundleNewerVersionInstalled" ...);
```

That `bundles[].version` field appears in neither `metadata-schema.json` nor `ExtensionMetadataValidator`. When it is absent it defaults to `0.0.0`, so any already-installed bundle of the same symbolic name with a real version trips the guard.

In normal use you never see it, for two reasons: `prepareInstall` runs only from the form's Install path (launching the `InstallExtension` process directly from the Extension Registry window skips it), and Update calls `uninstallBundles` before `prepareInstall`, so there is nothing left to compare against. You hit it when a bundle is present in the runtime but the registry row is not, exactly the situation the SQL cleanup in [Resetting between runs](#resetting-between-runs) creates. Remove the bundle from the OSGi console as well and the install proceeds.
:::

### The vanilla check

The registry requires that your extension install and work on an unmodified official iDempiere release. Your development instance almost certainly is not one, so this needs a separate run.

Set up a clean target:

1. Install an official release of the iDempiere version your `idempiereVersion` range claims, not your workspace build, not a fork, no patches.
2. Create a fresh database from the released seed. Do not restore a snapshot of your development database.
3. Add nothing to `plugins/` beyond what ships. If your extension needs another extension, install that one through the form first, and declare it in `dependencies[]`.
4. Point it at your local provider and install.

Then confirm, as a user who has never seen your plug-in would:

- [ ] Install completes from the form alone, no shell commands, no SQL, no config file edits.
- [ ] The 2Pack imports cleanly against the fresh seed, with no errors in `AD_Package_Imp_Detail`.
- [ ] New menus, windows, and fields are reachable by a role a fresh install actually has.
- [ ] The feature works without tenant data, roles, or configuration you set up by hand elsewhere.
- [ ] Disable, Enable, and Uninstall all behave (rows 12 to 14) on this instance too.

Anything that needs a manual step belongs in the **Usage & Configuration** section of your `info.md`, and anything that needs another extension belongs in `dependencies[]`. If it needs a core change, it is not eligible for the registry as it stands. That change has to land in iDempiere first.

The cheapest way to keep this repeatable is a container or VM snapshot taken immediately after the clean install, restored before each run. It doubles as the reset mechanism in [Resetting between runs](#resetting-between-runs).

## Diagnosing a failed demo

Every user-visible failure is an `AD_Message`. Look the value up here:

| Message value | Meaning | Raised by |
|---|---|---|
| `ExtensionRepositoryNotSet` | `IDEMPIERE_EXTENSION_REPOSITORY` is empty | `fetchRepositoryExtensions()` |
| `ErrorLoadingExtensions` | `index.json` could not be fetched or parsed | `loadRepositoryExtensions()` |
| `HttpFetchFailed` | Non-200 response for index, metadata, info, or jar | `fetchBytes` / `streamTo` |
| `IncompatibleIDempiereVersion` | `idempiereVersion` range excludes this build | `validateIDempiereVersion` |
| `MissingDependency` / `IncompatibleDependencyVersion` | Dependency absent or out of range | `validateDependencies` |
| `DatabaseTypeNotSupported` / `DatabaseVersionTooOld` / `DatabaseExtensionNotFound` | `database[]` requirement unmet | `validateDatabaseRequirement` |
| `ExtensionAlreadyInstalling` | A previous run left the row in state `IP` | `prepareInstall` |
| `ExtensionBundleNewerVersionInstalled` | Downgrade attempt | `prepareInstall` |
| `BundleNoDownloadURL` / `BundleSHA256HashNotMatch` | Bad bundle entry | `installExtension` |
| `NoBundlesInExtensionMetadata` / `ExtensionMetadataMissingRequiredFields` | Metadata incomplete | `InstallExtension` process |
| `ExtensionHasDependents` | Another extension depends on this one | `validateNoDependentExtensions` |
| `CannotUninstallBundledExtension` | `IsBundled='Y'` | `updateButtons` |
| `BundleContextNotFound` | The extension manager bundle is not active | `InstallExtension` process |

"Metadata Validation Error: ..." (not an `AD_Message`) comes from `ExtensionMetadataValidator` and lists every schema problem at once. It runs both when metadata is fetched and as a model event on `AD_Extension` insert/update, so a hand-edited registry row is validated too.

## Resetting between runs

Normally: Uninstall from the form, then re-install.

If a run left the row stuck in `IP` (Installing) or `ER` (Error), for instance because the server was killed mid-install, clear it manually:

```sql
-- inspect first
SELECT AD_Extension_ID, ExtensionId, ExtensionVersion, ExtensionState, IsBundled
FROM   AD_Extension
WHERE  IsBundled = 'N';

-- then remove your test extension
DELETE FROM AD_ExtensionEntity
 WHERE AD_Extension_ID IN (SELECT AD_Extension_ID FROM AD_Extension
                            WHERE ExtensionId = 'com.example.demo');
DELETE FROM AD_Extension WHERE ExtensionId = 'com.example.demo';
```

:::danger Never delete IsBundled='Y' rows
Those are the core extensions seeded by migration (`org.idempiere.acct`, `org.adempiere.replication`, `org.adempiere.payment.processor`, `org.idempiere.webservices`).
:::

The OSGi bundle survives the SQL delete. Remove it from the console:

```
osgi> ss com.example.demo
osgi> stop <id>
osgi> uninstall <id>
```

Dictionary records already imported by a 2Pack are not removed by uninstall. Uninstall deactivates the recorded `AD_ExtensionEntity` targets, it does not roll the pack-in back. For a truly clean slate, restore a database snapshot taken before the first install. Taking that snapshot before a live demo is strongly recommended.

## Going public

Once the matrix passes, the provider layout you just built is almost the layout of the public registry. Two differences matter when you submit:

* `index.json` is generated, not hand-written. CI regenerates it from the version folders on every merge, so your PR must not touch it.
* You do not supply the jar. In your local provider, `downloadUrl` points at a jar you built. In the registry, it points at an artifact the iDempiere project builds from your public source; the project does not ship contributor-supplied binaries. What you submit is the source repository and a commit or tag.

Which means the local jar you have been testing is a stand-in for the project's build. Make sure your build works from a clean checkout with no local state, or the project's build of it will not match what you tested.

Beyond the mechanics there is an eligibility bar: open source only, a project-built jar from a project that builds with Maven, automated analysis, vanilla install, and a curated initial contributor set. All of it is in [Acceptance policy](./extension-registry-contributing.md#acceptance-policy). Read it before you spend effort on a submission.

## Related reading

* [Contributing an Extension to the Registry](./extension-registry-contributing.md), publishing to the official registry.
* [Extension Registry Worked Example](./extension-registry-worked-example.md), a full submission from start to finish.
