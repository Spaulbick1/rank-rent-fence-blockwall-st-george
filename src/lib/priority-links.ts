/**
 * Priority (money) pages surfaced by RelatedServices.astro on every indexable page
 * (Operating Rule 18, rank-rent-build v1.43 Phase 5 checklist; added in Phase 6, 2026-09-27).
 *
 * Why this exists: the footer links every page equally, so footer-only legal pages can tie or
 * out-rank the pages that earn revenue in Google's internal-link graph. This block gives the
 * money pages in-body links on every page with descriptive anchor text.
 * Portfolio pattern: piloted on Pahrump AC Repair (commit 226b39b, 2026-09-26).
 *
 * Keep to 6-8 entries. Order matters: the first two that aren't the current page are used in
 * the intro sentence, so the weakest money pages go first. Every href must be a real built route
 * (scripts/audit.py checks internal links). `icon` is a key of lib/icons.ts (Operating Rule 16 icon accents). No dollar figures here (prices live in lib/costs.ts),
 * and never say the site builds or repairs anything (compliance.md rules 3/6).
 */
export const PRIORITY_LINKS = [
  {
    href: '/fence-repair-st-george-ut/',
    icon: 'wrench',
    label: 'Fence repair in St. George',
    desc: 'Leaning posts, wind damage, sagging gates, and cracked block: repair or replace.',
  },
  {
    href: '/pool-fence-and-gate-st-george-ut/',
    icon: 'poolfence',
    label: 'Pool fences and gates',
    desc: 'What to confirm about pool-barrier rules and gates before you build.',
  },
  {
    href: '/hoa-fence-requirements-st-george-ut/',
    icon: 'house',
    label: 'HOA fence and wall requirements',
    desc: 'How HOA rules sit on top of city code, and what to submit for approval.',
  },
  {
    href: '/retaining-wall-cost-st-george-ut/',
    icon: 'slope',
    label: 'Retaining wall cost in St. George',
    desc: 'Sourced, dated cost ranges by wall type and height, plus the permit threshold.',
  },
  {
    href: '/fence-and-block-wall-cost-st-george-ut/',
    icon: 'tag',
    label: 'Fence and block wall cost guide',
    desc: 'Per-foot and per-square-foot ranges, cost drivers, and every source.',
  },
  {
    href: '/block-wall-installation-st-george-ut/',
    icon: 'blocks',
    label: 'Block wall installation',
    desc: 'CMU walls on desert lots: permits, drainage on slopes, and vetting a mason.',
  },
  {
    href: '/fence-installation-st-george-ut/',
    icon: 'fence',
    label: 'Fence installation in St. George',
    desc: 'Height limits, permit rules, and materials that hold up in the desert.',
  },
  {
    href: '/contact/',
    icon: 'link',
    label: 'Get matched with a local fence pro',
    desc: 'Free, no-obligation matching with an independent fence or block wall company.',
  },
] as const;

/**
 * "Areas & guides" line under the cards (Phase 7, 2026-09-27, Scott: "Add it"). Not priority
 * pages -- these are the best-of page, the county hub, the city silos and the how-it-works page,
 * which sat tied with or below /privacy-policy/ on inbound internal links (Phase 6 report, open
 * item 4). One compact line lifts each by about one link per page. Same rules as above: real
 * built routes only, descriptive anchors, no prices, no claim that the site does the work.
 */
export const SECONDARY_LINKS = [
  { href: '/best-fence-and-wall-companies-st-george-ut/', label: 'Best fence and wall companies' },
  { href: '/washington-county-fence-service-areas/', label: 'Washington County service areas' },
  { href: '/fence-installation-washington-ut/', label: 'Washington, UT fence rules' },
  { href: '/fence-installation-hurricane-ut/', label: 'Hurricane fence rules' },
  { href: '/fence-contractor-ivins-ut/', label: 'Ivins fence rules' },
  { href: '/fence-installation-santa-clara-ut/', label: 'Santa Clara fence rules' },
  { href: '/how-fence-and-wall-matching-works/', label: 'How matching works' },
] as const;

/** Pages where the block must not render (legal, utility). Prefix match. */
export const PRIORITY_EXCLUDE = ['/privacy-policy', '/terms-of-service', '/thank-you', '/404'] as const;
