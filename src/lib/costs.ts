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
    used: 'Block and poured-concrete retaining wall cost per square foot',
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
    url: 'https://www.nerdwallet.com/article/mortgages/cost-to-install-a-fence',
    date: 'Updated July 10, 2025',
    used: 'National per-foot ranges by material',
  },
  {
    name: 'HomeAdvisor — Wrought Iron Fence Cost',
    url: 'https://www.homeadvisor.com/cost/fencing/install-a-wrought-iron-fence',
    date: 'Updated June 19, 2026',
    used: 'Ornamental / wrought iron per-foot range',
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
