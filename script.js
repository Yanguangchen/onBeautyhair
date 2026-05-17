/* ============================================
   ON Hair Salon & Beauty — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavbar();
  initMobileNav();
  initReveal();
  initCdcEligibilityModal();
  initBookingModal();
  initBookingForm();
  initFaqAccordion();
  initGallery();
  initLightbox();
  initMinDate();
  initScrollProgress();
  initHeroParallax();
  initMouseParallax();
  initMagneticButtons();
  initButtonRipple();
  initTiltCards();
  initCounters();
  initWhatsAppEnhancements();
});

/* ----- CDC eligibility modal ----- */
function initCdcEligibilityModal() {
  const modal = document.getElementById('cdcEligibilityModal');
  if (!modal) return;

  const open = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-close-cdc]').forEach(btn => btn.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  window.setTimeout(open, 350);
}

/* ----- WhatsApp Greeting Bubble ----- */
function initWhatsAppEnhancements() {
  const wa = document.querySelector('.wa-float');
  if (!wa) return;

  // Create the bubble if it doesn't exist
  if (!wa.querySelector('.wa-bubble')) {
    const bubble = document.createElement('div');
    bubble.className = 'wa-bubble';
    bubble.innerHTML = `
      <strong>Concierge</strong>
      Need a bespoke recommendation or help booking? Chat with us.
    `;
    wa.appendChild(bubble);

    // Show after delay
    setTimeout(() => {
      bubble.classList.add('active');
    }, 3500);

    // Close on interaction
    wa.addEventListener('click', () => {
      bubble.classList.remove('active');
    });
  }
}

/* ----- Footer year ----- */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ----- Sticky navbar shadow ----- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ----- Mobile nav (glassmorphic full-screen overlay) ----- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

    // Inject the mobile menu footer (contact) once
    if (!links.querySelector('.nav-mobile-foot')) {
      const foot = document.createElement('div');
      foot.className = 'nav-mobile-foot';
      foot.innerHTML = `
        <p class="nav-foot-eyebrow">Reach us</p>
        <p class="nav-foot-locations"><span translate="no">Jalan Bukit Merah</span>, <span translate="no">Bukit Merah Central</span> &amp; <span translate="no">Bedok North</span></p>
        <div class="nav-foot-actions">
          <a href="tel:+6582755130" class="nav-foot-btn">
            <i class="fa-solid fa-phone"></i> +65 8275 5130
          </a>
          <a href="https://wa.me/6582755130" target="_blank" rel="noopener" class="nav-foot-btn nav-foot-wa">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      `;
      links.appendChild(foot);
    }

  // Accessibility attributes
  toggle.setAttribute('aria-controls', 'navLinks');
  toggle.setAttribute('aria-expanded', 'false');
  
  const updateAria = () => {
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    if (isMobile) {
      links.setAttribute('aria-hidden', String(!links.classList.contains('open')));
    } else {
      links.removeAttribute('aria-hidden');
    }
  };
  
  updateAria();
  window.addEventListener('resize', updateAria);

  let lockedScrollY = 0;

  const lockPageScroll = () => {
    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  };

  const unlockPageScroll = () => {
    // Disable smooth scroll temporarily to prevent disorienting "fly-back" animation
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, lockedScrollY);

    // Restore original scroll behavior
    document.documentElement.style.scrollBehavior = scrollBehavior;
  };

  const setOpen = (isOpen) => {
    const wasOpen = links.classList.contains('open');
    if (isOpen === wasOpen) return;

    toggle.classList.toggle('open', isOpen);
    links.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    if (isOpen) {
      lockPageScroll();
    } else {
      unlockPageScroll();
    }
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    updateAria();
  };

  toggle.addEventListener('click', () => setOpen(!toggle.classList.contains('open')));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) setOpen(false);
  });

  // Close menu if user resizes back to desktop layout
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 721px)').matches && links.classList.contains('open')) {
      setOpen(false);
    }
  });
}

/* ----- FAQ accordion animation ----- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  items.forEach(item => {
    const summary = item.querySelector('summary');
    if (!summary) return;

    if (item.open) item.classList.add('is-open');

    summary.addEventListener('click', (e) => {
      if (reduceMotion.matches) return;
      e.preventDefault();
      if (item.dataset.animating === 'true') return;

      item.dataset.animating = 'true';
      item.classList.add('is-animating');

      const startHeight = `${item.offsetHeight}px`;
      const summaryHeight = `${summary.offsetHeight}px`;

      const finish = () => {
        item.dataset.animating = 'false';
        item.classList.remove('is-animating');
        item.style.height = '';
        item.style.overflow = '';
      };

      if (item.open) {
        item.style.height = startHeight;
        item.offsetHeight;
        item.classList.remove('is-open');
        requestAnimationFrame(() => {
          item.style.height = summaryHeight;
        });
        item.addEventListener('transitionend', function onClose(ev) {
          if (ev.propertyName !== 'height') return;
          item.removeEventListener('transitionend', onClose);
          item.open = false;
          finish();
        });
      } else {
        item.open = true;
        item.style.height = summaryHeight;
        item.offsetHeight;
        item.classList.add('is-open');
        requestAnimationFrame(() => {
          item.style.height = `${item.scrollHeight}px`;
        });
        item.addEventListener('transitionend', function onOpen(ev) {
          if (ev.propertyName !== 'height') return;
          item.removeEventListener('transitionend', onOpen);
          finish();
        });
      }
    });
  });
}

/* ----- Scroll reveal animations ----- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => io.observe(el));
}

/* ----- Booking modal ----- */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  const open = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-open-booking]').forEach(btn => btn.addEventListener('click', open));
  document.querySelectorAll('[data-close-booking]').forEach(btn => btn.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
}

/* ----- Booking form ----- */
function initBookingForm() {
  const forms = document.querySelectorAll('#bookingForm');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : '';

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      }

      setTimeout(() => {
        if (status) {
          status.hidden = false;
          status.textContent = 'Thank you! We received your booking request and will confirm shortly.';
        }
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
        setTimeout(() => { if (status) status.hidden = true; }, 6000);
      }, 900);
    });
  });
}

/* ----- Gallery filtering ----- */
function initGallery() {
  const filters = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!filters.length || !items.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        const matches = cat === 'all' || item.dataset.category === cat;
        item.classList.toggle('hidden', !matches);
      });
    });
  });
}

/* ----- Lightbox ----- */
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  if (!items.length || !lightbox) return;

  const img = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let current = 0;

  const visibleItems = () => Array.from(items).filter(i => !i.classList.contains('hidden'));

  const show = (idx) => {
    const list = visibleItems();
    if (!list.length) return;
    current = (idx + list.length) % list.length;
    const src = list[current].dataset.full || extractBg(list[current]);
    img.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const extractBg = (el) => {
    const bg = el.style.backgroundImage || getComputedStyle(el).backgroundImage;
    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : '';
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  items.forEach((item, i) => item.addEventListener('click', () => show(i)));
  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => show(current - 1));
  nextBtn?.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}

/* ----- Date input minimum = today ----- */
function initMinDate() {
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => input.setAttribute('min', today));
}

/* ----- Scroll progress bar ----- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

/* ----- Hero scroll + mouse parallax (unified via CSS variables) ----- */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const content = hero.querySelector('[data-parallax-content]');

  let scrollY = 0;
  let ticking = false;

  const apply = () => {
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(scrollY / heroHeight, 1);

    hero.style.setProperty('--scroll-y', `${scrollY}px`);
    hero.style.setProperty('--scroll-progress', String(progress));

    if (content) {
      content.style.transform = `translate3d(0, ${scrollY * 0.28}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - progress * 1.2));
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(apply);
      ticking = true;
    }
  }, { passive: true });
  apply();
}

/* ----- Mouse-move parallax inside the hero (CSS variables only) ----- */
function initMouseParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mx = 0, my = 0;
  let tx = 0, ty = 0;
  let rafId = null;
  let active = false;

  const tick = () => {
    tx += (mx - tx) * 0.08;
    ty += (my - ty) * 0.08;
    hero.style.setProperty('--mouse-x', tx.toFixed(3));
    hero.style.setProperty('--mouse-y', ty.toFixed(3));

    if (Math.abs(mx - tx) > 0.001 || Math.abs(my - ty) > 0.001 || active) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  };

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    active = true;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  hero.addEventListener('mouseleave', () => {
    mx = 0; my = 0;
    active = false;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });
}

/* ----- Magnetic buttons + glow tracking ----- */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');
  if (window.matchMedia('(hover: none)').matches) return;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      btn.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
      btn.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      btn.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ----- Ripple effect on every .btn click ----- */
function initButtonRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 0.5;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

/* ----- 3D tilt on cards ----- */
function initTiltCards() {
  const cards = document.querySelectorAll('.service-card, .value-card, .float-card');
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotY = (x - 0.5) * 8;
      const rotX = (0.5 - y) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ----- Animated counters for hero stats ----- */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '+';
    const duration = 1600;
    const start = performance.now();
    const startVal = 0;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startVal + (target - startVal) * eased);
      el.textContent = value.toLocaleString('en-US') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}
