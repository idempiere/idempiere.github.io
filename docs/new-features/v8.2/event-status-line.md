---
sidebar_position: 27
title: "Event Status Line"
sidebar_label: "Event Status Line"
description: "**Goal:** Development"
tags: [development]
---
**Goal:** Development

**Developer:** Carlos Ruiz

**Description:**

Now you can add complex things in the Quick Info panel using java code capturing the event MStatusLine.BEFORE_PARSE_STATUS_LINE.

Let's explain it with an example to render a QR Code from the Description on the Test table:

## Message
For this example we need a very simple message to fill with a String, so we simply define the message as `{0}`

![01 Message](pathname:///img/new-features/v8.2/01_Message.png)

## Status Line
The SQL definition for the status line is also very simple, we simply need to get the context variable from the Dual table.

```SQL
SELECT '@MyComplexVariable@' FROM Dual
```

Note the context variable is going to be filled on an EventHandler in a plugin, shown in the next step.

![02 StatusLine](pathname:///img/new-features/v8.2/02_StatusLine.png)

## Java Class
```java

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

public class TestEventHandler extends AbstractEventHandler {

    @Override
    protected void initialize() {
        registerEvent(MStatusLine.BEFORE_PARSE_STATUS_LINE);
    }

    @Override
    protected void doHandleEvent(Event event) {
        if (MStatusLine.BEFORE_PARSE_STATUS_LINE.equals(event.getTopic())) {
            MStatusLine sl = (MStatusLine) event.getProperty(EventManager.EVENT_DATA);
            int windowNo = (int) event.getProperty(MStatusLine.EVENT_WINDOWNO);

            String description = Env.getContext(sl.getCtx(), windowNo, "Description");

            /*
             *  alternatively - if description is not in the context, you can use
            int testId = Env.getContextAsInt(sl.getCtx(), windowNo, "Test_ID");
            MTest test = new MTest(sl.getCtx(), testId, sl.get_TrxName());
            String description = test.getDescription();
            */

            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix;
            try {
                bitMatrix = qrCodeWriter.encode(description, BarcodeFormat.QR_CODE, 240, 240);
            } catch (WriterException e) {
                throw new AdempiereException(e);
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            try {
                MatrixToImageWriter.writeToStream(bitMatrix,"png", outputStream);
            } catch (IOException e) {
                throw new AdempiereException(e);
            }
            String base64 = new String(Base64.getEncoder().encode(outputStream.toByteArray()));
            String strInnerData = "<td align='center' style='width:240px;height:240px'>"+
                    "<img alt='Embedded Image' src='data:image/png;base64," + base64 + "'/></td>";
            strInnerData = strInnerData.replaceAll("'", "''"); // double the quotes to embed into SQL
            Env.setContext(sl.getCtx(), windowNo, "MyComplexVariable", strInnerData);
            return;
        }
    } // doHandleEvent

}

```

Of course this code must be added in a plugin with the corresponding OSGi definition.

## Result shown to the User
![04 ResultInTest](pathname:///img/new-features/v8.2/04_ResultInTest.png)

**Technical Info:** [IDEMPIERE-4798](https://idempiere.atlassian.net/browse/IDEMPIERE-4798)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Event_Status_Line)_
