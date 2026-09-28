import { ServicesPage } from '../pages/ServicesPage';
import { useSiteNavigation } from '../lib/navigation';
import { pageTitle, seo } from '../lib/seo';
import { PATHS } from '../paths';

export const meta = () =>
  seo({
    title: pageTitle('Services & Technical Craft'),
    description:
      'Web design, full-stack development, brand strategy, UI/UX, headless e-commerce, and creative direction — delivered as digital assets with measurable commercial outcomes.',
    path: PATHS.services,
  });

export default function Services() {
  const { startProject } = useSiteNavigation();

  return <ServicesPage onStartProject={startProject} />;
}
