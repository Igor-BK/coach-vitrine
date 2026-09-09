const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Menu mobile ---------- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('open', !open);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    });
  });
}

/* ---------- En-tête : état "scrolled" ---------- */
const header = document.querySelector('[data-header]');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 12) header.setAttribute('data-scrolled', '');
    else header.removeAttribute('data-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Révélation au scroll (amélioration progressive) ---------- */
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length && !prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement.querySelectorAll(':scope > .reveal-pre'));
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = `${Math.min(idx, 5) * 80}ms`;
        el.classList.add('reveal-in');
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) return; // déjà visible
    el.classList.add('reveal-pre');
    io.observe(el);
  });

  // Filet de sécurité : ne jamais laisser un bloc masqué indéfiniment.
  setTimeout(() => revealEls.forEach((el) => el.classList.add('reveal-in')), 2800);
}

/* ---------- Compteurs animés ---------- */
const counters = document.querySelectorAll('[data-count]');

if (counters.length && !prefersReduced && 'IntersectionObserver' in window) {
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(tick);
      else el.dataset.done = '1';
    };
    requestAnimationFrame(tick);
  };

  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        cio.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );
  counters.forEach((el) => cio.observe(el));

  // Filet de sécurité : garantir la valeur finale même si l'observer ne se déclenche pas.
  setTimeout(() => {
    counters.forEach((el) => {
      if (el.dataset.done) return;
      el.textContent = el.dataset.count;
    });
  }, 3000);
}

/* ---------- Lien de nav actif selon la section ---------- */
const navLinks = Array.from(document.querySelectorAll('#nav-menu a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (sections.length && 'IntersectionObserver' in window) {
  const sio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.removeAttribute('aria-current'));
        const active = navLinks.find((l) => l.getAttribute('href') === `#${entry.target.id}`);
        if (active) active.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => sio.observe(s));
}

/* ---------- Formulaire de contact (démo : pas d'envoi réel) ---------- */
const form = document.querySelector('.contact-form');
const success = document.querySelector('.form-success');

if (form && success) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.hidden = true;
    success.hidden = false;
    success.focus?.();
  });
}
