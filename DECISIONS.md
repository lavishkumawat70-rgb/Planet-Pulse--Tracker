# DECISIONS.md — PlanetPulse Design Decisions

## DP1: The Nudge (When Weekly Target Is Crossed)

**Behavior**: When the user's weekly CO₂ exceeds their target, a warm, supportive banner appears with a suggestion like "Consider taking the bus or enjoying a veg meal tomorrow 🌱". The banner does not block further logging.

**Rationale**: Research in behavioral psychology shows that shame and guilt are counterproductive for sustained behavior change — they lead to disengagement rather than improvement. A supportive nudge respects the user's autonomy, acknowledges their effort in tracking at all, and offers an actionable, positive suggestion. Logging is never blocked because even "bad" data is valuable for self-awareness.

---

## DP2: Absurd Input (e.g., 500,000 km Car Trip)

**Behavior**: If a quantity exceeds a per-type threshold (e.g., > 2,000 km for car, > 20,000 km for flight), a confirmation modal appears saying "This seems unusually high — confirm?" with two buttons: "Edit" (returns to form) and "Log anyway" (saves the entry).

**Rationale**: Silently rejecting input would be confusing and break user trust — the user wouldn't know why their data disappeared. Hard-blocking would prevent legitimate edge cases (e.g., a 15,000 km intercontinental flight). The confirm-or-edit pattern catches accidental typos (the most common cause) while still allowing power users to log unusual but real activities. Thresholds are set generously to minimize false positives.

---

## DP3: The Week (Definition and Mid-Week Progress)

**Behavior**: The week starts on Monday at 00:00 local time and ends on Sunday at 23:59. The dashboard displays "Week: [Mon date] – [Sun date]", "Day N of 7", and the percentage of the weekly CO₂ target used.

**Rationale**: Monday start aligns with ISO 8601 (the international standard) and matches the convention used by most work/school calendars globally, making it intuitive for the majority of users. Showing the day number and percentage gives users mid-week awareness of their pacing without requiring complex charts — a simple glance tells them if they're on track or need to adjust remaining days.
