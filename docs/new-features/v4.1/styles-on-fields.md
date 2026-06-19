---
sidebar_position: 2
title: "Styles On Fields"
sidebar_label: "Styles On Fields"
description: "**Contributor:** [TrekGlobal](http://www.trekglobal.com/)"
tags: [user-experience]
---
**Goal:** Usability

**Contributor:** [TrekGlobal](http://www.trekglobal.com/)

**Developer:** Heng Sin Low

**Description:**

Now you can set special css styles for fields in Windows. The css styles can depend on the theme or any display logic.

This is achieved simply configuring records in the new CSS Style window:

Fields:
- **Tenant:** You can define entries for System or in Tenants, all users will see the System defined entries, Tenant entries will be shown just in specific tenant
- **Organization:** If the organization is set, it is used as a filter for the query
- **Name:** Name of the CSS Style
- **Description:** Description of the CSS Style

Once you create a record in the CSS Style tab, create one in the Style Line tab for each style you want to add:

![Styles](pathname:///img/new-features/v4.1/Styles.png)

Fields:
- **Tenant:** You can define entries for System or in Tenants, all users will see the System defined entries, Tenant entries will be shown just in specific tenant
- **Organization:** If the organization is set, it is used as a filter for the query
- **Style:** Parent record.
- **Line No:** Line No defines the
- **Inline Style:** CSS inline Style. Here you put the CSS rules you want to apply, it can be any css rules supported by HTML. [Examples](https://www.w3schools.com/cssref/pr_font_weight.asp).
    - After 5.1 was added the ability to define also a class in theme to be used here instead of inline style, so the rule is:
      - If the inline style starts with @sclass= - it calls the setSclass method of the HTML component. See [setSclass](https://www.zkoss.org/javadoc/8.0.0/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setSclass(java.lang.String))
      - If the inline style starts with @zclass= - it calls the setZclass method of the HTML component. See [setZclass](https://www.zkoss.org/javadoc/8.0.0/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setZclass(java.lang.String))
      - otherwise it calls the setStyle method of the HTML component. See [setStyle](https://www.zkoss.org/javadoc/8.0.0/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setStyle(java.lang.String))
- **Display Logic:** The logic in this field determines whether the rule is applied in a particular case or not.
- **Theme**: The theme on which the CSS Style will be used, you can fill it with a custom theme name, default or leave it blank to apply to all themes.

Once the CSS Style record is created, go to Window, Tab & Field window and set the Field Style and/or the Label Style to the CSS Style that you created:

![02 Field](pathname:///img/new-features/v4.1/02_Field.png)

The result looks like this:

![ResutlCSS](pathname:///img/new-features/v4.1/ResutlCSS.png)

**Technical Info:** [IDEMPIERE-3115](http://idempiere.atlassian.net/browse/IDEMPIERE-3115), [IDEMPIERE-3617](http://idempiere.atlassian.net/browse/IDEMPIERE-3617)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF4.1_Styles_On_Fields)_
