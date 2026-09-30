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
pnpm test       # Vitest unit tests (src/**/*.test.ts)
pnpm test:e2e   # Playwright against the built site (builds and serves it itself on :4173; E2E_PORT=4180 to use another port)

pnpm test -- src/lib/contact.test.ts                 # one unit test file
pnpm test:e2e tests/e2e/accessibility.spec.ts        # one e2e file
pnpm test:e2e -g "keyboard"                          # e2e tests matching a name
```

- **Unit tests** (`vitest.config.ts`) cover `src/lib` (contact validation and payload, SEO tags, `pictureJpeg`) and project data (unique slugs, required per-project fields).
- **E2E tests** (`playwright.config.ts`, `tests/e2e/`) cover routing, overlays, 404s, sitemap, the contact form (the mailer is intercepted with `page.route`, so no email is sent), keyboard and focus behaviour, and a mobile no-horizontal-overflow check that only runs in the `mobile` project.

## Architecture

- **React Router framework mode, `ssr: false` + `prerender`.** `react-router.config.ts` sets `appDirectory: 'src'` and pre-renders every path from `getSitePages()` (`src/lib/site-pages.ts`: static pages plus one per project/article slug) and `/sitemap.xml`. New projects and articles in `src/data/` are picked up automatically. Don't add `action`/`headers` exports, because there's no server to run them. A `loader` only runs at build time.
- **Entry points.** `src/root.tsx` is the HTML document (`Layout`: fonts, site-wide `ProfessionalService` JSON-LD, `<Meta/>`, `<ScrollRestoration/>`) and the site shell (Navbar + `<Outlet/>` + Footer), plus the `ErrorBoundary` and `HydrateFallback`. There's no `index.html` or `main.tsx`.
- **Two "routes" files.** `src/routes.ts` is the framework's route config. `src/paths.ts` (`PATHS`, `projectPath`, `articlePath`, `contactPath`) builds the URLs for links. Always use these rather than hardcoded strings.
- **Route modules (`src/routes/*.tsx`) are thin wrappers.** Each exports `meta` and wires callbacks from `useSiteNavigation()` (`src/lib/navigation.ts`) into the router-agnostic components in `src/pages/`. `Navbar` and `Footer` use `<Link>` directly. Route types come from `./+types/<route>`, generated into `.react-router/` by `pnpm typegen`.
- **Modal routes are nested.** `/work/:slug` and `/insights/:slug` are children of `/work` and `/insights`, rendering `CaseStudyModal` and `ArticleModal` into the listing page's `<Outlet/>`. So the pre-rendered case-study HTML contains the full case study. Opening one sets `state.openedInApp` + `preventScrollReset`. Closing (`useCloseModal`) goes back with `navigate(-1)` when opened in-app, and otherwise goes to the listing page. "Next case study" (`useReplaceModal`) uses `replace` and keeps the state. Unknown slugs redirect to the listing page. Unknown paths hit `routes/not-found.tsx`.
- **SEO.** Every route's `meta` uses `seo()` from `src/lib/seo.ts`: title, description, canonical, Open Graph/Twitter tags with absolute URLs based on `SITE_URL`, optional `noindex` and per-page JSON-LD. Child `meta` replaces the parent's rather than merging, so each route returns its full set. Share images must be plain JPEGs: use `pictureJpeg(picture)` (the 1280px JPEG from a responsive image).
- **Accessibility patterns.** Clickable cards are `CardLink` (`src/components/CardLink.tsx`): a real `<a href>` that runs in-app navigation on a plain click but leaves ctrl/cmd/middle-click to the browser. Never put a click handler on a `<div>`/`<article>`. Both overlays use `useDialog` (`src/lib/useDialog.ts`) for focus, Tab trapping, Escape, scroll locking and restoring focus on close. Form inputs need `id` + `<label htmlFor>`. Keep heading levels sequential; `index.css` gives `h1`–`h3` the display font, so a `font-*` class is needed to keep a promoted heading's look.
- **Hydration.** The pre-rendered HTML must match the first client render. Anything that depends on the query string, time or `window` belongs in an effect. Example: `routes/contact.tsx` applies `?service=` after hydration by remounting `ContactPage` with a `key`.
- **Hosting.** Deploy `build/client/`. Each page is `<path>/index.html`, so the host must serve clean URLs (`/work` → `work/index.html`). Unknown paths should get `404.html` (a copy of React Router's `__spa-fallback.html`) with a 404 status. Canonical URLs have no trailing slash. `vite preview` does **not** work for this: it serves the home page for every path, which breaks hydration. Use `pnpm preview`.
- **Content lives in typed data files.** `src/data/projects.ts` (`Project` / `PROJECTS`), `services.ts`, and `articles.ts` hold all site copy. To add or change content, edit these files instead of the JSX.
- **Case studies must be factual.** Every project is real (GEK Design clients, plus roles held by the founder at FDJ United, Stan, Kablamo/Vodafone and Kablamo/Atlassian, which are framed as such, not as agency work). Don't invent metrics, testimonials or claims. `challengeHeading`, `approachHeading`, `status` and `stack` are required per project, so the case study template has no generic filler. `uptimeSla` labels must say whose SLA it is: GEK Design's own 99.99% guarantee, or Atlassian's published Cloud SLA on Jira. Hero images are real site screenshots composited into scenes by `scripts/mockups/` (see its README).
- **The contact form posts from the browser to the shared mailer.** `ContactPage` sends to a Go Lambda at `https://mailer.gekdesign.com.au/send`. Its source is in the sibling repo `../mailer`, and the Fairfield Dental Care and MiniMinds sites use the same service. The mailer only accepts `{ name, email, phone?, message }`, so `src/lib/contact.ts` combines the other brief fields (services, budget, timeline, company, website) into a labelled `message`. It also handles validation and sending. The mailer checks the request's `Origin` header against its own allowlist (`../mailer/handler/types.go`: `gekdesign.com.au`, `www.`, `http://localhost:3000`). Submissions from any other origin or port get a 403. `VITE_MAILER_URL` overrides the endpoint.

## Styling

- Tailwind v4 through `@tailwindcss/vite`. There is no `tailwind.config`: design tokens are declared in the `@theme` block in `src/index.css` (`canvas`, `surface`, `accent`, `border-subtle`, and the `sans` / `display` / `mono` font families).
- The site uses a dark theme only (`#09090B` background). Headings use Syne (`font-display`), body text uses Plus Jakarta Sans, and labels and meta text use JetBrains Mono. Fonts are self-hosted from `@fontsource-variable/*` packages (imported in `src/root.tsx`, which also preloads the Latin Syne and Jakarta files). Don't reintroduce Google Fonts.
- Many components hardcode hex values (e.g. `bg-[#09090B]`) instead of the theme tokens. Match whatever the surrounding code does.
- Icons come from `lucide-react`. `motion` is installed but not used yet.

## Gotchas

- Import images as modules. For content images use `import img from '../assets/images/x.jpg?responsive'` and render with `ResponsiveImage` (`src/components/ResponsiveImage.tsx`, with a real `sizes` hint, and `priority` only for above-the-fold images). `?responsive` is a `vite-imagetools` preset (`vite.imagetools.ts`, shared by the Vite and Vitest configs) producing AVIF, WebP and JPG at 640–2400px as a `Picture`. An absolute `/src/assets/...` string works in dev but breaks in the production build.
- The `@` path alias resolves to the **repo root**, not `src/`.
- `vite.config.ts` turns off HMR and file watching when `DISABLE_HMR=true`, a setting from the Google AI Studio template. Keep this behavior.
- To test the contact form locally, the dev server must run on port 3000, or the mailer rejects it. If port 3000 is taken and Vite picks another port, mock the endpoint instead, e.g. with Playwright's `page.route`.
