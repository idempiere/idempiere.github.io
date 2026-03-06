---
sidebar_position: 2
---

# Download the Code

## Cloning iDempiere

iDempiere sources are hosted at [GitHub](https://github.com/idempiere/idempiere). You can download the complete project with:

```bash
cd $HOME/sources
git clone https://github.com/idempiere/idempiere.git
```

:::tip Folder Location

Please replace `$HOME/sources` with the folder where you wish to download the whole sources. At least **3 GB** are required.

:::

:::warning Folder Naming

Make sure the name of the folder doesn't contain spaces.

:::

## Set the Working Version

### master

If you are going to work with iDempiere development version (a.k.a 13) please execute:

```bash
cd $HOME/sources/idempiere
git switch master
```

### release-12

If you are going to work with iDempiere version 12:

```bash
cd $HOME/sources/idempiere
git switch release-12
```

## Keeping Up to Date

When you want to synchronize your local clone with GitHub again you can do it with:

```bash
cd $HOME/sources/idempiere
git pull
```

---

*This How-To is brought to you by Carlos Ruiz from [BX Service GmbH](https://www.bx-service.com/). Feel free to improve directly or suggest using the Discussion tab.*
