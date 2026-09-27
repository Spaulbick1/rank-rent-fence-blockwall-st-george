// SINGLE SOURCE OF TRUTH for every price on the site (lessons-learned #5:
// price consistency is a real failure mode -- the same figure once shipped
// with two different ranges on two pages). Every page and table pulls from
// here; nothing hardcodes a $ figure in page prose. Re-verify before launch
// and whenever a source below is refreshed (recheck rule: 90 days).
//
// Honest framing: no St. George fence or block-wall contractor publishes
// prices (KEYWORD_RESEARCH.md section 3), so these are dated aggregator /
// published-guide ranges, not local quotes. The one St. George-specific
// per-foot source (HomeBlue) is dated June 2022, so it is shown as a
// cross-check only, never as the headline number.

export const COST_AS_OF = 'September 2026';
export const COST_AS_OF_ISO = '2026-09-26';

export const fenceProject = { low: '$2,400', high: '$10,800', median: '$5,000' };

export const perFoot = [
  {
    key: 'chain-link',
    label: 'Chain-link',
    range: '$8–$25',
    note: 'Galvanized runs about $12 per foot; vinyl-coated or powder-coated about $15–$18.',
  },
  { key: 'wood', label: 'Wood privacy', range: '$15–$35', note: 'Cedar, redwood and pine differ; height and board style move the price.' },
  { key: 'vinyl', label: 'Vinyl (PVC) privacy', range: '$24–$45', note: 'Solid privacy panels sit at the upper end.' },
  { key: 'iron', label: 'Ornamental / wrought iron', range: '$25–$55', note: 'Steel or aluminum picket styles; custom scrollwork costs more.' },
] as const;

export const blockWall = {
  perSqFt: '$20–$35',
  perLinear6ft: '$120–$210', // 6 ft tall x $20-$35 per sq ft (arithmetic, not a separate source)
  lowEndCheck: '$19.53–$25.08', // Homewyse basic mid-range, Sept 2026
};

export const localCheck2022 = { vinyl: '$24–$30', wood: '$16–$22', chainLink: '$9–$12' }; // HomeBlue, 4-ft fences, June 2022

export const retainingWall = {
  block: '$15–$40', // per sq ft, HomeGuide Jan 2026
  poured: '$20–$45', // per sq ft, HomeGuide Jan 2026
  // Phase 4 (retaining-wall cost spoke) -- HomeGuide "Retaining Wall Cost",
  // updated January 16, 2026 unless noted. Same source as block/poured above.
  overallPerSqFt: '$35–$65', // "including the materials and professional labor"
  segmental: '$15–$35', // per sq ft, by wall type
  gravity: '$20–$50',
  cantilevered: '$40–$80',
  stone: '$20–$95', // natural stone, per sq ft
  timber: '$15–$30', // wood/timber, per sq ft
  byHeight10ft: [
    { height: '2 feet', range: '$700–$1,300' },
    { height: '4 feet', range: '$1,400–$2,600' },
    { height: '6 feet', range: '$2,100–$3,900' },
  ], // total cost for a 10-linear-foot wall at each height
  projectMinimum: '$1,500–$3,000', // "Most retaining wall contractors have a ... project minimum"
  engineering: '$500–$2,000+',
  engineeringAngi: '$350–$750', // Angi, updated September 15, 2026 -- cross-check
  permit: '$50–$450', // HomeGuide and Angi agree on this range
  frenchDrain: '$10–$85+', // per linear foot
  footings: '$18–$55', // per linear foot
  demolition: '$15–$30', // per linear foot, plus disposal
  nationalAvgAngi: '$6,085', // Angi, updated September 15, 2026
  nationalRangeAngi: '$3,192–$9,208',
};

// Phase 4 (CMU vs wood spoke): upkeep figures -- HomeGuide "Cost to Stain or
// Paint a Fence", updated February 4, 2026.
export const fenceStain = {
  perLinearFt: '$2–$14',
  perSqFt: '$0.50–$2.50',
  typical: '$300–$2,800', // typical 100-150 ft fence
};

export const repair = {
  minor: '$100–$300',
  standard: '$300–$900',
  major: '$900–$2,500',
  post: '$250–$600',
  gate: '$50–$400',
  hourly: '$50–$100',
};

export const costSources = [
  {
    name: 'HomeGuide — Fence Repair Cost',
    url: 'https://homeguide.com/costs/fence-repair-cost',
    date: 'Updated February 20, 2026',
    used: 'Repair ranges; national per-foot cross-check',
  },
  {
    name: 'HomeGuide — Retaining Wall Cost',
    url: 'https://homeguide.com/costs/retaining-wall-cost',
    date: 'Updated January 16, 2026',
    used: 'Retaining wall cost per square foot by material and type, cost by height, engineering, permit, drainage, footing and demolition costs',
  },
  {
    name: 'HomeGuide — Concrete Retaining Wall Cost',
    url: 'https://homeguide.com/costs/concrete-retaining-wall-cost',
    date: 'Updated December 23, 2025',
    used: 'CMU / concrete block cost per square foot',
  },
  {
    name: 'Homewyse — Cost to Install a CMU Block Wall',
    url: 'https://www.homewyse.com/services/cost_to_install_cmu_block_wall.html',
    date: 'September 2026 calculator',
    used: 'Low-end check on CMU cost per square foot (basic, favorable conditions)',
  },
  {
    name: 'NerdWallet — Cost to Install a Fence',
    url: 'https://www.nerdwallet.com/home-ownership/home-improvement/learn/cost-to-install-a-fence',
    date: 'Updated July 10, 2025',
    used: 'National per-foot ranges by material',
  },
  {
    name: 'HomeAdvisor — Wrought Iron Fence Cost',
    url: 'https://www.homeadvisor.com/cost/fencing/install-a-wrought-iron-fence/',
    date: 'Updated June 19, 2026',
    used: 'Ornamental / wrought iron per-foot range',
  },
  {
    name: 'Angi — Retaining Wall Cost',
    url: 'https://www.angi.com/articles/how-much-does-it-cost-build-retaining-wall.htm',
    date: 'Updated September 15, 2026',
    used: 'Cross-check: national average and range, structural engineer fee, permit range',
  },
  {
    name: 'HomeGuide — Cost to Stain or Paint a Fence',
    url: 'https://homeguide.com/costs/cost-to-stain-paint-fence',
    date: 'Updated February 4, 2026',
    used: 'Wood fence staining and sealing cost',
  },
  {
    name: 'HomeBlue — Fence Cost in Saint George, Utah',
    url: 'https://www.homeblue.com/fence-installation/saint-george-ut-fence-cost.htm',
    date: 'Dated June 28, 2022 (older; cross-check only)',
    used: 'St. George-specific check for 4-foot fences: vinyl $24–$30, wood privacy $16–$22, chain-link $9–$12 per foot',
  },
] as const;

export const costMethodNote =
  'Overall St. George project range and median come from a Google cost summary and aggregator consensus checked September 22, 2026.';

// Phase 4 (CMU vs wood spoke): lifespan ranges. Not prices, but kept here so
// the comparison page and any future page cite one set of numbers.
export const lifespan = {
  wood: { range: '15 to 30 years', source: 'Angi, "How Long Does a Wood Fence Last?"', url: 'https://www.angi.com/articles/how-long-does-wood-fencing-last.htm', date: 'updated July 9, 2026' },
  vinyl: { range: '20 to 30 years', source: 'Angi, "How Long Does a Vinyl Fence Last?"', url: 'https://www.angi.com/articles/how-long-does-vinyl-fence-last.htm', date: 'updated July 9, 2026' },
  block: { range: '50 to 100 years', source: 'HomeAdvisor, "Cinder Block Wall Cost"', url: 'https://www.homeadvisor.com/cost/walls-and-ceilings/cinder-block-wall/', date: 'updated June 20, 2026' },
} as const;

// Phase 4 (license-compare spoke): statutory dollar thresholds, kept here so
// no $ figure is typed into page prose. Utah Code 58-55-305(1)(h), version
// effective 5/7/2025 (renumbered 1/1/2027 -- recheck then), read on
// le.utah.gov 2026-09-26.
export const utahSmallProjectExemption = {
  under: '$7,000', // contracted value incl. labor and materials
  affirmationOver: '$3,000', // one-time insurance affirmation filed with DOPL
};
