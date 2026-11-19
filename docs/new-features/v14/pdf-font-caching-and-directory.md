# PDF font caching and default directory

> Cache the PDF font mapper, register custom AWT fonts, and default the PDF font directory to IDEMPIERE_HOME/fonts.

**Goal:** Technical  
**Developer:** [Heng Sin Low](https://github.com/hengsin)  
**Feature Ticket:** [IDEMPIERE-7212](https://idempiere.atlassian.net/browse/IDEMPIERE-7212)  
**Version:** iDempiere 14

## The problem

PDF generation in `org.adempiere.pdf.Document` had three limitations when using custom fonts:

1. `Document.writePDF(Pageable, OutputStream)` created a new `DefaultFontMapper` on every PDF export and re-scanned the configured font directory each time, slowing down frequent or batch PDF generation.
2. Custom fonts in `PDF_FONT_DIR` were only added to `DefaultFontMapper` for OpenPDF embedding. If those fonts were not also installed in the operating system, Java AWT fell back to default font metrics during report layout.
3. Administrators had to explicitly configure the `PDF_FONT_DIR` System Configurator key before custom fonts could be loaded.

## What changed

1. **Cached `DefaultFontMapper`:** `Document` caches `DefaultFontMapper` instances by resolved font directory path in a `CCache` (`Document_DefaultFontMapper`) bound to `AD_SysConfig`. Repeated PDF exports reuse the cached mapper instead of scanning the directory again.
2. **Default font directory:** When `PDF_FONT_DIR` is unset or empty, iDempiere automatically uses the `fonts` subdirectory under `IDEMPIERE_HOME` (`Ini.getAdempiereHome()`). If that directory exists, its fonts are loaded without extra configuration.
3. **Custom AWT font registration:** `Document.registerCustomAwtFonts()` scans the resolved font directory for `.ttf`, `.otf`, and `.ttc` files and registers them with Java AWT's `GraphicsEnvironment`. `ReportEngine.layout()` calls this method before creating the `LayoutEngine` so report layout metrics match the fonts embedded in the PDF.
4. **Cache Reset support:** Both font caches (`Document_DefaultFontMapper` and `Document_AwtFonts`) use `AD_SysConfig` as their cache table. Running **Cache Reset** picks up changes to `PDF_FONT_DIR` or newly added font files without restarting the server.

## How to set it up

### Use the default font directory

1. Create a `fonts` directory inside `IDEMPIERE_HOME` if it does not already exist.
2. Copy your `.ttf`, `.otf`, or `.ttc` font files into `IDEMPIERE_HOME/fonts`.
3. If the server is already running and has generated a PDF or report layout, run the **Cache Reset** process so iDempiere loads the new fonts.

### Use a custom font directory

1. Log in with the System Administrator role.
2. Open the **System Configurator** window.
3. Search for or create the `PDF_FONT_DIR` record at the **System** configuration level.
4. Set **Search Key** (`Value`) to the full path of your font directory.
5. Save the record and run **Cache Reset** if the server is already running.

## Configuration

| System Configurator key | Default | Level | What it does |
| --- | --- | --- | --- |
| `PDF_FONT_DIR` | Empty (falls back to `IDEMPIERE_HOME/fonts`) | System | Directory scanned for custom `.ttf`, `.otf`, and `.ttc` font files for AWT registration and PDF embedding. |

## Technical notes

- `org.adempiere.pdf.Document.registerCustomAwtFonts()` is a public static method that resolves the font directory from `MSysConfig.getValue(MSysConfig.PDF_FONT_DIR, "")` or `new File(Ini.getAdempiereHome().trim(), "fonts").getPath()`. It loads `.ttf`, `.otf`, and `.ttc` files with `Font.createFonts(file)` and registers them in `GraphicsEnvironment.getLocalGraphicsEnvironment()`. Unreadable or invalid font files log a warning without interrupting the remaining files.
- `Document` maintains two `CCache` instances backed by `MSysConfig.Table_Name`:
  - `Document_DefaultFontMapper` (`CCache<String, DefaultFontMapper>`): stores one `DefaultFontMapper` per resolved directory path. `FontFactory.registerDirectories()` is invoked once before building the first mapper.
  - `Document_AwtFonts` (`CCache<String, Boolean>`): records directory paths whose fonts have already been registered with AWT.
- `org.compiere.print.ReportEngine.layout()` calls `Document.registerCustomAwtFonts()` prior to instantiating `LayoutEngine`.
- `ServerReportCtlTest.testCustomPdfFontDirectory()` covers empty and custom `PDF_FONT_DIR` resolution, invalid font file handling, AWT font registration, PDF font embedding, and `CacheMgt` reset behavior.

## Migration impact

None. Existing `PDF_FONT_DIR` configurations continue to work as before. Installations with an unset or empty `PDF_FONT_DIR` now scan `IDEMPIERE_HOME/fonts` automatically when that directory exists.

## Related tickets

- [IDEMPIERE-7212](https://idempiere.atlassian.net/browse/IDEMPIERE-7212)
