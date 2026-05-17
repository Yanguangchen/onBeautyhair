# Project Context: On Hair Salon and Beauty

## Snapshot
- Project type: Static multi-page marketing site for a Singapore beauty salon.
- Stack: HTML5, CSS3, vanilla JavaScript.
- Build system: None (no framework, no bundler).
- Primary entry page: `index.html`.

## Visual System
- Tone: Premium editorial beauty branding.
- Core colors (CSS variables in `styles.css`):
  - `--cream` `#faf6f1`
  - `--blush` `#f5e1d8`
  - `--rose` `#b76e79`
  - `--rose-deep` `#8e4a55`
  - `--gold` `#c9a961`
  - `--espresso` `#2e1f1a`
  - `--charcoal` `#3a2820`
- Typography:
  - Google Fonts loaded in `index.html`: `Outfit`, `Google Sans`.
  - Active CSS font tokens currently resolve to `Outfit` for display/body/UI.

## Site Structure
- `index.html`: Home page (hero, trust strip, services preview, testimonials, FAQ preview, footer, modals).
- `services.html`: Services and pricing categories.
- `about.html`: Brand story and studio positioning.
- `gallery.html`: Filterable gallery with lightbox.
- `faq.html`: Accordion-style frequently asked questions.
- `contact.html`: Multi-outlet contact information.
- `styles.css`: Global design tokens, layout, components, responsive rules, animations.
- `script.js`: All interaction logic and progressive enhancements.

## Key Frontend Behaviors (`script.js`)
- Navbar scroll state and mobile nav overlay.
- Reveal-on-scroll animations via `IntersectionObserver`.
- CDC eligibility modal auto-open on page load (home page only).
- Booking modal open/close controls.
- Booking form simulated submit state and success status UI.
- Gallery category filtering and lightbox controls.
- Date input minimum set to current date.
- Scroll progress bar.
- Hero and mouse parallax effects.
- Magnetic button hover, ripple click effects, card tilt, animated counters.
- WhatsApp floating CTA enhancement with delayed helper bubble.

## Modals
- CDC eligibility modal:
  - Markup: `index.html` (`#cdcEligibilityModal`).
  - Styles: `styles.css` (`.cdc-modal-card`, `.cdc-modal-list`).
  - Behavior: `script.js` (`initCdcEligibilityModal()`).
  - UX: Opens shortly after page load; closes via close button, backdrop click, "Got It" button, or `Escape`.
- Booking modal:
  - Markup: `index.html` (`#bookingModal`).
  - Behavior: `script.js` (`initBookingModal()`).

## Third-Party Integrations
- Font Awesome 6 CDN for icons.
- Google Fonts CDN.
- WhatsApp deep links for booking/contact.
- Elfsight translator embed script in `index.html`.

## Content Notes
- Several service cards still use placeholder copy and pricing markers (`[ Service Title .. ]`, `From $ -`).
- Home page hero includes CDC voucher acceptance badge and now also a dedicated CDC eligibility popup.

## Recent Update (2026-05-17)
- Added a closable CDC eligibility modal that appears automatically on home page load.
- Files changed for this feature:
  - `index.html`
  - `styles.css`
  - `script.js`
