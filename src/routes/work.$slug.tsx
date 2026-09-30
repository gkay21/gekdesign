import { Navigate, useParams } from 'react-router';
import type { Route } from './+types/work.$slug';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { PROJECTS } from '../data/projects';
import { useCloseModal, useReplaceModal, useSiteNavigation } from '../lib/navigation';
import { absoluteUrl, pageTitle, pictureJpeg, seo, SITE_NAME } from '../lib/seo';
import { PATHS, projectPath } from '../paths';

const findProject = (slug?: string) => PROJECTS.find((project) => project.slug === slug);

export const meta = ({ params }: Route.MetaArgs) => {
  const project = findProject(params.slug);
  if (!project) return seo({ title: pageTitle('Case study not found'), description: '', path: PATHS.work, noindex: true });

  const path = projectPath(project.slug);
  const shareImage = pictureJpeg(project.heroImage);
  const description = `${project.client} — ${project.shortOutcome}. ${project.industry} case study by ${SITE_NAME}.`;

  return seo({
    title: pageTitle(`${project.title} Case Study`),
    description,
    path,
    image: shareImage,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description,
      url: absoluteUrl(path),
      image: absoluteUrl(shareImage),
      dateCreated: project.year,
      genre: project.industry,
      creator: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
    },
  });
};

export default function CaseStudy() {
  const { slug } = useParams();
  const { startProject } = useSiteNavigation();
  const close = useCloseModal(PATHS.work);
  const replaceModal = useReplaceModal();
  const project = findProject(slug);

  if (!project) return <Navigate to={PATHS.work} replace />;

  return (
    <CaseStudyModal
      key={project.slug}
      project={project}
      onClose={close}
      onSelectProject={(next) => replaceModal(projectPath(next.slug))}
      onStartProject={() => startProject(`Case Study Reference: ${project.title}`)}
    />
  );
}
