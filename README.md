# KAGBENI — kagbenimustang.com

A complete redesign of **kagbenimustang.com**: a cinematic, single-page
experience about Kagbeni village (2,804 m), the gateway to Upper Mustang,
Nepal. Pure HTML/CSS/JS — no build step, no framework. Upload the folder to
any static host and it works.

## What's inside

```
kagbenimustang/
├── index.html          the site (one long-form immersive page)
├── credits.html        auto-generated image attribution page
├── css/style.css       design system (dark / copper / glacier palette)
├── js/main.js          all interactions (vanilla JS, no dependencies)
├── images/             41 photographs from Wikimedia Commons (web-sized)
├── image-credits.json  raw license metadata for every photo
└── favicon.svg
```

## Sections & features

- **Preloader** — KAGBENI wordmark with a live altitude ticker (0 → 2,804 m),
  hard-capped so it can never trap the visitor.
- **Hero** — full-bleed panorama, giant auto-fitting display type (JS measures
  and scales the word to any viewport), staggered letter reveal, facts row,
  news-ticker marquee.
- **Manifesto** — editorial statement whose words light up as you scroll, with
  inline photo chips; count-style figures row.
- **The Crossroads** — scrollytelling: a sticky image frame crossfades through
  four photographs as four chapters scroll past (salt trade, the river name,
  the noon wind, the hillside sign).
- **The Journey** — a scroll-driven horizontal rail (Jomsom → Kagbeni →
  Muktinath → checkpoint → Lo Manthang). Falls back to native swipe +
  scroll-snap on touch devices and for reduced-motion users.
- **Sacred Kagbeni** — asymmetric grid: Kag Chode monastery (1429), shaligram
  fossils, Pitri Mokshasthala shraddha rites, Phudzling cave ruins.
- **Seasons** — accessible tabs (arrow-key navigable) with animated
  temperature/wind/sky meters; covers the rain-shadow monsoon advantage.
- **Travel guide** — accordion with the **2026 permit reform** (US$50/day
  restricted-area permit replacing the old $500/10-day fee; solo-with-guide
  allowed since March 2026), transport, lodging, and wind wisdom.
- **Gallery** — editorial grid with a keyboard-navigable lightbox
  (arrows / Escape), shared with the Sacred cards.
- Scroll-progress bar, hide-on-scroll header, film-grain overlay, custom
  cursor dot (desktop only), full `prefers-reduced-motion` support.

## Content accuracy

Facts were researched in July 2026: elevation and coordinates, Kag Chode
Thupten Samphel Ling's 1429 founding, the Ka-Ga-Beni etymology, the salt-trade
history, shaligram and shraddha traditions, Phudzling's 34 ruined houses, and
the new per-day Upper Mustang permit pricing. Re-verify permit rules before
publishing future updates — they change.

## Images & licensing

All 41 photographs come from Wikimedia Commons under free licenses
(CC BY / CC BY-SA / public domain). Attribution is provided on
[credits.html](credits.html), generated from `image-credits.json`.
Keep that page linked in the footer to stay license-compliant.

## Run locally

```
python -m http.server 8000
```

then open <http://localhost:8000>.
