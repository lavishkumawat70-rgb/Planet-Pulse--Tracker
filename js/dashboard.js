import { ACTIVITY_TYPES, UNITS } from './constants.js';
import { getActivities, getWeeklyTarget, setWeeklyTarget } from './storage.js';
import { getWeekStart, getWeekEnd, getDayOfWeek, formatDate } from './calculator.js';
import { showToast } from './toast.js';

/**
 * F3 + F4: Render the dashboard — totals, breakdown, weekly target progress, DP1 nudge, DP3 mid-week info.
 */
export function refreshDashboard() {
  const activities = getActivities();
  const target = getWeeklyTarget();
  const now = new Date();
  const weekStart = getWeekStart(now);
  const weekEnd = getWeekEnd(now);

  // ── This-week activities ──
  const weekActivities = activities.filter(a => {
    const d = new Date(a.date + 'T00:00:00');
    return d >= weekStart && d <= weekEnd;
  });

  const weekTotal = weekActivities.reduce((s, a) => s + a.co2, 0);
  const allTimeTotal = activities.reduce((s, a) => s + a.co2, 0);

  // ── Render totals ──
  document.getElementById('dash-week-total').textContent = weekTotal.toFixed(2);
  document.getElementById('dash-alltime-total').textContent = allTimeTotal.toFixed(2);

  // ── DP3: Mid-week info ──
  const dayNum = getDayOfWeek(now);
  const monLabel = weekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const sunLabel = weekEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  document.getElementById('dash-week-range').textContent = `Week: ${monLabel} – ${sunLabel}`;
  document.getElementById('dash-day-of-week').textContent = `Day ${dayNum} of 7`;

  // ── F4: Weekly target progress ──
  const targetInput = document.getElementById('target-input');

  if (target !== null && target > 0) {
    targetInput.value = target;
    const pctFull = (weekTotal / target) * 100;

    document.getElementById('dash-target-used').textContent =
      `${weekTotal.toFixed(2)} kg used of ${target} kg`;
    document.getElementById('dash-target-pct').textContent =
      `${pctFull.toFixed(1)}% of target used`;

    const bar = document.getElementById('dash-target-bar');
    bar.style.width = Math.min(pctFull, 100) + '%';
    bar.className = 'progress-fill' +
      (pctFull >= 100 ? ' exceeded' : pctFull >= 75 ? ' warning' : '');

    // DP1: Nudge banner
    const nudge = document.getElementById('dash-nudge');
    if (weekTotal >= target) {
      nudge.classList.add('active');
      nudge.querySelector('.nudge-text').textContent =
        `You've reached your weekly target of ${target} kg CO₂. ` +
        `That's okay — small steps matter! Consider taking the bus or enjoying a veg meal tomorrow 🌱`;
    } else {
      nudge.classList.remove('active');
    }
  } else {
    document.getElementById('dash-target-used').textContent = 'No target set';
    document.getElementById('dash-target-pct').textContent = '';
    const bar = document.getElementById('dash-target-bar');
    bar.style.width = '0%';
    bar.className = 'progress-fill';
    document.getElementById('dash-nudge').classList.remove('active');
  }

  // ── F3: Per-category breakdown table ──
  const tbody = document.getElementById('dash-breakdown-body');
  tbody.innerHTML = '';

  const catTotals = {};
  ACTIVITY_TYPES.forEach(({ key }) => {
    catTotals[key] = { qty: 0, co2: 0 };
  });

  weekActivities.forEach(a => {
    if (catTotals[a.type]) {
      catTotals[a.type].qty += a.quantity;
      catTotals[a.type].co2 += a.co2;
    }
  });

  ACTIVITY_TYPES.forEach(({ key, icon }) => {
    const data = catTotals[key];
    if (data.co2 === 0 && data.qty === 0) return;

    const tr = document.createElement('tr');
    const pct = weekTotal > 0 ? ((data.co2 / weekTotal) * 100).toFixed(1) : '0.0';
    tr.innerHTML = `
      <td>${icon} ${key}</td>
      <td>${data.qty.toFixed(1)} ${UNITS[key]}</td>
      <td>${data.co2.toFixed(2)} kg</td>
      <td>${pct}%</td>
    `;
    tbody.appendChild(tr);
  });

  if (weekActivities.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="4" class="empty-row">No activities logged this week</td>';
    tbody.appendChild(tr);
  }
}

/**
 * F4: Initialize weekly target input handler.
 */
export function initTargetInput() {
  const input = document.getElementById('target-input');
  const btn = document.getElementById('target-save-btn');

  // Load existing target
  const existing = getWeeklyTarget();
  if (existing !== null) {
    input.value = existing;
  }

  btn.addEventListener('click', () => {
    const val = parseFloat(input.value);
    if (isNaN(val) || val <= 0) {
      showToast('Enter a valid target (> 0 kg).', 'error');
      return;
    }
    setWeeklyTarget(val);
    showToast(`Weekly target set to ${val} kg CO₂`, 'success');
    refreshDashboard();
  });
}
