// Icon accents (Operating Rule 16, v1.41): custom line-art SVG path data,
// 24x24 viewBox, 1.75 stroke, tinted to the site's `brass` accent by the
// component that renders them. Reinstated as a standing, archetype-
// independent convention -- every component that itemizes services,
// situations, or categories pairs each item with one of these. Inlined as
// path strings (no external asset files, no Adobe Stock spend).
//
// Each icon is drawn to read as its niche object at 20px:
//   fence      picket fence: three pointed pickets + two rails
//   wrench     repair
//   blocks     a running-bond block wall
//   poolfence  pool-safety fence over water ripples
//   house      HOA / new-construction home
//   flat       level ground with a house
//   slope      graded slope with a retaining step
//   waves      pool water
//   frame      new-construction stud frame
//   tag        cost / price
//   scroll     permit / code document
//   link       independent referral (connection)
//   Phase 4 additions: shield (license/insurance), phone, pin (city/place),
//   check, drop (drainage), sun (UV/heat), ruler (height/measure), clock
//   (timing), lock (privacy/security), doc (legal/terms)
export const icons: Record<string, string> = {
  fence: 'M4 20V8l2-2 2 2v12 M10 20V8l2-2 2 2v12 M16 20V8l2-2 2 2v12 M2.5 12h19 M2.5 16.5h19',
  wrench:
    'M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a1.6 1.6 0 0 0 2.3 2.3l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.4 2.4-2.1-.5-.5-2.1Z',
  blocks: 'M3 5h18v14H3Z M3 9.67h18 M3 14.33h18 M10 5v4.67 M16 9.67v4.66 M8 14.33V19',
  poolfence:
    'M6 14V6 M11.5 14V6 M17 14V6 M4 9h15 M2.5 18c1.4 0 1.4-1.2 2.9-1.2S6.8 18 8.3 18s1.4-1.2 2.9-1.2S12.6 18 14.1 18s1.4-1.2 2.9-1.2S18.4 18 19.9 18',
  house: 'M4 11 12 4l8 7 M6 10v10h12V10 M10 20v-5h4v5',
  flat: 'M2.5 19.5h19 M6 19.5v-7l6-4.5 6 4.5v7 M10.5 19.5v-4h3v4',
  slope: 'M3 19.5 21 9 M3 19.5h18 M9 16.3v-4.3h4.2 M13.2 12V9.4h4',
  waves:
    'M3 9c1.5 0 1.5-1.2 3-1.2S7.5 9 9 9s1.5-1.2 3-1.2S13.5 9 15 9s1.5-1.2 3-1.2S19.5 9 21 9 M3 14c1.5 0 1.5-1.2 3-1.2S7.5 14 9 14s1.5-1.2 3-1.2S13.5 14 15 14s1.5-1.2 3-1.2S19.5 14 21 14 M3 19c1.5 0 1.5-1.2 3-1.2S7.5 19 9 19s1.5-1.2 3-1.2S13.5 19 15 19s1.5-1.2 3-1.2S19.5 19 21 19',
  frame: 'M4 20V6h16v14 M4 6l8-3 8 3 M9 20V11h6v9 M4 13h5 M15 13h5',
  tag: 'M3 12 12 3h6a3 3 0 0 1 3 3v6l-9 9a1.5 1.5 0 0 1-2 0L3 14a1.5 1.5 0 0 1 0-2Z M16.5 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z',
  scroll: 'M7 3h9a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M9 8h6 M9 12h6 M9 16h3.5',
  link: 'M9 15 15 9 M10 7l1-1a3.5 3.5 0 0 1 5 5l-1 1 M14 17l-1 1a3.5 3.5 0 0 1-5-5l1-1',
  shield: 'M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z M8.8 12.2l2.3 2.3 4.3-4.6',
  phone: 'M6.6 3.5h3l1.4 4-2 1.3a11 11 0 0 0 6.2 6.2l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z',
  pin: 'M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z',
  check: 'M4 12.5 9.2 17.5 20 6.5',
  drop: 'M12 3.5s-6 6.6-6 11a6 6 0 0 0 12 0c0-4.4-6-11-6-11Z M9 15a3 3 0 0 0 3 3',
  sun: 'M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z M12 2.5v2 M12 19.5v2 M2.5 12h2 M19.5 12h2 M5.3 5.3l1.4 1.4 M17.3 17.3l1.4 1.4 M5.3 18.7l1.4-1.4 M17.3 6.7l1.4-1.4',
  ruler: 'M3 17 17 3l4 4L7 21Z M7 13l1.5 1.5 M10 10l1.5 1.5 M13 7l1.5 1.5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3.5 2',
  lock: 'M6 10.5h12v10H6Z M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3',
  doc: 'M6 3h8l4 4v14H6Z M14 3v4h4 M9 12h6 M9 16h6',
};

export type IconName = keyof typeof icons;
