---
title: "Extensible Report Content Generation"
sidebar_label: "Extensible Report Content Generation"
sidebar_position: 15
description: "UI-independent OSGi extension points for report rendering and post-processing."
tags: [technical]
---

# Extensible Report Content Generation

**Goal:** New OSGi Services

**Developer:** Markus Bozem

**Feature Ticket:** [IDEMPIERE-7070](https://idempiere.atlassian.net/browse/IDEMPIERE-7070)

## Overview

This enhancement adds UI-independent and report-engine-independent extension points for report content generation.

Plug-ins can provide alternative report renderers and post-process generated documents without depending on the ZK report viewer and without changing core classes.

The change separates initial rendering from later content processing. A typical chain is:

1. Generate the initial PDF.
2. Add ZUGFeRD/Factur-X data.
3. Convert to PDF/A.
4. Add PDF attachments.
5. Add a watermark.
6. Sign or encrypt the final document.

Each step can be an independent OSGi service with a defined execution order.

## Problem

Before this change, the report extension mechanism lived in the ZK report viewer and exposed ZK-specific and Jasper-specific types.

That caused these limits:

* Headless and server-side consumers could not use the extension.
* Paths that called `ReportEngine` directly bypassed plug-in output.
* The mechanism was tied to Jasper Reports.
* Only one renderer could handle a request, so independent enhancements could not be combined cleanly.
* Preview and download names could expose the random suffix of an internal temporary Jasper file.

## Architecture

Report content generation has two stages:

```text
ReportContentRequest
        |
        v
ranked IReportContentRendererFactory services
        |
        +-- first applicable renderer
        |
        +-- ReportEngine fallback
        |
        v
initial report content
        |
        v
all applicable IReportContentProcessor services
in descending service-ranking order
        |
        v
final processed content
```

### Content request

`ReportContentRequest` is the common input for rendering and post-processing. Source: `org.adempiere.base/src/org/idempiere/print/ReportContentRequest.java`.

```java
public record ReportContentRequest(
        ReportEngine reportEngine,
        ProcessInfo processInfo,
        String title,
        boolean applyPostProcessing) {
}
```

The three-argument constructor enables post-processing by default:

```java
ReportContentRequest request =
        new ReportContentRequest(reportEngine, processInfo, reportTitle);
```

Post-processing can be disabled explicitly:

```java
ReportContentRequest request =
        new ReportContentRequest(reportEngine, processInfo, reportTitle, false);
```

The request gives access to `printFormat()` and `printInfo()`. The report context keeps process parameters, record ID, record UUID, record selections, language, user and tenant context, transaction context, and the requested PDF file name.

### Stage 1: rendering

A plug-in registers an `IReportContentRendererFactory` OSGi service. Source: `org.adempiere.base/src/org/idempiere/print/IReportContentRendererFactory.java`.

```java
public interface IReportContentRendererFactory {
    IReportContentRenderer createRenderer(ReportContentRequest request);
}
```

Factories run in descending `service.ranking` order. A factory returns a renderer when it supports the request, else `null`. The first applicable renderer wins.

A renderer implements `IReportContentRenderer`:

```java
public interface IReportContentRenderer {
    File getContent(String contentType, String fileExtension);

    ReportContentType[] getSupportedContentTypes();

    default int getRowCount() {
        return -1;
    }
}
```

Supported output types use `ReportContentType` and have no UI dependency:

```java
public record ReportContentType(
        String name,
        String fileExtension,
        String contentType) {
}
```

Example registration:

```java
@Component(
    service = IReportContentRendererFactory.class,
    immediate = true,
    property = "service.ranking:Integer=100"
)
public class CustomReportContentRendererFactory
        implements IReportContentRendererFactory {

    @Override
    public IReportContentRenderer createRenderer(
            ReportContentRequest request) {
        if (!supports(request))
            return null;

        return new CustomReportContentRenderer(request);
    }
}
```

The default Jasper renderer comes from the `org.adempiere.report.jasper` bundle with ranking `0`. It supports PDF, HTML, CSV, XLS, XLSX, and SSV.

If no factory handles the request, core falls back to the standard `ReportEngine`. The fallback supports PDF, HTML, CSV, XLS, and XLSX.

### Stage 2: post-processing

After rendering, every applicable `IReportContentProcessor` runs. Source: `org.adempiere.base/src/org/idempiere/print/IReportContentProcessor.java`.

```java
public interface IReportContentProcessor {

    boolean isApplicable(
            ReportContentRequest request,
            String contentType,
            String fileExtension);

    File process(
            ReportContentRequest request,
            String contentType,
            String fileExtension,
            File input);
}
```

Processors run in descending `service.ranking` order. Each processor receives the result of the previous processor.

A processor can change the input file and return it, or create and return a new file. It must not return `null`. A `null` result raises an `AdempiereException`.

Typical uses:

* ZUGFeRD/Factur-X data
* PDF/A conversion
* PDF attachments
* Watermarks
* Digital signatures
* Encryption

Example registration:

```java
@Component(
    service = IReportContentProcessor.class,
    immediate = true,
    property = "service.ranking:Integer=100"
)
public class CustomPDFProcessor
        implements IReportContentProcessor {

    @Override
    public boolean isApplicable(
            ReportContentRequest request,
            String contentType,
            String fileExtension) {
        return "application/pdf".equals(contentType)
                || "pdf".equalsIgnoreCase(fileExtension);
    }

    @Override
    public File process(
            ReportContentRequest request,
            String contentType,
            String fileExtension,
            File input) {
        // Modify input or create a new output file.
        return input;
    }
}
```

The processor chain applies to custom renderer output and to `ReportEngine` fallback output.

## Central API

The API lives in `org.adempiere.base.Core`:

```java
IReportContentRenderer getReportContentRenderer(
        ReportContentRequest request);

File getReportContent(
        ReportContentRequest request,
        String contentType,
        String fileExtension);

File getReportContent(
        ReportContentRequest request,
        String contentType,
        String fileExtension,
        File outputFile);

File processReportContent(
        ReportContentRequest request,
        String contentType,
        String fileExtension,
        File content);
```

When an output file is supplied, only the final processed content is copied to that target. Intermediate files are not copied. Failures raise an exception instead of returning an incomplete result.

## Affected report paths

Pull request #3318 routes these paths through the common API:

* ZK report preview and export
* Legacy direct Jasper viewer
* Report email attachments
* Report archiving
* Workflow reports
* Server-side exports
* Document PDF generation
* Batch-print processes
* Payment and remittance printing
* Dunning and invoice printing

Document generation for orders, invoices, shipments, distribution orders, and RFQ responses is included. The direct-printer path is unchanged.

## Viewer behavior

The ZK report viewer uses the common renderer and processor chain.

Processed content is cached per MIME type and file extension. Preview, export, email, and archive actions reuse the same final result. This matters for signing, attachments, ZUGFeRD generation, and PDF/A conversion. Without caching, those processors could run more than once for the same output.

The viewer also:

* Shows only formats supported by the active renderer.
* Preserves the original `ProcessInfo`.
* Preserves record UUIDs.
* Refreshes native print data after a print format change.
* Uses the logical report name for preview and download media.
* Keeps unique names for internal temporary files.

Users no longer see the random suffix of an internal Jasper temporary file in the preview or download name.

## Interactive HTML type

Pull request #3349 adds an internal content type for viewer-interactive HTML:

```java
public static final String HTML_INTERACTIVE_CONTENT_TYPE = "text/html; mode=interactive";
```

Content sent to a browser still uses `text/html`. Only renderers that produce viewer-interactive HTML with drill-down links should advertise this type. The `ReportEngine` fallback returns `null` for this type. The viewer keeps interactive HTML separate from plain HTML export.

The same pull request adds `FileUtil.makeASCIIPrefix(String)` for ASCII-safe temporary file prefixes used in download links.

## Compatibility

* Existing Jasper reports run through the default renderer in the Jasper bundle.
* Other engines can register their own factory.
* Requests without a matching renderer fall back to `ReportEngine`.
* Installations without a processor receive the original content unchanged.
* Headless installations can use the APIs without the ZK bundle.
* Existing viewer export formats remain.
* Legacy `ZkJRViewer` adapters remain.
* Direct-printer behavior is unchanged.
* No database migration is required.

## Example use cases

### ZUGFeRD and Factur-X

A processor can embed ZUGFeRD/Factur-X XML into a PDF from any renderer. This keeps e-invoice generation in the normal Print, Preview, Email, and Archive flow.

The same processor works with output from the native engine, Jasper Reports, a FreeMarker-based renderer, or another custom engine.

### PDF attachments

A processor can attach extra documents to the generated report. An example is a drawing attached to an order PDF.

### Alternative engines

A FreeMarker-based print-template plug-in can inspect the print format in `ReportContentRequest`, return its own renderer, and use the same post-processing pipeline as Jasper or the native engine.

## Related links

* [IDEMPIERE-7070](https://idempiere.atlassian.net/browse/IDEMPIERE-7070)
* [Pull request #3318](https://github.com/idempiere/idempiere/pull/3318)
* [Pull request #3349](https://github.com/idempiere/idempiere/pull/3349)
* [IDEMPIERE-6069](https://idempiere.atlassian.net/browse/IDEMPIERE-6069)
