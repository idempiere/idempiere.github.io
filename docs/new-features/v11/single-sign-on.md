---
sidebar_position: 10
title: "Single Sign-On"
sidebar_label: "Single Sign-On"
description: "**Developer:** [Logilite Technologies](http://www.logilite.com/)"
tags: [functional]
---
**Goal:** Security

**Developer:** [Logilite Technologies](http://www.logilite.com/)


## Goal
iDempiere 11 has added support for single sign-On. Single sign-on on help to get authenticated with third party identity provider like Azure MSAL or AWS cognito server. This remove requirement to store credentials of employee in database and make more secure against threat exposing user data.

iDempiere provides services to implement plugin for any SSO providers. The goal of this How-To is to show how to develop plug-in project to support new SSO provider. For creating blank plugin project, refer guide as [Get Your Plugins Running](https://wiki.idempiere.org/en/Developing_Plug-Ins_-_Get_your_Plug-In_running.Explanations)

logilite has developed and made available plugins for MSAL  (Azure) and AWS Cognito.

iDempiere has also included build in SSO support for OIDC compliance identity provider.

## Not implemented yet
The current version of SSO does not implement changes on:
- SOAP web services, these keep working with AD_User authentication
- SSO provider per tenant is not implemented, this would require a mechanism to identify the tenant on the URL

## SSO Provider plugin
Deepak Pansheriya has published plugins for [Azure](https://github.com/dpansheriya/com.logilite.sso.azure) and [Cognito](https://github.com/dpansheriya/com.logilite.sso.cognito), you can start using it with these plugins:

You can find instructions about how to configure AWS Cognito and the plugin within iDempiere in the provided file:

[AmazonCognitoConfiguration.docx](https://github.com/dpansheriya/com.logilite.sso.cognito/raw/master/CognitoServerConfig/AmazonCognitoConfiguration.docx)

## Built in support for OIDC Identity Provider
iDempiere has built in SSO support for OIDC compliance identity provider.

We have tested SSO authentication with the following OIDC identity providers:
- [Google Cloud OIDC Configuration](https://wiki.idempiere.org/en/OIDC_SSO_Google_Identity)
- [Microsoft Azure OIDC Configuration](https://wiki.idempiere.org/en/OIDC_SSO_Microsoft_Azure)
- [Amazon Cognito OIDC Configuration](https://wiki.idempiere.org/en/OIDC_SSO_Amazon_Cognito)
- [Keycloak OIDC Configuration](https://wiki.idempiere.org/en/OIDC_SSO_Keycloak)

## How to implement SSO Provider Plugin
### Adding new item in SSO Provider drop down
On SSO configuration screen has SSO Provider field which list all SSO provider implementations available as plugin. first step is to add your SSO provider name in this drop down. For same follow below steps.
- If you are adding new identity provider support,  first step is to add SSO (identity) Provider Name in **SSO Provider List** on Reference.
- For same login as System user in system tenant.
- Open Reference window and locate record with name "SSO Provider List"
- Next go to tab list validation and create new entry
- Provide unique search key and name. Search key is used in your factory to identify configured SSO for your implementation
![MYSSOPROVIDER](pathname:///img/new-features/v11/MYSSOPROVIDER.png)
### Adding dependencies in your plugin
- open MANIFEST.MF of your plugin project and on dependency tab under required plugins, add following plugin dependencies as shown below

1. **org.adempiere.base**
1. **org.eclipse.jetty.servlet-api**
1. **org.adempiere.plugin.utils**
![SSOPluginDependencies](pathname:///img/new-features/v11/SSOPluginDependencies.png)

### Implement SSO Factory
For implementing SSO factory, add new class implementing ISSOPrincipleFactory as below. you should add condition in which case the object of your SSO provider (ISSOPrincipalService) implementor should be returned. Mostly we used SSO Provider configured on sso configuration screen.

```java
import org.adempiere.base.sso.ISSOPrincipalService;
import org.adempiere.base.sso.ISSOPrincipleFactory;
import org.compiere.model.I_SSO_PrincipleConfig;

import com.logilite.sso.test.principle.MSSOPrinciple;

public class MySSOFactory implements ISSOPrincipleFactory
{
	@Override
	public ISSOPrincipalService getSSOPrincipleService(I_SSO_PrincipleConfig config)
	{
		if ("MYSSOPROVIDER".equalsIgnoreCase(config.getSSO_Provider()))
			return new MSSOPrinciple(config);
		return null;
	}
}
```

### Implement SSO Provider
SSO Provider class implements ISSOPrincipalService interface.

#### ISSOPrincipalService  Method:
##### *hasAuthenticationCode*
- Method has ***request*** (*HttpServletRequest*) , ***response*** (*HttpServletResponse*)  as a parameter.
- Method will return true, if a request has an authentication code from SSO provider, other wise false.

##### *getAuthenticationToken*
- Method has ***request*** (*HttpServletRequest*) , ***response*** (*HttpServletResponse*)  and ***redirectMode*** (*String*) as a parameter.
- Method will send a request to SSO provider with the code & redirect URL to get the auth token & and save token in session.
- Token is save in session with attribute name ***SSOPrinciple.SSO_PRINCIPLE_SESSION_NAME***.

##### *isAuthenticated*
- Method has ***request*** (*HttpServletRequest*) , ***response*** (*HttpServletResponse*) as a parameter.
- Method will return true, if session has auth token, other wise false.

##### *redirectForAuthentication*
- Method has ***request*** (*HttpServletRequest*) , ***response*** (*HttpServletResponse*)  and ***redirectMode*** (*String*) as a parameter.
- Method will redirect request to the SSO provider for authentication.

##### *removePrincipalFromSession*
- Method has ***request*** (*HttpServletRequest*) , ***response*** (*HttpServletResponse*) as a parameter.
- Method will remove auth token from session.

##### *getUserName*
- Method has ***result*** (Object) as a parameter, result is token save in session.
- Method will return user name/email from token, as per System Configurator **USE_EMAIL_FOR_LOGIN**.

##### *getLanguage*
- Method has ***result*** (Object) as a parameter, result is token save in session.
- Method will return Login Language from token.

#### *SSOUtils* Method:
##### *getRedirectedURL*
- Method take ***redirectMode*** (*String*) , ***config*** (*I_SSO_PrincipleConfig*) as a parameter.
- Method will return  ***Redirect URIs*** (*String*) from SSO Provider configured (***config***) as per ***redirectMode*** .
- We have Redirect Mode as below.
- # ***SSOUtils*.*SSO_MODE_OSGI*** - Apache Felix Web Console Bundles
- # ***SSOUtils*.*SSO_MODE_MONITOR*** - iDempiere Monitor
- # ***SSOUtils*.*SSO_MODE_WEBUI*** - Web login

```java
import java.io.IOException;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.adempiere.base.sso.ISSOPrincipalService;
import org.adempiere.base.sso.SSOUtils;
import org.compiere.model.I_SSO_PrincipleConfig;
import org.compiere.model.MSysConfig;
import org.compiere.util.Language;

/**
 * In core BridgeFilter, AdempiereMonitorFilter, SSOWebuiFilter filter
 * use ISSOPrinciple methods to log-in/authenticated users using the SSO provider.
 */
public class MSSOPrinciple implements ISSOPrincipalService
{

	private I_SSO_PrincipleConfig config;

	public MSSOPrinciple(I_SSO_PrincipleConfig ssoConfig)
	{
		setConfig(ssoConfig);
	}

	/**
	 * When a request comes to any filter class, a request is checked for
	 * authentication code from the SSO provider.
	 */
	@Override
	public boolean hasAuthenticationCode(HttpServletRequest request, HttpServletResponse response)
	{
		// Check request has authentication code
		return false;
	}

	/**
	 * if {@code #hasAuthenticationCode(HttpServletRequest, HttpServletResponse)} returns true, then
	 * request is sent to the SSO provider with the code & response redirect URL to get the
	 * authenticated user token & and saved token in the session attribute
	 * {@link #ISSOPrinciple.SSO_PRINCIPLE_SESSION_NAME}
	 */
	@Override
	public void getAuthenticationToken(HttpServletRequest request, HttpServletResponse response, String redirectMode) throws Throwable
	{
		/**
		 * we have three redirectMode
		 * 1. SSOUtils.SSO_MODE_OSGI - Apache Felix Web Console Bundles
		 * 2. SSOUtils.SSO_MODE_MONITOR - iDempiere Monitor
		 * 3. SSOUtils.SSO_MODE_WEBUI - Web login
		 */
		// get redirect URL for SSO.
		String sso_Redirect_URL = SSOUtils.getRedirectedURL(redirectMode, getConfig());
		// SSO authentication token code

		// request.getSession().setAttribute(ISSOPrinciple.SSO_PRINCIPLE_SESSION_NAME, token);
	}

	/**
	 * if {@code #hasAuthenticationCode(HttpServletRequest, HttpServletResponse)} returns false,
	 * then current session attribute {@link #ISSOPrinciple.SSO_PRINCIPLE_SESSION_NAME}
	 * have a token or not.
	 */
	@Override
	public boolean isAuthenticated(HttpServletRequest request, HttpServletResponse response)
	{
		// Check request session is authenticated
		return false;
	}

	/**
	 * if {@code #isAuthenticated(HttpServletRequest, HttpServletResponse)} returns false,
	 * then the current request is redirected to the SSO provider for login/authentication.
	 */
	@Override
	public void redirectForAuthentication(HttpServletRequest request, HttpServletResponse response, String redirectMode) throws IOException
	{
		// Code for redirect to SSO provider
	}

	/**
	 * If there is any error SSO login/authenticating we remove the token and other save data from the
	 * request session.
	 */
	@Override
	public void removePrincipalFromSession(HttpServletRequest httpRequest)
	{
		// code to remove a token from the session or other info saved during SSO login.
	}

	/**
	 * return authenticate user name/email from token to validate in iDempiere
	 */
	@Override
	public String getUserName(Object result) throws ParseException
	{
		// check if IDempiere login validate by email/user name
		boolean isEmailLogin = MSysConfig.getBooleanValue(MSysConfig.USE_EMAIL_FOR_LOGIN, false);
		// Return the login user name/email.
		return null;
	}

	/**
	 * return {@link #Language} for login user, can be changed from Role panel
	 */
	@Override
	public Language getLanguage(Object result) throws ParseException
	{
		// Return login language/user IDempiere default method Language.getBaseLanguage();
		return null;
	}

	public I_SSO_PrincipleConfig getConfig()
	{
		return config;
	}

	public void setConfig(I_SSO_PrincipleConfig config)
	{
		this.config = config;
	}
}
```

### Create OSGi Service Component Definition
- Create **OSGI-INF** Folder in plugin if does not exist

- Right click in **OSGI-INF** > **New** > **Other..**

![OSGI INF Folder](pathname:///img/new-features/v11/OSGI-INF_Folder.png)
![Open Wizard](pathname:///img/new-features/v11/Open_Wizard.png)

- Search **Component Definition**
- Click **Next**
- Enter **Class, Name** and **File name** as shown in image below
- Click **Finish**

![Component Definition Wizard](pathname:///img/new-features/v11/Component_Definition_Wizard.png)
![NewComponentDefinition](pathname:///img/new-features/v11/NewComponentDefinition.png)

- Click **Add Property** with below details
****Name**: service.ranking
    - **Type**: Integer
    - **Values**: 10

![Service.ranking](pathname:///img/new-features/v11/Service.ranking.png)
![Service.ranking img](pathname:///img/new-features/v11/Service.ranking_img.png)

- Select **Services** section
- **Provide** **Services** > click **Add**
- Search **ISSOPrincipleFactory**
- Click **OK**

![Service ISSOPrincipleFactory](pathname:///img/new-features/v11/Service_ISSOPrincipleFactory.png)
![Services ISSOPrincipleFactory Img](pathname:///img/new-features/v11/Services_ISSOPrincipleFactory_Img.png)

- Component Definition **myssofactory.xml** look as below

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.1.0" name="com.logilite.sso.test.factory.MySSOFactory">
   <implementation class="com.logilite.sso.test.factory.MySSOFactory"/>
   <property name="service.ranking" type="Integer" value="10"/>
   <service>
      <provide interface="org.adempiere.base.sso.ISSOPrincipleFactory"/>
   </service>
</scr:component>
```

### Configuring Single Sign-On (SSO) in iDempiere
1. **Log in as System User**

   - Access to system-wide configurations is typically limited to users with System-level privileges.

2. **SSO Configuration**

   - This step involves setting up the connection between iDempiere and the chosen SSO provider.

   - The configuration details include essential information like Tenant ID, Application Client ID, and Secret Key. These details allow iDempiere to communicate securely with the SSO provider.

   - Redirect URIs are specified to ensure that the authentication process is seamless and secure.

   - Marking a configuration as "Default" designates it as the primary SSO configuration, ensuring that it is used for SSO logins.

3. **Enabling SSO for WebUI**

   - Once the SSO configurations are set up, the system-wide switch for enabling or disabling SSO for WebUI is controlled through the `**ENABLE_SSO**` System Configurator parameter.

   - Setting `Configured Value` to Y activates SSO login functionality for WebUI, while N reverts to the standard iDempiere login page.

4. **Enabling SSO for iDempiere Monitor**

   - A specific System Configurator parameter, `**ENABLE_SSO_IDEMPIERE_MONITOR**`, allows enabling or disabling SSO specifically for iDempiere Monitor.

5. **Enabling SSO for Felix Web Console**

   - The `**ENABLE_SSO_OSGI_CONSOLE**` System Configurator parameter serves the same purpose but for Felix Web Console.

6. **Using Email for Login Validation** (Optional)

   - This configuration, controlled by the `**USE_EMAIL_FOR_LOGIN**` parameter, provides flexibility in the login process. When enabled, users can log in using their email addresses instead of display names.

7. **Role Selection when Logging in with SSO** (Optional)

   - The `**SSO_SELECT_ROLE**` parameter influences the login experience further. When enabled, users logging in through SSO are presented with a Role Panel, allowing them to select a specific role if applicable.

**Technical Info:** [IDEMPIERE-5346](https://idempiere.atlassian.net/browse/IDEMPIERE-5346)
### See Also
- [NF12_Multiple_SSO_Provider_Support](https://wiki.idempiere.org/en/NF12_Multiple_SSO_Provider_Support)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF11_Single_SignOn)_
