import { Outlet } from 'react-router';
import { InsightsPage } from '../pages/InsightsPage';
import { useSiteNavigation } from '../lib/navigation';
import { pageTitle, seo } from '../lib/seo';
import { PATHS } from '../paths';

export const meta = () =>
  seo({
    title: pageTitle('Insights on Digital Craft'),
    description:
      'Essays and technical retrospectives on digital typography, headless performance engineering, conversion architecture, and brand strategy.',
    path: PATHS.insights,
  });

export default function Insights() {
  const { startProject, openArticle } = useSiteNavigation();

  return (
    <>
      <InsightsPage onSelectArticle={openArticle} onStartProject={() => startProject()} />
      {/* Article overlay (insights.$slug) */}
      <Outlet />
    </>
  );
}
