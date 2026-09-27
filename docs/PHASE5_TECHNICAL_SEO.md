# St. George, UT — Fence & Block Wall — Phase 5 (Technical SEO & Schema) Report

**Date:** 2026-09-27 · **Skill:** rank-rent-build **v1.41** (SKILL.md header, confirmed this session) · **Site:** St. George Elite Fence, https://stgeorgeelitefence.com (live) · **Repo:** `rank-rent-fence-blockwall-st-george` (GitHub `Spaulbick1/rank-rent-fence-blockwall-st-george`, `main`, Cloudflare Pages auto-deploy) · **Built in** `$HOME/fb` on the device, synced into the repo. **NOT PUSHED YET** — see "Push".

## Gate (passed)
- Phase 4 had not been committed at session start (HEAD `f1de46e`, Phase 4 files uncommitted; live `/contact/` was Cloudflare's homepage fallback). `push-phase4.ps1` stopped at its local build: `Cannot find module @rollup/rollup-win32-x64-msvc` — `node_modules` was installed from the Linux device shell, so Windows lacks rollup's native binary. The same source built clean on the device (24 pages), so Scott ran the script's git steps by hand: **commit `0537d3f`, pushed `f1de46e..0537d3f`**.
- Live after deploy (title + H1 checked, not just status): `/contact/`, `/privacy-policy/`, `/terms-of-service/`, `/how-fence-and-wall-matching-works/`, `/washington-county-fence-service-areas/`, `/fence-installation-washington-ut/`, `/fence-installation-hurricane-ut/`, `/fence-contractor-ivins-ut/`, `/fence-installation-santa-clara-ut/` all real pages. Hurricane FAQ showed the 7-ft / 4-ft wording.

## Audit tooling (new)
`scripts/audit.py` — run after any build: `python3 scripts/audit.py dist` (add `--links` to list named-but-unlinked code/statute citations). Exits 1 on any FAIL. Checks: title ≤58 / meta ≤155 and uniqueness; canonical = apex + trailing slash (none on 404); og:url/og:title/og:image/twitter tags; noindex only on `/thank-you/` and `/404/`; one H1 and heading-level skips; internal links + `#anchors` resolve; orphans and thin inbound; images alt/width/height/lazy/WebP; footer disclosure exactly once; pool + height pattern sweep (known false positive whitelisted); one JSON-LD block, Organization logo ImageObject ≥112, exactly one WebPage with `@id` = canonical+`#webpage`, Service.provider = Organization `@id`, WebPage.mainEntity → a Service in-graph, Article.mainEntityOfPage `@id` = WebPage `@id`, every `{"@id"}` reference resolves in-graph, banned types (LocalBusiness, HomeAndConstructionBusiness, GeneralContractor, Review, AggregateRating, Rating) anywhere in the graph, FAQ and HowTo text visible on the page; sitemap set = indexable pages; robots allow-all incl. AI bots + Sitemap line; IndexNow key byte-exact.

**Result on the final build: 24 pages, 0 FAIL, 0 WARN.** (First run: 0 FAIL after correcting the script's disclosure fingerprint; 5 WARN — 404 heading skip, four city silos with only one inbound page. Both fixed below.)

## Per-page result (final build)
| Route | Title | Meta | Schema beyond Org/WebSite |
|---|---|---|---|
| `/` | 58 | 145 | WebPage→Service, FAQPage |
| `/about/` | 33 | 130 | WebPage, Breadcrumb, Service |
| `/best-fence-and-wall-companies-st-george-ut/` | 56 | 151 | + FAQPage, ItemList |
| `/block-wall-installation-st-george-ut/` | 54 | 154 | + FAQPage |
| `/cmu-block-wall-vs-wood-fence-st-george-ut/` | 57 | 146 | + Article, FAQPage |
| `/contact/` | 46 | 140 | Service |
| `/fence-and-block-wall-cost-st-george-ut/` | 56 | 141 | + Article, FAQPage |
| `/fence-contractor-ivins-ut/` | 53 | 145 | city Service, FAQPage |
| `/fence-installation-hurricane-ut/` | 57 | 149 | city Service, FAQPage |
| `/fence-installation-santa-clara-ut/` | 56 | 151 | city Service, FAQPage |
| `/fence-installation-st-george-ut/` | 58 | 145 | + FAQPage |
| `/fence-installation-washington-ut/` | 58 | 138 | city Service, FAQPage |
| `/fence-permit-st-george-ut/` | 52 | 151 | + Article, FAQPage, HowTo |
| `/fence-repair-st-george-ut/` | 55 | 143 | + FAQPage |
| `/hoa-fence-requirements-st-george-ut/` | 55 | 142 | + Article, FAQPage |
| `/how-fence-and-wall-matching-works/` | 56 | 137 | + FAQPage |
| `/licensed-fence-contractor-compare-st-george-ut/` | 57 | 147 | + Article, FAQPage, HowTo |
| `/pool-fence-and-gate-st-george-ut/` | 58 | 148 | + FAQPage, HowTo |
| `/privacy-policy/` | 39 | 148 | WebPage, Breadcrumb |
| `/retaining-wall-cost-st-george-ut/` | 56 | 146 | + Article, FAQPage |
| `/terms-of-service/` | 41 | 141 | WebPage, Breadcrumb |
| `/washington-county-fence-service-areas/` | 58 | 146 | + FAQPage |
| `/thank-you/` (noindex) | 41 | 98 | WebPage, Breadcrumb |
| `/404/` (noindex, no canonical) | 39 | 100 | WebPage, Breadcrumb |

Title lengths are the full rendered `<title>` including the ` | St. George Elite Fence` suffix. Every Service node's `provider` is `https://stgeorgeelitefence.com/#organization`; every WebPage `@id` is `abs(path)+'#webpage'` from the same `abs()` helper that builds `webPageId()` for Article, so trailing-slash normalization is identical on both sides (Rule 14). Organization logo = `/images/logo-mark.png` 512×512 ImageObject (Rule 13). No LocalBusiness / Review / AggregateRating anywhere; `ItemList` entries are `Organization`. No `address` in schema (no invented local address).

## Fixes shipped this phase
1. **Hurricane permit FAQ (carry-in 2)** — rewritten. Utah Code **15A-2-103, effective 7/1/2026** (H.B. 65, 2026 GS, signed 2026-03-17) adopts the **2024 IBC but keeps the 2021 IRC**; homes and their accessory structures fall under the IRC (R101.2). New wording cites the **Utah-amended 2021 IRC R105.2**: fences not over 7 ft, and retaining walls holding back less than 4 ft of unbalanced fill (unless supporting a surcharge or requiring engineered design), are permit-exempt. The old "2021 IBC… measured from the bottom of the footing" wording is gone. The page's source line now links Utah Code §15A-2-103. No pool-barrier height (the 2024 IBC's "other than swimming pool barriers" carve-out is not used).
2. **S230 (carry-in 3)** — R156-55a-301af read directly on adminrules.utah.gov: S230 scope includes installing "brick, block, … concrete blocks". License page now says the rule lists brick, block, and concrete blocks within S230 and gives DOPL's record label ("S230 - Masonry, S/S, Glass, Rain Gutter"). No company named as licensed; the "confirm with DOPL" advice stays.
3. **City-silo inbound links** — homepage service-area paragraph now links Washington, Hurricane, Ivins, and Santa Clara (each silo: 2 inbound pages + footer hub).
4. **On-page research links** — source/credit lines on the fence hub, block-wall hub, cost guide, repair, HOA, retaining-wall cost and permit pages now link St. George City Code §10-18-1 / §10-18-5 (stgeorge.municipal.codes, opened live 2026-09-27); license page links Utah Code §58-55-302, §58-55-305, §38-11-107, §38-11-204 (all opened live on le.utah.gov). FAQ answers were left as-is: `FAQ.astro` renders answers as escaped text, so no links inside them.
5. **404** — added an H2 ("Popular guides") above the icon list (was H1→H3).

## Checks that passed without changes
- **Sitemap:** `@astrojs/sitemap` pinned `3.6.0` (no caret) in `package.json`; filter excludes `/thank-you/` and `/404`. Live `/sitemap-0.xml` lists exactly the 22 indexable URLs, no thank-you/404.
- **robots.txt:** allow-all incl. AI crawlers, `Sitemap: https://stgeorgeelitefence.com/sitemap-index.xml`; thank-you/404 deliberately not Disallowed.
- **IndexNow:** `public/30a69542c81d43d3cbb37b4ee172adee.txt` byte-exact (no newline); live URL returns the key string.
- **noindex:** `noindex,follow` on `/thank-you/` and `/404/` only; 404 has no canonical (Cloudflare serves it for every unmatched URL).
- **Images:** all via `astro:assets` → WebP with width/height; alt on every image; at most one non-lazy (hero) image per page. Only PNGs are the logo and the OG card (not `<img>`).
- **Headings:** one H1 per page, no level skips (after the 404 fix).
- **Internal links:** 0 broken links or anchors; no orphans; all internal hrefs carry trailing slashes.
- **Canonical host:** every canonical, og:url, schema URL and internal absolute link uses the apex. A fetch of `https://www.stgeorgeelitefence.com/` came back as the apex homepage — confirm it is a 301 (not a duplicate serve) with the Cloudflare www→apex redirect rule at Phase 7.
- **Disclosure** exactly once per page (footer); **no pool-barrier height** anywhere (sweep clean).

## Facts (Operating Rule 8 — facts files fixed first, then pages)
- `claude_FACTS_UT_STATE` (Project doc): **UT-011** added (Taylor Made Fencing E100/B100/S330; Modern Stone & Masonry S230/S330; S230 scope text; S330 fences/barriers + retaining walls re-read). **UT-012** added (15A-2-103 editions eff. 7/1/2026: 2024 IBC, 2021 IRC, 2023 NEC, 2024 IPC/IMC/IFGC/IECC/IEBC; IRC R105.2 Utah-amended and IBC 2024 105.2 fence/retaining-wall exemptions). §4 gaps closed: CMU/masonry classification; **NEC edition (2023 NEC — useful for st-george-electrical)**. Flagged: the Drive doc's UT-005 (tree service) collides with the Project doc's UT-005 (plumbing).
- `claude_FACTS_ST_GEORGE` (Drive doc): **WC-010 update** paragraph appended via the Docs editor in Chrome ("Saved to Drive") — IRC R105.2 via Hurricane §9-1-2 + UT-012, superseding the 2021-IBC reading.
- `st-george-fence-blockwall_DOPL_AND_HURRICANE_PERMIT_FINDINGS_2026-09-26.md` — merged; marked closed.

## Grok second-opinion checkpoint
Not run this session (manual relay, no connector). Open — do it before Phase 7 launch at the latest; verify every claim against rendered output before acting.

## Tracker
`claude_KEYWORD_AND_BUILD_TRACKER.xlsx` Master Coverage Index **A3** — Phase 5 note prepended (backup: `_backups_tracker/claude_KEYWORD_AND_BUILD_TRACKER_pre-sgfw-phase5_20260927.xlsx`). No keyword rows changed (no new pages).

## Push (Scott runs this)
`push-phase5.ps1` (ASCII) in the repo skips the local build (Windows `node_modules` lacks rollup's win32 binary; the build was verified on the device and Cloudflare builds on Linux). It commits `src`, `docs`, `scripts` and pushes `main`.

## Open items
1. **Push** Phase 5, then spot-check `/fence-installation-hurricane-ut/` (new FAQ wording) and `/licensed-fence-contractor-compare-st-george-ut/` (S230 sentence).
2. **Grok checkpoint** (above).
3. **www→apex 301** and Pages custom-domain status (Phase 7).
4. **IndexNow submission** — only the key is live; full-catalog GET submissions are Phase 7 item 4.
5. **Windows `node_modules`** — local Windows builds will keep failing until a Windows-side install is done; don't run one from the device shell afterwards without reinstalling. Push scripts should skip the local build step.
6. Carried: attorney review of Privacy/Terms (deferred by Scott), Adobe Stock swaps when credits reset (deferred), Hurricane Building Dept call (the IRC exemption answers the general question; a city call still confirms local practice).

## Next-session prompt (Phase 6)
> Follow the rank-rent-build skill. Execute Phase 6 (Testing) only for St. George, UT fence & block wall in the existing repo `rank-rent-fence-blockwall-st-george` (live at https://stgeorgeelitefence.com; Cloudflare Pages deploys from GitHub `Spaulbick1/rank-rent-fence-blockwall-st-george`, branch main). Confirm the skill's current version from its SKILL.md header first. Gate: confirm Scott ran `push-phase5.ps1` (a Phase 5 commit after `0537d3f` on origin/main) and that `/fence-installation-hurricane-ut/` shows the IRC R105.2 permit FAQ and `/licensed-fence-contractor-compare-st-george-ut/` shows the S230 sentence live; if not, stop and ask. Build in `$HOME/fb` on the device (copy the repo without dist/.git), run `python3 scripts/audit.py dist` (must be 0 FAIL), then run the skill's phase-6-testing.md checklist: Playwright mobile/desktop layout at 390/1024/1280 px on all 24 routes, keyboard/focus and contrast checks, link check of every outbound URL (open each in the browser), JSON-LD through validator.schema.org on the live URLs, and ask Scott for PageSpeed/Lighthouse mobile results to paste back. Read `st-george-fence-blockwall_PHASE5_TECHNICAL_SEO.md` first. Rules unchanged: sourced facts only (UT-/WC-/SG- IDs), no pool-barrier height, all $ from src/lib/costs.ts, disclosure once in the footer, icon accents on itemized lists. Save `st-george-fence-blockwall_PHASE6_TEST_REPORT.md` to the project and give Scott the PowerShell to push.
