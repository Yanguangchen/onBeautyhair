# Project Context: On Hair Salon and Beauty

## Snapshot
- Project type: Static multi-page marketing site for a Singapore hair and beauty salon group with nine outlet listings.
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
- `contact.html`: Multi-outlet contact information, opening hours, directions, review links and maps.
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
- Google Maps links and iframe embeds for directions.

## Outlet Locations and Contacts
- Canonical current locations: Toa Payoh, Simei Eastpoint Mall, Simei Street 3, Bukit Merah Block 2, 163 bukit merah central, Clementi, Yishun Ring Road, Ang Mo Kio Avenue 10 and Bedok North Street 3.
- Toa Payoh: 109 Lorong 1 Toa Payoh, #01-306 and #02-306, Singapore 310109. Shop +65 6980 5765; WhatsApp +65 8192 0109.
- Simei Eastpoint Mall: Eastpoint Mall, #04-09.3, Simei Street 6, Singapore 528833. Phone/WhatsApp +65 9348 0188.
- Simei Street 3: Blk 248 Simei Street 3, #01-130, Singapore 520248. Phone/WhatsApp +65 8412 4961.
- Bukit Merah Block 2: Blk 2, Bukit Merah Central, #01-5156, Singapore 150002. Allen phone/WhatsApp +65 8309 9832.
- 163 bukit merah central: Blk 163, 163 bukit merah central, #02-3601, Singapore 150163. Allen phone/WhatsApp +65 8309 9832.
- Clementi: Clementi, Singapore. Allen phone/WhatsApp +65 8309 9832. Full street address is not currently listed.
- Yishun Ring Road: Blk 846, Yishun Ring Road, #01-3643, Singapore 760846. Phone/WhatsApp +65 8466 6738.
- Ang Mo Kio Avenue 10: Blk 449, Ang Mo Kio Avenue 10, #01-1721, Singapore 560449. Xiao Yang +65 6019 0752; Zoey +65 8336 9693. WhatsApp routes to Zoey.
- Bedok North Street 3: Bedok North Street 3, Singapore. Antony +65 8015 1136 and Vloon +65 8306 1333. Both contacts have WhatsApp links.
- Contact cards list daily hours as 9:00 AM - 10:00 PM, with a public-holiday caveat.

## Content Notes
- Several service cards still use placeholder copy and pricing markers (`[ Service Title .. ]`, `From $ -`).
- Home page hero includes CDC voucher acceptance badge and now also a dedicated CDC eligibility popup.
- Clementi currently uses a broad `Clementi, Singapore` location; confirm the full address before treating it as an exact street address.

## Recent Update (2026-05-28)
- Refreshed project documentation and `llms.txt` with the current nine-outlet location set and updated contact routing.

## Recent Update (2026-05-17)
- Added a closable CDC eligibility modal that appears automatically on home page load.
- Files changed for this feature:
  - `index.html`
  - `styles.css`
  - `script.js`
