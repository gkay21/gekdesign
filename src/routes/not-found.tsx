import { NotFound } from '../components/NotFound';
import { pageTitle, seo } from '../lib/seo';

export const meta = () =>
  seo({
    title: pageTitle('Page not found'),
    description: 'The page you’re looking for has moved or never existed.',
    path: '/404',
    noindex: true,
  });

export default function CatchAll() {
  return <NotFound />;
}
