# GEK Design

Marketing website for GEK Design, a digital design and engineering studio.

## Stack

- React 19 + TypeScript
- React Router v8 (framework mode, pre-rendered, no server)
- Vite
- Tailwind CSS v4

## Development

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # dev server on http://localhost:3000
pnpm build      # pre-render every page to build/client/
pnpm preview    # serve build/client locally on http://localhost:4173
pnpm lint       # generate route types + type-check
pnpm test       # unit tests (Vitest)
pnpm test:e2e   # end-to-end tests against the built site (Playwright)
```

First run of the e2e tests: `pnpm exec playwright install chromium`.

The case study images are real client-site screenshots composited into scenes; see [`scripts/mockups/README.md`](scripts/mockups/README.md) to regenerate them.

## Deployment

Hosted on Vercel; `vercel.json` holds the whole setup. `pnpm build` writes a fully static site to `build/client/`: one `index.html` per page (for example `work/vodafone-shop/index.html`), plus `sitemap.xml`, `robots.txt` and `404.html`. Vercel serves it with:

- clean URLs with no trailing slash (`/work/` redirects to `/work`, matching the canonical URLs)
- `404.html` and a 404 status for unknown paths
- long-term caching for `assets/*` (the filenames are content-hashed)
- security headers, including a Content-Security-Policy. If the site starts loading anything from another origin (analytics, embeds, or a different `VITE_MAILER_URL`), add that origin to the CSP in `vercel.json` or the browser will block it.

The contact form only works on `gekdesign.com.au`: the mailer rejects other origins, so it returns 403 on `*.vercel.app` preview deployments.

CI (`.github/workflows/ci.yml`) runs the type check, unit tests and e2e tests on every push to `master` and every pull request.
