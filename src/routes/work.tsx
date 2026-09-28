import { Outlet } from 'react-router';
import { WorkPage } from '../pages/WorkPage';
import { useSiteNavigation } from '../lib/navigation';
import { pageTitle, seo } from '../lib/seo';
import { PATHS } from '../paths';

export const meta = () =>
  seo({
    title: pageTitle('Selected Work'),
    description:
      'A curated selection of digital flagships, SaaS platforms, and bespoke brand architectures engineered for sustained commercial impact.',
    path: PATHS.work,
  });

export default function Work() {
  const { startProject, openProject } = useSiteNavigation();

  return (
    <>
      <WorkPage onSelectProject={openProject} onStartProject={() => startProject()} />
      {/* Case study overlay (work.$slug) */}
      <Outlet />
    </>
  );
}
