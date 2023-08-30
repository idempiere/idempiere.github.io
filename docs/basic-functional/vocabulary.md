---
sidebar_position: 2
---
# Vocabulary {#Vocabulary}

This page defines basic terms you should know when using iDempiere. Consider bookmarking this page for future reference.

# Tenant Definition and Usage {#tenant}

A Tenant (formerly known as Client) is a global consolidated collection of financial entities. iDempiere is multi-tenant. This means that completely separate groups of people can use the same instance of iDempiere for very different and unrelated purposes. Because different tenants are unrelated, they do not share any information with each other.

In a simple scenario where you are a sole proprietor, you will have a single financial entity (Organization) in a single tenant. In a more complicated scenario where you are a multi-national collection of financial entities, you will have multiple financial entities (Organizations) in a single tenant.

# System Tenant {#tenant-system}

The 'System' Tenant is a special tenant found in every instance of iDempiere. It holds the metadata used to define how iDempiere looks and functions.

# Organization {#organization} 

An Organization is a legal, financial or taxation entity inside a Tenant. It is most commonly referred to as a 'set of books'. An organization owns all financial things of value. Said another way, all records written to the general ledger will always be associated with an organization.

Here are additional important details about the Organization:

* An Organization belongs to a Tenant.
* The Organization window contains a tree to help you structure the relationships between your organizations.
* The Organization window has a Summary check box field.
* Any organization whose Summary check box is checked is considered a 'summary organization'.
* Any organization whose Summary check box is NOT checked is considered a 'transactional organization'.
* Summary organizations are a financial consolidation point.
* You cannot post directly against a summary organization. Instead, summary organizations represent the sum of all postings against the transactional organizations that link to it via the Organization window tree.

Organizations inside the same Tenant can share information. There exists a special Organization named '*' or commonly referred to as "star". While the '*' Organization is a real organization, it is commonly used to share data by convention. Said another way, if you wish to make a given record available to all users and records in your Tenant, assign that record the '*' Organization.

# Business Partner {#business-partner}

A Business Partner is someone or something you transact with financially. Any given Business Partners can be flagged as either or all of the following: customer, vendor, employee, internal or external sales representative, or prospect. This means you no longer need to maintain duplicate records when a business partner is both a customer and a vendor.

# Contact {#contact}

A Contact is someone or something you communicate with. Contacts are most commonly found in the Business Partner window.

# User {#user}

A User is a Contact that has the additional ability to log into iDempiere. Said another way, a User is a Contact, and a Contact is a User only if they can log into iDempiere. Users are most commonly found in the User window.

Note that the User window includes all Users and Contacts for a given Tenant.

# Role {#role}

A Role defines the attributes and abilities of a User logging into an iDempiere session. A User can have many Roles. A User must choose one (and only one) Role during the login process. The User's iDempiere experience is defined by the chosen role during login.

# Charge {#charge}

A Charge is a facade for accounts in the Chart of Accounts (Account Element window => Element Value subtab). Charges are used in transactional windows such as the Invoice (Vendor) window and Physical Inventory window to code value to given accounts.

It is commonly asked why the concept of a Charge exists. Asked another way, why not let the user simply choose the account directly? There are important reasons the Charge exists:

1. Charges give ERP Administrators the ability to provide meaningful names to actions an operator might perform where the operator would have no knowledge of the underlying GL account number or meaning. Example of a Charge name that means something to a warehouse operator: "Damaged Inventory (62300)". Example of a GL account name that might be meaningless to a warehouse operator: "62300 - Material Discrepancy".
1. Charges give you the ability to have multiple operator descriptions for the same GL account. Doing so ensures the correctly named options are available to operators in the right circumstances.
1. iDempiere supports multiple Accounting Schemas (functional currencies) with multiple Account Elements (charts of accounts). This means that a transactional document can use a single Charge option regardless of the document's functional currencies. iDempiere knows exactly what account to use when posting to the respective functional currencies.

# Product {#product}

A Product is used to represent many concepts in iDempiere. A Product can be:

* A stocked product like a chair
* A not-Stocked product like water
* A service that you perform

Products are similar to Charges in that they help the system map transactions to GL accounts; however, the Product architecture is much more involved. Products have the following added complexities over Charges:

* Products depend on Price Lists
* Products can maintain inventory levels
* Products maintain costs
* Products support Bills of Materials (BOM)
* Products maintain multiple GL accounts (where a Charge maps to a single GL account)
* Product GL account usage depends on how the Product is configured
* Products are integrated with Assets and Resources

Many windows give you a choice between using a Product or a Charge (Sales Order => Order Line subtab for example). If you do not know whether to use a Product or a Charge, start by using a Charge. It is more simple. Use Products when you have a requirement that cannot be solved by a Charge.

# Accounting Schema {#accounting-schema}

# Account Element (Element Value) {#account-element}
