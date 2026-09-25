---
sidebar_label: "Functional notes"
sidebar_position: 3
description: "Functional migration notes for upgrading to iDempiere 13."
tags: [features, migration, installation, development, developer-documentation, reference]
---

# Migration notes - iDempiere 13 (functional)

## AD_Sequence_No.CalendarYearMonth renamed to SequenceKey

With ticket [IDEMPIERE-6575](https://idempiere.atlassian.net/browse/IDEMPIERE-6575), the `AD_Sequence_No.CalendarYearMonth` column was renamed to `SequenceKey`.

:::warning
The `getCalendarYearMonth` and `setCalendarYearMonth` methods are replaced by `getSequenceKey` and `setSequenceKey`.
:::
