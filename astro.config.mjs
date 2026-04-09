// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkObsidian } from './src/plugins/remark-obsidian.mjs';

export default defineConfig({
  site: 'https://arteteco.com',
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkObsidian],
    // To customize paths: [[ remarkObsidian, { imgPath: '/img/', postsPath: '/posts/' } ]]
  },
});
