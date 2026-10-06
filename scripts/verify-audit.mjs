import { chromium } from 'playwright';
import { build } from 'esbuild';
import AxeBuilder from '@axe-core/playwright';
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:4323';
const single = process.argv[3];
const pages = await readdir(new URL('../src/pages/', import.meta.url), { recursive: true });
const articles = await readFile(new URL('../src/data/articles.ts', import.meta.url), 'utf8');
const routes = single ? [single] : [
  ...pages.filter(p => p.endsWith('.astro') && !p.includes('[')).map(p => '/' + p.replaceAll('\\', '/').replace(/index\.astro$/, '').replace(/\.astro$/, '/')),
  ...[...articles.matchAll(/slug: '([^']+)'/g)].map(m => `/artikel/${m[1]}/`),
];
// Run the installed Astro version's actual rules, including its visibility filter.
const bundled = await build({
  stdin: { contents: `export { a11y } from './node_modules/astro/dist/runtime/client/dev-toolbar/apps/audit/rules/a11y.js'; export { perf } from './node_modules/astro/dist/runtime/client/dev-toolbar/apps/audit/rules/perf.js';`, resolveDir: process.cwd() },
  bundle: true, format: 'iife', globalName: 'astroAuditRules', write: false,
});
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
const results = [];
try {
  await Promise.all((single ? [1440] : [1440, 390]).map(async (width) => {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const route of routes) {
      console.log(`Checking ${width}px ${route}`);
      const runtimeErrors = [];
      const onError = error => runtimeErrors.push(error.message);
      page.on('pageerror', onError);
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      await page.addScriptTag({ content: bundled.outputFiles[0].text });
      const findings = [];
      for (const position of [0, 0.5, 1, 0]) {
        await page.evaluate(fraction => window.scrollTo({top: fraction * document.documentElement.scrollHeight, behavior: 'instant'}), position);
        await page.waitForTimeout(position === 1 && route === '/' ? 3500 : 1200);
        findings.push(...await page.evaluate(async () => {
          const issues = [];
          for (const rule of [...astroAuditRules.a11y, ...astroAuditRules.perf]) {
            for (const element of document.querySelectorAll(rule.selector)) {
              if ((element.children[0] || element).offsetParent === null || getComputedStyle(element).display === 'none') continue;
              if (element.nodeName === 'IMG' && !element.complete) continue;
              if (!rule.match || await rule.match(element)) issues.push({ code: rule.code, element: element.outerHTML.slice(0, 280) });
            }
          }
          return issues;
        }));
      }
      const brokenImages = await page.locator('img').evaluateAll(async images => {
        const broken = [];
        for (const image of images.filter(i => i.getAttribute('src'))) {
          image.loading = 'eager';
          try { await Promise.race([image.decode(), new Promise((_, reject) => setTimeout(() => reject(new Error('Image load timeout')), 10000))]); } catch { broken.push(image.src); }
        }
        return broken;
      });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      const accessibility = await new AxeBuilder({ page }).exclude('astro-dev-toolbar').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const violations = accessibility.violations.map(v => ({id: v.id, targets: v.nodes.map(n => n.target)}));
      const unique = [...new Map(findings.map(f => [JSON.stringify(f), f])).values()];
      const result = { route, width, status: response.status(), findings: unique, violations, runtimeErrors, brokenImages, overflow };
      results.push(result);
      console.log(JSON.stringify(result));
      page.off('pageerror', onError);
    }
    await context.close();
  }));
} finally { await browser.close(); }
await mkdir(new URL('../output/playwright/', import.meta.url), { recursive: true });
await writeFile(new URL('../output/playwright/astro-audit.json', import.meta.url), JSON.stringify(results, null, 2));
if (results.some(r => r.findings.length || r.violations.length || r.runtimeErrors.length || r.brokenImages.length || r.overflow || (r.status !== 200 && r.route !== '/404/'))) process.exitCode = 1;
