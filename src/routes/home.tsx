import { HomePage } from '../pages/HomePage';
import { useSiteNavigation } from '../lib/navigation';
import { SITE_NAME, seo } from '../lib/seo';
import { PATHS } from '../paths';

export const meta = () =>
  seo({
    title: `${SITE_NAME} — Digital Design & Engineering Studio`,
    description:
      'GEK Design is a creative web design and development agency. We combine strategy, editorial design, and modern engineering to build high-performing digital experiences.',
    path: PATHS.home,
  });

export default function Home() {
  const { goTo, startProject, openProject } = useSiteNavigation();

  return <HomePage onSelectProject={openProject} onNavigate={goTo} onStartProject={() => startProject()} />;
}
