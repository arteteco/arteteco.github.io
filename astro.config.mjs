// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkObsidian } from './src/plugins/remark-obsidian.mjs';

export default defineConfig({
  site: 'https://arteteco.com',
  // passthroughImageService prevents Astro from trying to resolve/optimize
  // images referenced in content markdown. Path rewriting is handled by
  // the remarkObsidian plugin at render time.
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkObsidian],
  },
});
