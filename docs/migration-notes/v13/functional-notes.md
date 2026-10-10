# Migration notes - iDempiere 13 (functional)

> Functional migration notes for upgrading to iDempiere 13.

## AD_Sequence_No.CalendarYearMonth renamed to SequenceKey

With ticket [IDEMPIERE-6575](https://idempiere.atlassian.net/browse/IDEMPIERE-6575), the `AD_Sequence_No.CalendarYearMonth` column was renamed to `SequenceKey`.

:::warning
The `getCalendarYearMonth` and `setCalendarYearMonth` methods are replaced by `getSequenceKey` and `setSequenceKey`.
:::
