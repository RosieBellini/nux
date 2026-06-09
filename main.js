// Drawer
const overlay = document.getElementById('drawer-overlay');
document.getElementById('menu-open').addEventListener('click', () => overlay.classList.add('open'));
document.getElementById('menu-close').addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.classList.remove('open'); });

// Accordion
document.querySelectorAll('.accordion-header').forEach(btn => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});
