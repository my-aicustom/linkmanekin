// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const publicEnv = loadEnv(
  process.env.NODE_ENV || 'production',
  process.cwd(),
  'PUBLIC_',
);

// https://astro.build/config
export default defineConfig({
  output: 'static',
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  site:
    process.env.PUBLIC_SITE_URL ||
    publicEnv.PUBLIC_SITE_URL ||
    'https://jualmanekin.com',
  vite: { plugins: [tailwindcss()] },
});
