# GREPP Directory - ON Hair Salon & Beauty

Purpose: a grep-friendly project map for quickly locating pages, sections, selectors, JavaScript modules, placeholders, contact details and maintenance hotspots.

Generated from the current workspace files in `C:\Users\Yangu\Documents\GitHub\onBeautyhair`.

## Root Inventory

```text
onBeautyhair/
|-- index.html
|-- about.html
|-- services.html
|-- gallery.html
|-- faq.html
|-- contact.html
|-- styles.css
|-- script.js
|-- README.md
|-- context.md
|-- design.md
|-- faveicon.png
`-- Assets/
    |-- faveicon.png
    |-- bedok/
    |-- bukitMerahCentral/
    `-- 164BukitMerahCentral/
```

## Runtime Files

GREP_FILE index.html
- Type: HTML page
- Role: Homepage
- Depends on: `styles.css`, `script.js`, `faveicon.png`, Google Fonts, Font Awesome
- Key IDs: `hero`, `services`, `scrollProgress`, `bookingModal`, `bookingForm`, `formStatus`, `navbar`, `navLinks`, `navToggle`, `cdcEligibilityModal`, `cdcEligibilityTitle`
- Key classes: `.nav-badge-cdc`, `.cdc-badge`, `.cdc-modal-card`, `.cdc-modal-list`
- Key sections: navbar, hero, trust-strip, services-preview, about-preview, testimonials, CTA banner, footer, booking modal, CDC eligibility modal, floating WhatsApp
- Primary booking behavior: navbar and hero CTA link to WhatsApp; lower CTA still opens `bookingModal`
- Placeholder areas: service preview titles, service preview copy, service tags, starting prices

GREP_FILE about.html
- Type: HTML page
- Role: About / positioning page
- Depends on: `styles.css`, `script.js`, `faveicon.png`, Google Fonts, Font Awesome
- Key IDs: `navbar`, `navLinks`, `navToggle`
- Key classes: `.nav-badge-cdc`
- Key sections: page-header, about-section story, values grid, CTA banner, footer, floating WhatsApp
- Current narrative: consultation-first, comfortable service, practical recommendations, no hard selling
- Booking behavior: navbar and CTA link to WhatsApp
- Removed from current visible page: founder claims, founding year claim, team cards, booking modal

GREP_FILE services.html
- Type: HTML page
- Role: Service menu template
- Depends on: `styles.css`, `script.js`, `faveicon.png`, Google Fonts, Font Awesome
- Key IDs: `cat-1`, `cat-2`, `cat-3`, `cat-4`, `bookingModal`, `bookingForm`, `formStatus`, `navbar`, `navLinks`, `navToggle`
- Key classes: `.nav-badge-cdc`
- Key sections: page-header, placeholder-banner, service-menu, four menu-block categories, CTA banner, footer, booking modal, floating WhatsApp
- Placeholder areas: category eyebrows, category titles, category descriptions, service names, service descriptions, prices
- Booking behavior: navbar links to WhatsApp; CTA opens `bookingModal`

GREP_FILE gallery.html
- Type: HTML page
- Role: Gallery template
- Depends on: `styles.css`, `script.js`, `faveicon.png`, Google Fonts, Font Awesome
- Key IDs: `lightbox`, `bookingModal`, `bookingForm`, `formStatus`, `navbar`, `navLinks`, `navToggle`
- Key classes: `.nav-badge-cdc`
- Key selectors: `.filter-btn`, `.gallery-grid`, `.gallery-item`, `.lightbox`, `.lightbox-close`, `.lightbox-prev`, `.lightbox-next`
- Key sections: page-header, placeholder-banner, filter buttons, gallery grid, lightbox, CTA banner, footer, booking modal, floating WhatsApp
- Placeholder areas: gallery intro, filter names, photo labels, tile backgrounds
- Booking behavior: navbar links to WhatsApp; gallery CTA opens `bookingModal`

GREP_FILE faq.html
- Type: HTML page
- Role: FAQ page
- Depends on: `styles.css`, `script.js`, `faveicon.png`, Google Fonts, Font Awesome
- Key IDs: `bookingModal`, `bookingForm`, `formStatus`, `navbar`, `navLinks`, `navToggle`
- Key classes: `.nav-badge-cdc`
- Key selectors: `.faq-section`, `.faq-layout`, `.faq-aside`, `.faq-contact-list`, `.faq-list`, `.faq-item`
- Key sections: page-header, FAQ sidebar, animated accordion list, CTA banner, footer, booking modal, floating WhatsApp
- FAQ count: 9 `details.faq-item` rows
- Booking behavior: navbar links to WhatsApp; FAQ CTA opens `bookingModal`

GREP_FILE contact.html
- Type: HTML page
- Role: Contact and outlet page
- Depends on: `styles.css`, `script.js`, `faveicon.png`, Google Fonts, Font Awesome
- Key IDs: `bookingModal`, `bookingForm`, `formStatus`, `navbar`, `navLinks`, `navToggle`
- Key classes: `.nav-badge-cdc`
- Key selectors: `.outlets-grid`, `.outlet-card`, `.outlet-actions`, `.contact-grid-single`, `.hours-placeholder`, `.maps-grid`, `.map-card`, `.map-card-wide`
- Key sections: page-header, outlet cards, contact info card, maps section, CTA banner, footer, booking modal, floating WhatsApp
- Placeholder areas: outlet hours, studio hours lorem ipsum
- Booking behavior: navbar links to WhatsApp; contact CTA includes WhatsApp links and also has a modal `Book Now`

GREP_FILE styles.css
- Type: global stylesheet
- Role: design tokens, responsive layout, page components, animations, interaction states
- Key groups: tokens, buttons, navbar, hero, services, about, testimonials, CTA, footer, modal, CDC modal, page headers, services page, values, gallery, contact, FAQ, placeholders, outlet cards, maps, WhatsApp widget, responsive rules
- Important selectors: `:root`, `.btn`, `.nav-links`, `.nav-cta`, `.nav-badge-cdc`, `.cdc-badge`, `.cdc-modal-card`, `.hero`, `.gradient-mesh`, `.blob-*`, `.service-card`, `.testimonial`, `.modal`, `.booking-form`, `.gallery-item`, `.faq-item`, `.outlet-card`, `.wa-float`

GREP_FILE script.js
- Type: global JavaScript
- Role: site interactions
- Key modules: WhatsApp bubble, footer year, sticky navbar, mobile menu scroll lock, CDC eligibility modal, FAQ animation, reveal animation, booking modal, simulated booking form, gallery filters, lightbox, min date, scroll progress, hero parallax, mouse parallax, magnetic buttons, ripple, tilt cards, counters

GREP_FILE README.md
- Type: project documentation
- Role: current operating README
- Notes: rewritten to reflect current pages, booking flow, placeholders, contact details and production checklist

GREP_FILE context.md
- Type: older project context documentation
- Role: background design and architecture notes
- Caution: contains stale references to older fonts and older luxury/team/journey positioning

GREP_FILE design.md
- Type: design system documentation
- Role: detailed design and motion notes
- Caution: broadly useful, but verify against current HTML/CSS before treating as source of truth

GREP_FILE faveicon.png
- Type: root favicon asset
- Used by: all HTML pages as favicon and Apple touch icon

GREP_FILE Assets/faveicon.png
- Type: duplicate favicon asset
- Notes: same role as root favicon, but current HTML references root `faveicon.png`

## Page Titles And Descriptions

GREP_META index.html
- Title: `On Hair Salon & Beauty - Full-Service Hair, Skin, Nails & Bridal`
- Description: luxury salon offering hair styling, color, skincare, nails, makeup and bridal services

GREP_META about.html
- Title: `About - On Hair Salon & Beauty`
- Description: Singapore salon group serving Bukit Merah, 163 bukit merah central and Bedok North with thoughtful consultation and no-pressure beauty care

GREP_META services.html
- Title: `Services & Pricing - On Hair Salon & Beauty`
- Description: full menu of hair, color, skincare, nails, makeup and bridal services with transparent pricing

GREP_META gallery.html
- Title: `Gallery - On Hair Salon & Beauty`
- Description: recent work across hair color, cuts, bridal, makeup and skincare transformations

GREP_META faq.html
- Title: `FAQ - On Hair Salon & Beauty`
- Description: appointments, outlets, consultations, bridal bookings and salon visit questions

GREP_META contact.html
- Title: `Contact - On Hair Salon & Beauty`
- Description: visit, call, message or book online

## Shared Head Dependencies

GREP_HEAD all-html
- Favicon: `<link rel="icon" type="image/png" href="faveicon.png" />`
- Apple icon: `<link rel="apple-touch-icon" href="faveicon.png" />`
- Fonts: Google Fonts, Google Sans and Outfit
- Icons: Font Awesome 6.5.1 CDN
- Styles: `styles.css`
- Scripts: `script.js`

## Navigation Map

GREP_NAV shared
- Navbar ID: `navbar`
- Mobile nav container ID: `navLinks`
- Mobile toggle ID: `navToggle`
- CDC badge class: `.nav-badge-cdc`
- Links: Home, Services, About, Gallery, FAQ, Contact
- CTA class: `.btn.btn-primary.nav-cta`
- Navbar CTA behavior: WhatsApp link on all pages
- Home CTA label: `Reserve Your Chair`
- Inner page CTA label: `Book Now`

GREP_NAV mobile
- Menu class: `.nav-links.open`
- Body lock class: `body.menu-open`
- Scroll lock function: `initMobileNav()`
- Mobile menu contact footer injected by JS: `.nav-mobile-foot`, `.nav-foot-actions`, `.nav-foot-btn`

## Booking And Contact Flow

GREP_BOOKING whatsapp-primary
- Primary WhatsApp booking number: `+65 8275 5130`
- Primary WhatsApp href: `https://wa.me/6582755130`
- Secondary WhatsApp href: `https://wa.me/6583099832`
- Floating WhatsApp selector: `.wa-float`
- Floating WhatsApp position: bottom-left
- WhatsApp helper bubble selector: `.wa-bubble`

GREP_BOOKING modal-secondary
- Modal ID: `bookingModal`
- Form ID: `bookingForm`
- Status ID: `formStatus`
- Trigger attribute: `data-open-booking`
- Close attribute: `data-close-booking`
- Submission behavior: simulated success in `initBookingForm()`
- Pages with modal: `index.html`, `services.html`, `gallery.html`, `faq.html`, `contact.html`
- Page without modal: `about.html`

GREP_BOOKING cdc-vouchers
- CDC badge in navbar (all pages): `.nav-badge-cdc`
- CDC badge in hero (index): `.cdc-badge`
- CDC eligibility modal (index): `#cdcEligibilityModal`
- Close attribute: `data-close-cdc`

## Outlet Directory

GREP_OUTLET outlet-1
- Name: 164 bukit merah central
- Footer label: Outlet 1 - 164 bukit merah central
- Address: Blk 2, 164 bukit merah central, #01-5156, Singapore 150002
- Shop phone: `+65 6980 5784`
- Shop tel href: `tel:+6569805784`
- WhatsApp: `+65 8275 5130`
- WhatsApp href: `https://wa.me/6582755130`

GREP_OUTLET outlet-2
- Name: 163 bukit merah central
- Footer label: Outlet 2 - 163 bukit merah central
- Address: Blk 163, 163 bukit merah central, #02-3601, Singapore 150163
- Shop phone: `+65 8395 0090`
- Shop tel href: `tel:+6583950090`
- WhatsApp: `+65 8309 9832`
- WhatsApp href: `https://wa.me/6583099832`

GREP_OUTLET outlet-3
- Name: Bedok North
- Footer label: Outlet 3 - Bedok North
- Address: Bedok North Street 3, Singapore 460539
- Shop phone: `+65 8015 1136`
- Shop tel href: `tel:+6580151136`
- WhatsApp: currently uses `https://wa.me/6582755130` in the outlet card

## Placeholder Directory

GREP_PLACEHOLDER index.html
- Service preview titles: `[ Service Title 01 ]` through `[ Service Title 06 ]`
- Service preview descriptions: `[ Short description of this service goes here. ]`
- Service tags: `[ Tag ]`
- Prices: `From $ --`

GREP_PLACEHOLDER services.html
- Placeholder banner present
- Category fields: `[ Category Eyebrow ]`, `[ Category Title ]`, `[ Accent ]`
- Category descriptions: `[ Add a 1-2 sentence description of this service category here. ]`
- Service names: `[ Service Name 01 ]` through `[ Service Name 04 ]` per category
- Service descriptions: `[ Short description of this service goes here. ]`
- Prices: `$ --`

GREP_PLACEHOLDER gallery.html
- Gallery intro paragraph placeholder
- Placeholder banner present
- Filters: `[ Filter 1 ]` through `[ Filter 4 ]`
- Tile labels: `[ Photo 01 ]` through `[ Photo 12 ]`
- Tile visuals: `.gallery-item.ph-1` through `.gallery-item.ph-4`

GREP_PLACEHOLDER contact.html
- Outlet hours: `[ Hours ]`
- Studio hours paragraph: lorem ipsum text in `.hours-placeholder`
- Outlet media: `.outlet-media.menu-placeholder.ph-*`

GREP_PLACEHOLDER forms
- Booking modal example name: `Jane Doe`
- Booking modal example email: `you@example.com`
- Booking modal notes placeholder: `Anything we should know?`

## CSS Directory

GREP_CSS tokens
- `:root`
- Colors: `--cream`, `--cream-2`, `--blush`, `--blush-deep`, `--rose`, `--rose-deep`, `--gold`, `--gold-soft`, `--espresso`, `--charcoal`, `--muted`, `--line`, `--white`
- Fonts: `--font-serif`, `--font-display`, `--font-sans`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- Layout: `--container`
- Motion: `--transition`

GREP_CSS buttons
- Base: `.btn`
- Sizes: `.btn-large`, `.btn-block`
- Variants: `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-ghost-light`
- Motion: `.btn-magnetic`, `.btn-glow`, `.ripple`
- WhatsApp icon padding: `.btn > i.fa-whatsapp`, `.faq-contact-list a i.fa-whatsapp`, `.nav-foot-btn i.fa-whatsapp`

GREP_CSS navigation
- `.navbar`, `.navbar.scrolled`, `.nav-container`, `.logo`, `.logo-mark`, `.logo-text`
- `.nav-links`, `.nav-links a`, `.nav-links .nav-cta`
- `.nav-toggle`, `.nav-toggle.open`
- `.nav-badge-cdc`
- Mobile menu: `@media (max-width: 720px)`, `.nav-links.open`, `.nav-mobile-foot`

GREP_CSS hero
- `.hero`, `.gradient-mesh`, `.blob`, `.blob-1`, `.blob-2`, `.blob-3`, `.blob-4`, `.blob-5`, `.grain`
- `.hero-content`, `.hero-title`, `.hero-subtitle`, `.hero-actions`, `.hero-stats`, `.hero-pills`
- `.cdc-badge`
- `.scroll-cue`, `.scroll-line`, `.scroll-text`, `.scroll-progress`
- Keyframes: `meshShift`, `floatBlob`, `scrollLine`

GREP_CSS services
- Homepage: `.services-preview`, `.service-grid`, `.service-card`, `.service-img`, `.service-body`, `.price-from`
- Services page: `.service-menu`, `.menu-block`, `.menu-block.reverse`, `.menu-visual`, `.menu-items`, `.menu-item`, `.price`

GREP_CSS about-values
- `.about-section`, `.about-grid`, `.about-media`, `.about-image-main`, `.about-badge`, `.about-content`
- `.values-grid`, `.value-card`
- Note: `.stylist-*` and `.timeline-*` styles remain in CSS but current visible team/timeline sections are not present in current HTML pages

GREP_CSS testimonials
- `.testimonials`, `.testimonial-track`, `.testimonial`, `.stars`
- Homepage testimonial count: 9

GREP_CSS modal-form
- `.modal`, `.modal.open`, `.modal-backdrop`, `.modal-card`, `.modal-close`
- `.booking-form`, `.booking-form .row`, `.form-status`
- `.cdc-modal-card`, `.cdc-modal-list`

GREP_CSS page-header
- `.page-header`, `.page-header::before`, `.page-header::after`, `.breadcrumb`

GREP_CSS gallery
- `.gallery-filters`, `.filter-btn`, `.gallery-grid`, `.gallery-item`, `.gallery-item.tall`, `.gallery-item.wide`, `.gallery-item.hidden`
- `.lightbox`, `.lightbox.open`, `.lightbox-close`, `.lightbox-prev`, `.lightbox-next`

GREP_CSS contact
- `.contact-grid`, `.contact-grid-single`, `.contact-info-card`, `.contact-row`, `.contact-row-flex`
- `.hours-list`, `.hours-placeholder`
- `.outlets-grid`, `.outlet-card`, `.outlet-media`, `.outlet-tag`, `.outlet-body`, `.outlet-address`, `.outlet-hours`, `.outlet-actions`
- `.maps-section`, `.maps-grid`, `.map-card`, `.map-card-wide`, `.map-wrap`

GREP_CSS faq
- `.faq-section`, `.faq-layout`, `.faq-aside`, `.faq-contact-list`, `.faq-list`
- `.faq-item`, `.faq-item[open]`, `.faq-item.is-animating`, `.faq-item.is-open`

GREP_CSS placeholders
- `.placeholder-banner`, `.placeholder-text`
- `.menu-placeholder`
- `.ph-1`, `.ph-2`, `.ph-3`, `.ph-4`
- `phShift`

GREP_CSS whatsapp
- `.wa-float`, `.wa-label`, `.wa-bubble`, `.wa-bubble.active`, `.wa-pulse`
- Keyframes: `waPulse`, `waWiggle`

GREP_CSS responsive
- `@media (max-width: 960px)`
- `@media (min-width: 721px)`
- `@media (max-width: 720px)`
- `@media (prefers-reduced-motion: reduce)`
- `@media (max-width: 480px)`
- `@media (max-width: 720px) and (max-height: 720px)`

## JavaScript Directory

GREP_JS init order
- `DOMContentLoaded`
- `initYear()`
- `initNavbar()`
- `initMobileNav()`
- `initReveal()`
- `initCdcEligibilityModal()`
- `initBookingModal()`
- `initBookingForm()`
- `initFaqAccordion()`
- `initGallery()`
- `initLightbox()`
- `initMinDate()`
- `initScrollProgress()`
- `initHeroParallax()`
- `initMouseParallax()`
- `initMagneticButtons()`
- `initButtonRipple()`
- `initTiltCards()`
- `initCounters()`
- `initWhatsAppEnhancements()`

GREP_JS initCdcEligibilityModal
- Selector: `#cdcEligibilityModal`
- Delay: 350ms
- Behavior: automatically opens modal if present on page

GREP_JS initWhatsAppEnhancements
- Selector: `.wa-float`
- Creates: `.wa-bubble`
- Delay: 3500ms
- Behavior: shows greeting bubble, hides on click

GREP_JS initYear
- Selector: `#year`
- Behavior: sets current year

GREP_JS initNavbar
- Selector: `#navbar`
- Behavior: toggles `.scrolled` after `window.scrollY > 30`

GREP_JS initMobileNav
- Selectors: `#navToggle`, `#navLinks`
- Injects: `.nav-mobile-foot`
- Toggles: `.open`, `body.menu-open`
- Accessibility: `aria-controls`, `aria-expanded`, `aria-label`
- Scroll lock: fixed body positioning, stores/restores scroll position
- Close triggers: link click, Escape, resize to desktop

GREP_JS initFaqAccordion
- Selector: `.faq-item`
- Element: native `details` plus `summary`
- Classes: `.is-open`, `.is-animating`
- Behavior: height-animated open/close, respects `prefers-reduced-motion`

GREP_JS initReveal
- Selector: `.reveal`
- API: `IntersectionObserver`
- Class added: `.visible`

GREP_JS initBookingModal
- Selector: `#bookingModal`
- Triggers: `[data-open-booking]`, `[data-close-booking]`
- Class: `.open`
- Close: Escape key

GREP_JS initBookingForm
- Selector: `#bookingForm`
- Behavior: prevents default submit, disables submit button, simulates success, restores button
- Current status text: `Thank you! We received your booking request and will confirm shortly.`

GREP_JS initGallery
- Selectors: `.filter-btn`, `.gallery-item`
- Data attr: `data-filter`, `data-category`
- Class: `.hidden`

GREP_JS initLightbox
- Selectors: `.gallery-item`, `#lightbox`, `.lightbox-close`, `.lightbox-prev`, `.lightbox-next`
- Data attr: `data-full`
- Extracts background image if `data-full` is absent
- Close: backdrop click, close button, Escape
- Navigate: prev/next buttons, ArrowLeft, ArrowRight

GREP_JS initMinDate
- Selector: `input[type="date"]`
- Behavior: min date set to today

GREP_JS initScrollProgress
- Selector: `#scrollProgress`
- Behavior: width based on document scroll percent

GREP_JS initHeroParallax
- Selector: `#hero`
- CSS vars: `--scroll-y`, `--scroll-progress`
- Content selector: `[data-parallax-content]`

GREP_JS initMouseParallax
- Selector: `#hero`
- CSS vars: `--mouse-x`, `--mouse-y`
- Events: mousemove, mouseleave

GREP_JS initMagneticButtons
- Selector: `.btn-magnetic`
- Child selector: `.btn-glow`
- CSS vars: `--x`, `--y`

GREP_JS initButtonRipple
- Selector: `.btn`
- Creates: `.ripple`

GREP_JS initTiltCards
- Selectors: `.service-card`, `.value-card`, `.float-card`
- Skips: hover none, reduced motion

GREP_JS initCounters
- Selector: `[data-counter]`
- Data attrs: `data-counter`, `data-suffix`
- API: `IntersectionObserver`

## Reusable HTML Patterns

GREP_PATTERN head
```html
<link rel="icon" type="image/png" href="faveicon.png" />
<link rel="apple-touch-icon" href="faveicon.png" />
<link rel="stylesheet" href="styles.css" />
<script src="script.js"></script>
```

GREP_PATTERN nav
```html
<header class="navbar" id="navbar">
<nav class="nav-links" id="navLinks">
<button class="nav-toggle" id="navToggle">
```

GREP_PATTERN whatsapp-float
```html
<a href="https://wa.me/6582755130?text=..." class="wa-float" aria-label="Chat on WhatsApp">
```

GREP_PATTERN booking-modal
```html
<div class="modal" id="bookingModal" aria-hidden="true">
<form class="booking-form" id="bookingForm">
```

GREP_PATTERN cdc-modal
```html
<div class="modal" id="cdcEligibilityModal" aria-hidden="true">
  <div class="modal-backdrop" data-close-cdc></div>
  <div class="modal-card cdc-modal-card" role="dialog">
    <button class="modal-close" data-close-cdc><i class="fa-solid fa-xmark"></i></button>
```

GREP_PATTERN faq
```html
<details class="faq-item">
  <summary>Question</summary>
  <p>Answer</p>
</details>
```

GREP_PATTERN gallery
```html
<button class="filter-btn" data-filter="cat-1">
<div class="gallery-item ph-1" data-category="cat-1">
```

GREP_PATTERN service-menu
```html
<div class="menu-block reveal" id="cat-1">
<div class="menu-visual menu-placeholder ph-1">
<div class="menu-item">
```

## Common Grep Commands

GREP_CMD find placeholders
```powershell
Select-String -Path *.html -Pattern '[[]','placeholder','Lorem ipsum'
```

GREP_CMD find booking modal triggers
```powershell
Select-String -Path *.html -Pattern 'data-open-booking','bookingModal','bookingForm'
```

GREP_CMD find CDC voucher elements
```powershell
Select-String -Path *.html,styles.css,script.js -Pattern 'cdc','CDC'
```

GREP_CMD find WhatsApp links
```powershell
Select-String -Path *.html -Pattern 'wa.me','fa-whatsapp'
```

GREP_CMD find outlet contact data
```powershell
Select-String -Path *.html,README.md,GREPP_DIRECTORY.md -Pattern '6980 5784','8395 0090','8275 5130','8309 9832','8015 1136','Bedok North'
```

GREP_CMD find CSS component rules
```powershell
Select-String -Path styles.css -Pattern 'faq-item','wa-float','outlet-actions','nav-cta','gradient-mesh','cdc-badge'
```

GREP_CMD find JS modules
```powershell
Select-String -Path script.js -Pattern '^function init'
```

## Maintenance Notes

GREP_NOTE source-of-truth
- Treat current HTML, CSS and JS as source of truth.
- `README.md` is current project documentation.
- `context.md` and `design.md` are useful background docs but contain some stale statements.

GREP_NOTE current-stale-risk
- CSS still contains unused `.stylist-*` and `.timeline-*` rules.
- Several pages still include booking modals while primary booking now uses WhatsApp.
- Services and gallery are still mostly placeholder templates.
- Contact page still needs real operating hours.
- Bedok North uses general WhatsApp number `+65 8275 5130` in the outlet card.
- Empty `Assets/` subdirectories created for outlet-specific imagery.

GREP_NOTE production-before-launch
- Replace all bracketed placeholders.
- Replace lorem ipsum hours placeholder.
- Replace placeholder gallery tiles with real salon imagery.
- Replace placeholder service categories and prices.
- Confirm all phone and WhatsApp routing.
- Decide whether to keep or remove booking modals.
- Compress large favicon if performance is important.
- Populate `Assets/` subdirectories with real imagery.
