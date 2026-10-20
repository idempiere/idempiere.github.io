# Account Info Customization

> Added new feature to allow customization of Account Info window with custom plugin for enhancement or modification of default account info.

Developer : A. Zuhri Utama

Sponsor : [PT. Reka Estu Digital](https://rekaestudigital.id)

Jira Ticket : [IDEMPIERE-6533 - Register Account Info As Form](https://idempiere.atlassian.net/browse/IDEMPIERE-6533)

Description : 

How To : 

to customize Account Info, you need to create or use your own plugin. copy default account info window from org.adempiere.webui.acct.WAcctViewer class to your plugin, ex. com.company.form.WCustomAcctViewer and register the new form using [FormFactory](/docs/basic-development/plugin-development/plugin-forms.md).

example of FormFactory : 

```java title="src/com/company/form/FormFactory.java"
package com.company.form;

import org.adempiere.webui.acct.WAcctViewer;
import org.adempiere.webui.factory.IFormFactory;
import org.adempiere.webui.panel.ADForm;
import org.osgi.service.component.annotations.Component;

// the ranking must be higher than the core form factories (0 and 1)
@Component(immediate = true, service = IFormFactory.class, property = {"service.ranking:Integer=100"})
public class FormFactory implements IFormFactory
{

	@Override
	public ADForm newFormInstance(String formName) {
		if (WAcctViewer.class.getName().equals(formName))
			return new WCustomAcctViewer();
		return null;
	}

}
```

test the plugin by register your plugin on server.product launch then click the Account Info on views widget dashboard.
