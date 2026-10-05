import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('shared layout exposes strong search appearance signals without meta keywords', async () => {
  const source = await read('src/layouts/Layout.astro');
  assert.match(source, /alternateName:\s*shortBrand/);
  assert.match(source, /BreadcrumbList/);
  assert.match(source, /favicon-96x96\.png/);
  assert.match(source, /apple-touch-icon\.png/);
  assert.match(source, /summary_large_image/);
  assert.match(source, /max-image-preview:large/);
  assert.ok(!/name=["']keywords["']/i.test(source), 'meta keywords should not be added');
});

test('sitemap is generated from source and includes every commercial landing page', async () => {
  const source = await read('src/pages/sitemap.xml.ts');
  for (const route of [
    '/katalog/',
    '/manekin-wanita/',
    '/manekin-pria/',
    '/manekin-jahit/',
    '/sports-mannequin/',
    '/kustom-finishing/',
    '/perlengkapan-display-toko-baju/',
    '/artikel/',
    '/kontak/',
  ]) {
    assert.ok(source.includes(route), `missing sitemap route: ${route}`);
  }
  assert.ok(source.includes('articles.map'));
  assert.ok(!source.includes('<priority>'));
  assert.ok(!source.includes('<changefreq>'));
});

test('article pages expose article schema, real image alt text, dates and commercial next steps', async () => {
  const page = await read('src/pages/artikel/[slug].astro');
  const data = await read('src/data/articles.ts');
  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /datePublished/);
  assert.match(page, /dateModified/);
  assert.match(page, /alt=\{article\.imageAlt\}/);
  assert.match(page, /article\.relatedLinks/);
  assert.match(data, /imageAlt:/);
  assert.match(data, /ogImage:/);
  assert.match(data, /relatedLinks:/);
});

test('homepage connects broad intent to focused money pages', async () => {
  const source = await read('src/pages/index.astro');
  for (const route of ['/manekin-wanita/', '/manekin-pria/', '/manekin-jahit/', '/perlengkapan-display-toko-baju/']) {
    assert.ok(source.includes(route), `homepage missing internal link: ${route}`);
  }
  assert.match(source, /Jual Manekin Display untuk Retail, Butik & Atelier/);
});

test('money pages are intentionally narrow and use curated catalog selections', async () => {
  const wanita = await read('src/pages/manekin-wanita.astro');
  const pria = await read('src/pages/manekin-pria.astro');
  const jahit = await read('src/pages/manekin-jahit.astro');
  assert.match(wanita, /ids=\{\['CS-01'\]\}/);
  assert.match(pria, /ids=\{\['CS-02'\]\}/);
  assert.match(jahit, /ids=\{\['DR-01', 'DR-02'\]\}/);
  assert.match(wanita, /Manekin Wanita untuk Butik & Display Retail/);
  assert.match(pria, /Manekin Pria untuk Menswear, Distro & Retail/);
  assert.match(jahit, /Manekin Jahit & Dressmaker untuk Atelier/);
});

test('catalog supports explicit product IDs so landing pages do not show irrelevant forms', async () => {
  const source = await read('src/components/MannequinCatalog.astro');
  assert.match(source, /ids\?: string\[\]/);
  assert.match(source, /!ids \|\| ids\.includes\(product\.id\)/);
});

test('404 is explicitly noindex', async () => {
  const source = await read('src/pages/404.astro');
  assert.match(source, /noindex=\{true\}/);
});
