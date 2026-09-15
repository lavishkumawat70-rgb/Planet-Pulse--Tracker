import { initLogForm } from './log.js';
import { refreshDashboard, initTargetInput } from './dashboard.js';
import { initHistory, refreshHistory } from './history.js';

// Re-export showToast for any module that might need it from app.js
export { showToast } from './toast.js';

// ── Tab navigation ──

let historyInitialized = false;

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update active tab button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show target section, hide others
      sections.forEach(s => {
        s.classList.toggle('active', s.id === target);
      });

      // Refresh data when switching to dashboard or history
      if (target === 'section-dashboard') {
        refreshDashboard();
      }
      if (target === 'section-history') {
        if (!historyInitialized) {
          initHistory();
          historyInitialized = true;
        } else {
          refreshHistory();
        }
      }
    });
  });
}

// ── App initialization ──

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLogForm();
  initTargetInput();
  refreshDashboard();
});
