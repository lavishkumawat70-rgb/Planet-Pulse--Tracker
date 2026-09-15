// ── CO₂ emission factors (kg CO₂ per unit) ──
export const CO2_FACTORS = {
  car:           0.20,   // kg/km
  bus:           0.08,   // kg/km
  flight:        0.25,   // kg/km
  electricity:   0.80,   // kg/kWh
  'veg meal':    0.50,   // kg/meal
  'non-veg meal': 2.00,  // kg/meal
};

// ── Human-readable unit labels ──
export const UNITS = {
  car:           'km',
  bus:           'km',
  flight:        'km',
  electricity:   'kWh',
  'veg meal':    'meals',
  'non-veg meal': 'meals',
};

// ── Absurd-input thresholds per type (DP2) ──
// Values chosen to catch likely typos while allowing legitimate edge cases
export const ABSURD_THRESHOLDS = {
  car:           2000,    // 2,000 km ≈ Delhi → Mumbai round trip
  bus:           1500,    // 1,500 km ≈ very long coach journey
  flight:        20000,   // 20,000 km ≈ near half the Earth's circumference
  electricity:   500,     // 500 kWh ≈ heavy industrial use in a single day
  'veg meal':    15,      // 15 meals in one day
  'non-veg meal': 15,     // 15 meals in one day
};

// ── Activity type display names & icons ──
export const ACTIVITY_TYPES = [
  { key: 'car',           label: '🚗  Car',            icon: '🚗' },
  { key: 'bus',           label: '🚌  Bus',            icon: '🚌' },
  { key: 'flight',        label: '✈️  Flight',          icon: '✈️' },
  { key: 'electricity',   label: '⚡  Electricity',     icon: '⚡' },
  { key: 'veg meal',      label: '🥗  Veg Meal',       icon: '🥗' },
  { key: 'non-veg meal',  label: '🍖  Non-Veg Meal',   icon: '🍖' },
];

// ── localStorage keys ──
export const STORAGE_KEYS = {
  activities:    'pp_activities',
  weeklyTarget:  'pp_weeklyTargetKg',
};
