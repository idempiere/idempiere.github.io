---
sidebar_label: Process Exception Message Templates
sidebar_position: 5
description: Customize Java process uncaught exception summaries using AD_Message templates matched by exception class hierarchy.
tags:
  - technical
  - development
applies_to: ">=14"
last_reviewed: 2026-11-16
---

# Process exception message templates

:::warning Not Yet in Stable Release

This feature is not yet part of a stable iDempiere release and may change.

:::

**Goal:** Technical  
**Developer:** [Heng Sin Low](https://github.com/hengsin)  
**Feature Ticket:** [IDEMPIERE-7210](https://idempiere.atlassian.net/browse/IDEMPIERE-7210)  
**Version:** iDempiere 14

## The problem

When a Java process executed through `ProcessUtil.startJavaProcess` throws an uncaught `Throwable`, iDempiere previously formatted the process error summary unconditionally as:

```java
Msg.getMsg(Env.getCtx(), "ProcessError") + " " + e.getLocalizedMessage()
```

Administrators and implementers could not customize, wrap, or translate error summaries for specific exception types without modifying Java code.

## What changed

`ProcessUtil.startJavaProcess` now looks up an `AD_Message` template for the thrown exception before building the error summary:

1. Starting from the exception's own class, iDempiere checks the fully qualified class name (for example, `java.lang.IllegalStateException`) and walks up the superclass chain up to `java.lang.Throwable`.
2. For each class in the chain, it checks whether an `AD_Message` exists using `Msg.hasMsg(ctx, className)`. Lookup stops at the first match.
3. If a matching `AD_Message` template is found:
   - When the template contains `{0}`, iDempiere formats it with `java.text.MessageFormat`, passing `e.getLocalizedMessage()` (or an empty string if `null`) as `{0}` and trimming the result. Single quotes in the template are preserved automatically.
   - When the template does not contain `{0}`, or when the pattern is invalid for `MessageFormat`, `e.getLocalizedMessage()` is appended to the template text, separated by a space and trimmed.
4. If no `AD_Message` exists for any class in the exception hierarchy, iDempiere keeps the previous behavior and uses `e.getLocalizedMessage()` directly.
5. The resulting text is prefixed with `Msg.getMsg(ctx, "ProcessError") + " "`, using the passed `ctx` instead of `Env.getCtx()`.

## How to set it up

No database migration is required, and no exception class messages are preconfigured. To define a custom template for an exception class or superclass:

1. Log in as System Administrator.
2. Open the **Message** window.
3. Create a record in the **Message** tab:
   - Set **Search Key** (`Value`) to the fully qualified exception class name (such as `java.lang.IllegalStateException`), a superclass (such as `java.lang.RuntimeException`), or `java.lang.Throwable` as a general fallback.
   - Set **Message Type** (`MsgType`) to **Error**.
   - Set **Message Text** (`MsgText`) to your message template, using `{0}` where the exception's localized message should appear (for example, `Invalid state: {0}`).
4. Optionally, add localized texts in the **Message** => **Translation** subtab, or override per Tenant when [Messages at Client Level](/docs/new-features/v9/messages-at-client-level) is enabled.
5. Save the record and run **Cache Reset** so the new message is loaded.

## Examples

- **Specific exception class with `{0}`:** Defining an `AD_Message` with **Search Key** `java.lang.IllegalStateException` and **Message Text** `Invalid state: {0}` turns an uncaught `IllegalStateException("Document already closed")` into the summary `"Error: Invalid state: Document already closed"`.
- **Fallback for all exceptions:** Defining an `AD_Message` with **Search Key** `java.lang.Throwable` provides a default template for any uncaught exception whose more specific classes do not have an `AD_Message`.
- **Single quotes in text:** Defining `Can't complete: {0}` keeps the apostrophe intact without requiring doubled quotes (`''`).
- **Template without `{0}`:** Defining `Custom IllegalState` without `{0}` appends the exception detail, producing `"Error: Custom IllegalState Document already closed"`.
- **Exception without a message:** When `e.getLocalizedMessage()` is `null`, `{0}` resolves to an empty string so `"null"` does not appear in the summary.

## Technical notes

- **New `Msg.hasMsg` helper:** `org.compiere.util.Msg` adds `public static boolean hasMsg(Properties ctx, String AD_Message)`. It checks whether a non-empty message exists for the language resolved from `ctx` (falling back to `Language.getBaseAD_Language()`). Unlike `Msg.getMsg(Properties, String)`, `hasMsg` does not log a warning when the key is missing, allowing `ProcessUtil` to probe the exception hierarchy without polluting logs.
- **Context propagation:** `ProcessUtil.startJavaProcess` now passes `ctx` to `Msg.getMsg(ctx, "ProcessError")` as well as `getExceptionMessage(ctx, e)`.
- **Pattern safety:** Single quotes in the `AD_Message` template are escaped with `template.replace("'", "''")` before calling `MessageFormat.format`. If `MessageFormat.format` throws `IllegalArgumentException`, `ProcessUtil` logs the invalid pattern at `Level.FINE` and falls back to `(template + " " + detail).trim()`.

## Migration impact

None. Existing Java processes behave identically unless an `AD_Message` matching an exception class in the `Throwable` hierarchy is added.

## Related tickets

- [IDEMPIERE-7210](https://idempiere.atlassian.net/browse/IDEMPIERE-7210)
- Pull Request: [#3466](https://github.com/idempiere/idempiere/pull/3466)
