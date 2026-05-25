/* =========================================================================
   STEELEXMACHINE — Vanilla JS
   ---------------------------------------------------------------------------
   Three small responsibilities:
     1. Hamburger menu (mobile nav toggle)
     2. Scroll reveal (adds .is-in to .reveal elements as they enter)
     3. Form handling (booking + contact — builds a mailto: link
        so the static site works on GitHub Pages without a backend)
   ========================================================================= */

(function () {
  'use strict';

  /* ============== 1. HAMBURGER MENU ============== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  function setMenu(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      setMenu(!isOpen);
    });

    // Close menu when a nav link is tapped
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }


  /* ============== 2. SCROLL REVEAL ============== */
  // Adds the `is-in` class to elements with `.reveal` as they scroll into view.
  // Honors `prefers-reduced-motion` — no observers attached, everything just
  // appears (CSS handles that automatically via @media query).
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  } else if (reveals.length) {
    // Fallback: show all elements immediately
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }


  /* ============== 3. FORM HANDLING ============== */
  // Both the booking form and the contact form share this logic.
  // We validate required fields, then build a mailto: link so the
  // site stays fully static (no backend). Swap the action / endpoint
  // if you later wire up Formspree, Netlify Forms, or your own API.

  const TARGET_EMAIL = 'works@steelexmachine.com';

  function validateForm(form) {
    let firstInvalid = null;
    const fields = form.querySelectorAll('.field');
    fields.forEach(function (field) {
      // Radio / checkbox groups: validate via the :checked state of the
      // group, not by reading .value of the first input (which would
      // wrongly read the first option's value as "filled").
      const radioOrCheck = field.querySelector('input[type="radio"], input[type="checkbox"]');
      if (radioOrCheck) {
        const name = radioOrCheck.getAttribute('name');
        // A group is required if ANY input in the group has the required attribute.
        const groupInputs = name ? form.querySelectorAll('input[name="' + name + '"]') : [radioOrCheck];
        let isRequired = false;
        groupInputs.forEach(function (el) { if (el.hasAttribute('required')) isRequired = true; });
        const anyChecked = name ? !!form.querySelector('input[name="' + name + '"]:checked') : radioOrCheck.checked;
        const invalid = isRequired && !anyChecked;
        field.classList.toggle('is-error', invalid);
        if (invalid && !firstInvalid) firstInvalid = radioOrCheck;
        return;
      }

      const input = field.querySelector('input, textarea, select');
      if (!input) return;
      const isRequired = input.hasAttribute('required');
      const value = (input.value || '').trim();
      let invalid = false;

      if (isRequired && !value) invalid = true;
      // Email check
      if (input.type === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
        invalid = true;
      }

      field.classList.toggle('is-error', invalid);
      if (invalid && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function buildMailtoBody(form) {
    const data = new FormData(form);
    const lines = [];
    data.forEach(function (value, key) {
      // FormData yields multiple entries per checkbox group;
      // group them by collecting all values for the same key.
      const existing = lines.find(function (l) { return l.key === key; });
      if (existing) {
        existing.values.push(value);
      } else {
        lines.push({ key: key, values: [value] });
      }
    });

    const body = lines.map(function (l) {
      const label = l.key.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
      return label + ':\n' + l.values.join(', ');
    }).join('\n\n');

    return body + '\n\n— Sent from steelexmachine.com';
  }

  function wireForm(form) {
    if (!form) return;
    const status = form.parentElement.querySelector('.form-status');
    const subjectFromForm = form.getAttribute('data-mail-subject') || 'Enquiry — Steelexmachine';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;

      const body = buildMailtoBody(form);
      const mailto =
        'mailto:' + TARGET_EMAIL +
        '?subject=' + encodeURIComponent(subjectFromForm) +
        '&body=' + encodeURIComponent(body);

      // Show success state in-page
      if (status) {
        status.classList.add('is-visible');
        const msg = status.querySelector('.msg');
        if (msg) {
          msg.textContent =
            'Your message is ready. Your email client will open in a moment — review and hit send to deliver it to ' + TARGET_EMAIL + '.';
        }
      }

      // Open the user's mail client
      window.location.href = mailto;
    });

    // Clear error state when the user starts typing again
    form.querySelectorAll('.field input, .field textarea, .field select').forEach(function (input) {
      input.addEventListener('input', function () {
        const field = input.closest('.field');
        if (field) field.classList.remove('is-error');
      });
    });
  }

  document.querySelectorAll('form[data-static-form]').forEach(wireForm);


  /* ============== 4. MARK ACTIVE NAV LINK ============== */
  // Highlight the link that matches the current page in both
  // the desktop nav and the mobile menu.
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a, .mobile-menu nav a').forEach(function (a) {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      a.classList.add('is-active');
    }
  });

})();
