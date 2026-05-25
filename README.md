# Steelexmachine — Static Website

Premium industrial engineering site for **Steelexmachine** — a six-page static build
deployable directly to GitHub Pages with no build step.

> **Tagline:** Precision Engineering for Motion, Industry and Water Systems.

---

## File structure

```
/
├── index.html                       Home — hero, products, capabilities, featured, metrics, process, CTA
├── products.html                    All three product families as cards
├── motorcycle-landing-gear.html     Full product page (the only one fully written so far)
├── team.html                        Team leadership + discipline breakdown
├── booking.html                     Booking form
├── contact.html                     Contact form + channels + map placeholder
│
├── css/
│   ├── style.css                    Core stylesheet — shared by every page
│   ├── product-page.css             Product-page-only styles (stage, gallery, dev options)
│   └── form.css                     Form styles (booking + contact)
│
├── js/
│   └── main.js                      Vanilla JS — hamburger menu, scroll reveal, form handling
│
├── assets/
│   ├── images/                      All image placeholders go here (see README inside)
│   │   └── README.md
│   └── videos/                      Drop optional hero / B-roll videos here
│
└── README.md                        (this file)
```

---

## Tech notes

- **No build step.** Plain HTML, CSS, vanilla JS. Open `index.html` directly or serve any folder.
- **No framework.** No React, no jQuery, nothing to npm install.
- **No backend.** The booking and contact forms build a `mailto:` link and open the user's email client. To wire to a real endpoint, edit `js/main.js` (search for `mailto`).
- **Fonts** are loaded from Google Fonts (`Space Grotesk` + `JetBrains Mono`). They're the only external dependency.
- **Accessibility:** skip-link on every page, semantic landmarks, `prefers-reduced-motion` honored.
- **SEO:** Each page has `<title>`, `<meta description>`, `<link rel="canonical">`. Open Graph card on the homepage. Replace `assets/images/og-cover.jpg` with a real 1200×630 image.

## Reusable header / footer

Each page contains the same `<header class="site-header">…</header>` and `<footer class="site-footer">…</footer>` markup verbatim. If you change the nav links, copy the change into all six HTML files. The canonical copy lives in `index.html`.

A future enhancement: extract them into `header.html` / `footer.html` and inject with a static-site generator (Jekyll on Pages, Eleventy, etc.) — but for the GitHub Pages MVP, duplicated markup is the simplest path.

---

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo.
2. **Settings → Pages → Branch:** `main` / `(root)`.
3. Pages will serve from `https://<user>.github.io/<repo>/`.
4. All internal links use relative paths (`./index.html`) so they work at any root.

For a custom domain, add a `CNAME` file at the repo root with your domain.

---

## Forms

Both forms use a tiny `data-static-form` hook in `js/main.js`:

- Required fields are validated client-side.
- Submission **opens the user's mail client** with the form data pre-filled, addressed to `works@steelexmachine.com`.
- An in-page "your message is ready" status confirms the action.

To switch to a real backend later, replace the submit handler in `main.js` with a `fetch()` to Formspree, Netlify Forms, or your API of choice.

---

## Mobile optimisation

- **Hamburger menu** activates at viewport ≤ 1100px and slides over the page.
- **Tap targets** ≥ 48px on every button, ≥ 52px on form inputs.
- **Stacked layouts** at 1100px and again at 700px for tighter mobile.
- **Gallery** scrolls horizontally on desktop, stacks vertically on phones (no horizontal scroll).
- **Reduce motion** queries disable marquee, scan-lines and reveals automatically.
- **No layout-shift fonts:** Google Fonts preconnect + `&display=swap`.

## Replacing the placeholder visuals

All product images are SVG schematic placeholders today. Every spot to swap a real image is marked with an HTML comment like:

```html
<!-- IMAGE PLACEHOLDER: replace .viz-glyph with
     <img class="viz-img" src="./assets/images/product-landing-gear.jpg" alt="…"> -->
```

See `assets/images/README.md` for the full list of filenames the pages reference and the suggested aspect ratio for each.

---

## License & content

All text, marks and visuals are placeholder content. Replace the team headshots, plant photos, and any product renders with real Steelexmachine material before going live.
