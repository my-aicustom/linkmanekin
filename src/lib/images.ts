import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>(
  '../assets/images/**/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' },
);

/** Resolve the shared image identifiers used by page and article data. */
export function imageAsset(path: string): ImageMetadata {
  const image = images[`../assets${path}`];
  if (!image) throw new Error(`Unknown local image: ${path}`);
  return image;
}
