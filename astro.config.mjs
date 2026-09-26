import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// NOTE: @astrojs/sitemap is pinned to the exact version 3.6.0 in
// package.json (no caret) -- 3.7.1 has a confirmed build-breaking regression
// (withastro/astro#15894). Do not widen that pin without checking upstream
// first (references/phase-2-design.md, 2026-07-25).
//
// site URL: stgeorgeelitefence.com -- PURCHASE PENDING as of 2026-09-23
// (Cloudflare checkout errored on payment; domain confirmed available at
// $10.46/yr via Cloudflare Registrar). If a different domain is ever chosen,
// update this value plus site.domain/site.url in src/lib/site-config.ts and
// the Sitemap line in public/robots.txt -- nothing else hardcodes it.
export default defineConfig({
  site: 'https://stgeorgeelitefence.com',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      // noindex utility pages stay out of the sitemap (phase-3-4 reference).
      filter: (page) => !/\/(thank-you|404)\/?$/.test(new URL(page).pathname),
    }),
  ],
});
