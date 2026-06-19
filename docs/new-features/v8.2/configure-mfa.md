---
sidebar_position: 28
title: "Configure MFA"
sidebar_label: "Configure MFA"
description: "**Developer:** Carlos Ruiz"
tags: [security]
---
**Goal:** Security

**Developer:** Carlos Ruiz

**Sponsor:** [FH](https://www.fh.com.br/)

## MFA Goal
The goal of multi-factor authentication is security, protecting the user from an unknown person trying to access their data.

The typical authentication is done using a password (something you know), when configuring multi-factor authentication, additionally to something you know it must be verified another factor like something you have (for example validate that you have a device, or you are the owner of an email), or something you are (biometrics).

## Menu
The options for this feature can be found in the menu *System Admin* > *General Rules* > *Multi Factor Authentication*

![00 MFAMenu](pathname:///img/new-features/v8.2/00_MFAMenu.png)

## Configuration
## MFA Method
The MFA Method window is used to configure different methods of authentication, the system provides implementation for the methods: TOTP (Time-Based One-Time Password) and EMail

Other methods can be added via plugins (see the section below Extending MFA)

Important Fields:
- **Method:** The method being defined, this is required as a filter when implementing a new plugin
- **Parameter Element:** The methods use different values to be configured by the user, here is to give a name to the parameter used by the method
- **Expire in Minutes:** The expiration for the registration of this method
- **Mail Template:** For the EMail method a mail template can be configured to send the validation code to the user - the template *MFA Validation Code* is provided in the system by default but it can be changed
- **Issuer:** In TOTP method this define the name of the system sending the authentication
- **Allowed Time Period Discrepancy:** To set the allowed discrepancy, see [explanation here](https://github.com/samdjstevens/java-totp#setting-the-time-period-and-discrepancy)
- **Time Provider, Time Server:** TOTP can use the system clock or an NTP provider to get the time, more explanation [here](https://github.com/samdjstevens/java-totp#using-different-time-providers)

![01 MFAMethod](pathname:///img/new-features/v8.2/01_MFAMethod.png)

## MFA Rule
The MFA Rule window is to configure the different methods allowed per tenant.  When a rule is registered on System, it is available for all tenants, when a rule is registered in a Tenant, it is available just for that tenant.

![02 MFARule](pathname:///img/new-features/v8.2/02_MFARule.png)

## System Configurator
There are two system configurator keys that can be used to modify the behavior of MFA:
- **MFA_NTP_TIMEOUT_IN_MILLISECONDS:** This is System configuration to define a timeout for getting the time from an NTP server in TOTP method, the default is 5000 (5 seconds)
- **MFA_REGISTERED_DEVICE_EXPIRATION_DAYS:** This is a Tenant configuration to define the days allowed for registering a device, the default is 30, if is zero then registering a device is not allowed

## Usage
## Register MFA
This process is used to register a new MFA mechanism:
- **MFA Method:** The user selects here the MFA method to register
- **Parameter Element:** The system shows the name of the element that the user must provide next
- **Parameter Value:** The user can (or must, depending on the method) provide a value for the parameter, for example for TOTP the user CAN provide a name, for EMail the user MUST provide an EMail

![03 MFARegister](pathname:///img/new-features/v8.2/03_MFARegister.png)

After the user register a TOTP mechanism, he's presented with the information to complete the process:
- **Instructions:** Here is to provide instructions to the user about the next step(s) to complete the configuration
- **Barcode:** For TOTP method a QR code is shown to register the mechanism scanning it
- **Secret:** Alternatively the TOTP apps allow to register manually entering a secret
- **Validation Code:** The user is instructed to enter the validation code from the TOTP, or EMail
- **Preferred:** With this flag the user can set this mechanism as his preferred to be shown at first on login time

![04 MFATOTPForm](pathname:///img/new-features/v8.2/04_MFATOTPForm.png)

The screen for EMail is similar, but slightly different:

![05 MFAEMailForm](pathname:///img/new-features/v8.2/05_MFAEMailForm.png)

After the user provides a valid code the mechanism is marked as valid and the registration finishes successfully.  The user can also opt to cancel the process here and complete it later using the *Complete MFA Registration* process

## Complete MFA Registration
In the case the user cancelled a registration, it can still be completed using this process, the user must select a pending registration and then the fields shown are the same as explained above

![06 MFACompleteReg](pathname:///img/new-features/v8.2/06_MFACompleteReg.png)

## Login
After the user has registered MFA, on login time a new additional panel is presented to capture the validation code generated:

![07 MFALogin](pathname:///img/new-features/v8.2/07_MFALogin.png)

The user here can:
- Enter a validation code to log in - if the user enters a wrong code then the system informs the user *The provided code doesn't match with the expected secret*, and allows him to enter a new code
- **Set as preferred:** The user can select here to set the current method as preferred for next logins.  This flag appears when the user has more than one registered mechanism and chooses a different from the default from the list.
- **Register this device for N days:** If the system is configured to allow registering a device, the user can check this box to avoid the system asking for codes during the days configured

When the user has more than one validation mechanism, he/she can select a different mechanism pressing the OK button while the validation code field is empty.

## Additional User Options
## Unregister MFA Mechanism
Using this process the user can select a registered mechanism and unregister it, this is, it will not be used anymore on login:

![08 MFAUnregister](pathname:///img/new-features/v8.2/08_MFAUnregister.png)

## Revoke MFA Trusted Device
The user can revoke one trusted device or all trusted devices using this process:

![09 MFARevoke](pathname:///img/new-features/v8.2/09_MFARevoke.png)

## Administration
## MFA Registration
The System Administrator can check and manage the user registered methods using this window

![10 MFARegistration](pathname:///img/new-features/v8.2/10_MFARegistration.png)

## MFA Registered Device
The System Administrator can check and manage the user registered devices using this window

![11 MFARegisteredDevice](pathname:///img/new-features/v8.2/11_MFARegisteredDevice.png)

## Extending MFA
New methods of authentication can be added using plugins, the plugin must provide a class that implements the interface IMFAMechanism, and is registered in OSGI-INF with a property with name method indicating the method that provides the class.

Additionally, the plugin must add the method provided to the list in *MFA_Method* (AD_Reference_ID=200187)

## Technical Info
See [IDEMPIERE-4782](https://idempiere.atlassian.net/browse/IDEMPIERE-4782)

---

_Source: [Wiki](https://wiki.idempiere.org/en/Configure_MFA)_
