---
title: "Six Years In: What Actually Made Me a Better Data Engineer"
date: 2026-03-18
category: Career
description: It wasn't a new framework. Three unglamorous habits — reading query plans, owning an incident end-to-end, and learning to say no to a table — compounded more than any tool did.
---
It wasn't a new tool. Every year there's a new framework promising to fix
data engineering, and most of them are incremental at best. The things that
actually made me better were unglamorous.

### 1. Reading query plans, not just writing queries

Understanding why a query is slow — not just that it is — changed how I
write SQL from the first line. I stopped writing queries that "worked" and
started writing queries whose cost I could predict before running them.

### 2. Owning an incident end-to-end at least once

Being the person who has to explain to stakeholders why the numbers were
wrong for three days teaches you more about pipeline design than any course.
It forces you to think about detection, not just correctness.

### 3. Learning to say no to a table

Early on I said yes to every request for a new table or pipeline. Later I
learned that maintaining fewer, well-modeled datasets beats having many
narrow ones — every table you create is a table you now have to keep correct
forever.

```sql
-- before adding a new table, ask:
-- 1. Does an existing table already answer this?
-- 2. Who owns keeping this correct in a year?
-- 3. What breaks if this pipeline goes down?
```

None of this is exciting advice, but six years in, it's the stuff that
actually compounds.

<p class="placeholder-hint">[Replace with your own three lessons — this structure works well for any "N years in" post.]</p>
