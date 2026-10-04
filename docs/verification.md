# Verification — 2026-10-05

Verified locally against the prerendered build with headless Chromium at `http://127.0.0.1:4322`. This is local runtime evidence, not a production deployment claim.

- `npm run build`: 4 static pages, successful exit. Client JS: 8.62 KB / 3.17 KB gzip.
- `npm run check`: 21 files, 0 errors, 0 warnings, 0 hints.
- `npm test`: 3 tests passed; invalid quantities, unknown products, multi-item formatting, special-character encoding, and invalid phone configuration covered.
- Tree-sitter: 22 code units; 11 SVGs parsed with defusedxml; no syntax errors.
- Semgrep auto: 455 rules, 45 files, 0 findings.
- Browser: all four routes rendered at 1440×1000, 390×844, and 320×720. No horizontal overflow or broken collection images.
- axe WCAG 2 A/AA and 2.1 A/AA: no detected violations on four routes at desktop/mobile widths. Both dialogs also passed the tested A/AA checks. Automated checks do not replace a complete manual accessibility audit.
- Runtime: category deep-link, live filter/count, reference measurement table, Tab cycling, Escape, multi-item quote, product-based default finish, literal HTML input safety, and mobile menu navigation passed.
- WhatsApp URL text was intercepted locally and matched the displayed message exactly. No message was sent.
- Required `inspect.js`: showroom title confirmed, 0 background JavaScript console errors.
- `npm audit --omit=dev`: 0 production-package vulnerabilities. All dependencies are build/development tools; full audit retains one critical Astro package advisory, documented in `security.md`.

Artifacts are retained locally in ignored `output/playwright/`: desktop/mobile screenshots, dialog screenshots, `verification.json`, and `output/semgrep.json`. A verified sales number and final hosting domain were not supplied. The quotation builder therefore uses WhatsApp's contact chooser; site URL remains configurable.
