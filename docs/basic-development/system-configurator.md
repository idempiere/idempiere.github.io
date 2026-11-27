---
sidebar_position: 2
toc_max_heading_level: 3
description: "Global parameters stored in the AD_SysConfig table and the list of keys used by iDempiere"
---

# System Configurator

The System Configurator window (Menu => System Admin => General Rules => System Rules) lets you define global parameters that are stored in the database. This way you can control program flow without changing code.

- Parameters are defined in the format Name-Value.
- Model class used: `MSysConfig`.
- Entries are stored in the table `AD_SysConfig`.
- Entries can be made in the Application Dictionary or as a normal user.
- Examples in `base/src/org/adempiere/pdf/Document.writePDF()` and `client/src/org/compiere/apps/AMenu.run()`. In `Document.writePDF()`, for example, the PDF font can be set dynamically. <!-- TODO: verify — client/src/org/compiere/apps/AMenu is from the old Swing client and may no longer exist in core -->

## Usage example

```java
private final static String MY_GLOBAL_DB_VARIABLE = "VARIABLE_DEFINED_IN_DB";

String xxxx = MSysConfig.getValue(MY_GLOBAL_DB_VARIABLE, "");

if (xxxx != null && xxxx.trim().length() > 0)
    // ...
```

## Available keys

<!-- To add a key, add a row under its letter, in alphabetical order. Write the key as <Key>MY_KEY</Key>: it adds the anchor that links to the key use. For a key that is no longer used, write <Key deprecated>MY_KEY</Key>.
| <Key>MY_KEY</Key> | What it does | Values<br/>Scope: Tenant | [IDEMPIERE-1234](https://idempiere.atlassian.net/browse/IDEMPIERE-1234) | -->

import SysConfigFilter, {Key} from '@site/src/components/SysConfigFilter';

<SysConfigFilter />

### 0-9

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>2PACK_COMMIT_DDL</Key> | If set to Y 2Pack tries to behave in PostgreSQL same as with Oracle - committing before and after DDL statements | Y/N defaults to N | [IDEMPIERE-3058](https://idempiere.atlassian.net/browse/IDEMPIERE-3058) |
| <Key>2PACK_HANDLE_TRANSLATIONS</Key> | Define if 2pack handle translations or not (legacy 2pack) | defaults to false | [FR 1786994](https://sourceforge.net/tracker/?func=detail&atid=883808&aid=1786994&group_id=176962) |

### A

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>ADDRESS_VALIDATION</Key> | Enable address validation by country codes - separated by semicolons |  | [IDEMPIERE-1286](https://idempiere.atlassian.net/browse/IDEMPIERE-1286) |
| <Key>AD_CHANGELOG_SAVE_UUID</Key> | Save AD_ChangeLog.Record_UU, this is set by default to B to preserve disk space. Valid options are: B - just based UUID tables, A - always, U - just UUID, not ID | default B | [IDEMPIERE-5567](https://idempiere.atlassian.net/browse/IDEMPIERE-5567) |
| <Key>ALERT_SEND_ATTACHMENT_AS_XLS</Key> | Alert processor send the attachments as XLS (N->plain text) | Y/N default Y | [FR 1894573](http://sourceforge.net/tracker/index.php?func=detail&aid=1894573&group_id=176962&atid=879335) [Forum](https://sourceforge.net/forum/forum.php?thread_id=1940401&forum_id=611163) |
| <Key>ALLOCATION_DESCRIPTION</Key> | Define format for Allocation Description |  | [IDEMPIERE-2658](https://idempiere.atlassian.net/browse/IDEMPIERE-2658) |
| <Key>ALLOW_APPLY_PAYMENT_TO_CREDITMEMO</Key> | Allow applying payment to a credit memo | Y/N default N | [IDEMPIERE-1776](https://idempiere.atlassian.net/browse/IDEMPIERE-1776) |
| <Key>ALLOW_OVER_APPLIED_PAYMENT</Key> | Allow a payment to be over applied to an invoice | Y/N default N | [IDEMPIERE-1607](https://idempiere.atlassian.net/browse/IDEMPIERE-1607) |
| <Key>ALLOW_REVERSAL_OF_RECONCILED_PAYMENT</Key> | Define if the user is allowed to reverse a payment that was already reconciled | Y/N default Y | [IDEMPIERE-5089](https://idempiere.atlassian.net/browse/IDEMPIERE-5089) |
| <Key>ALogin_ShowDate</Key> | Show date field login | Y/N - Default Y | [IDEMPIERE-1311](https://idempiere.atlassian.net/browse/IDEMPIERE-1311) |
| <Key>APPLICATION_DATABASE_VERSION</Key> | Database version to show on login page | defaults to `select lastmigrationscriptapplied from ad_system` | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_DATABASE_VERSION_SHOWN</Key> | Defines if database version must be shown on login page | defaults to false if AD_System.SystemStatus = Production, otherwise defaults true | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_HOST_SHOWN</Key> | Defines if host must be shown on login page | defaults to false if AD_System.SystemStatus = Production, otherwise defaults true | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_IMPLEMENTATION_VENDOR</Key> | Implementation vendor to show on login page | defaults to "Supported by iDempiere community" | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_IMPLEMENTATION_VENDOR_SHOWN</Key> | Defines if implementation vendor must be shown on login page | defaults to true | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_JVM_VERSION_SHOWN</Key> | Defines if JVM version must be shown on login page | defaults to false if AD_System.SystemStatus = Production, otherwise defaults true | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_LOGIN_INFO_SHOWN</Key> | Defines if this server is used for demo purposes, to show the login information at the left panel and provide quick fill of User/Password | defaults to N<br/>Scope: System | [IDEMPIERE-6401](https://idempiere.atlassian.net/browse/IDEMPIERE-6401) |
| <Key>APPLICATION_LOGIN_LEFT_PANEL_SHOWN</Key> | Defines if the left panel is shown on login page, possible values Y=Yes (not collapsed), H=Hidden (collapsed), I=Invisible (not shown at all) | defaults to Y<br/>Scope: System | [IDEMPIERE-6282](https://idempiere.atlassian.net/browse/IDEMPIERE-6282) |
| <Key>APPLICATION_MAIN_VERSION</Key> | Main version to show on login page | defaults to bundle version | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_MAIN_VERSION_SHOWN</Key> | Defines if app main version must be shown on login page | defaults to true | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_OS_INFO_SHOWN</Key> | Defines if OS info must be shown on login page | defaults to false if AD_System.SystemStatus = Production, otherwise defaults true | [IDEMPIERE-2259](https://idempiere.atlassian.net/browse/IDEMPIERE-2259) |
| <Key>APPLICATION_URL</Key> | Server URL to generate zoom for a record. When empty, or using the value USE_HARDCODED, the system generates an URL with current protocol, server name, port, context | defaults to empty | [IDEMPIERE-2361](https://idempiere.atlassian.net/browse/IDEMPIERE-2361) |
| <Key>ATTACHMENT_SAVE_LIST_IN_AD_ATTACHMENTFILE</Key> | This key defines if the list of attachment files is saved in the table AD_AttachmentFile | Y/N - Default Y<br/>Scope: Tenant | [IDEMPIERE-6640](https://idempiere.atlassian.net/browse/IDEMPIERE-6640) |
| <Key>ATTACH_EMBEDDED_2PACK</Key> | When processing automatically a 2Pack (plugin or external), this key defines if the zip file is attached to the corresponding AD_Package_Imp_Proc record, this can be useful for posterior reprocessing | Y/N - Default Y | [IDEMPIERE-2771](https://idempiere.atlassian.net/browse/IDEMPIERE-2771) |
| <Key>ATTACH_NOTIFY_2PACK</Key> | This key defines if the summary of the 2Pack must be attached to the corresponding Pack In record, the summary will have the name "error_yyyymmddhhmmss.log" or "result_yyyymmddhhmmss.log", depending if the Pack In failed or succeeded | Y/N - Default <!-- TODO: verify: default value missing on the wiki --><br/>Scope: Tenant | [IDEMPIERE-6563](https://idempiere.atlassian.net/browse/IDEMPIERE-6563) |
| <Key>AUTOMATIC_PACKIN_FOLDERS</Key> | This key defines a folder, or a set of folders separated by semicolon (;). When starting the plugin org.adempiere.plugin.utils, it searches for new packins to apply present on these folders and applies them automatically | defaults to empty | [IDEMPIERE-3551](https://idempiere.atlassian.net/browse/IDEMPIERE-3551) |
| <Key>AUTOMATIC_PACKIN_INITIAL_DELAY</Key> | Time in seconds that org.adempiere.plugin.utils waits before starting to process the AUTOMATIC_PACKIN_FOLDERS, this is useful in order to wait for the internal plugins to be processed first | defaults to 120 seconds | [IDEMPIERE-3551](https://idempiere.atlassian.net/browse/IDEMPIERE-3551) |
| <Key>AUTOMATIC_PACKIN_PROCESSING</Key> | This key is used internally by the automatic application of 2Packs as a semaphore to indicate that another 2Pack is being applied, is not intended to be managed by user, but automatically managed by the system. |  | [IDEMPIERE-2771](https://idempiere.atlassian.net/browse/IDEMPIERE-2771) |
| <Key>AUTOMATIC_PACKIN_RETRIES</Key> | When applying automatically a 2Pack, this defines the number of retries to wait for the semaphore when other plugins are applying 2Packs, this is used in combination with AUTOMATIC_PACKIN_TIMEOUT | defaults to 5 | [IDEMPIERE-2771](https://idempiere.atlassian.net/browse/IDEMPIERE-2771) |
| <Key>AUTOMATIC_PACKIN_TIMEOUT</Key> | When applying automatically a 2Pack, this defines the waiting time to try to get the semaphore when other plugins are applying 2packs, this is used in combination with AUTOMATIC_PACKIN_RETRIES | defaults to 120 seconds | [IDEMPIERE-2771](https://idempiere.atlassian.net/browse/IDEMPIERE-2771) |
| <Key>AUTO_ASSIGN_ROLE_TO_CREATOR_USER</Key> | This key defines if a role is assigned to the creator user when creating a new role | defaults to false | [IDEMPIERE-3664](https://idempiere.atlassian.net/browse/IDEMPIERE-3664) |

### B

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>BACKGROUND_JOB_ALLOWED</Key> | Defines if reports as background jobs are allowed | defaults to true | [IDEMPIERE-1951](https://idempiere.atlassian.net/browse/IDEMPIERE-1951) |
| <Key>BACKGROUND_JOB_BY_DEFAULT</Key> | Defines if reports are executed as background job by default | defaults to false | [IDEMPIERE-1951](https://idempiere.atlassian.net/browse/IDEMPIERE-1951) |
| <Key>BACKGROUND_JOB_MAX_IN_SYSTEM</Key> | Maximum background reports running per system | defaults to 20 | [IDEMPIERE-1951](https://idempiere.atlassian.net/browse/IDEMPIERE-1951) |
| <Key>BACKGROUND_JOB_MAX_PER_CLIENT</Key> | Maximum background reports running per tenant | defaults to 10 | [IDEMPIERE-1951](https://idempiere.atlassian.net/browse/IDEMPIERE-1951) |
| <Key>BACKGROUND_JOB_MAX_PER_USER</Key> | Maximum background reports running per user | defaults to 5 | [IDEMPIERE-1951](https://idempiere.atlassian.net/browse/IDEMPIERE-1951) |
| <Key>BANK_STATEMENT_POST_WITH_DATE_FROM_LINE</Key> | By default bank statement post with date from header, when this is set to Y then it changes to post with date from line, it can cause accounting problems because two bank statement lines can fit in two different accounting periods | defaults to false | [IDEMPIERE-1104](https://idempiere.atlassian.net/browse/IDEMPIERE-1104) |
| <Key>BPARTNER_QUICK_ENTRY_OPTIONAL_LOCATION_TABLES</Key> | On the business partner quick entry window, the location is defined as mandatory, this configurator allows to define a list of tables where the Location is optional |  | [IDEMPIERE-3906](https://idempiere.atlassian.net/browse/IDEMPIERE-3906) |

### C

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>CALENDAR_ALTERNATE_TIMEZONE</Key> | Alternate time zone to show in Calendar window. It can be defined as one zone or several zones separated by comma, as sample in [Calendars.setTimezone](http://www.zkoss.org/javadoc/latest/zkcal/org/zkoss/calendar/Calendars.html#setTimeZone(java.lang.String)). A zone is defined by a title =timezone, title is shown in the calendar, and the timezone must conform to [timezone standard](http://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html). If set empty (a whitespace) then no alternate timezone is shown. | Default when not set: *Pacific Time=PST* | [IDEMPIERE-832](https://idempiere.atlassian.net/browse/IDEMPIERE-832) |
| <Key>CASH_AS_PAYMENT</Key> | Record Cash as a Payment (True) or Cash Journal (False) | defaults to true | [FR 2803341](https://sourceforge.net/tracker/index.php?func=detail&aid=2803341&group_id=176962&atid=879335) |
| <Key>CHANGE_PASSWORD_MUST_DIFFER</Key> |  |  | [IDEMPIERE-374](https://idempiere.atlassian.net/browse/IDEMPIERE-374) Change password must be changed to be a form instead of a process |
| <Key>CHART_MIN_WIDTH_3_PERIOD</Key> | Define the width where 3 periods fit in charts (using billboard) | default 230 | [IDEMPIERE-5402](https://idempiere.atlassian.net/browse/IDEMPIERE-5402) |
| <Key>CHART_MIN_WIDTH_6_PERIOD</Key> | Define the width where 4 periods fit in charts (using billboard) <!-- TODO: verify: key name says 6 periods, description says 4 --> | default 320 | [IDEMPIERE-5402](https://idempiere.atlassian.net/browse/IDEMPIERE-5402) |
| <Key>CHECK_CREDIT_ON_CASH_POS_ORDER</Key> | Check credit on cash POS order | defaults to true | [FR 2840458](https://sourceforge.net/tracker/index.php?func=detail&aid=2840458&group_id=176962&atid=879335) |
| <Key>CHECK_CREDIT_ON_PREPAY_ORDER</Key> | Check credit on prepay order | defaults to true | [FR 2840458](https://sourceforge.net/tracker/index.php?func=detail&aid=2840458&group_id=176962&atid=879335) |
| <Key>CKEDITOR_FILE_CONFIG</Key> | Path to the config file of CKEditor | defaults to /js/ckeditor/config.js | [IDEMPIERE-6953](https://idempiere.atlassian.net/browse/IDEMPIERE-6953) |
| <Key>CKEDITOR_FILE_CONFIG_MIN</Key> | Path to the minimum (ie when in mobile mode) config file of CKEditor | defaults to /js/ckeditor/config-min.js | [IDEMPIERE-6953](https://idempiere.atlassian.net/browse/IDEMPIERE-6953) |
| <Key>CLIENT_ACCOUNTING</Key> | Enable client Accounting | D - Disabled (default)<br/>Q - Queue (enabled to post by hand - queue documents for posterior processing)<br/>I - Immediate (immediate post) | [FR 2857807](https://sourceforge.net/tracker/?func=detail&atid=879335&aid=2857807&group_id=176962) |
| <Key>COPY_TENANT_BATCH_FLUSH_SIZE</Key> | [Copy Tenant](../new-features/v6.2/copy-or-move-tenant.md) feature now insert into batches, this configurator defines the batch size for the insert | default 10000<br/>Scope: System | [IDEMPIERE-6868](https://idempiere.atlassian.net/browse/IDEMPIERE-6868) |
| <Key>CSV_EXPORT_SANITIZATION</Key> | Enable CSV Export Sanitization | Y - Sanitize CSV Exports (default) / N - do not sanitize<br/>Scope: Tenant | [IDEMPIERE-6844](https://idempiere.atlassian.net/browse/IDEMPIERE-6844) |

### D

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>DASHBOARD_LAYOUT_ORIENTATION</Key> | Change dashboard layout orientation | C = Column (default/fallback)<br/>R = Row | [IDEMPIERE-5389](https://idempiere.atlassian.net/browse/IDEMPIERE-5389) |
| <Key>DB_READ_REPLICA_NORMAL_MAX_ITERATIONS</Key> | Number of iterations to try before giving up when trying to get a connection to read replica for reports | Defaults to 3 | [IDEMPIERE-3850](https://idempiere.atlassian.net/browse/IDEMPIERE-3850) |
| <Key>DB_READ_REPLICA_NORMAL_TIMEOUT_IN_MILLISECONDS</Key> | Timeout in milliseconds to wait for the replica to sync for reports | Defaults to 5000 (5 seconds) | [IDEMPIERE-3850](https://idempiere.atlassian.net/browse/IDEMPIERE-3850) |
| <Key>DB_READ_REPLICA_URLS</Key> | Pipe ( \| ) separated list of JDBC URLs of read only replicas for reporting | if empty (default) reporting from replica is not enabled | [IDEMPIERE-3850](https://idempiere.atlassian.net/browse/IDEMPIERE-3850) |
| <Key>DEFAULT_COA_PATH</Key> | Path for default Chart of Accounts | $IDEMPIERE_HOME/data/import/AccountingDefaultsOnly.csv | [IDEMPIERE-1685](https://idempiere.atlassian.net/browse/IDEMPIERE-1685) |
| <Key>DEFAULT_ENTITYTYPE</Key> | Default value for Entity Type field in windows | Defaults to U | [IDEMPIERE-2852](https://idempiere.atlassian.net/browse/IDEMPIERE-2852) |
| <Key>DICTIONARY_ID_PASSWORD</Key> | Developer password |  | [Centralized IDs](/docs/basic-development/contributing-to-core/changing-the-database/centralized-ids) |
| <Key>DICTIONARY_ID_USER</Key> | Developer username |  | [Centralized IDs](/docs/basic-development/contributing-to-core/changing-the-database/centralized-ids) |
| <Key>DICTIONARY_ID_USE_CENTRALIZED_ID</Key> | Assign the dictionary ID's from a centralized website reservation instead of sequences | Y/N default Y | [Centralized IDs](/docs/basic-development/contributing-to-core/changing-the-database/centralized-ids) |
| <Key>DICTIONARY_ID_WEBSITE</Key> | Website providing the ID reservation service for iDempiere |  | [Centralized IDs](/docs/basic-development/contributing-to-core/changing-the-database/centralized-ids) |
| <Key>DOCACTIONBUTTON_SHOWACTIONNAME</Key> |  |  | [IDEMPIERE-594](https://idempiere.atlassian.net/browse/IDEMPIERE-594) |
| <Key>DPViews_ShowInfoAccount</Key> | Defines if Info Account must be shown on Views dashboard | defaults to true | [IDEMPIERE-1085](https://idempiere.atlassian.net/browse/IDEMPIERE-1085) |
| <Key>DPViews_ShowInfoSchedule</Key> | Defines if Info Schedule must be shown on Views dashboard | defaults to true | [IDEMPIERE-1085](https://idempiere.atlassian.net/browse/IDEMPIERE-1085) |

### E

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>EMAIL_NOTIFY_2PACK</Key> | This key defines an email or list of emails separated by comma (,). When defined the application of a 2Pack zip file (automatic or manual) will send a notification email to the emails on the list. This key can be configured by tenant and for System, the emails configured for System will be added to the list when processing a tenant. |  | [IDEMPIERE-2771](https://idempiere.atlassian.net/browse/IDEMPIERE-2771) |
| <Key>EMAIL_SERVER_START_ENABLED</Key> | Enable/disable the "Send Email" feature upon server startup | defaults to true (send email)<br/>Scope: System | [IDEMPIERE-6421](https://idempiere.atlassian.net/browse/IDEMPIERE-6421) |
| <Key>EMAIL_SERVER_START_MAILTEXT_ID</Key> | ID of the mail template to be used when sending the EMail when the server starts | if not set the system will use the hardcoded content<br/>Scope: System | [IDEMPIERE-4063](https://idempiere.atlassian.net/browse/IDEMPIERE-4063) <!-- TODO: verify: wiki link points to IDEMPIERE-4063 but its text says IDEMPIERE-6063 --> |
| <Key>EMAIL_SERVER_START_RECIPIENT</Key> | Allow to override the recipient of the email sent when the server starts | if not set the system will use what is defined in RequestEMail of System tenant<br/>Scope: System | [IDEMPIERE-4063](https://idempiere.atlassian.net/browse/IDEMPIERE-4063) <!-- TODO: verify: wiki link points to IDEMPIERE-4063 but its text says IDEMPIERE-6063 --> |
| <Key>EMAIL_TEST_MAILTEXT_ID</Key> | ID of the mail template to be used on the EMail Test process | if not set the system simply uses the string "EMail Test" | [IDEMPIERE-4359](https://idempiere.atlassian.net/browse/IDEMPIERE-4359) |
| <Key>ENABLE_PAYMENTBOX_BUTTON</Key> | Defines if the payment button besides the payment rule is shown or not | defaults to true (button enabled) | [IDEMPIERE-2305](https://idempiere.atlassian.net/browse/IDEMPIERE-2305) |
| <Key>ENABLE_SSO</Key> | Defines if SSO is used in the system | defaults to false | [IDEMPIERE-5346](https://idempiere.atlassian.net/browse/IDEMPIERE-5346) |
| <Key>ENABLE_SSO_IDEMPIERE_MONITOR</Key> | Defines if SSO is used for the idempiereMonitor | defaults to false | [IDEMPIERE-5346](https://idempiere.atlassian.net/browse/IDEMPIERE-5346) |
| <Key>ENABLE_SSO_OSGI_CONSOLE</Key> | Defines if SSO is used for the OSGI console | defaults to false | [IDEMPIERE-5346](https://idempiere.atlassian.net/browse/IDEMPIERE-5346) |
| <Key>EXPORT_BLOB_COLUMN_FOR_INSERT</Key> | When exporting records as SQL insert, it defines if the BLOB columns are exported or not | defaults to true<br/>Scope: Tenant | [IDEMPIERE-6133](https://idempiere.atlassian.net/browse/IDEMPIERE-6133) |

### F

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>FEEDBACK_EMAIL_CC</Key> | Comma separated list of carbon copy recipients for feedback EMail |  | [IDEMPIERE-4461](https://idempiere.atlassian.net/browse/IDEMPIERE-4461) |
| <Key>FEEDBACK_EMAIL_TO</Key> | Comma separated list of recipients for feedback EMail |  | [IDEMPIERE-4461](https://idempiere.atlassian.net/browse/IDEMPIERE-4461) |
| <Key>FORCE_POSTING_PRIOR_TO_PERIOD_CLOSE</Key> | Define if closing period with unposted documents is allowed, by default is forcing to post documents first | defaults to true | [IDEMPIERE-5576](https://idempiere.atlassian.net/browse/IDEMPIERE-5576) |
| <Key>FORM_SQL_PROCESS_ALLOWED_KEYWORDS</Key> | Commands allowed to execute in the form [SQL Process](https://wiki.idempiere.org/en/SQL_Process_(Form_ID-111)) | default: ALTER, ANALYZE, COMMENT, CREATE, DELETE, DROP, GRANT, INSERT, REINDEX, REVOKE, SET, UPDATE, TRUNCATE, VACUUM | [IDEMPIERE-5450](https://idempiere.atlassian.net/browse/IDEMPIERE-5450) |
| <Key>FORM_SQL_QUERY_ALLOWED_KEYWORDS</Key> | Commands allowed to execute in the form SQL Query | default: SELECT, WITH, SHOW | [IDEMPIERE-5451](https://idempiere.atlassian.net/browse/IDEMPIERE-5451) |
| <Key>FORM_SQL_QUERY_LOG_ISSUE</Key> | Log queries executed in SQL Query form in AD_Issue table | default: true | [IDEMPIERE-5451](https://idempiere.atlassian.net/browse/IDEMPIERE-5451) |
| <Key>FORM_SQL_QUERY_MAX_RECORDS</Key> | Maximum number of records to query in SQL Query form | default: 500 | [IDEMPIERE-5451](https://idempiere.atlassian.net/browse/IDEMPIERE-5451) |
| <Key>FORM_SQL_QUERY_TIMEOUT_IN_SECONDS</Key> | Timeout in seconds for queries executed in SQL Query form | default: 120 | [IDEMPIERE-5451](https://idempiere.atlassian.net/browse/IDEMPIERE-5451) |

### G

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>GLOBAL_MAX_QUERY_RECORDS</Key> | Defines the maximum number of records allowed to be loaded when opening a window, zero means no limit (not recommended) | defaults to 100.000 records<br/>Scope: Tenant | [IDEMPIERE-6123](https://idempiere.atlassian.net/browse/IDEMPIERE-6123) |
| <Key>GLOBAL_MAX_REPORT_RECORDS</Key> | Defines the maximum number of records allowed to be printed in a report, zero means no limit (not recommended) | defaults to 100.000 records<br/>Scope: Tenant | [IDEMPIERE-6123](https://idempiere.atlassian.net/browse/IDEMPIERE-6123) |
| <Key>GRIDTABLE_INITIAL_COUNT_TIMEOUT_IN_SECONDS</Key> | Defines the maximum number of seconds allowed for the initial count SQL to run when opening a window, zero means no limit (not recommended) | defaults to 1 second<br/>Scope: Tenant | [IDEMPIERE-6123](https://idempiere.atlassian.net/browse/IDEMPIERE-6123) |
| <Key>GRIDTABLE_LOAD_TIMEOUT_IN_SECONDS</Key> | Timeout in seconds to wait for complete gridtable load | defaults to 30 seconds | [IDEMPIERE-2188](https://idempiere.atlassian.net/browse/IDEMPIERE-2188) |

### H

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>HTML_REPORT_MINIFY</Key> | Defines the HTML of reports is minified | defaults to true | [IDEMPIERE-5225](https://idempiere.atlassian.net/browse/IDEMPIERE-5225) |
| <Key>HTML_REPORT_THEME</Key> | Name of optional theme for HTML reports on webui |  | [IDEMPIERE-2355](https://idempiere.atlassian.net/browse/IDEMPIERE-2355) |

### I

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>IBAN_VALIDATION</Key> | This key defines if the system must apply IBAN validation for the fields IBAN on the different tables, like Bank Account, BP Bank Account, Payment, Payment Transaction. For countries where the IBAN is not used, or used for a different purpose, then is recommended to disable this flag | Y/N, defaults to Y | [IDEMPIERE-1200](https://idempiere.atlassian.net/browse/IDEMPIERE-1200) |
| <Key>IDENTIFIER_SEPARATOR</Key> | This defines the separator to be used in the generation of a display column for foreign fields | defaults to underscore (_) | [IDEMPIERE-3409](https://idempiere.atlassian.net/browse/IDEMPIERE-3409) |
| <Key>IMAGE_DB_STORAGE_SAVE_AS_ZIP</Key> | Defines if the images are saved raw or zipped in the AD_Image table | Boolean Y/N | [IDEMPIERE-4190](https://idempiere.atlassian.net/browse/IDEMPIERE-4190) |
| <Key>INFO_PRODUCT_SHOW_PRODUCTS_WITHOUT_PRICE</Key> | Defines if the products without price are also shown in the Info Product Window | Boolean Y/N | [IDEMPIERE-5020](https://idempiere.atlassian.net/browse/IDEMPIERE-5020) |
| <Key>Invoice_ReverseUseNewNumber</Key> |  |  | [IDEMPIERE-148](https://idempiere.atlassian.net/browse/IDEMPIERE-148) Allow reversal invoice to use DocNo^ instead of consuming an invoice # |

### J

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>JASPER_SWAP_MAX_PAGES</Key> |  |  | [IDEMPIERE-146](https://idempiere.atlassian.net/browse/IDEMPIERE-146) |

### L

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>LABEL_AUTOMATIC_COLOR</Key> | Defines if a color is assigned automatically to labels/tags based on its name | defaults to true | [IDEMPIERE-5259](https://idempiere.atlassian.net/browse/IDEMPIERE-5259) |
| <Key>LASTRUN_RECORD_COUNT</Key> | Number of last run records to show on processes/reports | defaults to 5 | [IDEMPIERE-1572](https://idempiere.atlassian.net/browse/IDEMPIERE-1572) |
| <Key>LDAP_TYPE</Key> |  |  | [IDEMPIERE-3861](https://idempiere.atlassian.net/browse/IDEMPIERE-3861) Define LDAP Type: openldap - or any other value for the standard |
| <Key>LOCATION_MAPS_DESTINATION_ADDRESS</Key> |  |  | [IDEMPIERE-147](https://idempiere.atlassian.net/browse/IDEMPIERE-147) GoogleMap to show Locators |
| <Key>LOCATION_MAPS_ROUTE_PREFIX</Key> |  |  | [IDEMPIERE-147](https://idempiere.atlassian.net/browse/IDEMPIERE-147) GoogleMap to show Locators |
| <Key>LOCATION_MAPS_SOURCE_ADDRESS</Key> |  |  | [IDEMPIERE-147](https://idempiere.atlassian.net/browse/IDEMPIERE-147) GoogleMap to show Locators |
| <Key>LOCATION_MAPS_URL_PREFIX</Key> |  |  | [IDEMPIERE-147](https://idempiere.atlassian.net/browse/IDEMPIERE-147) GoogleMap to show Locators |
| <Key>LOCATION_MAX_CITY_ROWS</Key> |  |  | FR 2794312 Location AutoComplete |
| <Key>LOGIN_HELP_URL</Key> |  | `http://wiki.idempiere.org/{lang}/Login_Help` | [IDEMPIERE-77](https://idempiere.atlassian.net/browse/IDEMPIERE-77) |
| <Key>LOGIN_PREFIX_SEPARATOR</Key> | [Prefix to use when specifying tenant on login](../new-features/v9/specify-tenant-on-login.md#login_prefix_separator) | Defaults to slash (/) | [IDEMPIERE-5408](https://idempiere.atlassian.net/browse/IDEMPIERE-5408) |
| <Key>LOGIN_SELECT_ROLE_HELP_URL</Key> |  | `https://wiki.idempiere.org/{lang}/Login_Select_Role_Help` | [IDEMPIERE-5463](https://idempiere.atlassian.net/browse/IDEMPIERE-5463) |
| <Key>LOGIN_SHOW_RESETPASSWORD</Key> |  |  | [IDEMPIERE-375](https://idempiere.atlassian.net/browse/IDEMPIERE-375) Implement Forgot my Password |
| <Key>LOGIN_WITH_TENANT_PREFIX</Key> | [Specify Tenant on Login](../new-features/v9/specify-tenant-on-login.md#login_with_tenant_prefix). WARNING! In order to use this feature you need to configure a login prefix for every tenant that is going to use this feature (or for all tenants in case the Force option is configured). (N)o / (A)llow / (F)orce | N | [IDEMPIERE-5408](https://idempiere.atlassian.net/browse/IDEMPIERE-5408) |

### M

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>MAIL_DONT_SEND_TO_ADDRESS</Key> | For test systems you can set up this key to avoid sending unwanted messages. If combined with MAIL_SEND_BCC_TO_ADDRESS, then it will send messages just to the configured address |  | [IDEMPIERE-2104](https://idempiere.atlassian.net/browse/IDEMPIERE-2104) |
| <Key>MAIL_SEND_BCC_TO_ADDRESS</Key> | You can register an e-mail address and all the outgoing mails from iDempiere will be sent BCC there |  | [FR 3090719](https://sourceforge.net/tracker/index.php?func=detail&aid=3090719&group_id=176962&atid=879335) |
| <Key>MAIL_SEND_BCC_TO_FROM</Key> | When enabled the outgoing mails from iDempiere will be sent BCC to the originating user | Y/N - Default N | [FR 3090719](https://sourceforge.net/tracker/index.php?func=detail&aid=3090719&group_id=176962&atid=879335) |
| <Key>MAIL_SEND_CREDENTIALS</Key> | The credentials for sending email (user/password) are taken from: U-User/C-Client/S-System |  | [IDEMPIERE-722](https://idempiere.atlassian.net/browse/IDEMPIERE-722) Make email credentials configuration more flexible |
| <Key>MAIL_SMTP_CONNECTIONTIMEOUT</Key> | Timeout in milliseconds to wait for SMTP connection, -1 leaves the java default | default to -1 | [IDEMPIERE-5760](https://idempiere.atlassian.net/browse/IDEMPIERE-5760) |
| <Key>MAIL_SMTP_TIMEOUT</Key> | Timeout in milliseconds to send an email | default to 20000 | [IDEMPIERE-5760](https://idempiere.atlassian.net/browse/IDEMPIERE-5760) |
| <Key>MAIL_SMTP_WRITETIMEOUT</Key> | Timeout in milliseconds to wait for writing on SMTP connection, -1 leaves the java default | default to -1 | [IDEMPIERE-5760](https://idempiere.atlassian.net/browse/IDEMPIERE-5760) |
| <Key>MAX_ACTIVITIES_IN_LIST</Key> | Max number of activities in list | defaults to 200 | [FR 2714423](https://sourceforge.net/tracker/?func=detail&atid=883808&aid=2714423&group_id=176962) |
| <Key>MAX_RESULTS_PER_SEARCH_IN_DOCUMENT_CONTROLLER</Key> | Max number of results per search in menu/document controller | defined per client, defaults to 3 | [IDEMPIERE-2050](https://idempiere.atlassian.net/browse/IDEMPIERE-2050) |
| <Key>MAX_ROWS_IN_TABLE_COMBOLIST</Key> | Max number of rows allowed to be loaded in a combo list | defaults to 10000, max allowed is 50000 | [IDEMPIERE-5534](https://idempiere.atlassian.net/browse/IDEMPIERE-5534) |
| <Key>MAX_TEXT_LENGTH_ON_GRID_VIEW</Key> | When showing long strings in grid view, the system shows the first N characters defined here and then an ellipsis (...) | defaults to 60 | [IDEMPIERE-3073](https://idempiere.atlassian.net/browse/IDEMPIERE-3073) |
| <Key>MENU_INFOUPDATER_SLEEP_MS</Key> | Milliseconds of wait to run the infoupdater class on the menu window (just for swing) | integer milliseconds default 60000 | [FR 1717125](https://sourceforge.net/tracker/?func=detail&atid=883808&aid=1717125&group_id=176962) |
| <Key>MESSAGES_AT_TENANT_LEVEL</Key> | Defines if messages can be translated at tenant level (See [Messages at Client Level](../new-features/v9/messages-at-client-level.md)) | false by default | [IDEMPIERE-5136](https://idempiere.atlassian.net/browse/IDEMPIERE-5136) |
| <Key>MFA_NTP_TIMEOUT_IN_MILLISECONDS</Key> | NTP Timeout in case the TOTP mechanism check the time against an NTP server | By default 5000 milliseconds (5 seconds) | [IDEMPIERE-4782](https://idempiere.atlassian.net/browse/IDEMPIERE-4782) |
| <Key>MFA_REGISTERED_DEVICE_EXPIRATION_DAYS</Key> | Default number of days when a device registered expires | By default 30 | [IDEMPIERE-4782](https://idempiere.atlassian.net/browse/IDEMPIERE-4782) |
| <Key>MFG_ValidateCostsDifferenceOnCreate</Key> |  |  | [IDEMPIERE-246](https://idempiere.atlassian.net/browse/IDEMPIERE-246) Integrate Manufacturing Light |
| <Key>MFG_ValidateCostsOnCreate</Key> |  |  | [IDEMPIERE-246](https://idempiere.atlassian.net/browse/IDEMPIERE-246) Integrate Manufacturing Light |
| <Key>MONITOR_INITIAL_WAIT_FOR_CLUSTER_IN_SECONDS</Key> | Defines a waiting time before starting the idempiereMonitor page to allow the cluster server to start | Default 10 seconds | [IDEMPIERE-4211](https://idempiere.atlassian.net/browse/IDEMPIERE-4211) |
| <Key>MONITOR_MAX_WAIT_FOR_CLUSTER_IN_SECONDS</Key> | Defines the max waiting time to allow the cluster server to start before giving up | Default 180 seconds (3 minutes) | [IDEMPIERE-4211](https://idempiere.atlassian.net/browse/IDEMPIERE-4211) |
| <Key>MROLE_GETDEFAULT_RETURNS_NULL_WHEN_NO_CONTEXT</Key> | When looking for default role in context before login (in java code) a null role is returned, setting this to false is not recommended and is just for backward compatibility with legacy code that requires receiving System (0) role in this case | defaults to true | [IDEMPIERE-5849](https://idempiere.atlassian.net/browse/IDEMPIERE-5849) |
| <Key>MSEQUENCE_GETNEXT_TIMEOUT</Key> | Timeout in seconds for getting the next sequence from AD_Sequence table | Default 30 seconds | [IDEMPIERE-5013](https://idempiere.atlassian.net/browse/IDEMPIERE-5013) |

### O

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>OAUTH2_USE_ACCESS_TOKEN_UPN_ON_MICROSOFT_PROVIDER</Key> | When checking OAuth2 credentials with microsoft, sometimes the user email information is sent in the access_token in upn field, this is to obtain the preferred_username from the upn field | defaults to true | [IDEMPIERE-5354](https://idempiere.atlassian.net/browse/IDEMPIERE-5354) |
| <Key>OAUTH2_USE_ID_TOKEN_PREF_USERNAME_ON_MS_PROVIDER</Key> | When checking OAuth2 credentials with microsoft, sometimes the user email information is sent in the access_token in preferred_username field, this is to obtain the preferred_username from the preferred_username field | defaults to true | [IDEMPIERE-5354](https://idempiere.atlassian.net/browse/IDEMPIERE-5354) |
| <Key>ORDER_COLUMNS_TO_COPY_TO_NOT_COMPLETED_INVOICES</Key> | Comma separated list of columns to be copied when changing an order to not completed invoices | Defaults to Description, POReference, PaymentRule, C_PaymentTerm_ID, DateAcct - can be defined at organization level | [IDEMPIERE-5893](https://idempiere.atlassian.net/browse/IDEMPIERE-5893) |

### P

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>PAYMENT_OVERWRITE_DOCUMENTNO_WITH_CHECK_ON_PAYMENT</Key> | On Payment window, for payments overwrite the document number with the check number when tender type check | Y/N default Y | [FR 1876984](http://sourceforge.net/tracker/index.php?func=detail&aid=1876984&group_id=176962&atid=879335) |
| <Key>PAYMENT_OVERWRITE_DOCUMENTNO_WITH_CHECK_ON_RECEIPT</Key> | On Payment window, for receipts overwrite the document number with the check number when tender type check | Y/N default Y | [FR 1876984](http://sourceforge.net/tracker/index.php?func=detail&aid=1876984&group_id=176962&atid=879335) |
| <Key>PAYMENT_OVERWRITE_DOCUMENTNO_WITH_CREDIT_CARD</Key> | On Payment window overwrite the document number with the credit card number when tender type credit card | Y/N default Y | [FR 1876984](http://sourceforge.net/tracker/index.php?func=detail&aid=1876984&group_id=176962&atid=879335) |
| <Key>PAYMENT_SELECTION_MANUAL_ASK_INVOKE_GENERATE</Key> | Defines if Generate Payment Selection must be called at the end of Payment Selection Manual | defaults to true | [IDEMPIERE-2134](https://idempiere.atlassian.net/browse/IDEMPIERE-2134) |
| <Key>PDF_FONT_DIR</Key> | Path to additional font use in report, making it available for PDF export. When unset or empty, iDempiere automatically uses the `fonts` subdirectory under `IDEMPIERE_HOME` | Default none | [BF 2617308](https://sourceforge.net/tracker/index.php?func=detail&aid=2617308&group_id=176962&atid=879332)<br/>[IDEMPIERE-7212](https://idempiere.atlassian.net/browse/IDEMPIERE-7212) |
| <Key>ProductUOMConversionRateValidate</Key> | Enable/disable validation -> The Product UoM needs to be the smallest UoM - Multiplier must be > 0 | Y/N default Y | [FR 1689521](http://sourceforge.net/tracker/index.php?func=detail&aid=1689521&group_id=176962&atid=879332) |
| <Key>ProductUOMConversionUOMValidate</Key> | Enable/disable validation -> Select the Product UoM as the From Unit of Measure | Y/N default Y | [FR 1689521](http://sourceforge.net/tracker/index.php?func=detail&aid=1689521&group_id=176962&atid=879332) |
| <Key>PROJECT_ID_PASSWORD</Key> | Developer password |  | [Project ID server](/docs/basic-development/contributing-to-core/changing-the-database/project-id-server) |
| <Key>PROJECT_ID_PROJECT</Key> | The name of the project |  | [Project ID server](/docs/basic-development/contributing-to-core/changing-the-database/project-id-server) |
| <Key>PROJECT_ID_USER</Key> | Developer username |  | [Project ID server](/docs/basic-development/contributing-to-core/changing-the-database/project-id-server) |
| <Key>PROJECT_ID_USE_CENTRALIZED_ID</Key> | Assign the non-dictionary ID's for tables with entity type from a centralized website reservation instead of sequences | Y/N default N | [Project ID server](/docs/basic-development/contributing-to-core/changing-the-database/project-id-server) |
| <Key>PROJECT_ID_WEBSITE</Key> | Website providing the ID reservation service for the project |  | [Project ID server](/docs/basic-development/contributing-to-core/changing-the-database/project-id-server) |

### Q

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>QUICKFORM_PAGE_SIZE</Key> | The page size for the quick form feature | Client configurable, defaults to 20 | [IDEMPIERE-4157](https://idempiere.atlassian.net/browse/IDEMPIERE-4157) |

### R

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>READ_TABLES_NOT_IN_TABLE_ACCESS_INCLUDE_LIST</Key> | Y/N -> N role has no access to other tables that is not part of the include list, Y to allow read only access to tables not in the include list (You still can use the Role Table Access Exclude feature to change it to no access for specific set of tables) | default N<br/>Scope: Tenant | [IDEMPIERE-6730](https://idempiere.atlassian.net/browse/IDEMPIERE-6730) |
| <Key>REAL_TIME_POS</Key> |  |  |  |
| <Key>RecentItems_MaxSaved</Key> |  |  | [IDEMPIERE-127](https://idempiere.atlassian.net/browse/IDEMPIERE-127) Implement Recent Items dashboard |
| <Key>RecentItems_MaxShown</Key> |  |  | [IDEMPIERE-127](https://idempiere.atlassian.net/browse/IDEMPIERE-127) Implement Recent Items dashboard |
| <Key>REPORT_LOAD_TIMEOUT_IN_SECONDS</Key> | Maximum number of seconds allowed for the SQL of a report to get the data | defaults to 120 seconds<br/>Scope: Tenant | [IDEMPIERE-6123](https://idempiere.atlassian.net/browse/IDEMPIERE-6123) |
| <Key>REPORT_SWAP_MAX_ROWS</Key> |  |  | [IDEMPIERE-146](https://idempiere.atlassian.net/browse/IDEMPIERE-146) |

### S

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>SECURITY_DASHBOARD_LEGACY_KEY_WARNING</Key> | D/Y/N - D Disable the warning, otherwise Y/N are managed automatically by the system | default Y<br/>Scope: System | [IDEMPIERE-6843](https://idempiere.atlassian.net/browse/IDEMPIERE-6843) |
| <Key>SHIPPING_DEFAULT_WEIGHT_PER_PACKAGE</Key> |  |  | Ticket #1001758: FedEx & UPS |
| <Key>SSO_SELECT_ROLE</Key> | Defines if the role panel must be shown when login with SSO | defaults to true | [IDEMPIERE-5346](https://idempiere.atlassian.net/browse/IDEMPIERE-5346) |
| <Key>SSO_SHOW_LOGINPAGE</Key> | This setting controls whether the standard iDempiere login page is displayed when Single Sign-On (SSO) is enabled.<br/>**Y**: When SSO is enabled, the system displays the standard login page along with the SSO login option. Users can log in either using iDempiere username/password or SSO authentication.<br/>**N**: When SSO is enabled, the system only displays the SSO login option. The standard iDempiere username/password login is not shown, and users must authenticate using SSO. | default to N | [IDEMPIERE-5346](https://idempiere.atlassian.net/browse/IDEMPIERE-5346) |
| <Key>STANDARD_REPORT_FOOTER_TRADEMARK_TEXT</Key> | Define the system information to show on report footer | defaults to iDempiere® | [IDEMPIERE-2283](https://idempiere.atlassian.net/browse/IDEMPIERE-2283) |
| <Key>START_VALUE_BPLOCATION_NAME</Key> | Define the start value for C_BPartner_Location.Name<br/>0 - City<br/>1 - City + Address1<br/>2 - City + Address1 + Address2<br/>3 - City + Address1 + Address2 + Region<br/>4 - City + Address1 + Address2 + Region + ID | possible values = 0,1,2,3,4 -> default 0 | [FR 2582181](https://sourceforge.net/tracker2/?func=detail&aid=2582181&group_id=176962&atid=879335) |
| <Key>SWING_LOGIN_ALLOW_REMEMBER_ME</Key> | Enable remember me feature on swing | U - User<br/>P - User and password (default)<br/>N - None | [FR 2893090](https://sourceforge.net/tracker/?func=detail&atid=955896&aid=2893090&group_id=176962) |
| <Key>SWING_OVERRIDE_TEXT_AREA_BEHAVIOUR</Key> |  |  | [IDEMPIERE-320](https://idempiere.atlassian.net/browse/IDEMPIERE-320) Make Swing CTextArea consistent with ZK |
| <Key>SYSTEM_INSERT_CHANGELOG</Key> | Keep change log for inserts: Y - Yes, N - No, K - just the key _ID | Y/N/K default Y | [FR 1920314](https://sourceforge.net/tracker/?func=detail&atid=879335&aid=1920314&group_id=176962) |
| <Key>SYSTEM_IN_MAINTENANCE_MODE</Key> | Defines if system is in maintenance mode, just advanced roles can login | defaults to false | [IDEMPIERE-1717](https://idempiere.atlassian.net/browse/IDEMPIERE-1717) |
| <Key>SYSTEM_NATIVE_SEQUENCE</Key> | Use db system sequences instead of ad_sequence | Y/N defaults to N |  |

### T

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>TAX_LOOKUP_SERVICE</Key> | Defines the default tax lookup service (implementing the ITaxLookup interface) | defaults to org.adempiere.base.DefaultTaxLookup | [IDEMPIERE-5056](https://idempiere.atlassian.net/browse/IDEMPIERE-5056) |
| <Key>TOP_MARGIN_PIXELS_FOR_HEADER</Key> | This sysconfig is optional, not required, code assumes 222 as the pixels to reserve for header space, made configurable as the number of pixels can depend on the theme |  | [IDEMPIERE-581](https://idempiere.atlassian.net/browse/IDEMPIERE-581) Store divider location for window per user |
| <Key>TRACE_ALL_TRX_CONNECTION_GET</Key> | When trying to find the point of a DB connection leak, the iDempiere monitor page can help showing the point where the connection has been opened or used. By default it shows an approximate, not the exact last point where a connection was used last time. Turning this key to Y will show the exact last usage helping to identify the exact line of code where the connection leak is happening. However, use it carefully, as setting this key to Y impacts adversely the performance. | Y/N defaults to N | [IDEMPIERE-3416](https://idempiere.atlassian.net/browse/IDEMPIERE-3416) |
| <Key>TRX_AUTOSET_DISPLAY_NAME</Key> | When enabled it automatically set the class and method from the caller for the methods createTrxName() or createTrxName(null). However, use it carefully, as setting this key to Y can impact performance adversely. | Y/N defaults to N | [IDEMPIERE-5355](https://idempiere.atlassian.net/browse/IDEMPIERE-5355) |

### U

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>UPLOAD_TEMP_FILENAME_PREFIX</Key> | Prefix temporary filename for uploaded media | defaults to idempiere_ | [IDEMPIERE-4697](https://idempiere.atlassian.net/browse/IDEMPIERE-4697) |
| <Key>USER_LOCKING_MAX_ACCOUNT_LOCK_MINUTES</Key> |  |  | [IDEMPIERE-373](https://idempiere.atlassian.net/browse/IDEMPIERE-373) Implement User Locking |
| <Key>USER_LOCKING_MAX_INACTIVE_PERIOD_DAY</Key> |  |  | [IDEMPIERE-373](https://idempiere.atlassian.net/browse/IDEMPIERE-373) Implement User Locking |
| <Key>USER_LOCKING_MAX_LOGIN_ATTEMPT</Key> |  |  | [IDEMPIERE-373](https://idempiere.atlassian.net/browse/IDEMPIERE-373) Implement User Locking |
| <Key>USER_LOCKING_MAX_PASSWORD_AGE_DAY</Key> |  |  | [IDEMPIERE-373](https://idempiere.atlassian.net/browse/IDEMPIERE-373) Implement User Locking |
| <Key>USER_LOCKING_PASSWORD_NOTIFY_DAY</Key> | Days to notify user about upcoming force of changing password | Defaults to 0 (no notification) | [IDEMPIERE-3696](https://idempiere.atlassian.net/browse/IDEMPIERE-3696) |
| <Key>USER_PASSWORD_HASH</Key> | This is set automatically when you execute the [Convert Passwords to Hashes](../new-features/v1.0/hashedpasswords.md) process | default N<br/>Scope: System | [IDEMPIERE-347](https://idempiere.atlassian.net/browse/IDEMPIERE-347) passwords hash |
| <Key>USER_PASSWORD_HASH_ALGORITHM</Key> | SHA-512 / Argon2 / PBKDF2 - defined when you execute the [Convert Passwords to Hashes](../new-features/v1.0/hashedpasswords.md) process | Scope: System | [IDEMPIERE-6712](https://idempiere.atlassian.net/browse/IDEMPIERE-6712) |
| <Key>USE_EMAIL_FOR_LOGIN</Key> |  |  | [IDEMPIERE-358](https://idempiere.atlassian.net/browse/IDEMPIERE-358) Login- how to make unique and safe |
| <Key>USE_ESC_FOR_TAB_CLOSING</Key> | Define if tabs can be closed with the Esc key (additional to the Alt+X shortcut) | defaults to false | [IDEMPIERE-5786](https://idempiere.atlassian.net/browse/IDEMPIERE-5786) |

### V

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>VALIDATE_MATCHING_PRODUCT_ON_SHIPMENT</Key> | Defines if at shipment time the shipment line is validated to match the product on the order line | Client configurable, defaults to true | [IDEMPIERE-5029](https://idempiere.atlassian.net/browse/IDEMPIERE-5029) |
| <Key>VALIDATE_MATCHING_TO_ORDERED_QTY</Key> | Defines if MatchPO must validate against ordered qty | defaults to true | [IDEMPIERE-1530](https://idempiere.atlassian.net/browse/IDEMPIERE-1530) |

### W

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>WEBUI_LOGOURL</Key> | URL for the logo in zkwebui | resource or url, defaults to images/header-logo.png - just used if ZK_LOGO_SMALL is empty |  |

### X

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>XLSX_EXPORT_USE_FAST_METHOD</Key> | Y/N - Exporting to XLSX consumes too much memory, even with the possibility to crash the server, setting this configurator to N uses a better export method that doesn't consume so much resources, the drawback is that autoSizeColumn is not available | default Y<br/>Scope: Tenant | [IDEMPIERE-6526](https://idempiere.atlassian.net/browse/IDEMPIERE-6526) |

### Z

| Key | What it does | Values | Reference |
| --- | --- | --- | --- |
| <Key>ZK_ADVANCE_FIND_FILTER_COLUMN_LIST</Key> | Change column and operator list to editable combobox with auto complete | Client configurable, defaults to false | [IDEMPIERE-4865](https://idempiere.atlassian.net/browse/IDEMPIERE-4865) |
| <Key>ZK_AUTO_SAVE_CHANGES</Key> | Auto save changes on windows (no need to press the Save button) | Client configurable, defaults to false, since version 10 | [IDEMPIERE-5202](https://idempiere.atlassian.net/browse/IDEMPIERE-5202) |
| <Key>ZK_AUTO_SAVE_TABS_EXCLUDED</Key> | Comma separated list of AD_Tab_ID or AD_Tab_UU value, tabs in the list will be excluded from the effect of the ZK_AUTO_SAVE_CHANGES flag | Client configurable, since version 10 | [IDEMPIERE-5202](https://idempiere.atlassian.net/browse/IDEMPIERE-5202) |
| <Key>ZK_BROWSER_ICON</Key> | Icon to use for browser on zkwebui | defaults to `/theme/[ZK_THEME]/images/icon.png` | [FR 2790994](https://sourceforge.net/tracker/?func=detail&aid=2790994&group_id=176962&atid=955896) |
| <Key>ZK_BROWSER_TITLE</Key> | Title to show in browser | iDempiere | [SVN rev 9195](http://adempiere.svn.sourceforge.net/adempiere/?rev=9195&view=rev) |
| <Key>ZK_BUTTON_STYLE</Key> | Defines the style to show buttons: text, image or both | (I)mage only, (T)ext only and (IT) - image + text (defaults to I) | [IDEMPIERE-800](https://idempiere.atlassian.net/browse/IDEMPIERE-800) |
| <Key>ZK_DASHBOARD_CALENDAR_REQUEST_DISPLAY_MODE</Key> | To configure the requests to be displayed in the calendar:<br/>C = Created By<br/>S = Sales Rep<br/>U = User/Contact<br/>By default, it is set to CSU, it will display the requests in the calendar if the logged in user is the Sales Rep, User/Contact or Created By. Set it to SU if you would like to show requests where the Sales Rep or User/Contact is the logged in user. | defaults to CSU | [IDEMPIERE-2973](https://idempiere.atlassian.net/browse/IDEMPIERE-2973) |
| <Key deprecated>ZK_DASHBOARD_PERFORMANCE_REFRESH_INTERVAL</Key> | ~~Milliseconds of wait to run the goal update for performance indicators~~ | deprecated | ~~[IDEMPIERE-3191](https://idempiere.atlassian.net/browse/IDEMPIERE-3191)~~ |
| <Key>ZK_DASHBOARD_REFRESH_INTERVAL</Key> | Milliseconds of wait to run the dashboard refresh on zk webui client | integer milliseconds default 60000 | [FR 2486831](https://sourceforge.net/tracker2/?func=detail&atid=955896&aid=2486831&group_id=176962) |
| <Key>ZK_DECIMALBOX_PROCESS_DOTKEYPAD</Key> | Defines if numeric entry must treat the dot keypad as decimal separator on language | defaults to true | [IDEMPIERE-2003](https://idempiere.atlassian.net/browse/IDEMPIERE-2003) |
| <Key>ZK_DESKTOP_CLASS</Key> | package+classname of zk desktop class<br/>possible values:<br/>org.adempiere.webui.desktop.DefaultDesktop<br/>org.adempiere.webui.desktop.NavBarDesktop<br/>org.adempiere.webui.desktop.NavBar2Desktop<br/>org.adempiere.webui.desktop.TabbedDesktop<br/>or any custom class you implement to manage your desktop | package+classname defaults to org.adempiere.webui.desktop.DefaultDesktop |  |
| <Key>ZK_DESKTOP_HEADER_BACKGROUND_COLOR</Key> | Defines the background color to show on the header, this is useful to differentiate test and development environments from production. | default is defined by theme in desktop.css.dsp | [IDEMPIERE-6413](https://idempiere.atlassian.net/browse/IDEMPIERE-6413) |
| <Key>ZK_DESKTOP_HEADER_MESSAGE_VALUE</Key> | Defines the Search Key of a message to show on the desktop header, this is useful to differentiate test and development environments from production. But also can be used to show a message to users. | default is empty | [IDEMPIERE-6413](https://idempiere.atlassian.net/browse/IDEMPIERE-6413) |
| <Key>ZK_DESKTOP_SHOW_HOME_BUTTON</Key> | When Y, add Home toolbar button for desktop client (This is an existing feature for mobile client) | Y/N type Client level System Config entry, default to Y | [IDEMPIERE-4949](https://idempiere.atlassian.net/browse/IDEMPIERE-4949) |
| <Key>ZK_DESKTOP_SHOW_TAB_LIST_BUTTON</Key> | When Y, add toolbar button to show a list of open tabs for desktop client (This is an existing feature for mobile client) | Y/N type Client level System Config entry, default to Y | [IDEMPIERE-4949](https://idempiere.atlassian.net/browse/IDEMPIERE-4949) |
| <Key>ZK_DESKTOP_TAB_AUTO_SHRINK_TO_FIT</Key> | When Y, ZK_DESKTOP_SHOW_TAB_LIST_BUTTON is always on regardless of the actual value of ZK_DESKTOP_SHOW_TAB_LIST_BUTTON<br/>When Y, tab scroll button is made hidden, you have to use the tab list dropdown to select tab that's not visible.<br/>When Y, tab will be auto shrink to fit more tabs on screen (similar to how Chrome tabs work). | Y/N type Client level System Config entry, default to N | [IDEMPIERE-4949](https://idempiere.atlassian.net/browse/IDEMPIERE-4949) |
| <Key>ZK_DESKTOP_TAB_MAX_TITLE_LENGTH</Key> | Set the maximum length of desktop tab title/label | Integer type Client level System Config entry, default to 30 | [IDEMPIERE-4949](https://idempiere.atlassian.net/browse/IDEMPIERE-4949) |
| <Key>ZK_ERROR_MSG_LIFETIME_MILLISECONDS</Key> | Lifetime for the popup error message on windows. Setting to zero will make the popup stay open and requires manual closing | Integer type Client level System Config entry, default to 3500 (3.5 seconds) | [IDEMPIERE-5300](https://idempiere.atlassian.net/browse/IDEMPIERE-5300) |
| <Key>ZK_FIELD_LABEL_ABOVE_INPUT</Key> | Y/N - in zkwebui positions the labels above the fields | default N<br/>Scope: Tenant | [IDEMPIERE-6502](https://idempiere.atlassian.net/browse/IDEMPIERE-6502) |
| <Key>ZK_FIELD_MOBILE_LABEL_ABOVE_INPUT</Key> | Y/N - in zkwebui mobile positions the labels above the fields | default Y<br/>Scope: Tenant | [IDEMPIERE-6502](https://idempiere.atlassian.net/browse/IDEMPIERE-6502) |
| <Key>ZK_FIELD_MOBILE_SMALL_WIDTH_LABEL_ABOVE_INPUT</Key> | Y/N - in zkwebui defines if the label has a small width | default Y for mobile when width &lt; 500px<br/>Scope: Tenant | [IDEMPIERE-6502](https://idempiere.atlassian.net/browse/IDEMPIERE-6502) |
| <Key>ZK_FLAT_VIEW_MENU_TREE</Key> | Defines if the menu tree is shown as flat | Defaults to false | [IDEMPIERE-5213](https://idempiere.atlassian.net/browse/IDEMPIERE-5213) |
| <Key>ZK_FOOTER_SERVER_DATETIME_FORMAT</Key> | This key can change the format that is used on the dates on footer of reports |  | [IDEMPIERE-2283](https://idempiere.atlassian.net/browse/IDEMPIERE-2283) |
| <Key>ZK_FOOTER_SERVER_MSG</Key> | This key allows to change the message that is shown on report footers |  | [IDEMPIERE-2283](https://idempiere.atlassian.net/browse/IDEMPIERE-2283) |
| <Key>ZK_GRID_AFTER_FIND</Key> | Set the default value for setting the tab in grid view when the Find panel closes. This value can be overwritten using user preferences (see [Force Grid Mode When Find Panel Closes](../new-features/v7.1/force-grid-mode-when-find-panel-closes.md) for more details) | Y/N - Default N | [IDEMPIERE-4005](https://idempiere.atlassian.net/browse/IDEMPIERE-4005) |
| <Key>ZK_GRID_AUTO_HIDE_EMPTY_COLUMNS</Key> | When Y, auto hide a grid column if it is with empty content for all rows of current page | Client level, default to N (false) | [IDEMPIERE-4835](https://idempiere.atlassian.net/browse/IDEMPIERE-4835) |
| <Key>ZK_GRID_EDIT_MODELESS</Key> | Y -> grid view will enter in edit mode<br/>N -> grid view will default as readonly, user have to click on the currently selected row or press enter key to enter edit mode | Y/N - Default Y (enter in edit mode) | [FR 2688854](https://sourceforge.net/tracker2/?func=detail&atid=955896&aid=2688854&group_id=176962) |
| <Key>ZK_GRID_MOBILE_AUTO_HIDE_EMPTY_COLUMNS</Key> | Y/N - Defines the default for the auto-hide empty columns on grid for windows. This can be overridden by the user using grid customization | default Y on mobile, N on desktop<br/>Scope: Tenant | [IDEMPIERE-6502](https://idempiere.atlassian.net/browse/IDEMPIERE-6502) |
| <Key>ZK_GRID_MOBILE_EDITABLE</Key> | Disable AD Window grid view edit mode | Defaults to false | [IDEMPIERE-4482](https://idempiere.atlassian.net/browse/IDEMPIERE-4482) |
| <Key>ZK_GRID_MOBILE_EDIT_MODELESS</Key> | Same as ZK_GRID_EDIT_MODELESS, but this definition just applies for mobile screens | Y/N defaults to N | [IDEMPIERE-3518](https://idempiere.atlassian.net/browse/IDEMPIERE-3518) |
| <Key>ZK_GRID_MOBILE_LINE_BREAK_AS_IDENTIFIER_SEPARATOR</Key> | Use line break to replace identifier separator | Defaults to true | [IDEMPIERE-4482](https://idempiere.atlassian.net/browse/IDEMPIERE-4482) |
| <Key>ZK_GRID_MOBILE_MAX_COLUMNS</Key> | The max number of columns to show in grid view on mobile screens | defaults to 10 | [IDEMPIERE-3518](https://idempiere.atlassian.net/browse/IDEMPIERE-3518) |
| <Key>ZK_GRID_MOBILE_SHOW_CURRENT_ROW_INDICATOR</Key> | Hide current row indicator for mobile | Defaults to false | [IDEMPIERE-4482](https://idempiere.atlassian.net/browse/IDEMPIERE-4482) |
| <Key>ZK_GRID_VIEW_USE_DEFER_RENDERING</Key> | Defer row rendering for grid view, should give faster paging response | Client configurable, defaults to false | [IDEMPIERE-4519](https://idempiere.atlassian.net/browse/IDEMPIERE-4519) |
| <Key>ZK_INFO_AUTO_COLLAPSED_PARAMETER_PANEL</Key> | When set to Y, info window will auto collapse the parameter panel if query returns >= 1 records | Client configurable, defaults to false | [IDEMPIERE-5743](https://idempiere.atlassian.net/browse/IDEMPIERE-5743) |
| <Key>ZK_INFO_AUTO_HIDE_EMPTY_COLUMNS</Key> | Set this to Y to turn on the auto hide feature system wide or tenant wide | Client configurable, defaults to false | [IDEMPIERE-4841](https://idempiere.atlassian.net/browse/IDEMPIERE-4841) |
| <Key>ZK_INFO_MOBILE_AUTO_COLLAPSED_PARAMETER_PANEL</Key> | Y/N - just for mobile: When set to Y, info window will auto collapse the parameter panel if query returns >= 1 records | default Y on mobile, on desktop defaults to ZK_INFO_AUTO_COLLAPSED_PARAMETER_PANEL<br/>Scope: Tenant | [IDEMPIERE-6502](https://idempiere.atlassian.net/browse/IDEMPIERE-6502) |
| <Key>ZK_INFO_MOBILE_AUTO_HIDE_EMPTY_COLUMNS</Key> | Y/N - Defines the default for the auto-hide empty columns on grid for INFO windows. This can be overridden by the user using grid customization | default Y on mobile, on desktop defaults to ZK_INFO_AUTO_HIDE_EMPTY_COLUMNS<br/>Scope: Tenant | [IDEMPIERE-6502](https://idempiere.atlassian.net/browse/IDEMPIERE-6502) |
| <Key>ZK_INFO_NUM_PAGE_PRELOAD</Key> | Number of pages pre-loaded into cache, actual has ZK_INFO_NUM_PAGE_PRELOAD * 2 + 1 pages in cache (ZK_INFO_NUM_PAGE_PRELOAD previous pages, ZK_INFO_NUM_PAGE_PRELOAD next pages and current page) | Integer number > 0, default is 4 | [IDEMPIERE-2367](https://idempiere.atlassian.net/browse/IDEMPIERE-2367) |
| <Key>ZK_INFO_QUERY_TIME_OUT</Key> | This is to configure the query timeout for info window (in seconds) | Client configurable, defaults 120 (2 minutes), zero means no timeout | [IDEMPIERE-4628](https://idempiere.atlassian.net/browse/IDEMPIERE-4628) |
| <Key>ZK_LOGIN_ALLOW_CHROME_SAVE_PASSWORD</Key> | Defines if the password field on login page allows to be saved in chrome | Y/N defaults to Y | [IDEMPIERE-3449](https://idempiere.atlassian.net/browse/IDEMPIERE-3449) |
| <Key>ZK_LOGIN_ALLOW_REMEMBER_ME</Key> | Enable remember me feature on zkwebui | U - User (default)<br/>P - User and password<br/>N - None | [FR 2893090](https://sourceforge.net/tracker/?func=detail&atid=955896&aid=2893090&group_id=176962) |
| <Key>ZK_LOGO_LARGE</Key> | URL for large logo in zkwebui | defaults to images/logo.png | [SVN rev 9197](http://adempiere.svn.sourceforge.net/adempiere/?rev=9197&view=rev) |
| <Key>ZK_LOGO_SMALL</Key> | URL for small logo in zkwebui | defaults to WEBUI_LOGOURL | [SVN rev 9197](http://adempiere.svn.sourceforge.net/adempiere/?rev=9197&view=rev) |
| <Key>ZK_MAX_ATTACHMENT_PREVIEW_SIZE</Key> | Max size for an attachment to be previewed | Client configurable, defaults to 1048576 (1MB) | [IDEMPIERE-1117](https://idempiere.atlassian.net/browse/IDEMPIERE-1117) |
| <Key>ZK_MAX_UPLOAD_SIZE</Key> |  | Scope: Tenant | [IDEMPIERE-763](https://idempiere.atlassian.net/browse/IDEMPIERE-763) Maximum size for File Upload |
| <Key>ZK_MOBILE_PAGING_SIZE</Key> | Same as ZK_PAGING_SIZE, but this setting applies for mobile screens | defaults to 20 | [IDEMPIERE-3518](https://idempiere.atlassian.net/browse/IDEMPIERE-3518) |
| <Key>ZK_PAGING_DETAIL_SIZE</Key> | Default paging size for the detail records in zk webui. The format of ZK_PAGING_DETAIL_SIZE is a list of components separated by semicolon ( ; ). The first component is the wide default, next components are exceptions defined as pair of tab:size - where tab can be AD_Tab_ID, AD_Tab_UU or AD_TableName | Default is 10 | [IDEMPIERE-3786](https://idempiere.atlassian.net/browse/IDEMPIERE-3786) |
| <Key>ZK_PAGING_SIZE</Key> | Default paging size for grid view in zk webui | Default is 25 | [BF 2587957](https://sourceforge.net/tracker/index.php?func=detail&aid=2587957&group_id=176962&atid=955896) |
| <Key>ZK_REPORT_FORM_OUTPUT_TYPE</Key> | Type of output in zkwebui for reports of type form, possible values are PDF, HTML, XLS | defaults to PDF | [FR 2804027](https://sourceforge.net/tracker/?func=detail&aid=2804027&group_id=176962&atid=955896) |
| <Key>ZK_REPORT_JASPER_OUTPUT_TYPE</Key> |  |  | [IDEMPIERE-970](https://idempiere.atlassian.net/browse/IDEMPIERE-970) |
| <Key>ZK_REPORT_ONLY_PRINTFORMAT_LINKEDTO_REPORTVIEW</Key> | Defines if the list of print formats is filtered by the report view, or just the table | Y/N defaults to N | [IDEMPIERE-3411](https://idempiere.atlassian.net/browse/IDEMPIERE-3411) |
| <Key>ZK_REPORT_TABLE_OPEN_IN_NEW_TAB</Key> | Enable open tabular report on same tab instead open new <!-- TODO: verify: the key name says "open in new tab" but the description says "same tab" --> | Y/N defaults to N | [IDEMPIERE-5275](https://idempiere.atlassian.net/browse/IDEMPIERE-5275) |
| <Key>ZK_REPORT_TABLE_OUTPUT_TYPE</Key> | Type of output in zkwebui for reports of type table, possible values are PDF, HTML, XLS | defaults to PDF | [FR 2804027](https://sourceforge.net/tracker/?func=detail&aid=2804027&group_id=176962&atid=955896) |
| <Key>ZK_ROOT_FOLDER_BROWSER</Key> | Indicates the root for zk folder browser | server folder - if not set, or -2 defaults to Server Adempiere Home | [c2072ab](https://github.com/idempiere/idempiere/commit/c2072ab) |
| <Key>ZK_SEARCH_AUTO_COMPLETE_MAX_ROWS</Key> | Max records for Search autocomplete | Client configurable, defaults to 500 | [IDEMPIERE-4651](https://idempiere.atlassian.net/browse/IDEMPIERE-4651) |
| <Key>ZK_SEARCH_AUTO_COMPLETE_TIMEOUT</Key> | Defines the timeout in seconds for the autocomplete feature | default 1 second<br/>Scope: Tenant | [IDEMPIERE-6890](https://idempiere.atlassian.net/browse/IDEMPIERE-6890) |
| <Key>ZK_SEQ_DEFAULT_VALUE_PANEL</Key> | Allows to configure the sequence of finding a default value on info panel, input parameter panel | "1" means from special case<br/>"2" means from sql default<br/>"3" means from default logic<br/>"4" means user preference<br/>"5" means from system preference<br/>"6" means preference for field lie down at panel as process parameter, info parameter,...<br/>"7" means data-type default<br/>default value is "623" | [IDEMPIERE-2296](https://idempiere.atlassian.net/browse/IDEMPIERE-2296) |
| <Key>ZK_SESSION_FINGERPRINT_CHECK_ACCEPT_LANGUAGE</Key> | Checks the Accept-Language header for fingerprinting of session. Accepted values are N/W/L/S - N-Do Nothing / W-Log a Warning in logs / L-Log a Severe in logs and AD_Issue / S-Stop the execution, logout the user | default S (Stop)<br/>Scope: System | [IDEMPIERE-6809](https://idempiere.atlassian.net/browse/IDEMPIERE-6809) |
| <Key>ZK_SESSION_FINGERPRINT_CHECK_IP</Key> | Checks the IP address for fingerprinting of session. Accepted values are N/W/L/S - N-Do Nothing / W-Log a Warning in logs / L-Log a Severe in logs and AD_Issue / S-Stop the execution, logout the user | default L (Log Severe)<br/>Scope: System | [IDEMPIERE-6809](https://idempiere.atlassian.net/browse/IDEMPIERE-6809) |
| <Key>ZK_SESSION_FINGERPRINT_CHECK_USER_AGENT</Key> | Checks the User-Agent header for fingerprinting of session. Accepted values are N/W/L/S - N-Do Nothing / W-Log a Warning in logs / L-Log a Severe in logs and AD_Issue / S-Stop the execution, logout the user | default S (Stop)<br/>Scope: System | [IDEMPIERE-6809](https://idempiere.atlassian.net/browse/IDEMPIERE-6809) |
| <Key>ZK_SESSION_FINGERPRINT_ENABLED</Key> | Enable/disable the fingerprinting of sessions. Y/N - N disables completely the fingerprinting (not recommended) | default Y<br/>Scope: System | [IDEMPIERE-6809](https://idempiere.atlassian.net/browse/IDEMPIERE-6809) |
| <Key>ZK_SESSION_SAVE_JSESSIONID</Key> | Y/N - defines if the jsessionid is saved in AD_Session.WebSession | default N<br/>Scope: System | [IDEMPIERE-6809](https://idempiere.atlassian.net/browse/IDEMPIERE-6809) |
| <Key>ZK_SESSION_SAVE_USER_AGENT</Key> | Y/N - defines if the User Agent from the browser is saved in MFA_RegisteredDevice.Help, Feedback attachment, AD_Session.Description or added to context as #UserAgent | default N<br/>Scope: System | [IDEMPIERE-6809](https://idempiere.atlassian.net/browse/IDEMPIERE-6809) |
| <Key>ZK_SESSION_TIMEOUT_IN_SECONDS</Key> | ZK session timeout | if not set the timeout is taken from web.xml file | [IDEMPIERE-2110](https://idempiere.atlassian.net/browse/IDEMPIERE-2110) |
| <Key>ZK_THEME</Key> | Theme to use on zkwebui | defaults to "default" | [FR 2790994](https://sourceforge.net/tracker/?func=detail&aid=2790994&group_id=176962&atid=955896) |
| <Key>ZK_THEME_USE_FONT_ICON_FOR_IMAGE</Key> | Flag to indicate if using icon themes | defaults to N | [IDEMPIERE-3535](https://idempiere.atlassian.net/browse/IDEMPIERE-3535) |
| <Key>ZK_THUMBNAIL_IMAGE_HEIGHT</Key> | Height of thumbnail image for info window and grid view | defaults to 100<br/>Scope: Tenant | [IDEMPIERE-6242](https://idempiere.atlassian.net/browse/IDEMPIERE-6242) |
| <Key>ZK_THUMBNAIL_IMAGE_WIDTH</Key> | Width of thumbnail image for info window and grid view | defaults to 100<br/>Scope: Tenant | [IDEMPIERE-6242](https://idempiere.atlassian.net/browse/IDEMPIERE-6242) |
| <Key>ZK_TOOLBAR_SHOW_MORE_VERTICAL</Key> | Define if the "More" toolbar buttons are shown vertical or as an extended toolbar | Client configurable, defaults to true | [IDEMPIERE-4499](https://idempiere.atlassian.net/browse/IDEMPIERE-4499) |
| <Key>ZK_USE_PDF_JS_VIEWER</Key> | Y - Use pdf.js viewer for pdf, N - use browser default viewer for pdf | Client configurable, defaults to true | [IDEMPIERE-4497](https://idempiere.atlassian.net/browse/IDEMPIERE-4497) |
| <Key>ZOOM_ACROSS_QUERY_TIMEOUT</Key> | Timeout in seconds for the count queries ran when pushing the button Zoom Across | defaults to 5 seconds | [IDEMPIERE-3580](https://idempiere.atlassian.net/browse/IDEMPIERE-3580) |
