(() => {
  const intro = document.getElementById('intro');
  const bar = document.getElementById('loaderBar');
  const percent = document.getElementById('loaderPercent');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished = false;
  const finishIntro = () => {
    if (finished) return;
    finished = true;
    if (bar) bar.style.width = '100%';
    if (percent) percent.textContent = '100%';
    window.setTimeout(() => {
      intro?.classList.add('done');
      document.body.classList.remove('is-loading');
    }, reducedMotion ? 0 : 240);
  };
  if (intro) {
    if (reducedMotion) finishIntro();
    else {
      const start = performance.now();
      const duration = 2450;
      const tick = now => {
        const progress = Math.min(100, Math.round(((now - start) / duration) * 100));
        if (bar) bar.style.width = `${progress}%`;
        if (percent) percent.textContent = `${String(progress).padStart(2, '0')}%`;
        if (progress < 100) requestAnimationFrame(tick);
        else finishIntro();
      };
      requestAnimationFrame(tick);
      window.setTimeout(finishIntro, 4200); // failsafe: never trap visitors behind the intro
    }
  } else document.body.classList.remove('is-loading');

  const menu = document.getElementById('menuToggle');
  const nav = document.getElementById('navigation');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Tutup navigasi' : 'Buka navigasi');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
      observer.observe(item);
    });
  } else revealItems.forEach(item => item.classList.add('visible'));

  // Premium glass-like page handoff: only same-origin HTML navigation is animated.
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || link.target === '_blank' || link.hasAttribute('download')) return;
    let target;
    try { target = new URL(href, window.location.href); } catch { return; }
    if (target.origin !== window.location.origin || !/\.html?$/.test(target.pathname) || target.pathname === window.location.pathname) return;
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || reducedMotion) return;
      event.preventDefault();
      document.body.classList.add('page-leaving');
      window.setTimeout(() => { window.location.href = target.href; }, 260);
    });
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
