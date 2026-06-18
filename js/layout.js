/** قالب مشترک سایدبار و هدر */
(function () {
  const NAV = [
    { type: 'link', id: 'dashboard', href: 'index.html', icon: 'dashboard', label: 'داشبورد' },
    {
      type: 'dropdown',
      panelId: 'nav-shop',
      icon: 'cart',
      label: 'فروشگاه',
      children: [
        { id: 'orders', href: 'orders.html', icon: 'orders', label: 'سفارشات' },
        { id: 'products', href: 'products.html', icon: 'products', label: 'محصولات' },
      ],
    },
    {
      type: 'dropdown',
      panelId: 'nav-users',
      icon: 'users',
      label: 'کاربران',
      badge: '۱۲',
      children: [
        { id: 'users', href: 'users.html', icon: 'users', label: 'لیست کاربران' },
        { id: 'users-roles', href: 'users.html', label: 'نقش‌ها', icon: 'shield' },
      ],
    },
    { type: 'link', id: 'analytics', href: 'analytics.html', icon: 'analytics', label: 'گزارش‌ها' },
    {
      type: 'dropdown',
      panelId: 'nav-settings',
      icon: 'settings',
      label: 'تنظیمات',
      children: [
        { id: 'settings', href: 'settings.html', icon: 'settings', label: 'عمومی' },
        { id: 'settings-security', href: 'settings.html', icon: 'shield', label: 'امنیت' },
      ],
    },
  ];

  function childActive(activeId, item) {
    if (item.type === 'link') return item.id === activeId;
    return item.children?.some((c) => c.id === activeId);
  }

  function renderNav(activeId) {
    return NAV.map((item, i) => {
      const stagger = `stagger-${i + 1}`;

      if (item.type === 'link') {
        const active = item.id === activeId ? ' active' : '';
        return `<a href="${item.href}" class="nav-link${active} opacity-0-start observe-in ${stagger}">
          <span data-icon="${item.icon}"></span>${item.label}
        </a>`;
      }

      const open = item.children.some((c) => c.id === activeId);
      const openCls = open ? ' open' : '';
      const badge = item.badge
        ? `<span class="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-600 dark:bg-primary-900/50">${item.badge}</span>`
        : '';

      const children = item.children
        .map((c) => {
          const active = c.id === activeId ? ' active' : '';
          const icon = c.icon ? `<span data-icon="${c.icon}"></span>` : '<span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>';
          return `<a href="${c.href}" class="sidebar-sublink${active}">${icon}${c.label}</a>`;
        })
        .join('');

      return `<div class="opacity-0-start observe-in ${stagger}">
        <button type="button" class="sidebar-dropdown-btn${openCls}" data-sidebar-dropdown="${item.panelId}" aria-expanded="${open}">
          <span data-icon="${item.icon}"></span>
          <span class="flex-1 text-right">${item.label}</span>
          ${badge}
          <span data-icon="chevronDown"></span>
        </button>
        <div id="${item.panelId}" class="sidebar-dropdown-panel${openCls}">
          <div class="mr-3 mt-1 space-y-0.5 border-r-2 border-slate-200 pr-3 dark:border-slate-700">${children}</div>
        </div>
      </div>`;
    }).join('');
  }

  function headerBlock() {
    return `
          <div class="flex items-center gap-2 sm:mr-auto">
            <button id="theme-toggle" type="button" class="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-primary-300 hover:text-primary-600 dark:border-slate-700 dark:hover:text-primary-400" aria-label="تغییر تم">
              <span class="dark:hidden" data-icon="moon"></span><span class="hidden dark:inline" data-icon="sun"></span>
            </button>

            <div class="dropdown relative">
              <button type="button" data-dropdown-toggle="header-notif" aria-expanded="false" class="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-primary-300 hover:text-primary-600 dark:border-slate-700" aria-label="اعلان‌ها">
                <span data-icon="bell"></span>
                <span class="absolute left-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">۳</span>
              </button>
              <div id="header-notif" class="dropdown-panel end-0 w-[min(100vw-2rem,22rem)] sm:w-80">
                <div class="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                  <p class="text-sm font-bold">اعلان‌ها</p>
                </div>
                <a href="orders.html" class="dropdown-item">
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40"><span data-icon="cart"></span></span>
                  <span><span class="block font-medium">پرداخت سفارش #۴۸۲۱</span><span class="text-xs text-slate-500">۲ دقیقه پیش</span></span>
                </a>
                <a href="products.html" class="dropdown-item">
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40"><span data-icon="products"></span></span>
                  <span><span class="block font-medium">موجودی کم: هدفون Sony</span><span class="text-xs text-slate-500">۴۵ دقیقه پیش</span></span>
                </a>
                <a href="orders.html" class="dropdown-item">
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40"><span data-icon="bell"></span></span>
                  <span><span class="block font-medium">۲۳ سفارش در انتظار ارسال</span><span class="text-xs text-slate-500">امروز</span></span>
                </a>
              </div>
            </div>

            <div class="dropdown relative">
              <button type="button" data-dropdown-toggle="header-user" aria-expanded="false" class="flex items-center gap-2 rounded-xl border border-slate-200 px-2.5 py-1.5 transition hover:border-primary-300 sm:px-3 sm:py-2 dark:border-slate-700">
                <img src="assets/img/avatar.svg" alt="" class="h-8 w-8 rounded-lg" width="32" height="32" />
                <span class="hidden text-sm font-medium sm:inline">حسن خسروجردی</span>
                <span class="text-slate-400" data-icon="chevronDown"></span>
              </button>
              <div id="header-user" class="dropdown-panel end-0 w-56">
                <div class="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                  <p class="text-sm font-bold">حسن خسروجردی</p>
                  <p class="text-xs text-slate-500">h.khosrojerdi@ariyashop.ir</p>
                </div>
                <a href="settings.html" class="dropdown-item"><span data-icon="users"></span>پروفایل</a>
                <a href="settings.html" class="dropdown-item"><span data-icon="settings"></span>تنظیمات</a>
                <a href="analytics.html" class="dropdown-item"><span data-icon="analytics"></span>گزارش‌ها</a>
                <div class="border-t border-slate-100 dark:border-slate-700">
                  <button type="button" class="dropdown-item w-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"><span data-icon="logout"></span>خروج</button>
                </div>
              </div>
            </div>
          </div>`;
  }

  window.renderAdminShell = function (activeId) {
    const searchPh = document.body.getAttribute('data-search') || 'جستجو...';
    const main = document.getElementById('page-main');
    if (!main) return;

    const mainHtml = main.outerHTML;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
  <div id="sidebar-overlay" class="sidebar-overlay opacity-0 pointer-events-none" aria-hidden="true"></div>
  <div class="flex min-h-screen">
    <aside id="sidebar" class="fixed inset-y-0 right-0 z-50 flex h-screen min-h-screen w-72 shrink-0 translate-x-full flex-col border-l backdrop-blur-xl transition-transform duration-500 ease-out lg:sticky lg:top-0 lg:z-40 lg:max-h-screen lg:translate-x-0">
      <div class="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
        <a href="index.html" class="flex items-center gap-3">
          <span class="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-bl from-primary-500 to-violet-600 text-white shadow-lg shadow-primary-500/40 animate-float">
            <span data-icon="dashboard"></span>
            <span class="absolute -top-0.5 -left-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-surface-900 animate-pulse-soft"></span>
          </span>
          <div><h1 class="text-lg font-bold gradient-text">پنل ادمین</h1><p class="text-xs text-slate-500">فروشگاه آریا</p></div>
        </a>
        <button id="close-sidebar" type="button" class="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" aria-label="بستن منو"><span data-icon="close"></span></button>
      </div>
      <nav class="flex-1 space-y-1 overflow-y-auto p-4" aria-label="منوی اصلی">${renderNav(activeId)}</nav>
    </aside>
    <div class="flex min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-30 border-b border-slate-200/80 glass animate-fade-in dark:border-slate-800">
        <div class="flex flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button id="open-sidebar" type="button" class="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-primary-300 hover:text-primary-600 lg:hidden dark:border-slate-700" aria-label="باز کردن منو"><span data-icon="menu"></span></button>
          <div class="dropdown relative min-w-0 flex-1 sm:max-w-md">
            <span class="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-400" data-icon="search"></span>
            <input type="search" placeholder="${searchPh}" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-11 pl-10 text-sm transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
            <button type="button" data-dropdown-toggle="header-search" aria-expanded="false" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200/80 hover:text-primary-600 dark:hover:bg-slate-700" aria-label="فیلتر جستجو"><span data-icon="filter"></span></button>
            <div id="header-search" class="dropdown-panel start-0 w-full">
              <a href="users.html" class="dropdown-item"><span data-icon="users"></span>کاربران</a>
              <a href="orders.html" class="dropdown-item"><span data-icon="orders"></span>سفارشات</a>
              <a href="products.html" class="dropdown-item"><span data-icon="products"></span>محصولات</a>
              <a href="analytics.html" class="dropdown-item"><span data-icon="analytics"></span>گزارش‌ها</a>
            </div>
          </div>
          ${headerBlock()}
        </div>
      </header>
      ${mainHtml}
    </div>
  </div>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div class="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl animate-float"></div>
    <div class="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl animate-float" style="animation-delay:-3s"></div>
  </div>`;

    main.remove();
    while (wrapper.firstChild) document.body.appendChild(wrapper.firstChild);
  };
})();
