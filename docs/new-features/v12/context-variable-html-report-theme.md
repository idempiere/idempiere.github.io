# Context Variable HTML REPORT THEME

> **Developer:** Deepak Pansheriya

**Goal:** Technical

**Feature** **Ticket:** [IDEMPIERE-6396](https://idempiere.atlassian.net/browse/IDEMPIERE-6396)

### Description
report.css path is configurable using system configuration named HTML_REPORT_THEME. But when path of same needs to decide bases on some dynamic logic, it is not achievable. for example in theme pack, when there is dark backgrond colored theme then odd line not visible so for dark theme or per theme selected needs to decide path of report.css.

Adding this feature, it is possible to set a context variable like #ThemeVarient and configuring HTML_REPORT_THEME with value like ~./theme/themepack/@#ThemeVarient@ will allow to load theme based on user selected theme.
