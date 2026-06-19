---
sidebar_position: 16
title: "Document Search on Menu Lookup"
sidebar_label: "Document Search on Menu Lookup"
description: "**Developer:** Heng Sin Low, Carlos Ruiz"
tags: [user-experience]
---
**Goal:** Functional

**Developer:** Heng Sin Low, Carlos Ruiz

**Description:** Chuck Boecking

The purpose of this enhancement is to make finding documents easier and faster. To understand this enhancement, you should first understand the history of searching in iDempiere.

From the beginning of the zk user interface, there existed a search box in the upper left corner of the screen. The purpose of this search box was to find windows/processes/reports/workflows in the menu. Most people who use iDempiere are familiar with this functionality.

![Basic iDempiere Search](pathname:///img/new-features/v2.1/Basic_iDempiere_Search.png)

_Basic Search_

ADempiere (about 3.6) extended this functionality to include 'transaction codes' to allow you to search using escape characters and open windows with records matching a string. Here is an example search with a transaction code "/bp henry". This will find all contacts with the name henry and zoom you to the Business Partner window showing you all matching records. Out of the box, iDempiere has transaction codes for "/o" for Order and "/bp" for Business Partner. You can add more transaction codes by logging in as the System Administrator role and adding records to the Search Definition window. As of when this page was created, most people were not familiar with this powerful feature.

The purpose of this page's enhancement is to extend search to be even easier and more powerful. Now, you can search documents without a transaction code, browse the results in the search result drop down 'Search' tab, and pick the record you are looking for. This enhancement preserves the existing transaction code functionality.

![Enhanced iDempiere Search Definition](pathname:///img/new-features/v2.1/Enhanced_iDempiere_Search_Definition.png)

_Enhanced Search Results_

Out of the box, iDempiere does not have this feature enabled. To enable, you define Search Definition records with a null/empty Transaction Code. Here is an example of how to expose the Customer Shipment 'Document No' field for searching through this new enhancement.

![Example iDempiere Search Definition](pathname:///img/new-features/v2.1/Example_iDempiere_Search_Definition.png)

_Example Search Definition_

The number of records shown is limited by the System Configuration value MAX_RESULTS_PER_SEARCH_IN_DOCUMENT_CONTROLLER (with a default of 3).

**Technical Info:** [IDEMPIERE-2050](http://idempiere.atlassian.net/browse/IDEMPIERE-2050)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF2.1_Document_Search_on_Menu_Lookup)_
