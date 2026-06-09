document.querySelectorAll('.card-header').forEach(header => {
  const body = document.getElementById(header.getAttribute('aria-controls'));

  function toggle() {
    const expanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', String(!expanded));
    body.hidden = expanded;
  }

  header.addEventListener('click', toggle);
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});
