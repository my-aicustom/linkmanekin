import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pagePath = new URL(
  '../src/pages/perlengkapan-display-toko-baju.astro',
  import.meta.url,
);
const stylePath = new URL('../src/styles/display-solutions.css', import.meta.url);

async function pageSource() {
  return readFile(pagePath, 'utf8');
}

test('display solutions page covers the commercial keyword cluster', async () => {
  const source = await pageSource();
  for (const phrase of [
    'Perlengkapan Display Toko Baju',
    'Manekin Display Pakaian',
    'Gawangan Baju Distro Minimalis',
    'Gantungan Baju Butik Kayu',
    'Paket Buka Toko Baju Lengkap',
    'Gawangan Baju Knock-Down Bazar',
    'Hanger Jepit Celana Butik',
  ]) {
    assert.match(source, new RegExp(phrase, 'i'), `missing keyword: ${phrase}`);
  }
});

test('display solutions page uses all eight approved lookbook assets', async () => {
  const source = await pageSource();
  for (const asset of [
    '/images/lookbook/urban-techwear-mannequin-display.png',
    '/images/lookbook/modern-boutique-mannequin-display-4.png',
    '/images/lookbook/modern-boutique-mannequin-display-3.png',
    '/images/lookbook/streetwear-mannequin-modern-boutique.png',
    '/images/lookbook/mannequin-showroom-lookbook-collage.png',
    '/images/lookbook/premium-mannequin-showroom-moodboard.png',
    '/images/lookbook/modern-mannequin-retail-moodboard.png',
    '/images/lookbook/mannequin-lookbook-warm-retail-collage.png',
  ]) {
    assert.ok(source.includes(asset), `missing lookbook asset: ${asset}`);
  }
});

test('approved lookbook assets are curated once instead of repeated as filler', async () => {
  const source = await pageSource();
  for (const asset of [
    '/images/lookbook/urban-techwear-mannequin-display.png',
    '/images/lookbook/modern-boutique-mannequin-display-4.png',
    '/images/lookbook/modern-boutique-mannequin-display-3.png',
    '/images/lookbook/streetwear-mannequin-modern-boutique.png',
    '/images/lookbook/mannequin-showroom-lookbook-collage.png',
    '/images/lookbook/premium-mannequin-showroom-moodboard.png',
    '/images/lookbook/modern-mannequin-retail-moodboard.png',
    '/images/lookbook/mannequin-lookbook-warm-retail-collage.png',
  ]) {
    assert.equal(source.split(asset).length - 1, 1, `asset should appear once: ${asset}`);
  }
});

test('display solutions page exposes three bundles and a direct WhatsApp CTA', async () => {
  const source = await pageSource();
  const styles = await readFile(stylePath, 'utf8');
  for (const tier of ['Paket Starter', 'Paket Boutique Pro', 'Paket Flagship Store']) {
    assert.ok(source.includes(tier), `missing bundle tier: ${tier}`);
  }
  assert.ok(source.includes('https://wa.me/'));
  assert.ok(source.includes("const phone = '6281389896052'"));
  assert.match(styles, /min-height:\s*48px|height:\s*48px|--touch:\s*48px/);
});

test('editorial refinement avoids template-like hero and repetitive card stacks', async () => {
  const source = await pageSource();
  assert.ok(!source.includes('ds-hero-float'), 'hero should use one primary visual only');
  assert.ok(source.includes('ds-editorial-pair'), 'missing paired editorial story');
  assert.ok(source.includes('ds-editorial-wide'), 'missing wide editorial story');
  assert.ok(source.includes('ds-service-row'), 'service categories should be editorial rows');
  assert.ok(source.includes('ds-package-table'), 'bundles should use editorial comparison layout');
  assert.ok(source.includes('ds-material-story'), 'material proof should use visual storytelling');
});

test('hero behaves like a campaign opener rather than a landing-page component stack', async () => {
  const source = await pageSource();
  const hero = source.match(/<section class="ds-hero[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.ok(hero.includes('/images/lookbook/modern-boutique-mannequin-display-4.png'));
  assert.ok(!hero.includes('moodboard.png'), 'hero LCP should be a single-scene campaign visual');
  assert.ok(!hero.includes('collage.png'), 'hero LCP should not be a collage');
  assert.ok(!hero.includes('ds-badge'), 'campaign hero should not carry a badge component');
  assert.ok(!hero.includes('ds-hero-footnote'), 'campaign hero should not carry a footnote stack');
  assert.equal((hero.match(/<a\b/g) ?? []).length, 2, 'hero should have one CTA and one text link');
});

test('keyword presentation reads like human retail copy instead of a keyword ticker', async () => {
  const source = await pageSource();
  assert.ok(source.includes('Manekin. Gawangan. Hanger. Satu sistem display.'));
  assert.ok(!source.includes('ds-keyword-track'), 'keyword ticker should be removed');
});

test('use-case and material sections avoid duplicated moodboard collage treatment', async () => {
  const source = await pageSource();
  assert.ok(source.includes('ds-usecase-notes'), 'use cases should be a typographic retail note sequence');
  assert.ok(!source.includes('ds-material-secondary'), 'material story should use one confident visual');
  assert.ok(!source.includes('ds-usecase-layout'), 'use cases should not repeat the image-plus-list template');
});

test('mobile and reading rhythm use comfortable body type and compact media', async () => {
  const styles = await readFile(stylePath, 'utf8');
  assert.match(styles, /font-size:\s*clamp\(15px,/);
  assert.match(styles, /@media \(max-width: 520px\)[\s\S]*?\.ds-hero-visual\s*\{[\s\S]*?min-height:\s*(?:360|380|400|420)px/);
  assert.match(styles, /scroll-snap-type:\s*x mandatory/);
});
