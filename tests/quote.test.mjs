import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuote, whatsappUrl } from '../src/lib/quote.mjs';
const catalog = [
  { id: 'SP-01', name: 'The Sprinter' },
  { id: 'DR-01', name: 'The Atelier' },
];
const input = {
  business: 'Atelier & Co',
  city: 'Tangerang',
  notes: 'Logo A+B?',
  items: [
    { id: 'SP-01', quantity: 3, finish: 'Matte Noir' },
    { id: 'DR-01', quantity: 2, finish: 'Raw Linen' },
  ],
};
test('multi-item quote preserves business, quantities, finish and notes in encoded URL', () => {
  const message = buildQuote(input, catalog);
  assert.match(message, /SP-01 — The Sprinter\n  3 unit · Matte Noir/);
  assert.match(message, /DR-01 — The Atelier\n  2 unit · Raw Linen/);
  const url = new URL(whatsappUrl(message, '6281234567890'));
  assert.equal(url.pathname, '/6281234567890');
  assert.equal(url.searchParams.get('text'), message);
  assert.match(message, /Logo A\+B\?/);
});
test('rejects unknown products, missing business, empty cart and invalid quantities', () => {
  assert.throws(() => buildQuote({ ...input, business: ' ' }, catalog));
  assert.throws(() => buildQuote({ ...input, items: [] }, catalog));
  assert.throws(() =>
    buildQuote(
      { ...input, items: [{ id: 'bad', quantity: 1, finish: 'Noir' }] },
      catalog,
    ),
  );
  for (const quantity of [0, -1, 1.5, 'oops', Infinity, 10000])
    assert.throws(() =>
      buildQuote(
        { ...input, items: [{ id: 'SP-01', quantity, finish: 'Noir' }] },
        catalog,
      ),
    );
});
test('chooses a contact when number is absent and rejects malformed configured numbers', () => {
  assert.equal(new URL(whatsappUrl('Halo')).pathname, '/');
  for (const phone of ['+62812', 'javascript:alert(1)', '08123456789', '123'])
    assert.throws(() => whatsappUrl('Halo', phone));
});
