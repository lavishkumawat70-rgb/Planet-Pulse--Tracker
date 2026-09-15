# DECISIONS.md — PlanetPulse

## DP1: The nudge
If you go over your weekly CO₂ target, the app shows a friendly banner with a small “next step” suggestion (like trying the bus once, or choosing a veg meal) and it never blocks logging. I avoided shame/penalties because they usually make people quit tracking. The goal is to help the user stay consistent and improve over time, not to punish them.

## DP2: Absurd input
When an entry looks unrealistically large for its type, the app asks: “This seems unusually high — do you want to edit or log anyway?” This prevents accidental typos (extra zeros) without silently rejecting the user. I didn’t hard-block because rare edge cases can be real, and the user should stay in control of their data.

## DP3: The week
The app treats the week as Monday 00:00 to Sunday (local time). It shows the week range (Mon–Sun) and simple mid-week progress like “Day N of 7” plus how much of the target is used. I chose this because it matches how most people plan their week and makes progress easy to understand at a glance.
