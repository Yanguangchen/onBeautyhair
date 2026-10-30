/* ============================================
   ON Hair Salon & Beauty — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCustomChineseCopy();
  initProtectedCurrency();
  initYear();
  initNavbar();
  initMobileNav();
  initReveal();
  initScrollStages();
  initCdcEligibilityModal();
  initBookingModal();
  initBookingForm();
  initContactActionMenus();
  initFaqAccordion();
  initGallery();
  initLightbox();
  initMinDate();
  initScrollProgress();
  initHeroMotion();
  initMouseParallax();
  initHeroImageCarousel();
  initMagneticButtons();
  initButtonRipple();
  initTiltCards();
  initCounters();
  initWhatsAppEnhancements();
  initSocialLinks();
  initBotpressLoader();
  initBotpressLiveAgentNudge();
});

/* ----- Custom copy for Chinese browser/page translation ----- */
function initCustomChineseCopy() {
  const customTextNodes = document.querySelectorAll('[data-zh-text]');
  if (!customTextNodes.length) return;

  const translatedCopyPattern = /美容圣地|轻松无压力|独一无二的你|沙龙笔记日常自信/;

  const shouldUseChinese = () => {
    const lang = `${document.documentElement.lang || ''} ${document.body.className || ''}`.toLowerCase();
    const hash = decodeURIComponent(window.location.hash || '').toLowerCase();
    const cookie = decodeURIComponent(document.cookie || '').toLowerCase();

    return (
      lang.includes('zh') ||
      hash.includes('zh-cn') ||
      hash.includes('zh-tw') ||
      cookie.includes('/zh-cn') ||
      cookie.includes('/zh-tw') ||
      // Reading the whole page text is expensive, so only do it as a last resort
      translatedCopyPattern.test(document.body.textContent || '')
    );
  };

  const applyCustomText = () => {
    if (!shouldUseChinese()) return;
    customTextNodes.forEach(el => {
      if (el.textContent !== el.dataset.zhText) {
        el.textContent = el.dataset.zhText;
      }
    });
  };

  const watch = () => {
    if (shouldUseChinese()) applyCustomText();
  };

  watch();
  window.setTimeout(watch, 500);
  window.setTimeout(watch, 1500);

  if (!('MutationObserver' in window)) return;

  // Google Translate changes the document language. Watching the whole body
  // on every animation frame is expensive, so only do that after a translation signal.
  let bodyWatchStarted = false;
  const startBodyWatch = () => {
    if (bodyWatchStarted) return;
    bodyWatchStarted = true;
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (shouldUseChinese()) applyCustomText();
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  };

  const langObserver = new MutationObserver(() => {
    if (!shouldUseChinese()) return;
    applyCustomText();
    startBodyWatch();
  });
  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'class']
  });

  if (shouldUseChinese()) startBodyWatch();
}

/* ----- Keep SGD prices from being browser-translated as USD ----- */
function initProtectedCurrency() {
  const currencyPattern = /S\$\d[\d,]*(?:\s*-\s*S\$\d[\d,]*)?\+?/g;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!currencyPattern.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      currencyPattern.lastIndex = 0;

      const parent = node.parentElement;
      if (!parent || parent.closest('[translate="no"], script, style, noscript, textarea')) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    node.nodeValue.replace(currencyPattern, (match, offset) => {
      if (offset > lastIndex) {
        fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, offset)));
      }

      const span = document.createElement('span');
      span.setAttribute('translate', 'no');
      span.textContent = match;
      fragment.appendChild(span);
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < node.nodeValue.length) {
      fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  });
}

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
function getContactHref(root = document) {
  const links = Array.from(root.querySelectorAll('a'));
  const contactLink = links.find((link) => (
    link.textContent.trim().toLowerCase() === 'contact'
    && (link.getAttribute('href') || '').endsWith('contact.html')
  ));

  return contactLink ? contactLink.getAttribute('href') : 'contact.html';
}

function initWhatsAppEnhancements() {
  const wa = document.querySelector('.wa-float');
  if (!wa) return;

  const contactHref = getContactHref();
  wa.setAttribute('href', contactHref);
  wa.removeAttribute('target');
  wa.removeAttribute('rel');
  wa.setAttribute('aria-label', 'View WhatsApp contacts');

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

function initSocialLinks() {
  const instagramUrl = 'https://www.instagram.com/onhair_salon_beauty/';
  document.querySelectorAll('.footer-links').forEach((links) => {
    if (links.querySelector('a[href*="instagram.com/onhair_salon_beauty"]')) return;
    const item = document.createElement('li');
    item.innerHTML = `<a href="${instagramUrl}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i> Instagram</a>`;
    links.appendChild(item);
  });
}

/* ----- Botpress webchat loader -----
   The widget scripts are heavy, so they load after the page has finished
   loading (or immediately if the visitor clicks the live agent nudge). */
let botpressLoading = null;

function loadBotpress() {
  if (botpressLoading) return botpressLoading;

  const holder = document.querySelector('[data-botpress-src]');
  if (!holder) return Promise.resolve();

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

  botpressLoading = loadScript(holder.dataset.botpressSrc)
    .then(() => holder.dataset.botpressConfig && loadScript(holder.dataset.botpressConfig))
    .catch(() => {});
  return botpressLoading;
}

function initBotpressLoader() {
  if (!document.querySelector('[data-botpress-src]')) return;

  const schedule = () => {
    // Keep the chat widget off the critical path. A click on the nudge loads it immediately.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadBotpress, { timeout: 15000 });
    } else {
      window.setTimeout(loadBotpress, 12000);
    }
  };

  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
}

/* ----- Botpress live agent nudge ----- */
function initBotpressLiveAgentNudge() {
  const nudge = document.getElementById('botpressLiveAgentNudge');
  if (!nudge) return;

  window.setTimeout(() => {
    nudge.classList.add('is-visible');
  }, 1800);

  const openBotpress = async () => {
    nudge.classList.add('is-dismissed');
    await loadBotpress();

    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
      return;
    }

    if (window.botpress && typeof window.botpress.toggle === 'function') {
      window.botpress.toggle();
      return;
    }

    const botpressButton = Array.from(document.querySelectorAll('[class*="bpFab"], [aria-label*="Botpress"], [aria-label*="chat" i]'))
      .find(el => el !== nudge && !nudge.contains(el));
    if (botpressButton && typeof botpressButton.click === 'function') {
      botpressButton.click();
    }
  };

  nudge.addEventListener('click', openBotpress);

  window.setTimeout(() => {
    if (!nudge.matches(':hover, :focus-visible')) {
      nudge.classList.add('is-resting');
    }
  }, 9000);
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
      const contactHref = getContactHref(links);
      const foot = document.createElement('div');
      foot.className = 'nav-mobile-foot';
      foot.innerHTML = `
        <p class="nav-foot-eyebrow">Reach us</p>
        <p class="nav-foot-locations"><span translate="no">Toa Payoh</span>, <span translate="no">Simei</span>, <span translate="no">Bukit Merah</span>, <span translate="no">Yishun</span>, <span translate="no">Ang Mo Kio</span>, <span translate="no">Bedok</span>, <span translate="no">Serangoon</span></p>
        <div class="nav-foot-actions">
          <a href="tel:+6569805784" class="nav-foot-btn">
            <i class="fa-solid fa-phone"></i> +65 6980 5784
          </a>
          <a href="${contactHref}" class="nav-foot-btn nav-foot-wa" aria-label="View WhatsApp contacts">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
          <a href="https://www.instagram.com/onhair_salon_beauty/" target="_blank" rel="noopener" class="nav-foot-btn" aria-label="Follow On Hair Salon and Beauty on Instagram">
            <i class="fa-brands fa-instagram"></i> Instagram
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

/* ----- Outlet contact action dropdowns ----- */
function initContactActionMenus() {
  const menus = document.querySelectorAll('[data-contact-action-menu]');
  if (!menus.length) return;

  const closeMenu = (menu) => {
    const toggle = menu.querySelector('[data-contact-action-toggle]');
    menu.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  };

  const closeOtherMenus = (currentMenu) => {
    menus.forEach(menu => {
      if (menu !== currentMenu) closeMenu(menu);
    });
  };

  menus.forEach((menu, index) => {
    const toggle = menu.querySelector('[data-contact-action-toggle]');
    const list = menu.querySelector('[data-contact-action-list]');
    if (!toggle || !list) return;

    const listId = list.id || `contact-action-menu-${index + 1}`;
    list.id = listId;
    toggle.setAttribute('aria-controls', listId);
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      const willOpen = !menu.classList.contains('is-open');
      closeOtherMenus(menu);
      menu.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-contact-action-menu]')) return;
    menus.forEach(closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    menus.forEach(closeMenu);
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

  items.forEach(item => {
    item.addEventListener('click', () => show(visibleItems().indexOf(item)));
  });
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

/* ----- Scroll stages: the home hero and the reviews -----
   html.stage-motion is set in <head> when motion is allowed. CSS pins each
   stage's layers under the navbar (position: sticky) and a runway sets how long
   they stay pinned; here, scroll distance into a stage is mapped onto keyframed
   poses. Layout is measured on resize; each frame reads only where its stage
   sits on screen, then writes transform and opacity. */
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const progressBetween = (v, start, end) => (end > start ? clamp01((v - start) / (end - start)) : Number(v >= end));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
// Frame-rate independent ease toward a target, for a little inertia on scroll.
const follow = (current, target, dt, rate) => current + (target - current) * (1 - Math.exp(-rate * dt));
// Card i of n starts its part of a transition slightly after card i - 1.
const staggered = (t, i, n, spread) => clamp01((t - (n > 1 ? i / (n - 1) : 0) * spread) / (1 - spread));

const mixPose = (a, b, t) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  r: lerp(a.r, b.r, t),
  s: lerp(a.s, b.s, t),
  o: lerp(a.o, b.o, t)
});
const poseTransform = (p) =>
  `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.r.toFixed(2)}deg) scale(${p.s.toFixed(3)})`;
const SETTLED_POSE = { x: 0, y: 0, r: 0, s: 1, o: 1 };

// Fixed nudges so a stacked deck reads as a loose pile rather than one card.
const STACK_JITTER = [
  { x: 0, y: 0, r: -2 },
  { x: 7, y: -6, r: 3.5 },
  { x: -8, y: -11, r: -5 },
  { x: 5, y: -16, r: 6 },
  { x: -5, y: -20, r: -3.5 },
  { x: 9, y: -24, r: 4.5 },
  { x: -9, y: -27, r: -6 },
  { x: 4, y: -30, r: 2.5 },
  { x: -3, y: -33, r: -1.5 }
];

function offsetWithin(el, ancestor) {
  let x = 0;
  let y = 0;
  for (let node = el; node && node !== ancestor; node = node.offsetParent) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
}

/* Wraps each word of a plain-text element in a span, keeping the spaces between
   them as text so line wrapping and what screen readers hear stay the same. */
function splitWords(el) {
  const text = el.textContent.trim().replace(/\s+/g, ' ');
  el.textContent = '';
  return text.split(' ').map((word, i) => {
    if (i) el.append(' ');
    const span = document.createElement('span');
    span.className = 'reveal-word';
    span.textContent = word;
    el.append(span);
    return { el: span, key: -1 };
  });
}

/* A deck's final layout is its CSS layout (no transform). From each card's place
   in it, work out the offsets that pile every card on `anchor` (stack) and that
   spread them along an arc around it (fan). */
function deckPoses(cards, container, anchor, fan) {
  const n = cards.length;
  const lift = fan.radius * (1 - Math.cos(fan.spread * Math.PI / 180)) / 2;
  return cards.map((card, i) => {
    const { x, y } = offsetWithin(card, container);
    const cx = x + card.offsetWidth / 2;
    const cy = y + card.offsetHeight / 2;
    const jitter = STACK_JITTER[i % STACK_JITTER.length];
    const angle = n > 1 ? (i / (n - 1) - 0.5) * 2 * fan.spread : 0;
    const rad = angle * Math.PI / 180;
    return {
      stack: { x: anchor.x + jitter.x - cx, y: anchor.y + jitter.y - cy, r: jitter.r, s: fan.stackScale, o: 1 },
      fan: {
        x: anchor.x + fan.radius * Math.sin(rad) - cx,
        y: anchor.y + fan.radius * (1 - Math.cos(rad)) - lift - cy,
        r: angle,
        s: fan.scale,
        o: 1
      }
    };
  });
}

/* Calls frame(dt) on every animation frame while target is on screen. */
function runWhileVisible(target, frame) {
  let rafId = null;
  let last = 0;
  const tick = (now) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    frame(dt);
    rafId = requestAnimationFrame(tick);
  };
  const start = () => {
    if (rafId) return;
    last = 0;
    rafId = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  };

  if (!('IntersectionObserver' in window)) {
    start();
    return;
  }
  new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) start();
    else stop();
  }).observe(target);
}

/* The storefront cards and glints circle the pole on a tilted ellipse. These
   numbers match .orbit-ring and .pole-stripes in styles.css. */
const POLE_ORBIT = { cx: 300, cy: 300, rx: 196, ry: 54, tilt: -8 * Math.PI / 180 };
const POLE_STRIPE_PERIOD = 103.923;

function createPoleOrbit(scene) {
  const cards = [...scene.querySelectorAll('[data-orbit-card]')];
  const glints = [...scene.querySelectorAll('[data-orbit-glint]')];
  const items = [
    ...cards.map((el, i) => ({ el, offset: (i / cards.length) * Math.PI * 2, bob: 7, fade: true })),
    ...glints.map((el, i) => ({ el, offset: ((i + 0.5) / glints.length) * Math.PI * 2, bob: 3, fade: false }))
  ];
  const stripes = scene.querySelector('.pole-stripes');
  const cosTilt = Math.cos(POLE_ORBIT.tilt);
  const sinTilt = Math.sin(POLE_ORBIT.tilt);
  scene.classList.add('is-orbiting');

  return (angle, time, spin) => {
    items.forEach((item, i) => {
      if (!item.w) {
        item.w = item.el.offsetWidth;
        item.h = item.el.offsetHeight;
      }
      const a = angle + item.offset;
      const depth = Math.cos(a); // 1 = nearest the viewer
      const ex = POLE_ORBIT.rx * Math.sin(a);
      const ey = POLE_ORBIT.ry * depth + Math.sin(time * 0.9 + i * 1.7) * item.bob;
      const x = POLE_ORBIT.cx + ex * cosTilt - ey * sinTilt - item.w / 2;
      const y = POLE_ORBIT.cy + ex * sinTilt + ey * cosTilt - item.h / 2;
      const scale = 0.74 + 0.13 * (depth + 1);
      item.el.style.transform =
        `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateY(${(Math.sin(a) * 32).toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      // The pole sits at z-index 10: the near half of the orbit passes in front of it.
      item.el.style.zIndex = String(depth >= 0 ? 12 + Math.round(depth * 8) : 9 - Math.round(-depth * 8));
      if (item.fade) item.el.style.opacity = (0.5 + 0.25 * (depth + 1)).toFixed(3);
    });
    if (stripes) stripes.style.translate = `0 ${(-(spin % POLE_STRIPE_PERIOD)).toFixed(1)}px`;
  };
}

/* Hero: the copy scrolls away while the pole glides into centre stage; then the
   promise cards rise as a stack, fan out and spread into a row beneath it. */
function createHeroStage() {
  const hero = document.getElementById('hero');
  const scene = hero && hero.querySelector('[data-hero-scene]');
  if (!scene) return null;

  const renderOrbit = createPoleOrbit(scene);
  if (!document.documentElement.classList.contains('stage-motion')) {
    renderOrbit(-0.5, 0, 0);
    return null;
  }

  const visual = hero.querySelector('.hero-visual');
  const slot = hero.querySelector('[data-hero-slot]');
  const strip = hero.querySelector('.trust-strip');
  const deck = hero.querySelector('.trust-deck');
  const cards = deck ? [...deck.querySelectorAll('.trust-card')] : [];
  const runway = hero.querySelector('.hero-runway');
  const cue = hero.querySelector('.scroll-cue');
  const copy = [...hero.querySelectorAll('.hero-text > *')];
  if (!visual || !slot || !strip || !cards.length || !runway) return null;

  // The subtitle starts ghosted; its words ease in over the first stretch of scroll.
  const subtitle = hero.querySelector('.hero-subtitle');
  const words = subtitle ? splitWords(subtitle) : [];
  const WORD_WINDOW = 5;

  const SCENE = { w: 600, h: 660 };
  let m = null;
  let smooth = null;
  let clock = 0;

  const measure = () => {
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
    const pinH = visual.offsetHeight;
    const vw = visual.offsetWidth;
    const split = window.matchMedia('(min-width: 961px)').matches;
    const visualBox = visual.getBoundingClientRect();
    const slotBox = slot.getBoundingClientRect();
    const natural = {
      x: slotBox.left - visualBox.left + slotBox.width / 2,
      y: slotBox.top - visualBox.top + slotBox.height / 2
    };

    // Scene poses: beside the copy (or below the fold on narrow screens), centre
    // stage, then lifted and shrunk to make room for the cards.
    const centre = Math.min(1.15, (pinH * 0.9) / SCENE.h, (vw * 0.94) / SCENE.w);
    const home = split
      ? { x: natural.x, y: natural.y, r: 0, s: Math.min(centre, (slotBox.width * 1.05) / SCENE.w, (pinH * 0.92) / SCENE.h), o: 1 }
      : { x: vw / 2, y: pinH + SCENE.h * centre * 0.25, r: 0, s: centre * 0.85, o: 0 };
    const stage = { x: vw / 2, y: pinH / 2, r: 0, s: centre, o: 1 };
    const aside = {
      x: vw / 2,
      y: deck.offsetTop / 2 + 6,
      r: 0,
      s: Math.max(0.3, Math.min(centre, (deck.offsetTop - 16) / SCENE.h)),
      o: 1
    };

    // Each line of copy stays solid until its bottom edge nears the top of the
    // stage, then fades as it slides under the navbar.
    const copyBoxes = copy.map((el) => {
      const bottom = offsetWithin(el, hero).y + el.offsetHeight;
      return { el, bottom, zone: Math.max(1, Math.min(pinH * 0.28, bottom)) };
    });
    const copyEnd = Math.max(pinH * 0.5, ...copyBoxes.map(box => box.bottom));
    // ...and the subtitle has fully arrived before its own fade-out begins.
    const subtitleBox = copyBoxes.find(box => box.el === subtitle);
    const revealEnd = subtitleBox
      ? Math.max(pinH * 0.12, Math.min(pinH * 0.34, subtitleBox.bottom - subtitleBox.zone))
      : 0;

    const glideStart = Math.max(0, copyEnd - pinH * 0.8);
    const glideEnd = Math.max(glideStart + pinH * 0.45, copyEnd - pinH * 0.08);
    const dealStart = glideEnd + pinH * 0.2;
    const dealEnd = dealStart + pinH * 0.45;
    const fanEnd = dealEnd + pinH * 0.4;
    const spreadEnd = fanEnd + pinH * 0.5;
    runway.style.height = `${Math.round(spreadEnd + pinH * 0.2 + pinH)}px`;

    const anchor = { x: vw / 2, y: deck.offsetTop + deck.offsetHeight / 2 };
    const cardW = cards[0].offsetWidth;
    const poses = deckPoses(cards, strip, anchor, split
      ? { spread: 14, radius: Math.max(cardW * 3, 760), scale: 0.94, stackScale: 0.9 }
      : { spread: 16, radius: cardW * 2.4, scale: 0.9, stackScale: 0.92 });
    poses.forEach((pose, i) => {
      pose.hidden = { ...pose.stack, y: pose.stack.y + pinH * 0.65 + i * 24, r: pose.stack.r * 3, o: 0 };
    });
    cards.forEach((card, i) => { card.style.zIndex = String(cards.length - i); });

    m = { navH, natural, home, stage, aside, copy: copyBoxes, revealEnd, poses, glideStart, glideEnd, dealStart, dealEnd, fanEnd, spreadEnd };
  };

  const render = (scrolled, eased) => {
    m.copy.forEach(({ el, bottom, zone }) => {
      const o = clamp01((bottom - scrolled) / zone);
      el.style.opacity = o < 1 ? o.toFixed(3) : '';
    });
    if (cue) cue.style.opacity = String(1 - progressBetween(scrolled, 0, 140));

    // Words light up in reading order, each easing over a window of a few words.
    const reveal = m.revealEnd ? clamp01(eased / m.revealEnd) : 1;
    words.forEach((word, i) => {
      const e = easeOut(clamp01((reveal * (words.length + WORD_WINDOW) - i) / WORD_WINDOW));
      const key = Math.round(e * 500);
      if (word.key === key) return;
      word.key = key;
      word.el.style.opacity = e < 1 ? (0.16 + 0.84 * e).toFixed(3) : '';
      word.el.style.transform = e < 1 ? `translate3d(0, ${((1 - e) * 8).toFixed(1)}px, 0)` : '';
    });

    const glide = easeInOut(progressBetween(eased, m.glideStart, m.glideEnd));
    const deal = progressBetween(eased, m.dealStart, m.dealEnd);
    const pose = mixPose(mixPose(m.home, m.stage, glide), m.aside, easeInOut(deal));
    scene.style.transform =
      `translate3d(${(pose.x - m.natural.x).toFixed(1)}px, ${(pose.y - m.natural.y).toFixed(1)}px, 0) scale(${pose.s.toFixed(4)})`;
    scene.style.opacity = pose.o < 1 ? pose.o.toFixed(3) : '';

    const fan = easeInOut(progressBetween(eased, m.dealEnd, m.fanEnd));
    const spread = progressBetween(eased, m.fanEnd, m.spreadEnd);
    const n = cards.length;
    cards.forEach((card, i) => {
      const p = m.poses[i];
      let cardPose;
      if (spread > 0) cardPose = mixPose(p.fan, SETTLED_POSE, easeInOut(staggered(spread, i, n, 0.3)));
      else if (fan > 0) cardPose = mixPose(p.stack, p.fan, fan);
      // The bottom card lands first, the top card last.
      else cardPose = mixPose(p.hidden, p.stack, easeOut(staggered(deal, n - 1 - i, n, 0.45)));
      card.style.transform = poseTransform(cardPose);
      card.style.opacity = cardPose.o.toFixed(3);
    });
  };

  runWhileVisible(hero, (dt) => {
    if (!m) return;
    const scrolled = Math.max(0, m.navH - hero.getBoundingClientRect().top);
    smooth = smooth === null ? scrolled : follow(smooth, scrolled, dt, 9);
    clock += dt;
    render(scrolled, smooth);
    // Only scrolling turns the orbit (a full revolution for every ~1200px) and
    // spins the stripes.
    renderOrbit(0.35 + smooth * (Math.PI * 2 / 1200), clock, smooth * 0.6);
  });

  return { measure, resizeTarget: hero.querySelector('.hero-text') };
}

/* Reviews: a stacked deck when the section arrives, fanned out as it pins, then
   dealt into a 3-column grid (or, where that cannot fit, a swipeable row). */
function createReviewStage() {
  const section = document.querySelector('[data-review-stage]');
  if (!section || !document.documentElement.classList.contains('stage-motion')) return null;

  const pin = section.querySelector('.review-pin');
  const area = section.querySelector('.review-area');
  const track = section.querySelector('.testimonial-track');
  const runway = section.querySelector('.review-runway');
  const cards = track ? [...track.querySelectorAll('.testimonial')] : [];
  if (!pin || !area || !runway || !cards.length) return null;

  let m = null;
  let smooth = null;
  let settled = false;
  let heldScroll = 0;

  const setLayout = (layout) => {
    section.classList.toggle('is-grid', layout === 'grid');
    section.classList.toggle('is-carousel', layout === 'carousel');
  };

  // Settled cards drop their transforms, so hover works and the row can scroll.
  // Leaving that state keeps the row's scroll offset in the cards' poses.
  const settle = (on) => {
    if (on === settled) return;
    settled = on;
    if (on) {
      cards.forEach((card) => { card.style.transform = ''; });
      section.classList.add('is-settled');
      if (heldScroll) track.scrollLeft = heldScroll;
    } else {
      heldScroll = section.classList.contains('is-carousel') ? track.scrollLeft : 0;
      section.classList.remove('is-settled');
    }
  };

  const measure = () => {
    settle(false);
    heldScroll = 0;
    track.style.transform = '';
    const vw = document.documentElement.clientWidth;
    let layout = vw >= 1024 ? 'grid' : 'carousel';
    setLayout(layout);
    let fit = 1;
    if (layout === 'grid') {
      fit = Math.min(1, area.clientHeight / track.offsetHeight);
      if (fit < 0.78) {
        layout = 'carousel';
        fit = 1;
        setLayout(layout);
      }
    }
    if (fit < 1) track.style.transform = `scale(${fit.toFixed(3)})`;

    const wide = vw >= 1024;
    const reach = wide ? Math.min(vw * 0.34, 520) / fit : Math.min(vw * 0.3, 260);
    const spread = wide ? 18 : 28;
    const pinH = pin.offsetHeight;
    const length = Math.round(pinH * (wide ? 1.6 : 1.4));
    runway.style.height = `${length}px`;
    cards.forEach((card, i) => { card.style.zIndex = String(cards.length - i); });

    m = {
      navH: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0,
      length,
      poses: deckPoses(cards, track, { x: track.clientWidth / 2, y: track.offsetHeight / 2 }, {
        spread,
        radius: reach / Math.sin(spread * Math.PI / 180),
        scale: wide ? 0.9 : 0.62,
        stackScale: wide ? 1 : 0.92
      })
    };
  };

  const render = (t) => {
    const out = progressBetween(t, 0.5, 0.92);
    if (out >= 1) {
      settle(true);
      return;
    }
    settle(false);
    const fan = easeInOut(progressBetween(t, 0.08, 0.45));
    const landed = { ...SETTLED_POSE, x: -heldScroll };
    cards.forEach((card, i) => {
      const p = m.poses[i];
      const pose = out > 0
        ? mixPose(p.fan, landed, easeInOut(staggered(out, i, cards.length, 0.4)))
        : mixPose(p.stack, p.fan, fan);
      card.style.transform = poseTransform(pose);
    });
  };

  const step = (direction) => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (cards[0].offsetWidth + gap), behavior: 'smooth' });
  };
  section.querySelector('[data-review-prev]')?.addEventListener('click', () => step(-1));
  section.querySelector('[data-review-next]')?.addEventListener('click', () => step(1));

  runWhileVisible(section, (dt) => {
    if (!m) return;
    const t = clamp01((m.navH - section.getBoundingClientRect().top) / m.length);
    smooth = smooth === null ? t : follow(smooth, t, dt, 10);
    render(smooth);
  });

  return { measure };
}

function initScrollStages() {
  const root = document.documentElement;
  const stages = [createHeroStage(), createReviewStage()].filter(Boolean);
  if (!stages.length) return;
  root.setAttribute('data-stage', 'ready');

  const nav = document.getElementById('navbar');
  // Stages run in page order: the reviews sit below the hero's runway.
  const measureAll = () => {
    if (nav) root.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
    stages.forEach(stage => stage.measure());
  };
  let queued = false;
  const queueMeasure = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      measureAll();
    });
  };

  measureAll();
  window.addEventListener('resize', queueMeasure);
  window.addEventListener('load', queueMeasure, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueMeasure);
  // The hero copy changes height when fonts swap in or the Chinese copy is applied.
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(queueMeasure);
    stages.forEach(stage => stage.resizeTarget && observer.observe(stage.resizeTarget));
  }
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

/* ----- About section storefront image carousel ----- */
function initHeroImageCarousel() {
  const carouselImages = document.querySelectorAll('.about-image-main[data-hero-images]');
  if (!carouselImages.length) return;

  carouselImages.forEach(imageEl => {
    const images = imageEl.dataset.heroImages
      .split(',')
      .map(src => src.trim())
      .filter(Boolean);

    if (images.length < 2) return;

    const cssUrl = src => `url("${src.replace(/"/g, '\\"')}")`;
    const transitionMs = 650;
    const intervalMs = 2200;
    let currentIndex = 0;
    let timerId = null;
    let transitionId = null;

    imageEl.style.backgroundImage = cssUrl(images[currentIndex]);

    // Warm the other slides only after the page has loaded, and never for a
    // hidden carousel.
    const preloadRest = () => {
      if (!imageEl.getClientRects().length) return;
      images.slice(1).forEach(src => {
        const preload = new Image();
        preload.src = src;
      });
    };
    if (document.readyState === 'complete') preloadRest();
    else window.addEventListener('load', preloadRest, { once: true });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const showNextImage = () => {
      if (document.hidden || imageEl.classList.contains('is-transitioning')) return;

      const nextIndex = (currentIndex + 1) % images.length;
      const nextImage = images[nextIndex];

      imageEl.style.setProperty('--hero-image-next', cssUrl(nextImage));
      imageEl.classList.add('is-transitioning');

      window.clearTimeout(transitionId);
      transitionId = window.setTimeout(() => {
        currentIndex = nextIndex;
        imageEl.style.backgroundImage = cssUrl(nextImage);
        imageEl.classList.remove('is-transitioning');
      }, transitionMs);
    };

    const start = () => {
      if (timerId) return;
      timerId = window.setInterval(showNextImage, intervalMs);
    };

    const stop = () => {
      if (!timerId) return;
      window.clearInterval(timerId);
      timerId = null;
    };

    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pagehide', stop);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        sync();
      }, { rootMargin: '200px' });
      observer.observe(imageEl);
    } else {
      inView = true;
      sync();
    }
  });
}

function initHeroMotion() {
  const hero = document.querySelector('.hero');
  if (!hero || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.some((entry) => entry.isIntersecting);
    document.body.classList.toggle('hero-offscreen', !visible);
  });
  observer.observe(hero);
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
