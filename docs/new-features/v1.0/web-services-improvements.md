---
sidebar_position: 58
title: "Web Services Improvements"
sidebar_label: "Web Services Improvements"
description: "**Goal:** Technical improvement of [Web services](https://wiki.idempiere.org/en/Web_services)"
tags: [technical]
---
**Goal:** Technical improvement of [Web services](https://wiki.idempiere.org/en/Web_services)

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Feature Ticket:** [IDEMPIERE-460](http://idempiere.atlassian.net/browse/IDEMPIERE-460) improved by Deepak Pansheriya

**Github source:** [iDempiere](https://github.com/idempiere/idempiere). Look for [org.idempiere.webservices](https://github.com/idempiere/idempiere/tree/master/org.idempiere.webservices).

**Category of technology:** Middle-ware [Web-Services](http://en.wikipedia.org/wiki/Web_service)

**Improvements in Brief:**
- High level document process
- Run-time Validation
- Process fine-tuning
- iDempiere plug-in ready

**Development in Brief:**
- Converted ADempiere Web-services as iDempiere plugin
- Compatible to version iDempiere 1.0
- Migrated from XFire to CXF framework.
- Added Composite methods for singular client calls, reducing overhead of redundant calls
- Web-Service plugin for generic access to any model, process or action in iDempiere.
- Documentation content and tutorial provided by Deepak Pansheriya
- Wiki editing assistance from Red1 ([talk](https://wiki.idempiere.org/en/User_talk:Red1))

**Contribution Accreditation**
- Initial prototype by 3E of Poland in 2007
- The New Web Services Window (Ruiz)
    - Search Key (Ruiz)
    - Web Service (Ruiz)
    - Web Service Method (Ruiz)
    - Table (Ruiz)
- Web Service Parameters (Ruiz)
- Web Service Field Input (Ruiz)
    - DB Column Name (Pansheriya)
    - Reference (Pansheriya)
    - Identifier (Pansheriya)
    - Allow Null Value (Pansheriya)
    - Identifier logic (Pansheriya)
- Web Service Field Output (Ruiz)
    - Web Service Access (Ruiz)
- Code review (HengSin)
- Web resource
    - http://www.adempiere.com/Adempiere_Web_Services (Ruiz)
    - http://www.adempiere.com/Adempiere_Web_Services_Security (Ruiz)

## The New Web Services Window
1. Due to the many contributions stated above, our *Web-Services* has progressed much more in **iDempiere** *master-detail* layout with high-powered operational management.
1. We shall go through the new feature request from the top. Below is its main window and tabs.
![First Look](pathname:///img/new-features/v1.0/First_Look.png)

1. The above is launched from the main menu by clicking on **Web Services Security**.
1. The first tab is **Web Service Type** to define the web-services allowed on iDempiere.
1. The Web Services plugin has generic implementation for users to make calls to the ERP server on any table, process or workflow actions.
1. iDempiere has both *Input* and *Output* templates for external users to map the elements of their XSD (XML Schema Definitions).
1. The new *Composite services* further reduce overhead of tasks the clients need to do as simple actions such as *Create a Business Partner* is now a single call instead of numerous cumbersome calls, thus reducing the work of the developer and ensure lower maintenance in future.

### Search Key
1. The search key value maps to the **serviceType** tag in the web service request. This is demonstrated in the following snippet:
 &lt;web:ModelCRUD&gt;
   &lt;adin:serviceType&gt;CreateBPartner&lt;/adin:serviceType&gt;
   &lt;adin:TableName&gt;C_BPartner&lt;/adin:TableName&gt;
   &lt;adin:RecordID&gt;0&lt;/adin:RecordID&gt;
   &lt;adin:Action&gt;CreateUpdate&lt;/adin:Action&gt;
      :
      :
 &lt;web:ModelCRUD&gt;

### Web Service
1. This field denotes the type of web service. We now have both **Model-Oriented** and **Composite** Interfaces. The **ModelADService** is also improved to cover *createUpdateData* service.

### Web Service Method
1. This is for selecting an operational task during web-service implementation.
1. Each web-service type has option of different tasks.

### Table
1. This field is used when the web-service method needs to work with a **Table**.
1. For example *Create new record*, *Read existing records* or *Update existing records*.

## Web Service Parameters
1. This tab used to define parameters for web service.
1. Parameter can be a *Constant* or *Free*.
1. If it is *Constant* then the value from *Constant Value* field is used, any value passed in from request is ignored.
1. In case of *Free*, value from *Request* is used.
1. Note that for *_ID* parameter, it will accept both *Record ID* and *UUID* value.
![Web Service Parameters](pathname:///img/new-features/v1.0/Web_Service_Parameters.png)

## Web Service Field Input
1. This tab is used to define the list of fields ( columns ) for web-service that creates new record or updates existing record.
1. This tab controls the exposing of columns from the web-service request.
1. Note the new *Reference* field that allows overriding of look-up type needed.
![WebService Field Input](pathname:///img/new-features/v1.0/WebService_Field_Input.png)

### DB Column Name
![WebService Field Input CtxVariable](pathname:///img/new-features/v1.0/WebService_Field_Input_CtxVariable.png)
1. Above shows how this can be used to configure the variable name for *Request Ctx*.
1. This field contains the string pattern used for table name.
1. More on *Request Ctx* later.

### Reference
1. The idea is to allow the use of another key during look-up from another table.
1. For example, to create **OrderLine**, we can use *SKU* instead of *Product_ID*.
1. This field can thus override reference type in case of Table column and providing reference type for **Ctx Variable**.
1. Web service uses this field to determine *Data-type* of variable.
1. Reference key is used to override **List** or look-up value.

### Identifier
1. If this flag is checked then current column is considered as part of record key.
1. Multiple columns can be configured as identifier and they are combined for use as a composite key.
1. Screen below shows how *C_BPartner_ID* is used as identifier to find existing record.
![WebService Field Input IdentifierLogic](pathname:///img/new-features/v1.0/WebService_Field_Input_IdentifierLogic.png)

### Allow Null Value
1. When this field is checked then *null* value is considered in retrieving an existing record.

### Identifier logic
1. This field add support for identifying record through the use of an SQL statement.
1. Above screen shows how a *C_BPartner* record can be identified through **AD_User.email** .

## Web Service Field Output
1. This tab is used to configure the list of values that will be returned in response.
1. Here you can choose columns from the *Created/Updated* record.
![Web Service Field Output](pathname:///img/new-features/v1.0/Web_Service_Field_Output.png)

### Web Service Access
- This tab configures the *Roles* that can access the defined web service.
- It gives additional layer of security as the Web-service is accessed via the open Web.
![Web Service Access](pathname:///img/new-features/v1.0/Web_Service_Access.png)

## Composite Service
1. Composite form of web-services is introduced in this iDempiere 1.0 version to support complex operations such as *create BPartner, contact and location* within a single request and within a single transaction.
1. Another objective for this deisgn is to reduce the number of calls between client and server.
1. Composite service is actually a wrapper on the model-oriented web-service.
1. It allows to combine multiple atomic *ModelADService* operation like *createData*, *UpdateData*, *createUpdateData*, *setDocAction* etc in single request.
1. Below is sample request syntax for a composite service.
 &lt;web:compositeOperation&gt;
   &lt;web:CompositeModelRequest&gt;
    &lt;web:ADLoginRequest&gt;
         :
         :
    &lt;/web:ADLoginRequest&gt;
    &lt;web:serviceType&gt;SyncOrder&lt;/web:serviceType&gt;
    &lt;web:**operations**&gt;
      &lt;web:operation **preCommit**="false" **postCommit**="false"&gt;
        &lt;web:**TargetPort**&gt;createUpdateData&lt;/web:**TargetPort**&gt;
          &lt;web:ModelCRUD&gt;
             :
             :
          &lt;/web:ModelCRUD&gt;
        &lt;web:TargetPort&gt;createUpdateData&lt;/web:TargetPort&gt;
      &lt;/web:operation preCommit="false" postCommit="false"&gt;
     &lt;/web:operations&gt;
  &lt;/web:compositeOperation&gt;

1. You can take a look at the highlighted tags.
1. Operations allow to combine multiple *CRUD* operation or *runProcess* operation.
1. **TargetPort** specify operation name of *ModelADService** to be called.
1. Possible value for **TargetPort** are *createData*, *updateData*, *createUpdateData**, *deleteData*, *readData*, *setDocAction* and *runProcess*.
1. All operation specified in this request share one login request and can share data with each other using *requestCtx* (@* variable).
&lt;nowiki&gt;*Note that createUpdateData is an improvement for the ModelADService included in this feature request.&lt;/nowiki&gt;

**See also Video:**

[Watch on YouTube](https://www.youtube.com/watch?v=GrIhWbPQBrs) by Jan.thielemann - [evenos Consulting GmbH](http://evenos-consulting.de)

## Transaction Control
1. We can now fine-tune the management of data been replicated via iDempiere's Web-Service.
1. When we synchronize data, we can use the concept of **Safe-Point**.
1. We may not need to do re-sync if we reached or passed successfully a *safe-point* location.
1. For example if we are synchronizing Order, creation of *Sales Order Header* and line atomically but once we have created all *OrderLines* we can save them even though we are not able to *Complete* or *Prepare* the *Order*.
1. Composite service allow to control over transaction using **preCommit** and **postCommit** attributes on *operation* element.
1. If *preCommit* is true, whatever done before current operation will be committed to the database.
1. When *postCommit* is true, commit is performed after current operation is executed successfully.
1. If any error occurs, then a transaction is rolled-back and its response indicates whether an operation is committed or rolled-back by referring to the attribute **IsRolledBack** on standard response element.
1. **isError** attribute is set to true for failed operations.

## Request Ctx Variable
1. **Request Ctx** variable is available for reference during the entire request life-cycle.
1. This *Ctx Variable* keeps track of all created records in current request by table name.
1. Request can populate any custom variable name defined on *Web Service Security* -> *Web Service Field Input* tab too.
1. These variables are accessible also by consecutive operations by script.
1. For example if we have created a *User* and want to use the same on *C_Order*, our *createOrder* request can have input field parameter as below.

 &lt;adin:field column="AD_User_ID"&gt;
   &lt;adin:val&gt;@AD_User. AD_User_ID&lt;/adin:val&gt;
 &lt;/adin:field&gt;

1. Here whenever field has value starting with @, the web service will consider the consecutive string as a variable and try to resolve it from the request context.
1. In above example, @AD_User. AD_User_ID will get AD_User_ID from previously created AD_User record.
1. If request want to populate custom variable into Ctx, it can configure web service input field without selecting any column and use DB Column Name field to define the variable name.
1. For example, below screen shows **email** variable set on *CreateBPartner* request.
1. There is no column named **email** on **C_BPartner** but configuring this variable on **Web Service Input** tab will allow to populate the request context with email value on *CreateBParner* request.

![CtxVariable](pathname:///img/new-features/v1.0/CtxVariable.png)

1. When you are configuring a *DB Column*, *Column* must be blank and reference must be selected.
1. Ctx variable decides data-type for input based on *Reference* key.

## Env Ctx Variable
1. iDempiere's Env variable are accessible using script @#VariableName syntax.
1. We can use this syntax in field and recordID elements to get dynamic value.

## createUpdateData
1. This operation checks for existing record and perform either create or update record.
1. This operation can be better than the *createData* or *updateUpdate* operation.
1. *createUpdateData* uses record identifier(s) to check whether a record exists or not.
1. **Web Service Input Field** has an identifier *Flag* which is used to decide whether an input field will be used to identify the record or not.
1. More than one column can be used to identify any record.
1. For example *C_BPartner_ID* and *Email* can be used to identify *BPUser*.
1. Even custom SQL can be used in identifier logic to return its record ID.
1. This operation allows explicit control creation or updating of record.
1. *Request* can specify following value on *Action*.
    1. *Create* - Only create record. If record exists, return error
    1. *Update* - Only update record. If record do not exists, return error
    1. *CreateUpdate* - If record does not exists, create it otherwise update existing record
1. Below is an sample request document for **createUpdateData**.

 &lt;_0:createUpdateData&gt; &lt;_0:ModelCRUDRequest&gt;
   &lt;_0:ModelCRUD&gt;
     &lt;_0:serviceType&gt;CreateUpdateLocation&lt;/_0:serviceType&gt;
       &lt;_0:TableName&gt;C_Location&lt;/_0:TableName&gt;
       &lt;_0:RecordID&gt;0&lt;/_0:RecordID&gt;
     &lt;_0:Action&gt;**CreateUpdate**&lt;/_0:Action&gt;
     &lt;_0:DataRow&gt;
       &lt;_0:field column="C_Country_ID" lval="United States"/&gt;
       &lt;_0:field column="Address1"&gt;
           &lt;_0:val&gt;1625 Cowboy Chaps Place&lt;/_0:val&gt;
       &lt;/_0:field&gt;
       &lt;_0:field column="C_Region_ID" lval="NV"/&gt;
       &lt;_0:field column="RegionName"&gt;
           &lt;_0:val&gt;NV&lt;/_0:val&gt;
       &lt;/_0:field&gt;
       &lt;_0:field column="Postal"&gt;
           &lt;_0:val&gt;89002&lt;/_0:val&gt;
       &lt;/_0:field&gt;
       &lt;_0:field column="City"&gt;
           &lt;_0:val&gt;Henderson&lt;/_0:val&gt;
       &lt;/_0:field&gt;
     &lt;/_0:DataRow&gt;
   &lt;/_0:ModelCRUD&gt;
       &lt;_0:ADLoginRequest&gt;
         :
         :
   &lt;/_0:ADLoginRequest&gt;
  &lt;/_0:ModelCRUDRequest&gt;
 &lt;/_0:createUpdateData&gt;

1. Please take note of **Action**. It indicates *CreateUpdate*. This mean record is either created or updated based on existence.

## Lookup
1. Newly added lVal parameter for *Field* will pass readable string and will be converted to ID using standard iDempiere lookup mechanism.
1. For example to set Shipping Method on Order, we can retrieve M_Freight_ID through Shipping Method name.
1. Below is example how we can find out Region using lookup instead of C_Region_ID. &lt;_0:field column="C_Region_ID" lval="NV"/&gt;
1. Please note that we are using lval attribute instead of val element when we want to use lookup.

## WS Validator
1. Web-service Validator can be used to extend web-service functionality and appending additional business logic.
1. Validator are added as osgi service and must implement the **IWSValidator** interface.
1. Validator can be registered to listen to a type of web-service or all web-services.
1. If Validator needs to listen to all web-service calls, then use the special value GLOBAL in WSType parameter.
1. Validators are called at following timings:
    1. Before Parse
    1. After Parse
    1. Before Save
    1. After Save

## RecordIDVariable
1. RecordIDVariable is added to override recordID field and allow support for scripting.
1. Using this parameter into request, record ID can be set from variable in requestCtx.
1. Usage of this is in composite service to perform setDocAction without adding any complexity to identify record.
1. Below sample shows how it is used to complete a document created in previous operation inside a composite srequest.

 &lt;_0:compositeOperation&gt;
  &lt;_0:CompositeRequest&gt;
    &lt;_0:serviceType&gt;SyncOrder&lt;/_0:serviceType&gt;
    &lt;_0:operations&gt;
      &lt;_0:operation preCommit="false" postCommit="false"&gt;
        &lt;_0:TargetPort&gt;createUpdateData&lt;/_0:TargetPort&gt;
          &lt;_0:ModelCRUD&gt;
            &lt;_0:serviceType&gt;createOrderRecord&lt;/_0:serviceType&gt;
            &lt;_0:TableName&gt;C_Order&lt;/_0:TableName&gt;
                 :
                 :
          &lt;/_0:ModelCRUD&gt;
        &lt;/_0:operation&gt;
      &lt;_0:operation preCommit="true" postCommit="false"&gt;
        &lt;_0:TargetPort&gt;createUpdateData&lt;/_0:TargetPort&gt;
          &lt;_0:ModelCRUD&gt;
              &lt;_0:serviceT ype&gt;CreateOrderLine&lt;/_0:serviceT ype&gt;
              &lt;_0:TableName&gt;C_OrderLine&lt;/_0:TableName&gt;
                 :
                 :
          &lt;/_0:ModelCRUD&gt;
        &lt;/_0:operation&gt;
      &lt;_0:operation preCommit="true" postCommit="true"&gt;
        &lt;_0:TargetPort&gt;setDocAction&lt;/_0:TargetPort&gt;
        &lt;_0:ModelSetDocAction&gt;
          &lt;_0:serviceType&gt;CompleteOrder&lt;/_0:serviceT ype&gt;
          &lt;_0:tableName&gt;C_Order&lt;/_0:tableName&gt;
          &lt;_0:recordID&gt;0&lt;/_0:recordID&gt;
        &lt;_0:recordIDVariable&gt;@C_Order.C_Order_ID&lt;/_0:recordIDVariable&gt;
            &lt;_0:docAction&gt;CO&lt;/_0:docAction&gt;
        &lt;/_0:ModelSetDocAction&gt;
     &lt;/_0:operation&gt;
   &lt;/_0:operations&gt;
  &lt;/_0:CompositeRequest&gt;
 &lt;/_0:compositeOperation&gt;

1. In above request, we are creating order and then completing same using *setDocAction* operation.
1. We use **recordIDVariable** to retrieve record ID for order created before this operation.

## Reference Overriding
1. Web-service uses *Reference* type from *Table* column as default but can also be overridden on *Web Service Input* field as shown below.
1. We use this overriding mechanism to define custom look-up for column.
1. For example, when we configure reference for **M_Product** table, we normally use *Product Name*.
1. Now we can choose to use *SKU* to identify products in our web-service.
1. In this case we can define new look-up which use display field as SKU for product.
1. Below shows how we have configured **M_Product_ID** column on **CreateUpdateOrderLine** service.

![Reference OverRiding](pathname:///img/new-features/v1.0/Reference_OverRiding.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Web_Services_Improvements)_
