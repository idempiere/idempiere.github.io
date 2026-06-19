---
sidebar_position: 27
title: "Date Range Component"
sidebar_label: "Date Range Component"
description: "**Goal:** UX/Functional"
tags: [user-experience]
---
**Goal:** UX/Functional

**Developer:** cloudempiere, Takacs Peter, **Design**: Norbert Bede **Review**: Hengsin Low, CarlosRuiz

**Feature Ticket: [IDEMPIERE-5443](https://idempiere.atlassian.net/browse/IDEMPIERE-5443)**

**Improvement**

This feature introduces a new UI component that allows the user to select date ranges more effectively. The component can be used in various parts of the system. Mainly: windows, report and process, forms, info windows.- also custom modules as Dashboard Filter. (upcoming in next releases)

**Implementations in system modules**

**Implementation - Process/Report**
![Screencast for date range picker](pathname:///img/new-features/v10/Screencast_for_date_range_picker.gif)

_When Range is enabled, on process parameter, then new icon appear, allow select range with new range component_

**Implementation - Window Lookup Record/Advanced Tab**
![Window range](pathname:///img/new-features/v10/Window-range.gif)

_When use click on Date to on Lookup, or Select Advanced Search Between operator, allow select range with new range component_

**Implementation for Info Window**
![Infowindow daterange](pathname:///img/new-features/v10/Infowindow-daterange.gif)

_When 2 date fields added automatically Date Range detected, and Date Range Component appear._

**Date vs Date Range Reference (new)**

**Date Field:** on each Dates fields small "time" icons appear, which allow open **Date Range Component**  - when user select specific range, the dates are filled into date from/to fields.

**Date Range:**  replace date from to with human readable range eg. Before 10 november 2022 or Last 3 months etc. (TODO)

**Functionalities**

***Current** (default) - allow select full ranges of Day, Week, Month, Year*

![Date range current](pathname:///img/new-features/v10/Date-range-current.png)

_Allow select Current: Day, Week, Month, Quarter, Year_

**Previous** N / Day, Week, Month, Quarter, Year (range) - starts with previous period (excl. actual)

![Date range previous](pathname:///img/new-features/v10/Date-range-previous.png)

_Illustrates, how the user able to select **previous** period_

**Next** N / Day, Week, Month, Quarter, Year (range) - starts with previous period (excl. actual)

![Date range next](pathname:///img/new-features/v10/Date-range-next.png)

_Illustrates, how the user able to select future period_

**Before**  a specific date

![Date range before](pathname:///img/new-features/v10/Date-range-before.png)

_Illustrates, how the user able to select a period before selected date._

**After**  a specific date

![Date range after](pathname:///img/new-features/v10/Date-range-after.png)

_Illustrates, how the user able to select a period after selected date._

**ON**  exact date

![Date range on](pathname:///img/new-features/v10/Date-range-on.png)

_Illustrates, how the user able to select a period On selected date._
![Date range quickmode](pathname:///img/new-features/v10/Date-range-quickmode.png)

_Illustrates specific layout for selecting various periods quickly._

**Between**  two dates

![Date range between](pathname:///img/new-features/v10/Date-range-between.png)

_Illustrates how the user able to select a specific date ranges with 2 calendar pickers_

**Ago** - defines a time interval in the past, in the length of the specified unit

![DatePickerAgo](pathname:///img/new-features/v10/DatePickerAgo.png)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF10_Date_Range_Component)_
