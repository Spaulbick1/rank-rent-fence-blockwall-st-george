# St. George Fence & Block Wall — Phase 3 (Content Pages)

Skill: rank-rent-build v1.41. Built 2026-09-26 in `$HOME/fb` (device Linux FS), synced to this repo.

## Domain status
`stgeorgeelitefence.com` is NOT purchased (Cloudflare checkout failed 2026-09-23; no DNS record found 2026-09-26).
Canonicals, sitemap, robots and schema `@id`s all derive from `site.url` in `src/lib/site-config.ts` and `site` in `astro.config.mjs` (plus the Sitemap line in `public/robots.txt`). If the domain changes, edit those three places only.

## Pages built (10)
/, /fence-installation-st-george-ut/, /block-wall-installation-st-george-ut/, /fence-and-block-wall-cost-st-george-ut/, /fence-repair-st-george-ut/, /pool-fence-and-gate-st-george-ut/, /hoa-fence-requirements-st-george-ut/, /fence-permit-st-george-ut/, /best-fence-and-wall-companies-st-george-ut/, /about/

## Shared code
- `src/lib/costs.ts` — single source for every $ figure (pages import; none typed in prose).
- `src/components/layout/GuideLayout.astro` — hero + quotable answer + schema assembly (Rules 12-14).
- `src/components/sections/CostTable.astro`.

## Facts used
- St. George City Code 10-18-1 and 10-18-5 rechecked 2026-09-26 (code current through Ord. 2026-068, Aug 20 2026).
- Building Dept: 61 S Main St, 435-627-4100 (city site, 2026-09-26). Earlier research doc said 435-627-4000 -- superseded.
- Blue Stakes of Utah 811: 3 business days notice (bluestakes.org, 2026-09-26).
- No pool-barrier height anywhere. No LocalBusiness/Review/AggregateRating. Disclosure once (footer).

## Open items
See the session hand-off. Dead links pending Phase 4: /contact/, /terms-of-service/, /privacy-policy/, /how-fence-and-wall-matching-works/.
Footer links to unbuilt spokes (retaining-wall-cost, licensed-compare, service-area) were removed; re-add when built.
