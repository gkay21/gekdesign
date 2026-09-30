import { describe, expect, it } from 'vitest';
import { absoluteUrl, pageTitle, pictureJpeg, seo, SITE_URL } from './seo';

const find = (tags: ReturnType<typeof seo>, key: string, value: string) =>
  tags.find((tag) => (tag as Record<string, unknown>)[key] === value) as Record<string, unknown> | undefined;

describe('seo', () => {
  const tags = seo({ title: 'Work — GEK Design', description: 'Case studies', path: '/work', image: '/assets/x.jpg' });

  it('sets title, description and an absolute canonical URL', () => {
    expect(tags[0]).toEqual({ title: 'Work — GEK Design' });
    expect(find(tags, 'name', 'description')?.content).toBe('Case studies');
    expect(find(tags, 'rel', 'canonical')?.href).toBe(`${SITE_URL}/work`);
  });

  it('uses absolute URLs for Open Graph and Twitter images', () => {
    expect(find(tags, 'property', 'og:image')?.content).toBe(`${SITE_URL}/assets/x.jpg`);
    expect(find(tags, 'name', 'twitter:image')?.content).toBe(`${SITE_URL}/assets/x.jpg`);
  });

  it('only adds robots and JSON-LD when asked', () => {
    expect(find(tags, 'name', 'robots')).toBeUndefined();
    const extra = seo({ title: 't', description: 'd', path: '/', noindex: true, jsonLd: { '@type': 'Article' } });
    expect(find(extra, 'name', 'robots')?.content).toBe('noindex');
    expect(extra.some((tag) => 'script:ld+json' in tag)).toBe(true);
  });
});

describe('pictureJpeg', () => {
  const picture = {
    sources: {
      avif: '/a-640.avif 640w, /a-1280.avif 1280w',
      jpeg: '/a-640.jpg 640w, /a-1280.jpg 1280w, /a-2400.jpg 2400w',
    },
    img: { src: '/a-2400.jpg', w: 2400, h: 1800 },
  };

  it('picks the 1280px JPEG for share images', () => {
    expect(pictureJpeg(picture)).toBe('/a-1280.jpg');
  });

  it('falls back to the default image when that width is missing', () => {
    expect(pictureJpeg(picture, 999)).toBe('/a-2400.jpg');
  });
});

describe('helpers', () => {
  it('builds absolute URLs and page titles', () => {
    expect(absoluteUrl('/about')).toBe(`${SITE_URL}/about`);
    expect(pageTitle('About')).toBe('About — GEK Design');
  });
});
