# St. George, UT — Fence & Block Wall — Phase 6 (Testing) Report

**Date:** 2026-09-27 · **Skill:** rank-rent-build **v1.43** (SKILL.md header, confirmed this session; a v1.44 proposal is sitting unsaved in `C:\Rank & Rent\RankRent_rank-rent-build_SKILL_v1.44_PROPOSED.md`) · **Site:** St. George Elite Fence, https://stgeorgeelitefence.com · **Repo:** `rank-rent-fence-blockwall-st-george` (GitHub `Spaulbick1/rank-rent-fence-blockwall-st-george`, `main`, Cloudflare Pages) · **Built in** `$HOME/fb` on the device (repo copied without dist/.git/_to_delete/.astro), fixes synced back into the repo. **No git commands run on the mounted repo.**

## Gate (passed)
- `.git/refs/heads/main` and `.git/refs/remotes/origin/main` both = `b9bc3f4` (read from the ref files, no git call). Reflog shows `76ff8bb..b9bc3f4` "update by push".
- Live, fetched same-origin with `cache: no-store` (Cloudflare `cf-cache-status: DYNAMIC`):
  - `/fence-installation-santa-clara-ut/` title = "Fence & Wall Rules Santa Clara UT | St. George Elite Fence"; footer shows "Hurricane fence rules" and "Ivins fence rules".
  - `/fence-installation-hurricane-ut/` permit FAQ = the Utah 2021 IRC wording (fences not over 7 ft; retaining walls under 4 ft of unbalanced fill; Title 9 §9-1-2). No IBC wording left on the page.
  - `/licensed-fence-contractor-compare-st-george-ut/` shows the S230 sentence ("brick, block, and concrete blocks … S230 - Masonry, S/S, Glass, Rain Gutter").

## Version drift found at session start (important)
Phase 5 ran under skill v1.41. The installed skill is now **v1.43**, which added two Phase 5 checklist items this site did not have: **Rule 17** (sitemap `<lastmod>` via a build-time `serialize()` hook) and **Rule 18** (RelatedServices block + `src/lib/priority-links.ts`). The site was unbuilt when the 2026-09-26 portfolio RelatedServices rollout ran, so it was skipped. Phase 6's source audit re-runs Rule 18's pass rule, so both were added here (fix #1 and #2 below).

## Build + source audit
- Build: `node node_modules/astro/astro.js build`, **24 pages, rc=0**.
- `python3 scripts/audit.py dist`: **0 FAIL / 0 WARN** (final build). `audit.py` gained Rule 17 and Rule 18 assertions this phase. Negative tests: stripping `<lastmod>` gives 1 FAIL, and hiding the block on `/about/` gives 1 FAIL.
- Phase 6 table checks:

| Check | Result |
|---|---|
| Schema generators emit valid JSON-LD | Pass: one graph per page, every `@id` ref resolves, Rules 12–14 hold, no banned types, no address |
| `[SAMPLE]` markers | 0 in rendered pages (`Testimonials.astro` is unimported) |
| Internal links | 0 broken links/anchors |
| Titles ≤58 / metas ≤155 | Pass on all 24 (unchanged from Phase 5 table) |
| WCAG AA contrast | Pass (token table below + axe on every route) |
| noindex + sitemap exclusion | `/thank-you/` + `/404/` noindex, out of sitemap; 22 URLs in sitemap, all with `<lastmod>` |
| Third-party disclosure | Once per page, in the footer (site rule); present on about/terms/guides through the footer |
| Sticky CTA targets | `/contact/#lead-form` resolves; legal/utility pages pass their own `quoteHref` |
| Sticky header | `position: sticky; top: 0`, 65 px tall at every width; `scroll-mt-24` on `#lead-form` and `#worksheet`; `main` has `scroll-mt-16` |
| All $ from `costs.ts` | Pass: the only `$` outside `costs.ts` is a code comment; the $7,000/$3,000 statute thresholds render from `costs.ts` |
| No pool-barrier height | Pass (audit sweep) |
| Icon accents on itemized lists | Pass; the new RelatedServices cards also carry brass icon accents |

## Rule 18 — inbound internal links (built HTML, occurrences, self-links excluded)

| Page | Role | Before | After |
|---|---|---:|---:|
| `/fence-repair-st-george-ut/` | priority (intro link 1) | 28 | 66 |
| `/pool-fence-and-gate-st-george-ut/` | priority (intro link 2) | 31 | 69 |
| `/hoa-fence-requirements-st-george-ut/` | priority | 36 | 57 |
| `/retaining-wall-cost-st-george-ut/` | priority | 33 | 52 |
| `/fence-and-block-wall-cost-st-george-ut/` | priority | 93 | 112 |
| `/block-wall-installation-st-george-ut/` | priority | 83 | 102 |
| `/fence-installation-st-george-ut/` | priority | 83 | 102 |
| `/contact/` | priority | 91 | 110 |
| `/privacy-policy/` | legal | 27 | 27 |
| `/terms-of-service/` | legal | 24 | 24 |

Pass: every priority page beats both legal pages, and the lowest margin is 52 vs 27. The block renders once on each of the 20 non-excluded pages and never on privacy, terms, thank-you or 404. There are no self-links. Not in the list and at or below Privacy: `/best-fence-and-wall-companies-st-george-ut/` (27, tied), the four city silos (25), `/how-fence-and-wall-matching-works/` (25), `/about/` (24). That's allowed by the rule, but see open item 4.

## Playwright layout (local static server, Chromium) — 24 routes × 390 / 1024 / 1280 px = 72 checks
- **Horizontal overflow:** 0/72. The scroll width equals the viewport on every page. The cost tables scroll inside their own wrapper.
- **Sticky header:** sticky, `top: 0`, still at 0 px after a 1,500 px scroll on 72/72. Height is 65 px (the mobile cap is 64–72).
- **Footer city links:** all four ("Washington, UT fence rules" … "Santa Clara fence rules") are single-line, inside their column, with no overlap at every width. The 1024 px 4-column footer was checked visually.
- **Found and fixed:** at 390 px the fixed mobile StickyCTA bar (94 px) covered the footer's copyright line at the bottom of every page (text bottom 796 px vs bar top 750 px). After the fix the text bottom is 732 px, clear of the bar on 24/24.

## Keyboard / focus
- **Tab order** was checked on `/fence-permit-st-george-ut/` for 45 stops at 1280 and 390. The order is logical (skip link → brand → nav/CTA → breadcrumb → body links → FAQ summaries → RelatedServices → footer). Every stop shows a visible ring, and none is hidden under the sticky header.
- **Before:** there was no focus style (browser default ring only) and no skip link. The mobile menu opened with Enter but Escape didn't close it.
- **After:**
  - a sitewide `:focus-visible` ring, 3 px river, with a brass-50 variant on the dark footer;
  - a "Skip to main content" link that is visible on focus and sits above the header;
  - Escape closes the menu and returns focus to the button.
- **axe-core 4.x** (WCAG 2.0/2.1/2.2 A+AA + best-practice) on home, about, contact, cost guide and permit at 390/1024/1280: **0 violations** except one `target-size` "partially obscured" hit. That hit is a footer link sitting under the fixed mobile bar at the moment of the scan (it clears on scroll), so it's accepted.
- Fixed on the way: 16 px-tall footer links are now 24 px targets; `.sgfw-table-wrap` (overflow-x) is now `tabindex="0" role="region"` with a label, so keyboard users can scroll the tables; the StickyCTA is now an `<aside aria-label>` landmark.

## Colour contrast
axe `color-contrast` across **all 24 routes: 0 violations.** Computed token pairs:

| Pair | Ratio | Need |
|---|---:|---:|
| ink / paper · white · tint | 14.90 · 16.25 · 13.27 | 4.5 |
| muted / paper · white · tint | 6.89 · 7.51 · 6.13 | 4.5 |
| river / paper · white · tint · river-50 | 6.81 · 7.42 · 6.06 · 6.41 | 4.5 |
| white / river (phone button) | 7.42 | 4.5 |
| paper · tint / river-dark (footer) | 11.01 · 9.80 | 4.5 |
| brass / paper · white (eyebrow) | 5.78 · 6.30 | 4.5 |
| brass-dark / brass-50 (table head) | 8.32 | 4.5 |
| alert / white | 7.22 | 4.5 |
| brass / brass-50 (icon mark, graphic) | 5.40 | 3.0 |
| SVG `#F5EDD8` pickets / `#0E5C7A` | 6.35 | 3.0 |
| SVG `#C9A24A` rails / `#0E5C7A` | 3.09 | 3.0 |
| focus ring river / paper; brass-50 / river-dark | 6.81; 10.28 | 3.0 |

`tint-line` (1.43:1) is a border-only token and is never used for text.

## Outbound URLs: 43 unique, all opened in a real browser
Checked in Chrome where the extension allowed it. The 13 domains the extension blocks (Blue Stakes, Santa Clara, Municode, adminrules, commerce.utah.gov, amlegal, Angi, HomeWyse, FHWA, four competitors) were checked in the built-in browser after Scott approved each site. **43/43 load the cited page** (titles/section headings match: e.g. amlegal "9-14-12: MAXIMUM HEIGHT OF FENCES, WALLS AND HEDGES", Municode "10-37-9. - Fences and walls.", adminrules text contains "S230 Masonry, Siding, Stucco, Glass, and Rain Gutter Contractor"). Redirects updated to the final URL:

| Old | Now |
|---|---|
| `https://dopl.utah.gov/` (4 pages) | `https://commerce.utah.gov/dopl/` |
| `commerce.utah.gov/disciplinary-actions-and-citations/` | `commerce.utah.gov/dopl/enforcement/disciplinary-actions-and-citations/` |
| NerdWallet `/article/mortgages/cost-to-install-a-fence` | `/home-ownership/home-improvement/learn/cost-to-install-a-fence` |
| `kirklandsfenceandgarden.com/` | `www.kirklandsfenceandgarden.com/` |
| HomeAdvisor wrought-iron (no slash) | trailing slash |

All outbound links carry `rel="noopener"`.

## Structured-data validators (live site, pre-fix build `b9bc3f4`)
- **validator.schema.org, 0 errors / 0 warnings on all 8 pages checked:**
  - `/`: WebPage, FAQPage
  - `/fence-permit-st-george-ut/`: HowTo, Article, FAQPage
  - `/licensed-fence-contractor-compare-st-george-ut/`: HowTo, Article, FAQPage
  - `/best-fence-and-wall-companies-st-george-ut/`: WebPage, ItemList, FAQPage
  - `/fence-installation-santa-clara-ut/`: WebPage, FAQPage
  - `/pool-fence-and-gate-st-george-ut/`: HowTo, WebPage, FAQPage
  - `/block-wall-installation-st-george-ut/`: WebPage, FAQPage
  - `/fence-and-block-wall-cost-st-george-ut/`: ran, but the result wasn't readable
- The remaining 16 were not run. Google served its "unusual traffic" CAPTCHA page, and CAPTCHAs are not something Claude completes. Those pages use the same generators, and `audit.py` checks their full graphs.
- **Google Rich Results Test:**
  - `/fence-permit-st-george-ut/` and `/licensed-fence-contractor-compare-st-george-ut/`: Article + Breadcrumbs valid. There were 4 non-critical issues, all "Invalid datetime value / missing a timezone" on `datePublished`/`dateModified` (date-only `2026-09-26`). **Fixed:** `schema.ts` `utahDateTime()` now renders `2026-09-26T00:00:00-06:00` (same calendar date, Utah offset, DST-aware).
  - `/best-fence-and-wall-companies-st-george-ut/`: Breadcrumbs valid (Organization ItemList isn't a Google rich type, as expected).
  - `/`: crawled OK, no rich-result types (expected: FAQ rich results are gov/health only).

## Fixes shipped this phase (files)
1. **Rule 17**, `astro.config.mjs`: sitemap `serialize()` stamps `<lastmod>` with the build time (22/22 URLs).
2. **Rule 18**:
   - `src/lib/priority-links.ts` (new): 8 links plus icon keys; excludes `/privacy-policy`, `/terms-of-service`, `/thank-you`, `/404`.
   - `src/components/sections/RelatedServices.astro` (new): a cap-stone card with the heading "Popular next steps in St. George, UT", brass icon accents, and `id="next-steps-heading"`.
   - `BaseLayout.astro`: `hideRelated` prop; the block renders after `<slot />`.
3. **Mobile footer clearance**, `Footer.astro`: `!pb-28 sm:!pb-12 lg:!pb-16`. The `!` is needed because `.section` is unlayered CSS and beats plain utilities.
4. **Footer tap targets**, `Footer.astro`: link class `inline-block py-1`.
5. **Focus ring + skip link**, `global.css` + `BaseLayout.astro` (`<main id="main" tabindex="-1">`).
6. **Escape closes the mobile menu**, `Header.astro`.
7. **Keyboard-scrollable tables**, `CostTable.astro`, `cmu-block-wall-vs-wood-fence-st-george-ut.astro`, `washington-county-fence-service-areas.astro`.
8. **StickyCTA landmark**, `StickyCTA.astro` (`<aside aria-label="Call or get matched">`).
9. **Article datetimes with timezone**, `schema.ts`.
10. **Outbound redirects**, `costs.ts` and 6 page files (table above).
11. **Disclosure punctuation**, `site-config.ts`: "--" → "—" (the wording is unchanged).
12. **`scripts/audit.py`**: Rule 17 + Rule 18 assertions.

Repo sync: 19 modified + 2 new files, and a byte-compare of `$HOME/fb` vs the repo shows 0 differences. No uncommitted work from other sessions was in these paths (repo was clean at `b9bc3f4` for `src/`).

## Push + live verification (2026-09-27)
Scott ran `push-phase6.ps1`: commit **`49059a2`**, `b9bc3f4..49059a2 main -> main`, 22 files. The CRLF warnings are Git autocrlf notices only. Live check right after the deploy (no-store fetch):
- The RelatedServices block is on `/`, `/fence-repair-st-george-ut/`, `/fence-permit-st-george-ut/` and `/licensed-fence-contractor-compare-st-george-ut/`, and absent on `/privacy-policy/`.
- The skip link and footer `!pb-28` are live.
- Article `datePublished` = `2026-09-26T00:00:00-06:00`.
- DOPL links point to `commerce.utah.gov/dopl/`.
- `/sitemap-0.xml` has 22 `<url>` and 22 `<lastmod>`.

**Rich Results Test re-run on `/fence-permit-st-george-ut/`:** Articles + Breadcrumbs valid, and the 4 datetime non-critical issues are gone.

## Cache purge + PageSpeed Insights (2026-09-27, after `49059a2`)
Cloudflare → stgeorgeelitefence.com → Caching → **Purge Everything**, done from the dashboard at Scott's request.

PageSpeed Insights, **mobile**, after the purge:

| Page | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 99 | 100 | 100 | 100 | 1.5 s | 1.8 s | 0 ms | 0 | 2.5 s |
| `/fence-installation-st-george-ut/` | 99 | 100 | 100 | 100 | 1.5 s | 1.5 s | 0 ms | 0 | 2.3 s |
| `/fence-and-block-wall-cost-st-george-ut/` | 100 | 100 | 100 | 100 | 1.5 s | 1.5 s | 0 ms | 0 | 1.5 s |

**Every page meets the targets (Perf 95+ / A11y 100 / BP 95+ / SEO 100); LCP under 2 s on all three.** Informational only: render-blocking CSS ~150 ms; "legacy JavaScript" 11 KiB + a "3rd parties" entry; cache lifetime 4 KiB; homepage image delivery ~52 KiB; 2 long tasks + a DOM-size note on the service page. **Phase 7 finding:** the 11 KiB third-party script is Cloudflare's `static.cloudflareinsights.com/beacon.min.js`, injected at the edge on browser navigations because the zone's RUM / Web Analytics setting is **on** (automatic setup). Rocket Loader is **off**. The site itself ships no third-party JS. Left on (portfolio decision: keep Web Analytics and disclose it; Privacy line live in `e12924d`).

## Phase 6 close-out (done in the Phase 7 session, 2026-09-27)
- **Live robots/sitemap/key:** `/robots.txt` 200 (allow-all, AI crawlers not blocked, `Sitemap:` line → `sitemap-index.xml`); `/sitemap-index.xml` 200 → `sitemap-0.xml`; `sitemap-0.xml` 22 URLs, 22/22 `<lastmod>` (`2026-09-27T22:29:15.987Z`); `/30a69542c81d43d3cbb37b4ee172adee.txt` 200, 32 bytes, exact key. **Pass.**
- **"Popular next steps in St. George, UT"** renders once on all 20 non-legal sitemap pages and on neither Privacy nor Terms (live crawl of all 22). **Pass.**
- **Real-phone hand test:** not done yet (Scott, 2026-09-27). Carried to the Phase 7 checklist as an open item.
- **Open items 3 and 4 decided by Scott in Phase 7:** switch Article/best-of `WebPage.mainEntity` to the page's own `#article` / `#itemlist` ("Switch"), and add an "Areas & guides" line to RelatedServices ("Add it"). Both built in Phase 7; see `PHASE7_DEPLOYMENT_CHECKLIST.md`.
- **validator.schema.org remaining URLs:** Google's CAPTCHA returned on the first Phase 7 attempt; see the Phase 7 checklist for the remaining list and the offline vocabulary check.

## Open items
1. ~~Push~~ Done (`49059a2`). ~~Cache purge~~ Done.
2. ~~PageSpeed / Lighthouse~~ Done. All targets met (table above).
3. **Rule 14 question from Phase 5, now answered by the v1.44 rollout:** these pages' `WebPage.mainEntity` points at the sitewide umbrella Service, which v1.44's exception explicitly keeps ("a WebPage that already points at a Service `@id` keeps it", the same as `stgeorgeelitepools.com`, rollout flag #2). No change was made. If you'd rather Article/best-of pages point at their own `#article`/`#itemlist` on both St. George sites, it's one decision covering both. Also, v1.44 is still a proposal and hasn't been saved as the installed skill.
4. **Rule 18 margin (optional):** the best-of page ties Privacy (27), and the city silos, how-matching and about sit at 24–25. That's allowed, since they aren't priority pages. A cheap lift is an "Areas & guides" line in RelatedServices (the Yuma-fence pattern). This is a Phase 7 decision.
5. **validator.schema.org on the remaining 16 URLs:** re-run after the push. Google's CAPTCHA blocked automation. Same generators, `audit.py` clean.
6. **Human mobile hand test (real phone):** sticky bar tap targets, menu, FAQ accordions, pinch-zoom (the viewport meta allows it).
7. Carried from Phase 5: the www→apex 301 check, IndexNow full-catalog submission (Phase 7 item 4), attorney review of Privacy/Terms, Adobe Stock swaps, the Hurricane Building Dept call, and the Windows `node_modules` issue (push scripts skip the local build).

## Human checklist
1. Run `push-phase6.ps1` → Cloudflare Pages build green → **purge the Cloudflare cache** (`purge-cloudflare-cache.ps1` or zone → Caching → Purge Everything).
2. PageSpeed Insights (pagespeed.web.dev), **mobile**, on `https://stgeorgeelitefence.com/`, `/fence-installation-st-george-ut/`, `/fence-and-block-wall-cost-st-george-ut/`. Targets: Perf 95+ / A11y 100 / BP 95+ / SEO 100. Paste all scores and flagged audits back.
3. Verify live: `/robots.txt`, `/sitemap-index.xml` (each `<url>` now has `<lastmod>`), `https://stgeorgeelitefence.com/30a69542c81d43d3cbb37b4ee172adee.txt`, the "Popular next steps in St. George, UT" block at the bottom of any guide, and validator.schema.org clean.
4. Mobile hand test on a real phone: sticky bar tap targets, menu (Escape isn't testable on a phone; tap ☰ again to close), accordions, pinch-zoom not disabled. **No form or tracked number exists yet (v1.32):** nothing to submit or call; those tests are Phase 8/9.

Phase 6 closes when scores hit target and items 3–4 pass.

## Next-session prompt (Phase 7)
> Follow the rank-rent-build skill. Execute Phase 7 (Launch & Handoff) only for St. George, UT fence & block wall in the existing repo `rank-rent-fence-blockwall-st-george` (live at https://stgeorgeelitefence.com; Cloudflare Pages deploys from GitHub `Spaulbick1/rank-rent-fence-blockwall-st-george`, branch main). Confirm the skill's current version from its SKILL.md header first. Gate: origin/main must include the Phase 6 commit (check `.git/refs/remotes/origin/main` by reading the file, no git commands on the mounted repo), and live pages must show the "Popular next steps in St. George, UT" block and `<lastmod>` in `/sitemap-0.xml`. Read `st-george-fence-blockwall_PHASE6_TEST_REPORT.md` first. PageSpeed results: [paste]. Fix anything under target (build in `$HOME/fb`, `python3 scripts/audit.py dist` must be 0 FAIL), then run phase-7-launch.md: www→apex 301, GSC + Bing sitemap submission, IndexNow full-catalog GET submissions, the launch checklist (incl. Rule 17/18 items and on-page research links), finish validator.schema.org on the 16 unchecked URLs, decide open items 3–4 of the Phase 6 report, and write DEPLOYMENT_CHECKLIST.md + OFFPAGE_PLAN.md. Rules unchanged: sourced facts only (UT-/WC-/SG- IDs), no pool-barrier height, all $ from src/lib/costs.ts, disclosure once in the footer, icon accents on itemized lists. Give Scott the PowerShell to push (no local build step).
