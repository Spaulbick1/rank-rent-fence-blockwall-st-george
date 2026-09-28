# St. George Elite Fence (stgeorgeelitefence.com): 90-Day Off-Page Plan

**Day 0:** 2026-09-27 (Phase 7).
**Skill:** rank-rent-build v1.44.
**Operating entity:** AuthenitcBrand, LLC (that spelling is the legal one).
**Scope:** referral and matching for residential fence and block-wall projects in St. George and Washington County, UT (Washington, Hurricane, Ivins, Santa Clara, unincorporated county):

- new fence installation (vinyl, wood, chain-link, ornamental iron);
- block / CMU and retaining walls;
- fence repair;
- pool fences and gates (no pool-barrier height is ever published);
- HOA and new-construction fence questions.

The site never builds, installs or repairs anything, and never claims to.

## NAP rules for every listing

- **Name:** **St. George Elite Fence**.
- **URL:** `https://stgeorgeelitefence.com`.
- **Phone:** no tracked number yet (Phase 9). Where a phone field is required, use the operating company's general contact line. **Revisit every listing once Phase 9 provisions the tracked number.**
- **Address:** the operating company's real mailing address, only where a field is required. Check **"hide address"** wherever it's offered. Skip any directory that forces a local street address.
- **Category:** an honest referral or matching category ("home services referral", "contractor referral service"). Never "Fence Contractor" or "Masonry". Utah Code 58-55-102 (UT-001) counts anyone who *advertises* as engaged in a construction trade as a contractor, and directory listings are advertising.
- **Description:** the disclosure line from `src/lib/site-config.ts`, verbatim.

---

## Weeks 1–2 (Sep 27 – Oct 11): indexing, citations, AI baseline

### Indexing

- [x] **IndexNow:** homepage seeded by GET, then all 22 sitemap URLs: **22/22 accepted** (2026-09-27).
- [ ] **Scott, Cloudflare:** www→apex 301 redirect rule + GSC TXT + Bing CNAME (values in the Phase 7 checklist §8.1).
- [ ] **GSC:** verify `sc-domain:stgeorgeelitefence.com` (created, pending TXT) → submit `sitemap-index.xml` → request indexing on the 8 money pages (`/`, fence installation, block wall, cost hub, repair, pool fence, HOA, permit) → record the day-1 baseline (expected 0 clicks / 0 impressions, "processing").
- [ ] **Bing:** verify (created, pending CNAME) → submit `sitemap-index.xml`.
- [ ] **After the Phase 7 push:** purge, re-ping IndexNow for all 22 URLs (21 pages changed).
- [ ] Day 2–3: GSC indexing requests for retaining-wall cost, CMU vs wood, license guide, best-of, service-areas hub, the four city silos (≤10/day). Recheck the GSC sitemap (discovered should reach 22).
- [ ] Day 7: Bing sitemap should read "Success"; resubmit if still "Processing".

### Citations

Target ~18–22 real listings. Quality and NAP consistency matter more than count.

- Log each listing in `st-george-fence-blockwall_CITATIONS_LOG.md`: site, URL, date, login email. Never passwords.
- Account-gated directories use `spaulbick+stgeorgefence@gmail.com`. Exceptions: Hotfrog (plain address, shared account); Manta and Brownbook (shared-account platforms).

| Tier | Directory | Disposition |
|---|---|---|
| 1 | **Southern Utah Local** (southernutahlocal.com) | **Build first.** Free "Add your business"; two St. George competitors are linked from it (`CITY_LOCAL_LINK_LISTS_2026-09-27.md`). Referral category, hide address |
| 1 | Facebook business page | Build, honest referral-service category |
| 1 | Nextdoor business page | Try; skip if it forces a local street address |
| 1 | Manta, Brownbook | Build (shared-account platforms) |
| 1 | Hotfrog | Plain email. If the category typeahead stalls, use the AJAX-endpoint workaround in `phase-7-launch.md`. Referral/home-services category, not "Fencing" |
| 2 | EZlocal, Tupalo, iBegin, other free citation-only listings | Build, "hide address" on |
| 2 | CitySquares | Create; log "created, pending GBP" |
| 2 | Yelp | Honest category only; alias email (Yelp's account-merge bug) |
| Per-site call | BBB | Scott's go/no-go (accreditation dues) |
| Default skip | St. George Area Chamber ($375/yr, 1–4 employees) | Skip until a renter is signed; then revisit as a renter-facing trust signal and a dofollow ChamberMaster link |
| Permanent skip (precedent) | Cylex, 2FindLocal, ShowMeLocal, MerchantCircle, Data Axle, Local.com, Superpages/YP.com/DexKnows, chamberofcommerce.com | Log by precedent, no re-test (v1.35) |
| Skip: Maps-tied | Google Business Profile, Bing Places, Apple Business Connect | No genuine local address |
| Skip: lead marketplaces | Angi/HomeAdvisor, Thumbtack, Porch, Yelp "Request a Quote" | Incompatible with the referral model (compliance.md rule 6) |

**Same-city footprint:** St. George Plumber Pro, St. George Electric Pro, St. George Elite Pools, St. George Air Repair, St. George Roof Cost and St. George Tree Care use the same directories. Keep each listing's description, category wording and photo distinct; never reuse a logo or hero; space submissions over several days.

### Baseline AI citation spot-check (Day 0–7)

Ask ChatGPT, Gemini and Perplexity each question; log who is cited in the SEO weekly log:

1. How much does a fence cost in St. George, Utah?
2. How much does a block wall cost per square foot in St. George UT?
3. Do I need a permit for a fence or retaining wall in St. George, Utah?
4. How tall can a fence be in St. George, Utah (front yard vs backyard)?
5. How much does a retaining wall cost in Southern Utah?
6. Best fence companies in St. George, Utah
7. How do I check if a fence contractor is licensed in Utah?
8. Fence height rules in Ivins / Hurricane / Santa Clara / Washington, UT (one query each, logged as one line)

Expect zero site citations at baseline. Likeliest early wins:

- **The permit answer.** The site quotes St. George City Code §10-18-1 / §10-18-5 directly (front-setback permit, 4-ft retaining-wall trigger) and links the code; many results give generic "check with your city" answers.
- **The Washington County comparison table** (six jurisdictions side by side, each linked to its own code). No competitor publishes this.
- **Sourced, dated cost ranges** (`costs.ts`, visible methodology). Spacemakers explicitly refuses to publish per-foot numbers, and the cost lane is held by national aggregators.

---

## Weeks 3–6 (Oct 11 – Nov 8): foundational links (5–10 real)

- **Link-worthy asset 1, the Washington County fence-rules comparison** (`/washington-county-fence-service-areas/`): pitch to HOA management companies and newsletters, relocation / new-resident guides, real-estate buyer resource pages, home inspectors. It answers "which city's rules apply to my lot?", which realtors field constantly.
- **Link-worthy asset 2, the St. George permit guide** (`/fence-permit-st-george-ut/`): same audiences, plus landscape designers and pool builders who aren't fence contractors (they need the front-setback and retaining-wall triggers).
- **Link-worthy asset 3, the license-verification guide** (`/licensed-fence-contractor-compare-st-george-ut/`): home-inspector and realtor resource lists; local Facebook groups when "is this contractor legit" comes up.
- **Realtor affiliate membership** (the local Realtor association for Washington County; confirm the exact organization and its affiliate terms first): affiliate memberships for service businesses carry a dofollow directory link in other markets (`CITY_LOCAL_LINK_LISTS_2026-09-27.md` pattern 4). Price it and get Scott's go/no-go; one membership could serve all seven St. George sites only if each is listed separately and honestly.
- **Youth sports sponsorships** (Blue Sombrero AYSO / Little League sites link dofollow) — after a renter signs; shared across St. George sites only with distinct listings.
- **Honest, disclosed answers** on Reddit r/stgeorge and local Facebook groups for permit/HOA/height questions. Disclose the affiliation; never astroturf.
- Skip paid sponsorships and the chamber until a renter is signed.

## Weeks 7–12 (Nov 8 – Dec 20): content velocity + consolidation

- **2–4 posts/month** from the Phase 1 plan still unbuilt. Candidates (pull Keyword Planner first, bare term + St. George geo, Operating Rule 11):
  - vinyl fence installation (material spoke);
  - wood privacy fence (material spoke; desert sun / stain cycle angle, `fenceStain` already in `costs.ts`);
  - wrought iron / ornamental fence (spoke);
  - chain-link fence (spoke);
  - new-construction fence and wall (production-home lots, HOA handoff);
  - wind damage / fence repair after a storm (repair hub adjacency).
- **Every new or changed URL:** one IndexNow ping + one GSC indexing request.
- **Rule 18 margin watch:** lowest priority page is retaining-wall cost at 52 vs Privacy 27. Phase 8's LeadForm consent line adds Privacy/Terms links; re-run `audit.py` after Phase 8 and after each content batch. Add each new spoke to `SECONDARY_LINKS` only if it would otherwise sit at or below Privacy.
- **Keyword-gap audit** against Taylor Made Fencing (organic #2), Kirklands Fence & Garden and Modern Stone and Masonry (`blockwallstgeorgeutah.com`): likely gaps are gates/automatic gates, vinyl color/style pages, and block-wall repair.
- **Cost refresh:** recheck HomeGuide, Angi, HomeAdvisor, NerdWallet, Homewyse and HomeBlue in March 2027, or sooner once lead-sourced local prices exist. HomeBlue (June 2022) is the only St. George-specific source; replace it when a newer local source appears.
- **Adobe Stock swaps** for the six Pexels stopgaps once credits reset (check the Site Photo Library first).

## Monitoring

- **Weekly (15 min):** GSC impressions → positions → clicks. Day-0 baseline recorded at verification.
- **Monthly:** repeat the 8-query AI spot-check and log it.
- **Week-8 gate (~Nov 22):** if impressions are flat zero, stop link work and re-run keyword winnability.
- Don't judge the site before month 3.

## Renter acquisition (clock starts at Phase 9 completion, not today)

- **Days 0–30 after Phase 9:** leads accumulate in the GHL unsold view. No outreach.
- **Days 30–60:** prospectus from real lead data (count by type — fence vs block wall vs repair vs pool fence — and by ZIP/city), anonymized call logs, and the comparable Google Ads bids (Keyword Planner 2026-09-23: "fence company/builders/contractor near me" top-of-page ~$3–4 low to ~$18–19 high in St. George).
- **Day 60+:** pitch from the Gate 4 roster (17 named businesses):
  - **Fence:** Legacy Fencing LLC, Allied Fence of Southern Utah, Taylor Made Fencing, Kirklands Fence & Garden, Robinson Fencing (Cedar City based), Desert Design Gates & Fencing (ifironworks.com), Red Rock Iron, Brad's Fence.
  - **Block wall / masonry:** Modern Stone and Masonry, Stone Tree Landscaping, Molina Concrete Solutions, Utah Stone and Welding, stgeorgecustomstonework.com, Red Eagle Masonry LLC, Flores Masonry, Rock N Block Turf N Hardscapes, Sunraye Construction.
  - A DOPL license-status pass on the roster is still owed before outreach.
- **Split tenants by vertical.** Repair/install niche: one exclusive tenant per service + ZIP by default, with overflow to a second. Fence and block-wall/masonry are different trades (different competitor sets at Gate 3), so a fence company and a masonry company can each hold their own lane.
- Once a renter signs, **reframe `/best-fence-and-wall-companies-st-george-ut/` in place** into a "how to vet a St. George fence or block-wall company" methodology page. Keep the URL, keep ItemList schema where it still enumerates criteria, and keep `WebPage.mainEntity` pointed at that page's own `#itemlist` (Rule 14 v1.44).
