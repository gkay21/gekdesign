// Images imported with `?responsive` (see vite.config.ts) resolve to a <picture> descriptor.
declare module '*?responsive' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}
