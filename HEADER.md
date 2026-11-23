# Header

- `src/app/components/header/Header.jsx`: shared header, scroll-direction handling and accessible desktop/mobile navigation. Layout and glass styling use Tailwind.
- `src/app/components/header/navigation.js`: labels and route destinations; edit the three work dropdown items here.
- `src/app/components/header/header-motion.css`: only wind dissolve/reveal, dropdown entrance and reduced-motion overrides.
- `src/app/components/PlaceholderPage.jsx`: shared temporary page for navigation destinations. Each route has its own readable `page.js` folder.

The header is visible initially and at the top of the page. Scrolling down six pixels dissolves it; scrolling up two pixels reveals it. A passive scroll listener schedules at most one animation-frame callback. React state changes only on visibility changes. CSS handles the short blur/drift animation, with no animation library or particle DOM. An open menu or keyboard focus keeps navigation accessible. Hidden navigation is inert.

Contact uses #0F032B and darkens to near-black on hover. The hero copy and existing animation are preserved. Header space is reserved in the server-rendered layout to avoid overlapping the hero or shifting it on load.

Case studies, blog, brands, contact and the three work routes currently display explicit placeholder pages. They are noindex and are excluded from the sitemap until real content is provided.

Run `node scripts/check-header.cjs` with the dev server on port 3000 to check desktop/mobile menus, routes, Escape, scroll direction, small-screen overflow, reduced motion and browser errors. Screenshots are saved in `node_modules/.cache/header-qa/`.
