import React from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import type { Route } from './+types/root';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';
import { useSiteNavigation } from './lib/navigation';
import { SITE_NAME, SITE_URL } from './lib/seo';
import { SOCIAL_LINKS } from './data/social';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';
import '@fontsource-variable/syne/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import syneLatin from '@fontsource-variable/syne/files/syne-latin-wght-normal.woff2?url';
import jakartaLatin from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url';
import './index.css';

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Modern creative web design and development agency crafting high-performing digital experiences.',
  serviceType: [
    'Web Design',
    'Web Development',
    'Brand Strategy',
    'UI/UX Design',
    'E-commerce Development',
    'Creative Direction',
  ],
  areaServed: 'Global',
  priceRange: '$$$$',
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  // Self-hosted fonts: preload the Latin files used above the fold (headings + body text).
  { rel: 'preload', href: syneLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: jakartaLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body className="bg-[#09090B] text-[#EDEDED] antialiased selection:bg-[#2563EB] selection:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { startProject } = useSiteNavigation();

  return (
    <div className="min-h-screen bg-[#09090B] text-[#EDEDED] flex flex-col justify-between selection:bg-blue-600 selection:text-white relative">
      <Navbar pathname={pathname} onStartProject={() => startProject()} />
      <main className="flex-1">{children}</main>
      <Footer onStartProject={() => startProject()} />
    </div>
  );
};

export default function App() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}

// Shown by the SPA fallback page (unknown paths) until the client router takes over.
export function HydrateFallback() {
  return <div className="min-h-screen bg-[#09090B]" />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  if (!isNotFound) console.error(error);

  return (
    <SiteShell>
      {isNotFound ? (
        <NotFound />
      ) : (
        <NotFound title="Something went wrong" message="Please refresh the page, or head back to the homepage." />
      )}
    </SiteShell>
  );
}
