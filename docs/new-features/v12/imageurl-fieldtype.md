---
sidebar_position: 20
title: "ImageURL Fieldtype"
sidebar_label: "ImageURL Fieldtype"
description: "**Developer:**  Hengsin, Deep Testing, Carlos Ruiz."
tags: [technical]
---
**Goal:** Technical

**Developer:**  Hengsin, Deep Testing, Carlos Ruiz.

**Feature Ticket:** [IDEMPIERE-6242](https://idempiere.atlassian.net/browse/IDEMPIERE-6242)

**Sponsor:** [Norbert Bede ad Cloudempiere.com](http://cloudempiere.com)

**Description:**

https://idempiere.atlassian.net/browse/IDEMPIERE-6242 adds a new ImageURL editor which rendering images from web url only.

**Technical Changes**
    - Added Image URL display/data type
```
   - Implemented thumbnail rendering for Image and Image URL data type (Grid View and Info Window)
   - Implemented showing full size image for thumbnail on hover of the thumbnail image
```

**Related to**
    - AD_Form ImageURL, load from theme or fragment attached to org.adempiere.ui.zk
    - AD_InfoProcess Image URL, load from theme
    - AD_InfoWindow ImageURL, load from theme or fragment attached to org.adempiere.ui.zk
    - AD_PrintFormatItem.ImageURL, load from web, theme or fragment attached to org.adempiere.ui.zk
    - AD_PrintTableFormat.ImageURL, load from web
    - AD_UserDef_Info.ImageURL, same as AD_InfoWindow ImageURL

**Setup**

the admin able to define the size of thumbnails rendering in grid.

    - Add client level AD_SysConfig ZK_THUMBNAIL_IMAGE_HEIGHT, default to 100
    - Add client level AD_SysConfig ZK_THUMBNAIL_IMAGE_WIDTH, default to 100

**Example CSS Customization of No Image Place Holder (.no-image) and Hover Image (.fullsize-image) **
```
```
.no-image &#123;
```
	background-image: url("../images/noimage.png");
```
	background-size: 22px;
 	height: 22px;
 	width: 100%;
 	display: inline-block;
 	background-position-x: center;
 	background-repeat: no-repeat;
&#125;
```

```
.fullsize-image &#123;
```
	height: 200px !important;
	width: 300px !important;
```
&#125;
```
```

**Example Usage**

1. login as admin - open product info, change add fieldtype ImageURL - pointing to m_product.imageurl field

2. enter your image web links into products

3. setup your grid image sizes - you want to see as default by sysconfig

4. open product info see your grid and funny images.

**Screens**
![Product image url editor](pathname:///img/new-features/v12/Product-image-url-editor.png)

_the imageurl editor allow click on field, and enter web url_
![Info window grid withimages](pathname:///img/new-features/v12/Info-window-grid-withimages.png)
![Info window grid hover](pathname:///img/new-features/v12/Info-window-grid-hover.png)

_the screen shows how the user can zoom in on the details of the image by on hover_

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF12_ImageURL_Fieldtype)_
