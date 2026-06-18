(function () {
  let visitorsChart;
  let conversionChart;

  window.initPageCharts = function (c, toPersianNum, html) {
    if (typeof Chart === 'undefined') return;

    const vCtx = document.getElementById('visitorsChart');
    if (vCtx) {
      visitorsChart = new Chart(vCtx, {
        type: 'line',
        data: {
          labels: ['هفته ۱', 'هفته ۲', 'هفته ۳', 'هفته ۴'],
          datasets: [{
            label: 'بازدیدکننده یکتا',
            data: [3200, 4100, 3800, 5200],
            borderColor: c.info,
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            fill: true,
            tension: 0.35,
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: c.text }, grid: { display: false } },
            y: { ticks: { color: c.text, callback: (v) => toPersianNum(v) }, grid: { color: c.grid } },
          },
        },
      });
    }

    const cCtx = document.getElementById('conversionChart');
    if (cCtx) {
      conversionChart = new Chart(cCtx, {
        type: 'bar',
        data: {
          labels: ['موبایل', 'دسکتاپ', 'تبلت'],
          datasets: [{
            label: 'نرخ تبدیل ٪',
            data: [3.2, 4.8, 2.1],
            backgroundColor: [c.primary, c.secondary, c.warning],
            borderRadius: 8,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: c.text }, grid: { display: false } },
            y: { ticks: { color: c.text }, grid: { color: c.grid } },
          },
        },
      });
    }
  };

  window.updatePageChartsTheme = function (c) {
    [visitorsChart, conversionChart].forEach((chart) => {
      if (!chart) return;
      if (chart.options.plugins?.tooltip) {
        chart.options.plugins.tooltip.backgroundColor = c.tooltipBg;
        chart.options.plugins.tooltip.titleColor = c.text;
        chart.options.plugins.tooltip.bodyColor = c.text;
        chart.options.plugins.tooltip.borderColor = c.tooltipBorder;
      }
      if (chart.options.scales?.x?.ticks) chart.options.scales.x.ticks.color = c.text;
      if (chart.options.scales?.y?.ticks) chart.options.scales.y.ticks.color = c.text;
      if (chart.options.scales?.y?.grid) chart.options.scales.y.grid.color = c.grid;
      chart.update('none');
    });
  };
})();
