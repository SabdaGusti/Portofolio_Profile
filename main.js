/* ============================================================
   PORTFOLIO JAVASCRIPT — Sabda Gusti Syailendra
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. SCROLL PROGRESS BAR ─── */
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0', height: '3px',
    width: '0%', zIndex: '9999',
    background: 'linear-gradient(90deg,#3b82f6,#60a5fa,#93c5fd)',
    boxShadow: '0 0 8px rgba(59,130,246,.6)',
    transition: 'width .1s ease',
    pointerEvents: 'none',
  });
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });

  /* ─── 2. NAVBAR ─── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function tickNav() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 110) cur = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === cur));
  }
  window.addEventListener('scroll', tickNav, { passive: true });
  tickNav();

  /* ─── 3. HAMBURGER ─── */
  const ham    = document.getElementById('hamburger');
  const navUl  = document.getElementById('nav-links');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    navUl.classList.toggle('open');
  });
  navUl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    navUl.classList.remove('open');
  }));

  /* ─── 4. TYPED ROLE EFFECT ─── */
  const roles = [
    'IT Support',
    'System Administrator',
    'Network Support',
    'Network & Security'
  ];
  const roleEl = document.getElementById('typed-role');
  let ri = 0, ci = 0, del = false;

  function typeIt() {
    const word = roles[ri];
    roleEl.textContent = del ? word.slice(0, ci--) : word.slice(0, ci++);
    let t = del ? 60 : 110;
    if (!del && ci > word.length)  { t = 1800; del = true; }
    else if (del && ci < 0)        { del = false; ri = (ri + 1) % roles.length; t = 380; }
    setTimeout(typeIt, t);
  }
  typeIt();

  /* ─── 5. SCROLL REVEAL (custom AOS) ─── */
  const aosEls = document.querySelectorAll('[data-aos]');
  new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('aos-in'); });
  }, { threshold: 0.12 }).observe
    ? new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('aos-in'); });
      }, { threshold: 0.12 })
    : null;

  // Re-do with proper pattern
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('aos-in'); } });
  }, { threshold: 0.12 });
  aosEls.forEach(el => revealObs.observe(el));

  /* ─── 6. SKILL BARS ─── */
  const fillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        fillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sb-fill').forEach(el => fillObs.observe(el));

  /* ─── 7. COUNTING NUMBERS ─── */
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, step = Math.ceil(target / 50);
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(t);
      }, 28);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-num[data-count]').forEach(el => cntObs.observe(el));

  /* ─── 8. PROJECT & CERTIFICATE FILTERS ─── */
  document.head.insertAdjacentHTML('beforeend', `<style>
    @keyframes cardIn { from { opacity:0; transform:scale(.96) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
  </style>`);

  // Project Filter
  const projFilterBtns = document.querySelectorAll('#projects-filter-bar .filter-btn, #projects .filter-btn');
  if (projFilterBtns.length) {
    projFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        projFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('#projects-grid .project-card, #projects .project-card').forEach(c => {
          if (f === 'all' || c.dataset.cat === f) {
            c.classList.remove('hidden');
            c.style.animation = 'none';
            requestAnimationFrame(() => { c.style.animation = 'cardIn .4s ease forwards'; });
          } else {
            c.classList.add('hidden');
          }
        });
      });
    });
  }

  // Certificate Filter
  const certFilterBtns = document.querySelectorAll('#certs-filter-bar .filter-btn, #certifications .filter-btn');
  if (certFilterBtns.length) {
    certFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        certFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('#certs-grid .cert-card, #certifications .cert-card').forEach(c => {
          if (f === 'all' || c.dataset.cat === f) {
            c.classList.remove('hidden');
            c.style.animation = 'none';
            requestAnimationFrame(() => { c.style.animation = 'cardIn .4s ease forwards'; });
          } else {
            c.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ─── 9. BACK TO TOP ─── */
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─── 10. SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) { e.preventDefault(); tgt.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ─── 12. CARD 3D TILT ─── */
  document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width  - .5) * 8;
      const dy = ((e.clientY - r.top)  / r.height - .5) * 8;
      card.style.transform = `translateY(-7px) rotateX(${-dy}deg) rotateY(${dx}deg)`;
      card.style.transition = 'transform .05s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .35s ease';
    });
  });

  /* ─── 13. PARTICLE DOTS (hero bg) ─── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    document.head.insertAdjacentHTML('beforeend', `<style>
      @keyframes pf { 0%,100%{transform:translateY(0) translateX(0);opacity:.6;} 33%{transform:translateY(-28px) translateX(13px);opacity:1;} 66%{transform:translateY(18px) translateX(-9px);opacity:.35;} }
    </style>`);
    for (let i = 0; i < 20; i++) {
      const d = document.createElement('div');
      const sz = Math.random() * 5 + 2;
      Object.assign(d.style, {
        position: 'absolute',
        width: sz + 'px', height: sz + 'px',
        background: `rgba(59,130,246,${(Math.random() * .25 + .05).toFixed(2)})`,
        borderRadius: '50%',
        left: (Math.random() * 100) + '%',
        top:  (Math.random() * 100) + '%',
        animation: `pf ${(Math.random() * 10 + 8).toFixed(1)}s ease-in-out infinite ${(Math.random() * 5).toFixed(1)}s`,
        pointerEvents: 'none',
      });
      heroBg.appendChild(d);
    }
  }

  console.log('%c🚀 Portfolio | Sabda Gusti Syailendra', 'font-size:14px;font-weight:bold;color:#2563eb;background:#eff6ff;padding:8px 16px;border-radius:8px;');
});
