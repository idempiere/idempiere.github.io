---
sidebar_position: 8
---

# Building iDempiere without Eclipse

It is possible to build iDempiere without Eclipse; you just need `openjdk-17-jdk`.

## Clone iDempiere code

- Clone the repository you downloaded in [Download the Code](./download-the-code) (you can also use your actual installation, but cloning avoids mixing environments).

```bash
cd $HOME/sources  # Or use the folder where you downloaded the idempiere project
git clone idempiere testheadless
```

## Materialize and build the project

- Navigate to the folder:

```bash
cd $HOME/sources/testheadless
```

- Position in the branch you want to compile:

```bash
# if building development (master) branch
git switch master

# if building release 12 branch
git switch release-12
```

- Build:

```bash
./mvnw verify
```

- After this step, the uncompressed servers can be found at:

```bash
# linux 64 bit version
$HOME/sources/testheadless/org.idempiere.p2/target/products/org.adempiere.server.product/linux/gtk/x86_64

# windows 64 bit version
$HOME/sources/testheadless/org.idempiere.p2/target/products/org.adempiere.server.product/win32/win32/x86_64
```

You can compress those folders with your preferred compressor to use them as installers.

---

*This tutorial is brought to you by Carlos Ruiz from [BX Service GmbH](https://www.bx-service.com/). Feel free to improve directly or suggest using the Discussion tab.*
