import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:4322';
const routes = [
  '/',
  '/katalog/',
  '/manekin-wanita/',
  '/manekin-pria/',
  '/manekin-jahit/',
  '/sports-mannequin/',
  '/kustom-finishing/',
  '/perlengkapan-display-toko-baju/',
  '/artikel/',
  '/artikel/cara-memilih-manekin-untuk-toko-fashion/',
  '/kontak/',
];

const defaultChrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || defaultChrome,
});

try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') {
      const text = message.text();
      if (
        text.includes('503') ||
        text.includes('tiktok') ||
        text.includes('instagram') ||
        text.includes('fburl.com') ||
        text.includes('ErrorUtils')
      ) return;
      consoleErrors.push(text);
    }
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const [label, width, height] of [
    ['desktop', 1440, 1000],
    ['mobile', 390, 844],
    ['small-mobile', 320, 720],
  ]) {
    await page.setViewportSize({ width, height });

    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, `${route} should return 200`);
      assert.equal(await page.locator('h1').count(), 1, `${route} should have one H1`);
      assert.equal(
        await page.locator('link[rel="canonical"]').count(),
        1,
        `${route} should have one canonical`,
      );
      assert.equal(
        await page.locator('meta[name="description"]').count(),
        1,
        `${route} should have one description`,
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        true,
        `${route} overflows at ${width}px`,
      );

      if (label !== 'small-mobile') {
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 30));
          }
          window.scrollTo(0, 0);
        });
        const accessibility = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .exclude('iframe')
          .analyze();
        assert.deepEqual(
          accessibility.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
          [],
          `${route} accessibility at ${label}`,
        );
      }
    }
  }

  assert.deepEqual(consoleErrors, [], 'Console and page errors');
  console.log(`SEO route verification passed for ${routes.length} routes across desktop/mobile widths.`);
} finally {
  await browser.close();
}
