// JSON-LD generators. Operating Rules 12-14 (rank-rent-build v1.37-v1.39):
//  - every site carries a Service-type node describing the actual
//    referral/matching offering (never the site performing the trade work);
//  - Organization must carry a `logo`; every page carries a WebPage node;
//  - an Article's mainEntityOfPage must be an @id reference matching the
//    page's own WebPage node's @id EXACTLY (never a bare URL), and any page
//    carrying a Service node must have its WebPage node's `mainEntity`
//    point at that Service node's @id.
// Trailing-slash discipline: every @id below is built through the same
// `abs()` helper from the same base URL, never concatenated independently
// on each side, so a bare-vs-trailing-slash mismatch can't silently break
// a link (the exact defect Operating Rule 14 exists to prevent).
//
// Phase 2 note: this file ships the full generator set now (mirroring the
// portfolio's established schema.ts shape) so BaseLayout has real,
// non-stub JSON-LD from day one rather than a placeholder swapped out in
// Phase 5. Phase 5 (Technical SEO) is responsible for confirming this
// against a rendered-output audit and adding any page-specific FAQ/Article
// nodes as those pages ship in Phase 3/4.
import { site } from './site-config';

// Every City / county node names its state so "Washington", "Hurricane" and
// "Santa Clara" resolve to Utah, not D.C./WA/CA (Claude second-opinion review, Phase 5).
const UTAH = { '@type': 'State', name: 'Utah' } as const;

export function abs(path: string): string {
  return new URL(path, site.url).toString();
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': abs('/#organization'),
    name: site.brandName,
    url: abs('/'),
    // One sentence, matching/referral framing only -- never the trade work
    // (compliance.md rule 3/6, same line the disclosure itself draws).
    description:
      'Independent referral service connecting homeowners in the St. George, UT area with independent, local fence and block-wall companies.',
    logo: {
      '@type': 'ImageObject',
      url: abs('/images/logo-mark.png'),
      width: 512,
      height: 512,
    },
    // Phase 9: only cite the tracked number here once it's confirmed real
    // and live-forwarding (flips site.phoneIsPlaceholder to false).
    ...(!site.phoneIsPlaceholder && site.phone.href ? { telephone: site.phone.href } : {}),
    areaServed: [
      ...site.serviceArea.cities.map((name) => ({ '@type': 'City', name, containedInPlace: UTAH })),
      { '@type': 'AdministrativeArea', name: site.serviceArea.county, containedInPlace: UTAH },
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website'),
    url: abs('/'),
    name: site.brandName,
    publisher: { '@id': abs('/#organization') },
  };
}

// The referral/matching offering itself -- never the trade work (see
// site-config.ts's disclosure and compliance.md rule 6). `provider` points
// at this site's own Organization @id, not a fabricated contractor entity.
// No AggregateRating/Review schema and no LocalBusiness/HomeAndConstructionBusiness type.
export function serviceSchema(opts: {
  id: string;
  path: string;
  name: string;
  serviceType: string;
  description: string;
  areaServed?: string[];
}) {
  return {
    '@type': 'Service',
    '@id': abs(opts.id),
    serviceType: opts.serviceType,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { '@id': abs('/#organization') },
    areaServed: (
      opts.areaServed ?? [...site.serviceArea.cities, site.serviceArea.county]
    ).map((name) => ({
      '@type': name === site.serviceArea.county ? 'AdministrativeArea' : 'City',
      name,
      containedInPlace: UTAH,
    })),
  };
}

// One per page. `mainEntity` links to this page's Service node's @id when
// the page carries one (homepage at minimum, per Operating Rule 12).
export function webPageSchema(opts: {
  path: string;
  name: string;
  description?: string;
  mainEntityId?: string;
  breadcrumbId?: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': abs(opts.path) + '#webpage',
    url: abs(opts.path),
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { '@id': abs('/#website') },
    ...(opts.mainEntityId ? { mainEntity: { '@id': opts.mainEntityId } } : {}),
    ...(opts.breadcrumbId ? { breadcrumb: { '@id': opts.breadcrumbId } } : {}),
  };
}

// Home is omitted (it has nothing to be "under"); every other indexable
// page gets a minimal, honest two-level trail -- Home -> this page.
export function breadcrumbSchema(opts: { path: string; pageName: string }) {
  return {
    '@type': 'BreadcrumbList',
    '@id': abs(opts.path) + '#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: opts.pageName },
    ],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function schemaGraph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

/** The @id BaseLayout's webPageSchema() assigns to a page -- reuse this on
 *  any node that must reference the page's WebPage node (Article
 *  mainEntityOfPage, Rule 14) so both sides are computed by one function. */
export function webPageId(path: string): string {
  return abs(path) + '#webpage';
}

// Phase 6 (2026-09-27): Google's Rich Results Test flags a bare YYYY-MM-DD
// datePublished/dateModified as "invalid datetime / missing a timezone". The
// pages keep passing plain dates; this renders them as midnight Utah time
// (America/Denver: MDT -06:00 from the 2nd Sunday of March to the 1st Sunday
// of November, otherwise MST -07:00). Same calendar date -- no invented time.
export function utahDateTime(d: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const [y, m, day] = d.split('-').map(Number);
  const firstSunday = (month: number) => 1 + ((7 - new Date(Date.UTC(y, month, 1)).getUTCDay()) % 7);
  const dstStart = Date.UTC(y, 2, firstSunday(2) + 7);
  const dstEnd = Date.UTC(y, 10, firstSunday(10));
  const t = Date.UTC(y, m - 1, day);
  return `${d}T00:00:00${t >= dstStart && t < dstEnd ? '-06:00' : '-07:00'}`;
}

// Long-form dated content (cost guides, licensing guides) -- carried
// forward for Phase 3's cost/diagnostic pages, not used by any Phase 2 page.
export function articleSchema(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@type': 'Article',
    '@id': abs(opts.path) + '#article',
    headline: opts.headline,
    description: opts.description,
    datePublished: utahDateTime(opts.datePublished),
    dateModified: utahDateTime(opts.dateModified ?? opts.datePublished),
    author: { '@type': 'Organization', '@id': abs('/#organization'), name: site.brandName },
    publisher: { '@type': 'Organization', '@id': abs('/#organization'), name: site.brandName },
    mainEntityOfPage: { '@id': webPageId(opts.path) },
    image: opts.image ? new URL(opts.image, site.url).toString() : abs('/images/og-default.png'),
    inLanguage: 'en-US',
    isPartOf: { '@id': abs('/#website') },
  };
}

// The site-wide umbrella Service entity -- ONE @id reused verbatim by
// every page that isn't itself a distinct service line, matching this
// portfolio's established pattern of a single shared
// identity rather than near-duplicate per-page Service entities.
export const UMBRELLA_SERVICE_ID = '/#fence-block-wall-referral-service';
export function umbrellaServiceSchema() {
  return serviceSchema({
    id: UMBRELLA_SERVICE_ID,
    path: '/',
    name: `${site.brandName} — Fence & Block Wall Referral Service`,
    serviceType: 'Fence and block-wall installation and repair referral / contractor matching service',
    description:
      'Connects homeowners in the St. George, UT area with independent, third-party fence and block-wall companies for new fence installation, fence repair, block/CMU and retaining walls, pool fences and gates, and HOA or new-construction requirements. Does not itself build fences or walls and is not a contractor.',
  });
}

export function itemListSchema(opts: {
  path: string;
  name: string;
  items: { name: string; url?: string; description?: string }[];
}) {
  return {
    '@type': 'ItemList',
    '@id': abs(opts.path) + '#itemlist',
    name: opts.name,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        // 'Organization', not 'LocalBusiness': LocalBusiness schema is
        // explicitly excluded for this site (CONTENT_PLAN.md Part B -- no
        // genuine local address of our own; these are third-party
        // companies we describe, not entities we operate).
        '@type': 'Organization',
        name: item.name,
        ...(item.url ? { url: item.url } : {}),
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };
}

// Operating Rule 14 (A)/(B), v1.44 (Phase 7, 2026-09-27, Scott: "Switch"):
// a page with no Service of its own points WebPage.mainEntity back at its own
// main content -- the one ItemList with an @id (best-of pages), else the one
// Article with an @id. The @id is read back off the node itself, so both
// sides of the link are the same string by construction. Returns undefined
// when there is no single candidate (caller falls back to the umbrella Service).
export function defaultMainEntityId(nodes: object[]): string | undefined {
  const withId = (t: string) =>
    nodes.filter((n: any) => n && n['@type'] === t && typeof n['@id'] === 'string') as { '@id': string }[];
  const lists = withId('ItemList');
  if (lists.length === 1) return lists[0]['@id'];
  const articles = withId('Article');
  if (articles.length === 1) return articles[0]['@id'];
  return undefined;
}

export function howToSchema(opts: {
  path: string;
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@type': 'HowTo',
    '@id': abs(opts.path) + '#howto',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
