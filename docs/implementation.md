# Link Manekin showroom

The supplied CODEX_LINKMANEKIN_TASK.md is the implementation brief: an Indonesian B2B mannequin showroom, Astro 5, Tailwind 4, four static routes, editorial neutral palette, original local SVG art, measurement drawer, and WhatsApp quotation builder. No ecommerce checkout or invented pricing.

## Design

Oversized Cormorant Garamond headlines meet compact Plus Jakarta Sans labels. A sculptural two-mannequin hero introduces athletic forms. Asymmetric collection panels, numbered product studies, hairline rules and a dark finishing section create the lookbook rhythm. Assets and fonts are hosted locally. Responsive layouts preserve content order and keyboard access; reduced motion is respected.

## Execution and verification

- Pin Astro to 5.18.x and use the official Tailwind Vite plugin.
- Store catalog reference dimensions and finishes in structured data; use the same data for cards, drawer and quote lines.
- Implement all four routes using a shared SEO layout, navigation, footer and native dialogs.
- Quote logic validates quantities and product IDs, encodes all user text, supports multiple items and never sends a message automatically.
- If no verified sales number is supplied, open WhatsApp's contact chooser rather than inventing a destination.
- Check TypeScript/Astro, quote edge cases, static build, tree-sitter syntax and Semgrep before commit.
- Inspect desktop and mobile renders and exercise filtering, drawers, forms and keyboard interactions in Chromium.
- Commit under gumgum-sys and verify local HEAD equals GitHub main after push.

## Content limits

SVG illustrations are artistic collection studies, not photographs of inventory. Dimensions are explicitly reference measurements to confirm with sales. Availability, lead time, minimum order and actual finishing samples are confirmed through the quote. Tangerang is the studio location from the brief; no street address or customer history is fabricated.
