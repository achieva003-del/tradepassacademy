/* ==========================================================================
   TradePass Academy — script.js
   Vanilla JS: sticky header state, mobile nav, scroll reveals,
   newsletter form handling, back-to-top control.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shrink + shadow ---------- */
  var header = document.getElementById('siteHeader');
  var lastKnownScroll = 0;
  var ticking = false;

  function updateHeader() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    lastKnownScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', toggleNav);

    // Close menu when a nav link is clicked (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!mainNav.classList.contains('is-open')) return;
      var withinNav = mainNav.contains(e.target) || navToggle.contains(e.target);
      if (!withinNav) closeNav();
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Reset state on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 800) closeNav();
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  var revealTargets = document.querySelectorAll(
    '.book-card, .benefit-card, .resource-card, .update-card, .section-head'
  );

  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // small stagger for cards within the same row/group
          var delay = (index % 4) * 70;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    // No IO support or reduced motion: show everything immediately
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Newsletter form ---------- */
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterStatus = document.getElementById('newsletterStatus');
  var newsletterEmail = document.getElementById('newsletterEmail');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = newsletterEmail.value.trim();

      if (!isValidEmail(value)) {
        newsletterStatus.textContent = 'Please enter a valid email address.';
        newsletterStatus.style.color = '#F4B400';
        newsletterEmail.focus();
        return;
      }

      // Production note: replace with a real API call to your
      // email provider (e.g. fetch('/api/subscribe', { method:'POST', ... }))
      newsletterStatus.textContent = 'Thanks — you\u2019re subscribed. Watch your inbox for updates.';
      newsletterStatus.style.color = '#F4B400';
      newsletterForm.reset();
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 480) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  }

  if (backToTop) {
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
    updateBackToTop();
  }

})();

