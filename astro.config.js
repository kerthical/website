import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import critters from 'astro-critters';
import { defineConfig } from 'astro/config';


export default defineConfig({
  site: 'https://kerthical.com',
  publicDir: './src/public',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    runtime: {
      type: 'pages',
      mode: 'local',
      bindings: {
        D1: {
          type: 'd1',
        },
      },
      persistTo: '.astro',
    },
  }),
  integrations: [react(), tailwind(), critters(), compress()],
});