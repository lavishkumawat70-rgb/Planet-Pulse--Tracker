import { ACTIVITY_TYPES, UNITS } from './constants.js';
import { getActivities, deleteActivity } from './storage.js';
import { formatDateDisplay } from './calculator.js';
import { refreshDashboard } from './dashboard.js';
import { showToast } from './toast.js';

let currentTypeFilter = 'all';
let currentDateFilter = '';

/**
 * F5: Initialize the history view with filter controls.
 */
export function initHistory() {
  const typeFilter = document.getElementById('filter-type');
  const dateFilter = document.getElementById('filter-date');
  const clearBtn = document.getElementById('filter-clear-btn');

  // Populate type filter
  typeFilter.innerHTML = '<option value="all">All Types</option>';
  ACTIVITY_TYPES.forEach(({ key, label }) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    typeFilter.appendChild(opt);
  });

  // Filter event listeners — apply live
  typeFilter.addEventListener('change', () => {
    currentTypeFilter = typeFilter.value;
    refreshHistory();
  });

  dateFilter.addEventListener('change', () => {
    currentDateFilter = dateFilter.value;
    refreshHistory();
  });

  clearBtn.addEventListener('click', () => {
    typeFilter.value = 'all';
    dateFilter.value = '';
    currentTypeFilter = 'all';
    currentDateFilter = '';
    refreshHistory();
  });

  refreshHistory();
}

/**
 * F5: Render the filtered activity list.
 */
export function refreshHistory() {
  let activities = getActivities();

  // Apply type filter
  if (currentTypeFilter !== 'all') {
    activities = activities.filter(a => a.type === currentTypeFilter);
  }

  // Apply date filter
  if (currentDateFilter) {
    activities = activities.filter(a => a.date === currentDateFilter);
  }

  // Sort newest first
  activities.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

  const tbody = document.getElementById('history-body');
  tbody.innerHTML = '';

  const countEl = document.getElementById('history-count');
  countEl.textContent = `${activities.length} activit${activities.length === 1 ? 'y' : 'ies'}`;

  if (activities.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="5" class="empty-row">No activities match your filters</td>';
    tbody.appendChild(tr);
    return;
  }

  activities.forEach(a => {
    const tr = document.createElement('tr');
    const icon = ACTIVITY_TYPES.find(t => t.key === a.type)?.icon || '';
    tr.innerHTML = `
      <td>${formatDateDisplay(a.date)}</td>
      <td>${icon} ${a.type}</td>
      <td>${a.quantity} ${UNITS[a.type] || ''}</td>
      <td>${a.co2.toFixed(2)} kg</td>
      <td><button class="btn-delete" data-id="${a.id}" title="Delete">✕</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Attach delete handlers
  tbody.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      deleteActivity(id);
      showToast('Activity deleted', 'success');
      refreshHistory();
      refreshDashboard();
    });
  });
}
