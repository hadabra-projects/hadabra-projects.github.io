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
  // Bilingual homepage. All translated copy is kept in one dictionary for review.
  const translations = {
    id: {
      navHome:'Beranda',navAbout:'Tentang Kami',navServices:'Layanan',navGallery:'Galeri Visual',navProcess:'Proses Kerja',navContact:'Kontak',navStart:'Mulai Proyek',
      loadingLabel:'MENYIAPKAN PENGALAMAN',heroTitle:'Membangun dengan<br><span>Integritas.</span><br><b>Kuat untuk Masa Depan.</b>',
      heroLead:'Solusi konstruksi yang terencana, terkoordinasi, dan berorientasi pada hasil.',heroStart:'Mulai Proyek',heroExplore:'Jelajahi Layanan',heroKnow:'KENALI HADABRA',
      approachBody:'Setiap proyek dimulai dari pemahaman yang tepat, perencanaan yang jelas, dan komitmen terhadap integritas.',aboutLink:'Tentang HADABRA',
      servicesKicker:'APA YANG KAMI KERJAKAN',servicesTitle:'Satu visi.<br><em>Proses yang terarah.</em>',allServices:'Semua layanan',
      service1Title:'Konstruksi<br>Bangunan',service1Body:'Pendekatan terkoordinasi dari perencanaan hingga pelaksanaan.',service2Title:'Pekerjaan<br>Spesialis',service2Body:'Lingkup pekerjaan ditetapkan sesuai kebutuhan dan spesifikasi proyek.',service3Title:'Interior &<br>Konsep Kustom',service3Body:'Ide ruang dan detail yang dipertimbangkan untuk kebutuhan proyek.',seeServices:'LIHAT LAYANAN',
      galleryKicker:'GALERI VISUAL',galleryTitle:'Ide menjadi ruang.<br><em>Ruang menjadi nyata.</em>',galleryBody:'Jelajahi pilihan visual arsitektur dan interior sebagai gambaran kemungkinan desain.',galleryButton:'Jelajahi Galeri',galleryExplore:'Jelajahi galeri ↗',
      ctaKicker:'PROYEK BERIKUTNYA DIMULAI DI SINI',ctaTitle:'Punya rencana<br><em>untuk dibangun?</em>',ctaBody:'Mari mulai dari percakapan, kebutuhan, dan langkah berikutnya yang jelas.',ctaButton:'Jadwalkan Survei & Konsultasi Gratis',
      footerDesc:'PT Hardika Dharma Baskara · Ungasan, Bali, Indonesia',footerGallery:'Galeri',footerTagline:'BUILT WITH INTEGRITY.'
    },
    en: {
      navHome:'Home',navAbout:'About Us',navServices:'Services',navGallery:'Visual Gallery',navProcess:'Our Process',navContact:'Contact',navStart:'Start a Project',
      loadingLabel:'PREPARING YOUR EXPERIENCE',heroTitle:'Building with<br><span>Integrity.</span><br><b>Strength for the Future.</b>',
      heroLead:'Planned, coordinated construction solutions focused on meaningful results.',heroStart:'Start a Project',heroExplore:'Explore Services',heroKnow:'DISCOVER HADABRA',
      approachBody:'Every project starts with a clear understanding, thoughtful planning, and a commitment to integrity.',aboutLink:'About HADABRA',
      servicesKicker:'WHAT WE DO',servicesTitle:'One vision.<br><em>A clear process.</em>',allServices:'All services',
      service1Title:'Building<br>Construction',service1Body:'A coordinated approach from planning through execution.',service2Title:'Specialist<br>Works',service2Body:'The scope of work is defined around each project’s needs and specifications.',service3Title:'Interior &<br>Custom Concepts',service3Body:'Spatial ideas and details considered around each project’s needs.',seeServices:'VIEW SERVICES',
      galleryKicker:'VISUAL GALLERY',galleryTitle:'Ideas become spaces.<br><em>Spaces become real.</em>',galleryBody:'Explore architectural and interior visuals that illustrate design possibilities.',galleryButton:'Explore Gallery',galleryExplore:'Explore the gallery ↗',
      ctaKicker:'YOUR NEXT PROJECT STARTS HERE',ctaTitle:'Planning something<br><em>to be built?</em>',ctaBody:'Start with a conversation, your needs, and a clear next step.',ctaButton:'Schedule a Free Site Survey & Consultation',
      footerDesc:'PT Hardika Dharma Baskara · Ungasan, Bali, Indonesia',footerGallery:'Gallery',footerTagline:'BUILT WITH INTEGRITY.'
    }
  };
  const languageButtons = document.querySelectorAll('[data-lang]');
  const applyLanguage = lang => {
    const chosen = translations[lang] ? lang : 'id';
    document.documentElement.lang = chosen;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[chosen][key] !== undefined) el.innerHTML = translations[chosen][key];
    });
    languageButtons.forEach(button => {
      const active = button.dataset.lang === chosen;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    try { localStorage.setItem('hadabra-language', chosen); } catch (_) {}
  };
  languageButtons.forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  let initialLanguage = 'id';
  try { initialLanguage = localStorage.getItem('hadabra-language') || 'id'; } catch (_) {}
  applyLanguage(initialLanguage);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
