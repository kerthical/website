import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import critters from 'astro-critters';
import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
  site: 'https://kerthical.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    runtime: {
      mode: 'local',
      bindings: {
        D1: {
          type: 'd1',
        },
      },
      persistTo: '.astro',
    },
  }),
  integrations: [tailwind(), critters(), compress()],
});
