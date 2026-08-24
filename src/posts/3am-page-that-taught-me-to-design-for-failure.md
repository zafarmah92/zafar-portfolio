---
title: The 3am Page That Taught Me to Design for Failure
date: 2026-01-12
category: Pipelines
description: A silent data-loss incident taught me that most pipeline failures don't look like failures at all — and changed how I monitor everything I build.
---
Two years into my career, I got paged at 3am because a pipeline had silently
dropped 40% of a client's events for six hours. Nothing had crashed. No alert
had fired. The job showed green in the orchestrator the entire time — it was
just quietly processing less data than it should have, and nobody had told the
system what "should have" meant.

That incident changed how I build pipelines. The lesson wasn't "add more
alerts." It was that most pipeline failures aren't failures at all from the
system's point of view — they're a job that completed successfully while doing
the wrong thing. If your monitoring only watches for crashes, you're blind to
the failure mode that actually costs you money.

### What I changed

I started treating row counts, null rates, and schema drift as first-class
signals, not afterthoughts. A simple volume check — is today's row count within
a reasonable band of the trailing 7-day average — would have caught that
incident in the first hour instead of the seventh.

```python
def check_volume_anomaly(today_count, historical_avg, threshold=0.3):
    deviation = abs(today_count - historical_avg) / historical_avg
    if deviation > threshold:
        alert(f"Volume anomaly: {deviation:.0%} deviation from baseline")
    return deviation <= threshold
```

This is a deliberately simple check — no ML, no anomaly detection library,
just a threshold on a rolling average. It caught more real incidents in its
first month than any tool I'd used before, because it was easy enough to
actually reason about at 3am.

### The bigger principle

Design pipelines assuming they'll fail in ways you haven't thought of yet.
Make the failure loud, make it specific, and make sure "success" in your
monitoring means the same thing as success for the business — not just "the
job didn't crash."

<p class="placeholder-hint">[Replace this post with a real incident or lesson from your own experience — specifics make it far more credible than general advice.]</p>
