import { type RouteConfig, index, route } from '@react-router/dev/routes';

// Framework route config. URL constants for links live in ./paths.ts.
export default [
  index('routes/home.tsx'),
  route('work', 'routes/work.tsx', [route(':slug', 'routes/work.$slug.tsx')]),
  route('services', 'routes/services.tsx'),
  route('about', 'routes/about.tsx'),
  route('insights', 'routes/insights.tsx', [route(':slug', 'routes/insights.$slug.tsx')]),
  route('contact', 'routes/contact.tsx'),
  route('privacy', 'routes/privacy.tsx'),
  route('sitemap.xml', 'routes/sitemap.xml.ts'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
