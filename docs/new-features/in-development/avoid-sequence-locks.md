# Avoid Sequence Locks in Document Numbers

> Introduces UUID-based document sequences and Allow Gaps setting to eliminate sequence lock contention under concurrent document creation.

:::warning Not Yet in Stable Release
This feature is not yet part of a stable iDempiere release and may change.
:::

**Goal:** Technical

**Developer:** [Carlos Ruiz](https://github.com/CarlosRuiz-globalqss) ([BX Service](https://www.bx-service.com))

**Feature Ticket:** [IDEMPIERE-7120](https://idempiere.atlassian.net/browse/IDEMPIERE-7120)

## Avoiding Sequence Locks Under Concurrent Document Creation

### The Problem: Sequence Lock Contention

When many documents are created concurrently - for example during load testing or high-volume integrations - iDempiere's numeric document sequences become a bottleneck. Each document number allocation locks the `AD_Sequence` row, and under heavy concurrency, threads queue up waiting for the lock. After the configured timeout (`MSEQUENCE_GETNEXT_TIMEOUT` SysConfig, default 30 seconds) is exceeded, causing `GenerateDocumentNoTimeOut` errors and failed document creation.

### Solution 1: Allow Gaps for Numeric Document Sequences

For numeric document sequences where lock contention is a concern but UUIDs are not desired, a new **Allow Gaps** setting is available.

- When a numeric document sequence allows gaps, the next number allocation uses a **standalone/committed transaction** instead of the caller's transaction. This means the allocated number is preserved even if the caller rolls back, avoiding the need to hold the lock for the entire document creation process.

### Solution 2: UUID Document Sequences

This feature introduces a **UUID-based sequence type** for document numbers. When a sequence is configured as UUID, it generates a **UUIDv7** value - a time-ordered, sortable UUID - without needing to lock the sequence row at all. This eliminates the contention point entirely.

Existing numeric sequences continue to work as before. UUID sequences are opt-in per document type.

UUID sequences have also better performance as they don't require the UPDATE to the AD_Sequence table.

### Setting Up a low-contention Document Sequence

1. **Open the Sequence window** and select the sequence used by your document type, or create a new one.
2. **Enable the UUID option** by setting the `IsUUIDSeq` flag to **Yes**.
3. Alternatively **Enable the Allow Gaps** by setting the `IsAllowSequenceGaps` flag to **Yes**.
4. **Configure prefix and suffix** as needed - same as numeric sequences, the UUID value is placed between the prefix and suffix.

![AvoidLocksInDocumentSequences](pathname:///img/new-features/v14/01_AvoidLocksInDocumentSequences.png)

### Document Number Field Expansion

To accommodate the longer UUID values, all `DocumentNo` columns and related process parameters in the core iDempiere tables have been widened from **30 to 255 characters**. This includes fields such as:

- `I_GLJournal.BatchDocumentNo`
- `I_GLJournal.JournalDocumentNo`
- `C_PaySelection.Name`
- `C_Payment.CheckNo`
- `C_Order.POReference`
- `C_Invoice.POReference`
- `C_BPartner.POReference`

### Backward Compatibility

This feature is fully backward compatible:

- Existing numeric sequences continue to work unchanged.
- UUID sequences are opt-in; no existing behavior is altered unless `IsUUIDSeq` is explicitly enabled.
- Document number field expansion (30 → 255 characters) is transparent to existing data.
