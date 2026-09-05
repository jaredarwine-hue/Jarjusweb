# Jarjus Lawn Care LLC — Marketing Site

## Original Problem Statement
Update the Jarjus Lawn Care site: (1) add "Starting at" mowing prices per acreage tier + disclaimer, (2) testimonials section with "Read our reviews" Google button, (3) service-area section listing 8 central IL towns + "central Illinois" in hero, (4) core content visible without JavaScript (rural slow mobile), (5) LocalBusiness schema + SEO title/meta mentioning "lawn care in Neoga, IL and central Illinois", (6) business name/address/phone matching Google Business Profile.

## Business (exact, matches Google Business Profile)
- Jarjus Lawn Care LLC · 3528 East 930 North, Neoga, IL 62447 · (217) 294-2346
- Google reviews link: https://g.page/r/CRi-e9wy46FdEBM/review

## Architecture
- Frontend: React (CRA) single-page site, framer-motion (scroll reveals, kinetic hero line-reveal, parallax), lenis smooth scroll, Tailwind. Modular sections in `src/components/site/`, content in `src/data/site.js`.
- Backend: FastAPI + MongoDB. `POST /api/quote` stores quote requests; `GET /api/quotes` lists them.
- SEO/no-JS: title, meta description, OpenGraph, LocalBusiness JSON-LD, and a full static `<noscript>` fallback (services, pricing, service area, reviews link, contact) all live in `public/index.html`.

## Implemented (2026-09-05)
- Hero with masked line reveal + parallax, "central Illinois" copy, address badge.
- Towns marquee + service-area grid (Neoga, Effingham, Mattoon, Charleston, Toledo, Shumway, Sigel, Montrose).
- Services: 3 mowing tiers with "Starting at" $41–$61 / $49–$69 / $59–$114, "Get a quote" actions, lot-size/condition disclaimer.
- Reviews section with "Read our reviews on Google" button.
- Contact section with exact phone/address/hours + working quote form (persists to Mongo).
- LocalBusiness schema + SEO meta + noscript fallback in index.html.

## Verified
- curl POST/GET /api/quote works. Screenshots confirm all sections render; quote form submit shows success toast.

## Backlog (P1/P2)
- Swap OG canonical URL to the real production domain once live.
- Optional: seasonal service add-ons (leaf cleanup, fertilization) as their own section.
- Optional: admin view for received quote requests.
