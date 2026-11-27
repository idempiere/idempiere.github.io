---
sidebar_position: 1
description: Start page for fonts in iDempiere documents, with the page for each role, how to choose a font and a checklist for a new document.
tags: [development, technical]
applies_to: ">=10"
last_reviewed: 2026-11-07
---
# Fonts in print formats and reports

Start here when a document prints with the wrong font or with missing letters, or before you design a new document. Applies to iDempiere 10 and later.

:::tip[In short]

- iDempiere uses the fonts installed on the server, not the fonts on your computer.
- When a font is missing, iDempiere uses another font and shows no error.
- PDFs made from print formats lose letters that are not in Western European encoding, for example `ľ č ť ő ł`. Printing from the browser prints that PDF, so it loses them too.
- For documents in such languages, use a JasperReports report with a font that is embedded in the PDF.
- Install the same fonts on every server, so documents look the same everywhere.

:::

## Find your page

| I want to | Page |
| --- | --- |
| Pick the font of a print format, or find out why letters are missing in its PDF | [Fonts in print formats](./print-formats.md) |
| Use a font in a JasperReports report, or add our own font | [Fonts in JasperReports](./jasperreports.md) |
| Install fonts on a server or in a Docker image, and check a PDF | [Install fonts on servers](./install-fonts-on-servers.md) |
| Understand the code, the Java font list and the memory use | [How fonts work in Java](./how-fonts-work-in-java.md) |
| Print a document in the customer's language | [Translate documents and printouts](../../translation-localization/translate-documents-and-printouts.md) |

## How iDempiere prints a document

You design a document in one of two ways:

- **Print formats**, in the Print Format window. Most standard documents, such as invoices and orders, are print formats.
- **JasperReports reports**, as `.jrxml` files attached to a process.

The server creates the document. It lays out the text with the fonts it has, then makes one of these:

- a **PDF**: for preview, download, email and the document archive;
- a **direct print** to a printer that is defined on the server;
- an **HTML, Excel or other export**.

When you print from the browser, the browser prints the PDF. So the PDF decides what you see on paper.

## Choose a font

| Your document | What to use |
| --- | --- |
| Print format, Western European language only (for example English, German, Spanish) | Any font installed on the server. To make the PDF look the same on every computer, embed the font, see [Embed fonts with PDF_FONT_DIR](./print-formats.md#embed-fonts-with-pdf_font_dir). |
| Print format, language with other letters (for example Czech, Slovak, Polish, Hungarian, Greek, Russian) | The PDF loses these letters. Let a Jasper report create the PDF: in the Print Format window, fill the Jasper Process field. See [Letters that get lost](./print-formats.md#letters-that-get-lost). |
| JasperReports report, European languages | `DejaVu Sans`, `DejaVu Serif` or `DejaVu Sans Mono`. They come with iDempiere and are embedded in the PDF. |
| JasperReports report with your company font | A font extension with your font, see [Add your own fonts](./jasperreports.md#add-your-own-fonts). |
| Chinese, Japanese or Korean text | DejaVu has no letters for these languages. Use a font extension with a font that has them. |

## Checklist for a new document

1. Choose the font with the table above.
2. Check that every server has the font, with `fc-list`, or deliver it with a plug-in.
3. For a print format whose PDF must look the same everywhere, put the font into `PDF_FONT_DIR`.
4. For a JasperReports report, set `fontName` to a DejaVu family or to the family of your font extension.
5. Print a test document with real data in every language it is used in.
6. Check the PDF with `pdffonts`, see [Check a PDF](./install-fonts-on-servers.md#check-a-pdf).
7. Open the PDF on a computer that does not have the font, and check that every letter is shown.

## Related pages

- [Print Format Editor](../../new-features/v9/print-format-editor.md)
- [Translate documents and printouts](../../translation-localization/translate-documents-and-printouts.md)
- [System Configurator](../system-configurator.md#PDF_FONT_DIR)
