import { ABSURD_THRESHOLDS, UNITS } from './constants.js';

/**
 * Check if a quantity exceeds the absurd threshold for its type (DP2).
 * Returns true if the value is absurd.
 */
export function isAbsurdInput(type, quantity) {
  const threshold = ABSURD_THRESHOLDS[type];
  return threshold !== undefined && quantity > threshold;
}

/**
 * Show the absurd-input confirmation modal (DP2).
 * Returns a Promise that resolves to true ("Log anyway") or false ("Edit").
 */
export function showAbsurdConfirm(type, quantity) {
  return new Promise(resolve => {
    const unit = UNITS[type] || 'units';
    const overlay = document.getElementById('absurd-modal-overlay');
    const msg = document.getElementById('absurd-modal-message');
    const btnEdit = document.getElementById('absurd-btn-edit');
    const btnLog = document.getElementById('absurd-btn-log');

    msg.textContent = `You entered ${quantity.toLocaleString()} ${unit} for "${type}". This seems unusually high — confirm?`;
    overlay.classList.add('active');

    function cleanup() {
      overlay.classList.remove('active');
      btnEdit.removeEventListener('click', onEdit);
      btnLog.removeEventListener('click', onLog);
    }

    function onEdit() { cleanup(); resolve(false); }
    function onLog()  { cleanup(); resolve(true);  }

    btnEdit.addEventListener('click', onEdit);
    btnLog.addEventListener('click', onLog);
  });
}
