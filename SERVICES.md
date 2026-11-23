# Hero gateway and services

The original hero markup, ribbon, coin controller and service strip remain intact.
`GatewayExperience.jsx` wraps the hero in a 3D scene. The complete hero
folds backward like one notebook page, using negative X rotation and negative Z,
hinged at its top edge. A gentle perspective taper adds depth, with a lavender
wash at the revealed side edges. There are no left/right doors, duplicated heroes or extra
WebGL contexts. A short native sticky opening (58% of the viewport, capped at
560px) reveals services underneath from the beginning.

On desktop viewports at least 1001px wide and 680px high, services use a short
native CSS sticky stage (750px total, with a new chapter every 150px). Scroll
position controls each reveal, the segmented progress strip and the continuous
white-to-brand-purple background. Navigation links jump to a chapter. There are
no wheel interceptors or autoplay service changes. Mobile, short windows, reduced
motion and JavaScript-disabled browsers retain all five articles in document flow.

Inline SVG previews animate website construction/checkout, story publishing,
search intent/results, identity assembly and B2B audience steps. IntersectionObserver
pauses offscreen previews; inactive desktop chapters pause too. Reduced motion
shows static compositions. These are illustrative concepts, not client results.

## Editing

- `src/app/components/services/services.js`: five services and capability lists.
- `ServiceArtwork.jsx`: lightweight inline SVG compositions; no image requests.
- `services.css`: typography, spacing, responsive layouts and gateway surfaces.
- `GatewayExperience.jsx`: scoped GSAP/ScrollTrigger animation and cleanup.
- `src/app/page.js`: original hero, service integration and closing contact section.

Coin resize uses layout dimensions rather than transformed viewport dimensions,
so ancestor perspective never inflates its WebGL backing buffer.
GSAP matchMedia reverts animations/listeners when a breakpoint or motion preference
changes and on unmount. See [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
and [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Browser verification

With the dev server running: `node scripts/check-services.cjs`.
Set `TEST_BASE_URL` to test a production server instead.
Screenshots are saved in `node_modules/.cache/services-qa/`.

`devIndicators: false` hides the development-only “Cache disabled” status badge.
A hard reload intentionally bypasses caches; this is not an application caching
failure. This setting does not change HTTP cache policy or suppress runtime errors.

Services use native sticky positioning instead of per-frame transform pinning. Chapter changes crossfade in place; progress uses scaleX. The identity concept is Cupid Clothing.
