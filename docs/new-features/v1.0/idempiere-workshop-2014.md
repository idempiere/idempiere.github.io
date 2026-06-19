---
sidebar_position: 15
title: "iDempiere workshop August 2014"
sidebar_label: "iDempiere workshop August 2014"
description: "There was a iDempiere workshop in August 2014 held by Carlos Ruiz (organized by Thomas Bayen)"
tags: [functional]
---
## iDempiere workshop August 2014
There was a iDempiere workshop in August 2014 held by Carlos Ruiz (organized by Thomas Bayen)

## Ideas and Interests to talk about later
- Load Balancing
- InfoWindows
- Simple iDempiere using preconfigured modules using Roles, Window Customization, and/or ASP
- Programming best practices
- Let's begin creating a plugin
- Payment Allocation

## Transcript
## Overview
This part of the workshop gives an overview of the new features of iDempiere 1.0, 2.0, 3.0, ... Carlos opened the New Feature Category and we talked about the more interesting points

### [:Category:New_Features_v1.0](https://wiki.idempiere.org/en/:Category:New_Features_v1.0)
- Load Balancing/Hazelcast
- 2Pack (improvements, usage with the export button, exporting of detail tabs)
- Fitnesse/ Selenium (not very many tests done yet, but a good tool to do functional tests for your own implementation. Examples are in the plugin)
- Find Windows (improved functionality: open the lower part with all fields, search by ranges, create an extended search from a standard search by saving)
- Google Maps integration (Map and routing button, entry in the context menu of location fields)
- Payment Batch (Groups of Payments for reconciling, e.g. for a payroll)
- Reverse Accrual (reverse a document even if the original period is closed)
- Password improvements (Hashed PW, Rules, Locking, etc.)
- Master Roles in System Client
- http://www.adempiere.com/index.php/ADempiere_Best_Practices
- Toolbar configuration (disable buttons or insert a button with a plugin like [Plugin:_Attachment_Scanner](https://wiki.idempiere.org/en/Plugin:_Attachment_Scanner) does)
- WebServices
- Frequent List
- Importer in CSV (that is a very powerful but also dangerous function)
- Context Help at the right side of the window (a Context must be created in System, connected to a tab and a new message can be created in the Tentant)
- Status Line (was static, now it can be configured in [NF3.0_Quick_Info_Widget](https://wiki.idempiere.org/en/NF3.0_Quick_Info_Widget) and [NF2.1_Configurable_Status_Line](https://wiki.idempiere.org/en/NF2.1_Configurable_Status_Line)) and shown in the help area at the right side
- Processes show links to processed documents
- Saved Parameters in every Process Parameter window
- The Payment Field changed (if document is not completed, it is now a list; if completed it shows a button. Payment methods are extendable via an osgi plugin)
- Report Button changed some things, e.g. Report Wizard (in Toolbar of Reports)
- Quick Entry an be used for every kind of records (Just mark fields as quick entry in "window, tab & field")
- Customize Button - User can customize the window view like columns, order of columns, etc.
- Setup Wizard (can be configured in the workflow window with type "Wizard")
- Window Customization

(See the page for links to most of these features.)

### [:Category:New_Features_v2.0](https://wiki.idempiere.org/en/:Category:New_Features_v2.0)
- Charts
- Management of Dashboard Gadgets
- improved Management of Views in the database and constraints
- Focus (you can set the default focus field when you open a record)
- Set the Title of a Tab

### [:Category:New_Features_v3.0](https://wiki.idempiere.org/en/:Category:New_Features_v3.0)
- new html start page (can be configured with the file home.properties)
- default chart of accounts and deactivate default accounts
- process to create requests from email
- search field can search for menu items and records. Can be defined in the "Search Definition" window
- automated recurring run (allows a comment used as @Prm_Comment@ or other Context Variables)
- In the Scheduler to run processes you can create the parameters with a new button. You can set a default value not only to a value (like '2014-08-01') but also to '@#Date@' (today) or even '@#Date@-1' (yesterday).

- Plugin Development
    - the plugin activator class installs a file named 2Pack.zip if it is in the classpath. A new activator called [Incremental2PackActivator](https://idempiere.atlassian.net/browse/IDEMPIERE-1626) can be used that allows to use incremental 2Pack-files.
    - new Window Event Validator can capture events like

## Interesting Things we talked about
- "Advanced" Functionalities are used for things that may be dangerous or security holes. There is a flag in the role to not allow these for users
- formatting of context variables like @DateOrdered&lt;YYYY&gt;@ can be used e.g. in Sequence Prefix or in the description field of recurring documents (using Java formatter syntax in the &lt;...&gt;)
- find informations about table data
    - When you want to know the name of a field you can do it this way: open the context menu, open "Value Preference". IN the opened window you can see the column name at the top right
    - To see a reference value (e.g. the Invoice Rule "After Invoice Delivered" is written as "O") you can also use the "Value Preference Window"
    - use this page to find informations about fields, tables, processes, etc: http://wiki.idempiere.org/en/Manual
    - Use this to see a analysis of the table relationships in the database: http://globalqss.com/idempiere/2.0_20131230/schemaspy/
- To migrate a given ADempiere system you can get helping documentation at http://wiki.idempiere.org/en/Migration_Notes
- You can change the look & feel and the branding by changing the theme. Nicolas wrote [Add_your_theme](https://wiki.idempiere.org/en/Add_your_theme)
- To allow smaller units of measure than in your main uom: There is a System Configuration Value ProductUOMConversionRateValidate. Opening this option can lead to rounding problems in the inventory. (These problems lead to funny values but will not break the functionality.)

## Things to have an eye on
Carlos uses feedly.com to follow:

- JIRA Tickets
- Bitbucket Mercurial repositories

and he email to follow:

- Google group idempiere

## Best Practices
- Always use get_Trx() and not use a null transaction name
- Carlos advised us to use this web page for SQL formatting in Java: http://www.dpriver.com/pp/sqlformat.htm
    - After the Workshop Thomas Bayen found another interesting approach at http://blog.jooq.org/2013/10/12/eclipses-awesome-block-selection-mode/ This approach does not pretty-print your SQL (not more than you did manually before). But it allows to take back the Java-ing and reproduce the SQL from the Java code.

## Load Balancing
Load balancing is about having many servers using the same database.

What was done to make a load balancing scenario work:

- attach processes to a single IP address so they are done only by the server with this single IP
- store attachments at store providers. You can implement an storage provider e.g. for a common ftp server or for google drive or something
- The hazelcast cache has to be configured. It is done in the file hazelcast.xml
- for database load balancing Carlos tried to use the pgpool tool. It does not work well together with hot standby replication of postgresql
- sessions can not move from one server to another

## InfoWindow
- You can easy add additional fields to search for. These fields are based on an sql query. So it can be easy to search e.g. for an address
- If you want to use the LIKE operator you have to use
- You can insert a Process into an InfoWindow (or many processes). The choosed records are inserted into the T_Selected table. Then the said process is called. The process may call something like "select from t_selection where T_Selection.AD_PInstance_ID = getAD_PInstance_ID()"
- In the process definition you can set a "ViewID Column". This column is to give a special information to the process. It is written in the column ViewID of table T_Selection.
- You can create a "Related Info Window" to create a kind of master-detail window

## ASP
- First you have to define ASP modules
- Every module can have different level of knowledge (newbie, normal, advanced)
- The "ASP Generate" Button generates all other information from a point in the menu tree: windows, tab, processes, etc.
- Then you can go into the Window tab and set "ASP Status" for every single entity. (like "Hide this window in this level" for some windows)
- The level extend each other. You only have to set the differences between a lower and a higher level
- Then you go to "ASP Subscribed Modules". That window is to say "This client paid me for this module at this level".
- Then you have to set the value isUseASP at the client.

After that only the subscribed functions will work in this client.

## Simple iDempiere "Bambinipiere"
We thought about using Master Roles or ASP to create a simple iDempiere version. (Marco, Dirk, Henriette and Thomas were interested in doing that.) Carlos also adviced us that one can use the display logic to hide fields. A Login Validator can create a context Value based on a Sysconfig Entry. Carlos uses that in the Colombia plugin that creates additional fields for names.

We have to think more about what is the right way to create a simple iDempiere setup and then to define additional modules. Much of the work will be to define what is needed for such a system and which part of the system (which Entity in the Application Dictionary) belongs to which module.

See [Tiny iDempiere] for more thoughts about that.

## Payment Allocation
- If you have wrong payment allocations it can be a possibility to run the process "Validate business partner". It may clean up your Allocations. It recalculates the Open Balance, Actual Life Time Value and marks the Invoices as paid.

## Migration Scripts
Which Migration scripts are used in which cases?

In former (ADempiere) times we had a "release" directory and renamed it when doing the release. This was bad because history was lost by mercurial while doing the rename.

- Directory "i2.0" is for fixes to the version 2.0.
- Directory "i2.0z" is for new features that will become the next version.
- When we do a release the directory i2.0z is no more used and a new directory i3.0 is opened
- For a whole (actual) installation you need to apply all migration directories in the right order
- to keep an i2.0 running you have to apply all scripts in directory "i2.0"
- to keep running a "bleeding edge" installation you need to apply all scripts in "i2.0" and "i2.0z"
- to upgrade a 2.0 to the next release you have to apply all scripts in "i2.0" and "i2.0z" and then to "i3.0" and "i3.0z" (the last both may be empty at the beginning)

## Code a plugin
Our example is to create the model for a group of countries and use that to define tax specific to groups. The usecase is to use a special tax line for all countries of the european union.

## Create our Data Model in the Dictionary (Country Group)
The first part is the definition of a data model for Country Groups. The second is to define two more fields in the C_Tax table.

- Carlos began by creating a new repository at his bitbucket account. Bitbucket is free so this is an easy way to have your work in an open repository and talk a
- He creates a new database if he develops a new feature to not mix the feature up with other developments. In PostgreSQL you use a new database for that. The schema still stays at "adempiere"
- For a new feature you can create a new entity type. An Entity type helps seeing which things belong to your new module. And you can set a model package. The iDempiere core looks for the model classes in the given package. We use Entity type "CGR". You have to be careful to use this Entity Type in every new Entity record.
- Create a menu entry
- Create a window
- Create a tab
- create a table CGR_CountryGroup. The table name for a custom table has to begin with three (or more) big letters and "_" as a prefix. By convention you use the Entity Type as the prefix.
- to create a table Carlos likes to copy a given table to not have to create the basic columns. He uses M_FreightCategory with the copy button. Some columns can be
: If you want to create things for core you have to set two checkmarks in preferences to create a migration script and use centralized id management. We will not do that here but we mentioned this thing.
- go to the tab, set the table and crete the fields with the "Create Fields" Button.
- Use the tab editor (in the toolbar) to chenge the form.
- go to the table definition and set the standard window to our new window
- For the connection table C_CountrygroupCountry  we begin also by copying M_FreightCategory, deavtivate some columns and then add 2 parent link columns (both checked as such)
- you could create the connection table without an own id but Carlos prefers to create an id for every table. (Without that you have no attachments, chat, audit, and more things)
- we create a second tab (with level 1) in our new window
- we create a new tab in the old window "Country Region and City"
- If we create a new tab in a standard window we should use 45 as the sequence number. The numbers 40,50,60 may be used later for trunk extensions
- We use process "Role Access Updates" to give access rights for GardenUser etc. If you use roles with manual rights you have to give rights to the new window

While working with the Application Dictionary you should always use a cache reset after changing something.

### Translation Table
We wanted to have the name and description of the Country group to be translated.

- create a new Table C_CountryGroup_Trl
- As a base to copy the columns we use the C_Charge table
- This table needs "AD_Language" and "IsTranslated"
- If you do a translation you should set the IsTranslated value after translating. This flag is cleaned
- The Columns that are to be translated have to be marked with "IsTranslated" in the "Table and Column" window
- In our window we create a new tab and mark it by setting the flag "IsTranslationTab"
- At the end you have to go to the Language window and press the Language Maintenance Button to add new Translations to the translation table
- Create a new primary index with two columns (we found a bug IDEMPIERE-1901, but it will be solved hopefully soon)
- Nicolas did a process to help with creating translation tables (CreateTranslationTable.java). He has his code in [IDEMPIERE-1216](https://idempiere.atlassian.net/browse/IDEMPIERE-1216)

## Create our Data Model in the Dictionary (Country Group)
- We add two fields to the Tax Window Country for C_CountryGroupTo_ID and C_CountryGroupFrom_ID
- You can design the tab view by using the view editor or you can set the sequence number by hand. The second is not so comfortable but it preserves the old sequence numbers for the old fields and gives a better updateability of the 2pack. (It may be that one can improve the form editor to not change sequences in such a case).

## Using 2Pack to export the Dictionary changes
- Go to the Pack out window
- In Export Package tab you can set a "From" date. With this date you can export the new tab we did in the Country Window and it will
- The check mark "Export Dictionary Type" will export Entities from the standard types. You can use this if you changed some of the standard fields but it may lead to extract very many things
- Extract the Entity Type
- In the tab "Package Details" if you use the Type "Application or Module" then you can give a menu entry. It automatically extracts the menu entry, the window, the tab and the tables
- You have to care to export the 2Pack definition itself. You can create an 2Pack export record to export the 2Pack definition itself (one line for the header and one line for the detailed records). Then the packages is self-contained. Or you can export the 2Pack defintion by pressing the export button. Then you have two files (one as a user installation 2Pack and one for the developer definition).

Both ways to export a 2Pack file (using the Windo or the Export Button) use 2Pack-Handlers that can be defined for special types. There is no handler for the 2Pack-definition, that's why we need two lines for that. The Export button uses the window view definition in this case, the 2Pack exporter record uses only one line.

## Code
We followed the documentation done by Jan Thielemann at [:Category:Plug-In_Development](https://wiki.idempiere.org/en/:Category:Plug-In_Development). We used the following documents in our workshop:

- [Developing_plug-ins_without_affecting_the_trunk](https://wiki.idempiere.org/en/Developing_plug-ins_without_affecting_the_trunk)
- [Developing_Plug-Ins_-_Get_your_Plug-In_running](https://wiki.idempiere.org/en/Developing_Plug-Ins_-_Get_your_Plug-In_running)

We want that in the tax table it is not possible to set a CountryGroup and a Country at the very same time. To get this there are different ways:

- http://wiki.idempiere.org/en/Developing_Plug-Ins_-_IModelFactory
: With that you can create a whole new model class. We can use this for our own tables like C_CountryGroup (Using the GenerateModel Launch Configuration insode Eclipse). There is also a way to use this for extended trunk classes. For that you can use GenerateModel to only create the Interface of C_Tax. Then you can extend the trunk Tax class implementing your new interface. You have to extend the getters and setters by hand. This is a bit dangerous because

- http://wiki.idempiere.org/en/Developing_Plug-Ins_-_ModelValidator
: This is like the old ADempiere way of validating a model. There are events for some different points in the lifetime of a record.

- http://wiki.idempiere.org/en/Developing_Plug-Ins_-_Model_Events
: This is the most powerful way to set events in the lifetime of objects but it also takes events about login, windows, etc.

## Results
- The example code we did can be found at [CarlosRuiz_globalqss/workshop-burg-2014](https://archive.softwareheritage.org/browse/origin/directory/?origin_url=https://bitbucket.org/CarlosRuiz_globalqss/workshop-burg-2014)
- Our idea was so good that Carlos decided to move it into trunk. https://idempiere.atlassian.net/browse/IDEMPIERE-2127

---

_Source: [Wiki](https://wiki.idempiere.org/en/IDempiere_Workshop_2014)_
