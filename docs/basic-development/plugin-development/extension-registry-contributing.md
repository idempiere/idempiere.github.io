---
title: Contributing an Extension to the Registry
sidebar_label: Contributing to the Extension Registry
sidebar_position: 23
description: How to publish a plug-in to the official iDempiere Extension Registry so any iDempiere 14+ instance can find and install it.
---

# Contributing an Extension to the Registry

:::info
This applies to iDempiere 14 and later. It documents the new way of distributing plug-ins through the official Extension Registry, alongside the existing manual plug-in distribution described in [Distributing and Installing Plug-ins in iDempiere](./distributing-plugins.md). See [iDempiere Extension Management](../../new-features/v14/extension-management.md) for the end-user overview of the feature.
:::

This guide describes how to publish a plug-in so that any iDempiere 14+ instance can find and install it from the **Extension Management** form.

The short version: you do not upload a jar anywhere. You publish your source, and you send a pull request adding two small text files to a public catalog repository. The iDempiere project builds the binary from your source itself.

Read [Acceptance policy](#acceptance-policy) first. It decides whether your extension is eligible at all.

## The registry repository

The official registry lives at [github.com/idempiere/idempiere-extension-repository](https://github.com/idempiere/idempiere-extension-repository). This URL is the default value of `IDEMPIERE_EXTENSION_REPOSITORY`, baked into `idempiere-server.sh`, `idempiere-server.bat`, `org.adempiere.server-feature/server.product`, `org.idempiere.p2/server.product`, and both `org.idempiere.p2.profile` products. Unless an administrator overrides it, every iDempiere installation points here.

Layout:

```
index.json                       ← GENERATED, never edit by hand
index-schema.json
metadata-schema.json
extension-spec.md
README.md
extensions/
  └── <extension.id>/
      ├── info.md                ← one per extension
      ├── CHANGELOG.md           ← one per extension (optional but expected)
      ├── assets/                ← screenshots, sample CSV, etc.
      └── <version>/
          └── metadata.json      ← one per released version
scripts/generate_index.py
.github/workflows/
  ├── validate-extensions.yml
  └── generate-index.yml
skills/idempiere-review-extension/
```

Your contribution to this repository is a new folder under `extensions/`, a few text files, no binaries. The jar itself is built by the project from your source repository. See [The project builds the jar](#the-project-builds-the-jar).

## Acceptance policy

Five rules govern what the registry accepts. They are project decisions, not properties of the code (the extension manager will happily install anything it is pointed at). They exist because a catalog that installs code into production ERP systems is a supply-chain surface, and these are the mitigations the project chose.

### Open source only

Every listed extension must be open source, with a public source repository and a clear licence. Closed-source and source-available-but-not-open extensions are not listed.

This is also the technical precondition for the next rule: the project cannot build what it cannot read.

### The project builds the jar

You do not supply a binary. The iDempiere project builds the jar from your published source on project infrastructure, and `bundles[].downloadUrl` points at that build output.

The reason is narrow and worth stating plainly: a contributor-supplied jar cannot be shown to correspond to the source that was reviewed. Reviewing source and then shipping someone else's binary would make the review pointless. Building from source closes that gap. What users install is what the reviewers read.

:::warning Maven is a hard requirement
Your project must build with **Maven (Tycho)**, unattended, from a clean checkout. This is the only build the project's infrastructure can run, so a plug-in with no Maven build (an Eclipse PDE-only project, for example) cannot be accepted until one exists. See [Building iDempiere Plug-ins with Maven](./plugin-maven-build.md) for how to set one up.
:::

Beyond the build tool itself, the build must succeed with no local paths, no credentialed dependencies, no manual steps, and no artifacts pulled from a repository the project cannot reach.

### Automated analysis first

Submissions go through automated analysis (currently the `skills/idempiere-review-extension` checklist) before a maintainer reviews them. It reads the source, the metadata, and the 2Pack content, and surfaces anything that needs a human decision: raw SQL in the dictionary content, unexpected `META-INF` contents, entity-type misuse, metadata that does not match the jar.

This is risk reduction, not a security guarantee. It narrows what a reviewer has to find by hand. It does not certify the extension. See [What review looks like](#what-review-looks-like).

### Must install on vanilla iDempiere

Your extension must install and work on an unmodified official iDempiere release. Concretely:

* No patched or forked core.
* No manual pre-installation steps beyond what the Extension Management form performs.
* No dependency on another extension unless it is declared in `dependencies[]` and is itself in the registry.
* No expectation of tenant data, roles, or configuration that a fresh install does not have.

This is the single most common reason a submission is sent back, and it is easy to check yourself. See [Testing an Extension Locally](./extension-registry-local-testing.md), which walks through testing against a vanilla instance.

### Curated start, and listing is not endorsement

The registry opens with a curated set of established contributors ("top makers") while the process is proven. That gate is deliberately temporary: the intent is to widen access as review capacity and automation mature.

Because of that, the registry is built so that listing never implies endorsement. Presence in the catalog means an extension met the mechanical criteria above and passed review at the time it was merged. It is not a certification, a warranty, an audit, or a statement that the iDempiere project vouches for the extension or its maintainer. Extensions carry their own authorship, licence, and support channel in `info.md`, and users are expected to evaluate them on that basis.

Designing for no-endorsement from the start is what makes lifting the curated gate a policy change rather than a redesign. Nothing in the catalog, the UI, or the metadata will need to stop making a promise it was never making.

:::note Open at the time of writing
The mechanics behind these decisions, which build infrastructure produces the jars, the accepted licence list, and how the initial contributor set is determined, are still being settled. Check the registry's own `README.md` for the current operational detail before submitting.
:::

## Contribution flow

1. Confirm eligibility against the acceptance policy above: open source, buildable with Maven, installs on vanilla.
2. Fork `idempiere/idempiere-extension-repository`.
3. Create `extensions/<your.bundle.symbolic.name>/`.
4. Add `info.md`, optionally `CHANGELOG.md` and `assets/`, and `<version>/metadata.json`, including a link to the public source repository and the commit or tag to build.
5. Open a pull request.
6. `validate-extensions.yml` runs on the PR and checks every `metadata.json` it can find.
7. Automated analysis runs, then a maintainer reviews. See [What review looks like](#what-review-looks-like).
8. The project builds the jar from your source and publishes it; `downloadUrl` is set to that artifact. See [How the jar is built and hosted](#how-the-jar-is-built-and-hosted).
9. On merge, `generate-index.yml` runs `scripts/generate_index.py`, regenerates `index.json`, and commits it as `github-actions[bot]`.

:::danger Do not touch index.json
Do not add or edit `index.json` in your PR. It is owned by the workflow. Editing it creates a merge conflict and will be reverted on the next merge to `main`.
:::

## The metadata.json fields

One file per released version, at `extensions/<id>/<version>/metadata.json`.

```json
{
  "id": "com.example.plugin.name",
  "version": "1.0.0",
  "idempiereVersion": "14",
  "releaseDate": "2026-09-08",
  "name": "Human Readable Name",
  "description": "One sentence describing this specific version.",
  "categories": ["Integration", "Reporting"],
  "tags": ["pdf", "watermark"],
  "entityType": "XPLG",
  "bundles": [
    {
      "symbolicName": "com.example.plugin.core",
      "downloadUrl": "https://<project-build-host>/.../com.example.plugin.core_1.0.0.jar",
      "sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    },
    {
      "symbolicName": "com.example.plugin.ui",
      "downloadUrl": "https://<project-build-host>/.../com.example.plugin.ui_1.0.0.jar",
      "sha256": "..."
    }
  ],
  "dependencies": [
    { "id": "com.trekglobal.idempiere.rest.api", "version": "1.0.0" }
  ],
  "database": [
    { "id": "postgresql", "version": "17", "extensions": ["vector"] }
  ]
}
```

`downloadUrl` and `sha256` describe the project-built artifact (see the rules above and [How the jar is built and hosted](#how-the-jar-is-built-and-hosted)). You supply the source repository and the commit or tag; the maintainers fill these in against the build they produce. Do not point them at a binary you built yourself.

| Field | Required | Rule | Enforced by |
|---|---|---|---|
| `id` | Yes | Unique identity, conventionally the main bundle's symbolic name. This is what `dependencies[].id` refers to, and the key of the `AD_Extension` row. | Validator and CI |
| `version` | Yes | OSGi version: `^[0-9]+\.[0-9]+\.[0-9]+(\.[a-zA-Z0-9_-]+)?$`, for example `1.0.0` or `1.0.0.20260908`. Three segments minimum; `1.0` is rejected. | `ExtensionMetadataValidator` |
| `idempiereVersion` | Yes | An OSGi version range tested against `Adempiere.getVersion()`. `"14"` means "14 and above"; use `"[14,15)"` to pin to a single major. | `validateIDempiereVersion` |
| `name` | Yes | Shown in the extension list. | Validator |
| `bundles` | Yes | Non-empty array. | Validator and CI |
| `bundles[].symbolicName` | Yes | Must match the jar's `Bundle-SymbolicName` exactly. This is how the manager finds the bundle later for update, enable, disable, and uninstall. | Validator and CI |
| `bundles[].downloadUrl` | See note below | Must parse as a URI. Points at the project-built artifact, not one you host. | CI requires it; the Java validator does not |
| `bundles[].sha256` | No | Hex SHA-256 of the project-built jar. Verified after download; a mismatch aborts the install. | `installExtension` |
| `releaseDate` | No | Strict `yyyy-MM-dd`, non-lenient. `2026-13-01` is rejected. | Validator |
| `description` | No | One line, shown under the name in the list. | Validator |
| `categories` | No | String array, unique items. Filterable with `category:` in the form. | Validator |
| `tags` | No | String array, unique items. Filterable with `tag:`. | Validator |
| `entityType` | No | The `AD_EntityType` your dictionary content belongs to. | - |
| `dependencies[]` | No | `{id, version}`; `version` is an OSGi range matched against the installed extension's version. The dependency must be present and in state Installed. | `validateDependencies` |
| `database[]` | No | `id` must be `postgresql` or `oracle`. If present, the list is exhaustive: a database not named is treated as unsupported. `version` is a minimum. `extensions[]` is checked against `pg_available_extensions` (PostgreSQL only). | Validator and `validateDatabaseRequirement` |

### The downloadUrl asymmetry

`validate-extensions.yml` fails a PR when any bundle lacks `symbolicName` or `downloadUrl`:

```python
for idx, bundle in enumerate(data['bundles']):
    if 'symbolicName' not in bundle or 'downloadUrl' not in bundle:
        errors.append(f"Bundle at index {idx} in {file_path} missing 'symbolicName' or 'downloadUrl'")
```

The runtime validator (`ExtensionMetadataValidator`) only requires `symbolicName`. This is why the bundled core extensions in the iDempiere source tree (`org.idempiere.acct/metadata.json`, `org.adempiere.replication/metadata.json`, `org.adempiere.payment.processor/metadata.json`) legitimately omit `downloadUrl`. They ship with the product and are never downloaded.

:::note
Those bundled-extension files are not in the registry and are not a template for `downloadUrl`. Anything published to the registry must carry one.
:::

If a bundle has no `downloadUrl` at install time, the process aborts with `BundleNoDownloadURL`.

Because the value now names a project-built artifact, a first submission may legitimately open with the field absent or a placeholder and have it filled in during review. The CI check will fail until it is set. Agree the sequence with the maintainers rather than inventing a URL to get CI green.

### Database requirements are exhaustive

If you declare `database`, you must list every database you support. `validateDatabaseRequirement` looks for an entry matching the running database and, finding none, returns `DatabaseTypeNotSupported`. Omit the whole key if you are database-agnostic. Note that the `extensions[]` availability check is implemented for PostgreSQL only; on Oracle only the version is compared.

## The info.md file

Rendered as the **Details** tab in the Extension Management form. Reviewers check for six sections:

```markdown
# Extension Name

**Summary:** One or two sentences, what it does and why someone would install it.

## 🚀 Features
* Bullets, concrete, user-visible.

## ⚙️ Compatibility
* **iDempiere Version:** 14
* **Java Version:** 17+
* **Database:** PostgreSQL, Oracle

## 📦 Database Changes
* **System PackIn:** ships a System-tenant 2Pack creating ...
* **Tenant PackIn:** download from {url} and install into the destination tenant
* **Tenant CSV Import:** download from {url} and import

## 🛠 Usage & Configuration
Where the new menu/window/field lives, what must be configured before it works.

## 👤 Author / Support
* **Developer:** Name / Organisation
* **Source Code:** https://...          (public repository, required)
* **Licence:** GPL-2.0-or-later         (required)
* **Issue Tracker:** https://...
```

**Source Code** and **Licence** are not optional. The registry admits open-source extensions only, and the jar is built from that repository, so the link is what the maintainers build from, and the licence is what makes doing so permissible. Name the licence with its [SPDX identifier](https://spdx.org/licenses/) rather than prose.

This section is also where the no-endorsement policy lands in practice. The registry does not vouch for your extension; **Author / Support** is where a user finds out who does. Give a support channel a stranger can actually use.

Working examples in the iDempiere source tree, written for exactly this purpose:

* `org.idempiere.acct/info.md`
* `org.adempiere.replication/info.md`
* `org.adempiere.payment.processor/info.md`

The Markdown is rendered then sanitised through `AEnv.sanitize()` (an OWASP HTML sanitiser: blocks, formatting, images, links, styles, tables). Scripts and unlisted tags are removed, so write plain Markdown. Relative image links resolve against the directory of the `info.md` itself, so `![screenshot](assets/config.png)` works if the file is committed under `assets/`.

`CHANGELOG.md` is optional but expected; follow [keepachangelog](https://keepachangelog.com/en/1.0.0/). Both files live at the extension level, not inside a version folder. They describe the whole extension across versions.

## How the jar is built and hosted

The project builds the jar from your source. You do not host a binary and you do not choose the `downloadUrl`. What you provide is a public source repository and the exact commit or tag to build; the resulting artifact is published on project infrastructure and that URL goes into `bundles[].downloadUrl`.

What this asks of you:

* The build must be reproducible unattended. Standard Tycho/Maven build, no local paths, no credentialed or private dependencies, no manual steps, no artifacts from repositories the project cannot reach.
* Tag your releases. A moving branch is not a build input. Point at an immutable commit or tag so that the artifact users install corresponds to a fixed, reviewable state of the source.
* Keep `Bundle-Version` in step with the metadata `version`. The review cross-checks them.
* The `sha256` is computed from the produced artifact, so you generally will not be the one filling it in. If you submit one, it must match; a mismatch aborts installation at the client with `BundleSHA256HashNotMatch`.

The registry itself still stores no binaries, only the JSON pointing at them.

### What the client requires of the URL

Whatever the project publishes to, the URL must serve the exact bytes whose `sha256` is recorded (never re-uploaded under the same URL), be publicly reachable without authentication (the client sends no credentials), and may redirect freely (`HttpClient.Redirect.ALWAYS`, 30-second timeout). GitHub `blob` URLs also resolve, because `toRawGithubPath()` rewrites them to `raw.githubusercontent.com` automatically.

:::note A note on what is in the registry today
The existing REST API entry points at `https://jenkins.idempiere.org/job/idempiere-rest/ws/.../target/...-SNAPSHOT.jar`, a project Jenkins build, so already project-built rather than contributor-supplied, but a workspace (`/ws/`) path to a `-SNAPSHOT` artifact. A workspace path is mutable and can vanish between builds. Expect entries to move to stable archived-artifact URLs as the build-from-source rule is fully implemented; treat the current one as a transitional state, not the pattern to imitate.
:::

Publish or verify the `sha256` wherever you can. It is the only integrity check the client performs (there is no signature verification), and it is what ties the reviewed source, the produced artifact, and the installed bytes together.

## Shipping dictionary changes

Application-dictionary content travels inside your jar, not in the registry:

* Put the 2Pack at `META-INF/2Pack_<version>.zip`. The manager detects it with `bundle.findEntries("META-INF", "2Pack_*.zip", false)` after starting the bundle, and `Incremental2PackActivator` imports it in the background. The user sees broadcast notifications when the import starts and finishes. See the [2Pack](../2pack/what-is-2pack.md) documentation for the format itself.
* Register your own `AD_EntityType` and use it for every record.

:::danger Never use entity type D
`D` is reserved for the iDempiere dictionary. Using it makes your records indistinguishable from core and unmanageable by the registry.
:::

* Successful pack-in details are copied into `AD_ExtensionEntity`, which is what later lets a user disable your extension (each recorded record is flipped to `IsActive='N'`) and re-enable it. Records your plug-in creates outside a 2Pack are not tracked and will not be deactivated.
* Uninstall does not roll the 2Pack back. Design your dictionary content so that deactivation is a safe state.

Content that must land in a tenant rather than the System tenant cannot be pushed by the installer. Publish it as a downloadable 2Pack or CSV and document it in the **Database Changes** section of `info.md`, as the template above shows.

## Publishing a new version

* Add a new folder: `extensions/<id>/2.0.0/metadata.json`.

:::warning
Never modify a published version's metadata. Instances that already installed it hold a copy of that JSON in `AD_Extension.ExtensionMetadata`.
:::

* Update `CHANGELOG.md`.
* Update `info.md` if compatibility or configuration changed.
* Bump the jar's `Bundle-Version` to match, and publish it at a new immutable URL.

The indexer collects every version folder, sorts them newest-first, and emits:

```json
"versions": [
  { "version": "2.0.0", "metadataUrl": "https://github.com/idempiere/idempiere-extension-repository/blob/main/extensions/<id>/2.0.0/metadata.json" },
  { "version": "1.0.0", "metadataUrl": ".../1.0.0/metadata.json" }
]
```

With two or more versions, the form shows a version dropdown, so older releases stay installable. Users on an older version see the **Install** button change to **Update**; downgrades are refused with `ExtensionBundleNewerVersionInstalled`.

## What review looks like

Review is deliberately layered: cheap mechanical checks first, automated analysis second, human judgement last and only on what survives.

1. **CI**, `validate-extensions.yml` on the pull request. Checks required keys, non-empty `bundles`, `symbolicName`, and `downloadUrl` per bundle. Fails fast, and tells you exactly which file and key.
2. **Automated analysis**, the `skills/idempiere-review-extension` checklist, run over the source and the built artifact:
   * **Documentation**: the six `info.md` sections present, grammar, semantic accuracy, links resolve.
   * **Schema**: `metadata.json` against `metadata-schema.json`; mandatory fields, version pattern, valid URIs.
   * **Bundles**: the jar is actually downloaded; version and hash cross-checked against the metadata; `META-INF` inspected; 2Pack naming (`2Pack_<version>`) verified; entity type and System-tenant creation confirmed.
   * **SQL**: any raw SQL statement inside the 2Pack XML is extracted into `ExtensionSQLStatements.sql`, annotated with source file and line, for a human to read.
3. **Human review**, a maintainer decides on what the previous layers surfaced, plus the judgement calls no tool makes: is this genuinely open source, does the build come out clean, does it install on vanilla, and does it follow iDempiere practice (proper OSGi structure, no hardcoded values, own entity type, clear licence).

The automated layer covers what a reviewer cannot sustain by hand across every submission: reading all the dictionary content, opening the jar, comparing it against the metadata. It raises findings for a person to judge. It does not approve anything on its own, and it is not a security guarantee.

Expect your source and the resulting jar to be read. Checking these points yourself first is the fastest way through.

## Pre-PR checklist

**Eligibility**

- [ ] Source repository is public and the licence is stated with its SPDX identifier.
- [ ] The project builds with Maven (Tycho), unattended, from a clean checkout, no local paths, private dependencies, or manual steps.
- [ ] An immutable commit or tag is nominated for the build.
- [ ] Installs and works on vanilla iDempiere: no core patches, no undeclared prerequisites, no manual pre-steps.
- [ ] Every prerequisite extension is declared in `dependencies[]` and is itself in the registry.

**Metadata**

- [ ] Jar's `Bundle-SymbolicName` matches `bundles[].symbolicName`, and `Bundle-Version` matches the metadata `version`.
- [ ] `metadata.json` has `id`, `name`, `version`, `idempiereVersion`, `bundles`.
- [ ] `downloadUrl` and `sha256` agreed with the maintainers against the project-built artifact, not a binary you host.
- [ ] `version` has three numeric segments; `releaseDate` is `yyyy-MM-dd`.
- [ ] `idempiereVersion` range actually matches the version you tested against.
- [ ] `database[]` lists all supported databases, or is omitted entirely.
- [ ] Own `AD_EntityType`; 2Pack named `META-INF/2Pack_<version>.zip`.

**Documentation**

- [ ] `info.md` has all six sections, including **Source Code** and **Licence**; every link resolves; images committed under `assets/`.
- [ ] `CHANGELOG.md` updated.
- [ ] `index.json` not touched.

**Verification**

- [ ] Installed and exercised on a vanilla instance first: run the full test matrix in [Testing an Extension Locally](./extension-registry-local-testing.md), including the vanilla-install check.

## Related reading

* [Testing an Extension Locally](./extension-registry-local-testing.md), test before you publish.
* [Extension Registry Worked Example](./extension-registry-worked-example.md), a full submission from start to finish.
* [Building iDempiere Plug-ins with Maven](./plugin-maven-build.md), setting up the required Maven/Tycho build.
* [iDempiere Extension Management](../../new-features/v14/extension-management.md), the end-user overview of the feature.
