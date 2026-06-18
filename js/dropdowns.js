(function () {
  'use strict';

  function closeAll() {
    document.querySelectorAll('.dropdown-panel.open').forEach((p) => p.classList.remove('open'));
    document.querySelectorAll('[data-dropdown-toggle][aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  }

  window.initDropdowns = function () {
    document.querySelectorAll('[data-dropdown-toggle]').forEach((btn) => {
      const panelId = btn.getAttribute('data-dropdown-toggle');
      const panel = document.getElementById(panelId);
      if (!panel) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains('open');
        closeAll();
        if (!isOpen) {
          panel.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.querySelectorAll('[data-sidebar-dropdown]').forEach((btn) => {
      const panelId = btn.getAttribute('data-sidebar-dropdown');
      const panel = document.getElementById(panelId);
      if (!panel) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const open = panel.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        const chevron = btn.querySelector('[data-icon="chevronDown"]');
        if (chevron) chevron.classList.toggle('rotate-180', open);
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) closeAll();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });
  };

  window.openSidebarDropdown = function (panelId) {
    const panel = document.getElementById(panelId);
    const btn = document.querySelector(`[data-sidebar-dropdown="${panelId}"]`);
    if (panel) panel.classList.add('open');
    if (btn) {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      const chevron = btn.querySelector('[data-icon="chevronDown"]');
      if (chevron) chevron.classList.add('rotate-180');
    }
  };
})();
