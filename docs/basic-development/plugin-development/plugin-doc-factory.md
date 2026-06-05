---
title: Using IDocFactory for Custom Accounting
sidebar_label: Document Factory
sidebar_position: 11
description: Learn how to implement custom accounting for core documents in iDempiere using the IDocFactory service.
---

# Using IDocFactory for Custom Accounting

## Goal

The goal of this tutorial is to show how to use the `IDocFactory` service in your plug-in project. Use the document factory service when you need to provide your own method for posting accounting entries for core documents (invoices, shipments, payments, etc.) or for your own custom document types. In this example, we change the way invoices are accounted.

## Prerequisites

Before you start, review the following tutorials:

- [Developing Plug-Ins Without Affecting the Core](./developing-plugins)
- [Running Plug-ins Locally in iDempiere](./plugin-running-locally)

## Workflow

After creating the plug-in and setting its dependencies, click on **File > New > Other** and select **Component Definition** from the Plug-in Development section.

Click **Next**. Select your plug-in project (OSGI folder) and choose a file name and a general name. In this example, we used `DocFactory.xml` and `org.idempierelbr.tax.DocFactory` for filename/name, but any name works. You don't need to set the class name yet. Click **Finish**.

You will need two classes:

- A `Doc_Invoice` — a class that extends `Doc`
- A `DocFactory` — a class that implements `IDocFactory`

You only need one `DocFactory` for all your `Doc_*` classes. To keep things simple, copy the original `Doc_Invoice.java` from `org.adempiere.base/src/org.compiere.acct/`.

The second class implements `IDocFactory` and is called `DocFactory`. It has two methods to implement, as shown below.

Open `DocFactory.xml` and click **Browse** to select the `DocFactory` class. Add an integer property called `service.ranking` with a positive value (> 0). Also add a string property called `gaap` with the value `*`.

:::note
The value `*` means your `Doc_Invoice` will be used regardless of which GAAP is selected in the Accounting Schema window (**Menu > Performance Analysis > Accounting Rules > Accounting Schema**). You can also create a custom GAAP reference value in the `C_AcctSchema GAAP` reference and use its search key instead of `*`. In that case, your `Doc_Invoice` class is only used when the organization uses that specific GAAP.
:::

On the **Services** tab, add `org.adempiere.base.IDocFactory` to the **Provided Services** section.

That's the basic setup. Modify your `Doc_Invoice` class and create (then post) a new invoice — your rules will be applied instead of the core accounting mechanism.

## Since iDempiere 9: New Document Factory Base Class

iDempiere 9 introduced a new document factory base class with improved support for multi-GAAP accounting.

## Troubleshooting

- Make sure `DocFactory.xml` has a unique name (`my.domainname.pluginname.DocFactory` is a good choice) and that you selected the correct class.
- Make sure your plug-in is activated before you log in.
- Make sure `MANIFEST.MF` contains a `Service-Component:` line with the path to your `DocFactory.xml` (for example, `Service-Component: DocFactory.xml`).

## Links

- An example is explained on page 36 of the [LiberoPayroll PDF guide](http://sourceforge.net/projects/red1/files/ADempiere%20PDFs/LiberoHR.pdf/download).


This tutorial was contributed by [Alan Lescano](mailto:alan.lesc1@gmail.com) from LBR Localization Brazil.
