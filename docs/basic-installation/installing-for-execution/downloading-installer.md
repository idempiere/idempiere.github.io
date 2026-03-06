---
sidebar_position: 2
---

# Downloading Installer

iDempiere version 12 is maintained and stable. This is the recommended version to install for implementation and production purposes.

You can find daily installers for this version at [https://sourceforge.net/projects/idempiere/files/v12/daily-server/](https://sourceforge.net/projects/idempiere/files/v12/daily-server/)

For example, you can download the latest with these commands:

```shell
wget https://sourceforge.net/projects/idempiere/files/v12/daily-server/idempiereServer12Daily.gtk.linux.x86_64.zip
```

```shell
wget https://sourceforge.net/projects/idempiere/files/v12/daily-server/idempiereServer12Daily.gtk.linux.x86_64.zip.MD5
```

```shell
md5sum -c idempiereServer12Daily.gtk.linux.x86_64.zip.MD5
```

The next step is [Installing from Installers](./installing-from-installers.md)

## Daily Installers for Development version

Daily builds for linux64 and windows64 platforms can be found here: https://sourceforge.net/projects/idempiere/files/devel/daily-server/

:::caution

Development version is pretty stable, but it can be at some times unstable, so it is recommended to install it for testing purposes, and to check new features, but not for production.

:::

## Previous Release Installers

You can find the official installers for previous releases (with corresponding MD5 checksum) at sourceforge: https://sourceforge.net/projects/idempiere/files/

:::caution

Please note that iDempiere has maintenance updates just on the latest stable release. Installing a previous version is not recommended.

:::