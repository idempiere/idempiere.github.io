---
sidebar_label: "Removed deprecated APIs"
sidebar_position: 2
description: "Reference list of classes and methods removed in iDempiere 13 that had been deprecated for more than two major releases."
tags: [features, migration, installation, development, developer-documentation, reference]
---

# Removed deprecated APIs - iDempiere 13

This is the full reference list of classes and methods removed with ticket [IDEMPIERE-6735](https://idempiere.atlassian.net/browse/IDEMPIERE-6735), as described in [Migration notes - iDempiere 13 (technical)](./technical-notes.md#removal-of-old-deprecated-code).

:::warning
Custom plugins and customizations that still call these classes and methods will no longer compile and must be updated.
:::

## Removed classes

- `org.compiere.process.BOMValidate`
- `com.akunagroup.uk.postcode.AddressInterface`
- `com.akunagroup.uk.postcode.AddressLookup`
- `com.akunagroup.uk.postcode.AddressLookupInterface`
- `com.akunagroup.uk.postcode.Postcode`
- `com.akunagroup.uk.postcode.package-info`
- `org.adempiere.util.GenerateModel`
- `org.adempiere.util.GenerateModelJPA`
- `org.compiere.db.SecurityPrincipal`
- `org.compiere.model.MBOM` and its `X_` and `I_` related classes
- `org.compiere.model.MBOMProduct` and its `X_` and `I_` related classes
- `org.compiere.model.MBlackListCheque` and its `X_` and `I_` related classes
- `org.compiere.model.MProductBOM` and its `X_` and `I_` related classes
- `org.compiere.util.CallableResult`
- `org.compiere.util.ExecuteResult`
- `org.compiere.util.ExtensionFileFilter`
- `org.compiere.util.FileUpload`
- `org.compiere.util.Queue`
- `org.adempiere.webui.DelegatingServlet`
- `org.adempiere.webui.event.TouchEventHelper`
- `org.adempiere.webui.panel.ChatPanel`
- `org.adempiere.webui.panel.ConfigurationPanel`
- `org.adempiere.webui.panel.FooterPanel`
- `org.adempiere.webui.panel.RequestNoticePanel`
- `org.adempiere.webui.window.FDialog`

## Removed methods

### AbstractADWindowContent

- `public void executeASync(ProcessInfo pi)`

### ADSortTab

- `public void editRecord(boolean b)`

### AEnv

- `public static void exit (int status)`
- `public static boolean isTablet()`

### CConnection

- `public InitialContext getInitialContext(boolean useCache)`

### CustomizerGridViewDialog

- `public static boolean onCustomize(ADTabpanel tabPanel)`
- `public static boolean showCustomize(int WindowNo, int AD_Tab_ID, Map<Integer, String> columnsWidth, ArrayList<Integer> gridFieldIds, GridView gridPanel, QuickGridView quickGridView, boolean isQuickForm)`

### Dialog

- `public static boolean ask(int windowNo, String adMessage)`
- `public static boolean ask(int windowNo, String adMessage, String additionalMessage)`

### diff_match_patch

- `@Deprecated public LinkedList<Patch> patch_make(String text1, String text2, ...)`

### Env

- `public static Properties getRemoteCallCtx(Properties ctx)`

### GridTable

- `public boolean isSortedAscending()`
- `public int getSortColumnIndex()`

### I_C_Country

- `public boolean isPostcodeLookup()`
- `public String getLookupClassName()`
- `public String getLookupClientID()`
- `public String getLookupPassword()`
- `public String getLookupUrl()`
- `public void setIsPostcodeLookup(boolean IsPostcodeLookup)`
- `public void setLookupClassName(String LookupClassName)`
- `public void setLookupClientID(String LookupClientID)`
- `public void setLookupPassword(String LookupPassword)`
- `public void setLookupUrl(String LookupUrl)`

### LayoutUtils

- `public static void sendDeferLayoutEvent(org.zkoss.zul.Borderlayout layout, int timeout)`

### Login

- `private KeyNamePair[] getRoles(String app_user, String app_pwd, boolean force)`
- `protected KeyNamePair[] getRoles(CConnection cc, ...)`
- `public KeyNamePair[] getRoles(Principal app_user)`
- `public KeyNamePair[] getRoles(String app_user, String app_pwd)`
- `public static Properties initTest (boolean isClient)`

### MAging

- `MAging (Properties ctx, int AD_PInstance_ID, Timestamp StatementDate, int C_BPartner_ID, int C_Currency_ID, int C_Invoice_ID, int C_InvoicePaySchedule_ID, int C_BP_Group_ID, Timestamp DueDate, boolean IsSOTrx, String trxName)`

### MBPartner

- `public int getAD_OrgBP_ID_Int()`

### MBPartnerLocation

- `public static MBPartnerLocation[] getForBPartner(Properties ctx, int C_BPartner_ID)`

### MCharge

- `public static MAccount getAccount (int C_Charge_ID, MAcctSchema as, BigDecimal amount)`

### MCountry

- `public static void setDisplayLanguage (String AD_Language)`

### MPaySelectionLine

- `public void xsetInvoice(int C_Invoice_ID, boolean isSOTrx, BigDecimal OpenAmt, ...)`

### MWFEventAudit

- `public static MWFEventAudit[] get (Properties ctx, int AD_WF_Process_ID, int AD_WF_Node_ID)`
- `public static MWFEventAudit[] get (Properties ctx, int AD_WF_Process_ID)`

### WCreateFromWindow

- `public void setStatusBar(StatusBarPanel statusBar)`

### WListItemRenderer

- `public void setRO(int colIndex, Boolean readOnly)`

### WLocatorEditor

- `public void setField(org.compiere.model.GridField mField)`

### WTableColumn

- `public boolean getResizable()`
- `public int getMaxWidth()`
- `public int getMinWidth()`
- `public int getPreferredWidth()`
- `public int getWidth()`
- `public void setMaxWidth(int maxWidth)`
- `public void setMinWidth(int minWidth)`
- `public void setPreferredWidth(int preferredWidth)`
- `public void setResizable(boolean isResizable)`
- `public void setWidth(int width)`

### WindowContainer

- `public Tab addWindow(Component comp, String title, boolean closeable)`
- `public Tab addWindow(Component comp, String title, boolean closeable, boolean enable)`
- `public Tab insertAfter(Tab refTab, Component comp, String title, boolean closeable, boolean enable)`
- `public Tab insertBefore(Tab refTab, Component comp, String title, boolean closeable, boolean enable)`
