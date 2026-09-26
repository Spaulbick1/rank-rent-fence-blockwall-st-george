/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Virgin River & Cliff Brass" -- see DESIGN_SYSTEM.md section 2 for
        // the material metaphor, hue-distance tables, and the full WCAG
        // contrast table.
        //
        // river: the deep blue-green of the Virgin River where it cuts
        // through the St. George basin -- a cool lane no fence-niche
        // sibling and no St. George sibling occupies (rust/adobe, bark,
        // juniper, plum and navy are all taken). Primary: nav, headings,
        // links, primary CTA fill (phone button). Hue ~196.7deg.
        river: {
          DEFAULT: '#0E5C7A',
          dark: '#093B4F',
          50: '#E6F0F4',
        },
        // brass: gate-hardware / desert-varnish ochre. ACCENT ONLY -- icon
        // tints, cap-stone rules, worksheet result accents, never the
        // primary hue and never a CTA fill. Hue ~45.4deg, ~92% saturation:
        // the saturated-ochre lane, distinct from the desaturated
        // brown/caliche neutrals other sites carry.
        brass: {
          DEFAULT: '#785C05',
          dark: '#574103',
          50: '#F5EDD8',
        },
        ink: '#22201D',
        muted: '#59544C',
        // Cool limestone paper -- a green-grey warm-neutral, distinct from
        // St. George's pool (peach sandstone) and roofing (cool white) neutrals.
        paper: '#F7F5EF',
        tint: {
          DEFAULT: '#ECE8DD',
          line: '#D5CFC0', // BORDER-ONLY token (1.43:1 on paper) -- never text
        },
        // FUNCTIONAL-ONLY (form errors, permit/hazard callouts) -- never brand/CTA.
        alert: '#9A3524',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Display face: a system serif stack -- stone-cut / engraved-plaque
        // feel suited to masonry, zero font bytes shipped. Body stays sans.
        display: ['ui-serif', 'Georgia', "'Iowa Old Style'", "'Palatino Linotype'", 'Cambria', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'fl-sm': 'clamp(0.875rem, 0.85rem + 0.15vw, 0.95rem)',
        'fl-base': 'clamp(1rem, 0.96rem + 0.22vw, 1.0625rem)',
        'fl-lg': 'clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)',
        'fl-xl': 'clamp(1.35rem, 1.2rem + 0.7vw, 1.6rem)',
        'fl-2xl': 'clamp(1.75rem, 1.4rem + 1.5vw, 2.4rem)',
        'fl-3xl': 'clamp(2.2rem, 1.6rem + 2.6vw, 3.4rem)',
      },
      maxWidth: { prose: '66ch', content: '72rem' },
      // Square, block-cut corners (masonry) instead of the rounded-xl used
      // by sibling builds.
      borderRadius: { blk: '3px' },
      boxShadow: {
        // hard offset "mortar" shadow, no blur -- see .sgfw-cap in global.css
        block: '3px 3px 0 0 #093B4F',
        card: '0 1px 2px 0 rgba(34, 32, 29, 0.06), 0 1px 3px 0 rgba(34, 32, 29, 0.08)',
        lift: '0 -4px 10px -2px rgba(34, 32, 29, 0.14)',
      },
    },
  },
  plugins: [],
};
