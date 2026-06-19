---
sidebar_position: 16
title: "Extend Jasper Engine"
sidebar_label: "Extend Jasper Engine"
description: "- **License:** [GPLv2](http://www.gnu.org/licenses/gpl-2.0.html)"
tags: [development]
---
- **Maintainer:**
- **Sponsored:**
- **License:** [GPLv2](http://www.gnu.org/licenses/gpl-2.0.html)
- **iDempiere Version:** 6.1
- **Source:** [tw.idempiere.jasperreport.extend](https://archive.softwareheritage.org/browse/origin/directory/?origin_url=https://bitbucket.org/idplugin/tw.idempiere.jasperreport.extend) [IDEMPIERE-3857:fire event on jasper engine](https://idempiere.atlassian.net/browse/IDEMPIERE-3857)

__FORCETOC__

## Case study
Want to run a report per user, protect pdf file by password and sent email to user

## Implement
fire event when setting configuration for export pdf by [IDEMPIERE-3857:fire event on jasper engine](https://idempiere.atlassian.net/browse/IDEMPIERE-3857)

add more parameter to report need customize (apply password)

at event handle, get parameter and apply setting to configuration

done, just sent email

## Test
- Setup idempiere 6.1
- Apply patch at [IDEMPIERE-3857:fire event on jasper engine](https://idempiere.atlassian.net/browse/IDEMPIERE-3857)
- Add plugin [tw.idempiere.jasperreport.extend](https://archive.softwareheritage.org/browse/origin/directory/?origin_url=https://bitbucket.org/idplugin/tw.idempiere.jasperreport.extend)
- When run, plugin will install 2Pack, that 2Pack create 2 report/process

- define report "Salary Report" (already done by 2Pack)
![PayrollReport](pathname:///img/new-features/v6.2/PayrollReport.png)
this report receive parameter Staff_ID to query info relate that staff and generate report for him/her
- define process "Sent Salary Email" (already done by 2Pack)
![SentSalaryEmail](pathname:///img/new-features/v6.2/SentSalaryEmail.png)
this process point to tw.idempiere.jasperreport.extend.osgi.service.SentMailPayrollToStaff
- parameter meaning
&lt;gallery&gt;
EmailTestValue.png|Mail Receive Test
ReportToRun.png|Report To Run Name
PasswordProtected.png|Encrypted
&lt;/gallery&gt;

**Remember:** change "Mail Receive Test" value to yours

- Open user window and set value of "Mail Receive Test" for "EMail Address" of some users
- run process "Sent Salary Email" with tick and un-tick "Encrypted"

---

_Source: [Wiki](https://wiki.idempiere.org/en/Extend_Jasper_Engine)_
