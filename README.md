# Link Manekin Indonesia

Editorial B2B mannequin showroom built with **Astro 5 + Tailwind CSS 4**. Four prerendered routes, local fonts, original SVG collection studies, keyboard-accessible measurement drawer, category filters, and a multi-item WhatsApp quotation builder. No UI framework runtime.

## Run

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run preview
```

Node.js 22.12+ is required. `dist/` contains the static website. Deploy at the root of a domain; root-relative links require a host rewrite if deploying beneath a subpath.

## Configure

Copy `.env.example` to `.env` and set `PUBLIC_WHATSAPP_NUMBER` to a verified sales number in international digits, without `+` or spaces. With no configured number, the builder opens WhatsApp's contact chooser with the generated message. No message is sent automatically. Set `PUBLIC_SITE_URL` to the final domain before building so canonical and Open Graph URLs match the deployment. The default URL is a repository convention, not a deployed-site claim.

Catalog reference data lives in `src/data/products.ts`; dimensions and imagery must be confirmed against actual products before commercial use. Art is intentionally labeled as illustration, and no prices, inventory, testimonials, or unverified delivery promises are invented. A storefront visit is by appointment in Tangerang, as specified in the brief.

## Architecture

- `src/layouts/Layout.astro`: local fonts, metadata, shared navigation, footer and dialogs.
- `src/components/`: hero lookbook, asymmetric collection grid, product index, finishes and dialogs.
- `src/scripts/showroom.ts`: vanilla DOM interactions, filtering, modal state and quote lines.
- `src/lib/quote.mjs`: input validation, message formatting and safe WhatsApp URL encoding.
- `src/pages/`: showroom, catalog, sports and custom finishing.
- `public/images/`: original SVG assets, rendered locally without third-party requests.
- `tests/quote.test.mjs`: validation and encoding coverage.

See `docs/implementation.md` for design decisions and verification scope.

## Browser verification

`npm run verify:browser -- http://127.0.0.1:4322` checks all four pages at desktop, mobile, and small-mobile widths, WCAG rules with axe, filters, measurement drawers, keyboard focus, quote encoding and mobile navigation. It intercepts the WhatsApp navigation locally, so no message is sent. Screenshots and JSON results are written to ignored `output/playwright/`. Use `PLAYWRIGHT_EXECUTABLE_PATH` to point to an existing Chromium binary, or install Playwright Chromium with its browser path set inside this project.

The remaining Astro 5 dependency advisory and static deployment constraints are documented in `docs/security.md`.
