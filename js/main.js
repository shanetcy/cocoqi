const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('main-nav-mobile');

navToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Product tabs (Pink / White edition)
const tabList = document.querySelector('.product-tabs');
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = {
  pink: document.getElementById('panel-pink'),
  white: document.getElementById('panel-white'),
};

function activateTab(btn) {
  const target = btn.dataset.target;

  tabButtons.forEach((b) => {
    const active = b === btn;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', String(active));
    b.tabIndex = active ? 0 : -1;
  });

  Object.entries(panels).forEach(([key, panel]) => {
    const show = key === target;
    panel.hidden = !show;
    panel.classList.toggle('is-hidden', !show);
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => activateTab(btn));
});

// Arrow-key navigation between tabs (WAI-ARIA tabs pattern) — without this,
// the inactive tab has tabindex=-1 and is unreachable by keyboard alone.
if (tabList) {
  tabList.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const tabs = Array.from(tabButtons);
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;
    e.preventDefault();
    const nextIndex = e.key === 'ArrowRight'
      ? (currentIndex + 1) % tabs.length
      : (currentIndex - 1 + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex]);
  });
}
