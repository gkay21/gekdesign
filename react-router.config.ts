import type { Config } from '@react-router/dev/config';
import { getSitePages } from './src/lib/site-pages';

export default {
  appDirectory: 'src',
  // No runtime server: every page is pre-rendered to static HTML at build time.
  ssr: false,
  async prerender() {
    return [...getSitePages(), '/sitemap.xml'];
  },
} satisfies Config;
