---
sidebar_position: 11
title: "Delete Record with Confirmation Logic"
sidebar_label: "Delete Record with Confirmation Logic"
description: "**Goal:** UX/Functional"
tags: [functional]
---
**Goal:** UX/Functional

**Developer:** Takacs Peter, **Design**: Norbert Bede **PR Review**:  Carlos Ruiz.

**Sponsor**: cloudempiere.com

**Feature Ticket: [IDEMPIERE-5319](https://idempiere.atlassian.net/browse/IDEMPIERE-5319)**

#### **Description**
The goal of this improvement is to implement new parametrisable Delete Confirmation Logic, which defines what string must be entered before the system starts the delete record operation. The implementation covers multi-language environment and singe/many record deletion.

**There are 2 levels of implementation**

- Application Dictionary - system administrator able to add on Window=>Tab a new Delete Confirmation Logic

- Window Customisation - tenant administrator able to add on Window Customisation =>Tab a new Delete Confirmation Logic

Validation syntax follow iDempiere convention, example

- ConfirmDeleteLogic = @#Date@
- ConfirmDeleteLogic = @Value@
- ConfirmDeleteLogic = @Delete@ - Dialog will ask for "Borrar Registro".

#### **Behaviour**:
- System first check Window customisation Delete Confirmation Logic, if NULL then check Window Validation if NULL then legacy delete dialog opening
- When single record is active or selected, Validation is defined, then iDempiere will ask for Delete Confirmation Logic question eg. For delete record enter: Mulch
- When multiple record are selected, Validation is defined, then iDempiere will ask for generic message : for delete enter - "Delete Selected Records".

#### **Examples**
##### **Single Record ask for Value**
![Deleteconfirm logic value](pathname:///img/new-features/v10/Deleteconfirm-logic-value.png)
![Deleteconfirm logic value invalidanswer](pathname:///img/new-features/v10/Deleteconfirm-logic-value-invalidanswer.png)

##### **Single Record ask Date**
![Deleteconfirm logic date](pathname:///img/new-features/v10/Deleteconfirm-logic-date.png)
![Deleteconfirm logic date input](pathname:///img/new-features/v10/Deleteconfirm-logic-date-input.png)

##### **Multiple Records selection**
![Deleteconfirm mulitple records](pathname:///img/new-features/v10/Deleteconfirm-mulitple-records.png)

##### **Window Customisation**
![Deleteconfirm logic windowcustomisation](pathname:///img/new-features/v10/Deleteconfirm-logic-windowcustomisation.png)

##### **Translation: Spain Translation of Delete**
![Deleteconfirm logic translation](pathname:///img/new-features/v10/Deleteconfirm-logic-translation.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Delete_Record_with_Confirmation_Logic)_
