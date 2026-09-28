# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for GEK Design, a web design and development studio. It's React 19 + Tailwind CSS v4 on React Router v8 framework mode (Vite 8), with every page pre-rendered to static HTML at build time and no runtime server. It was first scaffolded in Google AI Studio. The code is TypeScript, and pnpm is the package manager (`pnpm-lock.yaml`).

## Commands

```bash
pnpm install
pnpm dev        # react-router dev server on http://localhost:3000 (binds 0.0.0.0)
pnpm build      # pre-renders every page to build/client/, plus 404.html
pnpm preview    # serve build/client with `serve` on :4173 (behaves like a static host)
pnpm lint       # react-router typegen + tsc --noEmit (no ESLint configured)
```

There is no test framework set up yet.

## Architecture

- **React Router framework mode, `ssr: false` + `prerender`.** `react-router.config.ts` sets `appDirectory: 'src'` and pre-renders every path from `getSitePages()` (`src/lib/site-pages.ts`: static pages plus one per project/article slug) and `/sitemap.xml`. New projects and articles in `src/data/` are picked up automatically. Don't add `action`/`headers` exports, because there's no server to run them. A `loader` only runs at build time.
- **Entry points.** `src/root.tsx` is the HTML document (`Layout`: fonts, site-wide `ProfessionalService` JSON-LD, `<Meta/>`, `<ScrollRestoration/>`) and the site shell (Navbar + `<Outlet/>` + Footer), plus the `ErrorBoundary` and `HydrateFallback`. There's no `index.html` or `main.tsx`.
- **Two "routes" files.** `src/routes.ts` is the framework's route config. `src/paths.ts` (`PATHS`, `contactPath`) holds the URL constants for links. Always link with `PATHS` rather than hardcoded strings.
- **Route modules (`src/routes/*.tsx`) are thin wrappers.** Each exports `meta` and wires callbacks from `useSiteNavigation()` (`src/lib/navigation.ts`) into the router-agnostic components in `src/pages/`. `Navbar` and `Footer` use `<Link>` directly. Route types come from `./+types/<route>`, generated into `.react-router/` by `pnpm typegen`.
- **Modal routes are nested.** `/work/:slug` and `/insights/:slug` are children of `/work` and `/insights`, rendering `CaseStudyModal` and `ArticleModal` into the listing page's `<Outlet/>`. So the pre-rendered case-study HTML contains the full case study. Opening one sets `state.openedInApp` + `preventScrollReset`. Closing (`useCloseModal`) goes back with `navigate(-1)` when opened in-app, and otherwise goes to the listing page. "Next case study" (`useReplaceModal`) uses `replace` and keeps the state. Unknown slugs redirect to the listing page. Unknown paths hit `routes/not-found.tsx`.
- **SEO.** Every route's `meta` uses `seo()` from `src/lib/seo.ts`: title, description, canonical, Open Graph/Twitter tags with absolute URLs based on `SITE_URL`, optional `noindex` and per-page JSON-LD. Child `meta` replaces the parent's rather than merging, so each route returns its full set.
- **Hydration.** The pre-rendered HTML must match the first client render. Anything that depends on the query string, time or `window` belongs in an effect. Example: `routes/contact.tsx` applies `?service=` after hydration by remounting `ContactPage` with a `key`.
- **Hosting.** Deploy `build/client/`. Each page is `<path>/index.html`, so the host must serve clean URLs (`/work` → `work/index.html`). Unknown paths should get `404.html` (a copy of React Router's `__spa-fallback.html`) with a 404 status. Canonical URLs have no trailing slash. `vite preview` does **not** work for this: it serves the home page for every path, which breaks hydration. Use `pnpm preview`.
- **Content lives in typed data files.** `src/data/projects.ts` (`Project` / `PROJECTS`), `services.ts`, and `articles.ts` hold all site copy. To add or change content, edit these files instead of the JSX.
- **The contact form posts from the browser to the shared mailer.** `ContactPage` sends to a Go Lambda at `https://mailer.gekdesign.com.au/send`. Its source is in the sibling repo `../mailer`, and the Fairfield Dental Care and MiniMinds sites use the same service. The mailer only accepts `{ name, email, phone?, message }`, so `src/lib/contact.ts` combines the other brief fields (services, budget, timeline, company, website) into a labelled `message`. It also handles validation and sending. The mailer checks the request's `Origin` header against its own allowlist (`../mailer/handler/types.go`: `gekdesign.com.au`, `www.`, `http://localhost:3000`). Submissions from any other origin or port get a 403. `VITE_MAILER_URL` overrides the endpoint.

## Styling

- Tailwind v4 through `@tailwindcss/vite`. There is no `tailwind.config`: design tokens are declared in the `@theme` block in `src/index.css` (`canvas`, `surface`, `accent`, `border-subtle`, and the `sans` / `display` / `mono` font families).
- The site uses a dark theme only (`#09090B` background). Headings use Syne (`font-display`), body text uses Plus Jakarta Sans, and labels and meta text use JetBrains Mono. Fonts load from Google Fonts via `links` in `src/root.tsx`.
- Many components hardcode hex values (e.g. `bg-[#09090B]`) instead of the theme tokens. Match whatever the surrounding code does.
- Icons come from `lucide-react`. `motion` is installed but not used yet.

## Gotchas

- Import images as modules (`import img from '../assets/images/x.jpg'`). An absolute `/src/assets/...` string works in dev but breaks in the production build.
- The `@` path alias resolves to the **repo root**, not `src/`.
- `vite.config.ts` turns off HMR and file watching when `DISABLE_HMR=true`, a setting from the Google AI Studio template. Keep this behavior.
- To test the contact form locally, the dev server must run on port 3000, or the mailer rejects it. If port 3000 is taken and Vite picks another port, mock the endpoint instead, e.g. with Playwright's `page.route`.
