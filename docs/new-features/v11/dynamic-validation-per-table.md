---
sidebar_position: 34
title: "Dynamic Validation per Table"
sidebar_label: "Dynamic Validation per Table"
description: "**Goal:** Dynamically restrict records that user can see"
tags: [security]
---
**Goal:** Dynamically restrict records that user can see

**Developer:** Carlos Ruiz

**Sponsor:** [Cloudempiere](https://www.cloudempiere.com/)

## Description
![00 DynamicValidationPerTable](pathname:///img/new-features/v11/00_DynamicValidationPerTable.png)

iDempiere allows to restrict access to records using the [Table Access](https://wiki.idempiere.org/en/Role_Data_Access_(Window_ID-268)#Tab:_Table_Access), [Record Access](https://wiki.idempiere.org/en/Role_Data_Access_(Window_ID-268)#Tab:_Record_Access) or Private Access.
The configuration of this security is complex and very static.

So, the intention of this feature is to allow a more flexible way (SQL based) to restrict access to tables, as well as allow usage of (login, preferences, accounting and role predefined) context variables.

When there are several records that apply to a session, all where clauses will be applied with AND.

So, for example you can define rules per:
- Table + Tenant - rules that apply on C_BPartner on GardenWorld
- Table + System - rules that would apply on C_BPartner for all tenants

On the other hand, you have the fields Role and User to restrict the rules to apply:
- Role empty, User empty: it will apply to everybody on the table+tenant
- Role filled, User empty: it will apply to everybody logged in this role
- Role empty, User filled: it will apply just to this user
- Role filled, User filled: it will apply just to this user when logged in with that role

## WARNING
You need to be careful when assigning these restrictions as they apply also on InfoWindows as filtering dependent records.

For example:

- If you add a filter for the table `AD_User` like `AD_User.`AD_User_ID>10`0`, the table AD_User will filter correctly the records 0, 10 and 100
- **BUT** as a collateral issue the *Business Partner Info* will show just 5 business partners, those that **have** a user with ID > 100
- To solve this, the correct way to add the filter and still show information about business partners without users will be:  `(AD_User.AD_User_ID IS NULL OR AD_User.`AD_User_ID>100`)`

## Use Cases
### Norbert
#### zk/webui
"ZK.1  salesman - see only the records eg. sales quote, where = > login user = c_order_id.salesrep_id"

```sql

Table = C_Order
Role = Salesman
Code = C_Order.SalesRep_ID=@#AD_User_ID@

```

"ZK.2. sale manager - see all records sales quote, where = > login user is defined on other users as supervisor"

```sql

Table = C_Order
Role = Sales Manager
Code = C_Order.SalesRep_ID IN (SELECT AD_User_ID FROM AD_User WHERE Supervisor_ID=@#AD_User_ID@)

```

"ZK.3. sales team manager - as A2. but somehow we would consider eg. org as country or team. (it is more advanced, can be new table/window)"

This one for example will show just the sales regions that he attends:

```sql

Table = C_Order
Role = Sales Team Manager
Code = C_Order.SalesRep_ID IN (SELECT SalesRep_ID FROM C_SalesRegion WHERE SalesRep_ID=@#AD_User_ID@)

```

"ZK.4. Purchase Manager see only vendors - not customers. "

```sql

Table = C_BPartner
Role = Purchase Manager
Code = C_BPartner.IsVendor='Y'

```

" ZK.5. Purchase Manager see only vendors and invoices with vendors (this was possible per record - not based on condition bp.po_salesrep_id)"

```sql

Table = C_Invoice
Role = Purchase Manager
Code = EXISTS (SELECT 1 FROM C_BPartner WHERE C_BPartner.C_BPartner_ID=C_Invoice.C_BPartner_ID AND C_BPartner.IsVendor='Y')

```

#### rest api
" RE.1. warehouse scanner - can see only documents assigned to (salesrep_id)"

This is just an example but probably not the right column.

For other inventory tables would need to create a proper "AssignedTo_ID" column

```sql

Table = M_Movement
Role = Warehouse Scanner
Code = M_Movement.AD_User_ID=@#AD_User_ID@

```

" RE.2. web authorised user - PORTAL - see only invoices - where his login user = c_invoice.ad_user_id"

```sql

Table = C_Invoice
Role = Web Authorized User
Code = C_Invoice.AD_User_ID=@#AD_User_ID@

```

" RE.3. web authorised superviser bp level user - PORTAL - see all invoices - where his login user = c_invoice.ad_user_id"

It's the same case above.
Maybe you meant C_BPartner_ID?  If that's the case:

```sql

Table = C_Invoice
Role = Web Authorized Supervisor
Code = C_Invoice.C_BPartner_ID=(SELECT C_BPartner_ID FROM AD_User WHERE AD_User_ID=@#AD_User_ID@)

```

#### our special cases.
" SP.1. guest user can see only his own basket (guestbp+guest-session-token) and guest bpartner, location, user. "

This requires SysConfig SYSTEM_INSERT_CHANGELOG=K

```sql

Table = C_Order
User = Guest User
Code =
C_Order_ID IN (
  SELECT Record_ID
  FROM AD_ChangeLog
  WHERE AD_Session_ID=@#AD_Session_ID@
```sql
   AND AD_Table_ID=(SELECT AD_Table_ID FROM AD_Table WHERE TableName='C_Order')
   AND EventChangeLog='I')
```

```

" SP.2. e-commerce - guest user - as guest user i would like access only to records i owned (you cant test it, we can do this here) "

Also, all the created records by will be associated to the same user, so is not possible to identify the record against the user.
Maybe the predicate is wrong?  guest users cannot own records, maybe a session can, but not a guest user.
BTW, this would need a rule for each table the guest user has access to.

### Deepak
" Employee working on one warehouse can not see document of other warehouse. May be warehouse user access."

This will show just the documents of the warehouse selected at login:

```sql

Table = M_Inventory
Role = Warehouse Employee
Code = M_Inventory.Warehouse_ID=@#M_Warehouse_ID@

```

" Product access to org."

This will show just the products with the org that the user selected at login.

```sql

Table = M_Product
Role/User = Empty (everybody)
Code = M_Product.AD_Org_ID=@#AD_Org_ID@

```

" Print format access to Org, user, role"

This will allow the user to see just the print formats he created.

```sql

Table = AD_PrintFormat
Role/User = Empty (everybody)
Code = AD_PrintFormat.CreatedBy=@#AD_User_ID@

```

About org/role, you would need a way to assign print formats to orgs and roles, but the principle is the same.

" Also I am thinking how to restrict documents of warehouse to that warehouse user only even they have same role?"

This sounds like the same case RE.1. from Norbert

### Gaurav
Note that the examples below can be written simpler using the direct IDs instead of the subqueries.  Also if using any subquery it is important to include filter by AD_Client_ID (removed from the examples for readability).

"In many companies many users have access to  invoice(vendor) but only finance users have access to invoices with particular charges like "Salary" , "Consultation charges" or "Bonus" or "Loan""

This example could be used to restrict access to invoices for a role based on lines with specific charges:

```sql

Table = C_Invoice
Role/User = Empty (everybody)
Code =
(C_Invoice.IsSOTrx='Y'
```sql
  OR (C_Invoice.IsSOTrx='N'
        AND @#AD_Role_ID@=(SELECT AD_Role_ID FROM AD_Role WHERE Name='Finances')
        AND NOT EXISTS (SELECT 1 FROM C_InvoiceLine il WHERE il.C_Invoice_ID=C_Invoice.C_Invoice_ID
                          AND C_Charge_ID NOT IN (SELECT C_Charge_ID FROM C_Charge
                                                    WHERE Name IN ('Salary', 'Consultation charges', 'Bonus', 'Loan')
                                                 )
                       )
      )
```
)

```

"Request type based access allow only certain users to have access to specific request types
For e.g. Customer complaint as request type only people with that department should have access to it.
"

```sql

Table = R_Request
Role = Customer Complaints Department
User = Empty
Code = R_Request.R_RequestType_ID = (SELECT R_RequestType_ID FROM R_RequestType WHERE Name='Customer complaint')

```

The example above can be simplified for example like adding a "role attending" column to R_RequestType table.

"manufacturing defect only people from QC should have access to it."

```sql

Table = M_QualityTestResult
Role/User = Empty (everybody)
Code = @#AD_Role_ID@ = (SELECT AD_Role_ID FROM AD_Role WHERE Name='Manufacturing')

```

"HR Attendance Data: Only manager should be allowed to see his subordinates attendance & correct."

This can be resolved similar to the ZK.2 use case from Norbert described above.

## Technical Info
[IDEMPIERE-6013](https://idempiere.atlassian.net/browse/IDEMPIERE-6013)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Dynamic_Filter_per_Table)_
