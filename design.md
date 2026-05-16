# Design System & Architecture Document
**On Hair Salon & Beauty**

This document outlines the core design language, narrative strategy, and technical implementation of the On Hair Salon & Beauty website. It serves as a comprehensive guide for future development, ensuring a consistent, luxury boutique experience across all touchpoints.

---

## 1. Brand Narrative & Positioning
The brand narrative pivots from functional logistics to an elevated, curated experience. It is positioned as a **luxury boutique sanctuary** rather than a typical high-street salon.

*   **Tone of Voice:** Sophisticated, warm, expert, and calm.
*   **Key Messaging Themes:**
    *   *Consultation First:* "Beauty Care That Starts With Listening."
    *   *Meticulous Artistry:* "Where your beauty becomes art."
    *   *Comfort & Trust:* No hard selling, practical recommendations.
*   **Copywriting Style:** Uses "Concierge" language. (e.g., "Consult with an Expert" instead of "Chat on WhatsApp"; "Reserve Your Chair" instead of "Book Now").

---

## 2. Typography
Following the global font update, the site utilizes a singular, highly modern, geometric type system to create a clean, contemporary aesthetic.

*   **Primary Font Family:** **`Outfit`**
*   **CSS Font Variables:**
    *   `--font-display`: `'Outfit', sans-serif;` (Used for large, impactful hero headings)
    *   `--font-serif`: `'Outfit', Georgia, serif;` (Used for primary section headings `h1`, `h2`, `h3`)
    *   `--font-sans`: `'Outfit', -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;` (Used for body copy, buttons, eyebrows, and utility text)

*   **Typographic Hierarchy:**
    *   **Hero Headings:** Fluid typography using `clamp(2.6rem, 6vw, 5rem)`.
    *   **Section Headings:** `h2` at `clamp(2rem, 4vw, 3.4rem)`, employing font-weight `500`.
    *   **Eyebrows:** Uppercase, wide letter-spacing (`0.32em`), bold (`500`), used to introduce sections.

---

## 3. Color Palette
The color palette evokes warmth, luxury, skin tones, and organic beauty. It relies heavily on creams, blushes, and deep, grounding browns.

| Role | Variable | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Base/Background** | `--cream` | `#faf6f1` | Main page backgrounds. |
| **Alt Background** | `--cream-2` | `#f3ebe2` | Secondary sections (About, Testimonials). |
| **Text (Primary)** | `--charcoal` | `#3a2820` | Body copy, general text. |
| **Text (Headings)** | `--espresso` | `#2e1f1a` | High-contrast headings and primary buttons. |
| **Accent (Primary)** | `--rose` | `#b76e79` | Highlights, active links, accents, icons. |
| **Accent (Deep)** | `--rose-deep` | `#8e4a55` | Hover states, gradients. |
| **Accent (Soft)** | `--blush` | `#f5e1d8` | Backgrounds for icons, subtle highlights. |
| **Luxury Accent** | `--gold` | `#c9a961` | Stars, premium highlights. |
| **Borders/Lines** | `--line` | `#e8ddd4` | Dividers, borders, subtle structures. |

---

## 4. Design Tokens & Primitives
The CSS architecture uses custom properties (`:root`) for consistent spacing, rounding, and depth.

*   **Border Radius:**
    *   `--radius-sm: 8px;` (Inputs, small cards, icons)
    *   `--radius-md: 16px;` (Standard cards, images, maps)
    *   `--radius-lg: 28px;` (Modals)
    *   *Buttons:* Fully rounded (`999px`) pill shape.
*   **Shadows (Depth Strategy):**
    *   `--shadow-sm: 0 4px 14px rgba(46, 31, 26, 0.06);` (Resting state for cards)
    *   `--shadow-md: 0 12px 32px rgba(46, 31, 26, 0.08);` (Hover state for subtle elements)
    *   `--shadow-lg: 0 24px 60px rgba(46, 31, 26, 0.12);` (Hover state for main cards, modals)
*   **Layout Constraint:**
    *   `--container: 1200px;` (Max-width for content blocks)
*   **Global Transition:**
    *   `--transition: 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);` (Creates a smooth, fluid easing effect across the site).

---

## 5. Core UI Components

### 5.1 Buttons
Buttons are a major interactive focal point, featuring advanced CSS/JS techniques.
*   **Visuals:** Pill-shaped, with a signature *shimmer sweep* `::before` pseudo-element that triggers on hover.
*   **Variants:** Primary (charcoal to rose), Outline (transparent to charcoal), Ghost, Ghost-Light.
*   **Interactions:**
    *   **Magnetic Effect:** JavaScript calculates cursor position to pull the button towards the mouse.
    *   **Glow Tracking:** A radial gradient `btn-glow` tracks mouse coordinates inside the button.
    *   **Ripple Effect:** JavaScript creates an expanding circular span on click.

### 5.2 Navigation & Menus
*   **Desktop:** Sticky header with a glassmorphic blur (`backdrop-filter: blur(12px)`). Transitions to a bordered/shadowed state on scroll.
*   **Mobile:** A full-screen overlay triggered by a hamburger menu. Uses intense glassmorphism (`blur(36px)`) over animated background "orbs" to maintain a premium feel. Links animate sequentially (fade-up).

### 5.3 The Concierge WhatsApp Button
A highly refined, sticky call-to-action in the bottom left.
*   **Styling:** Premium emerald gradient (`linear-gradient(135deg, #25d366, #128c7e)`).
*   **Label:** "Consult with an Expert" (hidden by default, expands smoothly on hover).
*   **Animations:** Rhythmically expanding pulse, a subtle "Concierge Wiggle" every 6 seconds.
*   **Greeting Bubble:** A JS-triggered concierge message box that pops up after 3.5 seconds to proactively invite interaction.

### 5.4 Cards (Services, Outlets, Values)
*   Built with `transform-style: preserve-3d`.
*   JS-driven 3D tilt effect on hover (`rotateX` and `rotateY` based on cursor position).
*   Rich hover states including gradient borders (using `-webkit-mask-composite: xor`), image scaling (`1.1`), and shadow elevation.

---

## 6. Motion & Interaction Design
The site utilizes a rich layering of CSS and JavaScript animations to feel "alive" without being overwhelming.

*   **Hero Parallax & Backgrounds:**
    *   **Gradient Mesh:** An overarching CSS background with moving radial gradients (`animation: meshShift`).
    *   **Floating Blobs:** Blurred DOM elements that float infinitely using keyframes, combined seamlessly with JS-driven mouse translation (`--mouse-x`, `--mouse-y`) for depth.
    *   **Grain:** An SVG fractal noise filter applied as a mixed-blend overlay to give the digital design a tactile, print-like texture.
*   **Scroll Reveal (`initReveal`):** Elements fade up gracefully as they enter the viewport using `IntersectionObserver`.
*   **Animated Counters:** Number counters in the hero section tick up smoothly on scroll reveal.
*   **FAQ Accordion:** Smooth height calculation using JS `requestAnimationFrame` and CSS transitions, bypassing the janky default `<details>` behavior.

---

## 7. Page Structures & Flow

1.  **Homepage (`index.html`)**: Introduces the brand, presents high-level stats, core values, a preview of curated services, the founding philosophy, and strong social proof (testimonials).
2.  **Services (`services.html`)**: Detailed menu broken down into categories. Uses placeholder gradients (`.ph-1`, `.ph-2`) that subtly shift color over time (`phShift`) while awaiting actual imagery.
3.  **About (`about.html`)**: Deeper dive into the brand's history, the 3-outlet expansion, and core guiding principles (Consult First, No Hard Selling).
4.  **Gallery (`gallery.html`)**: A CSS Grid layout with `tall` and `wide` variants for visual interest. Features an interactive JS categorization filter and a custom Lightbox.
5.  **FAQ (`faq.html`)**: A "Concierge Guide" styled layout with a sticky quick-contact sidebar and an accordion list of common questions framed as proactive guidance.
6.  **Contact (`contact.html`)**: Organized into clear outlet cards (with operating hours and maps links) and direct contact methods, emphasizing ease of connection.