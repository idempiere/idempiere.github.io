---
sidebar_position: 2
description: How a print format gets its fonts, which letters its PDF loses, and how to embed fonts with PDF_FONT_DIR.
tags: [development, technical]
applies_to: ">=10"
last_reviewed: 2026-11-08
---
# Fonts in print formats

This page is for people who design print formats: how to set a font, what ends up in the PDF, and why some letters get lost. Applies to iDempiere 10 and later.

## Set the font

Every print format, and every item in it, has a Print Font. You define the fonts in the Print Font window. The Code field has the form `<name>-<style>-<size>`:

| Code | Font |
| --- | --- |
| `SansSerif-PLAIN-10` | The Java font SansSerif, plain, 10 pt |
| `Arial-BOLD-12` | Arial, bold, 12 pt |
| `Helvetica Neue Condensed Black-13` | The face "Helvetica Neue Condensed Black", 13 pt. You can use a face name directly, without a style. |

- The styles are `PLAIN`, `BOLD`, `ITALIC` and `BOLDITALIC`.
- `Dialog`, `DialogInput`, `SansSerif`, `Serif` and `Monospaced` are Java logical fonts. The server replaces them with one of its installed fonts, so they can look different on two servers.
- Any other name must be a font installed on the server. You can check this with `fc-list`, see [Check a server](./install-fonts-on-servers.md#check-a-server).
- In a table (list) print format, the header and the totals take their fonts from the Print Table Format window, not from the items. If a font change seems to do nothing, look there.
- Without fonts of their own there, the header and the totals take the print format's font in bold and bold italic. Give the print format a family name (`Helvetica Neue`), not one face (`Helvetica Neue Medium`), or they can lose bold, see [How Java finds fonts](./how-fonts-work-in-java.md#how-java-finds-fonts).

:::warning

If the server does not have the font, iDempiere uses `Dialog` instead and logs nothing. A print format that looks right on a computer with the font can look different on a server without it.

:::

## What ends up in the PDF

When iDempiere makes a PDF from a print format, it replaces each font with a PDF font:

1. **Your font file, embedded.** This happens when a font file in the [`PDF_FONT_DIR`](#embed-fonts-with-pdf_font_dir) directory has the same full font name. The full font name is stored inside the file, for example "Arial Bold". The file name does not matter.
2. **Otherwise a standard PDF font, not embedded.** The computer that opens the PDF draws it with a similar font of its own. The choice follows the name in the Print Font code:
   - Courier for `Monospaced`, `DialogInput` and `Courier`. With the OpenPDF version of the current master branch (1.3.39), also for every name that contains "mono" or starts with "courier", such as "Courier New".
   - Times for `Serif` and `TimesRoman`.
   - Helvetica for every other font, also for "Times New Roman".

In both cases the text is stored with the `Cp1252` (Western European) encoding.

Direct printing to a printer that is defined on the server skips this step. The server draws the pages with its own fonts, so the letters are not limited to `Cp1252`. Printing from the browser prints the PDF, so it has the same limits as the PDF.

## Letters that get lost

Letters that are not in `Cp1252` disappear from the PDF of a print format. This affects most Central and Eastern European languages, and every language that does not use the Latin alphabet.

This text was printed from a print format and read back from the PDF: `Žltý kôň: ľ š č ť ž ĺ ŕ ő ű ą ł €`

| Font | PDF font | Text in the PDF |
| --- | --- | --- |
| Not in `PDF_FONT_DIR` | Helvetica, not embedded | `Žltý kô:  š   ž       €` |
| Arial, in `PDF_FONT_DIR` and installed on the server | ArialMT, embedded | `Žltý kô:  š   ž       €` |

Embedding the font does not help, because the encoding is still `Cp1252`. There is no setting for the encoding of print format PDFs.

What you can do:

- Let a JasperReports report create the PDF: in the Print Format window, fill the Jasper Process field. The PDF of that print format then comes from the report. See [Fonts in JasperReports](./jasperreports.md).
- Print directly on a printer defined on the server. The paper output is not limited to `Cp1252`. If automatic archiving is enabled, the archive PDF still uses `Cp1252` and can lose those letters. When the archived document must keep them, use the JasperReports path.

## Embed fonts with PDF_FONT_DIR

The [`PDF_FONT_DIR`](../system-configurator.md#PDF_FONT_DIR) key of the System Configurator names a directory with `.ttf`, `.otf` or `.ttc` files. Fonts in this directory are embedded in print format PDFs, so the PDF looks the same on every computer.

- Set the key for the System Tenant. iDempiere reads it only there.
- The value is a path on the server, not on your computer. Subfolders are not read.
- The font must also be installed on the server. `PDF_FONT_DIR` only tells the PDF where the file is. Without the installed font, the layout uses `Dialog`, and no file matches.
- iDempiere reads the directory again for every PDF, and opens every font file in it. Keep only the fonts you need there. Many fonts slow down every PDF.

## Related pages

- [Fonts in print formats and reports](./index.md)
- [Install fonts on servers](./install-fonts-on-servers.md)
- [How fonts work in Java](./how-fonts-work-in-java.md)
- [Print Format Editor](../../new-features/v9/print-format-editor.md)
