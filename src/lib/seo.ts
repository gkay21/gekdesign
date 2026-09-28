import type { MetaDescriptor } from 'react-router';
import defaultShareImage from '../assets/images/studio_creative_workspace_1790321300104.jpg';

export const SITE_URL = 'https://gekdesign.com.au';
export const SITE_NAME = 'GEK Design';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

export const pageTitle = (title: string) => `${title} — ${SITE_NAME}`;

export const seo = ({
  title,
  description,
  path,
  image = defaultShareImage,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoOptions): MetaDescriptor[] => {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: imageUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
    ...(jsonLd ? [{ 'script:ld+json': jsonLd }] : []),
  ];
};
