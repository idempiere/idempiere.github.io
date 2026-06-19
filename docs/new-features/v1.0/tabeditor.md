---
sidebar_position: 46
title: "Tab Editor"
sidebar_label: "Tab Editor"
description: "**Goal:** User Experience"
tags: [user-experience]
---
**Goal:** User Experience

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**
The new button "Tab Editor" is a [WYSIWYG](http://en.wikipedia.org/wiki/WYSIWYG) application that enables you to see and edit how a tab is going to be displayed. In order to properly arrange the visible fields on a tab, Idempiere takes as a reference the three new fields for web positioning **X Position**, **Column Span** and **Num Lines** ([Form Layout](https://wiki.idempiere.org/en/NF001_FormLayout)), as well as the common used attributes **Sequence**, **Field Group** and **Displayed**.

**Movie Demo:** [Watch on YouTube](https://www.youtube.com/watch?v=3vOmZ0o09KY)

## Editing Sales Order Header Tab
*Window, Tab Field* -> *Sales Order Header Tab* -> *New tool bar button!*

![TabEditorButton](pathname:///img/new-features/v1.0/TabEditorButton.png)

The sales order head tab will be displayed according to the attributes described above; thus this new feature will allow to directly manipulate the form layout just by dragging and dropping, using the lists located on the left panel or  modifying the properties of the fields on the right panel.

![TabEditor](pathname:///img/new-features/v1.0/TabEditor.png)


Several actions can be done in several ways by using the options described above:

## To **Position**
 There are 3 ways to Switch an element on the tab panel.
 1. By Dragging and dropping an element directly on the center panel.
 2. By Changing the value of 'X Position' on the right panel
 3. By Changing the sequence order on the visible and invisible list of fields.
 4. A field can be also repositioned if its 'Field Group' property is changed.

 i.e *Delivery Rule* for the "Freight Amount" Field on the Delivery Group.

## To **Hide**
 There is just one way to hide an element and it is by directly dragging and dropping the desired element into the *Non visible Fields* List, please notice that both lists are item draggable-dropable as the
 elements on the center panel.

 i.e *Drop Shipment Location* field from the header.

## To **Expand**
 There are 2 ways to expand an element:
 1.By Increasing the value of the property 'Column Span' on the right panel
 2.By 'Double-Clicking' on the element's label.

 i.e the *Drop Shipment Partner* field.

## To **Shrink**
 There are 2 ways to shrink an element:
 1.By decreasing the value of the property 'Column Span' on the right panel
 2.By 'Ctrl Double-Clicking' on the element's label.

 i.e the *Freight Amount* field.


## To **Widen** or **Narrow**
 By increasing or decreasing the value of the property 'Number of Lines' on the right panel

 i.e the *Freight Amount* field.

![TabEditorEdited](pathname:///img/new-features/v1.0/TabEditorEdited.png)

***Notice: Any change on the form will be only saved  if the green tick is pressed.***

**Technical Info:** [IDEMPIERE-457](http://idempiere.atlassian.net/browse/IDEMPIERE-457)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_TabEditor)_
