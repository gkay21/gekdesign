import { useLocation, useNavigate } from 'react-router';
import { Project } from '../data/projects';
import { Article } from '../data/articles';
import { PATHS, articlePath, contactPath, projectPath } from '../paths';

interface ModalState {
  openedInApp?: boolean;
}

const MODAL_NAVIGATION = { state: { openedInApp: true } satisfies ModalState, preventScrollReset: true };

export const useSiteNavigation = () => {
  const navigate = useNavigate();

  const goTo = (page: string) => navigate(PATHS[page as keyof typeof PATHS] ?? PATHS.home);

  const startProject = (service?: string) => navigate(contactPath(service));

  const openProject = (project: Project) => navigate(projectPath(project.slug), MODAL_NAVIGATION);

  const openArticle = (article: Article) => navigate(articlePath(article.slug), MODAL_NAVIGATION);

  return { navigate, goTo, startProject, openProject, openArticle };
};

// Opened in-app: step back to wherever the visitor came from.
// Opened via direct link: fall back to the listing page rendered underneath.
export const useCloseModal = (fallback: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openedInApp } = (location.state ?? {}) as ModalState;

  return () => (openedInApp ? navigate(-1) : navigate(fallback, { preventScrollReset: true }));
};

// Swap one modal for another without adding a history entry, so closing still returns to the origin.
export const useReplaceModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (path: string) =>
    navigate(path, { state: location.state, replace: true, preventScrollReset: true });
};
