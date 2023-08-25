---
sidebar_position: 2
---
# Introduction

This page defines basic terms you should know when using iDempiere. Consider bookmarking this page for future reference.

# Tenant Definition and Usage

A Tenant is a global consolidated collection of financial entities. iDempiere is multi-tenant. This means that completely separate groups of people can use the same instance of iDempiere for very different and unrelated purposes. Because different tenants are unrelated, they do not share any information with each other.

In a simple scenario where you are a sole proprietor, you will have a single financial entity (Organization) in a single tenant. In a more complicated scenario where you are a multi-national collection of financial entities, you will have multiple financial entities (Organizations) in a single tenant.

# System Tenant

The 'System' Tenant is a special tenant found in every instance of iDempiere. It holds the metadata used to define how iDempiere looks and functions.

# Organization 

An Organization is a legal, financial or taxation entity inside a Tenant. It is most commonly referred to as a 'set of books'. An organization owns all financial things of value. Said another way, all records written to the general ledger will always be associated with an organization.

# Business Partner

A Business Partner is someone or something you transact with financially. Business partners can be customers, vendors, employees, internal or external sales representatives, etc... 

# Contact

A Contact is someone or something you communicate with. Most commonly, a contact is a human.

# User

A User is a Contact that has the additional ability to log into iDempiere. Said another way, a User is a Contact, and a Contact is a User if they can log into iDempiere.

# Role

A Role defines the attributes and abilities of a User logging into an iDempiere session. A User can have many Roles. A User must choose one (and only one) Role during the login process. The User's iDempiere experience is defined by the chosen role during login.
