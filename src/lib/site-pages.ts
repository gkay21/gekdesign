import { ARTICLES } from '../data/articles';
import { PROJECTS } from '../data/projects';
import { PATHS } from '../paths';

// Every indexable page. Drives both pre-rendering and sitemap.xml.
export const getSitePages = (): string[] => [
  ...Object.values(PATHS),
  ...PROJECTS.map((project) => `${PATHS.work}/${project.slug}`),
  ...ARTICLES.map((article) => `${PATHS.insights}/${article.slug}`),
];
