// Animate page title letters
document.querySelectorAll('.section-title').forEach(el => {
  const text = el.textContent;
  el.textContent = '';
  let delay = 0;
  text.split('').forEach(char => {
    const span = document.createElement('span');
    if (char === ' ') {
      span.innerHTML = '&nbsp;';
      span.style.display = 'inline-block';
    } else {
      span.textContent = char;
      span.style.animationDelay = delay + 's';
      span.classList.add('title-letter');
      delay += 0.08;
    }
    el.appendChild(span);
  });
});

// NUX word reveal on scroll
const revealItems = [
  document.getElementById('reveal-new'),
  document.getElementById('reveal-user'),
  document.getElementById('reveal-exp'),
];
if (revealItems[0]) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  revealItems.forEach(el => revealObserver.observe(el));
}

// Scroll arrow — slow scroll so the word reveal plays out
const scrollBtn = document.getElementById('scroll-down');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    const target = document.getElementById('about');
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const duration = 2400;
    let startTime = null;
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

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
