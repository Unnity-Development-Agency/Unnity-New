import { site } from './site';
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(site.url && !site.noindex ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
