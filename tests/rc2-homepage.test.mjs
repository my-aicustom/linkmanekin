import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('RC2 hero is product-led and removes the RC1 stage chrome', async () => {
  const hero = await read('src/components/HeroLookbook.astro');
  assert.match(hero, /class="campaign-hero/);
  assert.match(hero, /campaign-product-stage/);
  assert.doesNotMatch(hero, /stage-index|material-strip|vertical-label/);
});

test('RC2 collection section uses an editorial ledger rather than the RC1 bento grid', async () => {
  const collection = await read('src/components/BentoShowcase.astro');
  assert.match(collection, /class="collection-ledger/);
  assert.doesNotMatch(collection, /lookbook-grid|lookbook-panel/);
});

test('RC2 homepage replaces the card-like statement block with a compact manifesto rail', async () => {
  const page = await read('src/pages/index.astro');
  assert.match(page, /class="manifesto-rail/);
  assert.doesNotMatch(page, /statement-grid/);
});

test('RC2 stylesheet is loaded after the existing style layers and includes responsive campaign rules', async () => {
  const page = await read('src/pages/index.astro');
  const css = await read('src/styles/rc2.css').catch(() => '');
  assert.match(page, /import '\.\.\/styles\/rc2\.css';/);
  assert.match(css, /\.campaign-hero-media/);
  assert.match(css, /\.collection-ledger/);
  assert.match(css, /\.manifesto-rail/);
  assert.match(css, /@media \(max-width: 800px\)/);
});

test('RC2 keeps direct homepage links to the focused commercial landing pages', async () => {
  const page = await read('src/pages/index.astro');
  for (const route of ['/manekin-wanita/', '/manekin-pria/', '/manekin-jahit/', '/perlengkapan-display-toko-baju/']) {
    assert.ok(page.includes(route), `missing homepage money-page link: ${route}`);
  }
});


test('RC2 image merchandising makes actual mannequin product art the primary sales visual', async () => {
  const hero = await read('src/components/HeroLookbook.astro');
  for (const asset of ['/images/boutique-muse.svg', '/images/boutique-essential.svg']) {
    assert.ok(hero.includes(asset), `hero missing mannequin product asset: ${asset}`);
  }
  assert.doesNotMatch(hero, /\/images\/lookbook\//, 'hero should not lead with moodboard/lookbook imagery');
  assert.match(hero, /CS-01/);
  assert.match(hero, /CS-02/);
});

test('RC2 collection stories lead with category product images instead of moodboards', async () => {
  const collection = await read('src/components/BentoShowcase.astro');
  for (const asset of [
    '/images/sports-sprint.svg',
    '/images/dressmaker-couture.svg',
    '/images/boutique-muse.svg',
  ]) {
    assert.ok(collection.includes(asset), `collection missing product asset: ${asset}`);
  }
  assert.doesNotMatch(collection, /\/images\/lookbook\//, 'category sales stories should not be moodboard-led');
});
