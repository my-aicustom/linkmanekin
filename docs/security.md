# Static deployment security

This project is deliberately pinned to Astro 5.18.2 to meet the supplied version mandate. npm reports the Astro package under a critical advisory; a full upstream fix requires a newer major. This is a remaining build-tool dependency warning, not a claim of zero dependency vulnerabilities.

The critical advisory concerns processing untrusted AVIF through Sharp: https://github.com/advisories/GHSA-26w7-cxv4-gfx2 . Sharp is overridden to a patched 0.35.4+ and the Astro image service is disabled with the noop service. All artwork is local SVG, and the production output contains only static files. esbuild is also overridden to 0.28.1+ to address its Windows development-server advisory.

The site has no server islands, hydrated framework islands, image optimization endpoint, authentication, database or remote user content in Astro templates. Quote inputs are read in the browser, rendered using textContent, and URL-encoded. Product identifiers and quantities are validated before message creation. No message is sent automatically.

Deploy only `dist/` on a static host. Development and preview bind to localhost. Reassess the remaining Astro advisories before introducing SSR, uploads, arbitrary template attributes, or dynamic server routes. An Astro major upgrade is outside the explicit version requirement.
