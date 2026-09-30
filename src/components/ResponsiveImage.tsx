import React from 'react';
import type { Picture } from 'vite-imagetools';

interface ResponsiveImageProps {
  picture: Picture;
  alt: string;
  /** Rendered width hint so the browser picks the right file, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority; everything else lazy-loads. */
  priority?: boolean;
}

const MIME: Record<string, string> = { avif: 'image/avif', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg' };

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ picture, alt, sizes, className, priority = false }) => (
  // `contents` keeps <picture> out of layout, so the <img> sizes against the parent like a bare <img>.
  <picture className="contents">
    {Object.entries(picture.sources).map(([format, srcSet]) => (
      <source key={format} type={MIME[format] ?? `image/${format}`} srcSet={srcSet} sizes={sizes} />
    ))}
    <img
      src={picture.img.src}
      width={picture.img.w}
      height={picture.img.h}
      alt={alt}
      sizes={sizes}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  </picture>
);
