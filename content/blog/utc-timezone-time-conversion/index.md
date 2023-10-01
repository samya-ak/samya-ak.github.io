---
title: Convert UTC time to time in a timezone
date: "2023-10-01"
description: "How to convert time '17:30:00+00' to time in a timezone?"
subject: ["go"]
---

Let’s say you’ve stored utc time in db with a format like “17:30:00+00”. You want to convert this time in utc to time in a certain timezone.

```go
	timeonly := "17:30:00+00"
	layout := "15:04:05-07"
	tz, _ := time.LoadLocation("America/Los_Angeles")

	t, _ := time.Parse(layout, timeonly)
	fmt.Println("t in tz", t.In(tz))
```

From above, you’d expect to get the time “10:30:00” assuming that currently it’s daylight saving time (GMT-7). But, what we get instead is: ` 0000-01-01 09:37:02 -0752 LMT`

The reason you get time in LMT instead of PDT is because the timezone depends on the date. What do I mean by that?

If you look at the past, the way we use time zones has gradually evolved. Adoption of timezone started in 1851, before that Local Mean Time was used (LMT). Also, Many countries and regions have implemented DST at various points in history, and the start and end dates for DST have often changed. So, it is crucial that we include dates when doing timezone conversion. Since we didn’t explicitly provide a date before parsing the date string, it defaulted to 0000-01-01. The Go library might not have accurate historical data for such an ancient date. Therefore, it fell back to using Local Mean Time (LMT).

Following snippet might be the solution you’re looking for:

```go
    timeonly := "17:30:00+00"
    timeanddate := fmt.Sprintf("%s %s", time.Now().Format("2006-01-02"), timeonly)
    layout := "2006-01-02 15:04:05-07"

    tz, _ := time.LoadLocation("America/Los_Angeles")

    t, _ := time.Parse(layout, timeanddate)
    fmt.Println("t in tz", t.In(tz))
```

Which gives something like `2023-10-01 10:30:00 -0700 PDT`. Now, you can format this time struct to get only time, or replace date to your desired date to do date time comparisons.
