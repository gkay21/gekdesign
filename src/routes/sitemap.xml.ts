import { getSitePages } from '../lib/site-pages';
import { absoluteUrl } from '../lib/seo';

// Resource route: pre-rendered to build/client/sitemap.xml.
export function loader() {
  const urls = getSitePages()
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
