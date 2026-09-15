import { CO2_FACTORS } from './constants.js';

/**
 * Compute CO₂ in kg for a given activity type and quantity.
 * Returns value rounded to 2 decimal places.
 */
export function computeCO2(type, quantity) {
  const factor = CO2_FACTORS[type];
  if (factor === undefined) {
    throw new Error(`Unknown activity type: ${type}`);
  }
  return Math.round(quantity * factor * 100) / 100;
}

/**
 * Get the Monday 00:00 (local time) of the week containing `date`.
 * DP3: Week starts Monday.
 */
export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();            // 0 = Sun, 1 = Mon, …, 6 = Sat
  const diff = day === 0 ? 6 : day - 1;  // days since Monday
  d.setDate(d.getDate() - diff);
  return d;
}

/**
 * Get the Sunday 23:59:59.999 (local time) of the week containing `date`.
 */
export function getWeekEnd(date = new Date()) {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * Return the 1-based day number within the current week (Mon=1 … Sun=7).
 */
export function getDayOfWeek(date = new Date()) {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

/**
 * Format a date as YYYY-MM-DD (for input[type=date]).
 */
export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Format a date for display (e.g., "15 Sep 2026").
 */
export function formatDateDisplay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
