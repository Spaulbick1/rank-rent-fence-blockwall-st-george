// SINGLE SOURCE OF TRUTH for brand, phone, service area, and the
// third-party matching disclosure (compliance.md rule 3). Every surface
// (Header, Footer, About, Terms, schema.ts) pulls from here rather than
// hardcoding its own copy of any of this.

export const site = {
  // "St. George Elite Fence" -- Operating Rule 15 (v1.40): a contractor-
  // sounding brand name is an acceptable default for new builds (same
  // "Elite" convention as St. George Elite Pools, Reno Elite Electrician/
  // Fence). Chosen over stgeorgefenceandwall.com because the live
  // competitor stgeorgedeckandfence.com sits too close to it in sound
  // (KEYWORD_RESEARCH.md section 1). The disclosure below is held at full
  // strength precisely because the name reads like a real contractor
  // (Rule 15's own condition).
  brandName: 'St. George Elite Fence',
  domain: 'stgeorgeelitefence.com', // PURCHASE PENDING 2026-09-23
  url: 'https://stgeorgeelitefence.com',

  // Legal entity behind the site (mailing address only -- never a fabricated
  // local St. George street address, compliance.md rule 8).
  legalEntity: 'AuthenitcBrand, LLC',

  // Referral/matching only -- fence + block wall/CMU/retaining wall. Never
  // "we build your fence" language anywhere on this site (Utah Code
  // 58-55-102(17), fact UT-001: advertising on a website as a contractor
  // can itself make you a "contractor" under Utah law).
  //
  // Deliberately does NOT state a DOPL license classification for fence or
  // masonry work: no primary-source DOPL classification for this trade has
  // been pulled (see UT-005's treatment of plumbing -- same rule). It tells
  // readers to verify license status themselves via DOPL's own lookup.
  disclosure:
    'St. George Elite Fence is an independent referral service. We connect homeowners in the St. George, UT area with independent, third-party fence and block-wall companies -- we do not build fences or walls, and we are not a contractor. Always verify a company\'s Utah contractor license status with the Utah Division of Professional Licensing, and confirm insurance, directly before you hire.',

  serviceArea: {
    primary: 'St. George, UT',
    cities: ['St. George', 'Washington', 'Hurricane', 'Ivins', 'Santa Clara'],
    county: 'Washington County, UT',
  },

  // Phase 2: site launches (Phase 7) with zero live lead-capture surface
  // (v1.32) -- LeadForm ships inert, phone stays null/placeholder
  // everywhere until Phase 9 provisions and confirms a real tracked number.
  phone: {
    display: null as string | null, // e.g. '(435) 555-0100' -- set in Phase 9
    href: null as string | null, // e.g. 'tel:+14355550100'
  },

  // Stays true even after a real number is displayed -- flips to false only
  // once Phase 9 confirms live call-forwarding. Gates the Organization
  // schema `telephone` field and the phone_click GA4 listener.
  phoneIsPlaceholder: true,

  defaultQuoteHref: '/contact/#lead-form',

  // Utah one-party consent (Utah Code 77-23a-4, fact UT-003) -- contrast
  // with Nevada all-party. Open decision for Phase 9 (CONTENT_PLAN.md open
  // item 3): the portfolio default is all-party unless deliberately scoped.
  callRecordingConsent: 'one-party' as const,

  // Phase 8: LeadForm.astro's submit handler posts here until Phase 9
  // replaces it with the real GoHighLevel inbound webhook.
  placeholderWebhookUrl: 'https://httpbin.org/post',

  // geo-aeo.md rule 5 -- AI-answer-engine referrer hostnames (ai_referral GA4 event).
  aiReferrers: [
    'gemini.google.com',
    'chatgpt.com',
    'chat.openai.com',
    'perplexity.ai',
    'copilot.microsoft.com',
  ],
} as const;

export type Site = typeof site;
