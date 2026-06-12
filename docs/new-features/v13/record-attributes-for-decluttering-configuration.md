---
title: "Record attributes For Decluttering Configuration"
sidebar_label: "Record attributes For Decluttering Configuration"
sidebar_position: 12
description: "In Application dictionary object like Tab, Table or Column, if we have to add any configuration which are rarely have value, then we keep adding columns on relevent tables."
tags:
  - technical
---

# Record attributes For Decluttering Configuration

## **Feature:** Decluttered Configuration / Attributes on Record
**Goal:** Technical

**Developer:** [Logilite Technologies](http://www.logilite.com/)

## Goal
In Application dictionary object like Tab, Table or Column, if we have to add any configuration which are rarely have value, then we keep adding columns on relevent tables. where hardly non null value specified on few records but most of record has no value.  This makes even table bulky having hundreds of columns. Also custom plugins needs to add additional property on AD tables and it makes table bulky. Purpose of this features is to enable managing  table specific attributes in Entity-Attribute-Value (EAV) model. 

As attribute set design in iDempiere is EAV model, This enhancement reusing concept of EAV. Below steps shows a sample configurations.  

## Step for Decluttered Configuration
#### **Create an Attribute for `IsSingleRow` and `MaxQueryRecords`**
1. Navigate to **Attribute** window in iDempiere.
1. Click on **New Record**.
1. Fill in the details for the `IsSingleRow` attribute:
  - **Name**: `IsSingleRow`
  - **Reference**: Select the appropriate reference (e.g., `YesNo`).
1. Save the record.

![Attribute-IsSingleRow](/img/docs/new-features/v13/Attribute-IsSingleRow.png)

1. Repeat the above steps to create another attribute for `MaxQueryRecords`:
  - **Name**: `MaxQueryRecords`
  - **Reference**:  `Number` 
1. Save the record.

![Attribute-MaxQueryRecords](/img/docs/new-features/v13/Attribute-MaxQueryRecords.png)

#### **Create an Attribute Set for `AD_Tab`**
1. Go to the **Attribute Set** window.
1. Click on **New Record**.
1. Fill in the details:
  - **Name**: `Tab Attribute Set`
  - **Attribute Set Type**: Choose `Table Attribute`.
1. Save the record.

![AttributeSet-TabAttributeSet](/img/docs/new-features/v13/AttributeSet-TabAttributeSet.png)

#### **Add `IsSingleRow` and `MaxQueryRecords` to the Attribute Set**
1. While in the **Attribute Set** window, navigate to the **Attribute** tab.
1. Click on **New Record** to add the `IsSingleRow` attribute.
1. Select the `IsSingleRow` attribute from the dropdown.
1. Save the record.

![AttributeUse-IsSingleRow](/img/docs/new-features/v13/AttributeUse-IsSingleRow.png)

1. Repeat the process to add `MaxQueryRecords` to the same attribute set.

![AttributeUse-MaxQueryRecords](/img/docs/new-features/v13/AttributeUse-MaxQueryRecords.png)

#### **Link the Attribute Set to the `AD_Tab` Table**
1. Go to the to the **Table and Column** window.
1. Search for the `**AD_Tab**` table.
1. In the **Table** tab, go to the sub-tab **Table Attribute Set**.
1. Click **New Record**.
1. Set the **Attribute Set** to `**Tab Attribute Set**` (the one created earlier).
1. Save the record.

![AD Tab TableAttributeSet](/img/docs/new-features/v13/AD_Tab_TableAttributeSet.png)

#### **Add Attribute Values for a Specific Tab**
1. In the **Menu**, navigate to **Application Dictionary** > **Window, Tab & Field**.
1. In the **Window, Tab & Field** window, use the search functionality to locate the **Product** window.
1. Locate the **Product** tab within the **Product** window records.
1. With the **Product** tab selected, locate and click the **Toolbar Attribute** button. This button opens the **Product Attribute Info** form, allowing you to set specific attributes.
1. Once the **Product Attribute Info** form opens, you'll see a list of attributes linked to the **Tab Attribute Set** (such as `IsSingleRow` and `MaxQueryRecords` if already defined).
  1. Set the desired value: **IsSingleRow**: Set it to 
    - **Checked** means `Y` (Yes).
    - **Unchecked** means `N` (No).
  1. **MaxQueryRecords**: Set its value (e.g., `100`)
1. After setting the values for **IsSingleRow** (checkbox) and **MaxQueryRecords**, click the **OK** button in the **Product Attribute Info** form to save the changes.

![ProductWindow](/img/docs/new-features/v13/ProductWindow.png)
![ProductTab](/img/docs/new-features/v13/ProductTab.png)

![Product Attribute Info](/img/docs/new-features/v13/Product_Attribute_Info.png)

Note that if System Element or Message for IsSingleRow is defined then it brings label using that system element.

In code, Attributes can be pulled using PO object like below.

 

```java
MTab.get(getAD_Tab_ID()).get_TableAttributeAsBoolean("IsSingleRow");
```

**Technical Info:** [IDEMPIERE-4224](https://idempiere.atlassian.net/browse/IDEMPIERE-4224)
