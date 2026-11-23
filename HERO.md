# Hero implementation

Run `npm run dev` and open http://localhost:3000.

- Edit the placeholder headline, description and intentionally dummy CTA in `src/app/page.js`.
- Brand color and responsive layout live in `src/app/globals.css`.
- `src/app/components/HeroVisual.js` renders the SVG ribbon and accessible pause/play control.
- `src/app/components/coinScene.js` builds the metallic emitter and five embossed coins (Google, Meta, dollar, Shopify and Google Ads), and owns the GSAP sequence.
- Desktop and mobile use separate SVG paths. Coin centres follow the exact trailing segment with a 64-unit vertical offset so their lower rim contacts the ribbon.
- Three.js and GSAP load asynchronously. Geometry is generated locally; no external models, textures or runtime asset requests are needed.
- Reduced motion shows a static composition. Animation pauses when offscreen or when the tab is hidden. Resize observers, listeners, timelines, geometry, materials and the WebGL context are cleaned up on unmount.
- If WebGL is unavailable, the HTML content and SVG ribbon remain usable.
- The reference header and its contact/save/heart controls are intentionally omitted.

The centred agency copy includes a compact services row. The permanently visible emitter has small charcoal 'Official partners' printing conforming to its outer silver wall. Its translucent multicolour gel surface continuously deforms and responds to emission. Coins use the original speed (1.65-second drop, 6.5-second travel), spaced 1.35 seconds apart. Ribbon compression starts when the lower coin rim contacts the path; riding coins follow that deformation. Reduced motion freezes all visual movement.

Google uses a four-colour embossed G on a pearl-white coin. Meta, Shopify and Google Ads silhouettes are from Simple Icons and embedded locally. Their brand colours remain distinct. The dollar coin has an emerald-green metallic body and gold relief.

## Verification

`npm run build` checks the production build.

With the dev server running, `node scripts/check-hero.cjs` uses installed Google Chrome to check 1440px, 820px, 390px and 320px widths, path consistency, content clearance, reduced motion and pause/resume. It captures the animation phases and layout screenshots under `node_modules/.cache/hero-qa/`.

`node scripts/check-hero-impact.cjs` checks jelly movement, contact-synchronized ribbon compression, settling, permanent emitter animation and browser errors with a controlled clock.

`node scripts/check-seo.cjs` checks server-rendered metadata, JSON-LD, robots, sitemap and the social image. See `SEO.md` for the live-domain configuration required before deployment.
