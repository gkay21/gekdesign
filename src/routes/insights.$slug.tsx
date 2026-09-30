import { Navigate, useParams } from 'react-router';
import type { Route } from './+types/insights.$slug';
import { ArticleModal } from '../components/ArticleModal';
import { ARTICLES } from '../data/articles';
import { useCloseModal, useSiteNavigation } from '../lib/navigation';
import { absoluteUrl, pageTitle, seo, SITE_NAME } from '../lib/seo';
import { PATHS, articlePath } from '../paths';

const findArticle = (slug?: string) => ARTICLES.find((article) => article.slug === slug);

export const meta = ({ params }: Route.MetaArgs) => {
  const article = findArticle(params.slug);
  if (!article) return seo({ title: pageTitle('Article not found'), description: '', path: PATHS.insights, noindex: true });

  const path = articlePath(article.slug);

  return seo({
    title: pageTitle(article.title),
    description: article.summary,
    path,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      url: absoluteUrl(path),
      articleSection: article.category,
      author: { '@type': 'Person', name: article.author.name, jobTitle: article.author.role },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
    },
  });
};

export default function InsightArticle() {
  const { slug } = useParams();
  const { startProject } = useSiteNavigation();
  const close = useCloseModal(PATHS.insights);
  const article = findArticle(slug);

  if (!article) return <Navigate to={PATHS.insights} replace />;

  return <ArticleModal article={article} onClose={close} onStartProject={() => startProject()} />;
}
