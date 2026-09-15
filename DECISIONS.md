# DECISIONS.md — PlanetPulse

## DP1: The nudge
**Behavior:** If the weekly CO₂ total exceeds the target, the app shows a friendly banner with a small “next step” suggestion and it never blocks logging.  
**Why:** Shame/penalties often make people stop tracking, while supportive nudges help habit-building. The goal is consistency and improvement over time, not punishment.

## DP2: Absurd input
**Behavior:** When an entry looks unusually large for its type, the app asks for confirmation: edit the value or log anyway.  
**Why:** This catches common typos (extra zeros) without silently rejecting user data. We avoid hard blocks because rare edge cases can be real and the user should stay in control.

## DP3: The week
**Behavior:** The week is Monday 00:00 to Sunday (local time). The app shows the week range (Mon–Sun) and mid-week progress like “Day N of 7” and target usage.  
**Why:** Monday-start matches how many people plan their week and makes pacing easy to understand at a glance without complex charts.
