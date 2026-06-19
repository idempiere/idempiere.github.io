---
sidebar_position: 1
title: "Exclude Locators for Demand Operations"
sidebar_label: "Exclude Locators for Demand Operations"
description: "- Sponsor: Norbert Bede [MULTIMAGE Ltd](http://www.multimageconsult.com/)"
tags: [functional]
---
## Exclude Locators for Demand Operations
- Sponsor: Norbert Bede [MULTIMAGE Ltd](http://www.multimageconsult.com/)
- Developer: Carlos Ruiz

### Overview
On the process of managing items on a warehouse is required to mark some locators to be excluded from the count and from the process of demand operations, like reservations, assign for shipping, movement replenishment, etc.
#### Purpose
In the warehouse management there is a need to use some locators for items that must not be taken into account in demand operations.
One example: a locator used for Quality Assurance could be used for reservation, but not for shipping or replenishment.
Another example, a locator for damaged items must not be used for any demand operation.  Reserving or assigning items from such locations can lead to shipping damaged items.
#### Scope
The projects intended to be covered with this development are:
- Sales Reservation - exclude some locators from the counts and the processes involved
- Shipment - exclude some locators from assigning for shipping
- Replenishment - exclude some locators from assigning for movement replenishment
#### References
...
### Design Considerations
Must check for collaterals to ensure other processes that could be affected by the change, like purchasing, etc.
#### Assumptions
...
#### Dependencies
...
#### Constraints
...
### Glossary
- Movement replenishment: is a specific case of replenishment where one warehouse is replenished using inventory from another warehouse
### Functional Requirements
#### User roles & profiles
- Warehouse Configuration: This functionality is intended to be configured by a warehouse manager or an iDempiere implementor with enough knowledge about how warehouse management works.  The outcome is transparent for end-users of the application.
#### Business process definition
- Sales Reservation: Creating some types of Sales Order in iDempiere makes reservation on the stock, the Info Product window presents the user quantities available for reservation
- Shipment Manual: User is able to create manual shipments in iDempiere, in this case the user must select the warehouse and locator where the items are taken from
- Shipment Automatic: There is a process in iDempiere to create automatic shipments
- Replenishment Movement: when iDempiere is creating a replenishment movement it selects the locators from where the items must be taken, in this case the system must not take into account the locators excluded from replenishment
#### User stories
“we defined 4-5 special locators where we are storing goods - ad1. temporary can’t find ad2. QA issue etc.  The problem is these special locators goods are considered as available for selling and considered as available when replenishment process running”
#### Functional requirements based on business processes
- Sales Reservation: when making sales reservation the user is presented with a quantity of available items for reservation, the process to calculate this quantity must not take into account the locators excluded for reservation
- Shipment Manual Locator Selection: when iDempiere is creating a shipment the user can select the locator where the items are taken from, in this case the system must not show the user the locators excluded from shipping
- Shipment Automatic Locator: when iDempiere is completing a shipment it can select automatically the locators from where the items must be taken (filling the corresponding MA tables), in this case the system must not take into account the locators excluded from shipping
- Replenishment Movement: when iDempiere is creating a replenishment movement it selects the locators from where the items must be taken, in this case the system must not take into account the locators excluded from replenishment
#### User Interface Mockups
Proposed UI related changes are just two:

One new field “Locator Type” on the locator tab:

![FS ExcludeLocators Locator](pathname:///img/new-features/v3.0/FS_ExcludeLocators_Locator.png)

Pointing to a new table/window Locator Type that is user definable:

![FS ExcludeLocators LocatorType](pathname:///img/new-features/v3.0/FS_ExcludeLocators_LocatorType.png)

### Technical Requirements
Following iDempiere standards:
Table M_LocatorType with Columns: The usual mandatory columns plus Name, IsAvailableForReplenishment, IsAvailableForReservation, IsAvailableForShipping
Add column M_LocatorType_ID to table M_Locator

The initial list of affected objects (can be more after a deeper review):
DB Function BOMQtyAvailable

&lt;strike&gt;The dictionary reference “Locator (WH)” is not prepared to receive a filter (dynamic validation) - in order to implement filtering for the Shipment is necessary to implement this, probably modifying WLocatorDialog to check for dynamic validation, and enabling dynamic validation for the Locator reference when adding a column, field or field customization.&lt;/strike&gt;

- The original idea to filter the locator is too complex as the WLocatorDialog doesn't have direct access to the calling field - this validation was implemented on MInOutLine.beforeSave, showing the user an error if a locator not available for shipping is selected.

The process InOutGenerate (used for Generate Shipments and Generate Shipment Manual) must be modified to exclude locators from the list - probably the method getStorages is the key to be modified there

The classes ReplenishReport and ReplenishReportProduction must be modified to exclude locators - probably method createMovements where
MStorageOnHand[] storages = MStorageOnHand.getWarehouse
is filled.

### Data Requirements
...
### Non-Functional Requirements
- Backward compatibility: as the proposed field is new, the behavior for locators that doesn’t have locator type set must be to assume those locators are available for all demand operations
### Open Discussion Items
...
### Closed Discussion Items
A thread was posted in forums about this at
https://groups.google.com/d/msg/idempiere/71jiFIWeQMk/C90NGaBgrMoJ
But there was no answer from community about.

JIRA ticket: https://idempiere.atlassian.net/browse/IDEMPIERE-2668

---

_Source: [Wiki](https://wiki.idempiere.org/en/FS_Exclude_Locators_for_Demand_Operations)_
