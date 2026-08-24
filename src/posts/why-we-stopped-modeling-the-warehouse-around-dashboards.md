---
title: Why We Stopped Modeling the Warehouse Around Dashboards
date: 2026-02-03
category: Warehousing
description: Six different definitions of "active user" scattered across dashboard-specific tables taught us to model the business once, not once per dashboard.
---
For the first year of our warehouse's life, every table existed because a
dashboard needed it. That sounds reasonable until you realize what it actually
produces: dozens of narrow, purpose-built tables that all recompute the same
logic slightly differently, because each was built to answer one question fast
rather than to represent the business correctly.

The turning point was realizing we had six different definitions of "active
user" scattered across dashboard-specific tables, and none of them agreed with
each other during a board meeting.

### The shift: model the business, not the dashboard

We rebuilt around a dimensional model — fact tables for events and
transactions, dimension tables for entities like users and products — and let
dashboards query views on top of that shared foundation instead of owning their
own tables.

```sql
-- one shared definition, many consumers
CREATE VIEW mart.active_users AS
SELECT user_id, MAX(event_date) AS last_active
FROM fct_events
GROUP BY user_id
HAVING MAX(event_date) >= CURRENT_DATE - 30;
```

This didn't just fix the "active user" disagreement — it cut the number of
tables our team had to maintain by more than half, because most dashboards
turned out to need the same handful of marts, not bespoke tables.

### What I'd tell a team starting today

Resist building a table for a single dashboard request. Ask what the
underlying business concept is, model that once, and let every dashboard,
report, and ML feature pull from the same source of truth. It's slower on day
one and much faster on day two hundred.

<p class="placeholder-hint">[Swap in a real before/after from your own warehouse work — specific numbers make this land.]</p>
