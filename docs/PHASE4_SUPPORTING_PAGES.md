# St. George Fence & Block Wall — Phase 4 (Supporting Pages & Content)

Skill: rank-rent-build v1.41. Built 2026-09-26 in `$HOME/fb` (device Linux FS), synced to this repo. Full report: project doc `claude/st-george-fence-blockwall_PHASE4_SUPPORTING_PAGES.md`.

## New pages (14)
Utility/legal: /contact/ (#lead-form target), /thank-you/ (noindex), /404 (noindex, no canonical), /privacy-policy/, /terms-of-service/ (full A2P 10DLC set, ATTORNEY REVIEW flagged).
Trust: /how-fence-and-wall-matching-works/.
Spokes: /retaining-wall-cost-st-george-ut/, /cmu-block-wall-vs-wood-fence-st-george-ut/, /licensed-fence-contractor-compare-st-george-ut/.
City silos (each passes the thin-page rule on its own city code): /fence-installation-washington-ut/, /fence-installation-hurricane-ut/, /fence-contractor-ivins-ut/, /fence-installation-santa-clara-ut/.
County hub / service area: /washington-county-fence-service-areas/.

## Shared code added
- `src/components/layout/PageLayout.astro` (supporting-page shell), `src/components/sections/IconList.astro` (Rule 16 icon accents on itemized lists), 10 new icons in `src/lib/icons.ts`.
- `GuideLayout` Service node accepts `areaServed` (city silos scope their Service to one city).
- `src/lib/costs.ts`: retaining-wall detail (HomeGuide Jan 16 2026 + Angi Sep 15 2026), fence stain cost, lifespans, Utah small-project exemption thresholds. No $ typed in page prose.
- Footer: re-added retaining-wall cost, license check, service areas, CMU vs wood. Header: dropped the "Phone line live at launch" text (collided with the nav at 1280 px).
- Images: six reused East Valley/Yuma photos replaced with Pexels stopgaps (Adobe credits still out 2026-09-26). Old files to delete: block-wall-split-face, cracked-block-wall, ornamental-iron-fence, pool-area-security-gate, segmental-block-retaining-wall, vinyl-privacy-fence (.webp).

## Facts used (all read 2026-09-26)
St. George City Code 10-18-1/10-18-5; Washington City Code 9-14-12, 10-5-9, 9-10A-7; Hurricane City Code 10-37-9 (Municode, Jul 8 2026 version) + Building Dept page; Ivins City Code 16.11.135/.136; Santa Clara City Code 17.28; Washington County Code 10-15A-2, 10-15B-3/-4; Utah Code 58-55-302, 58-55-305, 38-11-107/-204, 77-23a-4 (UT-003); DOPL lookup (UT-002).
Not published: any DOPL classification code for CMU/masonry block walls (S330 for fences + retaining walls IS cited, from current R156-55a via UT-007); any pool-barrier height (Ivins 16.11.135(6) height deliberately omitted).

## Audit (24 pages)
Titles <=58, metas <=155, one JSON-LD block per page, WebPage on every page, Service.provider = Organization @id, WebPage.mainEntity -> Service @id, Article.mainEntityOfPage = WebPage @id, FAQ/HowTo text visible, disclosure exactly once per page (footer), no LocalBusiness/Review/AggregateRating, all internal links + anchors resolve, 0 horizontal overflow at 390/1280 px.
