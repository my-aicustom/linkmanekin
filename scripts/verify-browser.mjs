import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:4322';
const output = new URL('../output/playwright/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
});
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
const results = [];
try {
  for (const [viewport, width, height] of [
    ['desktop', 1440, 1000],
    ['mobile', 390, 844],
    ['small-mobile', 320, 720],
  ]) {
    await page.setViewportSize({ width, height });
    for (const [name, route] of [
      ['showroom', '/'],
      ['catalog', '/katalog/'],
      ['sports', '/sports-mannequin/'],
      ['finishing', '/kustom-finishing/'],
    ]) {
      const response = await page.goto(base + route, {
        waitUntil: 'networkidle',
      });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        true,
        `${name}: horizontal overflow at ${width}px`,
      );
      assert.equal(
        await page.locator('main img').evaluateAll(async (images) => {
          images.forEach((image) => {
            image.loading = 'eager';
          });
          await Promise.all(images.map((image) => image.decode()));
          return images.every(
            (image) => image.complete && image.naturalWidth > 0,
          );
        }),
        true,
      );
      await page.screenshot({
        path: new URL(`${name}-${viewport}.png`, output).pathname.replace(
          /^\/(\w:)/,
          '$1',
        ),
        fullPage: true,
      });
      if (viewport !== 'small-mobile') {
        const accessibility = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        assert.deepEqual(
          accessibility.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
          [],
          `${name} accessibility`,
        );
      }
      results.push(
        `${name}: ${viewport} render, assets, overflow${viewport !== 'small-mobile' ? ', WCAG scan' : ''} passed`,
      );
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + '/katalog/?kategori=Dressmaker');
  assert.equal(await page.locator('.product-card:visible').count(), 2);
  await page.getByRole('button', { name: 'Sports', exact: true }).click();
  assert.equal(await page.locator('.product-card:visible').count(), 2);
  assert.equal(
    await page.locator('[data-catalog-count]').innerText(),
    '2 bentuk',
  );
  await page.locator('.image-button[data-spec-open="SP-01"]').click();
  assert.equal(await page.locator('#spec-title').innerText(), 'The Sprinter');
  assert.equal(await page.locator('#spec-measurements tr').count(), 5);
  assert.match(
    await page.locator('#spec-measurements').innerText(),
    /Height\s+185/,
  );
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press('Tab');
    assert.equal(
      await page.evaluate(() =>
        document.querySelector('#spec-dialog').contains(document.activeElement),
      ),
      true,
      'Native dialog traps focus',
    );
  }
  const modalA11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  assert.deepEqual(
    modalA11y.violations.map((v) => v.id),
    [],
  );
  await page.keyboard.press('Escape');
  assert.equal(
    await page.locator('#spec-dialog').evaluate((dialog) => dialog.open),
    false,
  );
  await page.locator('.product-plus[data-quote-open="SP-01"]').click();
  await page.getByLabel('Nama bisnis', { exact: true }).fill('Atelier & Co');
  await page.getByLabel('Kota pengiriman', { exact: true }).fill('Tangerang');
  await page
    .locator('.quote-line')
    .first()
    .getByLabel('Unit', { exact: true })
    .fill('3');
  await page
    .getByRole('button', { name: '+ Tambah produk', exact: true })
    .click();
  const second = page.locator('.quote-line').nth(1);
  await second
    .getByRole('combobox', { name: 'Produk', exact: true })
    .selectOption('DR-01');
  await second.getByLabel('Unit', { exact: true }).fill('2');
  await page
    .getByLabel('Catatan proyek', { exact: false })
    .fill('Logo A+B? <script>alert(1)</script>');
  await page.getByText('Lihat ringkasan pesan', { exact: true }).click();
  const message = await page.locator('#quote-message').innerText();
  assert.match(message, /3 unit · Matte Noir/);
  assert.match(message, /DR-01 — The Atelier/);
  assert.match(message, /2 unit · Raw Linen/);
  assert.match(message, /<script>alert\(1\)<\/script>/);
  assert.equal(await page.locator('#quote-message script').count(), 0);
  const quoteA11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  assert.deepEqual(
    quoteA11y.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
    [],
  );
  await page.screenshot({
    path: new URL('quote-desktop.png', output).pathname.replace(
      /^\/(\w:)/,
      '$1',
    ),
    fullPage: true,
  });
  await context.route('https://wa.me/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<title>Local intercepted WhatsApp preview</title>',
    }),
  );
  const popupPromise = context.waitForEvent('page');
  await page.locator('#quote-form button[type=submit]').click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  assert.equal(new URL(popup.url()).searchParams.get('text'), message);
  await popup.close();
  await page.keyboard.press('Escape');
  assert.equal(
    await page.locator('#quote-dialog').evaluate((dialog) => dialog.open),
    false,
  );
  results.push(
    'Filters, direct category link, drawer dimensions, focus trap, Escape, multi-item quote, HTML text safety and intercepted WhatsApp encoding passed. No message sent.',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Buka menu', exact: true }).click();
  assert.equal(await page.locator('#mobile-nav').isVisible(), true);
  await page
    .locator('#mobile-nav')
    .getByRole('link', { name: 'Koleksi', exact: true })
    .click();
  await page.waitForURL(base + '/katalog/');
  assert.equal(await page.locator('#mobile-nav').isVisible(), false);
  await page.locator('.product-plus').first().click();
  assert.equal(
    await page
      .locator('#quote-dialog')
      .evaluate(
        (dialog) => dialog.getBoundingClientRect().width <= window.innerWidth,
      ),
    true,
  );
  await page.screenshot({
    path: new URL('quote-mobile.png', output).pathname.replace(
      /^\/(\w:)/,
      '$1',
    ),
    fullPage: true,
  });
  await page.keyboard.press('Escape');
  results.push('Mobile navigation and quote dialog passed.');
  assert.deepEqual(errors, [], 'Console and page errors');
  await writeFile(
    new URL('verification.json', output),
    JSON.stringify({ base, results, consoleErrors: errors }, null, 2),
  );
  console.log(results.join('\n'));
  console.log('Browser verification: all checks passed, zero console errors.');
} finally {
  await browser.close();
}
