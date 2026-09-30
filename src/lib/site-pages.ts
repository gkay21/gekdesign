import { ARTICLES } from '../data/articles';
import { PROJECTS } from '../data/projects';
import { PATHS, articlePath, projectPath } from '../paths';

// Every indexable page. Drives both pre-rendering and sitemap.xml.
export const getSitePages = (): string[] => [
  ...Object.values(PATHS),
  ...PROJECTS.map((project) => projectPath(project.slug)),
  ...ARTICLES.map((article) => articlePath(article.slug)),
];
