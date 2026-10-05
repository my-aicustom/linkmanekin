import type { APIRoute } from 'astro';
import { articles } from '../data/articles';

export const prerender = true;

const staticPages = [
  '/',
  '/katalog/',
  '/manekin-wanita/',
  '/manekin-pria/',
  '/manekin-jahit/',
  '/sports-mannequin/',
  '/kustom-finishing/',
  '/perlengkapan-display-toko-baju/',
  '/artikel/',
  '/kontak/',
];

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = () => {
  const site = import.meta.env.SITE || 'https://jualmanekin.com';
  const lastmod = '2026-10-06';

  const entries = [
    ...staticPages.map((pathname) => ({
      loc: new URL(pathname, site).toString(),
      lastmod,
    })),
    ...articles.map((article) => ({
      loc: new URL(`/artikel/${article.slug}/`, site).toString(),
      lastmod: article.dateModified.slice(0, 10),
    })),
  ];

  const urls = entries
    .map(
      ({ loc, lastmod: modified }) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${escapeXml(modified)}</lastmod>\n  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
