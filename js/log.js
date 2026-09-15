import { ACTIVITY_TYPES, UNITS } from './constants.js';
import { computeCO2, formatDate } from './calculator.js';
import { saveActivity } from './storage.js';
import { isAbsurdInput, showAbsurdConfirm } from './validation.js';
import { refreshDashboard } from './dashboard.js';
import { refreshHistory } from './history.js';
import { showToast } from './toast.js';

/**
 * F1: Initialize the Log Activity form.
 */
export function initLogForm() {
  const form = document.getElementById('log-form');
  const typeSelect = document.getElementById('log-type');
  const qtyInput = document.getElementById('log-quantity');
  const dateInput = document.getElementById('log-date');
  const unitLabel = document.getElementById('log-unit-label');

  // Populate type dropdown
  typeSelect.innerHTML = '';
  ACTIVITY_TYPES.forEach(({ key, label }) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    typeSelect.appendChild(opt);
  });

  // Set default date to today
  dateInput.value = formatDate(new Date());

  // Update unit label when type changes
  typeSelect.addEventListener('change', () => {
    unitLabel.textContent = UNITS[typeSelect.value] || '';
  });
  unitLabel.textContent = UNITS[typeSelect.value] || '';

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = typeSelect.value;
    const quantity = parseFloat(qtyInput.value);
    const date = dateInput.value;

    // Basic validation
    if (!type || isNaN(quantity) || quantity <= 0 || !date) {
      showToast('Please fill in all fields with valid values.', 'error');
      return;
    }

    // DP2: Check for absurd input
    if (isAbsurdInput(type, quantity)) {
      const confirmed = await showAbsurdConfirm(type, quantity);
      if (!confirmed) return; // User chose "Edit"
    }

    // F2: Compute CO₂
    const co2 = computeCO2(type, quantity);

    // Build activity object
    const activity = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      type,
      quantity,
      co2,
      date,
    };

    // Save
    saveActivity(activity);

    // Confirmation (F1 requirement)
    const unit = UNITS[type];
    showToast(`Logged ${quantity} ${unit} of ${type}  →  ${co2} kg CO₂`, 'success');

    // Reset form
    qtyInput.value = '';
    dateInput.value = formatDate(new Date());

    // Refresh other views
    refreshDashboard();
    refreshHistory();
  });
}
