# Local Astro audit — 6 October 2026

Local development URL: http://127.0.0.1:4323/

## Causes and changes

- `content-visibility: auto` on shared sections made real heading/link text return an empty `innerText` while offscreen. Removing section containment resolved the reproduced Astro missing-content findings.
- Native closed FAQ content also returned empty text while reporting an offset parent. Closed answers now use `display: none`; opening the native `details` restores their normal layout and readable links.
- TikTok's asynchronously inserted iframe lacked a title. A scoped observer assigns its accessible title and lazy loading when inserted.
- The favicon assets had drifted from the header brand mark: old PNG/Apple icons showed a hand-drawn LM monogram, while the SVG used a separate icon. All sizes now come from the official Link Manekin logo; icon URLs use a version query to refresh browser favicon caches.
- Eight 1.9–2.6 MB lookbook PNGs and the original logo bypassed Astro's image pipeline. Their sources now live in `src/assets/images`. `SiteImage.astro` uses Astro `Image` to generate responsive WebP variants; the no-op image service was removed. Social preview images and organization schema point to generated JPEG/PNG assets.
- The persistent header uses a 786-byte, 76×76 WebP embedded in the HTML. Original logo source is retained for other sizes.
- Image loading priority now follows the initial visible layout, recalculating after fonts, viewport resizing, and catalog filtering. This handles the different desktop/mobile folds without loading every image eagerly.

Astro image reference: https://docs.astro.build/en/guides/images/

## Verification

- 16 routes at 1440×900 and 390×900: 32 successful checks, with top, middle, bottom, and return-to-top audit samples.
- Actual installed Astro 5 audit rules: **0 findings**.
- Axe WCAG 2 A/AA and 2.1 A/AA checks: **0 detected violations**. Development toolbar UI is excluded from Axe; application content is included.
- **0 runtime exceptions, broken images, or horizontal overflow** in those checks.
- Existing browser suite passes at desktop, mobile and 320px widths, including product filters, detail dialog, focus handling, quote form, mobile navigation, and intercepted WhatsApp URL encoding. No message was sent.
- Live TikTok iframe title and loading attributes confirmed after the external script inserted the iframe.
- All four article schema images match their Open Graph images and return HTTP 200 with JPEG content. The SEO suite was rerun after updating those schema references: 7/7 passes.
- FAQ links on the three mannequin category pages verified hidden when closed, readable when opened, and hidden again on closing.
- Astro build: 16 pages generated. Astro check: 0 errors, warnings, or hints. Existing unit suite: 26/26 passes.
- Tree-sitter checks via ast-grep found no ERROR nodes in modified TypeScript/CSS; Astro compilation validates the component templates.
- Semgrep auto scan completed with 0 scanner errors. Seven existing findings remain in the unchanged GitHub Actions workflow (mutable action references) and sitemap XML escaping helper. No findings were reported in changed files. This is not a claim that the whole repository has zero security findings.

Automated checks do not replace a full manual accessibility evaluation.

## Evidence and reproduction

- `output/playwright/astro-audit.json`: full per-route results.
- `output/playwright/verification.json`: existing interaction suite results.
- `output/playwright/lookbook-optimized-mobile.png` and `lookbook-optimized-desktop.png`: rendered optimized images.
- `output/build-audit.log`: image generation and build output.
- `output/semgrep-audit.json`: SAST results.

Run against the development server (required for Astro's development image annotations):

```powershell
$env:PLAYWRIGHT_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm run verify:audit -- http://127.0.0.1:4323
```

The development server remains running for local review. Changes have not been deployed.
