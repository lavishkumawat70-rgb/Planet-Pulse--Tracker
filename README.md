# PlanetPulse 🌍 — Carbon Footprint Tracker

**Hackathon ID: AZIS-337TDY**

A simple, elegant web app that lets you log daily activities and track your carbon footprint — with weekly targets, history, and smart nudges.

🔗 **Live Demo**: [https://YOUR_USERNAME.github.io/PlanetPulse/](https://YOUR_USERNAME.github.io/PlanetPulse/)

---

## Features

| # | Feature | Description |
|---|---------|-------------|
| F1 | **Log Activity** | Log car, bus, flight, electricity, veg/non-veg meals with quantity and date |
| F2 | **CO₂ Calculation** | Automatic computation using fixed emission factors (displayed per entry) |
| F3 | **Dashboard** | Weekly + all-time totals, per-category breakdown table |
| F4 | **Weekly Target** | Set a CO₂ target, track progress with visual bar, get gentle nudges |
| F5 | **History & Filter** | Browse all activities, filter by type or date |

## Decision Points

| DP | Scenario | Behavior |
|----|----------|----------|
| DP1 | Weekly target exceeded | Supportive nudge banner (non-blocking, non-shaming) |
| DP2 | Absurd input entered | Confirmation modal: "Edit" or "Log anyway" |
| DP3 | Week definition | Monday–Sunday, shows day count and % progress |

See [DECISIONS.md](DECISIONS.md) for detailed rationale.

## Tech Stack

- **Vanilla HTML5, CSS3, JavaScript (ES Modules)**
- **No frameworks, no build step, no backend**
- **localStorage** for all data persistence
- Responsive, mobile-first design

## CO₂ Emission Factors

| Activity | Factor | Unit |
|----------|--------|------|
| Car | 0.20 kg | per km |
| Bus | 0.08 kg | per km |
| Flight | 0.25 kg | per km |
| Electricity | 0.80 kg | per kWh |
| Veg Meal | 0.50 kg | per meal |
| Non-Veg Meal | 2.00 kg | per meal |

## Run Locally

1. Clone this repository
2. Open `index.html` in any modern browser
3. No installation or build step required

```bash
git clone https://github.com/YOUR_USERNAME/PlanetPulse.git
cd PlanetPulse
# Open index.html in your browser
```

## Project Structure

```
PlanetPulse/
├── index.html          # SPA shell
├── css/style.css       # Responsive earthy-green theme
├── js/
│   ├── app.js          # Tab routing & initialization
│   ├── constants.js    # CO₂ factors, thresholds, types
│   ├── storage.js      # localStorage CRUD
│   ├── calculator.js   # CO₂ computation + date utilities
│   ├── validation.js   # Absurd input detection (DP2)
│   ├── log.js          # Activity logging form (F1)
│   ├── dashboard.js    # Dashboard + target (F3, F4)
│   └── history.js      # History list + filters (F5)
├── README.md
└── DECISIONS.md
```

## Deployment

Deployed via GitHub Pages. Push to `main` branch and enable Pages in repository settings.

---

*Built with 💚 for a greener planet*
