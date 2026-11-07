---
sidebar_position: 4
description: Install fonts on an iDempiere server or in a Docker image, and check which fonts a server has and which fonts a PDF contains.
tags: [technical]
applies_to: ">=10"
last_reviewed: 2026-11-07
---
# Install fonts on servers

This page is for administrators: which font packages a server needs, how to add your own fonts, and how to check a server and a PDF. Applies to iDempiere 10 and later.

## Install fonts

The iDempiere server needs fontconfig and at least one set of fonts, also when it runs without a screen. Without them, printing and charts fail, for example with `java.lang.InternalError` or `InvocationTargetException`. See also [Install prerequisites](../../basic-installation/installing-for-execution/install-prerequisites.md) and [Post installation](../../basic-installation/installing-for-execution/post-installation.md).

On Debian or Ubuntu:

```bash
sudo apt install fontconfig fonts-dejavu fonts-liberation
```

On RHEL, Rocky Linux or Amazon Linux 2023 (package names can differ between releases):

```bash
sudo dnf install fontconfig dejavu-sans-fonts dejavu-serif-fonts dejavu-sans-mono-fonts liberation-fonts
```

To add your own font files, copy them into a folder below `/usr/share/fonts/`, run `fc-cache -f` and restart iDempiere. The server reads its list of fonts only when it starts.

## Docker images

Put the fonts into the image, so every container has the same fonts. For an image based on Debian or Ubuntu:

```dockerfile title="Dockerfile"
RUN apt-get update \
 && apt-get install -y --no-install-recommends fontconfig fonts-dejavu fonts-liberation \
 && rm -rf /var/lib/apt/lists/*
COPY fonts/ /usr/share/fonts/truetype/company/
RUN fc-cache -f
```

If the base image runs as another user, switch to `root` first with `USER root`.

:::tip

Use the same font packages and font files on every server and in every image: development, test and production. Otherwise the Java logical fonts (`SansSerif`, `Serif`, `Dialog`) can turn into different fonts on each server, and documents look different.

:::

## Check a server

List the font families the server has:

```bash
fc-list : family | sort -u
```

## Check a PDF

List the fonts inside a PDF with `pdffonts` (in the `poppler-utils` package):

```bash
pdffonts invoice.pdf
```

- The `emb` column shows whether a font is embedded. A font with `emb` set to `no` comes from the computer that opens the PDF, so the document can look different there.
- The `encoding` column shows the encoding. `WinAnsi` is `Cp1252`: letters outside it are lost. `Identity-H` keeps all letters.

## Related pages

- [Fonts in print formats and reports](./index.md)
- [How fonts work in Java](./how-fonts-work-in-java.md)
- [Docker](../../basic-installation/docker.md)
