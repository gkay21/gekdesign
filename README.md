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
```

## Deployment

`pnpm build` writes a fully static site to `build/client/`: one `index.html` per page (for example `work/kanso-architects/index.html`), plus `sitemap.xml`, `robots.txt` and `404.html`. Upload that folder to any static host that:

- serves clean URLs (`/work` → `work/index.html`)
- responds to unknown paths with `404.html` and a 404 status
- caches `assets/*` long-term (the filenames are content-hashed) and HTML briefly
