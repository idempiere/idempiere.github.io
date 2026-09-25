---
sidebar_label: "Technical notes"
sidebar_position: 1
description: "Technical migration notes for upgrading to iDempiere 3.1."
tags: [features, migration, installation, development, developer-documentation, reference, v3.1, breaking-change, configuration]
---

# Migration notes - iDempiere 3.1 (technical)

## Keystore moved

As the web server was changed from Tomcat to Jetty, the keystore file was moved from `idempiere-server/keystore/myKeystore` to `idempiere-server/jettyhome/etc/keystore`.

## Themes

With the upgrade of ZK to version 7, the file `org.adempiere.ui.zk/theme/default/css/theme.css.dsp` was split into fragments located in the folder `org.adempiere.ui.zk/theme/default/css/fragment`:

- `about.css.dsp`
- `adwindow.css.dsp`
- `application-menu.css.dsp`
- `borderlayout.css.dsp`
- `button.css.dsp`
- `desktop.css.dsp`
- `field-editor.css.dsp`
- `find-window.css.dsp`
- `form.css.dsp`
- `gadget.css.dsp`
- `grid.css.dsp`
- `group.css.dsp`
- `help-window.css.dsp`
- `info-window.css.dsp`
- `input-element.css.dsp`
- `login.css.dsp`
- `menu-tree.css.dsp`
- `setup-wizard.css.dsp`
- `tab.css.dsp`
- `tab-editor.css.dsp`
- `toolbar.css.dsp`
- `toolbar-popup.css.dsp`
- `tree.css.dsp`
- `window.css.dsp`

:::warning
Theme developers must take care to migrate their themes to be compliant with this new schema.
:::

## Migration notes for the zk7 branch

See the "Update your development environment (zk7 branch)" wiki page, "Known issues" section, for additional migration notes when updating your development environment.

<!-- TODO: verify — the "Update your development environment (zk7 branch)" wiki page has not been migrated to Docusaurus yet; linking out to https://wiki.idempiere.org/en/Update_your_development_environment_zk7_branch#known_issues until it is. -->
