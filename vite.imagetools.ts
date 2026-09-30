import { imagetools } from 'vite-imagetools';

// `import img from './photo.jpg?responsive'` -> AVIF/WebP/JPG at several widths, as a <picture> descriptor.
// Shared by vite.config.ts and vitest.config.ts.
const RESPONSIVE_DIRECTIVES = new URLSearchParams({
  w: '640;960;1280;1600;2400',
  format: 'avif;webp;jpg',
  as: 'picture',
});

export const responsiveImages = () =>
  imagetools({
    defaultDirectives: (url) => (url.searchParams.has('responsive') ? RESPONSIVE_DIRECTIVES : new URLSearchParams()),
  });
