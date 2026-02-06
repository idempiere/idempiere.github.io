# Creating a New Window in iDempiere

This guide walks you through the complete process of creating a new Window in iDempiere, from database table creation to menu integration.

## Overview

Creating a new Window in iDempiere involves these steps:
1. Creating record(s) in Table and Column
2. Creating records in Window, Tab and Field
3. Adding the Window to the Menu

## Step 1: Create the Database Table

Navigate to: **System Administrator → Application Dictionary → Table and Column**

1. Click **New Record**
2. Fill in the required fields:
   - **DB Table Name**: my_customtable
   - **Name**: My Custom Table
   - **Description**: Brief description of the table's purpose
   - **Entity Type**: Your custom entity type (e.g., U for User customization)
   - **Data Access Level**: Choose appropriate level (System, Organization, Client+Org, All)
   - **Window**: Leave blank for now
3. **Save** the record

Now, you need to create the columns for your table. We recommend clicking the gear icon button and running the "Create/Complete Table" process.​

This process lets you select common columns that an iDempiere table typically needs—you can choose the ones that fit your use case (e.g., if you're creating a document or transaction table).

:::tip Standard Columns

Every iDempiere table must include these standard columns:
- **TableName_ID**: Primary key 
- **TableName_UU**: UUID
- **AD_Client_ID**: Multi-tenancy support 
- **AD_Org_ID**: Organization 
- **IsActive**: Active flag 
- **Created**: Creation timestamp
- **CreatedBy**: User who created
- **Updated**: Last update timestamp
- **UpdatedBy**: User who updated
:::


## Step 2: Configure Columns

Navigate to the Column tab in the Table and Column window.

If you ran the process we mentioned above, you already have some records here.

Create any specific columns your table needs manually, if required.

### Configure Each Column

For each column, set:
- **System Element**: Defines the values and metadata for the column.
- **Name**: User-friendly name; this becomes the field label (auto-populated from Element).
- **Description**: Purpose of the column; appears in the field's help tooltip (auto-populated from Element).
- **Reference**: Data type (String, Integer, List, Table, etc.)
- **Length**
- **Mandatory**
- **Updatable**: Whether users can modify the value
- **Always Updatable**: Editable even if the record is processed or inactive.
- **Identifier**: Mark the column as a key identifier

:::tip Creating Custom System Elements

If you need a custom System Element (for a column that doesn't have a standard element), you can create it directly from the Column window:

1. Right-click on the **System Element** field
2. Select **New** from the context menu
3. Fill in the element details (Name, Column Name, Print Name, Description, Help)
4. Save the element

This allows you to create the element without navigating away from your current record.
:::

### Special Column Configurations

#### Foreign Key Columns
- Reference: **Search**, **Table** or **Table Direct**
- Reference Key: Select the referenced table
- Mandatory: Set based on requirements

#### List Columns
- Reference: **List**
- Reference Key: Select or create a Reference List

Once all the columns are created, click on **Syncrhonize column** to create the columns in the database.

## Step 3: Create the Window

Navigate back to the Table record you created.

1. Click the **Process** button (gear icon)
2. Select and run the **Create Window, Tab and Field from Table** process
3. Configure the parameters:
4. Click **OK** to run the process

The process will automatically create:
- A new Window record (if "New Window" is checked)
- A Tab linked to your table
- All Fields corresponding to your table columns
- The menu record for your window

### Choosing Between New Window or Detail Tab

**Create a new window** (check "New Window") when:
- Your table represents master data or a main entity
- Users need to access this data independently
- The table is not primarily a child of another entity

**Add as detail tab** (uncheck "New Window") when:
- Your table is a child/detail of an existing entity
- Data should always be viewed in context of a parent record
- You need parent-child relationship (e.g., Order → Order Lines)
- Set **Tab Level** to 1 or higher to make it a detail tab

:::tip
After running this process, you can further customize the window, tab, and fields in the **Window, Tab & Field** window to adjust layouts, add display logic, and fine-tune the user interface. 
:::

## Step 4: Add to Menu

Navigate to: **System Administrator → Application Dictionary → Menu**

If the menu was not created with the **Create Window, Tab and Field from Table** process, you can create it manually here.

1. Find the appropriate menu folder where your window should appear
2. Click **New Record**
3. Configure the menu entry
4. **Save** the record

## Step 5: Assign Role Access

Navigate to: **System Administrator → Security → Role**

1. Open the role that needs access
2. Go to **Window Access** tab
3. Find and enable your new window
4. Set appropriate access level (Read Only, Read Write)
5. Repeat for other roles as needed

## Step 6: Test the Window

1. **Log out and log back in as a different role** 
2. Navigate to your new menu entry
3. Test all functionality:
   - Create new records
   - Edit existing records
   - Verify field validations
   - Check mandatory fields
   - Test foreign key lookups

## Best Practices

### Naming Conventions
- **Primary Keys**: tablename_ID
- **Names**: Clear, descriptive, user-friendly

### Entity Types
- Use custom entity type (not Dictionary)

### Performance
- Create appropriate database indexes
- Use Search reference for foreign keys when possible

### Documentation
- Always fill Description and Help fields
- Document business purpose and usage
- Include examples in help text

## Advanced Topics

### Multiple Tabs (Parent-Child Relationships)

For child tabs:
1. Create second tab with Tab Level = 1
2. Set **Parent Column** link to parent tab
3. Configure **Link Column** (foreign key to parent)

## Related Documentation

- [2Pack Export/Import](./2pack/)
- [Plugin Development](./plugin-development/)
- [Contributing to Core](./contributing-to-core/)
