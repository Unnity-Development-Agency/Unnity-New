# SEO and launch

The homepage copy is server-rendered HTML, with one H1 and descriptive metadata. Decorative WebGL loads asynchronously; indexable content does not depend on the canvas.

Included: title/description, Open Graph/Twitter tags, generated 1200×630 social image, Organization JSON-LD, robots.txt, sitemap.xml, domain-driven canonical and optional Search Console verification.

Set these in hosting configuration **before the production build**:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-final-domain.com
# Optional Search Console verification token
GOOGLE_SITE_VERIFICATION=
# Use true on staging only; false on the public website
SITE_NOINDEX=false
```

The live domain has not been supplied. Without it, canonical and sitemap entries are omitted rather than publishing a guessed domain. After setting it, rebuild and check canonical, /robots.txt, /sitemap.xml and /opengraph-image on the live host.

Before launch, replace dummy copy/CTA with approved copy and a working destination. Add actual service detail, case studies and contact information as those pages are developed. Verify the domain in Search Console and submit /sitemap.xml after deployment. No Search Console registration or submission has been performed here.

The schema describes the agency; no certification, partnership, review or results claims are inferred from decorative platform logos.

Technical SEO supports crawling and understanding; ranking is not guaranteed. See [Google's SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
