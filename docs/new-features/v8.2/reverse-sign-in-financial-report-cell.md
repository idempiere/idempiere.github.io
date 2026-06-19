---
sidebar_position: 11
title: "Reverse Sign In Financial Report Cell"
sidebar_label: "Reverse Sign In Financial Report Cell"
description: "**Developer:** Paul Bowden, Deepak Pansheriya"
tags: [functional]
---
**Goal:** Functional

**Developer:** Paul Bowden, Deepak Pansheriya

**Feature Ticket:** [IDEMPIERE-4065](http://idempiere.atlassian.net/browse/IDEMPIERE-4065)

**Sponsor:** [[Adaxa](http://www.adaxa.com/), Cara, [chuck boecking](https://www.chuckboecking.com/), [Logilite Technologies LLP](http://www.logilite.com)]

**Description:**

Originally developed for Adempiere by Adaxa (Paul Bowden) and Logilite.  Now ported to Idempiere by Logilite Technologies.

**Note:** This features required attention for using it as it covers special scenarios expected by accountant. Before using this feature understand it well and also test financial reports carefully.

**Warning:** Reversal of sign will not be considered on summing up report lines. This is known features and please do not raise bug for same. You can refer ticket [IDEMPIERE-4065](http://idempiere.atlassian.net/browse/IDEMPIERE-4065) for discussion.

For understanding this feature, Lets take look at financial report configuration for P&L as printed below. Here we are showing variance of budget vs actual.

![ReverseSignNotApplied](pathname:///img/new-features/v8.2/ReverseSignNotApplied.png)

On above reports we have column Var Mth which is configured as calculated like Budget - Actual. In report revenue total has Var Mth 22000-23000 = -1000 which is correctly calculated as formula. Similarly cogs  6900 - 8040 = -1140 which is also calculated correctly as formula.

But many times, It is desirable to show favorable variance as positive. So if we consider revenue, Our favorable variance should be Actual - Budget. This means when actual revenue is higher then budgeted revenue, it is favorable to business. So in our report configuration, we want to show Var Mth for revenue total to be 1000 instead of -1000. Now if we looks at COGS, favorable variance should be budget - Actual. This mean if Actual expenses are lesser then budget, it is favorable. in our example report, we have more COGS then budget, so showing negative is desirable.

To print favorable number positive on Var Mth fore revenue line, we needs to change formula of Var Mth column for revenue line to be Actual - Budget but which is not possible. As same formula applied to all report line in columns it is not possible. This features help to achieve same by switching sign on particular cell (Intersection of columns and report line)

Whichever report column, you want to add support to switch sign, you should mark "**Allow Opposite Sign**" flag as shown in below image.

![ReverseSignAllow](pathname:///img/new-features/v8.2/ReverseSignAllow.png)

Above configuration say that on Var Mth report column, Opposite sign should allow. But it will not change sign until report line has marked "**Show Opposite Sign**"

![ReverseSignShow](pathname:///img/new-features/v8.2/ReverseSignShow.png)

In above image, we have marked flag "Show Opposite Sign" which say that revert sign on cell where this line and column having "Allow Opposite Sign" are intersects. After making above configuration, the sign of Var Mth for Revenue lines will be changed from negative to positive. Final report will looks like below. Please note that column Var YTD also has "Allow Opposite Sign" flag marked.

![ReverseSignApplied](pathname:///img/new-features/v8.2/ReverseSignApplied.png)

If you take look at Var Mth for revenue line, it say 1000 as variance of actual vs budget is favorable for business. While cogs still showing negative sign as we have higher COGS compare to budget which is not favorable.

If you take look on Margin total for Actual and Budgeted month, you will find that it is Revenue Total - COGS Total. And reason is justifiable that we have configured Margin total as Revenue Total - COGS Total as below.

![ReverseSignMarginTotal](pathname:///img/new-features/v8.2/ReverseSignMarginTotal.png)

But if you take look at Var Mth on Margin total, it will not match the Revenue Total - COGS Total but still value shows on Margin total is correct. You may noticed that **there is no impact of sign changes on Calculated Row.** it is important that we do not use sign switch on segment line which are similar in nature. Also advisable to use Allow Opposite Sign on calculated columns only.

**Technical Info:** [IDEMPIERE-4065](https://idempiere.atlassian.net/browse/IDEMPIERE-4065)

---

_Source: [Wiki](https://wiki.idempiere.org/en/NF8.2_Reverse_Sign_In_Financial_Report_Cell)_
