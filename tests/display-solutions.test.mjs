import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pagePath = new URL(
  '../src/pages/perlengkapan-display-toko-baju.astro',
  import.meta.url,
);

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

test('display solutions page exposes three bundles and a direct WhatsApp CTA', async () => {
  const source = await pageSource();
  for (const tier of ['Paket Starter', 'Paket Boutique Pro', 'Paket Flagship Store']) {
    assert.ok(source.includes(tier), `missing bundle tier: ${tier}`);
  }
  assert.match(source, /wa\.me\/6281389896052/);
  assert.match(source, /min-height:\s*48px|height:\s*48px|--touch:\s*48px/);
});
