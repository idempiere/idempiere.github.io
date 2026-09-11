---
title: Extension Registry Worked Example
sidebar_label: Extension Registry Worked Example
sidebar_position: 25
description: A real plug-in submitted to the Extension Registry from start to finish, including the mistakes and open items it surfaced.
---

# Extension Registry Worked Example

:::info
This applies to iDempiere 14 and later. It documents the new way of distributing plug-ins through the official Extension Registry, alongside the existing manual plug-in distribution described in [Distributing and Installing Plug-ins in iDempiere](./distributing-plugins.md).
:::

The other guides in this section describe the process. This one follows it end to end with a real plug-in, and records every command and every decision, including the ones that turned out to be wrong.

The subject is BX Service's Document Status Validator ([source](https://github.com/bxservice/de.bxservice.docstatusvalidator)): small enough to follow, but with a real incremental 2Pack, real dictionary content, and real end-user documentation. It was not in the registry when this was written.

Two phases, in order:

1. Prove it installs from a local `file:` provider on a development instance.
2. Prepare the submission to the official registry.

Phase 1 is where the work is. If an extension does not install from a local provider, no amount of metadata polish will make it install from the registry.

:::note
This walkthrough builds on [Contributing an Extension to the Registry](./extension-registry-contributing.md) for the rules and [Testing an Extension Locally](./extension-registry-local-testing.md) for the mechanics. It does not repeat them in full.
:::

## Learn what you are actually shipping

Most bad submissions are bad because the contributor guessed at values that are sitting in the jar. Read them out instead. Everything the metadata needs is derivable in three commands.

### The manifest

```bash
JAR=/path/to/de.bxservice.docstatusvalidator_1.0.1.202609091909.jar
unzip -p "$JAR" META-INF/MANIFEST.MF
```

```
Bundle-Name: BXS_DocStatusValidator
Bundle-SymbolicName: de.bxservice.docstatusvalidator
Bundle-Version: 1.0.1.202609091909
Bundle-RequiredExecutionEnvironment: JavaSE-17
Require-Bundle: org.adempiere.base;bundle-version="11.0.0",
 org.adempiere.plugin.utils;bundle-version="11.0.0",
 org.osgi.service.event;bundle-version="1.4.1"
Bundle-Activator: org.adempiere.plugin.utils.Incremental2PackActivator
```

Four things to take from this:

| Manifest field | Where it goes |
|---|---|
| `Bundle-SymbolicName` | `bundles[].symbolicName`, must match exactly |
| `Bundle-Version` | Informs the metadata `version`; the review cross-checks them |
| `Require-Bundle` versions | The ceiling on what `idempiereVersion` may honestly claim |
| `Bundle-Activator` | `Incremental2PackActivator` tells you dictionary content ships inside |

### What dictionary content ships

```bash
unzip -l "$JAR" | grep 2Pack
```

```
    14282  META-INF/2Pack_1.0.0.zip
     1777  META-INF/2Pack_1.0.1.zip
```

Two packs, not one. This is an incremental 2Pack. On a fresh instance, both are applied in order. Knowing this matters at verification time: you should see two entries in `AD_Package_Imp`, and seeing only one means the second silently failed.

### The entity type, the value everyone guesses wrong

`entityType` is not in the manifest. It is inside the 2Pack:

```bash
mkdir -p /tmp/dsv && cd /tmp/dsv
unzip -o -q "$JAR" 'META-INF/2Pack_*.zip' && unzip -o -q META-INF/2Pack_1.0.0.zip
grep -o '<EntityType>[^<]*<' 2Pack_1.0.0/dict/PackOut.xml | sort | uniq -c
```

```
     58 <EntityType>BAY<
```

`BAY` is BX Service's own registered entity type ("FreiBier"). This is exactly what the policy wants: not `D`, which is reserved for the iDempiere dictionary.

While you have it open, take stock of what the pack actually creates, because you have to describe it in `info.md`:

```bash
grep -o '<TableName>[^<]*<' 2Pack_1.0.0/dict/PackOut.xml | sort -u
grep -c 'SQLStatement' 2Pack_1.0.0/dict/PackOut.xml     # raw SQL, reviewers extract these
```

For this plug-in: tables `BXS_DocValidation` and `BXS_DocValidation_Trl`, a window and menu named Document Status Validation, two validation rules, and zero raw SQL statements. That means the review skill's `ExtensionSQLStatements.sql` step will come back empty, which is the good case.

### The licence

```bash
head -25 src/de/bxservice/model/docstatusvalidator/DocumentStatusValidator.java
```

Every source file carries the GPL v2 "or (at your option) any later version" header, SPDX `GPL-2.0-or-later`. Note this now; the acceptance policy requires it stated, and you will need it in `info.md`.

:::warning First finding
The headers say GPL, but the repository has no `LICENSE` file at its root. That is a real gap against the acceptance policy, found before writing a single line of metadata. Recorded in [Open items](#open-items).
:::

### Facts collected

| Property | Value |
|---|---|
| Symbolic name | `de.bxservice.docstatusvalidator` |
| Bundle version | `1.0.1.202609091909` |
| Entity type | `BAY` |
| 2Packs | `2Pack_1.0.0.zip`, `2Pack_1.0.1.zip` (incremental, System tenant) |
| Raw SQL in packs | None |
| Creates | `BXS_DocValidation`, `BXS_DocValidation_Trl`, window and menu, 2 validation rules |
| Licence | `GPL-2.0-or-later` |
| Source | `https://github.com/bxservice/de.bxservice.docstatusvalidator` at `17512bc` |

## Pre-flight the target instance

One check, thirty seconds, saves a baffling failure. `validateIDempiereVersion` calls `Version.parseVersion(Adempiere.getVersion())`, and `getVersion()` returns the `APPLICATION_MAIN_VERSION` SysConfig if one is set, only otherwise falling back to the `org.adempiere.base` bundle version. If that SysConfig holds a human string like `Release 14`, `parseVersion` throws and every install fails with an error that points nowhere near the cause.

```bash
psql -h localhost -U adempiere -d idempiere-master -tAc \
 "SELECT COALESCE((SELECT Value FROM AD_SysConfig WHERE Name='APPLICATION_MAIN_VERSION'),'<not set>');"
```

`<not set>` or a parseable version like `14.0.0` is fine.

Also record the starting state, so you can tell afterwards what your install actually did:

```sql
SELECT ExtensionId, ExtensionVersion, ExtensionState, IsBundled FROM AD_Extension ORDER BY 1;
SELECT count(*) FROM AD_EntityType WHERE EntityType = 'BAY';
SELECT count(*) FROM AD_Table      WHERE TableName  = 'BXS_DocValidation';
```

On a clean iDempiere 14, you should see only the four bundled core extensions, and zeros for the last two. If `BAY` or `BXS_DocValidation` already exist, the plug-in is already deployed in this workspace. See the warning in [If the plug-in is already in your workspace](#if-the-plug-in-is-already-in-your-workspace).

## Build the local provider

Layout, see [Create the local provider](./extension-registry-local-testing.md#create-the-local-provider):

```bash
REG=$HOME/idempiere-local-registry
EXT=$REG/extensions/de.bxservice.docstatusvalidator
mkdir -p "$EXT/1.0.1.202609091909" "$REG/jars"
cp /path/to/de.bxservice.docstatusvalidator_1.0.1.202609091909.jar "$REG/jars/"
sha256sum "$REG/jars/"*.jar | cut -d' ' -f1
```

```
3464e6e50b4f957b073a04a0ad93c4bfa409890ed7bd049acf3c43c17b03e00f
```

### metadata.json

`extensions/de.bxservice.docstatusvalidator/1.0.1.202609091909/metadata.json`:

```json
{
  "id": "de.bxservice.docstatusvalidator",
  "version": "1.0.1.202609091909",
  "idempiereVersion": "14",
  "releaseDate": "2026-09-09",
  "name": "Document Status Validator",
  "description": "Define SQL conditions that block document status changes and show the user an explanatory message.",
  "categories": ["Document Management", "Validation"],
  "tags": ["docstatus", "validation", "workflow", "sql"],
  "entityType": "BAY",
  "bundles": [
    {
      "symbolicName": "de.bxservice.docstatusvalidator",
      "downloadUrl": "file:/home/diego/idempiere-local-registry/jars/de.bxservice.docstatusvalidator_1.0.1.202609091909.jar",
      "sha256": "3464e6e50b4f957b073a04a0ad93c4bfa409890ed7bd049acf3c43c17b03e00f"
    }
  ],
  "dependencies": []
}
```

Two decisions worth defending:

**`idempiereVersion: "14"`, not `"11"`.** The manifest requires `org.adempiere.base` 11.0.0, and the git history has `release-11` and `release-12` sync commits, so `"11"` would probably work. But `"11"` is a claim, and the only version being tested here is 14. Claim what you verify. Widening later is a new `metadata.json` in a new version folder; narrowing after users have hit a failure is a bug report. (`"14"` means "14 and above"; use `"[14,15)"` if you want to refuse 15 until you have tested it.)

**`version` carries the build qualifier.** `1.0.1.202609091909` is what the jar says, and the review cross-checks metadata against the jar. It is ugly, and it is a problem for the real submission. See [The version problem](#the-version-problem).

### info.md and CHANGELOG.md

`info.md` needs all six sections from [The info.md file](./extension-registry-contributing.md#the-infomd-file). The parts worth noticing for this plug-in:

* **Database Changes** is where the entity-type investigation pays off: name the tables, the window, the entity type, and state that no raw SQL runs. A reviewer reads this against the 2Pack.
* **Author / Support** must carry Source Code and Licence (`GPL-2.0-or-later`). Under the no-endorsement policy, this section is how a user finds out who stands behind the extension.
* This plug-in has a wiki page and a video. Link them under Usage & Configuration; most extensions have nothing comparable, and it is the cheapest possible credibility.

`CHANGELOG.md` is reconstructible from `git log`: the 1.0.1 pack added a translation-table primary key, and the log shows an OR-in-where-clause parenthesisation fix and a startup "No Database Connection" fix.

### index.json

At the provider root. Use the stub-plus-versions shape, not the one `index-schema.json` describes; see [index.json](./extension-registry-local-testing.md#indexjson):

```json
{
  "generatedAt": "2026-09-09T10:00:00Z",
  "extensions": [
    {
      "id": "de.bxservice.docstatusvalidator",
      "name": "Document Status Validator",
      "description": "Define SQL conditions that block document status changes and show the user an explanatory message.",
      "categories": ["Document Management", "Validation"],
      "tags": ["docstatus", "validation", "workflow", "sql"],
      "entityType": "BAY",
      "infoUrl": "file:/home/diego/idempiere-local-registry/extensions/de.bxservice.docstatusvalidator/info.md",
      "changeLogUrl": "file:/home/diego/idempiere-local-registry/extensions/de.bxservice.docstatusvalidator/CHANGELOG.md",
      "versions": [
        {
          "version": "1.0.1.202609091909",
          "metadataUrl": "file:/home/diego/idempiere-local-registry/extensions/de.bxservice.docstatusvalidator/1.0.1.202609091909/metadata.json"
        }
      ]
    }
  ]
}
```

`infoUrl` and `changeLogUrl` live here, not in `metadata.json`. A missing Details or Changelog tab in the form is almost always this.

### Check the provider before starting the server

Restarting iDempiere to discover a typo is a slow feedback loop. Everything is checkable offline:

```bash
# JSON parses
python3 -c "import json;json.load(open('$REG/index.json'))"

# every file: URL resolves
grep -rho 'file:[^"]*' "$REG"/index.json "$REG"/extensions/*/*/metadata.json | sort -u |
  while read u; do p="${u#file:}"; [ -e "$p" ] && echo "OK   $u" || echo "MISSING $u"; done

# recorded hash matches the jar
sha256sum "$REG/jars/"*.jar

# symbolic name matches the manifest
unzip -p "$REG/jars/"*.jar META-INF/MANIFEST.MF | grep -E 'Bundle-(SymbolicName|Version)'
```

All four passed here before the server was touched.

## Point iDempiere at it

### Eclipse

`org.adempiere.server-feature/server.product.launch` already ships the argument, pointing at the public registry:

```
-DIDEMPIERE_EXTENSION_REPOSITORY=https://github.com/idempiere/idempiere-extension-repository
```

:::tip Duplicate the launch configuration rather than editing that file
Run → Run Configurations → right-click `server.product` → Duplicate, and change the value in the copy:

```
-DIDEMPIERE_EXTENSION_REPOSITORY=file:/home/diego/idempiere-local-registry
```

Editing the tracked file works, but it dirties your iDempiere working tree and will follow you into an unrelated commit.
:::

Confirm the extension manager is actually in the launch's bundle list, or the form will not exist:

```bash
grep -o "org.idempiere.extension.manager@[^\"]*" org.adempiere.server-feature/server.product.launch
# org.idempiere.extension.manager@default:true
```

### Installed server

```bash
export IDEMPIERE_EXTENSION_REPOSITORY=file:$HOME/idempiere-local-registry
./idempiere-server.sh
```

The launcher honours an existing value and forwards it as `-D`.

### If the plug-in is already in your workspace

If the bundle is already deployed (dropped into `plugins/`, or present as an Eclipse project in the launch config), the form will notice all its bundles are already installed and auto-register it (`autoRegisterExtension`), reconstructing `AD_ExtensionEntity` from pack-in history. You will see it as already installed and never exercise the download path.

Remove it from the launch configuration's bundle list first. You are testing the install, and the install is the thing that has to work for everyone else.

## Install and verify

Log in as System Administrator, open Extension Management.

Extension Repository should list Document Status Validator with its description, categories, and tags, and the Details and Changelog tabs should render your Markdown. If instead you get a red error line, the message is the fetch failure. Check the `file:` rules in [Two file: rules that will bite you](./extension-registry-local-testing.md#two-file-rules-that-will-bite-you).

Click Install. The process log walks: downloading, installing, starting, importing data in the background.

Then verify in the database, because the UI reports the bundle install, not the pack-in:

```sql
-- extension registered and active
SELECT ExtensionId, ExtensionVersion, ExtensionState FROM AD_Extension
 WHERE ExtensionId = 'de.bxservice.docstatusvalidator';
-- expect: 1.0.1.202609091909 | IN

-- the packs applied (this is the incremental 2Pack from earlier)
SELECT AD_Package_Imp_ID, PK_Version, PK_Status,
       (SELECT count(*) FROM AD_Package_Imp_Detail d
         WHERE d.AD_Package_Imp_ID = p.AD_Package_Imp_ID) AS details
  FROM AD_Package_Imp p
 WHERE Name = 'de.bxservice.docstatusvalidator' ORDER BY Created;

-- dictionary content landed
SELECT count(*) FROM AD_EntityType WHERE EntityType = 'BAY';          -- 1
SELECT count(*) FROM AD_Table      WHERE TableName  = 'BXS_DocValidation';  -- 1

-- and the manager is tracking what it created
SELECT count(*) FROM AD_ExtensionEntity e
  JOIN AD_Extension x ON x.AD_Extension_ID = e.AD_Extension_ID
 WHERE x.ExtensionId = 'de.bxservice.docstatusvalidator';   -- > 0
```

Observed on this install:

```
 1000000 | 0.0.0 | Completed successfully |   0
 1000001 | 1.0.0 | Completed successfully |  86
 1000002 | 1.0.1 | Completed successfully |   4
```

Three rows for two packs. Expect N+1, not N. `Incremental2PackActivator` writes a `0.0.0` sentinel row with zero details, once per bundle, as its marker that the bundle has been seen (`Incremental2PackActivator.java:139`). Everything after it is a real pack: `1.0.0` did the bulk of the work with 86 detail records, and the incremental `1.0.1` added 4, which matches the earlier jar listing, where `2Pack_1.0.0.zip` was 14 KB and `2Pack_1.0.1.zip` only 1.7 KB.

If you only ever see the `0.0.0` row, the packs did not run at all. If a pack shows anything other than `Completed successfully`, the extension will have been flipped to `ER` by `PackageImpDelegate`.

:::note
That last query is the one people skip. An empty `AD_ExtensionEntity` means Disable and Enable will appear to work and change nothing; the manager has no record of which dictionary records are yours. If it is empty, the pack-in ran outside the one-hour correlation window or failed; check `AD_Package_Imp` first. This install tracked 62 entities.
:::

Finally, use the feature as a user: the Document Status Validation menu should exist, and a validation record with an always-true condition should block a document status change with your message. Installing is not the same as working.

## Exercise the lifecycle

The full matrix is in [Test matrix](./extension-registry-local-testing.md#test-matrix). The rows that matter for an extension like this one, one bundle, dictionary content, no dependencies:

| Check | Expected |
|---|---|
| Disable | Bundle stops; the Document Status Validation window and its records go `IsActive='N'`; state `DI` |
| Enable | Reversed; state `IN` |
| Uninstall | Bundle uninstalled, state `UN`, and every target record goes `IsActive='N'`, confirmed here on `AD_Menu` and both `BXS_DocValidation` tables. The tables and their rows survive: uninstall deactivates, it does not roll back a 2Pack |
| Reinstall | Existing `AD_ExtensionEntity` rows are re-activated rather than duplicated |
| Version gate | Temporarily set `idempiereVersion` to `"[99,100)"` → `IncompatibleIDempiereVersion` |
| Checksum | Corrupt one character of `sha256` → `BundleSHA256HashNotMatch`, nothing installed |

One distinction that trips people up: the `AD_ExtensionEntity` tracking rows stay `IsActive='Y'` throughout, all 62 of them here, even after uninstall. It is the records they point at that get flipped. If you check the wrong table, you will conclude Disable did nothing.

The last two checks are worth running deliberately: they are the only cheap way to see the validation gates actually fire, and they make good demo material.

## Turn the local provider into a submission

The provider you just built is nearly the registry layout. Three differences.

### Paths and ownership

* Files move to `extensions/de.bxservice.docstatusvalidator/...` inside a fork of `idempiere/idempiere-extension-repository`.
* `file:` URLs become `https://`.
* `index.json` is not part of your PR. CI regenerates it on merge; editing it creates a conflict.

### The version problem

`1.0.1.202609091909` is a build timestamp. Because the project builds the jar from your source, the project's build will produce a different qualifier, and a different `sha256`. Neither the version string nor the hash from your local jar can be final.

This is not a blocker, but it has to be handled deliberately: either the extension version drops the qualifier (`1.0.1`) and only the jar carries it, or the version folder is named after whatever the project's build emits. Agree it in the PR rather than guessing.

### The binary, and the chicken-and-egg problem

`downloadUrl` and `sha256` name the project-built artifact: the PR nominates a public source repository and an immutable tag, and maintainers fill the two fields in.

But `validate-extensions.yml` requires `downloadUrl` on every bundle, so a PR that leaves it out is red from the moment it opens. That is the sequencing problem this submission ran into, and there is no clean answer yet. Three options, all imperfect:

| Option | CI | Build-from-source rule | Cost |
|---|---|---|---|
| Omit `downloadUrl`, explain in the PR | Red | Satisfied | Reviewers must work with a red PR |
| Publish a GitHub Release and point at it | Green | Not satisfied, contributor-supplied binary | Must be revisited once a project build exists |
| Hold the PR until a project build exists | N/A | Satisfied | Nothing gets submitted meanwhile |

:::warning This submission took the middle option
It is worth being clear why, and what it costs. The plug-in has no automated build (see [Open items](#open-items)), so there is nothing for the project to build from today; the registry's existing entries already point at externally-built artifacts; and a red PR that sits indefinitely teaches nobody anything. So the metadata references a GitHub Release asset with the `sha256` of the exact jar tested earlier:

```json
"bundles": [
  {
    "symbolicName": "de.bxservice.docstatusvalidator",
    "downloadUrl": "https://github.com/bxservice/de.bxservice.docstatusvalidator/releases/download/1.0.1/de.bxservice.docstatusvalidator_1.0.1.202609091909.jar",
    "sha256": "3464e6e50b4f957b073a04a0ad93c4bfa409890ed7bd049acf3c43c17b03e00f"
  }
]
```

That is a contributor-supplied binary, precisely what the build-from-source rule exists to prevent. It is a transitional state, it should be declared as such in the PR description, and it must be replaced once the plug-in has a build the project can run. Do not read this as permission to skip that rule; read it as evidence that the policy needs a defined answer for the first submission of a plug-in that predates it.
:::

Note also `"version": "1.0.1"` while the jar is `1.0.1.202609091909`. The registry convention is a clean three-segment version, with the build qualifier living only in the artifact; the existing REST API entry does the same. Keep the version stable and let the jar filename carry the timestamp.

## Open items

What this walkthrough surfaced. Three of the five are repository hygiene; one is a genuine blocker.

| # | Item | Owner | Blocks |
|---|---|---|---|
| 1 | Add `LICENSE` (`GPL-2.0-or-later`) to the plug-in repo. Headers say it, the repo does not | Maintainer | Open source only |
| 2 | Add a Tycho `pom.xml`. The project is Eclipse PDE only, so nothing can build it unattended | Maintainer | The project builds the jar, the real blocker |
| 2b | Decide how it builds: a self-contained pom with `tycho-maven-plugin` and `target-platform-configuration` against a published iDempiere p2 repository, since the core parent pom is an unpublished SNAPSHOT | Maintainer | Item 2 |
| 3 | Tag the release (commit `17512bc`) so there is an immutable build input | Maintainer | The project builds the jar |
| 4 | Replace the GitHub Release URL with a project-built artifact once item 2 lands. The current entry is a contributor-supplied binary | Registry maintainers and plug-in maintainer | The project builds the jar |
| 5 | Consider widening `idempiereVersion` to `"11"` once 11 and 12 are actually tested | Maintainer | Nothing |

Item 2 is the interesting one. The plug-in is well-built by every other measure: own entity type, clean 2Pack, no raw SQL, GPL throughout, real documentation, and it still cannot be submitted today, because it has no automated build. Nor does any sibling plug-in in the same collection: only one of roughly twenty has a `pom.xml` at all, and that one is `packaging: jar`. It copies dependency jars into `lib/`; it is not a Tycho `eclipse-plugin` build. So there is no working template to copy from either.

Nor is it a five-minute fix. Core plug-ins get their build almost free by inheriting `org.idempiere.parent`, but that parent is an unpublished `14.0.0-SNAPSHOT`, so an external plug-in cannot simply reference it. It needs its own `tycho-maven-plugin` and a `target-platform-configuration` pointed at a published iDempiere p2 repository, real work, done once per plug-in. See [Building iDempiere Plug-ins with Maven](./plugin-maven-build.md) for the general project layout this depends on.

This is worth stating plainly: the build-from-source rule is the right call for supply-chain safety, and it lands on an ecosystem where most community plug-ins are Eclipse PDE projects built by hand. The gap between the policy and the ecosystem is a migration problem, and the registry will be as large as the number of plug-ins that close it.

## What this example is good for

* The order matters. Reading the jar and pre-flighting the instance take ten minutes and prevent most of the failures that otherwise appear much later as confusing errors.
* Every value in the metadata is derivable from the artifact. Guessing `entityType` or `symbolicName` is the most common way to produce metadata that validates and then does not work.
* Verify in the database, not only in the UI. The form reports the bundle install; the 2Pack and `AD_ExtensionEntity` are where the interesting failures hide.
* The policy gaps are found by attempting a submission, not by reading the policy.

## Related reading

* [Testing an Extension Locally](./extension-registry-local-testing.md), the local `file:` provider in general.
* [Contributing an Extension to the Registry](./extension-registry-contributing.md), the acceptance policy and metadata reference.
* [Building iDempiere Plug-ins with Maven](./plugin-maven-build.md), the build this plug-in was missing.
