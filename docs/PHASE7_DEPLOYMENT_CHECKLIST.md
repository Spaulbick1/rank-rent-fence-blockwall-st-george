# St. George Elite Fence (stgeorgeelitefence.com): Phase 7, Launch & Handoff

- **Repo:** `C:\Rank & Rent\rank-rent-fence-blockwall-st-george\`
  - GitHub `Spaulbick1/rank-rent-fence-blockwall-st-george`, branch `main`.
  - Base at session start: origin/main `49059a2` (Phase 6). During this session a parallel portfolio rollout committed and pushed **`e12924d`** (Privacy: Cloudflare hosting + cookieless Web Analytics line), which is now origin/main and the live production deploy.
- **Pages project:** `rank-rent-fence-blockwall-st-george` (production branch `main`, `npm run build` → `dist`, auto-deploy on). No production env vars set (GA4 deferred to Phase 8).
- **Skill:** rank-rent-build **v1.44**, confirmed from the installed SKILL.md header at session start. (The Phase 6 report's note that v1.44 was "still unsaved" is out of date: it is installed.)
- **Date:** 2026-09-27 (Day 0 for off-page work; the site has been publicly reachable since Phase 3).
- **Same-city precedents:** `st-george-electrical_PHASE7_DEPLOYMENT_CHECKLIST.md`, `st-george-plumbing_PHASE7_DEPLOYMENT_CHECKLIST.md`.
- **Built in** `$HOME/fb` on the device (repo copied without dist/.git/_to_delete/.astro/node_modules, `npm ci`), fixes synced back into the repo. **No git commands run on the mounted repo;** refs were read as files.

**STATUS: LIVE, launch items done except the Scott-only steps in §9** (www→apex redirect rule and the two DNS verification records, then GSC/Bing verify + sitemaps, which I finish once the records exist). The Phase 7 code change set is uncommitted in the repo folder; Scott pushes it with `push-phase7.ps1` (§8).

---

## 0. Gate

| Check | Result |
|---|---|
| origin/main at or after `49059a2` | **PASS.** `.git/refs/remotes/origin/main` = `49059a2` at start; now `e12924d` (child of `49059a2`). Read as files; no `.git/index.lock`. |
| Live "Popular next steps in St. George, UT" | **PASS.** No-store crawl of all 22 sitemap URLs: block renders exactly once on the 20 non-legal pages, 0 on `/privacy-policy/` and `/terms-of-service/`. `cf-cache-status: DYNAMIC`. |
| `/sitemap-0.xml` `<lastmod>` | **PASS.** 22 `<url>`, 22 `<lastmod>` (`2026-09-27T22:29:15.987Z`). |

## 1. Phase 6 close-out

| Item | Result |
|---|---|
| (a) `/robots.txt` | 200. Allow-all (`User-agent: *` / `Allow: /`), no AI-crawler block, no Cloudflare Content-Signal block prepended. `Sitemap: https://stgeorgeelitefence.com/sitemap-index.xml`. |
| (a) `/sitemap-index.xml` | 200, one `<sitemap>` → `sitemap-0.xml` (the index entry itself carries no `<lastmod>`; `@astrojs/sitemap` default, Rule 17 applies to the `<url>` entries). |
| (a) IndexNow key | `https://stgeorgeelitefence.com/30a69542c81d43d3cbb37b4ee172adee.txt` → 200, 32 bytes, body equals the key. |
| (b) Real-phone hand test | **Not done yet** (Scott, 2026-09-27). Open item §9.2. |
| (c) Updated `docs/PHASE6_TEST_REPORT.md` | The repo copy was the pre-push version. Updated with the push/live check, the PSI table, the Cloudflare beacon finding and this close-out section; it rides in the Phase 7 push. |
| PageSpeed (mobile, after purge) | `/` 99/100/100/100, LCP 1.8 s; `/fence-installation-st-george-ut/` 99/100/100/100, LCP 1.5 s; `/fence-and-block-wall-cost-st-george-ut/` 100/100/100/100, LCP 1.5 s. CLS 0, TBT 0 ms on all three. **All targets met.** |
| PSI "legacy JavaScript / 3rd parties 11 KiB" | **Identified:** `static.cloudflareinsights.com/beacon.min.js` + `/cdn-cgi/rum`, injected at the edge on browser navigations only (a `fetch()` of the same page returns clean HTML). Zone settings via the dashboard API: **`rum` = on**, **`rocket_loader` = off**. The account's Web Analytics list (53 sites) has `stgeorgeelitefence.com` with automatic setup. **Left on** per Scott ("check and report, no toggle") and the portfolio decision in `privacy-cloudflare-rollout-2026-09-27.md` (keep Web Analytics, disclose it). The Privacy disclosure is live (`e12924d`, 1 occurrence on the live page). |

## 2. Cloudflare / hosting

| Check | Result |
|---|---|
| Zone | `stgeorgeelitefence.com`, **active**, Free plan. SSL mode Full. |
| Pages custom domains | `stgeorgeelitefence.com` and `www.stgeorgeelitefence.com` both **active** (verification + validation active). |
| DNS | apex + www CNAME → `rank-rent-fence-blockwall-st-george.pages.dev` (proxied); Namecheap email-forward MX ×5 + SPF TXT. No GSC TXT, no Bing CNAME yet. |
| Latest production deploy | `e12924d`, success. |
| **www → apex** | **FAIL at launch, fix handed to Scott.** `https://www.stgeorgeelitefence.com/fence-repair-st-george-ut/` returns the page itself (navigation `redirectCount 0`), not a 301. Canonical already points at the apex, so it isn't an indexing emergency, but it's a duplicate host. The zone has **no** `http_request_dynamic_redirect` ruleset. Creating it from the dashboard session was **blocked by the session's permission guard (DNS / domain changes)**, so Scott adds it (§8 step 1): the same "Redirect from WWW to root [Template]" rule St. George Electric Pro uses (`https://www.*` → `https://${1}`, 301, preserve query). |
| Always Use HTTPS | `off` (zone setting). Optional hardening in the same dashboard visit (SSL/TLS → Edge Certificates). |
| `*.pages.dev` | Same decision as St. George Electric Pro: no handling (canonical + og:url point at the apex, host linked from nowhere, no site in the portfolio ships `_headers`). Watch item only. |

## 3. Indexing

| Step | Result |
|---|---|
| **IndexNow** | Homepage seeded by navigation to the `api.indexnow.org/indexnow` single-URL GET, then the other 21 sitemap URLs by same-origin GET: **21/21 HTTP 200** (+ seed loaded) = **22/22 accepted.** Re-ping all 22 after the §8 push (content changed on 21 pages). |
| **GSC domain property** | `sc-domain:stgeorgeelitefence.com` created, "Any DNS provider" path, **verify later**. TXT to add at the apex: `google-site-verification=JII2W7_CPhExBIAVf9V8FHGaBsZL_bR7JlzWoDhc8uY`. **Pending Scott's DNS record** (§8 step 1). Then: Verify → submit `sitemap-index.xml` → indexing requests (below) → day-1 baseline. |
| GSC indexing requests (planned, ≤10/day) | Day 1: `/`, `/fence-installation-st-george-ut/`, `/block-wall-installation-st-george-ut/`, `/fence-and-block-wall-cost-st-george-ut/`, `/fence-repair-st-george-ut/`, `/pool-fence-and-gate-st-george-ut/`, `/hoa-fence-requirements-st-george-ut/`, `/fence-permit-st-george-ut/` (the eight money pages from KEYWORD_RESEARCH §5 + cost hub). Day 2–3: retaining-wall cost, CMU vs wood, license guide, best-of, service-areas hub, the four city silos. |
| **GSC day-1 baseline** | Record at verification: Performance clicks/impressions (expected 0 / "processing"), Indexing, Crawl stats. |
| **Bing Webmaster** | Site `https://stgeorgeelitefence.com/` added manually (the GSC import needs a Google OAuth grant; not used, same as electrical), **Skip & verify later**. CNAME to add: `dfab2eaca33e9f7bfa0ed044c8be5f07` → `verify.bing.com`, **DNS only**. **Pending Scott's DNS record**; then Verify → submit `sitemap-index.xml`. |

## 4. Structured data

- **validator.schema.org:** the 8 URLs checked in Phase 6 were 0 errors / 0 warnings. **The remaining 16 were not run: Google served its "unusual traffic" CAPTCHA on the first Phase 7 attempt (`/about/`), and per instructions I stopped there.** Still to run (live, after the §8 push so the new `mainEntity` values are what's validated):
  1. `/about/`
  2. `/cmu-block-wall-vs-wood-fence-st-george-ut/`
  3. `/contact/`
  4. `/fence-and-block-wall-cost-st-george-ut/` (Phase 6 result wasn't readable)
  5. `/fence-contractor-ivins-ut/`
  6. `/fence-installation-hurricane-ut/`
  7. `/fence-installation-st-george-ut/`
  8. `/fence-installation-washington-ut/`
  9. `/fence-repair-st-george-ut/`
  10. `/hoa-fence-requirements-st-george-ut/`
  11. `/how-fence-and-wall-matching-works/`
  12. `/privacy-policy/`
  13. `/retaining-wall-cost-st-george-ut/`
  14. `/terms-of-service/`
  15. `/washington-county-fence-service-areas/`
  16. `/thank-you/` (noindex; optional)

  Also worth one re-run on `/fence-permit-st-george-ut/`, `/licensed-fence-contractor-compare-st-george-ut/` and `/best-fence-and-wall-companies-st-george-ut/` after the push, since their `WebPage.mainEntity` changed.
- **Offline substitute run this session (not a replacement for the validator, but full coverage):** every JSON-LD node on all 24 built pages of the Phase 7 build checked against the current schema.org vocabulary (`schemaorg-current-https.jsonld`): **1,784 properties, 17 types, 0 unknown types, 0 unknown properties, 0 properties used outside their type's domain.** Plus `scripts/audit.py`: one graph per page, every `@id` reference resolves, Rules 12–14 (incl. v1.44 A/B), no banned types.

## 5. Decisions from the Phase 6 open items (Scott, this session)

### 5.1 Item 3: `WebPage.mainEntity` on Article / best-of pages → **"Switch"**

- **Build pattern (v1.44 Rule 14 A/B):** new `defaultMainEntityId(nodes)` in `src/lib/schema.ts` returns the page's one ItemList `@id`, else its one Article `@id`, reading the `@id` back off the node so both sides are identical by construction. `GuideLayout.astro` now sets `mainEntityId = service ? own #service : (defaultMainEntityId(nodes) ?? umbrella Service)`. Service pages and city silos keep their own `#service`; the pool page (Service + HowTo) keeps its Service.
- **Verified on parsed `dist/` vs a clean build of the repo HEAD:** same 24 pages; **exactly 7 pages change, and only `WebPage.mainEntity`**; no other JSON-LD node differs.

| Page | Before | After |
|---|---|---|
| `/best-fence-and-wall-companies-st-george-ut/` | umbrella Service | `…/#itemlist` |
| `/cmu-block-wall-vs-wood-fence-st-george-ut/` | umbrella Service | `…/#article` |
| `/fence-and-block-wall-cost-st-george-ut/` | umbrella Service | `…/#article` |
| `/fence-permit-st-george-ut/` | umbrella Service | `…/#article` |
| `/hoa-fence-requirements-st-george-ut/` | umbrella Service | `…/#article` |
| `/licensed-fence-contractor-compare-st-george-ut/` | umbrella Service | `…/#article` |
| `/retaining-wall-cost-st-george-ut/` | umbrella Service | `…/#article` |

- **`scripts/audit.py`** now asserts the v1.44 order (own Service → ItemList → Article → umbrella Service) and that each Article/ItemList `@id` belongs to its own page. Negative test on a planted `dist` copy (best-of reverted to the umbrella Service): FAIL as expected.
- **St. George Elite Pools** (`rank-rent-pool-st-george`) is not touched here. Scott's "one decision covering both" means it needs the same change; a queued prompt is in §10.

### 5.2 Item 4: "Areas & guides" line in RelatedServices → **"Add it"**

- `src/lib/priority-links.ts` gains `SECONDARY_LINKS` (best-of, county hub, the four city silos, how matching works); `RelatedServices.astro` renders them as a compact `<nav aria-label="Areas and guides">` under the cards, with a brass pin icon accent (Rule 16), `inline-block py-1` targets (≥24 px), current page filtered out, nothing on legal/utility pages.
- **Inbound internal links, built HTML (self-links excluded):**

| Page | Phase 6 | Phase 7 |
|---|---:|---:|
| `/best-fence-and-wall-companies-st-george-ut/` | 27 (tied Privacy) | **46** |
| `/washington-county-fence-service-areas/` | 25 | **51** |
| Washington / Hurricane / Ivins / Santa Clara silos | 25 each | **44 each** |
| `/how-fence-and-wall-matching-works/` | 25 | **44** |
| Priority pages (Rule 18) | 52–112 | 52–112 (unchanged) |
| `/privacy-policy/` · `/terms-of-service/` | 27 · 24 | 27 · 24 |

  Rule 18 pass rule still holds (every priority page > legal max 27; lowest margin retaining-wall cost 52). `/about/` (24) is the only non-legal indexable page still at or below Privacy; not required by the rule.
- `audit.py` now parses `PRIORITY_LINKS` and `SECONDARY_LINKS` separately (the old split would have counted 15 priority entries) and WARNs if an Areas & guides page falls to or below the legal max.
- **Rendered check (Chromium, cloud):** 23 routes × 390 / 1024 / 1280: 0 horizontal overflow, every Areas & guides link ≥24 px tall; block viewed at 390 and 1280.

## 6. Launch checklist

`phase-7-launch.md` items 1–13 plus master-prompt items 14–19.

| # | Item | Status |
|---|---|---|
| 1 | Deploy + domain + SSL + repo match + purge | **PASS with one fix pending:** apex + www Active/SSL; production = `e12924d` = origin/main. **www→apex 301 missing → Scott, §8 step 1.** Purge again after the §8 push. |
| 2 | `PUBLIC_GA4_ID` | **DEFERRED** to Phase 8 (same as plumbing/electrical). BaseLayout's gtag block no-ops without it. |
| 3 | Compliance gate | **PASS.** 0 `[SAMPLE]` rendered (`Testimonials.astro` is unimported). Privacy + Terms live. **Attorney review due by 2026-10-27.** No form yet. Disclosure fingerprint exactly once per page (footer). |
| 4 | GSC + Bing + robots + IndexNow | **PARTIAL.** robots PASS; IndexNow 22/22 PASS; GSC + Bing properties created, **verification waits on Scott's two DNS records** (§3, §8). |
| 5 | OFFPAGE_PLAN weeks 1–2 scheduled | **PASS.** `st-george-fence-blockwall_OFFPAGE_PLAN.md` written. |
| 6 | Photos licensed, honest alt, WebP | **PASS (stopgap).** Hero + 5 page photos are Pexels-license stopgaps (Adobe credits out; Scott's standing rule allows it), each credited in a source comment. Audit: all WebP, alt text present, one eager hero. Adobe swaps queued for when credits reset. |
| 7 | Archetype documented | **PASS (v1.41 form).** `DESIGN_SYSTEM.md` §4: **Suitability Worksheet** (zero-JS `:has()` triage), hero above it. Collision checks no longer a gate (Rule 16). Registry write-back to the bundled `phase-2-design.md` remains a skill-side debt. |
| 8 | Brand-voice self-check | **PASS.** One "local guide" phrase across all 24 pages, in body copy on `/how-fence-and-wall-matching-works/` (the trust page, per KEYWORD_RESEARCH §5); none in hero/header/trust bar. |
| 9 | Grok second opinion | **CLOSED.** Phase 5 follow-up `b9bc3f4` shipped the second-opinion fixes. |
| 10 | Legal claims date-stamped + rechecked | **PASS.** Every code/statute summary carries its read date (Sept 26, 2026) on-page; all 43 outbound sources were opened live on 2026-09-27 in Phase 6 (43/43), including UT-003 (77-23a-4) on Privacy. No pool-barrier height anywhere (audit sweep). |
| 11 | On-page research links (`audit.py dist --links`) | **PASS after fixes.** Scan listed 150+ named-but-unlinked text nodes; per-page review found 11 pages where a named source had **no** link anywhere on that page. Fixed with URLs already verified live in Phase 6 (§7). Left as-is: FAQ answers and HowTo step text (escaped text via `FAQ.astro` / schema arrays, can't carry links), repeated mentions on pages that already link the source once, contact-only Building Department lines with no verified URL, and Santa Clara's "International Residential Code standards" (the linked city chapter is the cited source). After fixes, every page that names a code family links it at least once. |
| 12 | Lead-capture gap + Phase 8 queued | **ACKNOWLEDGED.** Live with no form, no tracked number, no conversion events (v1.32); any lead before Phase 9 is lost. The stale "at launch" placeholders (hero, sticky bar, footer, LeadForm ×3) were **changed to "coming soon"** this phase (plumbing precedent), so nothing on the live site promises a launch that already happened. **Phase 8 prompt in §10. Schedule it this week.** |
| 13 | Sticky header | **PASS.** `position: sticky; top: 0`, 65 px at every width (Phase 6, 72 checks); `scroll-mt-24` on `#lead-form`/`#worksheet`. |
| 14 | Service JSON-LD wired | **PASS.** Homepage umbrella `Service` `/#fence-block-wall-referral-service`, provider = `/#organization`; own `#service` on the service hubs, pool page and city silos (Rule 12 gold standard). |
| 15 | Org logo + WebPage | **PASS.** `logo` ImageObject ≥112 px (audit), one WebPage per page injected by BaseLayout. |
| 16 | Linking both ways (v1.44) | **PASS (built; live after the push).** §5.1. `Article.mainEntityOfPage` → `#webpage` on all 6 Article pages; `WebPage.mainEntity` → own `#article` / `#itemlist` / `#service`. |
| 17 | Icon accents (Rule 16) | **PASS.** IconLists, TrustBar, the Suitability Worksheet paths, RelatedServices cards (8 icons) and the new Areas & guides line (pin). |
| 18 | Sitemap `<lastmod>` (Rule 17) | **PASS (live).** 22/22. |
| 19 | RelatedServices (Rule 18) | **PASS (live, and improved in §5.2).** 20/20 pages, 0 on legal; priority pages 52–112 vs legal max 27. |
| — | Privacy discloses Cloudflare (proposed Rule 19) | **PASS (live, `e12924d`).** |

## 7. On-page research links added (all URLs already verified live 2026-09-27)

| Page | Link added |
|---|---|
| `/` | "City Code §10-18-5" in the permits/HOA/pool intro → `stgeorge.municipal.codes/Code/10-18-5` |
| `/about/` | §10-18-1 and §10-18-5 in "How the research works" |
| `/cmu-block-wall-vs-wood-fence-st-george-ut/` | §10-18-1, §10-18-5; "Ivins City Code 16.11.135" → amlegal Ivins `0-0-0-7853` |
| `/pool-fence-and-gate-st-george-ut/` | §10-18-1 and §10-18-5 (×2) in "What we do know" |
| `/retaining-wall-cost-st-george-ut/` | Sources line: HomeGuide and Angi retaining-wall articles (the `costs.ts` URLs); DOPL → license lookup |
| `/how-fence-and-wall-matching-works/` | "Utah DOPL license lookup" → `secure.utah.gov/llv/search/index.html` (IconList `html`) |
| `/washington-county-fence-service-areas/` | Blue Stakes; DOPL lookup; a code line in the closing note linking all six jurisdictions' codes (St. George §10-18-1/-5, Washington §9-14-12, Hurricane §10-37-9, Ivins §16.11.135, Santa Clara ch. 17.28) |
| Ivins, Hurricane, Santa Clara, Washington silos | "Blue Stakes of Utah" → `bluestakes.org` |

All follow the site convention (`<a href="…" rel="noopener">`).

## 8. What Scott runs

**1. Cloudflare dashboard, zone `stgeorgeelitefence.com` (5 minutes).**
- **Rules → Redirect Rules → Create rule → template "Redirect from WWW to root"**: when `https://www.*`, redirect to `https://${1}`, **301**, preserve query string. Deploy.
- **DNS → Add record**, both **DNS only** (grey cloud):
  - `TXT` · `@` · `google-site-verification=JII2W7_CPhExBIAVf9V8FHGaBsZL_bR7JlzWoDhc8uY`
  - `CNAME` · `dfab2eaca33e9f7bfa0ed044c8be5f07` · `verify.bing.com`
- Optional: SSL/TLS → Edge Certificates → **Always Use HTTPS** on.
- Tell me "DNS done" and I verify GSC + Bing, submit sitemaps, request indexing and record the baseline.

**2. Commit + push** (`C:\Rank & Rent\rank-rent-fence-blockwall-st-george\push-phase7.ps1`, PowerShell 5.1, ASCII, no local build). Expected staged set, **23 files**:
- modified (20): `scripts/audit.py`; `src/components/layout/Footer.astro`, `GuideLayout.astro`; `src/components/sections/Hero.astro`, `LeadForm.astro`, `RelatedServices.astro`, `StickyCTA.astro`; `src/lib/priority-links.ts`, `schema.ts`; `src/pages/` `index`, `about`, `cmu-block-wall-vs-wood-fence-st-george-ut`, `fence-contractor-ivins-ut`, `fence-installation-hurricane-ut`, `fence-installation-santa-clara-ut`, `fence-installation-washington-ut`, `how-fence-and-wall-matching-works`, `pool-fence-and-gate-st-george-ut`, `retaining-wall-cost-st-george-ut`, `washington-county-fence-service-areas`;
- docs (3): `docs/PHASE6_TEST_REPORT.md` (modified), `docs/PHASE7_DEPLOYMENT_CHECKLIST.md`, `docs/OFFPAGE_PLAN.md` (new).

`privacy-policy.astro` is **not** in the set: its Cloudflare paragraph is already committed and live (`e12924d`).

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Rank & Rent\rank-rent-fence-blockwall-st-george\push-phase7.ps1"
```

**3. After the Cloudflare build is green:** purge (dashboard → Caching → Purge Everything), then re-ping IndexNow for all 22 URLs (the second half of `push-phase7.ps1` asks before doing it). Expect `Sitemap URLs: 22   with lastmod: 22`, then 22 lines starting `200` or `202`.

**4. Real-phone hand test** (still open from Phase 6): sticky "Get Matched" bar and "Phone coming soon" chip, ☰ menu opens/closes, FAQ accordions, pinch-zoom, the "Popular next steps" cards and the new Areas & guides links tappable and clear of the sticky bar.

**5. validator.schema.org** on the 16 URLs in §4 from your own browser (the CAPTCHA is IP/session-level; a normal browser session usually passes it).

## 9. Open items

1. **Scott, Cloudflare:** www→apex rule + the two DNS records (§8.1). Then I finish GSC/Bing verification, sitemaps, indexing requests, day-1 baseline.
2. **Real-phone hand test** (§8.4).
3. **Push + purge + IndexNow re-ping** (§8.2–3); then live-verify: `mainEntity` on the 7 pages, the Areas & guides line on `/`, "coming soon" copy, 0 "at launch" strings.
4. **validator.schema.org**, 16 URLs (§4).
5. **St. George Elite Pools**: apply the same Rule 14 "Switch" (prompt in §10).
6. **Cloudflare beacon:** left on by portfolio decision; PSI Perf stays 99 on two pages because of it. Proposed Operating Rule 19 (Privacy discloses Cloudflare) awaits Scott's OK in `privacy-cloudflare-rollout-2026-09-27.md`.
7. **Attorney review** of Privacy/Terms by 2026-10-27.
8. **Carried:** Adobe Stock swaps (credits), Hurricane Building Dept call (IRC exemption confirmation), DOPL roster pass before renter outreach, the planned material spokes (vinyl/wood/chain-link/iron) and new-construction spoke, skill-side debts (`phase-2-design.md` registry row; Rule 13–18 and v1.44 line edits in the bundled `phase-5`/`phase-7` reference files).
9. **Cleanup Scott can do:** `_to_delete/` (untracked, not in `.gitignore`) holds `dist-p7.tgz` (this session's render snapshot) and three old photos.

## 10. Next session prompts

**Phase 8 (Forms & Tracking):**

> Follow the rank-rent-build skill (confirm the installed version from its SKILL.md header). Execute Phase 8 (Forms & Tracking) only for **St. George Elite Fence** (`stgeorgeelitefence.com`, repo `C:\Rank & Rent\rank-rent-fence-blockwall-st-george\`, GitHub Spaulbick1/rank-rent-fence-blockwall-st-george, `main`). Read `claude/st-george-fence-blockwall_PHASE7_DEPLOYMENT_CHECKLIST.md` (§5, §6, §9), `claude/st-george-fence-blockwall_OFFPAGE_PLAN.md`, `_DESIGN_SYSTEM.md` (LeadForm + Suitability Worksheet), `_PHASE4_SUPPORTING_PAGES.md` (A2P copy on Privacy/Terms) and the same-city precedent `claude/st-george-pool-service_PHASE8_FORMS_TRACKING.md`.
>
> **First:** (1) confirm the Phase 7 commit is live (read `.git/refs/remotes/origin/main` as a file, no git commands on the mounted repo): `WebPage.mainEntity` = `#itemlist` on the best-of page and `#article` on the cost guide, the "Areas & guides" line on `/`, "Phone coming soon" in the sticky bar; (2) confirm GSC and Bing are verified with `sitemap-index.xml` submitted, and the www→apex 301 works; (3) ask me for the real-phone result; (4) build in `$HOME/fb` and run `python3 scripts/audit.py dist` (must be 0 FAIL).
>
> **Then:** GA4 property with me (America/Denver), `PUBLIC_GA4_ID` in Cloudflare Pages production, redeploy, confirm gtag live; wire `LeadForm.astro` live against the placeholder endpoint per `references/phase-8-forms-tracking.md` (labels, validation, honeypot, consent checkbox unticked and not required with consent text + timestamp captured, redirect to `/thank-you/`, the Suitability Worksheet path pre-selecting the project type); GA4 key events `form_start`/`form_submit`/`phone_click` + AI-referrer channel group; a tracked-number plan in GHL for Phase 9 (no `tel:` until it exists). **Re-run audit Rule 18 after the form goes live** — the LeadForm consent line adds Privacy/Terms links; lowest priority margin is retaining-wall cost 52 vs 27. Swap "coming soon" copy only where a live control now exists.
>
> **Rules unchanged:** sourced facts only (UT-/WC-/SG- IDs), no pool-barrier height, all $ from `src/lib/costs.ts`, disclosure once in the footer, icon accents on itemized lists, no LocalBusiness/AggregateRating/Review, Utah one-party recording (UT-003) but all-party disclosure by portfolio default. Commands for me are PowerShell 5.1, ASCII; the git push is mine; update `claude_KEYWORD_AND_BUILD_TRACKER.xlsx` in place via the device bridge. End with summary, open questions and the exact Phase 9 prompt.

**St. George Elite Pools, Rule 14 switch (small, separate session):**

> Follow the rank-rent-build skill (v1.44+). For **St. George Elite Pools** (`rank-rent-pool-st-george`, stgeorgeelitepools.com) apply Scott's 2026-09-27 decision from the St. George Elite Fence Phase 7: on pages with no Service of their own, point `WebPage.mainEntity` at the page's own ItemList (best-of) or Article `@id` instead of the sitewide umbrella Service, using a `defaultMainEntityId(nodes)` helper in `schema.ts` (see `claude/st-george-fence-blockwall_PHASE7_DEPLOYMENT_CHECKLIST.md` §5.1 for the exact pattern). Service pages keep their own `#service`. Build in a `$HOME` copy, compare parsed JSON-LD against a clean HEAD build (same page count, only `WebPage.mainEntity` changes on the affected pages), extend the site's audit if it has one, sync into the repo without git commands on the mount, and give me PowerShell to push.

## Changelog

- **2026-09-27:** Phase 7 (Launch & Handoff), skill v1.44.
  - Gate passed; Phase 6 close-out (robots, sitemap, key live; PSI all targets met; beacon identified as zone RUM).
  - Parallel portfolio rollout committed + pushed the Privacy Cloudflare line (`e12924d`) mid-session; live.
  - Cloudflare read: Pages domains Active; **no www→apex rule** (write blocked by the permission guard → Scott).
  - IndexNow 22/22. GSC domain property + Bing site created, verification pending Scott's DNS records.
  - Rule 14 v1.44 switch on 7 pages; "Areas & guides" line; research links on 11 pages; "coming soon" placeholder copy; `audit.py` extended; `dist` 24 pages, **0 FAIL / 0 WARN**.
  - validator.schema.org blocked by CAPTCHA (16 URLs listed); schema.org vocabulary check 0 issues on all 24 pages.
  - OFFPAGE_PLAN written. Tracker A3 note updated. Commit pending Scott's push.
