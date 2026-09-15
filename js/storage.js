import { STORAGE_KEYS } from './constants.js';

// ── Activities ──

/** Get all stored activities */
export function getActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.activities);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save a single activity (appends to existing list) */
export function saveActivity(activity) {
  const list = getActivities();
  list.push(activity);
  localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(list));
}

/** Delete an activity by id */
export function deleteActivity(id) {
  const list = getActivities().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(list));
}

// ── Weekly Target ──

/** Get the weekly CO₂ target in kg (or null if not set) */
export function getWeeklyTarget() {
  const raw = localStorage.getItem(STORAGE_KEYS.weeklyTarget);
  if (raw === null) return null;
  const val = parseFloat(raw);
  return isNaN(val) ? null : val;
}

/** Set the weekly CO₂ target in kg */
export function setWeeklyTarget(kg) {
  localStorage.setItem(STORAGE_KEYS.weeklyTarget, String(kg));
}
