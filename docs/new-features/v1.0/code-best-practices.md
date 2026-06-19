---
sidebar_position: 52
title: "Code Best Practices"
sidebar_label: "Code Best Practices"
description: "**Sponsor:** [Trek Global](https://www.trekglobal.com)"
tags: [technical]
---
**Goal:** Technical

**Sponsor:** [Trek Global](https://www.trekglobal.com)

**Description:**

## Findbugs
Cases applied to Idempiere:

- [Dead store to local variable.](http://findbugs.sourceforge.net/bugDescriptions.html#DLS_DEAD_LOCAL_STORE)

- [BigDecimal constructed from double that isn't represented precisely.](http://findbugs.sourceforge.net/bugDescriptions.html#DMI_BIGDECIMAL_CONSTRUCTED_FROM_DOUBLE)

- [Possible null pointer dereference.](http://findbugs.sourceforge.net/bugDescriptions.html#NP_NULL_ON_SOME_PATH)

- [Nullcheck of value previously dereferenced.](http://findbugs.sourceforge.net/bugDescriptions.html#RCN_REDUNDANT_NULLCHECK_WOULD_HAVE_BEEN_A_NPE)

- [Method may fail to close database resource.](http://findbugs.sourceforge.net/bugDescriptions.html#ODR_OPEN_DATABASE_RESOURCE)

- [Method may fail to close stream.](http://findbugs.sourceforge.net/bugDescriptions.html#OS_OPEN_STREAM)

- [Unread field: should this field be static?.](http://findbugs.sourceforge.net/bugDescriptions.html#SS_SHOULD_BE_STATIC)

- [Should be a static inner class.](http://findbugs.sourceforge.net/bugDescriptions.html#SIC_INNER_SHOULD_BE_STATIC)

- [Possible null pointer dereference in method on exception path.](http://findbugs.sourceforge.net/bugDescriptions.html#NP_NULL_ON_SOME_PATH_EXCEPTION)

- [Integral division result cast to double or float.](http://findbugs.sourceforge.net/bugDescriptions.html#ICAST_IDIV_CAST_TO_DOUBLE)

- [Nonconstant string passed to execute method on an SQL statement.](http://findbugs.sourceforge.net/bugDescriptions.html#SQL_NONCONSTANT_STRING_PASSED_TO_EXECUTE)

- [Non-transient non-serializable instance field in serializable class.](http://findbugs.sourceforge.net/bugDescriptions.html#SE_BAD_FIELD)

- [Method might ignore exception.](http://findbugs.sourceforge.net/bugDescriptions.html#DE_MIGHT_IGNORE)

- [Class defines equals() and uses Object.hashCode().](http://findbugs.sourceforge.net/bugDescriptions.html#HE_EQUALS_USE_HASHCODE)

- [Nullcheck of value previously dereferenced.](http://findbugs.sourceforge.net/bugDescriptions.html#RCN_REDUNDANT_NULLCHECK_WOULD_HAVE_BEEN_A_NPE)

- [Incorrect lazy initialization and update of static field.](http://findbugs.sourceforge.net/bugDescriptions.html#LI_LAZY_INIT_UPDATE_STATIC)

- [Null pointer dereference.](http://findbugs.sourceforge.net/bugDescriptions.html#NP_ALWAYS_NULL)

- [Impossible downcast of toArray() resul.](http://findbugs.sourceforge.net/bugDescriptions.html#BC_IMPOSSIBLE_DOWNCAST_OF_TOARRAY)

- [Exception created and dropped rather than thrown.](http://findbugs.sourceforge.net/bugDescriptions.html#RV_EXCEPTION_NOT_THROWN)

- [Very confusing method names.](http://findbugs.sourceforge.net/bugDescriptions.html#NM_VERY_CONFUSING)

- [No relationship between generic parameter and method argument.](http://findbugs.sourceforge.net/bugDescriptions.html#GC_UNRELATED_TYPES)

- [Call to equals() comparing different types.](http://findbugs.sourceforge.net/bugDescriptions.html#EC_UNRELATED_TYPES)

- [Method concatenates strings using + in a loop.](http://findbugs.sourceforge.net/bugDescriptions.html#SBSC_USE_STRINGBUFFER_CONCATENATION)

- [Potentially dangerous use of non-short-circuit logic.](http://findbugs.sourceforge.net/bugDescriptions.html#NS_DANGEROUS_NON_SHORT_CIRCUIT)

- [Redundant nullcheck of value known to be non-null.](http://findbugs.sourceforge.net/bugDescriptions.html#RCN_REDUNDANT_NULLCHECK_OF_NONNULL_VALUE)

### fb-contrib
fb-contrib™ is an extra detector plugin to be used with the static bug finder FindBugs™.

- [LSYC_LOCAL_SYNCHRONIZED_COLLECTION.](http://fb-contrib.sourceforge.net/bugdescriptions.html)

- [PRMC_POSSIBLY_REDUNDANT_METHOD_CALLS.](http://fb-contrib.sourceforge.net/bugdescriptions.html)

- [EXS_EXCEPTION_SOFTENING_NO_CONSTRAINTS.](http://fb-contrib.sourceforge.net/bugdescriptions.html)

## Solve eclipse warnings
- Deprecation

- Type Generic

- Unused Code

- Type Safety

## The finally Block
The finally block always executes when the try block exits. This ensures that the finally block is executed even if an unexpected exception occurs. [more.](http://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html)

it is  good practice to free the resources using the finally block.

## Make iDempiere safer using saveEx instead of save
To make iDempiere safer is better to replace all unattended save calls with saveEx.

## Performance improvements
**Technical Info:** [IDEMPIERE-37](http://idempiere.atlassian.net/browse/IDEMPIERE-37) [IDEMPIERE-455](http://idempiere.atlassian.net/browse/IDEMPIERE-455) [IDEMPIERE-568](http://idempiere.atlassian.net/browse/IDEMPIERE-568)

**Performance:**
[IDEMPIERE-144](http://idempiere.atlassian.net/browse/IDEMPIERE-144)
[IDEMPIERE-145](http://idempiere.atlassian.net/browse/IDEMPIERE-145)
[IDEMPIERE-146](http://idempiere.atlassian.net/browse/IDEMPIERE-146)
[IDEMPIERE-174](http://idempiere.atlassian.net/browse/IDEMPIERE-174)
[IDEMPIERE-175](http://idempiere.atlassian.net/browse/IDEMPIERE-175)
[IDEMPIERE-308](http://idempiere.atlassian.net/browse/IDEMPIERE-308)
[IDEMPIERE-312](http://idempiere.atlassian.net/browse/IDEMPIERE-312)
[IDEMPIERE-314](http://idempiere.atlassian.net/browse/IDEMPIERE-314)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF1.0_Code_Best_Practices)_
