import type { MetaDescriptor } from 'react-router';
import type { Picture } from 'vite-imagetools';
import studioWorkspace from '../assets/images/studio_creative_workspace_1790321300104.jpg?responsive';

export const SITE_URL = 'https://gekdesign.com.au';
export const SITE_NAME = 'GEK Design';

const SHARE_IMAGE_WIDTH = 1280;

/** A JPEG URL from a responsive picture, for places that need one plain file (e.g. og:image). */
export const pictureJpeg = (picture: Picture, width = SHARE_IMAGE_WIDTH): string => {
  const srcset = picture.sources.jpeg ?? picture.sources.jpg ?? '';
  const match = srcset
    .split(',')
    .map((candidate) => candidate.trim().split(/\s+/))
    .find(([, descriptor]) => descriptor === `${width}w`);
  return match?.[0] ?? picture.img.src;
};

const defaultShareImage = pictureJpeg(studioWorkspace);

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
