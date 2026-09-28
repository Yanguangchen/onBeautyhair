# ON Hair Salon & Beauty Website

A static, responsive multi-page website for ON Hair Salon & Beauty, a Singapore salon group with outlets at Toa Payoh, Simei (Eastpoint Mall and Simei Street 3), 164 bukit merah central, 163 bukit merah central, Yishun Ring Road, Ang Mo Kio Avenue 10 and Bedok North Street 3.

The site is built with plain HTML, CSS and vanilla JavaScript. There is no build step, package manager or framework dependency.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage with animated pastel hero, WhatsApp booking CTA, trust strip, service preview cards, about preview, testimonials, footer and booking modal. |
| `about.html` | Repositioned About page focused on listening, consultation, practical recommendations and no-pressure service. Uses WhatsApp booking instead of a modal. |
| `services.html` | Service menu layout with four placeholder service categories, item descriptions and prices to be replaced with real offerings. |
| `gallery.html` | Filterable placeholder gallery with masonry-style tiles and lightbox behavior. |
| `faq.html` | FAQ page with animated native accordion rows, outlet WhatsApp prompts, CTA, footer and booking modal. |
| `contact.html` | Outlet cards, outlet-specific phone and WhatsApp actions, contact details, studio-hours placeholder, embedded Google Maps and booking CTA. |

## Current Positioning

The About page now positions ON Hair Salon & Beauty as a local Singapore salon group built around:

- consultation before recommendation
- comfortable, respectful service
- practical advice that suits a client's routine
- no hard selling
- convenient access across Toa Payoh, Simei, Bukit Merah, Yishun, Ang Mo Kio and Bedok
- official acceptance of CDC Vouchers for all services

This replaces the older generic luxury/founder narrative and avoids unverified claims.

## Key Features

- Responsive desktop and mobile navigation
- Mobile full-screen glass-style menu with background scroll lock
- WhatsApp-first booking flow in the navbar and hero CTA
- CDC Vouchers accepted label in the navbar and hero stats
- Floating WhatsApp button on the lower-left of the page
- Auto-opening WhatsApp helper bubble
- Animated pastel hero background with mesh and floating blobs
- Hero parallax, mouse parallax, magnetic buttons and ripple effects
- Scroll-triggered reveal animations
- Scroll progress bar on the homepage
- Animated counters in the homepage hero
- FAQ accordion with animated open and close states
- Gallery filtering and lightbox controls
- Booking modal still used by selected secondary CTAs on several pages
- Favicon and Apple touch icon using `faveicon.png`

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: Google Sans and Outfit
- Font Awesome 6 via CDN
- Google Maps iframe embeds on the contact page
- Remote Unsplash image used on the About page
- Local favicon: `faveicon.png`

## File Structure

```text
ON Beauty/
|-- index.html
|-- about.html
|-- services.html
|-- gallery.html
|-- faq.html
|-- contact.html
|-- styles.css
|-- script.js
|-- faveicon.png
|-- README.md
`-- Assets/
    `-- faveicon.png
```

## Quick Start

Run a local server (internal "Home" links use `./`, which needs a server to resolve to `index.html`):

```bash
npm run dev
# or
python -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Contact Details

ON Hair Salon & Beauty lists eight outlets:

| Outlet | Address | Shop Phone | WhatsApp |
| --- | --- | --- | --- |
| Outlet 1 - Toa Payoh | 109 Lorong 1 Toa Payoh, #01-306 and #02-306, Singapore 310109 | +65 6980 5765 | +65 8192 0109 |
| Outlet 2 - Simei Eastpoint Mall | Eastpoint Mall, #04-09.3, Simei Street 6, Singapore 528833 | +65 9348 0188 | +65 9348 0188 |
| Outlet 3 - Simei Street 3 | Blk 248 Simei Street 3, #01-130, Singapore 520248 | +65 8412 4961 | +65 8412 4961 |
| Outlet 4 - 164 bukit merah central | Blk 2 164 bukit merah central, #01-5156, Singapore 150002 | +65 6980 5784 | +65 8275 5130 |
| Outlet 5 - 163 bukit merah central | Blk 163 163 bukit merah central, #02-3601, Singapore 150163 | +65 6980 3033 | +65 9897 4760 |
| Outlet 6 - Yishun Ring Road | Blk 846 Yishun Ring Road, #01-3643, Singapore 760846 | +65 8466 6738 | +65 8466 6738 |
| Outlet 7 - Ang Mo Kio Avenue 10 | Blk 449 Ang Mo Kio Avenue 10, #01-1721, Singapore 560449 | Xiao Yang +65 6019 0752; Zoey +65 8336 9693 | WhatsApp: Zoey only |
| Outlet 8 - Bedok North Street 3 | Bedok North Street 3, Singapore | Antony +65 8015 1136; Vloon +65 8306 1333 | Same numbers on WhatsApp |

## Current Placeholder Areas

The site still contains intentional placeholders that should be replaced before production use:

- `index.html`: service preview titles, descriptions, tags and starting prices
- `services.html`: all service category names, descriptions, service names and prices
- `gallery.html`: gallery intro copy, filter labels and all gallery image tiles
- `contact.html`: outlet hours and the studio-hours paragraph
- several booking modal fields still use generic example placeholders such as `Jane Doe`

Search for `[` in the HTML files to find most placeholder copy quickly.

## Booking Flow

Primary booking actions now route to WhatsApp:

- homepage navbar: `Reserve Your Chair`
- homepage hero: `Start Your Transformation`
- shared navbar buttons on inner pages
- floating WhatsApp button
- About page CTA

Some secondary CTA buttons still open the local booking modal through `data-open-booking`. The modal currently simulates a successful submission and does not send data anywhere.

To make form submissions real, update `initBookingForm()` in `script.js` and connect it to a backend, Formspree, Netlify Forms or another form handling service.

## JavaScript Modules

The main interactions are in `script.js`:

- `initWhatsAppEnhancements()` - adds the floating WhatsApp helper bubble
- `initYear()` - updates the footer year
- `initNavbar()` - adds scroll-state styling to the navbar
- `initMobileNav()` - handles the mobile menu and locks page scroll while open
- `initFaqAccordion()` - animates FAQ accordion open and close states
- `initReveal()` - handles scroll reveal animations
- `initBookingModal()` - opens and closes the booking modal
- `initBookingForm()` - simulates booking form submission
- `initGallery()` - filters gallery tiles
- `initLightbox()` - opens gallery tiles in a lightbox
- `initMinDate()` - prevents past dates in date inputs
- `initScrollProgress()` - updates the homepage scroll bar
- `initHeroParallax()` - applies scroll parallax in the hero
- `initMouseParallax()` - applies mouse-based hero movement
- `initMagneticButtons()` - adds magnetic hover movement
- `initButtonRipple()` - adds button ripple effects
- `initTiltCards()` - adds card tilt effects
- `initCounters()` - animates hero stat counters

## Styling Notes

The main visual system lives in `styles.css`:

- design tokens are defined in `:root`
- responsive breakpoints are currently at `960px`, `720px`, `480px` and short mobile viewport rules
- the hero uses `.gradient-mesh` plus `.blob-*` elements for the animated pastel background
- `.wa-float` controls the floating WhatsApp button, currently positioned bottom-left
- `.faq-item` controls the FAQ accordion styling
- `.placeholder-banner`, `.menu-placeholder`, `.ph-*` and related classes style placeholder content

## Favicon

All HTML pages use small, purpose-sized icons generated from the logo:

```html
<link rel="icon" type="image/png" sizes="48x48" href="Assets/icons/favicon-48.png" />
<link rel="icon" type="image/png" sizes="192x192" href="Assets/icons/favicon-192.png" />
<link rel="apple-touch-icon" href="Assets/icons/apple-touch-icon.png" />
```

The navbar logo uses `Assets/icons/logo-112.png`. `faveicon.png` (512x512) is kept as the logo referenced in the JSON-LD structured data, with a duplicate at `Assets/faveicon.png`.

## SEO and AEO Files

When outlets, phone numbers, hours or prices change, update every place that repeats them so search engines and AI assistants see one consistent set of facts:

- Visible pages: `contact.html`, `services.html`, `faq.html`, footers
- JSON-LD in the `<head>` of `index.html` (full organisation, outlets and price list), `contact.html` (organisation and outlets) and `services.html` (price list)
- `llms.txt` (plain-language summary for AI assistants)
- `sitemap.xml` (`<lastmod>` of the pages you changed)

When publishing a new article in `articles/`:

- Copy an existing article page and keep its structure: short-answer box, contents list, sections with `id`s, article FAQ, conclusion and "Related Guides"
- Add images: `Assets/blog/<slug>.webp` (1400x788 hero), `Assets/blog/<slug>-card.webp` (800x450 blog card) and `Assets/og/<slug>.jpg` (1200x630 share image)
- Update the `<title>`, description, canonical, Open Graph tags and `BlogPosting` JSON-LD (headline, dates, images) in its `<head>`
- Add a card to `blog.html`, a `<url>` to `sitemap.xml` and a line under "Salon Guides" in `llms.txt`

`vercel.json` permanently redirects `/index.html` to `/` and the retired `/blog-bukit-merah-hair-salon.html` to its merged guide, and sets cache headers for `Assets/`. Internal "Home" links point to `./` (or `../` from `articles/`), so preview the site through a local server rather than opening files directly.

## Production Checklist

Before launch:

- Replace all placeholder service content and prices
- Replace gallery placeholders with real images and category labels
- Confirm real operating hours for each outlet
- Verify outlet phone and WhatsApp numbers remain current
- Decide whether to remove the local booking modal entirely or connect it to a real submission flow
- Replace any remote Unsplash imagery with owned salon images if available
- Verify all WhatsApp links route to the preferred booking number
- Test the mobile menu scroll lock on iOS Safari and Android Chrome
- Check all Google Maps embeds on the contact page
- Compress `faveicon.png` if page weight matters

## Notes

- The website is static and can be hosted on any static host.
- No dependency installation is required.
- The current content uses a mix of live business information and placeholders, so review every page before publishing.
