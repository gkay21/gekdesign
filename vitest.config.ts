import { defineConfig } from 'vitest/config';
import { responsiveImages } from './vite.imagetools.ts';

// Separate from vite.config.ts: the React Router plugin isn't needed (or wanted) for unit tests.
export default defineConfig({
  plugins: [responsiveImages()],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
