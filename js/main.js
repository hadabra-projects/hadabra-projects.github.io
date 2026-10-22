(function(){
      const intro = document.getElementById('intro');
      const loadingBar = document.getElementById('loadingBar');
      const loadingPercent = document.getElementById('loadingPercent');
      const startTime = performance.now();
      const minimumDuration = 5000;
      let pageLoaded = document.readyState === 'complete';
      window.addEventListener('load', () => { pageLoaded = true; });
      const progressTimer = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const timeProgress = Math.min(elapsed / minimumDuration, 1);
        const progress = pageLoaded ? Math.min(100, Math.max(94, Math.round(94 + (timeProgress * 6)))) : Math.min(92, Math.round(timeProgress * 92));
        if (loadingBar) loadingBar.style.width = progress + '%';
        if (loadingPercent) loadingPercent.textContent = String(progress).padStart(2, '0') + '%';
        if (pageLoaded && elapsed >= minimumDuration) {
          clearInterval(progressTimer);
          if (loadingBar) loadingBar.style.width = '100%';
          if (loadingPercent) loadingPercent.textContent = '100%';
          setTimeout(finishIntro, 180);
        }
      }, 45);
      function finishIntro() {
        if (!intro || intro.classList.contains('done')) return;
        intro.classList.add('done');
        document.body.classList.remove('locked');
      }
      setTimeout(() => { pageLoaded = true; }, 6500);

      const toggle = document.getElementById('menuToggle');
      const links = document.getElementById('navLinks');
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? '×' : '☰';
      });
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        toggle.textContent = '☰';
      }));

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {threshold:0.12});
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

      const translations = {
        id: {
          navHome:"Beranda", navAbout:"Tentang Kami", navServices:"Layanan", navGallery:"Galeri Visual", navProcess:"Proses Kerja", navContact:"Kontak", navCta:"Mulai Proyek",
          brandLine:"HADABRA PROJECTS · INTEGRATED CONSTRUCTION SOLUTIONS", introCaption:"Rancang · Bangun · Wujudkan", loadingLabel:"MENYIAPKAN PENGALAMAN",
          heroKicker:"HADABRA PROJECTS · BALI, INDONESIA", heroTitle:"Membangun<br><span>dengan Integritas.</span><br>Kuat untuk Masa Depan.", heroLead:"Solusi konstruksi yang terencana, terkoordinasi, dan berorientasi pada hasil.", heroVisuals:"Lihat Galeri Visual", heroDiscuss:"Diskusikan Proyek Anda", heroNote:"Konstruksi · Koordinasi · Pelaksanaan", scrollExplore:"Gulir untuk menjelajah",
          trust1Title:"Integritas di Setiap Langkah", trust1Body:"Komunikasi yang jelas dan koordinasi yang bertanggung jawab.", trust2Title:"Dibangun dengan Tujuan", trust2Body:"Pendekatan praktis sejak perencanaan hingga pelaksanaan.", trust3Title:"Satu Proyek, Satu Arah", trust3Body:"Pendekatan terkoordinasi untuk penyelesaian proyek.",
          aboutEyebrow:"Tentang HADABRA", aboutKicker:"Pendekatan Konstruksi yang Terencana", aboutTitle:"Proyek yang baik dimulai dari fondasi yang jelas.", aboutBody1:"HADABRA mengedepankan integritas, koordinasi yang praktis, dan pelaksanaan konstruksi yang terarah. Kami berupaya membuat proses proyek lebih jelas—mulai dari diskusi awal dan penentuan lingkup hingga perencanaan dan pelaksanaan.", aboutBody2:"Situs ini merupakan pengenalan perusahaan. Lingkup pekerjaan, jadwal, biaya, dan hasil pekerjaan dibahas serta dikonfirmasi sesuai kebutuhan setiap proyek.", tagline:"Membangun dengan Integritas, Kuat untuk Masa Depan.",
          galleryEyebrow:"Galeri Visual", galleryTitle:"Ide, ruang,<br>dan berbagai kemungkinan.", galleryBody:"Pilihan visual arsitektur dan interior. Detail proyek dapat ditambahkan setelah setiap gambar dipastikan sebagai proyek atau konsep tertentu.", gallery1Type:"01 / Eksterior", gallery1Title:"Fasad Villa Modern", gallery2Type:"02 / Arsitektur", gallery2Title:"Courtyard Tropis", gallery3Type:"03 / Interior", gallery3Title:"Dapur Kontemporer", galleryNote:"Catatan: Visual bersifat ilustratif sampai status setiap gambar dipastikan sebagai proyek selesai, proyek berjalan, atau konsep desain.",
          servicesEyebrow:"Layanan", servicesTitle:"Satu titik koordinasi.<br>Proses yang terpadu.", servicesBody:"Kategori layanan ini merupakan gambaran awal untuk situs. Deskripsi final perlu disesuaikan dengan ruang lingkup usaha HADABRA yang telah dikonfirmasi.", service1Index:"01 / KONSTRUKSI", service1Title:"Konstruksi Umum", service1Body:"Perencanaan konstruksi dan koordinasi pelaksanaan proyek bangunan, dengan lingkup dan hasil pekerjaan disepakati sebelum pekerjaan dimulai.", service1Label:"Pekerjaan Bangunan", service2Index:"02 / PROYEK", service2Title:"Pekerjaan Spesialis", service2Body:"Pekerjaan berbasis proyek seperti baja struktural, baja ringan, kanopi, dan pekerjaan logam—sesuai kemampuan dan lingkup yang dikonfirmasi.", service2Label:"Pekerjaan Berbasis Proyek", service3Index:"03 / WORKSHOP", service3Title:"Interior & Pekerjaan Kustom", service3Body:"Pekerjaan interior dan konsep furnitur kustom yang dikoordinasikan sesuai kebutuhan serta spesifikasi setiap proyek.", service3Label:"Interior · Kustom",
          processEyebrow:"Proses Kerja", processTitle:"Langkah yang jelas.<br>Minim kejutan.", step1Num:"LANGKAH 01", step1Title:"Diskusi", step1Body:"Memahami kebutuhan, lokasi, prioritas, dan hasil yang diharapkan.", step2Num:"LANGKAH 02", step2Title:"Penetapan", step2Body:"Menyelaraskan lingkup, asumsi, parameter anggaran, dan hasil pekerjaan.", step3Num:"LANGKAH 03", step3Title:"Perencanaan", step3Body:"Mengonfirmasi proposal, jadwal, tanggung jawab, dan urutan pekerjaan.", step4Num:"LANGKAH 04", step4Title:"Pelaksanaan", step4Body:"Mengoordinasikan pelaksanaan dan menyampaikan perkembangan sesuai lingkup yang disepakati.",
          contactEyebrow:"Mari Berdiskusi", contactTitle:"Punya rencana proyek?", contactBody:"Mulai dengan survei lokasi dan konsultasi gratis untuk membahas kebutuhan, lingkup pekerjaan, dan langkah perencanaan proyek Anda.", contactWhatsapp:"Jadwalkan Survei & Konsultasi Gratis", contactEmail:"Kirim Email", locationEyebrow:"LOKASI KAMI", locationTitle:"Temukan HADABRA PROJECTS", locationAddress:"Jl. Pura Masuka, Ungasan, Kuta Selatan, Badung, Bali 80361", mapOpen:"Buka Lokasi & Rute di Google Maps", mapNote:"Gunakan tombol untuk membuka pin lokasi yang dibagikan dan memulai navigasi.", mapCaption:"Peta area kantor · klik tombol untuk pin lokasi tepat", footerAddress:"PT Hardika Dharma Baskara<br>Jl. Pura Masuka, Ungasan, Badung, Bali 80361", footerAbout:"Tentang Kami", footerServices:"Layanan", footerGallery:"Galeri Visual", footerContact:"Kontak"
        },
        en: {
          navHome:"Home", navAbout:"About Us", navServices:"Services", navGallery:"Visual Gallery", navProcess:"Our Process", navContact:"Contact", navCta:"Start a Project",
          brandLine:"HADABRA PROJECTS · INTEGRATED CONSTRUCTION SOLUTIONS", introCaption:"Design · Build · Deliver", loadingLabel:"PREPARING YOUR EXPERIENCE",
          heroKicker:"HADABRA PROJECTS · BALI, INDONESIA", heroTitle:"Building<br><span>with Integrity.</span><br>Strength for the Future.", heroLead:"Planned, coordinated construction solutions focused on purposeful delivery.", heroVisuals:"Explore Visuals", heroDiscuss:"Discuss Your Project", heroNote:"Construction · Coordination · Delivery", scrollExplore:"Scroll to explore",
          trust1Title:"Integrity in Every Step", trust1Body:"Clear communication and responsible coordination.", trust2Title:"Built with Purpose", trust2Body:"Practical thinking from planning through execution.", trust3Title:"One Project, One Direction", trust3Body:"A coordinated approach to project delivery.",
          aboutEyebrow:"About HADABRA", aboutKicker:"A Considered Approach to Construction", aboutTitle:"Good projects begin with a clear foundation.", aboutBody1:"HADABRA focuses on integrity, practical coordination, and purposeful construction. We aim to make the project journey clearer—from the first conversation and scope definition to planning and execution.", aboutBody2:"This website introduces the company. Project scope, schedules, costs, and deliverables are discussed and confirmed for each brief.", tagline:"Building with Integrity, Strength for the Future.",
          galleryEyebrow:"Visual Gallery", galleryTitle:"Ideas, spaces<br>and possibilities.", galleryBody:"A selection of architectural and interior visuals. Project details can be added once each image is confirmed as a specific project or concept.", gallery1Type:"01 / Exterior", gallery1Title:"Modern Villa Facade", gallery2Type:"02 / Architecture", gallery2Title:"Tropical Courtyard", gallery3Type:"03 / Interior", gallery3Title:"Contemporary Kitchen", galleryNote:"Note: Visuals are illustrative until each image is confirmed as a completed project, ongoing project, or design concept.",
          servicesEyebrow:"Services", servicesTitle:"One point of contact.<br>A coordinated process.", servicesBody:"These service categories are an initial website overview. Final descriptions should match HADABRA’s confirmed business scope.", service1Index:"01 / CONSTRUCTION", service1Title:"General Construction", service1Body:"Construction planning and execution coordination for building projects, with scope and deliverables agreed before work begins.", service1Label:"Building Works", service2Index:"02 / PROJECTS", service2Title:"Specialist Projects", service2Body:"Project-based works such as structural steel, lightweight steel, canopies, and metalwork—subject to confirmed capability and scope.", service2Label:"Project-Based Works", service3Index:"03 / WORKSHOP", service3Title:"Interior & Custom Work", service3Body:"Interior fit-out and custom furniture concepts coordinated to each project’s requirements and specifications.", service3Label:"Interior · Custom",
          processEyebrow:"Our Process", processTitle:"Clear steps.<br>Fewer surprises.", step1Num:"STEP 01", step1Title:"Discuss", step1Body:"Understand the brief, site, priorities, and intended outcome.", step2Num:"STEP 02", step2Title:"Define", step2Body:"Align scope, assumptions, budget parameters, and deliverables.", step3Num:"STEP 03", step3Title:"Plan", step3Body:"Confirm the proposal, schedule, responsibilities, and work sequence.", step4Num:"STEP 04", step4Title:"Deliver", step4Body:"Coordinate execution and communicate progress against the agreed scope.",
          contactEyebrow:"Start a Conversation", contactTitle:"Have a project in mind?", contactBody:"Start with a free site survey and consultation to discuss your needs, project scope, and planning next steps.", contactWhatsapp:"Schedule Free Survey & Consultation", contactEmail:"Send an Email", locationEyebrow:"OUR LOCATION", locationTitle:"Find HADABRA PROJECTS", locationAddress:"Jl. Pura Masuka, Ungasan, South Kuta, Badung, Bali 80361", mapOpen:"Open Location & Directions in Google Maps", mapNote:"Use the button to open the shared location pin and start navigation.", mapCaption:"Office area map · use the button for the exact pin", footerAddress:"PT Hardika Dharma Baskara<br>Jl. Pura Masuka, Ungasan, Badung, Bali 80361", footerAbout:"About Us", footerServices:"Services", footerGallery:"Visual Gallery", footerContact:"Contact"
        }
      };
      function setLanguage(lang) {
        const dictionary = translations[lang] || translations.id;
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (dictionary[key] !== undefined) el.innerHTML = dictionary[key];
        });
        document.querySelectorAll('.lang-btn').forEach(btn => {
          btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
        });
        const desc = lang === 'id'
          ? 'HADABRA — Solusi Konstruksi Terintegrasi. Membangun dengan Integritas, Kuat untuk Masa Depan.'
          : 'HADABRA — Integrated Construction Solutions. Building with Integrity, Strength for the Future.';
        document.querySelector('meta[name="description"]').setAttribute('content', desc);
        try { localStorage.setItem('hadabra-language', lang); } catch (e) {}
      }
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
      });
      let savedLanguage = 'id';
      try { savedLanguage = localStorage.getItem('hadabra-language') || 'id'; } catch (e) {}
      setLanguage(savedLanguage);

            document.getElementById('year').textContent = new Date().getFullYear();
    })();
