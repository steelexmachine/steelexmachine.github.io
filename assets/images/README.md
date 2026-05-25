# Image placeholders

Every spot in the HTML where a real image should go is marked with an inline HTML comment like:

```html
<!-- IMAGE PLACEHOLDER: replace with
     <img class="viz-img" src="./assets/images/product-landing-gear.jpg" alt="…"> -->
```

This file is the master list of filenames each page expects, plus a suggested aspect ratio.

---

## Site-wide

| Filename                | Used on                 | Aspect    | Notes                                                     |
| ----------------------- | ----------------------- | --------- | --------------------------------------------------------- |
| `og-cover.jpg`          | All (Open Graph)        | 1200×630  | Social-share card. Plant or hero product shot works well. |
| `favicon.ico` / `.png`  | All (optional)          | 32×32     | Add a `<link rel="icon">` in each page if you ship one.   |

## Home (index.html)

| Filename                       | Aspect | What goes here                                              |
| ------------------------------ | ------ | ----------------------------------------------------------- |
| `product-landing-gear.jpg`     | 5 × 4  | Card visual for Motorcycle Landing Gear                     |
| `product-dyeing.jpg`           | 5 × 4  | Card visual for Textile Dyeing Machine                      |
| `product-pump.jpg`             | 5 × 4  | Card visual for Submersible Pump                            |
| `featured-landing-gear.jpg`    | 16 × 8 | Big featured stage on the home page                         |

## Products (products.html)

Re-uses the three product images above.

## Motorcycle Landing Gear (motorcycle-landing-gear.html)

| Filename                       | Aspect | What goes here                                              |
| ------------------------------ | ------ | ----------------------------------------------------------- |
| `lg-stage.jpg`                 | 16 × 8.4 | Big hero stage of the landing gear                        |
| `lg-detail-01.jpg`             | 16 × 10 | Gallery — assembly top view (wide tile)                    |
| `lg-detail-02.jpg`             | 4 × 5   | Gallery — strut detail                                     |
| `lg-detail-03.jpg`             | 4 × 5   | Gallery — mounting bracket                                 |
| `lg-detail-04.jpg`             | 16 × 10 | Gallery — side elevation deployed (wide tile)              |
| `lg-detail-05.jpg`             | 4 × 5   | Gallery — pivot detail                                     |
| `lg-detail-06.jpg`             | 4 × 5   | Gallery — stress diagram                                   |

## Team (team.html)

| Filename                | Aspect | Member                                  |
| ----------------------- | ------ | --------------------------------------- |
| `team-rohan.jpg`        | 4 × 5  | Rohan Mehta — Founder & Principal       |
| `team-anjali.jpg`       | 4 × 5  | Anjali Desai — Head of Mechanical Design |
| `team-sanjay.jpg`       | 4 × 5  | Sanjay Patel — Director, Production     |
| `team-priya.jpg`        | 4 × 5  | Priya Krishnan — Quality & Validation   |

---

## How to swap one in

Find the placeholder block in the relevant HTML file. It looks like this:

```html
<div class="pcard-viz viz">
  <div class="viz-meta">…</div>
  <!-- IMAGE PLACEHOLDER: replace this <div class="viz-glyph"> block with
       <img class="viz-img" src="./assets/images/product-landing-gear.jpg" alt="Motorcycle landing gear"> -->
  <div class="viz-glyph" aria-hidden="true">
    <svg viewBox="…">…</svg>
  </div>
  <span class="viz-corner tl"></span>…
  <div class="viz-foot">…</div>
</div>
```

Replace the `<div class="viz-glyph">…</div>` block with:

```html
<img class="viz-img" src="./assets/images/product-landing-gear.jpg" alt="Motorcycle landing gear assembly">
```

The `.viz-img` class is defined in `css/style.css` and will cover the placeholder frame with `object-fit: cover`, preserving the corner crops, meta strip and foot stamp around the image.

For the team portraits, replace the `<div class="silhouette">…SVG…</div>` block inside each `.portrait` with an `<img class="viz-img" src="…" alt="…">` exactly the same way.

## Optional videos

If you want a hero video, drop an `.mp4` into `assets/videos/` and add inside `.hero` (or `.stage`):

```html
<video class="viz-img" autoplay loop muted playsinline poster="./assets/images/featured-landing-gear.jpg">
  <source src="./assets/videos/hero.mp4" type="video/mp4">
</video>
```

Place it on top of the SVG/glyph layer (or replace it entirely). `playsinline` and `muted` are required for iOS autoplay.
