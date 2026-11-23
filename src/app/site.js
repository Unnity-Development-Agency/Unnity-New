const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
function publicOrigin(value) {
  if (!value) return null;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an origin such as https://your-domain.com');
  }
  return url.origin;
}
export const site = {
  name: 'Unnity Media',
  title: 'Unnity Media | Digital Marketing & Creative Agency',
  description: 'Unnity Media brings brand strategy, paid media and creative content together to help ambitious brands stand out and grow.',
  url: publicOrigin(configuredUrl),
  noindex: process.env.SITE_NOINDEX === 'true',
};
