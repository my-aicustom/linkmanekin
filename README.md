# Link Manekin Indonesia

Editorial B2B mannequin showroom built with **Astro 5 + Tailwind CSS 4**. The site is fully prerendered, uses local fonts, provides an accessible measurement drawer, category filters, multi-item WhatsApp quotation flow, commercial landing pages, editorial guides, and structured search metadata without a client UI framework runtime.

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

Copy `.env.example` to `.env` and set `PUBLIC_WHATSAPP_NUMBER` to a verified sales number in international digits, without `+` or spaces. Set `PUBLIC_SITE_URL` to the final canonical origin before building. The repository default is `https://jualmanekin.com`.

Catalog reference data lives in `src/data/products.ts`. Dimensions, material, finishing, and imagery are reference data and must be confirmed against the actual product before commercial use. The site intentionally avoids invented pricing, stock, testimonials, ratings, delivery promises, or technical claims.

## Search architecture

Commercial intent is separated to reduce cannibalization:

- `/` — broad mannequin/display intent and brand discovery.
- `/katalog/` — catalog and B2B comparison intent.
- `/manekin-wanita/` — women/boutique retail intent.
- `/manekin-pria/` — menswear/distro retail intent.
- `/manekin-jahit/` — dressmaker/atelier intent.
- `/sports-mannequin/` — sports/activewear intent.
- `/kustom-finishing/` — custom finish/base/logo intent.
- `/perlengkapan-display-toko-baju/` — mannequin + rack + hanger/store-opening intent.
- `/artikel/` — supporting informational content.
- `/kontak/` — consultation/contact intent.

`src/pages/sitemap.xml.ts` generates the sitemap from the route inventory and article data. Do not restore a separate `public/sitemap.xml`; maintaining both creates drift and can collide with the generated route.

Shared metadata and JSON-LD live in `src/layouts/Layout.astro`. Article-specific `Article` structured data is rendered by `src/pages/artikel/[slug].astro`.

## Browser verification

Existing interaction verification:

```sh
npm run verify:browser -- http://127.0.0.1:4322
```

SEO route/accessibility sweep added by the SEO v2 patch:

```sh
node scripts/verify-seo-routes.mjs http://127.0.0.1:4322
```

The second command checks the commercial routes and a representative article at desktop, mobile, and small-mobile widths for HTTP 200, one H1, canonical, meta description, horizontal overflow, WCAG violations, and console/page errors.
