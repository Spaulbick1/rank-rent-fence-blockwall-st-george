# St. George Fence & Block Wall — Phase 2 Design System

**Niche/location:** Fence & block wall, St. George, UT (Washington County)
**Skill version confirmed:** rank-rent-build v1.41 (Operating Rules 6, 12–16 applied)
**Phase:** 2 (Design System + Astro repo). Inputs: `KEYWORD_RESEARCH`, `CONTENT_PLAN`, `NICHE_VALIDATION` (GO, upgraded 2026-09-23).
**Repo:** `rank-rent-fence-blockwall-st-george` (Astro 4.16, Tailwind 3.4, `@astrojs/sitemap` pinned 3.6.0, static, zero JS by default, Cloudflare Pages)

## 0. Status

- Domain: **`stgeorgeelitefence.com` NOT YET PURCHASED.** Cloudflare returned "An unexpected error occurred while processing your payment" at checkout (account count stayed at 33, nothing charged). Scott to complete ($10.46/yr) or use another registrar. `astro.config.mjs` carries a "PURCHASE PENDING 2026-09-23" comment.
- Homepage smoke-test builds cleanly; JSON-LD parsed and verified (see §8). A browser-rendered visual check was **not** completed (see open items).

## 1. Brand & voice

- Brand: **St. George Elite Fence** (contractor-sounding name allowed under Rule 15; disclosure held at full strength — referral/matching only, Utah Code 58-55-102(17), UT-001; legal entity line in footer; readers told to verify any contractor via Utah DOPL; no license classification asserted).
- Positioning: the homeowner who is about to build and needs the permit, HOA and contractor questions answered first. Headline: "Building a Fence or Block Wall in St. George? Start With the Permit, the HOA, and the Right Local Pro."
- Voice: plain, municipal-code-literate, no hype. Sourced facts only: St. George City Code §10-18-1 (front yard max 4 ft; side/rear 6 ft 4 in) and §10-18-5 (permit for any front-setback fence/wall and for CMU/retaining walls of 4 ft or more).
- Guide framing kept out of header, hero and TrustBar (v1.19).
- **Do not publish** any pool-barrier height figure (unverified gap).

## 2. Palette — "Virgin River & Cliff Brass"

| Token | Hex | Role |
|---|---|---|
| river | #0E5C7A | Primary: nav, headings, links, phone-button fill (hue ~196.7°) |
| river-dark | #093B4F | Footer, block shadow |
| river-50 | #E6F0F4 | Tints |
| brass | #785C05 | ACCENT ONLY: icon tint, cap rules, result accents (hue ~45.4°). Never a CTA fill |
| brass-dark | #574103 | Accent text on brass-50 |
| brass-50 | #F5EDD8 | Accent surface |
| ink | #22201D | Body text |
| muted | #59544C | Secondary text |
| paper | #F7F5EF | Page background (cool limestone) |
| tint | #ECE8DD | Card/section surface |
| tint-line | #D5CFC0 | BORDER ONLY (never text) |
| alert | #9A3524 | Functional only: errors, permit/hazard callouts |

Chosen for a lane no St. George or fence-niche sibling occupies (rust/adobe, bark, juniper, plum, navy all taken); hue distances checked against every sibling during palette selection.

### Contrast (WCAG, computed programmatically, threshold 4.5:1 text)

| Pair | Ratio |
|---|---|
| ink on paper | 14.90 |
| ink on tint | 13.27 |
| muted on paper | 6.89 |
| muted on tint | 6.13 |
| white on river (phone button) | 7.42 |
| river on paper (links/headings) | 6.81 |
| river on tint | 6.06 |
| brass on paper | 5.78 |
| brass on tint | 5.15 |
| brass on brass-50 | 5.40 |
| brass-dark on brass-50 | 8.32 |
| alert on paper | 6.62 |
| alert on tint | 5.90 |
| white on river-dark (footer) | 12.00 |
| brass-50 on river-dark (footer) | 10.28 |
| Logo cream on river | 6.35 |
| Logo brass #C9A24A on river (non-text graphic, 3:1 rule) | 3.09 |
| tint-line on paper (border only, not text) | 1.43 |

All text pairs pass 4.5:1. The 3.09 logo pair is a non-text graphic (≥3:1 required).

## 3. Typography

- Display: system serif stack (ui-serif, Georgia, Iowa Old Style, Palatino, Cambria) — stone-cut plaque feel, zero font bytes.
- Body: system sans stack.
- Fluid scale: `fl-sm` to `fl-3xl` via `clamp()`. Prose max width 66ch; content 72rem.
- Shape: `rounded-blk` 3px square-cut corners; `shadow-block` 3px 3px 0 river-dark.

## 4. Archetype — Suitability Worksheet

Zero-JS, `:has()`-driven two-question survey (Q1 project type: new fence, repair, wall, pool fence, HOA; Q2 lot: flat, slope, pool, new-construction lot) that resolves to a "Your likely path" box linking to Phase 3 money pages. Progressive enhancement: under `@supports selector(:has(*))` panels are hidden until a radio is checked; without `:has()` support all panels render as readable static content. Nearest comparators in the portfolio: redding-fence-blockwall Estimator and kingman-fence Decision Tree; this one differs by being a permit/HOA/lot triage with no numeric output (no cost figure invented). **Archetype needs Scott's confirmation.** (Rule 16: archetype gate dropped, so this is informational.)

## 5. Icon accents (Rule 16 standing convention)

12 line-art paths in `src/lib/icons.ts` (fence, wrench, blocks, poolfence, house, flat, slope, waves, frame, tag, scroll, link), tinted brass by rendering components.

## 6. Header, buttons, hero

- Sticky header, h-16 (v1.33), inline picket mark, nav to Phase 3 routes (Fences, Block Walls, Cost Guide, Permits & HOA, Contact).
- Button hierarchy (v1.17): phone = filled river (`.btn-phone`), quote = outlined (`.btn-quote`). Phone number is a placeholder (`phone: null`, `phoneIsPlaceholder: true`).
- Hero default (new builds): block-wall photo, brass cap rule, block shadow; alt text scene-only.
- TrustBar: Sourced St. George cost ranges / City permit rules cited / Independent referral service.
- Footer: river-dark, brass top border, four columns, disclosure appears once.

## 7. Components & files shipped

`BaseLayout`, `Header`, `Footer`, `Hero`, `TrustBar`, `SuitabilityWorksheet`, `LeadForm` (all fields disabled, "Form opens at launch", A2P consent text), `FAQ`, `StickyCTA`, `Testimonials` (quarantined, not imported; [SAMPLE] entries only). `src/lib/schema.ts` exports: `abs`, `organizationSchema`, `websiteSchema`, `serviceSchema`, `webPageSchema`, `breadcrumbSchema`, `faqSchema`, `schemaGraph`, `webPageId`, `articleSchema`, `umbrellaServiceSchema`, `itemListSchema`, `howToSchema`. Public: favicon, robots.txt, shared IndexNow key file, logo-mark.png (512), og-default.png (1200×630). Homepage smoke test: Hero, Worksheet, TrustBar, FAQ (4), LeadForm.

Schema compliance: Organization (+logo), WebSite, WebPage on every page, umbrella Service, FAQPage with `mainEntity` linked to the Service `@id` (Rules 12–14). No LocalBusiness, AggregateRating or Review schema. No invented local address.

## 8. Build verification

- Built successfully on the device Linux filesystem (`$HOME/fb` working copy). Output: `index.html`, CSS, four optimized webp variants, logo and OG images, robots, IndexNow file, `sitemap-0.xml`, `sitemap-index.xml`.
- **Mounted-folder EPERM:** building directly in the Windows-mounted repo throws EPERM (cannot unlink `dist`/`.astro` temp files). Workaround: copy repo to `$HOME/fb`, symlink `node_modules`, build there. Alternatively grant delete permission on the folder.
- JSON-LD parsed: one block, `@graph` = Organization, WebSite, WebPage, Service (`/#fence-block-wall-referral-service`), FAQPage. All IDs on `https://stgeorgeelitefence.com`.
- Not yet done: rendered screenshots (desktop/mobile) and live click-through of the `:has()` worksheet.

## 9. Open items (flags, not blockers unless stated)

1. **BLOCKER for deploy: buy `stgeorgeelitefence.com`** (Cloudflare payment error; Scott to retry).
2. Utah DOPL manual license check (recommended hardening).
3. Google Ads Transparency Center buyer-signal recheck closer to build.
4. Confirm the Suitability Worksheet archetype.
5. Hero photo is a reused block-wall texture (same as Yuma and East Valley sites) — replace with Adobe Stock.
6. Phase 3 routes linked from nav/footer/worksheet do not exist yet (expected).
7. Pool-barrier height is an unverified gap — do not publish.
8. Push the SG- facts to `claude_FACTS_ST_GEORGE`.
9. Confirm Utah call-recording posture (`callRecordingConsent: 'one-party'` vs the portfolio all-party default).
10. DOPL license classification for fence/masonry work unconfirmed; disclosure deliberately states none.
11. Registrar concentration: Cloudflare already holds 33 domains.
12. Visual browser verification of the built page still to do.
13. Tracker (`claude_KEYWORD_AND_BUILD_TRACKER.xlsx`) row update pending.

## 10. Phase 3 next-session prompt

> Follow the rank-rent-build skill. Read `st-george-fence-blockwall_DESIGN_SYSTEM.md`, `st-george-fence-blockwall_KEYWORD_RESEARCH.md` and `st-george-fence-blockwall_CONTENT_PLAN.md` first. Execute Phase 3 (Content Pages) for St. George, UT fence & block wall in the existing repo `rank-rent-fence-blockwall-st-george`: build the money pages and cost/permit guides per the CONTENT_PLAN using the existing components and schema helpers, cite only sourced facts (St. George City Code §10-18-1 and §10-18-5), no pool-barrier height, no LocalBusiness/Review/AggregateRating schema, disclosure once in the footer. Note the domain `stgeorgeelitefence.com` purchase status before setting canonical URLs, and build in `$HOME/fb` on the device to avoid the mounted-folder EPERM.
