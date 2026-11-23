import { site } from './site';
export default function sitemap() {
  return site.url && !site.noindex ? [{ url: `${site.url}/` }] : [];
}
