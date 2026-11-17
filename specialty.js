/* On Specialty Studio — scroll choreography for specialty-studio.html.
   Stand-alone: it does not depend on script.js. Every effect is opt-in via
   html.sp-motion, which the <head> sets unless prefers-reduced-motion is on. */
(() => {
  'use strict';

  window.__spBooted = true;

  const root = document.documentElement;
  const motion = root.classList.contains('sp-motion');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const year = $('#spYear');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Text splitting ---------- */
  $$('[data-hero-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'sp-char';
      span.style.setProperty('--i', el.dataset.heroSplit === 'right' ? i + 6 : i);
      span.textContent = ch;
      el.appendChild(span);
    });
    el.classList.add('is-split');
  });

  $$('[data-reveal-lines]').forEach(el => {
    Array.from(el.children).forEach(child => {
      const inner = document.createElement('span');
      inner.className = 'sp-line-inner';
      while (child.firstChild) inner.appendChild(child.firstChild);
      child.appendChild(inner);
    });
  });

  const manifesto = $('[data-words]');
  const words = [];
  if (manifesto) {
    const walk = (node, target) => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { target.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'sp-word';
            w.textContent = part;
            target.appendChild(w);
            words.push(w);
          });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const clone = child.cloneNode(false);
          walk(child, clone);
          target.appendChild(clone);
        }
      });
    };
    const frag = document.createDocumentFragment();
    walk(manifesto, frag);
    manifesto.textContent = '';
    manifesto.appendChild(frag);
  }

  /* ---------- Preloader ---------- */
  const loader = $('#spLoader');
  const ready = () => root.classList.add('is-ready');

  if (motion && loader) {
    const count = $('#spLoaderCount');
    const bar = $('.sp-loader-line span', loader);
    const duration = 1500;
    const start = performance.now();
    const tick = now => {
      const t = clamp((now - start) / duration);
      const e = easeInOut(t);
      if (count) count.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (bar) bar.style.transform = `scaleX(${e})`;
      if (t < 1) { requestAnimationFrame(tick); return; }
      loader.classList.add('is-leaving');
      setTimeout(ready, 650);
      setTimeout(() => loader.classList.add('is-done'), 1600);
    };
    requestAnimationFrame(tick);
  } else {
    ready();
  }

  /* ---------- Reveal on view ---------- */
  const revealTargets = $$('[data-reveal], [data-reveal-lines], .sp-cut');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Nav state + active section ---------- */
  const nav = $('#spNav');
  const navLinks = $$('.sp-nav-links a');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);

  /* ---------- Cached elements ---------- */
  const progressBar = $('#spProgress');
  const hero = $('.sp-hero');
  const heroLeft = $('[data-hero-split="left"]');
  const heroRight = $('[data-hero-split="right"]');
  const heroContent = $('.sp-hero-content');
  const heroNumeral = $('.sp-hero-numeral');
  const manifestoSection = $('.sp-manifesto');
  const marqueeRows = $$('[data-marquee]');
  const cuts = $('.sp-cuts');
  const cutsTrack = $('#spCutsTrack');
  const cutsBar = $('#spCutsBar');
  const cutIndex = $('#spCutIndex');
  const cutCards = $$('.sp-cut:not(.sp-cut-end)');
  const statement = $('.sp-statement');
  const statementPanel = $('#spStatementPanel');
  const statementParts = statementPanel ? $$('.sp-statement-text > *', statementPanel) : [];
  const steps = $$('[data-step]');

  const wideQuery = window.matchMedia('(min-width: 861px)');
  let vh = window.innerHeight;
  let vw = window.innerWidth;
  let cutsDistance = 0;
  let lastY = window.scrollY;

  const layoutCuts = () => {
    if (!cuts || !cutsTrack) return;
    const horizontal = motion && wideQuery.matches;
    cuts.classList.toggle('is-horizontal', horizontal);
    if (!horizontal) {
      cuts.style.height = '';
      cutsTrack.style.transform = '';
      cutsDistance = 0;
      return;
    }
    cutsDistance = Math.max(0, cutsTrack.scrollWidth - vw);
    cuts.style.height = `${vh + cutsDistance}px`;
  };

  const sectionProgress = (el, extra = 0) => {
    const rect = el.getBoundingClientRect();
    const span = rect.height - vh + extra;
    return span > 0 ? clamp(-rect.top / span) : (rect.top < 0 ? 1 : 0);
  };

  /* ---------- Scroll frame ---------- */
  let ticking = false;
  const marqueeState = marqueeRows.map(() => ({ x: 0 }));
  let lastTime = performance.now();

  const frame = now => {
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - vh;
    if (progressBar) progressBar.style.transform = `scaleX(${docH > 0 ? y / docH : 0})`;

    if (nav) {
      nav.classList.toggle('is-scrolled', y > 40);
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (goingDown && y > vh * 0.9) nav.classList.add('is-hidden');
      else if (goingUp || y < vh * 0.9) nav.classList.remove('is-hidden');
    }

    let current = null;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.5) current = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-active', i === current));

    if (motion) {
      // Hero: the title splits apart and the page lifts away.
      if (hero) {
        const p = clamp(y / (hero.offsetHeight || vh));
        const e = easeOut(p);
        if (heroLeft) heroLeft.style.transform = `translate3d(${-e * 18}vw,0,0)`;
        if (heroRight) heroRight.style.transform = `translate3d(${e * 18}vw,0,0)`;
        if (heroContent) heroContent.style.opacity = String(1 - clamp(p * 1.35));
        if (heroNumeral) heroNumeral.style.transform = `translate3d(0,${y * 0.35}px,0) scale(${1 + p * 0.25})`;
      }

      // Manifesto: words light up as the reader scrolls.
      if (manifestoSection && words.length) {
        const p = sectionProgress(manifestoSection);
        const lit = Math.round(clamp((p - 0.05) / 0.75) * words.length);
        words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
      }

      // Cuts: vertical scroll drives the horizontal track.
      if (cuts && cutsDistance > 0) {
        const rect = cuts.getBoundingClientRect();
        const p = clamp(-rect.top / cutsDistance);
        cutsTrack.style.transform = `translate3d(${-p * cutsDistance}px,0,0)`;
        if (cutsBar) cutsBar.style.transform = `scaleX(${p})`;
        if (cutIndex) cutIndex.textContent = String(Math.min(cutCards.length, 1 + Math.floor(p * cutCards.length * 0.999))).padStart(2, '0');
      }

      // Statement: a gold aperture opens to fill the screen.
      if (statement && statementPanel) {
        const p = sectionProgress(statement);
        const open = easeInOut(clamp(p / 0.55));
        const iy = 42 * (1 - open);
        const ix = 46 * (1 - open);
        statementPanel.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}%)`;
        const drift = 1 - easeOut(clamp((p - 0.1) / 0.6));
        if (statementParts[0]) statementParts[0].style.transform = `translate3d(${-drift * 30}vw,0,0)`;
        if (statementParts[1]) statementParts[1].style.transform = `scale(${0.6 + (1 - drift) * 0.4})`;
        if (statementParts[2]) statementParts[2].style.transform = `translate3d(${drift * 30}vw,0,0)`;
        statementPanel.style.backgroundPosition = `${p * 100}% 50%`;
      }

      // Marquee: steady drift, pushed along by scroll.
      const dt = Math.min(64, now - lastTime);
      const velocity = y - lastY;
      marqueeRows.forEach((row, i) => {
        const dir = Number(row.dataset.marquee) || 1;
        const half = row.scrollWidth / 2;
        if (!half) return;
        const s = marqueeState[i];
        s.x += (dt * 0.035 + Math.abs(velocity) * 0.6) * dir;
        const x = ((s.x % half) + half) % half;
        row.style.transform = `translate3d(${-x}px,0,0)`;
      });
    }

    // Ritual: steps light up as they reach the reading line.
    steps.forEach(step => {
      step.classList.toggle('is-active', step.getBoundingClientRect().top < vh * 0.62);
    });

    lastY = y;
    lastTime = now;
    ticking = false;
  };

  const requestFrame = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  };

  // The marquee drifts on its own, so keep a light loop running while it is on screen.
  if (motion && marqueeRows.length && 'IntersectionObserver' in window) {
    let marqueeVisible = false;
    const loop = () => {
      if (!marqueeVisible) return;
      requestFrame();
      requestAnimationFrame(loop);
    };
    new IntersectionObserver(entries => {
      const visible = entries.some(e => e.isIntersecting);
      if (visible && !marqueeVisible) { marqueeVisible = true; requestAnimationFrame(loop); }
      else if (!visible) marqueeVisible = false;
    }).observe(marqueeRows[0].parentElement);
  }

  const onResize = () => {
    vh = window.innerHeight;
    vw = window.innerWidth;
    layoutCuts();
    requestFrame();
  };

  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', onResize);
  if (wideQuery.addEventListener) wideQuery.addEventListener('change', onResize);
  window.addEventListener('load', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);
  layoutCuts();
  requestFrame();

  /* ---------- Cursor + magnetic buttons (fine pointers only) ---------- */
  if (motion && finePointer) {
    const cursor = $('#spCursor');
    const label = cursor && $('.sp-cursor-label', cursor);
    let mx = -100, my = -100, cx = -100, cy = -100;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (cursor) cursor.classList.add('is-visible');
    }, { passive: true });
    document.addEventListener('mouseleave', () => cursor && cursor.classList.remove('is-visible'));

    const follow = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      if (cursor) cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);

    document.addEventListener('mouseover', e => {
      if (!cursor) return;
      const labelled = e.target.closest('[data-cursor]');
      const interactive = e.target.closest('a, button, iframe');
      cursor.classList.toggle('is-label', Boolean(labelled));
      cursor.classList.toggle('is-hover', Boolean(interactive) && !labelled);
      if (labelled && label) label.textContent = labelled.dataset.cursor;
    });

    $$('.sp-magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate3d(${dx * 0.22}px,${dy * 0.32}px,0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), color 0.6s, border-color 0.6s';
        btn.style.transform = '';
        setTimeout(() => { btn.style.transition = ''; }, 800);
      });
    });
  }
})();
