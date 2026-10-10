# Add Always Updatable Logic Override Flag

> **Developer:** Deepak Pansheriya

**Goal:** Technical

**Feature** **Ticket:** [IDEMPIERE-5349](https://idempiere.atlassian.net/browse/IDEMPIERE-5349)

### Description
When defining a column you can define if a value is updatable or always updatable (when you want to update it even if the record is marked as processed).

But there are some cases where you need to make a field updatable on processed records based on a condition.

For example, the following configuration allows just the SuperUser user to be able to change the currency field on processed records in Test table:

![01 AlwaysUpdatableLogic.png](pathname:///img/new-features/v10/01_AlwaysUpdatableLogic.png.png)
