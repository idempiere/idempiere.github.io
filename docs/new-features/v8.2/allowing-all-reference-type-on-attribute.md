---
sidebar_position: 2
title: "Allowing all reference type on attribute"
sidebar_label: "Allowing all reference type on attribute"
description: "**Contributor:** [Logilite Technologies](http://www.logilite.com)"
tags: [functional]
---
**Goal:** Functional

**Contributor:** [Logilite Technologies](http://www.logilite.com)

**Developer:** Deepak Pansheriya

**Description:**

Attribute set has been powerful mechanism for attaching meta data to product or product instance since compiere days. Attribute is designed with Entity Value model which is used in many application as base model to make configurable models. While we have this model already in system then its use can be extended to many other features. For example in DMS system it can serve for Content model Designing.

While thinking that attribute set can be used for different places where we want to make configurable models, It has limitation that it came with very limited data type support. Current attribute supports only List, numberic and string type. While iDempiere supports many other reference types it is always desirable to support all reference type supported in iDempiere.

It always been exciting to see Table reference on attribute and that is enabled by this feature. you can see below image how table can be configured.

![Attribute Table Reference](pathname:///img/new-features/v8.2/Attribute-Table-Reference.PNG)

For maintaining backward compatibility, Attribute are still supporting old attribute type but now newly attribute value type Reference added. When attribute type value is reference then Attribute data type will be same as reference field mentioned. This references are same which are available on DB column. Below screen shot gives list of supported references.

![Attribute Reference Type](pathname:///img/new-features/v8.2/Attribute-Reference_Type.PNG)

Below is how attribute dialog looks with different editor.

![Attribute Panel](pathname:///img/new-features/v8.2/Attribute-Panel.PNG)

**Technical Info:** [IDEMPIERE-2999](http://idempiere.atlassian.net/browse/IDEMPIERE-2999)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Attribute_All_Reference)_
