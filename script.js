// Menu mobile
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

// Révélation au scroll (amélioration progressive : le contenu reste visible
// sans JS ou en reduced-motion ; seul ce qui est hors écran est masqué).
const revealEls = document.querySelectorAll('.reveal');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealEls.length && !prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
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
  setTimeout(() => revealEls.forEach((el) => el.classList.add('reveal-in')), 2500);
}

// Formulaire de contact (démo : pas d'envoi réel)
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
