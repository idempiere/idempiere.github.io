---
sidebar_position: 5
description: For developers, the classes a print format goes through, how the JDK finds fonts, and the native memory that font rendering uses.
tags: [development, technical]
applies_to: ">=10"
last_reviewed: 2026-11-08
---
# How fonts work in Java

This page is for developers and for administrators who size servers: the classes a print format goes through, how Java finds fonts, and the memory that fonts use. Applies to iDempiere 10 and later.

## Code path of a print format

These classes in `org.adempiere.base` take part:

1. `ReportEngine` loads the print format and the data.
2. `LayoutEngine` (package `org.compiere.print.layout`) builds the pages. Each text field gets its Java font from `MPrintFont.get(AD_PrintFont_ID).getFont()`, which calls `java.awt.Font.decode()` on the Print Font code. Without a Print Font on the item, the Print Font of the print format is used.
3. The pages go to an output:

| Output | Path through the code | Fonts |
| --- | --- | --- |
| PDF | `ReportEngine.createPDF()` => `PDFReportRenderer` => `Document.writePDF()`. In iDempiere 10, `createPDF()` calls `Document.getPDFAsFile()` and `createPDFData()` calls `Document.getPDFAsArray()`. A print format with a Jasper Process creates its PDF with that report instead, but only through `createPDF()`. `createPDFData()` does not run the Jasper Process and returns `null` for such a print format, so use `createPDF()` for Jasper-backed PDFs. | `Document` creates an OpenPDF `DefaultFontMapper`, adds the fonts of `PDF_FONT_DIR`, and draws the pages through `PdfGraphics2D`. The mapper uses `Cp1252`. |
| Document archive | `ArchiveEngine` => `Document.getPDFAsArray()` | Same as the PDF |
| Direct print | `ReportEngine.print()` => `PrintUtil.print()` => `java.awt.print.PrinterJob` | Java fonts, sent through the Java print service |
| Report renderer from a plug-in (only in versions with [Extensible Report Content Generation](../../new-features/v13/extensible-report-content-generation.md)) | `IReportContentRendererFactory` services | Chosen by the plug-in |

The layout always uses Java fonts, whatever the output. A font that Java does not know changes the layout of every output, not only the PDF.

## How Java finds fonts

The JDK keeps its own list of fonts. iDempiere does not manage fonts itself.

- **Font list:** the first time a font is used, the JDK reads the fonts of the operating system through fontconfig. It does not read them again until the JVM restarts.
- **Logical fonts:** `Dialog`, `DialogInput`, `SansSerif`, `Serif` and `Monospaced` are mapped to installed fonts through fontconfig. If the JDK has its own `fontconfig.properties` file in its `lib` directory, that file sets this mapping instead.
- **Fonts from a plug-in:** a plug-in can add a font file for its JVM with `Font.createFont()` and `GraphicsEnvironment.registerFont()`. Java then knows the font, but fontconfig and other programs do not. `registerFont()` returns `false` when Java already knows a font with the same name, for example from the operating system. The font that was there first is used. Some JDKs bring their own fonts, for example DejaVu in Amazon Corretto.
- **Styles of a face:** for a face name such as "Helvetica Neue Medium", Java returns that face for every style. Only fontconfig turns it into the bold face of the family, so this works only for fonts installed on the operating system ([IDEMPIERE-7201](https://idempiere.atlassian.net/browse/IDEMPIERE-7201)).
- **macOS:** Java finds a face there only by its PostScript name (`HelveticaNeue-Medium`), so a print format can fall back to another font.
- **Headless servers:** with `-Djava.awt.headless=true`, Java still needs fontconfig and font files. It only skips the screen.

## Memory

The JDK draws text with its native font library (`libfontmanager`, which uses FreeType and HarfBuzz). Font data and glyph images are kept in native memory, outside the Java heap. Many fonts, many font sizes and parallel print jobs can increase the memory of the server process, and this does not show in the Java heap or in heap dumps.

When you size the memory of a server or a container, leave room above the maximum heap (`-Xmx`) for this native memory.

## Related pages

- [Fonts in print formats and reports](./index.md)
- [Fonts in print formats](./print-formats.md)
- [Extensible Report Content Generation](../../new-features/v13/extensible-report-content-generation.md)
