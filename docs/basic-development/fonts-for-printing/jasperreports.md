---
sidebar_position: 3
description: Which fonts JasperReports reports can use in iDempiere, how to add your own font as a font extension, and what happens without one.
tags: [development, technical]
applies_to: ">=10"
last_reviewed: 2026-11-07
---
# Fonts in JasperReports

This page is for people who build JasperReports reports: which fonts to use, how to add your own font, and why some reports lose letters. Applies to iDempiere 10 and later.

## Fonts that come with iDempiere

iDempiere includes the DejaVu fonts for JasperReports (the `jasperreports-fonts` package in the `org.adempiere.report.jasper.library` bundle). Use one of these as `fontName`:

| `fontName` | In the PDF |
| --- | --- |
| `DejaVu Sans` | DejaVu Sans, embedded, `Identity-H` |
| `DejaVu Serif` | DejaVu Serif, embedded, `Identity-H` |
| `DejaVu Sans Mono` | DejaVu Sans Mono, embedded, `Identity-H` |

These fonts print Latin, Greek and Cyrillic letters. They look the same on every server, because the font files come with iDempiere.

The package also lists `SansSerif`, `Serif` and `Monospaced`, but only for HTML export. In a PDF, `SansSerif` does not become DejaVu, see [Reports without a font extension](#reports-without-a-font-extension).

## Add your own fonts

To use your own font, deliver it as a font extension: the font files, plus a `fonts.xml` that names the font families. In iDempiere, a font extension is an OSGi fragment of the JasperReports bundle, `net.sf.jasperreports.engine`.

```text title="META-INF/MANIFEST.MF"
Bundle-ManifestVersion: 2
Bundle-SymbolicName: org.example.report.fonts
Bundle-Version: 1.0.0.qualifier
Fragment-Host: net.sf.jasperreports.engine
```

```properties title="build.properties"
source.. = src/
output.. = target/classes/
bin.includes = META-INF/,\
               .
```

Put `jasperreports_extension.properties` and the `fonts/` folder into `src/`, so they end up at the root of the bundle:

```properties title="jasperreports_extension.properties"
net.sf.jasperreports.extension.registry.factory.simple.font.families=net.sf.jasperreports.engine.fonts.SimpleFontExtensionsRegistryFactory
net.sf.jasperreports.extension.simple.font.families.example=fonts/fonts.xml
```

```xml title="fonts/fonts.xml"
<fontFamilies>
  <fontFamily name="Example Sans">
    <normal>fonts/ExampleSans-Regular.ttf</normal>
    <bold>fonts/ExampleSans-Bold.ttf</bold>
    <italic>fonts/ExampleSans-Italic.ttf</italic>
    <boldItalic>fonts/ExampleSans-BoldItalic.ttf</boldItalic>
    <pdfEncoding>Identity-H</pdfEncoding>
    <pdfEmbedded>true</pdfEmbedded>
  </fontFamily>
</fontFamilies>
```

- In the report, `fontName` must be exactly the family name from `fonts.xml`, here `Example Sans`. The name inside the font file does not matter.
- Keep `Identity-H` and `pdfEmbedded` set to `true`, so the PDF contains every letter and looks the same on every computer.
- After you install the fragment, restart the server, or refresh the JasperReports bundle. A fragment is attached only when its host bundle starts.
- Only include fonts whose license allows you to share them.

:::note

Fonts and report files are delivered in different ways. Report files (`.jasper`, `.jrxml`, images and subreports) go into an attachment, a folder, a web server or a bundle, see [Jasper Report Deployment Refactoring and Improvement](../../new-features/v9/jasper-report-deployment-refactoring-and-improvement.md). Fonts go into a font extension, as shown above.

:::

## Reports without a font extension

When the `fontName` of a text field is not a family of a font extension, JasperReports lays out the text with the font installed on the server. It takes the PDF font from these attributes of the field:

| Attribute | Default | What it does |
| --- | --- | --- |
| `pdfFontName` | `Helvetica` | Standard PDF font or font file |
| `pdfEncoding` | `Cp1252` | Letters outside this encoding are lost |
| `isPdfEmbedded` | `false` | Whether the font file goes into the PDF |

- These attributes are deprecated in JasperReports 6, and you must set them on every field.
- With the defaults, a report loses the same letters as a print format. Use a font extension instead.
- A field without a `fontName` uses the default font `SansSerif` (property `net.sf.jasperreports.default.font.name`). In a PDF, it also gets Helvetica with `Cp1252`.

## Missing fonts

When a report names a font that is neither in a font extension nor installed on the server, the report still runs. iDempiere tells JasperReports to ignore missing fonts (`net.sf.jasperreports.awt.ignore.missing.font` is `true`, set in `ReportStarter`). JasperReports then uses its default font and shows no error.

## Related pages

- [Fonts in print formats and reports](./index.md)
- [Translate documents and printouts](../../translation-localization/translate-documents-and-printouts.md)
- [Jasper Report Deployment Refactoring and Improvement](../../new-features/v9/jasper-report-deployment-refactoring-and-improvement.md)
- [AD_Message+AD_Element Resource Bundle for Jasper Report](../../new-features/v9/admessageadelement-resource-bundle-for-jasper-report.md)
- [Extend Jasper Engine](../../new-features/v6.2/extend-jasper-engine.md)
