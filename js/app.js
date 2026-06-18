/* پنل ادمین — منطق اصلی */
(function () {
  'use strict';

  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  function toPersianNum(n) {
    return String(n).replace(/\d/g, (d) => faDigits[+d]);
  }

  const html = document.documentElement;
  let revenueChart;
  let categoryChart;
  let trafficChart;

  function isDark() {
    return html.classList.contains('dark');
  }

  function setTheme(dark) {
    html.classList.toggle('dark', !!dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    updateChartsTheme();
  }

  function toggleTheme() {
    setTheme(!isDark());
  }

  function chartColors() {
    const dark = isDark();
    return {
      text: dark ? '#94a3b8' : '#64748b',
      grid: dark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.2)',
      tooltipBg: dark ? '#1e293b' : '#ffffff',
      tooltipBorder: dark ? '#334155' : '#e2e8f0',
      primary: '#6366f1',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
    };
  }

  function applyChartTheme(chart, c) {
    if (!chart) return;
    const darkMode = isDark();
    if (chart === revenueChart && chart.data.datasets[0]) {
      chart.data.datasets[0].pointBackgroundColor = darkMode ? '#1e293b' : '#ffffff';
    }
    if (chart.options.plugins?.legend?.labels) chart.options.plugins.legend.labels.color = c.text;
    if (chart.options.plugins?.tooltip) {
      chart.options.plugins.tooltip.backgroundColor = c.tooltipBg;
      chart.options.plugins.tooltip.titleColor = c.text;
      chart.options.plugins.tooltip.bodyColor = c.text;
      chart.options.plugins.tooltip.borderColor = c.tooltipBorder;
    }
    if (chart.options.scales?.x?.ticks) chart.options.scales.x.ticks.color = c.text;
    if (chart.options.scales?.y?.ticks) chart.options.scales.y.ticks.color = c.text;
    if (chart.options.scales?.y?.grid) chart.options.scales.y.grid.color = c.grid;
    if (chart.options.scales?.x?.grid) chart.options.scales.x.grid.color = c.grid;
    chart.update('none');
  }

  function initCharts() {
    if (typeof Chart === 'undefined') return;
    const c = chartColors();
    const darkMode = isDark();
    Chart.defaults.font.family = 'Vazirmatn, Tahoma, sans-serif';
    Chart.defaults.font.size = 12;
    Chart.defaults.color = c.text;
    Chart.defaults.borderColor = c.grid;

    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && !revenueChart) {
      revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
          datasets: [
            {
              label: 'درآمد (میلیون تومان)',
              data: [86, 94, 102, 118, 121, 128],
              borderColor: c.primary,
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 4,
              pointHoverRadius: 7,
              pointBackgroundColor: darkMode ? '#1e293b' : '#fff',
              pointBorderColor: c.primary,
              pointBorderWidth: 2,
            },
            {
              label: 'هزینه',
              data: [28, 35, 32, 40, 38, 45],
              borderColor: c.secondary,
              backgroundColor: 'transparent',
              borderDash: [6, 4],
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'top', align: 'end', rtl: true, labels: { color: c.text, usePointStyle: true, padding: 16 } },
            tooltip: {
              rtl: true,
              backgroundColor: c.tooltipBg,
              titleColor: c.text,
              bodyColor: c.text,
              borderColor: c.tooltipBorder,
              borderWidth: 1,
              padding: 12,
              cornerRadius: 12,
            },
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: c.text } },
            y: { grid: { color: c.grid }, ticks: { color: c.text, callback: (v) => toPersianNum(v) } },
          },
          animation: { duration: 1500, easing: 'easeOutQuart' },
        },
      });
    }

    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx && !categoryChart) {
      categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
          labels: ['الکترونیک', 'پوشاک', 'خوراکی', 'لوازم خانگی', 'سایر'],
          datasets: [{ data: [35, 25, 18, 14, 8], backgroundColor: [c.primary, c.secondary, c.success, c.warning, c.info], borderWidth: 0, hoverOffset: 12 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: { legend: { position: 'bottom', rtl: true, labels: { color: c.text, padding: 14, usePointStyle: true } } },
          animation: { animateRotate: true, duration: 1400 },
        },
      });
    }

    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx && !trafficChart) {
      trafficChart = new Chart(trafficCtx, {
        type: 'bar',
        data: {
          labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
          datasets: [{
            label: 'بازدید',
            data: [1200, 1900, 1500, 2100, 1800, 2400, 1600],
            backgroundColor: (ctx) => {
              const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280);
              g.addColorStop(0, 'rgba(99, 102, 241, 0.9)');
              g.addColorStop(1, 'rgba(139, 92, 246, 0.4)');
              return g;
            },
            borderRadius: 10,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: c.text } },
            y: { grid: { color: c.grid }, ticks: { color: c.text, callback: (v) => toPersianNum(v) } },
          },
          animation: { duration: 1200, delay: (ctx) => ctx.dataIndex * 80 },
        },
      });
    }

    if (typeof window.initPageCharts === 'function') window.initPageCharts(c, toPersianNum, html);
  }

  function updateChartsTheme() {
    const c = chartColors();
    Chart.defaults.color = c.text;
    Chart.defaults.borderColor = c.grid;
    [revenueChart, categoryChart, trafficChart].forEach((chart) => applyChartTheme(chart, c));
    if (typeof window.updatePageChartsTheme === 'function') window.updatePageChartsTheme(c);
  }

  function boot() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('#theme-toggle, [data-theme-toggle]')) {
        e.preventDefault();
        toggleTheme();
      }
    });

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');

    function openSidebar() {
      sidebar?.classList.remove('translate-x-full');
      overlay?.classList.remove('opacity-0', 'pointer-events-none');
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    }

    function closeSidebar() {
      sidebar?.classList.add('translate-x-full');
      overlay?.classList.add('opacity-0', 'pointer-events-none');
      document.body.classList.remove('overflow-hidden');
    }

    openBtn?.addEventListener('click', openSidebar);
    closeBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeSidebar(); });

    function animateValue(el, end, duration, suffix = '') {
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(end * eased);
        el.textContent = toPersianNum(current.toLocaleString('fa-IR')) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => animateValue(el, target, 1800, suffix), delay);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0-start');
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.observe-in').forEach((el) => observer.observe(el));

    if (typeof injectIcons === 'function') injectIcons();
    if (typeof initDropdowns === 'function') initDropdowns();
    initCharts();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.getAttribute('data-page');
    if (page && typeof renderAdminShell === 'function') {
      renderAdminShell(page);
    }
    boot();
  });
})();
