import { AboutPage } from '../pages/AboutPage';
import { useSiteNavigation } from '../lib/navigation';
import { pageTitle, seo } from '../lib/seo';
import { PATHS } from '../paths';

export const meta = () =>
  seo({
    title: pageTitle('About the Studio'),
    description:
      'Founded in 2015 in Sydney, Australia, GEK Design is an independent creative web design and development agency building web platforms and brand systems.',
    path: PATHS.about,
  });

export default function About() {
  const { startProject } = useSiteNavigation();

  return <AboutPage onStartProject={() => startProject()} />;
}
